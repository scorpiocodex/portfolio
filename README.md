# San Shibu — Portfolio

Personal portfolio for **San Shibu**, Python Full-Stack Developer — live at
[san-shibu.vercel.app](https://san-shibu.vercel.app).

## Tech stack

- **Framework**: Next.js 16 (App Router, static generation with hourly revalidation)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3 with CSS-variable design tokens (two themes: Midnight, Deep Ocean)
- **Motion**: Framer Motion
- **Background**: React Three Fiber / three.js on capable desktops, canvas fallback elsewhere
- **Hosting / analytics**: Vercel

## Featured projects

- [ScorpioWatch](https://github.com/scorpiocodex/scorpiowatch) — event-driven automation engine
  (`swatch` CLI), published on [PyPI](https://pypi.org/project/scorpiowatch/)
- [Nyxora](https://github.com/scorpiocodex/Nyxora) — offline terminal password manager,
  published on [PyPI](https://pypi.org/project/nyxora/)

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
cp .env.example .env.local   # optional, see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable     | Required | Purpose                                                                 |
| ------------ | -------- | ----------------------------------------------------------------------- |
| `GITHUB_PAT` | No       | Token for the GitHub GraphQL API (pinned repos + contribution graph).   |

Create a **fine-grained personal access token with no extra permissions** (public data only) and
set it in `.env.local` and in the Vercel project settings. Without it, the GitHub section shows the
featured projects and an "unavailable" notice instead of a contribution graph — the site never shows
placeholder activity.

## Scripts

| Script                 | What it does                          |
| ---------------------- | ------------------------------------- |
| `npm run dev`          | Start the dev server                  |
| `npm run build`        | Production build                      |
| `npm run lint`         | ESLint                                |
| `npm run typecheck`    | TypeScript, no emit                   |
| `npm test`             | Unit tests (Vitest)                   |
| `npm run format`       | Format with Prettier                  |

## Content

All site copy that comes from the resume lives in `lib/` (`constants.ts`, `projects.ts`,
`skills.ts`) and `components/Timeline.tsx`. The downloadable resume is `public/Resume.pdf`.

## Contact

- Email: sanshibu.dev@gmail.com
- GitHub: [@scorpiocodex](https://github.com/scorpiocodex)
- LinkedIn: [san-shibu-8250a9178](https://www.linkedin.com/in/san-shibu-8250a9178/)
