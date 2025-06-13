import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { FLOWCHART, GANTT_CHART, USER_JOURNEY } from "@/lib/mermaid-examples";

interface AiSuggestionProps {
  onSelect: (code: string) => void;
}

const suggestions = [FLOWCHART, GANTT_CHART, USER_JOURNEY];

export function AiSuggestion({ onSelect }: AiSuggestionProps) {
  const [index, setIndex] = useState(0);
  const suggestion = suggestions[index];

  const handleNext = () => {
    setIndex((index + 1) % suggestions.length);
  };

  return (
    <Card className="mb-2 p-3 space-y-2">
      <h3 className="text-sm font-semibold">AI Suggestion</h3>
      <pre className="whitespace-pre-wrap text-xs max-h-32 overflow-auto">
        {suggestion}
      </pre>
      <div className="flex gap-2">
        <Button size="sm" onClick={() => onSelect(suggestion)}>
          Use
        </Button>
        <Button variant="outline" size="sm" onClick={handleNext}>
          Next
        </Button>
      </div>
    </Card>
  );
}
