import { useEffect, useId, useRef, useState } from "react"
import mermaid from "mermaid"
import { render as renderPele } from "pele"
import { track } from "@vercel/analytics"

export type RendererEngine = "mermaid" | "pele"

export const useDiagramRenderer = (mermaidCode: string, engine: RendererEngine = "mermaid") => {
  const [error, setError] = useState<string | null>(null)
  const [renderTime, setRenderTime] = useState<number | null>(null)
  const diagramRef = useRef<HTMLDivElement>(null)

  const renderId = useId().replace(/:/g, "")
  const generation = useRef(0)

  useEffect(() => {
    const currentGeneration = ++generation.current
    let cancelled = false
    const isCurrent = () => !cancelled && generation.current === currentGeneration
    const renderDiagram = async () => {
      if (!diagramRef.current) return

      try {
        const start = performance.now()
        const result = engine === "pele"
          ? renderPele(mermaidCode)
          : await mermaid.render(`diagram-${renderId}-${currentGeneration}`, mermaidCode)

        if (!isCurrent() || !diagramRef.current) return
        diagramRef.current.innerHTML = result.svg
        if ("bindFunctions" in result) result.bindFunctions?.(diagramRef.current)
        setRenderTime(performance.now() - start)
        setError(null)
      } catch (err) {
        if (!isCurrent()) return
        console.error("Mermaid rendering error:", err)
        setError(err instanceof Error ? err.message : "Error rendering diagram. Please check your syntax.")
        track('editor_error')
      }
    }

    const frame = engine === "pele" ? requestAnimationFrame(() => { void renderDiagram() }) : null
    const timer = engine === "mermaid" ? setTimeout(() => { void renderDiagram() }, 300) : null

    return () => {
      cancelled = true
      if (frame !== null) cancelAnimationFrame(frame)
      if (timer !== null) clearTimeout(timer)
    }
  }, [mermaidCode, engine, renderId])

  return { diagramRef, error, renderTime }
}
