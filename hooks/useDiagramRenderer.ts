import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"
import { render as renderPele } from "pele"
import { track } from "@vercel/analytics"

export type RendererEngine = "mermaid" | "pele"

export const useDiagramRenderer = (mermaidCode: string, engine: RendererEngine = "mermaid") => {
  const [error, setError] = useState<string | null>(null)
  const [renderTime, setRenderTime] = useState<number | null>(null)
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (!diagramRef.current) return

      try {
        const start = performance.now()
        if (engine === "pele") {
          const { svg } = renderPele(mermaidCode)
          diagramRef.current.innerHTML = svg
          setRenderTime(performance.now() - start)
          setError(null)
          return
        }

        // Clear previous content
        diagramRef.current.innerHTML = ""

        // Create a new div for the diagram
        const div = document.createElement("div")
        div.className = "mermaid w-full p-4"
        div.textContent = mermaidCode
        diagramRef.current.appendChild(div)

        // Render the diagram
        await mermaid.run()
        setRenderTime(performance.now() - start)
        setError(null)
      } catch (err) {
        console.error("Mermaid rendering error:", err)
        setError(err instanceof Error ? err.message : "Error rendering diagram. Please check your syntax.")
        track('editor_error')
      }
    }

    // Debounce rendering to avoid excessive updates
    const timer = setTimeout(() => {
      renderDiagram()
    }, engine === "pele" ? 50 : 300)

    return () => clearTimeout(timer)
  }, [mermaidCode, engine])

  return { diagramRef, error, renderTime }
} 