# CLAUDE.md

## Project Overview

A hyper-modern personal platform built with React 18 + Vite + Tailwind CSS v4. Three sections: **The Architecture** (profile/resume landing page), **The Pulse** (micro-blog feed), and **The Lab** (long-form technical articles). Dark-mode obsidian aesthetic with pan-chromatic mesh gradient background.

## Tech Stack

- **Framework**: React 18.3, TypeScript, Vite 6.3
- **Styling**: Tailwind CSS v4 (CSS-first config), inline styles with CSS custom properties
- **Animation**: `motion` (Framer Motion v12) for layout/scroll/enter-exit animations, `canvas-confetti` for particle bursts
- **Icons**: `lucide-react`
- **UI Primitives**: Radix UI (shadcn/ui components in `src/app/components/ui/`)
- **Fonts**: Syne (display), Plus Jakarta Sans (body), JetBrains Mono (code) — loaded via Google Fonts

## Architecture

### Navigation

State-based section switching — no React Router. `App.tsx` manages `activeSection` state (`'canvas' | 'pulse' | 'lab'`). `AnimatePresence` from motion handles blur-fade transitions between sections. Default section is `'canvas'`.

### Content System

All content lives in **markdown files** under `src/content/`:

```
src/content/
  loader.ts          # import.meta.glob + frontmatter parser + code-block extractor
  pulse/*.md         # Micro-blog posts
  lab/*.md           # Long-form articles
```

`loader.ts` uses Vite's `import.meta.glob('.../*.md', { eager: true, query: '?raw' })` to load all `.md` files at build time. It exports:

- `loadPulsePosts() → PulsePost[]` — sorted by date descending
- `loadLabArticles() → LabArticle[]` — sorted by date descending

**Pulse post format** (`src/content/pulse/*.md`):
```markdown
---
date: "2026-04-12"
tags: ["go", "performance"]
likes: 127
replies: 15
---

Post text here. Optional code blocks go in the body:

​```go
func main() {}
​```
```

**Lab article format** (`src/content/lab/*.md`):
```markdown
---
title: "Article Title"
subtitle: "Description"
date: "April 12, 2026"
readTime: "12 min read"
series: "Systems Engineering"
---

## Section Heading {#section-id}

Paragraph text...

​```go:router/radix.go
code with filename
​```
```

The `{#id}` syntax on headings sets the section ID for the table of contents. The `lang:filename` syntax on code fences sets the code block filename.

### Active Components

| File | Role |
|------|------|
| `src/app/App.tsx` | Shell: mesh gradient, noise overlay, nav, AnimatePresence section switching |
| `src/app/components/Navigation.tsx` | Floating glassmorphic nav bar with spring-animated indicator |
| `src/app/components/MeshGradient.tsx` | Canvas-based animated background (7 blobs, Lissajous curves, 20% res, screen blend) |
| `src/app/components/pulse/PulseFeed.tsx` | Masonry feed, tag filtering, confetti on like |
| `src/app/components/lab/LabReader.tsx` | Article reader, custom Go tokenizer/highlighter, Ghostty-style code blocks, scroll-tracked TOC |
| `src/app/components/canvas/ResumeCanvas.tsx` | Profile hero + stats + skill bars + career timeline + certifications |

### Unused Components

`Hero.tsx`, `About.tsx`, `Contact.tsx`, `TechStack.tsx`, `Projects.tsx`, `Sidebar.tsx`, `MicroBlog.tsx`, and `figma/ImageWithFallback.tsx` exist in `src/app/components/` but are **not imported** by `App.tsx`. These are from the original template.

## Design Tokens

Defined in `src/styles/theme.css`:
- Background: `#050510` (obsidian)
- Primary/Pulse accent: `#ff006e` (magenta)
- Secondary/Lab accent: `#00d4ff` (cyan)
- Canvas accent: `#8b5cf6` (violet)
- Emerald: `#00ff88`, Amber: `#ffbe0b`, Electric: `#3a86ff`, Coral: `#ff4d6d`
- Animation ease-out-expo: `cubic-bezier(0.16, 1, 0.3, 1)`
- Animation spring: `cubic-bezier(0.34, 1.56, 0.64, 1)`

## Conventions

- Inline styles with CSS custom properties for dynamic/themed values, Tailwind utilities for layout and spacing
- `style={{ fontFamily: 'var(--font-mono)' }}` for monospace text, `var(--font-display)` for headings, `var(--font-body)` for body text
- Tag colors are hardcoded in `PulseFeed.tsx` via the `TAG_COLORS` map
- Content is purely file-driven — to add posts or articles, create new `.md` files in the appropriate `src/content/` subfolder
- The Lab's syntax highlighter (`highlightGo`) is a custom tokenizer — not a library. It handles Go keywords, types, strings, comments, and numbers with a Dracula-inspired palette.

## Commands

```bash
pnpm install      # Install dependencies
pnpm dev          # Start dev server (Vite)
pnpm build        # Production build
```

## Key Notes

- `react-router` is a dependency but **not used** — navigation is state-based
- `react-dnd` is installed but not currently used in any active component
- The `@/` path alias maps to `./src`
- The Vite config includes a `figmaAssetResolver` plugin — legacy from the original template, safe to ignore
- Profile avatar in `ResumeCanvas.tsx` shows initials. To use a real photo, replace the initials `<div>` inside the `Avatar` function with an `<img>` tag (comment in code shows where)
