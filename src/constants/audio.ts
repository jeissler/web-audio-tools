import { type WaveType, type NoiseType } from '@/services/WebAudioService'

export const DEFAULT_FREQUENCY = 440
export const DEFAULT_VOLUME = 0.5
export const DEFAULT_DURATION = 10
export const DEFAULT_TYPE = 'sine'
export const DEFAULT_NOISE_TYPE: NoiseType = 'white'

export const WAVE_TYPE_OPTIONS: Array<{ value: WaveType; label: string }> = [
  { value: 'sine', label: 'Sine' },
  { value: 'square', label: 'Square' },
  { value: 'sawtooth', label: 'Sawtooth' },
  { value: 'triangle', label: 'Triangle' },
]

export const NOISE_TYPE_OPTIONS: Array<{ value: NoiseType; label: string }> = [
  { value: 'white', label: 'White' },
  { value: 'pink', label: 'Pink' },
  { value: 'brown', label: 'Brown' },
]
