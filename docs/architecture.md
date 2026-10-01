# Architecture

The project is a small React + TypeScript + Vite application. `App.tsx` is the current premium course shell and public Scientific Rendering Lab; future content should be introduced through `CourseHome`, `UnitPage`, `LessonPage`, and `LessonShell` layers without putting lesson data into the rendering primitives.

- `src/components/science.tsx`: semantic scientific primitives.
- `src/styles.css`: tokenized dark scientific design system, desktop-first layout and responsive fallback.
- `src/components/science.test.tsx`: structural regression tests.
- `vite.config.ts`: GitHub Pages base path.

No lesson content is included in this foundation phase.
