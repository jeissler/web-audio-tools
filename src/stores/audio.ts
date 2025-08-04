import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WaveType } from '@/services/WebAudioService'
import { DEFAULT_VOLUME, DEFAULT_TYPE, DEFAULT_DURATION } from '@/constants/audio'

export const useAudioStore = defineStore('audio', () => {
  const isPlaying = ref(false)
  const duration = ref(DEFAULT_DURATION)
  const volume = ref(DEFAULT_VOLUME)
  const waveType = ref<WaveType>(DEFAULT_TYPE)
  return { isPlaying, duration, volume, waveType }
})
