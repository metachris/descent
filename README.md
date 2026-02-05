# Descent

**A 3.5-minute journey to the center of the Earth.**

What happens if you jump into a tunnel that goes straight through the planet? Spoiler: you die at 1.1 km from heat stroke. But your dust keeps falling...

[**Try it live →**](https://metachris.github.io/descent/)

![Descent Preview](public/og-image.svg)

## Features

- **Poetic narrative** — Second-person, present tense. You're not learning physics, you're *experiencing* it.
- **6 languages** — English, German, Spanish, Chinese, Japanese, Polish
- **Voice narration** — Your browser reads the story aloud (toggle it on in the controls)
- **Procedural audio** — No audio files. Everything is synthesized in real-time with Web Audio API.
- **3.5 minutes** — Short enough to share, long enough to feel something.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000), put on headphones, and fall.

## Fork It & Play

This project was built with [Claude Code](https://claude.ai/code). Want to remix it?

1. **Fork this repo**
2. **Clone it locally**
3. **Open it with Claude Code** and start experimenting:
   - *"Add a French translation"*
   - *"Make the visuals more psychedelic"*
   - *"Add a heartbeat sound that speeds up as you approach the core"*
   - *"Change the ending to be more ominous"*
4. **Push to your fork** — GitHub Actions will auto-deploy to your GitHub Pages

The `CLAUDE.md` file gives Claude all the context it needs about the project structure, key files, and design decisions.

## Tech Stack

| What | How |
|------|-----|
| UI | React 18 + TypeScript + Tailwind |
| Build | Vite |
| State | Zustand |
| Audio | Web Audio API (procedural) |
| Voice | Web Speech API |
| Deploy | GitHub Pages + Actions |

No WebGL. No 3D libraries. Just CSS gradients, canvas particles, and vibes.

## Controls

| Key | Action |
|-----|--------|
| Space | Play/Pause |
| ← → | Skip 5 seconds |
| R | Restart |
| F | Fullscreen |

## The Science

Based on real physics from [Dr. Christopher S. Baird](https://www.wtamu.edu/~cbaird/sq/2013/10/04/what-would-happen-if-you-fell-into-a-hole-that-went-through-the-center-of-the-earth/):

- With air resistance: ~7 days to reach the center
- Terminal velocity: ~200 km/h
- You'd die at 1.1 km (47°C heat stroke)
- Without air: 38 minutes 11 seconds, reaching 28,800 km/h

## Credits

Created by [Chris Hager](https://www.metachris.com) with [Claude Code](https://claude.ai/code).

---

*6,371 km. One week. Six languages. One journey.*
