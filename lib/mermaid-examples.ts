export const FLOWCHART = `flowchart TD
  A[Idea] --> B{Validate}
  B -->|Yes| C[Build MVP]
  B -->|No| D[Refine]
  C --> E[Launch]
  D --> B
`

export const SEQUENCE_DIAGRAM = `sequenceDiagram
  participant User
  participant UI
  participant API
  User->>UI: Submit form
  UI->>API: POST /items
  API-->>UI: 201 Created
  UI-->>User: Show confirmation
`

export const STATE_DIAGRAM = `stateDiagram-v2
  [*] --> Idle
  Idle --> Editing: focus
  Editing --> Saving: save
  Saving --> Idle: success
  Saving --> Error: failure
  Error --> Editing: retry
`
