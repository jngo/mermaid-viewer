const { test } = require('node:test')
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

// Exercise the hook with controlled scheduling and deferred renderer results.
function harness(source = readFileSync(process.env.RENDERER_SOURCE || 'hooks/useDiagramRenderer.ts', 'utf8')) {
  const slots = [], jobs = new Map(), pending = []
  let cursor = 0, effect, cleanup, nextJob = 0
  const schedule = (fn) => { jobs.set(++nextJob, fn); return nextJob }
  const react = {
    useRef(value) { const i = cursor++; return slots[i] ??= { current: value } },
    useState(value) { const i = cursor++; if (!(i in slots)) slots[i] = value; return [slots[i], v => { slots[i] = v }] },
    useId() { return 'test' },
    useEffect(fn) { effect = fn },
  }
  const exports = {}
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
    exports, require(name) {
      if (name === 'react') return react
      if (name === 'mermaid') return { default: {
        render: () => new Promise((resolve, reject) => pending.push({ resolve, reject })),
        run: () => new Promise(() => {}),
      } }
      if (name === 'pele') return { render(code) { if (code === 'invalid') throw new Error('syntax'); return { svg: `<svg>${code}</svg>` } } }
      if (name === '@vercel/analytics') return { track() {} }
      throw new Error(name)
    },
    Error, performance, console: { error() {} },
    requestAnimationFrame: schedule, setTimeout: schedule,
    cancelAnimationFrame: id => jobs.delete(id), clearTimeout: id => jobs.delete(id),
    document: { createElement: () => ({}) },
  })
  const container = { innerHTML: '<svg>previous</svg>', appendChild() {} }
  return {
    pending, container,
    edit(code, engine = 'pele') {
      cleanup?.(); cursor = 0
      const result = exports.useDiagramRenderer(code, engine)
      result.diagramRef.current = container
      cleanup = effect()
      return result
    },
    flush() { const batch = [...jobs.values()]; jobs.clear(); batch.forEach(fn => fn()) },
    unmount() { cleanup() },
  }
}
const tick = () => new Promise(resolve => setImmediate(resolve))

test('keeps the previous SVG while Mermaid is pending or fails', async () => {
  const h = harness()
  h.edit('new', 'mermaid'); h.flush()
  assert.equal(h.container.innerHTML, '<svg>previous</svg>')
  h.pending[0].reject(new Error('syntax')); await tick()
  assert.equal(h.container.innerHTML, '<svg>previous</svg>')
  assert.equal(h.edit('fixed', 'mermaid').error, 'syntax')
  h.flush(); h.pending[1].resolve({ svg: '<svg>fixed</svg>' }); await tick()
  assert.equal(h.container.innerHTML, '<svg>fixed</svg>')
})

test('coalesces Pele edits and preserves the last SVG on invalid input', () => {
  const h = harness()
  h.edit('first'); h.edit('latest')
  assert.equal(h.container.innerHTML, '<svg>previous</svg>')
  h.flush(); assert.equal(h.container.innerHTML, '<svg>latest</svg>')
  h.edit('invalid'); h.flush()
  assert.equal(h.container.innerHTML, '<svg>latest</svg>')
})

test('ignores stale Mermaid success and error after switching to Pele', async () => {
  for (const outcome of ['resolve', 'reject']) {
    const h = harness()
    h.edit('old', 'mermaid'); h.flush()
    h.edit('latest'); h.flush()
    h.pending[0][outcome](outcome === 'resolve' ? { svg: '<svg>old</svg>' } : new Error('old error'))
    await tick()
    assert.equal(h.container.innerHTML, '<svg>latest</svg>')
    assert.equal(h.edit('next').error, null)
  }
})

test('cancels scheduled frames and ignores in-flight work on unmount', async () => {
  const h = harness()
  h.edit('cancelled'); h.unmount(); h.flush()
  assert.equal(h.container.innerHTML, '<svg>previous</svg>')
  h.edit('pending', 'mermaid'); h.flush(); h.unmount()
  h.pending[0].resolve({ svg: '<svg>unmounted</svg>' }); await tick()
  assert.equal(h.container.innerHTML, '<svg>previous</svg>')
})


test('binds Mermaid interactions only after the current SVG is inserted', async () => {
  const h = harness()
  let bound = false
  h.edit('interactive', 'mermaid'); h.flush()
  h.pending[0].resolve({ svg: '<svg>interactive</svg>', bindFunctions(container) {
    assert.equal(container.innerHTML, '<svg>interactive</svg>')
    bound = true
  } })
  await tick()
  assert.equal(bound, true)
})
