const { test } = require('node:test')
const assert = require('node:assert/strict')
const { readFileSync } = require('node:fs')
const vm = require('node:vm')
const ts = require('typescript')

// Exercise the hook with controlled animation-frame scheduling.
function harness(source = readFileSync(process.env.RENDERER_SOURCE || 'hooks/useDiagramRenderer.ts', 'utf8')) {
  const slots = [], jobs = new Map(), fontListeners = new Map()
  let fontResets = 0
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
      if (name === 'pele') return { forgetTextWidths() { fontResets++ }, render(code, options) { assert.equal(options.fontFamily, 'inconsolata, monospace'); assert.equal(options.fontSize, 16); if (code === 'invalid') throw new Error('syntax'); return { svg: `<svg>${code}</svg>` } } }
      if (name === '@vercel/analytics') return { track() {} }
      throw new Error(name)
    },
    getComputedStyle: () => ({ fontFamily: 'inconsolata, monospace', fontSize: '16px', getPropertyValue: () => 'inconsolata, monospace' }),
    document: { fonts: { ready: new Promise(() => {}), addEventListener: (name, fn) => fontListeners.set(name, fn), removeEventListener: name => fontListeners.delete(name) } },
    Error, performance, console: { error() {} },
    requestAnimationFrame: schedule,
    cancelAnimationFrame: id => jobs.delete(id),
  })
  const container = { innerHTML: '<svg>previous</svg>' }
  return {
    container,
    fontLoaded() { fontListeners.get("loadingdone")?.() },
    fontResets: () => fontResets,
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

test('exports resolved Pele tokens and translucent fills without changing the on-screen SVG', () => {
  const exportedProperties = {}, liveProperties = {}
  const sourceBand = {}, exportedBand = {}
  const clone = { querySelectorAll: () => [{ setAttribute: (key, value) => { exportedBand[key] = value } }], style: { setProperty: (key, value) => { exportedProperties[key] = value } } }
  const original = { querySelectorAll: () => [sourceBand], style: liveProperties, cloneNode: () => clone }
  const properties = { '--pele-bg': 'oklch(0.9798 0.0045 78.2983)', '--pele-font': 'inconsolata, monospace', '--unrelated': 'unused' }
  const exports = {}
  let serialized
  vm.runInNewContext(ts.transpileModule(readFileSync('hooks/useDiagramExport.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, {
    exports, require: () => ({ track() {} }),
    getComputedStyle: element => element === sourceBand ? { fillOpacity: "0.3" } : Object.assign(Object.keys(properties), { getPropertyValue: key => properties[key] }),
    XMLSerializer: class { serializeToString(value) { serialized = value; return '<svg/>' } },
    Blob, URL: { createObjectURL: () => 'blob:test', revokeObjectURL() {} },
    document: { createElement: () => ({ click() {} }), body: { appendChild() {}, removeChild() {} } },
  })
  exports.useDiagramExport({ current: { querySelector: () => original } }).exportSVG()
  assert.equal(serialized, clone)
  assert.deepEqual(exportedProperties, { '--pele-bg': properties['--pele-bg'], '--pele-font': properties['--pele-font'] })
  assert.deepEqual(liveProperties, {})
  assert.deepEqual(exportedBand, { "fill-opacity": "0.3" })
})


test('refreshes cached font measurements after loading and removes the listener on unmount', () => {
  const h = harness()
  h.edit('labels'); h.flush()
  h.fontLoaded(); h.flush()
  assert.equal(h.fontResets(), 1)
  assert.equal(h.container.innerHTML, '<svg>labels</svg>')
  h.unmount(); h.fontLoaded(); h.flush()
  assert.equal(h.fontResets(), 1)
})
