# Architecture and non-negotiable product requirements

This is one unified Syrian Grade 8 Physics + Chemistry course and repository. It must remain independent from Algebra, Geometry, Mathematics, Arabic, and English projects. The current foundation is React + TypeScript + Vite; future content must extend it without replacing or weakening the scientific rendering primitives.

## Course and lesson flow

Future navigation follows:

```text
CourseHome
  → UnitPage
  → LessonPage
  → LessonShell
  → LessonFlow
  → LessonStep
```

Lessons are step-by-step experiences, not long anchor pages. On laptop/desktop, `LessonShell` provides a persistent outline/sidebar, active step, progress, and previous/next controls. On small screens the outline becomes a drawer or compact outline. Each lesson owns its own Teacher Area and its own final test.

## Desktop-first product direction

The primary experience is for 13–16 inch laptops and desktop displays. Use horizontal space deliberately: desktop sidebar/outline, multi-column educational panels, large scientific visualizations, apparatus views, and comfortable reading widths. Responsive behavior is required, but mobile layout must not define or impoverish the desktop architecture.

The visual direction is premium, extraordinary, distinctive, educational, and calm rather than generic cards or a childish palette. Information must never depend on color alone. Preserve the current visual identity while avoiding implementation or rendering patterns from any previous project.

## Source fidelity

The textbook supplied by the user is the 100% authoritative source. Before implementing a lesson, read and confirm the complete supplied source. Preserve every readable paragraph, question, example, value, unit, equation, name, diagram, result, and its order. Do not summarize, silently rewrite, omit, or replace textbook content. Platform explanations, additions, simulations, and extra examples must be visibly labeled as **Platform Explanation** or **Platform Addition** and must never be presented as textbook text.

## Scientific foundation

Keep these real independent components:

- `MathInline` and `MathBlock`: mathematical notation rendered with KaTeX, including natural stacked fractions (numerator over denominator), powers, roots, subscripts, superscripts, and Greek symbols.
- `NuclearNotation`: deterministic DOM structure for mass number, atomic number, symbol, and charge. Do not modify its scientifically correct left-side number placement merely because it appears left of the element symbol.
- `ChemicalFormula`: semantic subscripts.
- `IonNotation`: independent charge node.
- `ScientificValue` and `Unit`: isolated LTR scientific values and units.

Arabic prose is RTL. Equations, formulas, symbols, Latin numbers, and units are isolated LTR. For example, `5 kg`, `25 °C`, and `9.8 m/s²` retain number-then-unit order. Never use whitespace, Unicode positioning, string concatenation, or browser bidi behavior as a scientific layout hack.

## Interactive experiments and animation-first standard

When a supplied lesson contains a suitable experiment or activity, implement it as a genuine **Interactive Educational Experiment**, not as text inside a card or decorative animation. If the phenomenon can be represented meaningfully with motion, animation is the first choice: `student action → motion → visual change → observation → scientific interpretation`. Use interactive SVG/Canvas or DOM when appropriate, and use a static diagram only when motion is scientifically irrelevant or would not add understanding. A static image, changing number, changing label, or decorative button must never be called an Interactive Experiment. Different phenomena require different visual languages: beam deflection for Thomson, particle scattering for Rutherford, shells/electrons for Bohr, valence transfer for octet, and nucleon changes for isotopes.
 Where supported by the source, include apparatus, steps, variables, measurements, observations, results, conclusion, and the connection between measurement and result. Use SVG, Canvas, sliders, controls, and simulated apparatus when appropriate. Do not invent unreadable source details or attribute platform additions to the textbook.

## Teacher Area per lesson

Every lesson must include a lesson-specific, password-protected Teacher Area. The password is:

```text
somer173
```

Teacher Area is not a copy of the student explanation. It includes teaching guidance, lesson teaching points, common misconceptions, detailed textbook exercise solutions, and page references whenever the page is known. Long teacher material has its own section navigation. It also contains the independent answer key for that lesson's final test.

The required instructor attribution text is exactly:

```text
المهندس سومر شاهين: 0930215022
```

Do not add a title, supervision phrase, or alternative wording. The WhatsApp number may be rendered as a clickable WhatsApp link through the attribution component when appropriate.

## Final test per lesson

Each lesson ends with a new final test of 10–20 questions. Questions must assess understanding and must not merely copy textbook questions. Do not show immediate feedback during lesson questions unless explicitly required by the agreed design. The answer key belongs inside that lesson's Teacher Area.

## Accessibility and performance

Use semantic HTML, heading hierarchy, keyboard navigation, visible focus, adequate contrast, reduced-motion support, and non-color cues. Keep the laptop experience smooth. Avoid unnecessary dependencies; lazy-load heavy future lessons and simulations where useful.

## Delivery gate

Do not begin Lesson 1 until the foundation is stable and inspected: tests, typecheck, build, GitHub Actions, GitHub Pages, and scientific browser verification. This document and `scientific-rendering.md` are the contract for subsequent lesson work.
