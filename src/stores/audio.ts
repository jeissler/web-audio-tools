import { defineStore } from 'pinia'
import { ref } from 'vue'
import { DEFAULT_VOLUME } from '@/constants/audio'

export const useAudioStore = defineStore('audio', () => {
  const volume = ref(DEFAULT_VOLUME)
  return { volume }
})
