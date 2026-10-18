const { test } = require('node:test')
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

// Exercise the hook with controlled animation-frame scheduling.
function harness(source = readFileSync(process.env.RENDERER_SOURCE || 'hooks/useDiagramRenderer.ts', 'utf8')) {
  const slots = [], jobs = new Map()
  let cursor = 0, effect, cleanup, nextJob = 0
  const schedule = (fn) => { jobs.set(++nextJob, fn); return nextJob }
  const react = {
    useRef(value) { const i = cursor++; return slots[i] ??= { current: value } },
    useState(value) { const i = cursor++; if (!(i in slots)) slots[i] = value; return [slots[i], v => { slots[i] = v }] },
    useEffect(fn) { effect = fn },
  }
  const exports = {}
  vm.runInNewContext(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
    exports, require(name) {
      if (name === 'react') return react
      if (name === 'pele') return { render(code) { if (code === 'invalid') throw new Error('syntax'); return { svg: `<svg>${code}</svg>` } } }
      if (name === '@vercel/analytics') return { track() {} }
      throw new Error(name)
    },
    Error, performance, console: { error() {} },
    requestAnimationFrame: schedule,
    cancelAnimationFrame: id => jobs.delete(id),
  })
  const container = { innerHTML: '<svg>previous</svg>' }
  return {
    container,
    edit(code) {
      cleanup?.(); cursor = 0
      const result = exports.useDiagramRenderer(code)
      result.diagramRef.current = container
      cleanup = effect()
      return result
    },
    flush() { const batch = [...jobs.values()]; jobs.clear(); batch.forEach(fn => fn()) },
    unmount() { cleanup() },
  }
}
test('coalesces Pele edits and preserves the last SVG on invalid input', () => {
  const h = harness()
  h.edit('first'); h.edit('latest')
  assert.equal(h.container.innerHTML, '<svg>previous</svg>')
  h.flush(); assert.equal(h.container.innerHTML, '<svg>latest</svg>')
  h.edit('invalid'); h.flush()
  assert.equal(h.container.innerHTML, '<svg>latest</svg>')
})

test('cancels scheduled rendering on unmount', () => {
  const h = harness()
  h.edit('cancelled'); h.unmount(); h.flush()
  assert.equal(h.container.innerHTML, '<svg>previous</svg>')
})

test('recovers from invalid input and records successful render timing', () => {
  const h = harness()
  h.edit('invalid'); h.flush()
  assert.equal(h.edit('fixed').error, 'syntax')
  h.flush()
  assert.equal(h.container.innerHTML, '<svg>fixed</svg>')
  const result = h.edit('next')
  assert.equal(result.error, null)
  assert.equal(typeof result.renderTime, 'number')
})
