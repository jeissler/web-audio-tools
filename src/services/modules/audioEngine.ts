import noiseProcessorUrl from '@/services/noiseProcessor.ts?worker&url'

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}

interface AudioState {
  isPlaying: boolean
  audioCtx: AudioContext | null
  oscillator: OscillatorNode | null
  noiseNode: AudioWorkletNode | null
  gainNode: GainNode | null
  panNode: StereoPannerNode | null
  analyserNode: AnalyserNode | null
}

export type WaveType = OscillatorType
export type NoiseType = 'white' | 'pink' | 'brown'

export const createAudioEngine = (onStateChange?: (isPlaying: boolean) => void) => {
  let state: AudioState = {
    isPlaying: false,
    audioCtx: null,
    oscillator: null,
    noiseNode: null,
    gainNode: null,
    panNode: null,
    analyserNode: null,
  }

  // Helper to update playing state and notify callback
  const setIsPlaying = (playing: boolean) => {
    if (state.isPlaying !== playing) {
      state.isPlaying = playing
      onStateChange?.(playing)
    }
  }

  // Helper functions with closure access to state
  const initAudio = async (): Promise<void> => {
    if (state.audioCtx) return

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      if (!AudioCtx) throw new Error('Web Audio API not supported')

      state.audioCtx = new AudioCtx()

      // Load noise processor
      try {
        await state.audioCtx.audioWorklet.addModule(noiseProcessorUrl)
      } catch (e) {
        console.warn('Failed to load noise processor:', e)
      }

      // Resume if suspended
      if (state.audioCtx.state === 'suspended') {
        await state.audioCtx.resume()
      }

      // Create audio nodes
      state.gainNode = state.audioCtx.createGain()
      state.panNode = state.audioCtx.createStereoPanner()
      state.analyserNode = state.audioCtx.createAnalyser()

      // Connect: gain -> pan -> analyser -> destination
      state.gainNode.connect(state.panNode)
      state.panNode.connect(state.analyserNode)
      state.analyserNode.connect(state.audioCtx.destination)
    } catch (error) {
      console.error('Audio init failed:', error)
      throw new Error('Audio initialization failed')
    }
  }

  const cleanup = async (): Promise<void> => {
    try {
      if (state.oscillator) {
        state.oscillator.stop()
        state.oscillator.disconnect()
      }
      if (state.noiseNode) {
        state.noiseNode.disconnect()
      }
      if (state.gainNode) state.gainNode.disconnect()
      if (state.panNode) state.panNode.disconnect()
      if (state.analyserNode) state.analyserNode.disconnect()
      if (state.audioCtx && state.audioCtx.state !== 'closed') {
        await state.audioCtx.close()
      }
    } catch (e) {
      console.warn('Cleanup error:', e)
    }

    state = {
      isPlaying: false,
      audioCtx: null,
      oscillator: null,
      noiseNode: null,
      gainNode: null,
      panNode: null,
      analyserNode: null,
    }
    onStateChange?.(false)
  }

  return {
    isPlaying: () => state.isPlaying,
    getAudioContext: () => state.audioCtx,
    getAnalyserNode: () => state.analyserNode,

    async startTone(freq = 440, volume = 0.5, type: WaveType = 'sine', pan = 0, duration = 10) {
      try {
        if (state.isPlaying) return
        await initAudio()
        if (!state.audioCtx || !state.gainNode || !state.panNode) return

        state.oscillator = state.audioCtx.createOscillator()
        state.oscillator.type = type
        state.oscillator.frequency.setValueAtTime(freq, state.audioCtx.currentTime)

        state.gainNode.gain.setValueAtTime(volume, state.audioCtx.currentTime)
        state.panNode.pan.setValueAtTime(pan, state.audioCtx.currentTime)

        state.oscillator.connect(state.gainNode)
        state.oscillator.start()
        state.oscillator.stop(state.audioCtx.currentTime + duration)

        state.oscillator.onended = () => {
          setIsPlaying(false)
          state.oscillator = null
        }

        setIsPlaying(true)
      } catch (error) {
        console.error('Start tone failed:', error)
        setIsPlaying(false)
        throw error
      }
    },

    async startSweep(
      startFreq: number,
      endFreq: number,
      duration: number,
      volume = 0.5,
      type: WaveType = 'sine',
      pan = 0,
    ) {
      try {
        if (state.isPlaying) return
        await initAudio()
        if (!state.audioCtx || !state.gainNode || !state.panNode) return

        const now = state.audioCtx.currentTime
        state.oscillator = state.audioCtx.createOscillator()
        state.oscillator.type = type

        state.oscillator.frequency.setValueAtTime(startFreq, now)
        state.oscillator.frequency.linearRampToValueAtTime(endFreq, now + duration)

        state.gainNode.gain.setValueAtTime(volume, now)
        state.panNode.pan.setValueAtTime(pan, now)

        state.oscillator.connect(state.gainNode)
        state.oscillator.start()
        state.oscillator.stop(now + duration)

        state.oscillator.onended = () => {
          setIsPlaying(false)
          state.oscillator = null
        }

        setIsPlaying(true)
      } catch (error) {
        console.error('Start sweep failed:', error)
        setIsPlaying(false)
        throw error
      }
    },

    async startNoise(type: NoiseType = 'white', volume = 0.5) {
      try {
        if (state.isPlaying) return
        await initAudio()
        if (!state.audioCtx || !state.gainNode) return

        state.noiseNode = new AudioWorkletNode(state.audioCtx, 'noise-processor', {
          processorOptions: { noiseType: type },
        })

        state.gainNode.gain.setValueAtTime(volume, state.audioCtx.currentTime)
        state.noiseNode.connect(state.gainNode)
        setIsPlaying(true)
      } catch (error) {
        console.error('Start noise failed:', error)
        setIsPlaying(false)
        throw error
      }
    },

    async stopTone() {
      try {
        if (state.oscillator) {
          state.oscillator.stop()
          state.oscillator.disconnect()
          state.oscillator = null
        }
        await cleanup()
      } catch (error) {
        console.error('Stop tone failed:', error)
        state.isPlaying = false
      }
    },

    stopNoise() {
      try {
        if (state.noiseNode) {
          state.noiseNode.disconnect()
          state.noiseNode = null
        }
        setIsPlaying(false)
      } catch (error) {
        console.error('Stop noise failed:', error)
        setIsPlaying(false)
      }
    },

    setFrequency(freq: number) {
      try {
        if (state.oscillator && state.audioCtx) {
          state.oscillator.frequency.setValueAtTime(freq, state.audioCtx.currentTime)
        }
      } catch (error) {
        console.error('Set frequency failed:', error)
      }
    },

    setVolume(volume: number) {
      try {
        if (state.gainNode && state.audioCtx) {
          state.gainNode.gain.setValueAtTime(volume, state.audioCtx.currentTime)
        }
      } catch (error) {
        console.error('Set volume failed:', error)
      }
    },

    setPan(pan: number) {
      try {
        if (state.panNode && state.audioCtx) {
          state.panNode.pan.setValueAtTime(pan, state.audioCtx.currentTime)
        }
      } catch (error) {
        console.error('Set pan failed:', error)
      }
    },

    setWaveType(type: WaveType) {
      try {
        if (state.oscillator) {
          state.oscillator.type = type
        }
      } catch (error) {
        console.error('Set wave type failed:', error)
      }
    },

    setNoiseType(type: NoiseType) {
      try {
        if (state.noiseNode) {
          state.noiseNode.port.postMessage({ type: 'setNoiseType', value: type })
        }
      } catch (error) {
        console.error('Set noise type failed:', error)
      }
    },

    destroy: cleanup,
  }
}
