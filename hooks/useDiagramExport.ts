import { RefObject } from "react"
import { track } from "@vercel/analytics"

export const useDiagramExport = (diagramRef: RefObject<HTMLDivElement | null>) => {
  const exportSVG = () => {
    if (!diagramRef.current) return

    const svgElement = diagramRef.current.querySelector("svg")
    if (!svgElement) return

    // SVG files do not inherit the app stylesheet. Freeze the current theme on a clone.
    const exportedSVG = svgElement.cloneNode(true) as SVGSVGElement
    const style = getComputedStyle(svgElement)
    for (const property of Array.from(style)) {
      if (property.startsWith("--pele-")) {
        exportedSVG.style.setProperty(property, style.getPropertyValue(property))
      }
    }
    const svgData = new XMLSerializer().serializeToString(exportedSVG)
    const blob = new Blob([svgData], { type: "image/svg+xml" })
    const url = URL.createObjectURL(blob)

    const link = document.createElement("a")
    link.href = url
    link.download = "mermaid-diagram.svg"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
    track('diagram_export', { format: 'svg' })
  }

  return { exportSVG }
} 