# مِرْصاد — Interactive Physics & Chemistry Grade 8

Premium, laptop-first Arabic RTL learning platform foundation for the Syrian Grade 8 Physics and Chemistry curriculum.

## Development

```bash
npm install
npm run dev
npm test
npm run typecheck
npm run build
```

The public **Scientific Rendering Lab** is the current deliverable. It intentionally contains no Lesson 1 or textbook content. See `docs/` for architecture, rendering rules, and content standards.

GitHub Pages is deployed by `.github/workflows/deploy.yml` after lint, tests, and build. The Vite base path is `/Interactive-Physics-Chemistry-Grade8-Interactive/`.
