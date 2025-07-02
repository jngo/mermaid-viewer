export const FLOWCHART = `---
title: Frames of Mind by Howard Gardner
---
flowchart TD
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
  E --> E2["\`Successive research explores expansions, such as existential or emotional intelligence.\`"]`;

export const GANTT_CHART = `gantt
title The Space Race (1957–1975)
dateFormat YYYY-MM-DD
axisFormat %Y

section USSR

Sputnik Program                                                                     :done, sputnik,   1957-10-04, 1958-05-15
Sputnik 1#colon; First satellite to orbit Earth                                     :milestone,       1957-10-04, 1d
Sputnik 2#colon; Laika the dog becomes the first animal to orbit Earth              :milestone,       1957-11-03, 1d

Luna Program                                                                        :done, luna,      1959-01-02, 1975-07-24
Luna 1#colon; First spacecraft to reach the vicinity of the moon                    :milestone,       1959-01-02, 1d
Luna 1#colon; First spacecraft to orbit the sun                                     :milestone,       1959-01-04, 1d
Luna 2#colon; First hard landing of a spacecraft on the moon                        :milestone,       1959-09-14, 1d
Luna 9#colon; First soft landing of a spacecraft on the moon                        :milestone,       1966-02-03, 1d
Luna 10#colon; First spacecraft to orbit the moon                                   :milestone,       1966-04-03, 1d

Vostok Program                                                                      :done, vostok,    1961-04-12, 1963-06-19
Vostok 1#colon; Yuri Gagarin becomes the first human to orbit Earth                 :milestone,       1961-04-12, 1d
Vostok 6#colon; Valentina Tereshkova becomes the first woman in space               :milestone,       1963-06-16, 1d

Voskhod Program                                                                     :done, voskhod,   1964-10-12, 1965-03-18
Voskhod 1#colon; First multiperson spacecraft to orbit Earth                        :milestone,       1964-10-12, 1d
Voskhod 2#colon; Alexei Leonov completes the first spacewalk                        :milestone,       1965-03-18, 1d

Soyuz Program                                                                       :done, soyuz,     1967-04-23, 1975-07-17
Soyuz 1#colon; Vladimir Komarov becomes the first fatality in spaceflight history   :milestone,       1967-04-23, 1d
Kosmos 186 & Kosmos 188#colon; First automated docking of two spacecraft            :milestone,       1967-10-30, 1d
Zond 5#colon; First spacecraft to circle the moon and return safely to Earth        :milestone,       1968-09-15, 1d
Soyuz 4 & Soyuz 5#colon; First crewed docking and transfer between two spacecraft   :milestone,       1969-01-16, 1d

section USA

NASA#colon; The National Aeronautics and Space Administration is established        :milestone,       1958-07-29, 1d

Explorers Program                                                                   :done, explorer,  1958-01-31, 1975-07-24
Explorer 1#colon; First American satellite to orbit Earth                           :milestone,       1958-02-01, 1d
Explorer 6#colon; First photograph of Earth from orbit                              :milestone,       1959-08-07, 1d

Project Mercury                                                                     :done, mercury,   1958-10-07, 1963-05-16
Mercury-Redstone 2#colon; Ham becomes the first the chimpanzee in space             :milestone,       1961-01-31, 1d
Freedom 7#colon; Alan Shepard becomes the first American to orbit Earth             :milestone,       1962-02-20, 1d

Project Gemini                                                                      :done, gemini,    1961-12-07, 1966-11-15
Gemini 3#colon; First spacecraft to perform piloted orbital maneuvers               :milestone,       1965-03-23, 1d
Gemini 4#colon; Ed White completes first American spacewalk                         :milestone,       1965-06-03, 1d
Gemini 6A & Gemini 7#colon; First crewed rendezvous of two spacecraft               :milestone,       1965-12-15, 1d
Gemini 8 & Agena#colon; First crewed docking of two spacecraft in orbit             :milestone,       1966-03-16, 1d

"We choose to go to the Moon" — President John F. Kennedy                           :milestone,       1962-09-12, 1d

Apollo Program                                                                      :done, apollo,    1961-05-25, 1972-12-19
Apollo 1#colon; Gus Grissom, Ed White, and Roger Chaffee killed in test            :milestone,        1968-01-27, 1d
Apollo 7#colon; First crewed Apollo mission and TV broadcast from space            :milestone,        1968-10-11, 1d
Apollo 8#colon; First crewed spacecraft to orbit the moon                          :milestone,        1968-12-21, 1d
Apollo 11#colon; Neil Armstrong becomes first human to walk on the moon            :milestone,        1969-07-20, 1d

section Partnership

Apollo–Soyuz Test Project                                                           :done, astp,      1972-01-01, 1975-07-24
President Nixon and Premier Kosygin sign space cooperation agreement                :milestone,       1972-05-24, 1d
Tom Stafford and Alexei Leonov exchange first international handshake               :milestone,       1975-07-17, 1d`;

export const USER_JOURNEY = `journey
title Two-Week Sprint

section Sprint Planning
  Overpack sprint with stakeholder demands:             3: Product Manager
  Warn about technical debt and timeline:               2: Tech Lead
  Negotiate details and lose %40 of intended scope:         2: Product Designer
  Commit to sprint knowing it won't actually ship:          3: Product Manager, Tech Lead, Product Designer

section Days 1–2 (Retro-Fitted Discovery)
  Hold urgent clarification meetings:                 2: Product Manager
  Spike an architectural change that will miss the sprint:      2: Tech Lead
  Redesign user flow after late stakeholder feedback:         2: Product Designer

section Days 3–7 (Delivery Grind)

  Fend off “is this done yet?” Slacks from multiple stakeholders:   2: Product Manager
  Merge half-finished feature under ‘feature flag’, flag stays off: 2: Tech Lead
  Daily stand-up devolves into status-report karaoke:         2: Product Manager, Tech Lead, Product Designer

section Days 8–13 (Scramble to the Finish)
  Deliver ‘good enough’ designs, neglect edge and corner cases:   2: Product Designer
  Scope increases by 30% because “it’s just one more field”:    1: Tech Lead, Product Designer
  Hardcode config variables, leave TODO comment for next engineer:  2: Tech Lead
  Triage bugs into next sprint labeled as ‘tech enhancement’:     3: Product Manager

section Day 14 (Sprint Review)
  Present incomplete features:                    4: Product Manager
  Demo only happy path scenarios:                   3: Tech Lead
  Frame inconsistencies as opportunities:               3: Product Designer
  Stakeholders applaud demo, ask “can we launch next week?”:    2: Product Manager, Tech Lead, Product Designer

section Day 14 (Retrospective)
  Everyone agrees “communication could be better” (again):      3: Product Manager, Tech Lead, Product Designer
  Action items captured, archived when new sprint starts:       2: Product Manager
  Team high-fives surviving another sprint, cycle repeats:      3: Product Manager, Tech Lead, Product Designer
`;