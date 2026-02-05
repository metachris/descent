import { useState, useEffect } from 'react'
import { useJourney } from '../hooks/useJourney'
import { useAudio } from '../hooks/useAudio'
import { useLanguage } from '../hooks/useLanguage'
import { LanguageSelector } from './LanguageSelector'
import { VoiceSelector } from './VoiceSelector'

export default function Timeline() {
  const { progress, isPlaying, play, pause, seek, duration } = useJourney()
  const { voiceEnabled, setVoiceEnabled } = useLanguage()
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showVolumeSlider, setShowVolumeSlider] = useState(false)
  const { initAudio, setEnabled, volume, setVolume } = useAudio(progress, duration, isPlaying && !isMuted)

  // Initialize audio on mount (user has already interacted via Start button)
  useEffect(() => {
    initAudio()
  }, [initAudio])

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }
    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange)
  }, [])

  const toggleMute = () => {
    const newMuted = !isMuted
    setIsMuted(newMuted)
    setEnabled(!newMuted)
  }

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const currentTime = progress * duration

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/50 to-transparent">
      <div className="max-w-2xl mx-auto">
        {/* Progress bar */}
        <div
          className="relative h-1 bg-white/20 rounded-full cursor-pointer mb-4"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect()
            const x = (e.clientX - rect.left) / rect.width
            seek(x)
          }}
        >
          <div
            className="absolute top-0 left-0 h-full bg-core-glow rounded-full transition-all"
            style={{ width: `${progress * 100}%` }}
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-lg"
            style={{ left: `${progress * 100}%`, transform: 'translate(-50%, -50%)' }}
          />
        </div>

        {/* Controls */}
        <div className="flex items-center justify-between text-sm">
          <button
            onClick={() => isPlaying ? pause() : play()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            {isPlaying ? (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </button>

          <div className="text-white/60 font-mono text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>

          <div className="flex items-center gap-3">
            <LanguageSelector variant="minimal" />

            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
                voiceEnabled ? 'bg-amber-500/30 hover:bg-amber-500/40' : 'bg-white/10 hover:bg-white/20'
              }`}
              title={voiceEnabled ? 'Disable voice narration' : 'Enable voice narration'}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>

            {voiceEnabled && <VoiceSelector />}

            {/* Volume control */}
            <div
              className="relative flex items-center"
              onMouseEnter={() => setShowVolumeSlider(true)}
              onMouseLeave={() => setShowVolumeSlider(false)}
            >
              <button
                onClick={toggleMute}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                title={isMuted ? 'Unmute' : 'Mute'}
              >
                {isMuted || volume === 0 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                  </svg>
                ) : volume < 0.5 ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>

              {/* Volume slider - appears on hover */}
              <div
                className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-black/90 rounded-lg border border-white/20 transition-all ${
                  showVolumeSlider ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
              >
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => {
                    const newVolume = parseFloat(e.target.value)
                    setVolume(newVolume)
                    if (newVolume > 0 && isMuted) {
                      setIsMuted(false)
                      setEnabled(true)
                    }
                  }}
                  className="w-24 h-1 appearance-none bg-white/20 rounded-full cursor-pointer
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:w-3
                    [&::-webkit-slider-thumb]:h-3
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:bg-white
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:w-3
                    [&::-moz-range-thumb]:h-3
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:bg-white
                    [&::-moz-range-thumb]:border-0
                    [&::-moz-range-thumb]:cursor-pointer"
                  style={{
                    background: `linear-gradient(to right, rgba(251, 146, 60, 0.8) 0%, rgba(251, 146, 60, 0.8) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) ${(isMuted ? 0 : volume) * 100}%, rgba(255,255,255,0.2) 100%)`
                  }}
                />
                <div className="text-xs text-white/50 text-center mt-1">
                  {Math.round((isMuted ? 0 : volume) * 100)}%
                </div>
              </div>
            </div>

            <button
              onClick={toggleFullscreen}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
            >
              {isFullscreen ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3" />
                </svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
