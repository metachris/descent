import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Language } from '../data/locales'
import { getNarrative, NARRATIVES } from '../data/locales'
import type { NarrativeEntry } from '../data/content'

interface LanguageState {
  language: Language
  setLanguage: (lang: Language) => void
  narrative: NarrativeEntry[]
  voiceEnabled: boolean
  setVoiceEnabled: (enabled: boolean) => void
}

// Check URL for language parameter
function getInitialLanguage(): Language {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search)
    const urlLang = params.get('lang')
    if (urlLang && urlLang in NARRATIVES) {
      return urlLang as Language
    }
  }
  return 'en'
}

export const useLanguage = create<LanguageState>()(
  persist(
    (set) => ({
      language: getInitialLanguage(),
      narrative: getNarrative(getInitialLanguage()),
      voiceEnabled: false,
      setLanguage: (lang: Language) => {
        // Update URL without reload
        if (typeof window !== 'undefined') {
          const url = new URL(window.location.href)
          url.searchParams.set('lang', lang)
          window.history.replaceState({}, '', url.toString())
        }
        set({ language: lang, narrative: getNarrative(lang) })
      },
      setVoiceEnabled: (enabled: boolean) => set({ voiceEnabled: enabled }),
    }),
    {
      name: 'descent-language',
      partialize: (state) => ({ language: state.language }),
      onRehydrateStorage: () => (state) => {
        // After rehydration, check URL override and update narrative
        if (state) {
          const urlLang = getInitialLanguage()
          const finalLang = urlLang !== 'en' ? urlLang : state.language
          state.language = finalLang
          state.narrative = getNarrative(finalLang)
        }
      },
    }
  )
)
