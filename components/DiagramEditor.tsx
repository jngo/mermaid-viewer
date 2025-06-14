import { Textarea } from "@/components/ui/textarea"
import { useState, useRef, useEffect } from "react"
import { Pin, PinOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FLOWCHART, GANTT_CHART, USER_JOURNEY } from "@/lib/mermaid-examples"
import { track } from "@vercel/analytics"

interface DiagramEditorProps {
  mermaidCode: string
  onCodeChange: (code: string) => void
  error: string | null
}

export function DiagramEditor({ mermaidCode, onCodeChange, error }: DiagramEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isAutoExpandEnabled, setIsAutoExpandEnabled] = useState(true)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const toggleAutoExpand = () => {
    const newValue = !isAutoExpandEnabled
    setIsAutoExpandEnabled(newValue)
    track("toggle_auto_expand", { enabled: newValue })
  }

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      const handleFocus = () => {
        textarea.select()
        track("editor_focus")
      }
      textarea.addEventListener("focus", handleFocus)
      return () => textarea.removeEventListener("focus", handleFocus)
    }
  }, [])

  // Track when the diagram code changes (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      track("code_changed")
    }, 1000)
    return () => clearTimeout(timer)
  }, [mermaidCode])

  return (
    <Tabs
      defaultValue="editor"
      className={`absolute inset-x-0 top-0 max-w-lg mx-auto max-h-full ${isExpanded ? 'h-auto' : 'h-[2.875rem]'} rounded-lg border bg-card shadow-md px-4 pt-5 pb-4 pointer-events-auto flex flex-col items-center overflow-hidden`}
      onMouseEnter={() => isAutoExpandEnabled && setIsExpanded(true)}
      onMouseLeave={() => isAutoExpandEnabled && setIsExpanded(false)}
      onValueChange={(value) => track("tab_change", { tab: value })}
    >
      <div className="flex items-center justify-between w-full">
        <TabsList className="w-min h-7 px-0.75 py-1 -ml-2 -mt-3 mb-2 rounded-md">
          <TabsTrigger value="editor" className="h-[1.45rem] px-2 py-1 rounded-sm text-xs">Editor</TabsTrigger>
          <TabsTrigger value="about" className="h-[1.45rem] px-2 py-1 rounded-sm text-xs">About</TabsTrigger>
        </TabsList>
        <Button
          variant="ghost"
          size="icon"
          className="-mr-2 -mt-5 size-7"
          onClick={toggleAutoExpand}
        >
          {isAutoExpandEnabled ? <Pin /> : <PinOff />}
        </Button>
      </div>

      <TabsContent value="editor" className="w-full grow">
        <ul className="flex flex-nowrap overflow-x-auto gap-2 pb-2 -mx-4 px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <li>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => {
                track("example_selected", { name: "flowchart" })
                onCodeChange(FLOWCHART)
              }}
            >
              Frames of Mind by Howard Gardner
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => {
                track("example_selected", { name: "gantt_chart" })
                onCodeChange(GANTT_CHART)
              }}
            >
              The Space Race (1957–1975)
            </Button>
          </li>
          <li>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => {
                track("example_selected", { name: "user_journey" })
                onCodeChange(USER_JOURNEY)
              }}
            >
              Odysseus' Journey Home
            </Button>
          </li>
        </ul>

        <Textarea
          ref={textareaRef}
          value={mermaidCode}
          onChange={(e) => onCodeChange(e.target.value)}
          className="h-[72dvh] max-h-[72dvh] font-mono text-base text-nowrap"
        />

        {error && (
          <p className="text-base text-red-500 mt-2">{error}</p>
        )}
      </TabsContent>

      <TabsContent value="about" className="w-full grow text-muted-foreground text-sm space-y-2">
        <p>This was born out of the need for a simple, mobile-friendly viewer for the mountains of Mermaid diagrams coming out of my ChatGPT sessions.</p>
        <p>As a tool for creating diagrams and visualisations using plain text, <a href="https://mermaid.js.org/" className="underline">Mermaid</a> is ideally suited for transforming the outputs of generative AI into structured formats.</p>
        <p>Created by <a href="https://smallepic.com/" className="underline">John Ngo</a> with <em>a lot</em> of help from <a href="https://v0.dev/" className="underline">v0</a> and <a href="https://cursor.com/" className="underline">Cursor</a>.</p>
      </TabsContent>
    </Tabs>
  )
} 