import type { NarrativeEntry } from '../content'

export const NARRATIVE_ZH: NarrativeEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // THE EDGE (0-10s) — Standing at the precipice
  // ═══════════════════════════════════════════════════════════════
  { text: '你站在边缘。', startTime: 0, endTime: 3.5, style: 'normal' },
  { text: '深渊在脚下张开血盆大口。', startTime: 4, endTime: 7.5, style: 'normal' },
  { text: '距地心，6,371公里。', startTime: 7.5, endTime: 10, style: 'data' },

  // ═══════════════════════════════════════════════════════════════
  // THE PLUNGE (10-17s) — The jump
  // ═══════════════════════════════════════════════════════════════
  { text: '纵身一跃。', startTime: 10, endTime: 13.5, style: 'dramatic' },
  { text: '坠落，开始了。', startTime: 14, endTime: 17, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // HEAT DEATH (17-26s) — First death
  // ═══════════════════════════════════════════════════════════════
  { text: '重力拽着你，不断加速。', startTime: 17.5, endTime: 20, style: 'whisper' },
  { text: '47°C', startTime: 20.5, endTime: 23, style: 'data' },
  { text: '皮肤灼痛。', startTime: 23.5, endTime: 26, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // BOILING (26-33s) — Consciousness ends
  // ═══════════════════════════════════════════════════════════════
  { text: '热浪将你吞没。', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: '意识，渐渐模糊。', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: '残躯继续坠落。', startTime: 34, endTime: 37.5, style: 'normal' },
  { text: '抵达从未有人触及的深度。', startTime: 38, endTime: 41.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INCINERATION (42-54s) — Reduced to dust
  // ═══════════════════════════════════════════════════════════════
  { text: '927°C', startTime: 42.5, endTime: 45, style: 'data' },
  { text: '骨化为灰，肉化为尘。', startTime: 45.5, endTime: 49, style: 'normal' },
  { text: '唯余一缕原子，四散飘零。', startTime: 50, endTime: 53.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE LONG FALL (54-98s) — Let it breathe, sparse text
  // ═══════════════════════════════════════════════════════════════
  { text: '尘埃坠落。', startTime: 55, endTime: 58.5, style: 'whisper' },
  { text: '坠落。', startTime: 62, endTime: 65, style: 'whisper' },
  { text: '无尽坠落。', startTime: 68, endTime: 71, style: 'whisper' },
  { text: '数日流逝。', startTime: 74, endTime: 78, style: 'normal' },
  { text: '地幔将你环抱——', startTime: 81, endTime: 85, style: 'normal' },
  { text: '炽热的岩石，如蜜糖般，在亿万年间缓缓流淌。', startTime: 85.5, endTime: 90, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: '岩层尽头。', startTime: 93, endTime: 97, style: 'dramatic' },
  { text: '一片熔融的铁镍之海，', startTime: 98.5, endTime: 102.5, style: 'normal' },
  { text: '炽热如太阳表面。', startTime: 103.5, endTime: 106.5, style: 'normal' },
  { text: '5,000°C', startTime: 107.5, endTime: 111.5, style: 'data' },
  { text: '液态金属汪洋，', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: '编织着地球的磁场。', startTime: 117, endTime: 121, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: '压力，无以复加——', startTime: 125, endTime: 129, style: 'normal' },
  { text: '铁，再度凝结成固体。', startTime: 129.5, endTime: 134.5, style: 'normal' },
  { text: '一颗比月球还大的晶体球。', startTime: 136, endTime: 140, style: 'whisper' },
  { text: '速度渐缓。', startTime: 141, endTime: 144, style: 'normal' },
  { text: '脚下的质量越来越少，引力越来越弱。', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: '就快到了。', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: '重力，归于虚无。', startTime: 154, endTime: 158, style: 'normal' },
  { text: '世界的中心。', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: '失重。', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: '但你没有停下。', startTime: 172, endTime: 177, style: 'normal' },
  { text: '惯性推着你，穿越而过。', startTime: 178, endTime: 182, style: 'whisper' },
  { text: '此刻，"下"已是另一个方向。', startTime: 184, endTime: 188, style: 'normal' },
  { text: '减速……折返。', startTime: 190, endTime: 194, style: 'whisper' },
  { text: '往复。', startTime: 196, endTime: 200, style: 'whisper' },
  { text: '终于——', startTime: 203, endTime: 206, style: 'whisper' },
  { text: '归于宁静。', startTime: 206.5, endTime: 210, style: 'dramatic' },
]
