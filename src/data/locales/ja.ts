import type { NarrativeEntry } from '../content'

export const NARRATIVE_JA: NarrativeEntry[] = [
  // ═══════════════════════════════════════════════════════════════
  // THE EDGE (0-10s) — Standing at the precipice
  // ═══════════════════════════════════════════════════════════════
  { text: 'あなたは縁に立っている。', startTime: 0, endTime: 3.5, style: 'normal' },
  { text: 'トンネルが目の前に口を開けている。', startTime: 4, endTime: 7.5, style: 'normal' },
  { text: '地球の中心まで6,371キロメートル。', startTime: 7.5, endTime: 10, style: 'data' },

  // ═══════════════════════════════════════════════════════════════
  // THE PLUNGE (10-17s) — The jump
  // ═══════════════════════════════════════════════════════════════
  { text: 'あなたは一歩踏み出す。', startTime: 10, endTime: 13.5, style: 'dramatic' },
  { text: '落下が始まる。', startTime: 14, endTime: 17, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // HEAT DEATH (17-26s) — First death
  // ═══════════════════════════════════════════════════════════════
  { text: '重力があなたを加速させる。', startTime: 17.5, endTime: 20, style: 'whisper' },
  { text: '47°C', startTime: 20.5, endTime: 23, style: 'data' },
  { text: '肌が焼けるように熱い。', startTime: 23.5, endTime: 26, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // BOILING (26-33s) — Consciousness ends
  // ═══════════════════════════════════════════════════════════════
  { text: '熱があなたを奪う。', startTime: 26.5, endTime: 30, style: 'normal' },
  { text: '意識が遠のいていく。', startTime: 30.5, endTime: 33, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // CRUSHING (33-42s) — Body continues without you
  // ═══════════════════════════════════════════════════════════════
  { text: 'あなたの残骸は落ち続ける。', startTime: 34, endTime: 37.5, style: 'normal' },
  { text: '人類が到達したことのない深さへ。', startTime: 38, endTime: 41.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INCINERATION (42-54s) — Reduced to dust
  // ═══════════════════════════════════════════════════════════════
  { text: '927°C', startTime: 42.5, endTime: 45, style: 'data' },
  { text: '骨は灰に。肉は塵に。', startTime: 45.5, endTime: 49, style: 'normal' },
  { text: '散らばった原子だけが残る。', startTime: 50, endTime: 53.5, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE LONG FALL (54-98s) — Let it breathe, sparse text
  // ═══════════════════════════════════════════════════════════════
  { text: 'あなたの塵が落ちていく。', startTime: 55, endTime: 58.5, style: 'whisper' },
  { text: '落ちていく。', startTime: 62, endTime: 65, style: 'whisper' },
  { text: 'さらに落ちていく。', startTime: 68, endTime: 71, style: 'whisper' },
  { text: '数日が過ぎる。', startTime: 74, endTime: 78, style: 'normal' },
  { text: 'マントルがあなたを包む', startTime: 81, endTime: 85, style: 'normal' },
  { text: '熱く、固い岩が悠久の時をかけて蜂蜜のように流れる。', startTime: 85.5, endTime: 90, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // OUTER CORE (98-125s) — Wonder, tone shift
  // ═══════════════════════════════════════════════════════════════
  { text: '岩が途切れる。', startTime: 93, endTime: 97, style: 'dramatic' },
  { text: '溶けた鉄とニッケルの海、', startTime: 98.5, endTime: 102.5, style: 'normal' },
  { text: '太陽の表面と同じくらい熱い。', startTime: 103.5, endTime: 106.5, style: 'normal' },
  { text: '5,000°C', startTime: 107.5, endTime: 111.5, style: 'data' },
  { text: '液体金属の海が', startTime: 112.5, endTime: 116.5, style: 'normal' },
  { text: '地球の磁場を生み出している。', startTime: 117, endTime: 121, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // INNER CORE (125-148s) — Slowing down
  // ═══════════════════════════════════════════════════════════════
  { text: '圧力があまりにも強大で...', startTime: 125, endTime: 129, style: 'normal' },
  { text: '鉄が再び固体になる。', startTime: 129.5, endTime: 134.5, style: 'normal' },
  { text: '月よりも大きな結晶の球体。', startTime: 136, endTime: 140, style: 'whisper' },
  { text: '速度が落ちていく。', startTime: 141, endTime: 144, style: 'normal' },
  { text: '下にある質量が減っていく。引力が弱まる。', startTime: 144.5, endTime: 148, style: 'whisper' },

  // ═══════════════════════════════════════════════════════════════
  // THE CENTER (148-172s) — Climax
  // ═══════════════════════════════════════════════════════════════
  { text: 'もうすぐだ。', startTime: 149, endTime: 152.5, style: 'whisper' },
  { text: '重力が消えていく。', startTime: 154, endTime: 158, style: 'normal' },
  { text: '世界の中心。', startTime: 160, endTime: 164, style: 'dramatic' },
  { text: '無重力。', startTime: 166, endTime: 170, style: 'normal' },

  // ═══════════════════════════════════════════════════════════════
  // THE YO-YO (172-210s) — Oscillation and resolution
  // ═══════════════════════════════════════════════════════════════
  { text: 'しかし、止まらない。', startTime: 172, endTime: 177, style: 'normal' },
  { text: '慣性があなたを運んでいく。', startTime: 178, endTime: 182, style: 'whisper' },
  { text: '今度は「下」が逆になる。', startTime: 184, endTime: 188, style: 'normal' },
  { text: '減速して... 反転する。', startTime: 190, endTime: 194, style: 'whisper' },
  { text: '行ったり来たり。', startTime: 196, endTime: 200, style: 'whisper' },
  { text: 'そしてついに...', startTime: 203, endTime: 206, style: 'whisper' },
  { text: '安らぎを得る。', startTime: 206.5, endTime: 210, style: 'dramatic' },
]
