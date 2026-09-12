# Veritas 10

Personalised editorial news hub across five pillars — **Football**, **Politics**, **Cars**, **Finance**, and **AI**. Briefings in plain British English, every claim linked to a source, with a real fact-check status.

> Design note: where the original brief fought clarity (e.g. dense chrome, Lovable badge, “ten countries” framing), this build prefers a calmer editorial layout — generous type, card surfaces, light theme, desktop sidebar + mobile bottom nav.

## Public test URL

**https://gjnugent79-sketch.github.io/veritas-10/**

GitHub Pages serves the static `out/` export from the `gh-pages` branch (`basePath` `/veritas-10`). Live RSS often fails in the browser because of CORS; the app then uses **Cached briefing** fixtures so the happy path stays filled.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000/veritas-10](http://localhost:3000/veritas-10) (dev uses the same `basePath`).

```bash
npm test          # unit tests
npm run build     # static export → out/
```

### Environment

No API keys or database required. Profile, follows, and politics lean are stored in **localStorage** only.

Optional: if outbound RSS is blocked in your network, the app falls back to high-quality **Cached briefing** fixtures dated around September 2026 so the happy path is never empty.

## Product flow

1. Splash — “What should we call you?” (device-local).
2. Onboarding — follow subjects; set politics source lean (Left / Centre / Right / Both sides). Lean applies **only** to politics.
3. Home — personalised briefing from follows.
4. Explore — five pillars → grouped entities, search, latest briefing.
5. Entity pages — follow/unfollow, briefing, sourced company fact strip when citations exist.
6. Search — catalogue filter + free-text Gather.
7. Following — manage follows and lean.

## Fact-check UI

Statuses: **Confirmed** / **Reported** / **Disputed** / **Unclear**.

- Source links on each story; expandable outbound headlines (outlet + time).
- Conflicts stated in plain words (“Sources disagree”).
- If nothing reliable: *“No sufficiently reliable source was found to confirm this information.”*
- Live path summarises only from retrieved RSS items; otherwise clearly marked fixtures. Never invent live news. Short original extractive summaries + outbound links only — no full article text.

## Politics source lean (editorial map)

This is **our curated map**, not scraped from AllSides or MBFC:

| Lean | Outlets |
|------|---------|
| Left | Guardian, Independent, HuffPost, MSNBC |
| Centre / wire | Reuters, AP, BBC, FT, Bloomberg, Al Jazeera English |
| Right | Telegraph, Times, Spectator, Fox News, WSJ |

- **Left / Right**: prefer those outlets **plus** centre/wire.
- **Both sides**: show left **and** right (and centre if present), labelled.
- Wire/centre sources are **never** hidden.
- Source text is never rewritten to change meaning.
- Non-politics pillars are **not** lean-filtered.

## Ingestion

- Client-side gather (static Pages build has no API routes) → normalise → cluster → short original briefing.
- In-memory cache ~10 minutes in the browser session.
- Live RSS often blocked by CORS on GitHub Pages; fallback fixtures marked **Cached briefing**.

## Tech

- Next.js 14 App Router + TypeScript + Tailwind CSS (`output: 'export'` for GitHub Pages)
- `fast-xml-parser` for RSS
- Vitest unit tests: lean filtering, fact-check aggregation, feed normalisation

## Licence / copyright

Summaries are short and original; users follow outbound links for full articles. Respect publishers’ terms when deploying at scale.
