"use client"

import { useRef, useState } from "react"
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch"
import { DiagramControls } from "./DiagramControls"
import { DiagramEditor } from "./DiagramEditor"
import { useDiagramRenderer } from "@/hooks/useDiagramRenderer"
import { useDiagramExport } from "@/hooks/useDiagramExport"
import { DEFAULT_DIAGRAM, initializeMermaid } from "@/lib/mermaid-config"

// Initialize mermaid
initializeMermaid()

export default function MermaidCanvas() {
  const [mermaidCode, setMermaidCode] = useState(DEFAULT_DIAGRAM)
  const transformRef = useRef<any>(null)
  
  const { diagramRef, error } = useDiagramRenderer(mermaidCode)
  const { exportSVG } = useDiagramExport(diagramRef)

  return (
    <div className="fixed inset-0 w-screen h-dvh bg-gray-100 overflow-hidden">
      {/* Diagram container with zoom and pan */}
      <div className="absolute inset-0 w-full h-full">
        <TransformWrapper
          ref={transformRef}
          initialScale={1}
          minScale={0.5}
          limitToBounds={false}
          centerOnInit={true}
          wheel={{ step: 0.1 }}
        >
          <TransformComponent 
            wrapperClass="!w-full !h-full bg-grid-pattern" 
            contentClass="!w-full !h-full flex items-center justify-center"
          >
            <div
              ref={diagramRef}
              className="w-full h-full flex items-center justify-center min-h-screen min-w-screen text-base [&_.mermaid_svg]:!overflow-visible [&_.mermaid_svg_text]:!font-sans [&_.mermaid_svg_text]:!text-base [&_.mermaid_svg_text]:!fill-current [&_.mermaid_svg_text]:!dominant-baseline-middle [&_.mermaid_svg_text]:!text-anchor-middle [&_.mermaid_svg_foreignObject]:!overflow-visible [&_.mermaid_svg_foreignObject_div]:!text-base [&_.mermaid_svg_foreignObject_div]:!font-sans [&_.mermaid_svg_foreignObject_div]:!whitespace-normal [&_.mermaid_svg_foreignObject_div]:!break-words"
            />
          </TransformComponent>
        </TransformWrapper>
      </div>

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
