import { ref, watch } from 'vue'
import { WebAudioService, type WaveType } from '@/services/WebAudioService'
import { useAudioStore } from '@/stores/audio'
import { storeToRefs } from 'pinia'
import { WAVE_TYPE_OPTIONS, DEFAULT_FREQUENCY } from '@/constants/audio'

const audioService = new WebAudioService()
let durationTimeout: ReturnType<typeof setTimeout> | null = null

export function useAudioEngine() {
  const frequency = ref(DEFAULT_FREQUENCY)
  const frequencyRange = ref<[number, number]>([DEFAULT_FREQUENCY, 2000])
  const pan = ref(0)
  const { volume, waveType, isPlaying, duration } = storeToRefs(useAudioStore())

  function clearDurationTimeout() {
    if (durationTimeout) {
      clearTimeout(durationTimeout)
      durationTimeout = null
    }
  }

  function setDuration(newDuration: number) {
    duration.value = newDuration
  }

  function start() {
    audioService.startTone(frequency.value, volume.value, waveType.value, pan.value)
    isPlaying.value = true

    // Set timeout to stop after duration
    clearDurationTimeout()
    durationTimeout = setTimeout(stop, duration.value * 1000)
  }

  function startSweep() {
    audioService.startSweep(
      frequencyRange.value[0],
      frequencyRange.value[1],
      duration.value,
      volume.value,
      waveType.value,
      pan.value,
    )
    isPlaying.value = true

    // Set timeout to stop after duration
    clearDurationTimeout()
    durationTimeout = setTimeout(stop, duration.value * 1000)
  }

  function stop() {
    audioService.stopTone()
    isPlaying.value = false
    clearDurationTimeout()
  }

  function setFrequency(freq: number) {
    frequency.value = freq
    audioService.setFrequency(freq)
  }

  function setPan(value: number) {
    pan.value = value
    audioService.setPan(value)
  }

  function setWaveType(type: WaveType) {
    waveType.value = type
    audioService.setWaveType(type)
  }

  // Keep service volume in sync with global volume store
  watch(volume, (val) => {
    audioService.setVolume(val)
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

    // Constants
    WAVE_TYPE_OPTIONS,
  }
}
