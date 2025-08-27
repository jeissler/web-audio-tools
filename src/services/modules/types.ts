export type WaveType = OscillatorType
export type NoiseType = 'white' | 'pink' | 'brown'

declare global {
  interface Window {
    webkitAudioContext?: typeof AudioContext
  }
}
