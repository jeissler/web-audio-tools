import { ref, watch } from 'vue'
import { WebAudioService, type WaveType } from '@/services/WebAudioService'
import { useAudioStore } from '@/stores/audio'
import { storeToRefs } from 'pinia'

const audioService = new WebAudioService()
const isPlaying = ref(audioService.isPlaying)

export function useAudioEngine() {
  const frequency = ref(440)
  const pan = ref(0)
  const waveType = ref<WaveType>('sine')
  const { volume } = storeToRefs(useAudioStore())

  function syncIsPlaying() {
    isPlaying.value = audioService.isPlaying
  }

  function start() {
    audioService.startTone(frequency.value, volume.value, waveType.value, pan.value)
    syncIsPlaying()
  }

  function stop() {
    audioService.stopTone()
    syncIsPlaying()
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
    pan,
    waveType,
    volume,

    // Actions
    start,
    stop,
    setFrequency,
    setPan,
    setWaveType,
  }
}
