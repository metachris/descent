import type { NarrativeEntry } from '../content'
import { NARRATIVE_EN } from './en'
import { NARRATIVE_DE } from './de'
import { NARRATIVE_ES } from './es'
import { NARRATIVE_ZH } from './zh'
import { NARRATIVE_JA } from './ja'
import { NARRATIVE_PL } from './pl'

export type Language = 'en' | 'de' | 'es' | 'zh' | 'ja' | 'pl'

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  zh: '中文',
  ja: '日本語',
  pl: 'Polski',
}

export const NARRATIVES: Record<Language, NarrativeEntry[]> = {
  en: NARRATIVE_EN,
  de: NARRATIVE_DE,
  es: NARRATIVE_ES,
  zh: NARRATIVE_ZH,
  ja: NARRATIVE_JA,
  pl: NARRATIVE_PL,
}

export function getNarrative(lang: Language): NarrativeEntry[] {
  return NARRATIVES[lang] || NARRATIVE_EN
}
