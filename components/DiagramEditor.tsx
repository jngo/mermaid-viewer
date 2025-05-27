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
    <Card className={`absolute inset-x-0 top-0 max-w-lg mx-auto max-h-full z-20 p-3 overflow-hidden flex flex-col shadow-md pointer-events-auto transition-all duration-200 ease-in-out ${isExpanded ? 'h-96' : 'h-12.5'}`}>
      <div className="mb-3 flex items-center justify-between">
        <h1 className="text-sm font-medium">Mermaid Editor</h1>
        <Button
          variant="ghost"
          size="icon"
          className="-m-2"
          onClick={toggleExpand}
        >
          {isExpanded ? <ChevronUp /> : <ChevronDown />}
        </Button>
      </div>
      <Textarea
        value={mermaidCode}
        onChange={(e) => onCodeChange(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
        placeholder="Enter Mermaid diagram code here..."
        className="h-full min-h-10 2 font-mono text-base text-nowrap" 
      />
      {error && (
        <div className="p-2 text-xs text-red-500 bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
          {error}
        </div>
      )}
    </Card>
  )
} 