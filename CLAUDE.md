# Descent — Project Context for Claude

## What This Is

An immersive ~3.5 minute cinematic animation of falling through a tunnel to Earth's center. Poetic, emotional experience — not a physics textbook. Second-person narrative ("You fall...").

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000/descent/
npm run build        # Production build to dist/
npm run preview      # Serve production build at http://localhost:4173
```

## Key Decisions

1. **Animation-based, NOT scroll-based** — Auto-playing timeline with scrubber
2. **Duration: ~210 seconds (3.5 minutes)** — Short enough to share, long enough for atmosphere
3. **Playback: Auto-play + scrubber** — Plays like a video, users can pause/seek
4. **Non-linear time compression** — Slow for deaths/transitions, fast-forward for "the long fall"
5. **Six languages** — EN, DE, ES, ZH, JA, PL with poetic (not literal) translations
6. **Procedural audio** — All sound generated via Web Audio API, no audio files
7. **Voice narration** — Web Speech API with subtle style variations
8. **Stereo panning** — Pad, drone, shimmer, and wind layers panned across the stereo field with LFO modulation

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| State | Zustand (with localStorage persistence) |
| Audio | Web Audio API (procedural synthesis + stereo panning) |
| Voice | Web Speech API |
| Visuals | Canvas 2D (tunnel rings, particles), CSS gradients, three.js (IntroEarth) |
| Deployment | GitHub Pages via GitHub Actions |

## Project Structure

```
src/
├── components/
│   ├── PhaseVisual.tsx      # Phase-based gradient background + child layers
│   ├── TunnelEffect.tsx     # Canvas 2D: concentric rings, maw, speed lines
│   ├── ParticleField.tsx    # Canvas 2D: radial particles per phase
│   ├── HeatDistortion.tsx   # Heat shimmer effect
│   ├── Narrative.tsx        # Text overlay with fade logic + voice narration
│   ├── HUD.tsx              # Depth, layer, temperature display
│   ├── Timeline.tsx         # Play/pause, seek bar, volume, voice toggle
│   ├── VerticalMinimap.tsx  # Side minimap showing progress
│   ├── LanguageSelector.tsx # Language picker (6 languages)
│   ├── VoiceSelector.tsx    # Voice picker for narration
│   ├── IntroEarth.tsx       # Three.js tunnel scene (available but not wired in)
│   ├── IntroScreen.tsx      # Initial landing screen
│   └── EndScreen.tsx        # Journey completion screen
├── hooks/
│   ├── useJourney.tsx       # Main state: progress, isPlaying, play/pause/seek (rAF-based)
│   ├── useAudio.ts          # Procedural audio engine (pads, drums, reverb, stereo panning)
│   ├── useLanguage.ts       # Language state + voice enabled state
│   └── useSpeech.ts         # Voice narration with style-aware parameters
├── data/
│   ├── content.ts           # Phases, layers, types, narrative entries
│   └── locales/
│       ├── index.ts         # Language types and exports
│       ├── en.ts            # English narrative
│       ├── de.ts            # German narrative
│       ├── es.ts            # Spanish narrative
│       ├── zh.ts            # Chinese narrative
│       ├── ja.ts            # Japanese narrative
│       └── pl.ts            # Polish narrative
├── App.tsx                  # Main app with keyboard shortcuts
├── main.tsx                 # Entry point
└── index.css                # Tailwind + custom styles
```

## Key Files to Edit

### Translations
- **`src/data/locales/*.ts`** — Each language has its own file with the full narrative
- Translations should be **poetic, not literal** — adapt for the target language's literary style
- Japanese: Drop explicit subjects for literary feel
- Chinese: Use classical parallel structures

### Audio
- **`src/hooks/useAudio.ts`** — Procedural audio engine
  - Warm pad: 4 detuned triangle oscillators, panned [-0.3, -0.1, 0.1, 0.3] with breathing modulation
  - Harmonic drone: perfect fifths (E2, B2, E3), panned [-0.4, 0, 0.4] with slow sweep
  - Shimmer: crystalline highs (A major spread), wide panning [-0.6, -0.2, 0.2, 0.6] with sparkle modulation
  - Wind: filtered brown noise with LFO-driven pan sweep (0.1Hz, ±0.2)
  - Percussion: heartbeat-like pulse, kick centered, perc alternating ±0.15
  - Sub bass: stays center (no panner)
  - Double reverb (4s + 6s convolution)
  - All parameters evolve based on `progress` (0-1)
  - Module-level singleton pattern — `createEngine`/`startEngine`/`updateSoundscape`

### Voice Narration
- **`src/hooks/useSpeech.ts`** — Web Speech API integration
  - Style-aware parameters (rate, pitch, volume per narrative style)
  - **Keep pitch variations subtle** (within 5%) to avoid "different narrator" feel
  - Auto-selects female voices when available
  - Voice preference persisted in localStorage

### Visuals
- **`src/components/TunnelEffect.tsx`** — Canvas 2D tunnel effect
  - Concentric rings expanding outward from center (falling-through-tube perspective)
  - Per-phase config: ring color, speed, intensity, line count
  - Smooth interpolation between phases (lerps color/speed/intensity over last 30%)
  - "Plunge" maw animation: dark circle expands when fall begins (10-15s)
  - Stable rAF loop via refs — never restarts on phase change
- **`src/components/ParticleField.tsx`** — Canvas 2D radial particles
  - Particles spawn midway from center, drift outward
  - Per-phase config: types (dust/debris/ember/magma/crystal/sparkle), density, speed, colors
  - No particles during The Edge — they begin with the fall
- **`src/components/PhaseVisual.tsx`** — CSS gradient backgrounds with cross-fade blending
- **`src/components/Narrative.tsx`** — Text rendering, fade logic, voice trigger

## 11 Journey Phases

| Phase | Time | Depth | Character |
|-------|------|-------|-----------|
| The Edge | 0-10s | 0 km | Standing at the precipice |
| The Plunge | 10-17s | 0-1.1 km | Stepping in, falling |
| Heat Death | 17-26s | 1.1-2.7 km | You die at 47°C |
| Boiling | 26-33s | 2.7-25 km | Body dissolving |
| Crushing | 33-42s | 25-200 km | Compressed rock |
| Incineration | 42-54s | 200-400 km | Bright embers, magma |
| The Long Fall | 54-98s | 400-2900 km | Meditative, contemplative |
| Outer Core | 98-125s | 2900-5150 km | Molten iron |
| Inner Core | 125-148s | 5150-6300 km | Crystalline, golden |
| The Center | 148-172s | 6300-6371 km | Weightless, transcendent |
| The Yo-Yo | 172-210s | 6371 km | Oscillating, fading |

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause (or Start if on intro) |
| ← / → | Skip back/forward 5 seconds |
| R / Home | Restart from beginning |
| End | Jump to near end |
| F | Toggle fullscreen |

## Narrative Styles

Four styles in locale files, each with different visual AND audio treatment:

| Style | Visual | Voice |
|-------|--------|-------|
| `normal` | Standard size | Rate 0.85, normal pitch |
| `dramatic` | Larger, bold | Slower (0.78), slightly deeper |
| `whisper` | Smaller, italic | Softer volume |
| `data` | Monospace | Measured pace |

## Audio Design Notes

The soundscape is **serene at the end** — all intensity fades by 80% progress:
- Drums fade out by 80%
- Sub bass fades by 75%
- Drone fades by 70%
- Shimmer fades by 75%
- Only soft warm pad remains, then silence
- Master volume fades from 97% to 100% progress

**Voice vs ambient balance**: Voice volumes are set to ~0.4-0.5 to blend with ambient audio, not overpower it.

## Deployment

GitHub Actions workflow in `.github/workflows/deploy.yml`:
- Builds on push to `main`
- Deploys to GitHub Pages
- Base path: `/descent/`

To deploy elsewhere, update:
- `base` in `vite.config.ts`
- URLs in `index.html` (og:url, og:image, twitter:url, twitter:image)

## Success Criteria

"The experience succeeds if they say 'this made me feel something'"
