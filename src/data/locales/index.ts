import type { NarrativeEntry } from '../content'
import { NARRATIVE_EN } from './en'
import { NARRATIVE_DE } from './de'
import { NARRATIVE_ES } from './es'
import { NARRATIVE_ZH } from './zh'
import { NARRATIVE_JA } from './ja'

export type Language = 'en' | 'de' | 'es' | 'zh' | 'ja'

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
  zh: '中文',
  ja: '日本語',
}

export const NARRATIVES: Record<Language, NarrativeEntry[]> = {
  en: NARRATIVE_EN,
  de: NARRATIVE_DE,
  es: NARRATIVE_ES,
  zh: NARRATIVE_ZH,
  ja: NARRATIVE_JA,
}

export function getNarrative(lang: Language): NarrativeEntry[] {
  return NARRATIVES[lang] || NARRATIVE_EN
}
