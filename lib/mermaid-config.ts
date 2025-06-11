import mermaid from "mermaid"

export const initializeMermaid = () => {
  mermaid.initialize({
    startOnLoad: true,
    theme: "base",
    securityLevel: "loose",
    fontSize: 16,
    fontFamily: "Arial",
    flowchart: {
      nodeSpacing: 50,
      rankSpacing: 50,
      curve: "basis",
      useMaxWidth: true,
      htmlLabels: true,
      padding: 15,
    },
  })
} 