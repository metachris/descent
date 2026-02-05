import { useState } from 'react'
import { useVoices, useVoicePreference, isFemaleVoice } from '../hooks/useSpeech'
import { useLanguage } from '../hooks/useLanguage'

const LANG_CODES: Record<string, string> = {
  en: 'en',
  de: 'de',
  es: 'es',
  zh: 'zh',
  ja: 'ja',
  pl: 'pl',
}

export function VoiceSelector() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()
  const voices = useVoices(LANG_CODES[language] || 'en')
  const { preferredVoiceName, setPreferredVoiceName } = useVoicePreference()

  const currentVoice = voices.find(v => v.name === preferredVoiceName) || voices[0]

  if (voices.length === 0) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-2 py-1 text-xs bg-white/10 hover:bg-white/20 rounded transition-colors flex items-center gap-1"
        title="Select narrator voice"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
        <span className="max-w-[60px] truncate">
          {currentVoice?.name.split(' ')[0] || 'Auto'}
        </span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Dropdown */}
          <div className="absolute bottom-full mb-2 right-0 z-50 bg-black/90 border border-white/20 rounded-lg shadow-xl min-w-[200px] max-h-[300px] overflow-y-auto">
            <div className="p-2 border-b border-white/10 text-xs text-white/50">
              Select narrator voice
            </div>

            {/* Auto option */}
            <button
              onClick={() => {
                setPreferredVoiceName(null)
                setIsOpen(false)
              }}
              className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${
                !preferredVoiceName ? 'bg-white/10 text-amber-400' : 'text-white/80'
              }`}
            >
              <span className="w-4 text-center">{!preferredVoiceName ? '✓' : ''}</span>
              <span>Auto (female preferred)</span>
            </button>

            <div className="border-t border-white/10" />

            {/* Voice list */}
            {voices.map(voice => (
              <button
                key={voice.name}
                onClick={() => {
                  setPreferredVoiceName(voice.name)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2 text-left text-sm hover:bg-white/10 transition-colors flex items-center gap-2 ${
                  preferredVoiceName === voice.name ? 'bg-white/10 text-amber-400' : 'text-white/80'
                }`}
              >
                <span className="w-4 text-center">
                  {preferredVoiceName === voice.name ? '✓' : ''}
                </span>
                <span className="flex-1 truncate">{voice.name}</span>
                {isFemaleVoice(voice) && (
                  <span className="text-xs text-pink-400/70">♀</span>
                )}
                {!voice.localService && (
                  <span className="text-xs text-blue-400/70">☁</span>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
