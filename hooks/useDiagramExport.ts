import { RefObject } from "react"

export const useDiagramExport = (diagramRef: RefObject<HTMLDivElement | null>) => {
  const exportSVG = () => {
    if (!diagramRef.current) return

    const svgElement = diagramRef.current.querySelector("svg")
    if (!svgElement) return

    const svgData = new XMLSerializer().serializeToString(svgElement)
    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "mermaid-diagram.svg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  return { exportSVG }
} 