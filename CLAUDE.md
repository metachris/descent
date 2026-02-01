# Descent — Project Context for Claude

## What This Is

An immersive 2-3 minute cinematic animation of falling through a tunnel to Earth's center. Poetic, emotional experience—not a physics textbook. Second-person narrative ("You fall...").

## Key Decisions Made

1. **Animation-based, NOT scroll-based** — Previous tech brief used scroll (10,000vh). We pivoted to auto-playing timeline with scrubber.
2. **Duration: ~150 seconds (2.5 minutes)** — Short enough to share, long enough for atmosphere.
3. **Playback: Auto-play + scrubber** — Plays like a video, but users can pause/seek.
4. **Non-linear time compression** — Slow for deaths/transitions, fast-forward for "the long fall" (5 days compressed to ~40 seconds).

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript |
| 3D | React Three Fiber + drei |
| Build | Vite |
| Styling | Tailwind CSS |
| Animation | **GSAP** (not Framer Motion) — better for timeline/scrubbing |
| State | Zustand |

## What Exists

```
/BRIEF.md              — Creative vision, narrative arc, emotional journey (READ THIS FIRST)
/tmp/TECH_BRIEF.md     — Old scroll-based tech plan (partially outdated, but shader code is useful)
/tmp/descent-content.ts — Complete content data: phases, narrative, layer colors, physics data
```

## What Needs to Be Built (Nothing implemented yet)

### Project Structure to Create
```
src/
├── components/
│   ├── Scene.tsx           # R3F Canvas wrapper
│   ├── Earth.tsx           # Earth sphere + shaders + cutaway
│   ├── Narrative.tsx       # Text overlay with fade logic
│   ├── HUD.tsx             # Depth, layer, day counter
│   └── TimelineScrubber.tsx # Play/pause, seek bar
├── hooks/
│   ├── useTimeline.ts      # GSAP timeline + progress state
│   └── usePhase.ts         # Phase detection from progress
├── stores/
│   └── journeyStore.ts     # Zustand store: progress, isPlaying
├── shaders/
│   ├── earth.vert
│   └── earth.frag
├── data/
│   └── content.ts          # Move from tmp/descent-content.ts
├── App.tsx
├── main.tsx
└── index.css
```

### Config files needed
- package.json
- vite.config.ts
- tsconfig.json
- tailwind.config.js
- postcss.config.js
- index.html

## Timeline Duration Breakdown

| Phase | Animation Duration |
|-------|-------------------|
| Intro (edge) | 8s |
| Plunge | 6s |
| Heat death | 8s |
| Boiling | 6s |
| Crushing | 8s |
| Incineration | 10s |
| Long fall | 40s (days tick by) |
| Outer core | 25s |
| Inner core | 20s |
| Center | 20s |
| **Total** | **~150s** |

## Core Architecture

```
GSAP Timeline (0-1 progress) ──► Zustand Store ──► All Components
                                      │
     ┌────────────────────────────────┼────────────────────────────────┐
     │                                │                                │
     ▼                                ▼                                ▼
  Camera                          Narrative                          HUD
  Position                        Text/Fades                    Depth/Layer/Day
     │
     ▼
  Earth Shader
  (cutaway angle, glow)
```

## Key Visual Elements

1. **Earth** — Sphere with cutaway revealing cross-section layers
2. **Camera** — Orbits from far (whole Earth) to close (glowing center)
3. **Narrative** — Center-screen text with fade in/out, three styles: normal, dramatic, whisper
4. **HUD** — Depth counter, current layer, day counter, mini Earth diagram
5. **Scrubber** — Bottom of screen, play/pause + seek bar

## Dependencies

```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@react-three/fiber": "^8.15.0",
    "@react-three/drei": "^9.88.0",
    "@react-three/postprocessing": "^2.15.0",
    "three": "^0.158.0",
    "gsap": "^3.12.0",
    "zustand": "^4.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@types/three": "^0.158.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.0",
    "postcss": "^8.4.0",
    "tailwindcss": "^3.3.0",
    "typescript": "^5.2.0",
    "vite": "^5.0.0"
  }
}
```

## Implementation Order

1. **Project setup** — Vite, deps, Tailwind, basic App
2. **Timeline engine** — journeyStore + useTimeline + TimelineScrubber
3. **Earth visualization** — Sphere, shaders, cutaway, camera
4. **Narrative system** — Text overlays with fade logic
5. **HUD** — Depth/layer/day counter, mini Earth
6. **Polish** — Post-processing (bloom), final timing tweaks

## Important Notes

- The content data in `tmp/descent-content.ts` is complete and ready to use — move it to `src/data/content.ts`
- Shader pseudocode is in `tmp/TECH_BRIEF.md` (still valid)
- Font for narrative: Serif (Cormorant Garamond or similar)
- Background: Dark void (#050507)
- Core glow: Gold/orange, pulses subtly, intensifies as you approach center

## Success Criteria

From BRIEF.md: "The experience succeeds if they say 'this made me feel something'"
