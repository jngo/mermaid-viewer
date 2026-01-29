import { useEffect, useRef, useState } from "react"
import { renderMermaid, THEMES } from "beautiful-mermaid"
import { track } from "@vercel/analytics"

const diagramTheme = {
  ...THEMES["zinc-light"],
  font: "Inconsolata, monospace",
  transparent: true,
}

export const useDiagramRenderer = (mermaidCode: string) => {
  const [error, setError] = useState<string | null>(null)
  const diagramRef = useRef<HTMLDivElement>(null)
  const renderToken = useRef(0)

  useEffect(() => {
    const renderDiagram = async () => {
      if (!diagramRef.current) return

      try {
        const currentToken = ++renderToken.current

        if (!mermaidCode.trim()) {
          diagramRef.current.innerHTML = ""
          setError(null)
          return
        }

        const svg = await renderMermaid(mermaidCode, diagramTheme)
        if (renderToken.current !== currentToken || !diagramRef.current) return

        diagramRef.current.innerHTML = svg
        const svgElement = diagramRef.current.querySelector("svg")
        if (svgElement) {
          svgElement.classList.add("beautiful-mermaid")
          svgElement.setAttribute("role", "img")
        }
        setError(null)
      } catch (err) {
        console.error("Beautiful Mermaid rendering error:", err)
        if (diagramRef.current) {
          diagramRef.current.innerHTML = ""
        }
        setError("Error rendering diagram. Please check your syntax.")
        track("editor_error")
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