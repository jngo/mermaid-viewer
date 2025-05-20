import mermaid from "mermaid"

export const DEFAULT_DIAGRAM = `flowchart TD
    A["\`By reconceptualizing intelligence as multiple, Gardner transforms our understanding of cognitive potential and demands more inclusive educational practices.\`"] --> B["\`Gardner posits intelligence as plural, each with unique cognitive capacities.\`"]
    A --> C["\`He outlines several distinct intelligences, each shaped by biology and environment.\`"]
    A --> D["\`Multiple Intelligence theory challenges educational norms to support diverse learning styles.\`"]
    A --> E["\`While influential, the theory faces critiques and evolves through continued research.\`"]

    B --> B1["\`Traditional views treat intelligence as a single general factor.\`"]
    B --> B2["\`Gardner argues different cognitive faculties operate independently.\`"]

    C --> C1["\`Eight primary intelligences include linguistic, logical-mathematical, musical, spatial, bodily-kinesthetic, interpersonal, intrapersonal, and naturalistic.\`"]
    C --> C2["\`Each intelligence has unique developmental pathways and contextual influences.\`"]

    C1 --> C1a["\`Linguistic: Focuses on the effective use of language for expression and comprehension.\`"]
    C1 --> C1b["\`Logical-mathematical: Centers on abstract reasoning, numerical patterns, and problem-solving.\`"]
    C1 --> C1c["\`Musical: Concerns sensitivity to sounds, rhythms, and musical structure.\`"]
    C1 --> C1d["\`Spatial: Involves mental imagery and the ability to manipulate spatial configurations.\`"]
    C1 --> C1e["\`Bodily-kinesthetic: Relates to skillful control over physical movement and object handling.\`"]
    C1 --> C1f["\`Interpersonal: Captures the capacity to understand and communicate effectively with others.\`"]
    C1 --> C1g["\`Intrapersonal: Reflects introspective self-awareness, personal emotions, and motivations.\`"]
    C1 --> C1h["\`Naturalistic: Pertains to recognizing and categorizing elements of the natural world.\`"]

    D --> D1["\`Most education systems overly emphasize linguistic and logical abilities.\`"]
    D --> D2["\`A broader approach supports diverse talents and ways of learning.\`"]

    E --> E1["\`Critics question the criteria for defining and identifying separate intelligences.\`"]
    E --> E2["\`Successive research explores expansions, such as existential or emotional intelligence.\`"]
`

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