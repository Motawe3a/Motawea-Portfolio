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

- `index.html` — the entire site. All content sections live in one file as `<section id="...">` blocks: `home`, `about`, `services`, `blog`, `contact`. Navigation in `.aside .nav` links to these via `#anchor` hashes.
- `css/style.css` — main layout/typography/component styles.
- `css/skins/*.css` (`pink.css`, `blue.css`, `orange.css`, `yellow.css`, `green.css`) — color theme variants. Each is loaded as a `<link class="alternative-style" title="<color>">` in `<head>`; only one is enabled at a time (others carry the `disabled` attribute). `pink` is the default enabled theme.
- `css/styleSwitcher.css` — styles for the floating theme-switcher widget.
- `js/script.js` — handles nav-link active-state toggling on click.
- `js/styleSwitcher.js` — implements the theme switcher: `setActiveStyle(color)` (called via inline `onclick` handlers in `index.html`) enables the matching `alternative-style` stylesheet and disables the rest; also handles the light/dark "body skin" radio toggle by swapping `document.body.className`.
- `images/` — profile photo, portfolio thumbnails, blog thumbnails.
- `Ahmed-Motawea2.pdf` — downloadable CV/resume linked from the site.

## Editing notes

- Theme colors and the style-switcher UI are wired together across three places that must stay in sync: the `<link title="...">` list in `index.html`, the swatch buttons' `onclick="setActiveStyle('...')"` in the `.style-switcher` widget, and the corresponding file in `css/skins/`. Adding/removing a theme requires updating all three.
- The contact form has no backend/submit handler wired up (`<button type="submit">` with no `<form action>` or JS listener) — it is currently non-functional.
