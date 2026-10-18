import { useEffect, useRef, useState } from "react"
import { render as renderPele } from "pele"
import { track } from "@vercel/analytics"

export const useDiagramRenderer = (mermaidCode: string) => {
  const [error, setError] = useState<string | null>(null)
  const [renderTime, setRenderTime] = useState<number | null>(null)
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    const renderDiagram = () => {
      if (!diagramRef.current) return

      try {
        const start = performance.now()
        const { svg } = renderPele(mermaidCode)
        diagramRef.current.innerHTML = svg
        setRenderTime(performance.now() - start)
        setError(null)
      } catch (err) {
        console.error("Mermaid rendering error:", err)
        setError(err instanceof Error ? err.message : "Error rendering diagram. Please check your syntax.")
        track('editor_error')
      }
    }

    const frame = requestAnimationFrame(() => {
      if (!cancelled) renderDiagram()
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [mermaidCode])

  return { diagramRef, error, renderTime }
}
