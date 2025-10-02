# Market Maker UI

Production-ready marketing site for Market Maker built with Next.js App Router, Tailwind CSS, Framer Motion, and shadcn/ui.

## Getting started

```bash
pnpm install
pnpm dev
```

The app runs at `http://localhost:3000`.

### Available scripts

| Command | Description |
| --- | --- |
| `pnpm dev` | Start the local development server. |
| `pnpm build` | Create a production build. |
| `pnpm start` | Serve the production build. |
| `pnpm lint` | Run ESLint. |
| `pnpm type-check` | Run TypeScript without emitting files. |

## Tech stack

- **Next.js 15 App Router** with React Server Components
- **Tailwind CSS 3** for design tokens and utility-first styling
- **Framer Motion 12** for performant animations that respect `prefers-reduced-motion`
- **shadcn/ui** primitives adapted to Market Maker’s design language
- **React Hook Form + Zod** for accessible, typed forms
- **next-mdx-remote** for MDX-powered blog posts

## Design system

Design tokens live in [`lib/design-tokens.ts`](./lib/design-tokens.ts) and expose motion easing, durations, and layout spacing. Copy and sample data live in [`lib/copy.ts`](./lib/copy.ts).

### Theming

The project uses the `class` strategy via [`next-themes`](https://github.com/pacocoursey/next-themes). Global CSS variables are defined in [`styles/globals.css`](./styles/globals.css) and mapped into Tailwind in [`tailwind.config.ts`](./tailwind.config.ts).

To tweak the palette:

1. Update the HSL variables under `:root` and `.dark` in `styles/globals.css`.
2. Adjust `--radius` or `--shadow` tokens to change component shape or depth.
3. Tailwind utilities automatically pick up changes through `hsl(var(--token))` references.

### Animations

Spring configurations and base easing live alongside layout tokens. Components that animate import from `lib/design-tokens.ts` to stay consistent. Motion is disabled or reduced when users opt into reduced motion.

## Content

MDX posts are stored under [`content/blog`](./content/blog). Each file includes frontmatter and body content. Use `pnpm dev` to preview new posts locally.

## Accessibility & Performance

- Focus states rely on Tailwind utilities that reference the `--ring` token.
- All interactive components are keyboard accessible and respect reduced motion.
- Images use `next/image` with responsive `sizes`.

## Theming quick reference

```ts
:root {
  --bg: 0 0% 100%;
  --fg: 224 71% 4%;
  --primary: 221 83% 53%;
  --accent: 174 60% 40%;
  --warn: 35 90% 55%;
  --danger: 0 85% 58%;
  --radius: 1.75rem;
}
```

Adjust these values to evolve the palette while keeping semantic Tailwind classes stable.
