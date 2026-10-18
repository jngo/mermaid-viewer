import { useEffect, useRef, useState } from "react"
import { render as renderPele, forgetTextWidths } from "pele"
import { track } from "@vercel/analytics"

export const useDiagramRenderer = (mermaidCode: string) => {
  const [error, setError] = useState<string | null>(null)
  const [renderTime, setRenderTime] = useState<number | null>(null)
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let cancelled = false
    let frame = 0
    const renderDiagram = () => {
      if (!diagramRef.current) return

      try {
        const start = performance.now()
        const style = getComputedStyle(diagramRef.current)
        const { svg } = renderPele(mermaidCode, {
          fontFamily: style.fontFamily,
          fontFamilyMono: style.getPropertyValue("--font-mono").trim() || "monospace",
          fontSize: parseFloat(style.fontSize) || 16,
        })
        diagramRef.current.innerHTML = svg
        setRenderTime(performance.now() - start)
        setError(null)
      } catch (err) {
        console.error("Mermaid rendering error:", err)
        setError(err instanceof Error ? err.message : "Error rendering diagram. Please check your syntax.")
        track('editor_error')
      }
    }

    const scheduleRender = () => {
      if (cancelled) return
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(renderDiagram)
    }

    const refreshFontMetrics = () => {
      if (cancelled) return
      // Discard measurements made with fallback fonts before Typekit was ready.
      forgetTextWidths()
      scheduleRender()
    }

    scheduleRender()
    document.fonts.ready.then(refreshFontMetrics)
    document.fonts.addEventListener("loadingdone", refreshFontMetrics)

    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
      document.fonts.removeEventListener("loadingdone", refreshFontMetrics)
    }
  }, [mermaidCode])

  return { diagramRef, error, renderTime }
}
