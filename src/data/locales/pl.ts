import type { NarrativeEntry } from '../content'

export const NARRATIVE_PL: NarrativeEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // THE EDGE (0-10s) — Standing at the precipice
  // ═══════════════════════════════════════════════════════════════
  { text: 'Stoisz na krawędzi.', startTime: 0, endTime: 3.5, style: 'normal' },
  { text: 'Tunel zieje przed tobą.', startTime: 4, endTime: 7.5, style: 'normal' },
  { text: '6 371 kilometrów do środka.', startTime: 7.5, endTime: 10, style: 'data' },

  // ═══════════════════════════════════════════════════════════════
  // THE PLUNGE (10-17s) — The jump
  // ═══════════════════════════════════════════════════════════════
  { text: 'Robisz krok w przód.', startTime: 10, endTime: 13.5, style: 'dramatic' },
  { text: 'Zaczyna się upadek.', startTime: 14, endTime: 17, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // HEAT DEATH (17-26s) — First death
  // ═══════════════════════════════════════════════════════════════
  { text: 'Grawitacja cię przyspiesza.', startTime: 17.5, endTime: 20, style: 'whisper' },
  { text: '47°C', startTime: 20.5, endTime: 23, style: 'data' },
  { text: 'Skóra płonie.', startTime: 23.5, endTime: 26, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // BOILING (26-33s) — Consciousness ends
  // ═══════════════════════════════════════════════════════════════
  { text: 'Żar cię pochłania.', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: 'Odpływasz.', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: 'To, co zostało, spada dalej.', startTime: 34, endTime: 37.5, style: 'normal' },
  { text: 'Głębiej niż ktokolwiek przed tobą.', startTime: 38, endTime: 41.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INCINERATION (42-54s) — Reduced to dust
  // ═══════════════════════════════════════════════════════════════
  { text: '927°C', startTime: 42.5, endTime: 45, style: 'data' },
  { text: 'Kości stają się popiołem. Ciało — pyłem.', startTime: 45.5, endTime: 49, style: 'normal' },
  { text: 'Zostają tylko rozproszone atomy.', startTime: 50, endTime: 53.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE LONG FALL (54-98s) — Let it breathe, sparse text
  // ═══════════════════════════════════════════════════════════════
  { text: 'Twój pył opada.', startTime: 55, endTime: 58.5, style: 'whisper' },
  { text: 'I opada.', startTime: 62, endTime: 65, style: 'whisper' },
  { text: 'I opada.', startTime: 68, endTime: 71, style: 'whisper' },
  { text: 'Mijają dni.', startTime: 74, endTime: 78, style: 'normal' },
  { text: 'Płaszcz Ziemi cię otula —', startTime: 81, endTime: 85, style: 'normal' },
  { text: 'gorąca, stała skała, płynąca jak miód przez eony.', startTime: 85.5, endTime: 90, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: 'Skała ustępuje.', startTime: 93, endTime: 97, style: 'dramatic' },
  { text: 'Morze stopionego żelaza i niklu,', startTime: 98.5, endTime: 102.5, style: 'normal' },
  { text: 'gorące jak powierzchnia Słońca.', startTime: 103.5, endTime: 106.5, style: 'normal' },
  { text: '5 000°C', startTime: 107.5, endTime: 111.5, style: 'data' },
  { text: 'Ocean ciekłego metalu', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: 'rodzi pole magnetyczne Ziemi.', startTime: 117, endTime: 121, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: 'Ciśnienie jest tak ogromne...', startTime: 125, endTime: 129, style: 'normal' },
  { text: 'że żelazo znów staje się stałe.', startTime: 129.5, endTime: 134.5, style: 'normal' },
  { text: 'Kryształowa kula, większa od Księżyca.', startTime: 136, endTime: 140, style: 'whisper' },
  { text: 'Zwalniasz.', startTime: 141, endTime: 144, style: 'normal' },
  { text: 'Mniej masy pod tobą. Mniejszy ciąg.', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: 'Prawie na miejscu.', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: 'Grawitacja zanika.', startTime: 154, endTime: 158, style: 'normal' },
  { text: 'Środek świata.', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: 'Nieważkość.', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: 'Ale nie zatrzymujesz się.', startTime: 172, endTime: 177, style: 'normal' },
  { text: 'Pęd niesie cię dalej.', startTime: 178, endTime: 182, style: 'whisper' },
  { text: 'Teraz „dół" jest w drugą stronę.', startTime: 184, endTime: 188, style: 'normal' },
  { text: 'Zwalniasz... i zawracasz.', startTime: 190, endTime: 194, style: 'whisper' },
  { text: 'Tam i z powrotem.', startTime: 196, endTime: 200, style: 'whisper' },
  { text: 'Aż wreszcie...', startTime: 203, endTime: 206, style: 'whisper' },
  { text: 'Spokój.', startTime: 206.5, endTime: 210, style: 'dramatic' },
]
