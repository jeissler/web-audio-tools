import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { WaveType } from '@/services/WebAudioService'

export const WAVE_TYPE_OPTIONS: Array<{ value: WaveType; label: string }> = [
  { value: 'sine', label: 'Sine' },
  { value: 'square', label: 'Square' },
  { value: 'sawtooth', label: 'Sawtooth' },
  { value: 'triangle', label: 'Triangle' },
]

export const useAudioStore = defineStore('audio', () => {
  const volume = ref(0.5)
  const waveType = ref<WaveType>('sine')
  return { volume, waveType }
})
