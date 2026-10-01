# Content and lesson standards

## Source of truth: 100% fidelity

The user's supplied textbook pages are authoritative. Read the entire supplied source before implementation and confirm that it is fully legible. Keep the original order and retain every readable item: text, headings, questions, examples, values, units, equations, names, diagrams, experiment steps, observations, and results.

Never summarize, shorten, silently rephrase, omit, or substitute textbook content. Any additional material must be marked visibly as one of:

- **Platform Explanation**
- **Platform Addition**

Platform material may deepen understanding with derivations, worked examples, applications, simulations, common errors, and verification strategies, but it must not replace textbook content or be falsely attributed to the book.

## Scientific writing

Use the scientific components rather than concatenated strings:

- KaTeX through `MathInline` / `MathBlock` for every mathematical expression. Fractions are real KaTeX fractions with numerator above denominator, never slash text when mathematical fraction layout is intended.
- `NuclearNotation` for nuclear notation, preserving its correct mass/atomic placement and separate DOM fields.
- `ChemicalFormula` for semantic subscripts in `H₂O`, `CO₂`, `NaCl`, `CaCO₃`, and `H₂SO₄`.
- `IonNotation` for independently positioned charges in `Na⁺`, `Cl⁻`, `Ca²⁺`, and `SO₄²⁻`.
- `ScientificValue` and `Unit` for values such as `5 kg`, `25 °C`, and `9.8 m/s²`.

Arabic prose is RTL; every formula, equation, scientific symbol, Latin number, and unit is isolated LTR. Do not use whitespace, Unicode superscript/subscript positioning, or browser bidi behavior to force scientific layout.

## Lesson structure

Every lesson follows the future shell:

```text
LessonPage
  → LessonShell
  → LessonFlow
  → LessonStep
```

The experience is step-by-step and includes desktop outline/sidebar, active step, progress, previous/next controls, and a compact/drawer outline on small screens.

Every lesson must include:

1. Complete preserved textbook source.
2. Clearly labelled Platform Explanations/Additions where applicable.
3. Deep explanation of what, why, how, relationships, symbols, laws, units, substitution, solution steps, interpretation, useful extra examples, common mistakes, and answer verification when relevant.
4. A genuine Interactive Educational Experiment when the textbook contains a suitable experiment/activity. It should model apparatus, steps, variables, measurements, observations, results, conclusion, and the measurement-to-result relationship where applicable. It must not be a decorative animation or a text-only card.
5. A password-protected Teacher Area dedicated to that lesson, using password `somer173`. It contains teaching notes, teaching points, common mistakes, detailed textbook exercise solutions, page references whenever known, section navigation for long material, and the lesson's independent final-test answer key.
6. The exact attribution text `المهندس سومر شاهين: 0930215022`; no extra title or supervision wording.
7. A new final test with 10–20 understanding-focused questions, not simple copies of textbook questions. Immediate feedback is not shown during lesson questions unless explicitly specified by the product design.

## Experiments and source uncertainty

Do not invent apparatus, readings, outcomes, or diagrams that are not readable in the supplied source. Preserve the book's experiment and results. If a platform simulation expands the source, label it **Platform Addition**.

## Question interaction and assessment standard

Every textbook question is classified by type before rendering. Multiple-choice questions use selectable options with a visible selected state; true/false uses two controls; ordering uses an ordering control; completion uses an input; data/table questions use an appropriate structured interaction. Student selection is stored without immediate correct/incorrect feedback unless the lesson explicitly requires it. The final assessment is a new comprehensive test, not a verbatim copy of the textbook, and mixes suitable types such as choice, true/false, ordering, data interpretation, application, and short scientific response. Ten questions of one repeated type do not satisfy the standard. Future Teacher Areas contain the answer key and detailed solutions.

## Scientific table standard

Every scientific table explicitly defines text, background, border, active, hover, and selected colors at the cell/row variant level. It must not rely on inherited parent color in a way that can make scientific symbols, labels, or values invisible. This applies equally to student lessons, Teacher Area, Chemistry, Physics, and future scientific tables. Scientific cells remain LTR-isolated where applicable.

## Accessibility and presentation

Lesson content must use semantic headings and landmarks, keyboard-accessible controls, visible focus, adequate contrast, reduced-motion support, and text/shape cues in addition to color. The visual treatment should remain premium, distinctive, calm, and laptop-first rather than a generic grid of identical cards.
