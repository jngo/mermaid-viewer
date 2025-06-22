export const FLOWCHART = `flowchart TD
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
    dateFormat  YYYY-MM-DD
    axisFormat  %Y

    %% ----------------------------------------------------
    %%   Soviet Union
    %% ----------------------------------------------------
    section USSR
    Sputnik program            :done,   sputnik, 1957-10-04, 1959-01-01
    Sputnik 1 – first artificial satellite   :milestone, 1957-10-04, 1d
    Sputnik 2 – Laika becomes first animal in orbit   :milestone, 1957-11-03, 1d
    Luna robotic probes        :done,   luna,    1959-01-02, 1966-12-24
    Vostok human flights       :done,   vostok,  1960-05-15, 1963-06-19
    Yuri Gagarin – first human in orbit   :milestone, 1961-04-12, 1d
    Voskhod multi-crew craft   :done,   voskhod, 1964-10-12, 1965-11-17
    First space-walk (Leonov)             :milestone, 1965-03-18, 1d
    Soyuz (early phase)        :done,   soyuz,   1967-04-23, 1975-07-17

    %% ----------------------------------------------------
    %%   United States
    %% ----------------------------------------------------
    section USA
    Explorer satellite series  :done,   explorer, 1958-01-31, 1958-11-01
    Mercury program            :done,   mercury,  1958-10-07, 1963-05-16
    Gemini program             :done,   gemini,   1961-12-19, 1966-11-15
    Apollo (incl. landings)    :done,   apollo,   1961-05-25, 1972-12-19
    JFK "Moon Speech"                     :milestone, 1961-05-25, 1d
    First Moon landing (Apollo 11)        :milestone, 1969-07-20, 1d
    Skylab space station       :done,   skylab,   1973-05-14, 1974-02-08

    %% ----------------------------------------------------
    %%   Partnership
    %% ----------------------------------------------------
    section Partnership
    Apollo–Soyuz Test Project  :done,   astp,     1972-01-01, 1975-07-24
    Apollo–Soyuz handshake                :milestone, 1975-07-17, 1d`;

export const USER_JOURNEY = `journey
    title Two-Week Sprint

    section Sprint Planning
        Overpack sprint with stakeholder demands:                         3: Product Manager
        Warn about technical debt and timeline:                           2: Tech Lead
        Negotiate details and lose %40 of intended scope:                 2: Product Designer
        Commit to sprint knowing it won't actually ship:                  3: Product Manager, Tech Lead, Product Designer

    section Days 1–2 (Retro-Fitted Discovery)
        Hold urgent clarification meetings:                               2: Product Manager
        Spike an architectural change that will miss the sprint:          2: Tech Lead
        Redesign user flow after late stakeholder feedback:               2: Product Designer

    section Days 3–7 (Delivery Grind)

        Fend off “is this done yet?” Slacks from multiple stakeholders:   2: Product Manager
        Merge half-finished feature under ‘feature flag’, flag stays off: 2: Tech Lead
        Daily stand-up devolves into status-report karaoke:               2: Product Manager, Tech Lead, Product Designer

    section Days 8–13 (Scramble to the Finish)
        Deliver ‘good enough’ designs, neglect edge and corner cases:     2: Product Designer
        Scope increases by 30% because “it’s just one more field”:        1: Tech Lead, Product Designer
        Hardcode config variables, leave TODO comment for next engineer:  2: Tech Lead
        Triage bugs into next sprint labeled as ‘tech enhancement’:       3: Product Manager

    section Day 14 (Sprint Review)
        Present incomplete features:                                      4: Product Manager
        Demo only happy path scenarios:                                   3: Tech Lead
        Frame inconsistencies as opportunities:                           3: Product Designer
        Stakeholders applaud demo, ask “can we launch next week?”:        2: Product Manager, Tech Lead, Product Designer

    section Day 14 (Retrospective)
        Everyone agrees “communication could be better” (again):          3: Product Manager, Tech Lead, Product Designer
        Action items captured, archived when new sprint starts:           2: Product Manager
        Team high-fives surviving another sprint, cycle repeats:          3: Product Manager, Tech Lead, Product Designer
`;