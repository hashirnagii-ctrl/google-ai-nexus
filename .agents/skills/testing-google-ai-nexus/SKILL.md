---
name: testing-google-ai-nexus
description: Test the Google AI Nexus app (Fleet/History/3D Showcase tabs) end-to-end locally. Use when verifying UI or 3D/R3F changes in this repo.
---

# Testing Google AI Nexus

## Setup
- `npm run dev` starts Vite on http://localhost:5173 (a Node ≥20.19 warning may appear on 20.18; the app still runs).
- No auth or backend: the app is a static SPA, so testing is purely UI-driven.
- Lint: `npm run lint` (oxlint). Build: `npm run build`.
- Vercel preview deployments post URLs as PR comments — usable as an alternative test target.

## App navigation
- Tabs in the top-left of the content column: "AI Active Fleet", "AI History", "3D Showcase".
- 3D Showcase: click a product card to open the modal; buttons "Pause Spin"/"Auto Rotate", "Close Gallery"; Escape and backdrop-click also close.

## Testing 3D/WebGL content
- High-metalness `meshStandardMaterial` looks solid black without an environment map; the showcase modal uses drei `<Environment preset="city" />`. If models render black again, check that Environment is present and the HDR fetch succeeded (it downloads at runtime, so offline environments may break it).
- The canvas may be blank ~2–4s on first modal open while the HDR loads — wait before asserting.
- Auto-rotation is slow (0.28 rad/s): verify rotation by comparing two screenshots several seconds apart, not by eye.
- For drag-rotation tests via computer use: `left_mouse_down` does not accept coordinates — `mouse_move` to the start point first, then `left_mouse_down`, `mouse_move` steps (screenshot mid-drag while held), then `left_mouse_up`.
- Vite HMR applies edits instantly; still do a full reload (F5) before recording a clean test run.

## Devin Secrets Needed
None — the app has no backend or login.
