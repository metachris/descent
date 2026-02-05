# Descent — Project Context for Claude

## What This Is

An immersive ~3.5 minute cinematic animation of falling through a tunnel to Earth's center. Poetic, emotional experience—not a physics textbook. Second-person narrative ("You fall...").

**Status: Fully implemented with multi-language support, voice narration, and procedural audio.**

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build to dist/
npm run preview      # Serve production build at http://localhost:4173
```

The dev server has HMR and will full-reload when locale files change.

## Key Decisions

1. **Animation-based, NOT scroll-based** — Auto-playing timeline with scrubber
2. **Duration: ~210 seconds (3.5 minutes)** — Short enough to share, long enough for atmosphere
3. **Playback: Auto-play + scrubber** — Plays like a video, users can pause/seek
4. **Non-linear time compression** — Slow for deaths/transitions, fast-forward for "the long fall"
5. **Six languages** — EN, DE, ES, ZH, JA, PL with poetic (not literal) translations
6. **Procedural audio** — All sound generated via Web Audio API, no audio files
7. **Voice narration** — Web Speech API with subtle style variations

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| State | Zustand (with localStorage persistence) |
| Audio | Web Audio API (procedural synthesis) |
| Voice | Web Speech API |
| Deployment | GitHub Pages via GitHub Actions |

## Project Structure

```
src/
├── components/
│   ├── PhaseVisual.tsx      # Phase-based visual background
│   ├── Narrative.tsx        # Text overlay with fade logic + voice narration
│   ├── HUD.tsx              # Depth, layer, temperature display
│   ├── Timeline.tsx         # Play/pause, seek bar, volume, voice toggle
│   ├── VerticalMinimap.tsx  # Side minimap showing progress
│   ├── LanguageSelector.tsx # Language picker (6 languages)
│   ├── VoiceSelector.tsx    # Voice picker for narration
│   ├── IntroScreen.tsx      # Initial landing screen
│   └── EndScreen.tsx        # Journey completion screen
├── hooks/
│   ├── useJourney.tsx       # Main state: progress, isPlaying, play/pause/seek
│   ├── useAudio.ts          # Procedural audio engine (pads, drums, reverb)
│   ├── useLanguage.ts       # Language state + voice enabled state
│   └── useSpeech.ts         # Voice narration with style-aware parameters
├── data/
│   ├── content.ts           # Phases, colors, types
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
  - Warm pad (detuned triangle oscillators)
  - Harmonic drone (perfect fifths)
  - Light percussion (heartbeat-like pulse)
  - Shimmer (crystalline highs for inner core)
  - Double reverb (4s + 6s convolution)
  - All parameters evolve based on `progress` (0-1)

### Voice Narration
- **`src/hooks/useSpeech.ts`** — Web Speech API integration
  - Style-aware parameters (rate, pitch, volume per narrative style)
  - **Keep pitch variations subtle** (within 5%) to avoid "different narrator" feel
  - Auto-selects female voices when available
  - Voice preference persisted in localStorage

### Visual & UI
- **`src/components/Narrative.tsx`** — Text rendering, fade logic, voice trigger
- **`src/components/Timeline.tsx`** — Playback controls, volume slider, language/voice selectors

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
