# Building Descent: A Journey to the Center of the Earth

What would happen if you jumped into a tunnel that went straight through the Earth? It's a classic physics thought experiment—one that usually ends with equations about [simple harmonic motion](https://en.wikipedia.org/wiki/Simple_harmonic_motion) and a neat answer of "38 minutes to the other side."

But that answer assumes a vacuum. No air. No friction. In reality, you'd fall through air, hit terminal velocity around 200 km/h, and the journey would take about a week. You'd also die within the first kilometer from heat stroke.

I wanted to build an experience that explores that reality—not as a physics lesson, but as a poetic, meditative journey. The result is **Descent**, a 3.5-minute immersive web experience that takes you falling through the Earth, layer by layer, death by death, until you reach the center.

## The Vision: Experience Over Education

From the start, I knew what I didn't want: a physics textbook with pretty graphics. The goal wasn't to teach people the exact temperature gradient of the mantle. It was to make them *feel* something—the vertigo of the fall, the horror of the deaths, the alien beauty of the outer core, the peace of finally arriving at the center.

The guiding principle became: **poetry over precision**. The science is real—the temperatures, the layer depths, the pressure at the center—but it's delivered through intimate, second-person narrative rather than data dumps.

"You stand at the edge. The tunnel yawns before you."

Not: "The hypothetical tunnel has a diameter of..."

## The Narrative Arc

The experience follows you (literally—it's written in second person, present tense) as you fall. But here's the thing: you die at 1.1 kilometers. Heat stroke. 47°C.

What happens for the remaining 6,370 kilometers? Your body continues. Then your remains. Then your dust. The narrative shifts from personal to posthumous, and somehow that makes it more poignant. You're no longer there, but the journey continues without you.

The emotional arc moves through:
- **Anticipation** at the edge
- **Exhilaration** in the plunge
- **Horror** through the deaths
- **Meditation** during the long fall
- **Awe** in the outer core
- **Peace** at the center

The pacing reflects this. Deaths are slow—you need time to process them. The long fall through the mantle is sparse, with text like "And falls. And falls." followed by silence. The arrival at the center breathes.

## Technical Decisions

### Animation vs. Scroll

Early on I considered making this scroll-based—you scroll down, you descend. It's intuitive. But it has problems:

1. Scroll hijacking frustrates users
2. Pacing becomes user-controlled (bad for emotional beats)
3. Mobile scroll behavior is unpredictable

Instead, Descent plays like a video. It auto-plays with a timeline scrubber. You can pause, seek, skip—but the default experience has intentional pacing. This was the right call.

### The Tech Stack

- **[React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)** — Component architecture for the UI layers
- **[Vite](https://vitejs.dev/)** — Fast builds, great HMR, no configuration headaches
- **[Tailwind CSS](https://tailwindcss.com/)** — Rapid styling without context-switching
- **[Zustand](https://zustand-demo.pmnd.rs/)** — Minimal state management for playback, language, and voice preferences (with localStorage persistence)
- **[Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)** — Procedural audio synthesis, no audio files
- **[Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API)** — Voice narration with style-aware parameters
- **[GitHub Actions](https://github.com/features/actions)** — Automated deployment to GitHub Pages

No 3D libraries. No [WebGL](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API). The visuals are CSS gradients, layered divs, and some canvas work for particles. This keeps it fast and accessible—no GPU requirements, works on any device.

### Six Languages

Descent is fully translated into **six languages**: English, German, Spanish, Chinese, Japanese, and Polish. The translations aren't just literal—they're crafted to feel poetic in each language.

Japanese drops the explicit subject ("you") for a more literary feel: 「縁に立つ。」instead of 「あなたは縁に立っている。」 Chinese uses classical parallel structures: 「骨化为灰，肉化为尘。」("Bone becomes ash, flesh becomes dust.")

The language selector is available on the intro screen and in the playback controls. Your preference persists across sessions.

### Voice Narration

The narrative can be spoken aloud using the browser's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). But text-to-speech for poetry is tricky—robotic voices kill the mood.

The solution: **style-aware speech parameters**. Each narrative style (normal, dramatic, whisper, data) gets different rate, pitch, and volume settings:

| Style | Rate | Pitch | Feel |
|-------|------|-------|------|
| Normal | 0.85 | 1.0 | Natural storytelling |
| Dramatic | 0.75 | 0.9 | Slower, deeper |
| Whisper | 0.9 | 1.1 | Lighter, softer |
| Data | 0.95 | 0.85 | Measured, factual |

The voice selector auto-picks female voices when available (they tend to sound warmer for narrative), but users can choose any voice their system offers. Neural/natural voices are prioritized over robotic ones.

### Procedural Audio

The sound design is entirely procedural—no audio files. The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) generates everything in real-time:

- **Warm pad**: Four detuned triangle oscillators creating a rich, chorused drone
- **Harmonic drone**: Perfect fifth intervals (E-B-E) that slowly descend as you fall
- **Gentle wind**: Ultra-smooth brown noise, heavily filtered
- **Crystalline shimmer**: High harmonics that fade in during the inner core
- **Light percussion**: A heartbeat-like pulse that builds through the outer core and fades to silence at the center
- **Double reverb**: 4-second and 6-second [convolution reverbs](https://en.wikipedia.org/wiki/Convolution_reverb) for depth

The soundscape evolves with your progress. It swells during the plunge, fades during death, becomes vast and meditative during the long fall, and reaches maximum reverb at the center. The ending is deliberately serene—all intensity fades away, leaving just a soft warm pad that dissolves into silence. No sudden changes—everything crossfades smoothly.

## Lessons Learned

**Silence is content.** The long fall section has maybe 30 words across 44 seconds. That emptiness is intentional. It lets you feel the scale of time passing.

**Data as poetry.** Showing "47°C" or "5,000°C" at key moments is more powerful than explaining what those temperatures mean. The number is the poetry.

**The end matters.** When you reach the center, you don't stop—momentum carries you through. You oscillate back and forth, a human yo-yo, until finally settling at the exact center of the Earth. That physics detail (which is real) makes the ending feel earned.

## Built with Claude Code

This project was built collaboratively with [Claude Code](https://claude.ai/code), Anthropic's AI coding assistant. The workflow was conversational—describing what I wanted, iterating on the narrative, debugging the audio system, refining the pacing. It's a different way of building software: more like directing than typing.

Some things Claude Code handled particularly well:
- Generating the procedural audio system from a description of the desired atmosphere
- Iterating on narrative text with an understanding of emotional beats
- Suggesting technical approaches (animation-based vs. scroll-based)
- Translating the narrative into six languages while maintaining poetic quality
- Building the voice narration system with style-aware speech parameters
- Adding light percussion that builds and fades with the emotional arc
- Fine-tuning the ending to feel serene rather than abrupt

The collaboration felt less like using a tool and more like working with someone who understood both the code and the creative intent.

## Try It

Descent is live at [descent.earth](https://descent.earth). Put on headphones, go fullscreen, and fall.

A few things to try:
- **Enable voice narration** (speech bubble icon) to hear the narrative spoken aloud
- **Switch languages** to experience the journey in German, Spanish, Chinese, Japanese, or Polish
- **Adjust the volume** (hover over the speaker icon) to find the right level for the procedural audio

The experience succeeds if you say "this made me feel something." That was always the goal—not to teach, but to evoke. To make the incomprehensible scale of our planet feel, for 3.5 minutes, almost comprehensible.

6,371 kilometers. One week. One journey. Six languages.

---

*Created by [Chris Hager](https://www.metachris.dev) with [Claude Code](https://claude.ai/code). Based on physics from [Dr. Christopher S. Baird](https://www.wtamu.edu/~cbaird/sq/2013/10/04/what-would-happen-if-you-fell-into-a-hole-that-went-through-the-center-of-the-earth/).*
