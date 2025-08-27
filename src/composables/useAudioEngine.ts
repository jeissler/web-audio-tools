import { ref, watch } from 'vue'
import { createAudioEngine, type WaveType, type NoiseType } from '@/services/modules/audioEngine'
import { useAudioStore } from '@/stores/audio'
import { storeToRefs } from 'pinia'
import {
  WAVE_TYPE_OPTIONS,
  DEFAULT_FREQUENCY,
  DEFAULT_TYPE,
  DEFAULT_DURATION,
} from '@/constants/audio'

// Local variable for timeout
let durationTimeout: ReturnType<typeof setTimeout> | null = null

export function useAudioEngine() {
  // Local reactive state
  const frequency = ref(DEFAULT_FREQUENCY)
  const frequencyRange = ref<[number, number]>([DEFAULT_FREQUENCY, 2000])
  const pan = ref(0)
  const waveType = ref<WaveType>(DEFAULT_TYPE)
  const duration = ref(DEFAULT_DURATION)
  const isPlaying = ref(false)

  // Global state (only volume needs to be global for header control)
  const { volume } = storeToRefs(useAudioStore())

  // Create audio engine with callback to update reactive state
  const audioEngine = createAudioEngine((playing) => {
    isPlaying.value = playing
  })

  function clearDurationTimeout() {
    if (durationTimeout) {
      clearTimeout(durationTimeout)
      durationTimeout = null
    }
  }

  function setDuration(newDuration: number) {
    duration.value = newDuration
  }

  async function start() {
    try {
      await audioEngine.startTone(
        frequency.value,
        volume.value,
        waveType.value,
        pan.value,
        duration.value,
      )

      // Set timeout to stop after duration
      clearDurationTimeout()
      durationTimeout = setTimeout(stop, duration.value * 1000)
    } catch (error) {
      console.error('Failed to start audio:', error)
    }
  }

  async function startSweep() {
    try {
      await audioEngine.startSweep(
        frequencyRange.value[0],
        frequencyRange.value[1],
        duration.value,
        volume.value,
        waveType.value,
        pan.value,
      )

      // Set timeout to stop after duration
      clearDurationTimeout()
      durationTimeout = setTimeout(stop, duration.value * 1000)
    } catch (error) {
      console.error('Failed to start frequency sweep:', error)
    }
  }

  async function stop() {
    try {
      await audioEngine.stopTone()
    } catch (error) {
      console.error('Failed to stop audio:', error)
    } finally {
      clearDurationTimeout()
    }
  }

  function setFrequency(freq: number) {
    frequency.value = freq
    audioEngine.setFrequency(freq)
  }

  function setPan(value: number) {
    pan.value = value
    audioEngine.setPan(value)
  }

  function setWaveType(type: WaveType) {
    waveType.value = type
    audioEngine.setWaveType(type)
  }

  async function startNoise(type: NoiseType) {
    try {
      await audioEngine.startNoise(type, volume.value)
    } catch (error) {
      console.error('Failed to start noise:', error)
    }
  }

  function stopNoise() {
    audioEngine.stopNoise()
  }

  function setNoiseType(type: NoiseType) {
    audioEngine.setNoiseType(type)
  }

  // Keep engine volume in sync with global volume store
  watch(volume, (val) => {
    audioEngine.setVolume(val)
  })

  return {
    // Reactive values
    isPlaying,
    frequency,
    frequencyRange,
    pan,
    waveType,
    volume,
    duration,

    // Actions
    start,
    startSweep,
    stop,
    setFrequency,
    setPan,
    setWaveType,
    setDuration,
    startNoise,
    stopNoise,
    setNoiseType,

    // Constants
    WAVE_TYPE_OPTIONS,
  }
}
