import type { NarrativeEntry } from '../content'

export const NARRATIVE_ZH: NarrativeEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // THE EDGE (0-10s) — Standing at the precipice
  // ═══════════════════════════════════════════════════════════════
  { text: '你站在边缘。', startTime: 0, endTime: 3.5, style: 'normal' },
  { text: '隧道在你面前张开。', startTime: 4, endTime: 7.5, style: 'normal' },
  { text: '距离地心6,371公里。', startTime: 7.5, endTime: 10, style: 'data' },

  // ═══════════════════════════════════════════════════════════════
  // THE PLUNGE (10-17s) — The jump
  // ═══════════════════════════════════════════════════════════════
  { text: '你向前迈出一步。', startTime: 10, endTime: 13.5, style: 'dramatic' },
  { text: '坠落开始了。', startTime: 14, endTime: 17, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // HEAT DEATH (17-26s) — First death
  // ═══════════════════════════════════════════════════════════════
  { text: '重力加速着你。', startTime: 17.5, endTime: 20, style: 'whisper' },
  { text: '47°C', startTime: 20.5, endTime: 23, style: 'data' },
  { text: '你的皮肤在灼烧。', startTime: 23.5, endTime: 26, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // BOILING (26-33s) — Consciousness ends
  // ═══════════════════════════════════════════════════════════════
  { text: '热量带走了你。', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: '你渐渐消逝。', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: '你的残骸继续下坠。', startTime: 34, endTime: 37.5, style: 'normal' },
  { text: '比任何人类到达过的地方都深。', startTime: 38, endTime: 41.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INCINERATION (42-54s) — Reduced to dust
  // ═══════════════════════════════════════════════════════════════
  { text: '927°C', startTime: 42.5, endTime: 45, style: 'data' },
  { text: '骨骼化为灰烬。血肉化为尘埃。', startTime: 45.5, endTime: 49, style: 'normal' },
  { text: '只剩下散落的原子。', startTime: 50, endTime: 53.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE LONG FALL (54-98s) — Let it breathe, sparse text
  // ═══════════════════════════════════════════════════════════════
  { text: '你的尘埃在下落。', startTime: 55, endTime: 58.5, style: 'whisper' },
  { text: '继续下落。', startTime: 62, endTime: 65, style: 'whisper' },
  { text: '不断下落。', startTime: 68, endTime: 71, style: 'whisper' },
  { text: '数日过去。', startTime: 74, endTime: 78, style: 'normal' },
  { text: '地幔包围着你', startTime: 81, endTime: 85, style: 'normal' },
  { text: '炽热的固态岩石，像蜂蜜一样缓缓流动。', startTime: 85.5, endTime: 90, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: '岩石让位了。', startTime: 93, endTime: 97, style: 'dramatic' },
  { text: '一片熔融的铁镍之海，', startTime: 98.5, endTime: 102.5, style: 'normal' },
  { text: '如太阳表面般炽热。', startTime: 103.5, endTime: 106.5, style: 'normal' },
  { text: '5,000°C', startTime: 107.5, endTime: 111.5, style: 'data' },
  { text: '液态金属的海洋', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: '产生着地球的磁场。', startTime: 117, endTime: 121, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: '压力如此巨大...', startTime: 125, endTime: 129, style: 'normal' },
  { text: '铁再次凝固。', startTime: 129.5, endTime: 134.5, style: 'normal' },
  { text: '一个比月球还大的晶体球。', startTime: 136, endTime: 140, style: 'whisper' },
  { text: '你在减速。', startTime: 141, endTime: 144, style: 'normal' },
  { text: '下方的质量越来越少。引力越来越弱。', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: '你快到了。', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: '重力消失殆尽。', startTime: 154, endTime: 158, style: 'normal' },
  { text: '世界的中心。', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: '失重。', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: '但你没有停下。', startTime: 172, endTime: 177, style: 'normal' },
  { text: '惯性带着你穿过。', startTime: 178, endTime: 182, style: 'whisper' },
  { text: '现在"下"变成了另一个方向。', startTime: 184, endTime: 188, style: 'normal' },
  { text: '你减速... 然后反向。', startTime: 190, endTime: 194, style: 'whisper' },
  { text: '来回往复。', startTime: 196, endTime: 200, style: 'whisper' },
  { text: '直到最终...', startTime: 203, endTime: 206, style: 'whisper' },
  { text: '你安息了。', startTime: 206.5, endTime: 210, style: 'dramatic' },
]
