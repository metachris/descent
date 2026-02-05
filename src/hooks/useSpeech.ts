import { useEffect, useRef, useState, useCallback } from 'react'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { NarrativeStyle } from '../data/content'

// Speech settings per narrative style
const STYLE_SETTINGS: Record<NarrativeStyle, { rate: number; pitch: number; volume: number }> = {
  normal: { rate: 0.85, pitch: 1.0, volume: 0.8 },
  dramatic: { rate: 0.75, pitch: 0.9, volume: 0.9 },  // Slower, deeper, louder
  whisper: { rate: 0.9, pitch: 1.1, volume: 0.6 },    // Slightly faster, higher, quieter
  data: { rate: 0.95, pitch: 0.85, volume: 0.7 },     // More measured, robotic feel fits here
}

// Common female voice name patterns
const FEMALE_VOICE_PATTERNS = [
  'samantha', 'karen', 'victoria', 'zira', 'susan', 'hazel',
  'fiona', 'moira', 'tessa', 'veena', 'alice', 'amelie',
  'anna', 'carmit', 'damayanti', 'ellen', 'ioana', 'joana',
  'kanya', 'kate', 'kyoko', 'lana', 'laura', 'lekha',
  'luciana', 'mariska', 'mei-jia', 'melina', 'milena', 'monica',
  'nora', 'paulina', 'sara', 'satu', 'sin-ji', 'ting-ting',
  'xander', 'yelda', 'yuna', 'zosia', 'female', 'woman',
  // Neural/natural female voices
  'jenny', 'aria', 'emma', 'michelle', 'ana', 'natasha',
]

// Check if a voice is likely female
function isFemaleVoice(voice: SpeechSynthesisVoice): boolean {
  const nameLower = voice.name.toLowerCase()
  return FEMALE_VOICE_PATTERNS.some(pattern => nameLower.includes(pattern))
}

// Preprocess text for better speech pacing
function preprocessText(text: string): string {
  return text
    // Add micro-pauses after sentence-ending punctuation
    .replace(/\. /g, '... ')
    // Add pause before em-dashes
    .replace(/—/g, '... ')
    // Ensure ellipsis creates a pause
    .replace(/\.\.\.(?!\s)/g, '... ')
}

// Voice preference store
interface VoicePreferenceState {
  preferredVoiceName: string | null
  setPreferredVoiceName: (name: string | null) => void
}

export const useVoicePreference = create<VoicePreferenceState>()(
  persist(
    (set) => ({
      preferredVoiceName: null, // null = auto-select female
      setPreferredVoiceName: (name) => set({ preferredVoiceName: name }),
    }),
    { name: 'descent-voice-preference' }
  )
)

interface UseSpeechOptions {
  text: string | null
  enabled: boolean
  lang?: string
  style?: NarrativeStyle
}

export function useSpeech({ text, enabled, lang = 'en-US', style = 'normal' }: UseSpeechOptions) {
  const lastSpokenRef = useRef<string | null>(null)
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null)
  const { preferredVoiceName } = useVoicePreference()

  // Cancel current speech
  const cancel = useCallback(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel()
    }
  }, [])

  // Speak new text when it changes
  useEffect(() => {
    if (!enabled || !text || !('speechSynthesis' in window)) {
      return
    }

    // Don't repeat the same text
    if (text === lastSpokenRef.current) {
      return
    }

    // Cancel any ongoing speech
    cancel()

    // Preprocess and create utterance
    const processedText = preprocessText(text)
    const utterance = new SpeechSynthesisUtterance(processedText)
    utterance.lang = lang

    // Apply style-specific settings
    const settings = STYLE_SETTINGS[style]
    utterance.rate = settings.rate
    utterance.pitch = settings.pitch
    utterance.volume = settings.volume

    // Find the best voice
    const voices = window.speechSynthesis.getVoices()
    const langPrefix = lang.split('-')[0]
    const langVoices = voices.filter(v => v.lang.startsWith(langPrefix))

    let selectedVoice: SpeechSynthesisVoice | undefined

    // If user has a preferred voice, try to use it
    if (preferredVoiceName) {
      selectedVoice = langVoices.find(v => v.name === preferredVoiceName)
    }

    // Otherwise, auto-select prioritizing: female + neural/natural
    if (!selectedVoice) {
      const femaleVoices = langVoices.filter(isFemaleVoice)
      const voicePool = femaleVoices.length > 0 ? femaleVoices : langVoices

      selectedVoice =
        // Neural/Natural female voices first
        voicePool.find(v => v.name.toLowerCase().includes('neural') || v.name.toLowerCase().includes('natural')) ||
        // Then any remote/cloud voice (usually better quality)
        voicePool.find(v => !v.localService) ||
        // Then any voice from the pool
        voicePool[0]
    }

    if (selectedVoice) {
      utterance.voice = selectedVoice
    }

    utteranceRef.current = utterance
    lastSpokenRef.current = text

    window.speechSynthesis.speak(utterance)
  }, [text, enabled, lang, style, cancel, preferredVoiceName])

  // Cancel on unmount or when disabled
  useEffect(() => {
    if (!enabled) {
      cancel()
      lastSpokenRef.current = null
    }
    return () => cancel()
  }, [enabled, cancel])

  // Reset last spoken when language changes
  useEffect(() => {
    lastSpokenRef.current = null
  }, [lang])

  return { cancel }
}

// Hook to get available voices for a language
export function useVoices(lang: string = 'en') {
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([])

  useEffect(() => {
    if (!('speechSynthesis' in window)) return

    const updateVoices = () => {
      const allVoices = window.speechSynthesis.getVoices()
      const langVoices = allVoices.filter(v => v.lang.startsWith(lang))
      // Sort: female first, then by name
      langVoices.sort((a, b) => {
        const aFemale = isFemaleVoice(a)
        const bFemale = isFemaleVoice(b)
        if (aFemale && !bFemale) return -1
        if (!aFemale && bFemale) return 1
        return a.name.localeCompare(b.name)
      })
      setVoices(langVoices)
    }

    updateVoices()
    window.speechSynthesis.addEventListener('voiceschanged', updateVoices)
    return () => {
      window.speechSynthesis.removeEventListener('voiceschanged', updateVoices)
    }
  }, [lang])

  return voices
}

// Export the helper for UI
export { isFemaleVoice }
