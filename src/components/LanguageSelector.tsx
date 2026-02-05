import { useLanguage } from '../hooks/useLanguage'
import { LANGUAGE_NAMES, type Language } from '../data/locales'

interface LanguageSelectorProps {
  variant?: 'minimal' | 'full'
  className?: string
}

export function LanguageSelector({ variant = 'minimal', className = '' }: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()

  const languages: Language[] = ['en', 'de', 'es', 'zh', 'ja']

  if (variant === 'full') {
    return (
      <div className={`flex flex-col gap-2 ${className}`}>
        <span className="text-xs text-white/50 uppercase tracking-wider">Language</span>
        <div className="flex gap-2">
          {languages.map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-3 py-1.5 text-sm rounded transition-all ${
                language === lang
                  ? 'bg-white/20 text-white'
                  : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white/70'
              }`}
            >
              {LANGUAGE_NAMES[lang]}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Minimal variant - just language codes
  return (
    <div className={`flex gap-1 text-xs ${className}`}>
      {languages.map((lang, i) => (
        <span key={lang}>
          <button
            onClick={() => setLanguage(lang)}
            className={`transition-all ${
              language === lang
                ? 'text-white/80'
                : 'text-white/30 hover:text-white/50'
            }`}
          >
            {lang.toUpperCase()}
          </button>
          {i < languages.length - 1 && <span className="text-white/20 mx-1">|</span>}
        </span>
      ))}
    </div>
  )
}
