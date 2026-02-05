import type { NarrativeEntry } from '../content'
import { NARRATIVE_EN } from './en'
import { NARRATIVE_DE } from './de'
import { NARRATIVE_ES } from './es'

export type Language = 'en' | 'de' | 'es'

export const LANGUAGE_NAMES: Record<Language, string> = {
  en: 'English',
  de: 'Deutsch',
  es: 'Español',
}

export const NARRATIVES: Record<Language, NarrativeEntry[]> = {
  en: NARRATIVE_EN,
  de: NARRATIVE_DE,
  es: NARRATIVE_ES,
}

export function getNarrative(lang: Language): NarrativeEntry[] {
  return NARRATIVES[lang] || NARRATIVE_EN
}
