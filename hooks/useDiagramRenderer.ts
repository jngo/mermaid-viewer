import { useEffect, useRef, useState } from "react"
import mermaid from "mermaid"
import { track } from "@vercel/analytics"

export const useDiagramRenderer = (mermaidCode: string) => {
  const [error, setError] = useState<string | null>(null)
  const diagramRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const renderDiagram = async () => {
      if (!diagramRef.current) return

      try {
        // Clear previous content
        diagramRef.current.innerHTML = ""

        // Create a new div for the diagram
        const div = document.createElement("div")
        div.className = "mermaid w-full p-4"
        div.textContent = mermaidCode
        diagramRef.current.appendChild(div)

        // Render the diagram
        await mermaid.run()
        setError(null)
      } catch (err) {
        console.error("Mermaid rendering error:", err)
        setError("Error rendering diagram. Please check your syntax.")
        track('editor_error')
      }
    }

    // Debounce rendering to avoid excessive updates
    const timer = setTimeout(() => {
      renderDiagram()
    }, 300)

    return () => clearTimeout(timer)
  }, [mermaidCode])

  return { diagramRef, error }
} 