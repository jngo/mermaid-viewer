import { Button } from "@/components/ui/button"
import { Download, ZoomIn, ZoomOut, Crosshair } from "lucide-react"
import { RefObject } from "react"
import { Card } from "@/components/ui/card"
interface DiagramControlsProps {
  transformRef: RefObject<any>
  onExport: () => void
}

export function DiagramControls({ transformRef, onExport }: DiagramControlsProps) {
  return (
    <Card className="absolute inset-x-0 bottom-0 mx-auto w-fit p-1 z-10 shadow-md flex items-center justify-center space-x-2 pointer-events-auto">
      <Button 
        variant="ghost"
        size="icon"
        onClick={() => transformRef.current?.zoomOut()}
      >
        <ZoomOut />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => transformRef.current?.zoomIn()}
      >
        <ZoomIn />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={() => transformRef.current?.resetTransform()}
      >
        <Crosshair />
      </Button>
      <Button 
        variant="ghost" 
        size="icon"
        onClick={onExport}
      >
        <Download />
      </Button>
    </Card>
  )
} 