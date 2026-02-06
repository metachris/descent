import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { TOTAL_DURATION } from '../data/content'

interface JourneyContextType {
  progress: number
  isPlaying: boolean
  duration: number
  play: () => void
  pause: () => void
  seek: (progress: number) => void
  toggle: () => void
}

const JourneyContext = createContext<JourneyContextType | null>(null)

export function JourneyProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Ref is the source of truth during playback
  const progressRef = useRef(0)

  // Sync ref when state changes (from seek or external updates)
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // Playback animation loop
  useEffect(() => {
    if (!isPlaying) return

    let animationId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000
      lastTime = currentTime

      // Update ref directly (source of truth during playback)
      const newProgress = Math.max(0, Math.min(progressRef.current + delta / TOTAL_DURATION, 1))
      progressRef.current = newProgress

      // Update React state for UI
      setProgress(newProgress)

      if (newProgress >= 1) {
        setIsPlaying(false)
        return
      }

      animationId = requestAnimationFrame(animate)
    }

    animationId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [isPlaying])

  const play = useCallback(() => {
    setIsPlaying(true)
  }, [])

  const pause = useCallback(() => {
    setIsPlaying(false)
  }, [])

  const seek = useCallback((newProgress: number) => {
    const clamped = Math.max(0, Math.min(1, newProgress))
    progressRef.current = clamped
    setProgress(clamped)
  }, [])

  const toggle = useCallback(() => {
    setIsPlaying(prev => !prev)
  }, [])

  return (
    <JourneyContext.Provider
      value={{
        progress,
        isPlaying,
        duration: TOTAL_DURATION,
        play,
        pause,
        seek,
        toggle,
      }}
    >
      {children}
    </JourneyContext.Provider>
  )
}

export function useJourney(): JourneyContextType {
  const context = useContext(JourneyContext)
  if (!context) {
    throw new Error('useJourney must be used within a JourneyProvider')
  }
  return context
}

