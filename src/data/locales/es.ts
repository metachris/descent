import type { NarrativeEntry } from '../content'

// Spanish translation - TODO: Replace with proper translations
// These are placeholder translations for structure - please have a native speaker review

export const NARRATIVE_ES: NarrativeEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // THE EDGE (0-10s) — Standing at the precipice
  // ═══════════════════════════════════════════════════════════════
  { text: 'Estás al borde.', startTime: 0, endTime: 3.5, style: 'normal' },
  { text: 'El túnel se abre ante ti.', startTime: 4, endTime: 7.5, style: 'normal' },
  { text: '6.371 kilómetros hasta el centro.', startTime: 7.5, endTime: 10, style: 'data' },

  // ═══════════════════════════════════════════════════════════════
  // THE PLUNGE (10-17s) — The jump
  // ═══════════════════════════════════════════════════════════════
  { text: 'Das un paso adelante.', startTime: 10, endTime: 13.5, style: 'dramatic' },
  { text: 'La caída comienza.', startTime: 14, endTime: 17, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // HEAT DEATH (17-26s) — First death
  // ═══════════════════════════════════════════════════════════════
  { text: 'La gravedad te acelera.', startTime: 17.5, endTime: 20, style: 'whisper' },
  { text: '47°C', startTime: 20.5, endTime: 23, style: 'data' },
  { text: 'Tu piel arde.', startTime: 23.5, endTime: 26, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // BOILING (26-33s) — Consciousness ends
  // ═══════════════════════════════════════════════════════════════
  { text: 'El calor te consume.', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: 'Te desvaneces.', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: 'Lo que queda de ti sigue cayendo.', startTime: 34, endTime: 37.5, style: 'normal' },
  { text: 'Más profundo que ningún humano jamás.', startTime: 38, endTime: 41.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INCINERATION (42-54s) — Reduced to dust
  // ═══════════════════════════════════════════════════════════════
  { text: '927°C', startTime: 42.5, endTime: 45, style: 'data' },
  { text: 'El huite se vuelve ceniza. La carne, polvo.', startTime: 45.5, endTime: 49, style: 'normal' },
  { text: 'Solo quedan átomos dispersos.', startTime: 50, endTime: 53.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE LONG FALL (54-98s) — Let it breathe, sparse text
  // ═══════════════════════════════════════════════════════════════
  { text: 'Tu polvo cae.', startTime: 55, endTime: 58.5, style: 'whisper' },
  { text: 'Y cae.', startTime: 62, endTime: 65, style: 'whisper' },
  { text: 'Y cae.', startTime: 68, endTime: 71, style: 'whisper' },
  { text: 'Pasan los días.', startTime: 74, endTime: 78, style: 'normal' },
  { text: 'El manto te rodea', startTime: 81, endTime: 85, style: 'normal' },
  { text: 'roca caliente y sólida, fluyendo como miel a través de eones.', startTime: 85.5, endTime: 90, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: 'La roca cede.', startTime: 93, endTime: 97, style: 'dramatic' },
  { text: 'Un mar de hierro y níquel fundido,', startTime: 98.5, endTime: 102.5, style: 'normal' },
  { text: 'tan caliente como la superficie del sol.', startTime: 103.5, endTime: 106.5, style: 'normal' },
  { text: '5.000°C', startTime: 107.5, endTime: 111.5, style: 'data' },
  { text: 'Un océano de metal líquido', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: 'que genera el campo magnético de la Tierra.', startTime: 117, endTime: 121, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: 'La presión es tan inmensa...', startTime: 125, endTime: 129, style: 'normal' },
  { text: 'que el hierro se vuelve sólido de nuevo.', startTime: 129.5, endTime: 134.5, style: 'normal' },
  { text: 'Una esfera de cristal, más grande que la luna.', startTime: 136, endTime: 140, style: 'whisper' },
  { text: 'Vas más lento.', startTime: 141, endTime: 144, style: 'normal' },
  { text: 'Menos masa debajo de ti. Menos atracción.', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: 'Ya casi llegas.', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: 'La gravedad se desvanece.', startTime: 154, endTime: 158, style: 'normal' },
  { text: 'El centro del mundo.', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: 'Ingrávido.', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: 'Pero no te detienes.', startTime: 172, endTime: 177, style: 'normal' },
  { text: 'El impulso te lleva adelante.', startTime: 178, endTime: 182, style: 'whisper' },
  { text: 'Ahora "abajo" es la otra dirección.', startTime: 184, endTime: 188, style: 'normal' },
  { text: 'Frenas... y retrocedes.', startTime: 190, endTime: 194, style: 'whisper' },
  { text: 'De un lado a otro.', startTime: 196, endTime: 200, style: 'whisper' },
  { text: 'Hasta que finalmente...', startTime: 203, endTime: 206, style: 'whisper' },
  { text: 'Descansas.', startTime: 206.5, endTime: 210, style: 'dramatic' },
]
