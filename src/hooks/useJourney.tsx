import { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react'
import { getProject, types } from '@theatre/core'
import studio from '@theatre/studio'
import { TOTAL_DURATION } from '../data/content'

// Initialize Theatre.js Studio in development
if (import.meta.env.DEV) {
  studio.initialize()
}

// Create Theatre.js project
const project = getProject('Descent')
const sheet = project.sheet('Journey')

// Define the animated properties
const journeyObj = sheet.object('Journey', {
  progress: types.number(0, { range: [0, 1] }),
})

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
  const progressRef = useRef(0)

  // Keep ref in sync with state
  useEffect(() => {
    progressRef.current = progress
  }, [progress])

  // Subscribe to Theatre.js value changes
  useEffect(() => {
    const unsubscribe = journeyObj.onValuesChange((values) => {
      setProgress(values.progress)
    })
    return unsubscribe
  }, [])

  // Playback animation
  useEffect(() => {
    if (!isPlaying) return

    let animationId: number
    let lastTime = performance.now()

    const animate = (currentTime: number) => {
      const delta = (currentTime - lastTime) / 1000 // Convert to seconds
      lastTime = currentTime

      // Use ref to get current progress (avoids stale closure)
      const currentProgress = progressRef.current
      const newProgress = Math.max(0, Math.min(currentProgress + delta / TOTAL_DURATION, 1))

      // Update Theatre.js sequence position (ensure non-negative)
      sheet.sequence.position = Math.max(0, newProgress * TOTAL_DURATION)
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
    const clampedProgress = Math.max(0, Math.min(1, newProgress))
    sheet.sequence.position = clampedProgress * TOTAL_DURATION
    setProgress(clampedProgress)
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

// Export Theatre.js objects for direct animation binding
export { project, sheet, journeyObj }
