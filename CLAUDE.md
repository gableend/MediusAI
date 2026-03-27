# Medius AI Project Guidelines

## Copy and Content Rules

- **No em-dashes.** Never use the em-dash character ( — ) anywhere in the codebase: not in user-visible copy, not in code comments, not in data strings. Rewrite sentences to use periods, commas, colons, "and", "with", "so", or restructure instead. For code comments, use double-hyphen (--) if a separator is needed.

## Brand

- **Colours:** DARK `#2f4344`, RED `#da2028`, SAND `#ab9c6d`, MOSS `#84985c`
- **Font:** Poppins
- **Icons:** Phosphor Icons only (https://phosphoricons.com/). No emoji icons in UI.

## Card System

- Full variant: 360x320px (`.ap-card` class)
- Compact variant: 560x240px (hero detail panel)
- Roadmap cards: 240x240px square (self-contained, no `.ap-card`)
- All cards use `variant="full" | "compact"` prop via `CardProps`

## Tech Stack

- Next.js 14 app router, `"use client"` components
- Deployed via Netlify from `gableend/MediusAI` GitHub repo
