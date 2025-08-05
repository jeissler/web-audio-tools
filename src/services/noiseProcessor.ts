import { type NoiseType } from '@/services/WebAudioService'

// Web Audio API type declarations for AudioWorklet
declare class AudioWorkletProcessor {
  readonly port: MessagePort
  process(
    inputs: Float32Array[][],
    outputs: Float32Array[][],
    parameters: Record<string, Float32Array>,
  ): boolean
  constructor(options?: AudioWorkletNodeOptions)
}

declare function registerProcessor(
  name: string,
  processorCtor: new (options?: AudioWorkletNodeOptions) => AudioWorkletProcessor,
): void

class NoiseProcessor extends AudioWorkletProcessor {
  private noiseType: NoiseType
  private pinkState: number[] = Array(7).fill(0)
  private brownLastOut = 0

  constructor(options?: AudioWorkletNodeOptions) {
    super()

    const providedType = options?.processorOptions?.noiseType
    this.noiseType = ['white', 'pink', 'brown'].includes(providedType)
      ? (providedType as NoiseType)
      : 'white'

    this.port.onmessage = (event) => {
      const { type, value } = event.data || {}
      if (type === 'setNoiseType' && ['white', 'pink', 'brown'].includes(value)) {
        this.noiseType = value
      }
    }
  }

  private generateWhiteNoise(): number {
    return Math.random() * 2 - 1
  }

  private generatePinkNoise(white: number): number {
    const [b0, b1, b2, b3, b4, b5] = this.pinkState

    this.pinkState[0] = 0.99886 * b0 + white * 0.0555179
    this.pinkState[1] = 0.99332 * b1 + white * 0.0750759
    this.pinkState[2] = 0.969 * b2 + white * 0.153852
    this.pinkState[3] = 0.8665 * b3 + white * 0.3104856
    this.pinkState[4] = 0.55 * b4 + white * 0.5329522
    this.pinkState[5] = -0.7616 * b5 - white * 0.016898
    this.pinkState[6] = white * 0.115926

    const sum =
      this.pinkState[0] +
      this.pinkState[1] +
      this.pinkState[2] +
      this.pinkState[3] +
      this.pinkState[4] +
      this.pinkState[5] +
      this.pinkState[6] +
      white * 0.5362

    return sum * 0.11
  }

  private generateBrownNoise(white: number): number {
    this.brownLastOut = (this.brownLastOut + 0.02 * white) / 1.02
    return this.brownLastOut * 3.5
  }

  process(inputs: Float32Array[][], outputs: Float32Array[][]): boolean {
    const output = outputs[0]

    if (!output || output.length === 0) return true

    for (let i = 0; i < output[0].length; i++) {
      const white = this.generateWhiteNoise()
      let noiseValue: number

      switch (this.noiseType) {
        case 'white':
          noiseValue = white
          break
        case 'pink':
          noiseValue = this.generatePinkNoise(white)
          break
        case 'brown':
          noiseValue = this.generateBrownNoise(white)
          break
        default:
          noiseValue = white
      }

      // Fill all output channels with the same noise value
      for (let channel = 0; channel < output.length; channel++) {
        output[channel][i] = noiseValue
      }
    }

    return true
  }
}

registerProcessor('noise-processor', NoiseProcessor)
