# Scientific rendering rules

Arabic prose stays RTL. Every scientific token is an isolated LTR component (`dir="ltr"` and `unicode-bidi: isolate`). `NuclearNotation` uses separate mass, atomic, symbol, and charge DOM nodes. Atomic-only notation does not render an empty mass placeholder. Chemical formulas use semantic `sub`; ion charge is a separate `sup` node. Mathematical notation is rendered by KaTeX through `MathInline` and `MathBlock`, never by generic text.

Unit tests assert structure and contracts; they do not prove visual appearance. A browser preview inspection is required before adding lessons.
