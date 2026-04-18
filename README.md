# ZHENGTAT.COM

A hyper-modern personal platform that unifies a profile/resume landing page, a micro-blog feed, and a long-form technical publication — all wrapped in an obsidian dark-mode aesthetic with pan-chromatic fluid mesh gradients.

Built with React 18, Vite, Tailwind CSS v4, and Motion (Framer Motion). Deployed to GitHub Pages at [zhengtat.com](https://zhengtat.com) via Cloudflare CNAME.

## Sections

### Bloke
A scrollable profile landing page with photo avatar, stats, grouped skill bars, expandable career timeline with detailed highlights, and certification cards.

### Tweets *(coming soon)*
A masonry-style micro-blog feed with glassmorphic cards, tag filtering, and confetti particle bursts on likes. Posts are loaded from markdown files.

### Nerd-talk *(coming soon)*
A distraction-free technical article reader with custom Go syntax highlighting, Ghostty-inspired terminal code blocks with animated copy-to-clipboard, and a scroll-tracked table of contents. Articles are loaded from markdown files.

## Getting Started

```bash
pnpm install
pnpm dev
```

The dev server starts at `http://localhost:5173/`.

For a production build:

```bash
pnpm build
```

## Adding Content

All content is file-driven — no CMS, no database.

### Add a micro-blog post

Create a new `.md` file in `src/content/pulse/`:

```markdown
---
date: "2026-04-20"
tags: ["go", "performance"]
likes: 42
replies: 5
---

Your post text here. Optionally include a code block:

```go
func main() {
    fmt.Println("hello")
}
```
```

### Add a technical article

Create a new `.md` file in `src/content/lab/`:

```markdown
---
title: "Your Article Title"
subtitle: "A short description"
date: "April 20, 2026"
readTime: "8 min read"
series: "Systems Engineering"
---

## Introduction {#introduction}

Your opening paragraph...

## Deep Dive {#deep-dive}

More content...

```go:pkg/handler.go
// Code with filename syntax
func Handle() {}
```
```

The `{#id}` on headings powers the table of contents. The `lang:filename` syntax on code fences sets the code block's filename label.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | React 18, TypeScript |
| Build | Vite 6 |
| Styling | Tailwind CSS v4, CSS custom properties |
| Animation | Motion (Framer Motion v12), canvas-confetti |
| Icons | Lucide React |
| UI Primitives | Radix UI (shadcn/ui) |
| Fonts | Space Grotesk, Plus Jakarta Sans, JetBrains Mono |

## Design

- **Background**: `#050510` obsidian base with a canvas-based animated mesh gradient (7 color blobs on Lissajous curves)
- **Accents**: Magenta (`#ff006e`), Cyan (`#00d4ff`), Violet (`#8b5cf6`), Emerald (`#00ff88`), Amber (`#ffbe0b`)
- **Surfaces**: Glassmorphic cards with `rgba(255,255,255,0.03)` + `backdrop-blur(20px)`
- **Transitions**: 500ms blur-fade section switches, spring-animated nav indicator

## License

MIT
