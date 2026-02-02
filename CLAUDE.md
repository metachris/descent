# Descent — Project Context for Claude

## What This Is

An immersive ~3.5 minute cinematic animation of falling through a tunnel to Earth's center. Poetic, emotional experience—not a physics textbook. Second-person narrative ("You fall...").

**Status: Fully implemented and working.**

## Quick Start

```bash
npm install          # Install dependencies
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Production build to dist/
npm run preview      # Serve production build at http://localhost:4173
```

The dev server has HMR and will full-reload when `src/data/content.ts` changes.

## Key Decisions

1. **Animation-based, NOT scroll-based** — Auto-playing timeline with scrubber
2. **Duration: ~210 seconds (3.5 minutes)** — Short enough to share, long enough for atmosphere
3. **Playback: Auto-play + scrubber** — Plays like a video, users can pause/seek
4. **Non-linear time compression** — Slow for deaths/transitions, fast-forward for "the long fall"

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | React 18 + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS |
| Animation | Theatre.js (timeline/scrubbing) |
| State | Zustand (via useJourney hook) |

## Project Structure

```
src/
├── components/
│   ├── PhaseVisual.tsx      # Phase-based visual background
│   ├── Narrative.tsx        # Text overlay with fade logic
│   ├── HUD.tsx              # Depth, layer, temperature display
│   ├── Timeline.tsx         # Play/pause, seek bar
│   ├── VerticalMinimap.tsx  # Side minimap showing progress
│   ├── AudioController.tsx  # Audio controls
│   ├── IntroScreen.tsx      # Initial landing screen
│   ├── EndScreen.tsx        # Journey completion screen
│   └── Earth.tsx            # (placeholder for 3D Earth)
├── hooks/
│   ├── useJourney.tsx       # Main state: progress, isPlaying, play/pause/seek
│   └── useAudio.ts          # Audio playback hook
├── data/
│   └── content.ts           # All content: phases, narrative entries, colors
├── App.tsx                  # Main app with keyboard shortcuts
├── main.tsx                 # Entry point
└── index.css                # Tailwind + custom styles
```

## Key Files to Edit

### Content & Narrative
- **`src/data/content.ts`** — All narrative text, timing, phases, colors. This is the main content file.
  - `NARRATIVE` array (line ~87): All text entries with `text`, `startTime`, `endTime`, `style`
  - `PHASES` array: Journey phases with depth ranges, colors, descriptions
  - `TOTAL_DURATION`: Total animation duration in seconds

### Visual & UI
- **`src/components/Narrative.tsx`** — Text rendering, fade logic, styling
- **`src/components/PhaseVisual.tsx`** — Background visuals per phase
- **`src/components/HUD.tsx`** — Depth/layer/temperature display
- **`src/components/IntroScreen.tsx`** — Landing page before journey starts

### Playback
- **`src/hooks/useJourney.tsx`** — Timeline state and controls
- **`src/App.tsx`** — Keyboard shortcuts (Space, arrows, R, Home, End)

## Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Space | Play/Pause (or Start if on intro) |
| ← / → | Skip back/forward 5 seconds |
| R / Home | Restart from beginning |
| End | Jump to near end |
| Shift+F | Hard refresh (dev) |

## Narrative Styles

Four styles available in `content.ts`:
- `normal` — Standard narrative text
- `dramatic` — Larger, bolder for key moments
- `whisper` — Smaller, italic for quiet moments
- `data` — Monospace for numbers/measurements

## Vite Config Notes

`vite.config.ts` has:
- Custom plugin to full-reload on `content.ts` changes
- `host: true` and `allowedHosts: true` for network access
- Port 3000

## Reference Documents

```
/BRIEF.md              — Creative vision, narrative arc, emotional journey
/tmp/TECH_BRIEF.md     — Old scroll-based tech plan (shader code still useful)
```

## Success Criteria

From BRIEF.md: "The experience succeeds if they say 'this made me feel something'"
