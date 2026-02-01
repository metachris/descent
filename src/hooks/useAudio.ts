import { useEffect, useRef, useCallback } from 'react'
import { Howl } from 'howler'
import { PHASES } from '../data/content'

// Audio tracks for each phase
// These should be placed in public/audio/
const AUDIO_TRACKS: Record<string, string> = {
  'The Edge': '/audio/edge.mp3',
  'The Plunge': '/audio/plunge.mp3',
  'Heat Death': '/audio/death.mp3',
  'Boiling': '/audio/death.mp3',
  'Crushing': '/audio/death.mp3',
  'Incineration': '/audio/death.mp3',
  'The Long Fall': '/audio/long-fall.mp3',
  'Outer Core': '/audio/outer-core.mp3',
  'Inner Core': '/audio/inner-core.mp3',
  'The Center': '/audio/center.mp3',
}

// Crossfade duration in seconds
const CROSSFADE_DURATION = 2

interface AudioState {
  currentTrack: string | null
  sounds: Map<string, Howl>
  isEnabled: boolean
}

export function useAudio(progress: number, duration: number, isPlaying: boolean) {
  const stateRef = useRef<AudioState>({
    currentTrack: null,
    sounds: new Map(),
    isEnabled: true,
  })

  // Initialize audio tracks
  useEffect(() => {
    const sounds = stateRef.current.sounds

    // Preload all audio tracks
    Object.entries(AUDIO_TRACKS).forEach(([phase, src]) => {
      if (!sounds.has(phase)) {
        const sound = new Howl({
          src: [src],
          loop: true,
          volume: 0,
          preload: true,
          onloaderror: () => {
            console.warn(`Failed to load audio: ${src}`)
          },
        })
        sounds.set(phase, sound)
      }
    })

    return () => {
      // Cleanup on unmount
      sounds.forEach(sound => sound.unload())
      sounds.clear()
    }
  }, [])

  // Get current phase based on time
  const getCurrentPhase = useCallback((time: number) => {
    return PHASES.find(p => time >= p.startTime && time <= p.endTime)
  }, [])

  // Update audio based on progress
  useEffect(() => {
    if (!stateRef.current.isEnabled) return

    const currentTime = progress * duration
    const phase = getCurrentPhase(currentTime)

    if (!phase) return

    const sounds = stateRef.current.sounds
    const targetTrack = phase.name
    const currentTrack = stateRef.current.currentTrack

    // If the track changed, crossfade
    if (targetTrack !== currentTrack) {
      // Fade out current track
      if (currentTrack) {
        const currentSound = sounds.get(currentTrack)
        if (currentSound && currentSound.playing()) {
          currentSound.fade(currentSound.volume(), 0, CROSSFADE_DURATION * 1000)
          setTimeout(() => {
            currentSound.stop()
          }, CROSSFADE_DURATION * 1000)
        }
      }

      // Fade in new track
      const newSound = sounds.get(targetTrack)
      if (newSound && isPlaying) {
        newSound.play()
        newSound.fade(0, 0.5, CROSSFADE_DURATION * 1000)
      }

      stateRef.current.currentTrack = targetTrack
    }
  }, [progress, duration, isPlaying, getCurrentPhase])

  // Handle play/pause
  useEffect(() => {
    const sounds = stateRef.current.sounds
    const currentTrack = stateRef.current.currentTrack

    if (!currentTrack) return

    const sound = sounds.get(currentTrack)
    if (!sound) return

    if (isPlaying) {
      if (!sound.playing()) {
        sound.play()
        sound.fade(sound.volume(), 0.5, 500)
      }
    } else {
      sound.fade(sound.volume(), 0, 500)
      setTimeout(() => {
        if (!stateRef.current.sounds.get(currentTrack)?.playing()) return
        sound.pause()
      }, 500)
    }
  }, [isPlaying])

  // Enable/disable audio
  const setEnabled = useCallback((enabled: boolean) => {
    stateRef.current.isEnabled = enabled
    if (!enabled) {
      stateRef.current.sounds.forEach(sound => {
        sound.stop()
      })
      stateRef.current.currentTrack = null
    }
  }, [])

  return { setEnabled }
}

// Audio configuration for the experience
export const AUDIO_CONFIG = {
  edge: {
    description: 'Wind, distant heartbeat, anticipation',
    mood: 'tense',
  },
  plunge: {
    description: 'Rushing air, increasing wind, acceleration',
    mood: 'exhilarating',
  },
  death: {
    description: 'Distorted sounds, muffled, fading',
    mood: 'unsettling',
  },
  longFall: {
    description: 'Deep rumble, distant echoes, vast emptiness',
    mood: 'meditative',
  },
  outerCore: {
    description: 'Liquid metal sounds, electromagnetic hum, alien',
    mood: 'awe',
  },
  innerCore: {
    description: 'Crystalline resonance, harmonic overtones',
    mood: 'wonder',
  },
  center: {
    description: 'Silence... then low harmonic drone, peace',
    mood: 'transcendent',
  },
}
