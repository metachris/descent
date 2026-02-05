import type { NarrativeEntry } from '../content'

// German translation - TODO: Replace with proper translations
// These are placeholder translations for structure - please have a native speaker review

export const NARRATIVE_DE: NarrativeEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // THE EDGE (0-10s) — Standing at the precipice
  // ═══════════════════════════════════════════════════════════════
  { text: 'Du stehst am Rand.', startTime: 0, endTime: 3.5, style: 'normal' },
  { text: 'Der Tunnel gähnt vor dir.', startTime: 4, endTime: 7.5, style: 'normal' },
  { text: '6.371 Kilometer bis zum Mittelpunkt.', startTime: 7.5, endTime: 10, style: 'data' },

  // ═══════════════════════════════════════════════════════════════
  // THE PLUNGE (10-17s) — The jump
  // ═══════════════════════════════════════════════════════════════
  { text: 'Du trittst vor.', startTime: 10, endTime: 13.5, style: 'dramatic' },
  { text: 'Der Fall beginnt.', startTime: 14, endTime: 17, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // HEAT DEATH (17-26s) — First death
  // ═══════════════════════════════════════════════════════════════
  { text: 'Die Schwerkraft beschleunigt dich.', startTime: 17.5, endTime: 20, style: 'whisper' },
  { text: '47°C', startTime: 20.5, endTime: 23, style: 'data' },
  { text: 'Deine Haut brennt.', startTime: 23.5, endTime: 26, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // BOILING (26-33s) — Consciousness ends
  // ═══════════════════════════════════════════════════════════════
  { text: 'Die Hitze nimmt dich.', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: 'Du gleitest hinüber.', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: 'Was von dir übrig bleibt, fällt weiter.', startTime: 34, endTime: 37.5, style: 'normal' },
  { text: 'Tiefer als je ein Mensch zuvor.', startTime: 38, endTime: 41.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INCINERATION (42-54s) — Reduced to dust
  // ═══════════════════════════════════════════════════════════════
  { text: '927°C', startTime: 42.5, endTime: 45, style: 'data' },
  { text: 'Knochen wird zu Asche. Fleisch wird zu Staub.', startTime: 45.5, endTime: 49, style: 'normal' },
  { text: 'Nur verstreute Atome bleiben.', startTime: 50, endTime: 53.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE LONG FALL (54-98s) — Let it breathe, sparse text
  // ═══════════════════════════════════════════════════════════════
  { text: 'Dein Staub fällt.', startTime: 55, endTime: 58.5, style: 'whisper' },
  { text: 'Und fällt.', startTime: 62, endTime: 65, style: 'whisper' },
  { text: 'Und fällt.', startTime: 68, endTime: 71, style: 'whisper' },
  { text: 'Tage vergehen.', startTime: 74, endTime: 78, style: 'normal' },
  { text: 'Der Mantel umgibt dich', startTime: 81, endTime: 85, style: 'normal' },
  { text: 'heißes, festes Gestein, fließend wie Honig über Äonen.', startTime: 85.5, endTime: 90, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: 'Das Gestein weicht.', startTime: 93, endTime: 97, style: 'dramatic' },
  { text: 'Ein Meer aus geschmolzenem Eisen und Nickel,', startTime: 98.5, endTime: 102.5, style: 'normal' },
  { text: 'so heiß wie die Oberfläche der Sonne.', startTime: 103.5, endTime: 106.5, style: 'normal' },
  { text: '5.000°C', startTime: 107.5, endTime: 111.5, style: 'data' },
  { text: 'Ein Ozean aus flüssigem Metall', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: 'der das Magnetfeld der Erde erzeugt.', startTime: 117, endTime: 121, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: 'Der Druck ist so gewaltig...', startTime: 125, endTime: 129, style: 'normal' },
  { text: 'dass Eisen wieder fest wird.', startTime: 129.5, endTime: 134.5, style: 'normal' },
  { text: 'Eine Kristallkugel, größer als der Mond.', startTime: 136, endTime: 140, style: 'whisper' },
  { text: 'Du wirst langsamer.', startTime: 141, endTime: 144, style: 'normal' },
  { text: 'Weniger Masse unter dir. Weniger Zug.', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: 'Du bist fast da.', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: 'Die Schwerkraft schwindet.', startTime: 154, endTime: 158, style: 'normal' },
  { text: 'Der Mittelpunkt der Welt.', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: 'Schwerelos.', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: 'Aber du hältst nicht an.', startTime: 172, endTime: 177, style: 'normal' },
  { text: 'Der Schwung trägt dich weiter.', startTime: 178, endTime: 182, style: 'whisper' },
  { text: 'Jetzt ist „unten" die andere Richtung.', startTime: 184, endTime: 188, style: 'normal' },
  { text: 'Du wirst langsamer... und kehrst um.', startTime: 190, endTime: 194, style: 'whisper' },
  { text: 'Hin und her.', startTime: 196, endTime: 200, style: 'whisper' },
  { text: 'Bis schließlich...', startTime: 203, endTime: 206, style: 'whisper' },
  { text: 'Du ruhst.', startTime: 206.5, endTime: 210, style: 'dramatic' },
]
