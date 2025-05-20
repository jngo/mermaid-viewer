import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { ChevronUp, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DiagramEditorProps {
  mermaidCode: string
  onCodeChange: (code: string) => void
  error: string | null
}

export function DiagramEditor({ mermaidCode, onCodeChange, error }: DiagramEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <Card className="absolute inset-x-0 top-0 max-w-lg mx-auto z-20 overflow-hidden rounded-md flex flex-col shadow-lg pointer-events-auto transition-all duration-200 ease-in-out" style={{ height: isExpanded ? '100%' : '10dvh' }}>
      <div className="flex items-center justify-between p-2 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="text-sm font-medium">Mermaid Editor</div>
        <Button
          variant="ghost"
          size="sm"
          className="rounded-full p-0 hover:bg-background/80"
          onClick={toggleExpand}
        >
          {isExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
        </Button>
      </div>
      <Textarea
        value={mermaidCode}
        onChange={(e) => onCodeChange(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        placeholder="Enter Mermaid diagram code here..."
        className="flex-1 resize-none p-2 font-mono text-base text-nowrap border-none rounded-none"
      />
      {error && (
        <div className="p-2 text-xs text-red-500 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          {error}
        </div>
      )}
    </Card>
  )
} 