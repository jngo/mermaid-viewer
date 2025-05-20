import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut, Crosshair } from "lucide-react"
import { RefObject } from "react"

interface DiagramControlsProps {
  transformRef: RefObject<any>
  onExport: () => void
}

export function DiagramControls({ transformRef, onExport }: DiagramControlsProps) {
  return (
    <div className="absolute inset-x-0 bottom-0 mx-auto z-10 flex items-center justify-center space-x-2 pointer-events-auto">
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => transformRef.current?.zoomOut()}
      >
        <ZoomOut className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => transformRef.current?.zoomIn()}
      >
        <ZoomIn className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={() => transformRef.current?.resetTransform()}
      >
        <Crosshair className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="icon" 
        onClick={onExport}
      >
        <Download className="h-4 w-4" />
      </Button>
    </div>
  )
} 