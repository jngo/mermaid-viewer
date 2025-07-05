"use client"

import { useRef, useState, useMemo, useEffect } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { DiagramControls } from "./DiagramControls"
import { DiagramEditor } from "./DiagramEditor"
import { useDiagramRenderer } from "@/hooks/useDiagramRenderer"
import { useDiagramExport } from "@/hooks/useDiagramExport"
import { FLOWCHART, GANTT_CHART, USER_JOURNEY } from "@/lib/mermaid-examples"
import { initializeMermaid } from "@/lib/mermaid-config"

// Initialize mermaid
initializeMermaid()

export default function MermaidCanvas() {
  const diagramExamples = [FLOWCHART, GANTT_CHART, USER_JOURNEY]
  const randomDiagram = useMemo(() => {
    return diagramExamples[Math.floor(Math.random() * diagramExamples.length)]
  }, [])
  const [mermaidCode, setMermaidCode] = useState(randomDiagram)
  const transformRef = useRef<any>(null)
  
  const { diagramRef, error } = useDiagramRenderer(mermaidCode)
  const { exportSVG } = useDiagramExport(diagramRef)

  // Reset zoom when diagram code changes
  useEffect(() => {
    // Remove/hide the existing diagram
    if (diagramRef.current) {
      diagramRef.current.innerHTML = "";
    }
    // Reset zoom and pan state
    if (transformRef.current?.resetTransform) {
      transformRef.current.resetTransform();
    }
  }, [mermaidCode])

  return (
    <div className="fixed inset-0 w-screen h-dvh overflow-hidden">
      {/* Diagram container with zoom and pan */}
      <TransformWrapper
        ref={transformRef}
        initialScale={1}
        minScale={0.5}
        limitToBounds={false}
        centerOnInit={true}
        wheel={{ step: 0.1 }}
      >
        <TransformComponent 
          wrapperClass="bg-grid-pattern" 
          contentClass="flex items-center justify-center"
        >
          <div
            ref={diagramRef}
            className="w-screen h-screen flex items-center justify-center min-h-screen min-w-screen text-base [&_.mermaid_svg]:overflow-visible! [&_.mermaid_svg_text]:font-sans! [&_.mermaid_svg_text]:text-base! [&_.mermaid_svg_text]:fill-current! [&_.mermaid_svg_text]:!dominant-baseline-middle [&_.mermaid_svg_text]:!text-anchor-middle [&_.mermaid_svg_foreignObject]:overflow-visible! [&_.mermaid_svg_foreignObject_div]:text-base! [&_.mermaid_svg_foreignObject_div]:font-sans! [&_.mermaid_svg_foreignObject_div]:whitespace-normal! [&_.mermaid_svg_foreignObject_div]:break-words!"
          />
        </TransformComponent>
      </TransformWrapper>

      {/* Controls overlay */}
      <div className="absolute inset-4 pointer-events-none">
        <DiagramControls transformRef={transformRef} onExport={exportSVG} />
        <DiagramEditor 
          mermaidCode={mermaidCode}
          onCodeChange={setMermaidCode}
          error={error}
        />
      </div>
    </div>
  )
}
