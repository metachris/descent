# Building Descent: A Journey to the Center of the Earth

What would happen if you jumped into a tunnel that went straight through the Earth? It's a classic physics thought experiment — one that usually ends with equations about [simple harmonic motion](https://en.wikipedia.org/wiki/Simple_harmonic_motion) and a neat answer of "38 minutes to the other side."

But that answer assumes a vacuum. No air. No friction. In reality, you'd fall through air, hit terminal velocity around 200 km/h, and the journey would take about a week. You'd also die within the first kilometer from heat stroke.

I wanted to build an experience that explores that reality — not as a physics lesson, but as something you feel. The result is **[Descent](https://metachris.github.io/descent/)**, a 3.5-minute immersive web experience that takes you falling through the Earth, layer by layer, death by death, until you reach the center.

## Poetry Over Precision

From the start, I knew what I didn't want: a physics textbook with pretty graphics. The goal wasn't to teach people the exact temperature gradient of the mantle. It was to make them *feel* something — the vertigo of the fall, the horror of the deaths, the alien beauty of the outer core, the peace of arriving at the center.

"You stand at the edge. The tunnel yawns before you."

Not: "The hypothetical tunnel has a diameter of..."

The science is real — the temperatures, the layer depths, the pressure at the center — but it's delivered through intimate, second-person narrative rather than data dumps.

## The Narrative Arc

The experience follows you (literally — it's written in second person, present tense) as you fall. But here's the thing: you die at 1.1 kilometers. Heat stroke. 47°C.

What happens for the remaining 6,370 kilometers? Your body continues. Then your remains. Then your dust. The narrative shifts from personal to posthumous, and somehow that makes it more poignant. You're no longer there, but the journey continues without you.

The emotional arc:
- **Anticipation** at the edge
- **Exhilaration** in the plunge
- **Horror** through the deaths
- **Meditation** during the long fall
- **Awe** in the outer core
- **Peace** at the center

The pacing reflects this. Deaths are slow — you need time to process them. The long fall through the mantle is sparse, with text like "And falls. And falls." followed by silence. The arrival at the center breathes.

## The Visuals

The visual language is deliberately abstract — no photorealistic earth cross-sections, no textbook diagrams. Instead, the experience is built from layers:

**Phase gradients** form the base — CSS radial and linear gradients that cross-fade between phases. Deep blue at the edge, burning reds through the mantle, incandescent gold at the core.

**The tunnel effect** gives the sense of falling. Concentric rings expand outward from the screen center, like looking down a tube as you fall through it. When you step forward at 10 seconds, a dark void at the center expands to swallow the screen — you're entering the hole. The ring speed, color, and intensity are per-phase and interpolate smoothly at transitions so nothing ever jumps.

**Radial particles** spawn midway from center and drift outward — debris and dust in the upper layers, glowing embers through the mantle, gentle golden sparkles at the core. They're deliberately subtle; the experience should feel meditative, not like a screensaver.

Everything is Canvas 2D. No WebGL required, works on any device.

## Procedural Audio

The sound design is entirely procedural — no audio files. The [Web Audio API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) generates everything in real-time:

- **Warm pad**: Four detuned triangle oscillators creating a rich, chorused drone
- **Harmonic drone**: Perfect fifth intervals (E-B-E) that slowly descend as you fall
- **Gentle wind**: Ultra-smooth brown noise, heavily filtered
- **Crystalline shimmer**: High harmonics that fade in during the inner core
- **Light percussion**: A heartbeat-like pulse that builds through the outer core and fades to silence at the center
- **Double reverb**: 4-second and 6-second [convolution reverbs](https://en.wikipedia.org/wiki/Convolution_reverb) for depth

**Stereo panning** gives the sound spatial width. The four pad oscillators are spread across [-0.3, -0.1, 0.1, 0.3] with gentle breathing modulation. Drone voices span [-0.4, 0, 0.4]. Shimmer sparkles across the wide field [-0.6, -0.2, 0.2, 0.6]. Wind sweeps left-right via a 0.1Hz LFO. Sub bass and kick stay dead center, as they should. The effect is subtle but the soundscape feels three-dimensional with headphones.

The soundscape evolves with your progress — swelling during the plunge, fading during death, becoming vast and meditative during the long fall, maximum reverb at the center. The ending is deliberately serene: all intensity fades, leaving just a soft warm pad that dissolves into silence.

## Six Languages

Descent is translated into **six languages**: English, German, Spanish, Chinese, Japanese, and Polish. The translations aren't literal — they're adapted to feel poetic in each language.

Japanese drops the explicit subject ("you") for a more literary feel: 「縁に立つ。」instead of 「あなたは縁に立っている。」 Chinese uses classical parallel structures: 「骨化为灰，肉化为尘。」("Bone becomes ash, flesh becomes dust.")

## Voice Narration

The narrative can be spoken aloud using the browser's [Web Speech API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Speech_API). Text-to-speech for poetry is tricky — robotic voices kill the mood.

The solution: **style-aware speech parameters**. Each narrative style gets different rate, pitch, and volume settings. Normal text reads at a deliberate 0.85x rate. Dramatic moments slow further and drop pitch slightly. Whispered lines go softer. Data readouts are measured and precise. The pitch differences are kept within 5% to avoid the "different narrator" effect.

The voice selector auto-picks female voices when available (they tend to sound warmer for narrative), prioritizes neural/natural voices over robotic ones, and persists your preference across sessions.

## Technical Decisions

**Animation over scroll.** I considered making this scroll-based — you scroll down, you descend. But scroll hijacking frustrates users, pacing becomes user-controlled (bad for emotional beats), and mobile scroll behavior is unpredictable. Descent plays like a video instead: auto-play with a timeline scrubber. You can pause and seek, but the default experience has intentional pacing.

**The stack**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/), [Vite](https://vitejs.dev/) for builds, [Tailwind](https://tailwindcss.com/) for styling, [Zustand](https://zustand-demo.pmnd.rs/) for state (with localStorage persistence), and [GitHub Actions](https://github.com/features/actions) for deployment. Straightforward choices — the interesting parts are the Canvas and Web Audio work.

## Lessons Learned

**Silence is content.** The long fall section has maybe 30 words across 44 seconds. That emptiness is intentional. It lets you feel the scale of time passing.

**Data as poetry.** Showing "47°C" or "5,000°C" at key moments is more powerful than explaining what those temperatures mean. The number is the poetry.

**Subtlety compounds.** The stereo panning, the particle drift, the phase interpolation — none of these are dramatic on their own. Together they create a sense of presence that's hard to attribute to any single element.

**The end matters.** When you reach the center, you don't stop — momentum carries you through. You oscillate back and forth, a human yo-yo, until finally settling at the exact center of the Earth. That physics detail (which is real) makes the ending feel earned.

## Built with Claude Code

I built this with [Claude Code](https://claude.ai/code) over about ten hours. The workflow was conversational — describing the atmosphere I wanted, iterating on narrative and pacing, tuning the audio until it felt right. Claude handled the implementation; I focused on creative direction and feedback with minimal technical input.

I wouldn't have had the time to learn the Web Audio API, build a procedural synth, implement Canvas animations, and write a multi-language narrative system from scratch. It would have taken weeks and simply never happened. This felt like a genuine unlock of creative potential.

## Try It

**[Descent is live here.](https://metachris.github.io/descent/)** Put on headphones, go fullscreen, and fall.

The source is [on GitHub](https://github.com/metachris/descent) under MIT — fork it, remix it, make it your own.

The experience succeeds if you say "this made me feel something." That was always the goal — not to teach, but to evoke. To make the incomprehensible scale of our planet feel, for 3.5 minutes, almost comprehensible.

---

*Created by [Chris Hager](https://www.metachris.dev) with [Claude Code](https://claude.ai/code). Based on physics from [Dr. Christopher S. Baird](https://www.wtamu.edu/~cbaird/sq/2013/10/04/what-would-happen-if-you-fell-into-a-hole-that-went-through-the-center-of-the-earth/).*
