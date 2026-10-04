# Anuvab Das — Portfolio

Next.js 16.3.8, React, and strict TypeScript. Node.js LTS 24.21.0 is pinned in `.nvmrc` and `.node-version`. No AI integration.

## Run

```sh
nvm install
nvm use
npm ci
npm run dev
```

Open http://localhost:3100. Both development and production bind to localhost on port 3100. Override the port with `npm run dev -- --port 3200` or `npm start -- --port 3200`.

```sh
npm run typecheck
npm test
npm run test:coverage
npm run format:check
npm run build
npm start
```

Next.js is the application framework. Vite powers the Vitest test setup; Next.js uses its supported webpack build pipeline.

## Organization

- `app/`: server layout, metadata, and page composition.
- `components/`: small layout, section, project, and UI components.
- `context/ThemeContext.tsx`: shared theme state and animated switching.
- `hooks/`: theme access, smooth navigation, mobile menu, and scroll observers.
- `constants/portfolio.ts`: typed portfolio data.
- `constants/colors.css`: semantic color constants for both themes.
- `styles/`: section styling, motion, and responsive breakpoints.
- `tests/`: behavior and structural accessibility tests.
- `public/Anuvab_Das_Resume.pdf`: downloadable resume.

## Behavior and accessibility

Theme preference is stored in a validated SameSite cookie, secure over HTTPS. The server renders saved themes without injected scripts or raw HTML. New visitors follow their system theme after hydration. Context API owns state. Supported browsers reveal the new theme in a circle from the toggle; other browsers use a gentle color transition. Reduced-motion preferences disable ambient motion; explicitly requested theme switches retain the circular reveal.

Section links scroll smoothly, update the URL, and focus their destination after scrolling. Navigation supports keyboard operation, Escape closes the mobile menu, the active section is marked with `aria-current`, and a skip link leads to the main content. Content remains visible without JavaScript.

Tests cover theme state, cookie persistence, system preference, animated and reduced-motion paths, section scrolling/focus, mobile menu behavior, and automated accessibility rules. Automated jsdom checks do not verify visual contrast or screen-reader behavior.

## Security and deployment

No `dangerouslySetInnerHTML`, HTML injection, or inline initialization script. External links use `rel="noreferrer"`. Security headers prevent framing and MIME sniffing, and reduce referrer disclosure. Cookies contain only the appearance preference. No backend contact service; contact links open email or phone apps.

Project previews are illustrative, not screenshots of original products. Google Fonts use system fallbacks. Deploy this directory as a Next.js app to Vercel or a supported Node host. The server uses a theme cookie, so pages render dynamically.

## Test coverage

`npm run test:coverage` runs every test and enforces 100% statements, branches, functions, and lines for each application TypeScript file in `app`, `components`, `context`, `hooks`, and `constants`. Reports are written to `coverage/index.html` and `coverage/coverage-summary.json`. CSS, generated Next.js output, dependencies, and test code are outside executable application coverage. Coverage measures exercised code; it does not replace browser layout and animation checks.
