# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

This is Ahmed Motawea's personal portfolio site: a single static HTML page (no build step, no package manager, no framework). It is deployed as-is (e.g. via GitHub Pages) — open `index.html` directly in a browser or serve the folder with any static file server to preview changes.

## Running / previewing

There is no build or test tooling. To preview:

```
# any static server works, e.g.
npx serve .
# or just open index.html directly in a browser
```

## Architecture

- `index.html` — the entire site. All content sections live in one file as `<section id="...">` blocks: `home`, `about`, `services`, `blog`, `contact`. Navigation in `.aside .nav` links to these via `#anchor` hashes. (The `blog` section/id holds project case studies, not a blog — a legacy name from the original template.)
- `css/style.css` — layout/typography/component styles, plus the theme and dark-mode system (see below).
- `css/styleSwitcher.css` — styles for the floating theme-switcher widget (the toggle button, swatch list, light/dark mode pill).
- `js/script.js` — nav-link active-state (click + scroll-spy via `IntersectionObserver`), mobile nav toggle, and reveal-on-scroll animations for section content and project cards.
- `js/styleSwitcher.js` — implements the theme switcher: `setActiveStyle(color)` sets `data-theme="<color>"` on `<html>` and toggles the `.active` class on the matching swatch button; `setBodySkin(skin)` toggles `document.body.className` between `''` and `'dark'`. Both choices persist to `localStorage` and are restored on load.
- `images/` — profile photo, project screenshots (all `.webp`), favicon (`favicon.svg` + `favicon-32.png` fallback), and `og-image.png` (Open Graph / social link-preview card).
- `Ahmed-Motawea2.pdf` — downloadable CV/resume linked from the site.

## Theme & dark-mode system

Colors are driven entirely by CSS custom properties — there is no per-theme stylesheet to keep in sync:

- `:root` in `style.css` defines a single `--accent` variable (default pink) plus the background/heading/text/border tokens. `[data-theme="blue"]`, `"orange"`, `"yellow"`, `"green"` each override just `--accent`. Every themed selector (`.btn`, nav active/hover state, icons, progress bars, etc.) reads from `var(--accent)`, so switching themes is one attribute change on `<html>`.
- **To add a new theme color**: add one `[data-theme="name"] { --accent: #hex; }` rule in `style.css`, and one swatch `<button class="color-swatch" data-theme="name" style="background-color:#hex;color:#hex;">` in the `.style-switcher` markup in `index.html`. That's the whole change — no new CSS file, no `<link>` entry.
- Dark mode (`body.dark`) works the same way: it redefines `--background-dark/-light`, `--heading`, `--text`, `--text-muted`, `--track-bg`, and `--border-darker/-light` once, and every selector that already uses those tokens picks up dark colors automatically. Only a handful of true exceptions are listed explicitly right after that block (selectors that intentionally use a *different* token's dark value than their light-mode token would suggest) — check there before assuming a new dark-mode override is needed.
- `styleSwitcher.css`'s `--accent` (used by the floating toggle button and the active-swatch ring) is **not** set there — it inherits the live value from `:root`/`[data-theme]` on `<html>`, so it never needs separate JS syncing.

## Editing notes

- The contact form was replaced with a plain `mailto:` button (`.contact-cta` in `index.html`/`style.css`) since the site has no backend to submit to. If a real form handler is added later (e.g. Formspree/Netlify Forms), reinstate actual `<input>`/`<textarea>` fields and a `<form action="...">`.
- Blog/project screenshots are served as `.webp` with `loading="lazy" decoding="async"` and explicit `width`/`height` (except the above-the-fold hero photo, which stays eager). Keep new project images in that format/size (~900px wide is plenty given the cards render at ~366px).
- `canonical`/`og:url`/`og:image` in `<head>` currently point at `https://motawe3a.github.io/Motawea-Portfolio/`, inferred from the `origin` git remote — update these if the real deployed domain differs.
