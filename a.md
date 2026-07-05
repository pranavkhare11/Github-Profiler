# GitHub Profiler UI Context

This file is the design/source-of-truth context for future AI chats.

## Design Direction
- Theme inspiration: Nothing phone back-panel style.
- Core look: layered white and light-gray surfaces with subtle panel segmentation lines.
- Text color system: mostly black/gray, high readability, minimal color noise.
- Accent usage: tiny red markers only (status chips, micro indicators), not large red blocks.
- Branding feel: technical/minimal with dot-matrix typography touches.

## Typography
- Primary UI font: Manrope.
- Decorative/branding font: DotGothic16.
- Usage rule:
  - DotGothic16 for tiny labels, brand strips, technical tags.
  - Manrope for body text, headings, actionable UI text.

## Color Tokens (from CSS)
- Whites/Grays: --white-1, --white-2, --white-3, --white-4
- Borders: --line, --line-2
- Text: --text-main, --text-soft, --text-faint
- Accent: --red, --red-soft

## Global Visual Rules
- Panels use gradient white layers + light border + soft shadow.
- Subtle internal segmentation lines are acceptable if low contrast.
- Avoid heavy contrast blocks except dark action buttons (Search button).
- Keep spacing clean and structured; avoid crowded decorative clusters.

## Layout Rules
- Main shell max width is controlled by --shell-max.
- Footer behavior:
  - Must sit at bottom of viewport when content is short.
  - Should still flow naturally after content on longer pages.
- Mobile behavior:
  - Preserve clean stacking.
  - Do not break main brand/search hierarchy.

## Navbar Behavior (Important)
- Search bar visibility:
  - Hidden on search routes: / and /home
  - Visible on all other routes
- Navbar structure:
  - 3-zone alignment: left brand, center search slot, right decor
  - Center spacer is used when search is hidden, so alignment stays balanced.
- Header search bar style:
  - Compact (smaller than main page search)
  - Must not feel oversized or dominate navbar height

## Search Components
- Header search:
  - Compact controls and tighter spacing
  - Minimal/no helper text
- Main page search:
  - Full-sized controls
  - Can show helper text and suggestions clearly

## Decorative System
- Right-side navbar decor should stay subtle.
- Use small geometric micro-shapes (square/pill), with only one red element preferred.
- Decorative text should be short and low-emphasis.
- Decorations should never misalign layout or overlap functional UI.

## Route-Level UI Notes
- Search page: hero/title + subtitle + full search module.
- Profile/Not Found: same panel language and typographic hierarchy.
- Shared aesthetic across pages should remain consistent.

## Editing Constraints for Future Chats
- Keep the current design language; iterate, do not hard-reset style direction.
- Avoid introducing random new color palettes unless explicitly requested.
- Avoid massive layout shifts unless user asks for redesign.
- Prefer small, targeted CSS updates with clear visual intent.

## If You Need to Extend This
When adding new UI modules (profile cards, repo lists, followers list), follow:
1. Panel-first surfaces (white/gray layers).
2. Black/gray text hierarchy.
3. Tiny red accents only.
4. Dot-matrix only for micro labels, not long body text.
5. Keep spacing and alignment strict; no floating/off-grid elements.
