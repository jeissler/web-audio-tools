import noiseProcessorUrl from '@/services/noiseProcessor.ts?worker&url'

import {
  DEFAULT_FREQUENCY,
  DEFAULT_VOLUME,
  DEFAULT_TYPE,
  DEFAULT_DURATION,
  DEFAULT_NOISE_TYPE,
} from '@/constants/audio'

export type WaveType = OscillatorType // 'sine' | 'square' | 'sawtooth' | 'triangle'
export type NoiseType = 'white' | 'pink' | 'brown'

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext
}

type StateChangeCallback = (isPlaying: boolean) => void

export class WebAudioService {
  private noiseNode: AudioWorkletNode | null = null
  private audioCtx: AudioContext | null = null
  private oscillator: OscillatorNode | null = null
  private gainNode: GainNode | null = null
  private panNode: StereoPannerNode | null = null
  private analyser: AnalyserNode | null = null
  private _isPlaying = false

  // Store callback for reactive state updates
  private onStateChange?: StateChangeCallback

  /**
   * Creates a new WebAudioService instance
   * @param onStateChange - Optional callback that gets called when isPlaying state changes
   */
  constructor(onStateChange?: StateChangeCallback) {
    this.onStateChange = onStateChange
  }

  get isPlaying(): boolean {
    return this._isPlaying
  }

  // Notify observers when playing state changes
  private setIsPlaying(playing: boolean): void {
    if (this._isPlaying !== playing) {
      this._isPlaying = playing
      this.onStateChange?.(playing)
    }
  }

  private async ensureContext(): Promise<void> {
    if (this.audioCtx) return

    const AudioCtx = window.AudioContext || (window as WebkitWindow).webkitAudioContext

    if (!AudioCtx) throw new Error('Web Audio API is not supported in this browser.')

    this.audioCtx = new AudioCtx()

    try {
      await this.audioCtx.audioWorklet.addModule(noiseProcessorUrl)
    } catch (e) {
      console.error('Failed to load AudioWorklet module:', e)
    }

    // Resume context if suspended
    if (this.audioCtx.state === 'suspended') {
      await this.audioCtx.resume()
    }
  }

  private initNodes(): void {
    if (!this.audioCtx) return

    this.gainNode = this.audioCtx.createGain()
    this.panNode = this.audioCtx.createStereoPanner()
    this.analyser = this.audioCtx.createAnalyser()

    this.gainNode.connect(this.panNode)
    this.panNode.connect(this.analyser)
    this.analyser.connect(this.audioCtx.destination)
  }

  private cleanup(): void {
    this.oscillator = null
    this.gainNode = null
    this.panNode = null
    this.analyser = null
    this.audioCtx = null
    this.setIsPlaying(false)
  }

  private async playOscillator(
    startFreq: number,
    endFreq: number,
    duration: number,
    volume: number,
    type: WaveType,
    pan: number,
  ): Promise<void> {
    if (this._isPlaying) return

    await this.ensureContext()
    this.initNodes()

    if (!this.audioCtx || !this.gainNode || !this.panNode) return

    const now = this.audioCtx.currentTime
    const stopTime = now + duration

    this.oscillator = this.audioCtx.createOscillator()
    this.oscillator.type = type

    this.oscillator.frequency.setValueAtTime(startFreq, now)

    if (startFreq !== endFreq) {
      this.oscillator.frequency.linearRampToValueAtTime(endFreq, stopTime)
    }

    this.gainNode.gain.setValueAtTime(volume, now)
    this.panNode.pan.setValueAtTime(pan, now)

    this.oscillator.connect(this.gainNode)
    this.oscillator.start(now)
    this.oscillator.stop(stopTime)

    this.setIsPlaying(true)
    this.oscillator.onended = () => this.cleanup()
  }

  public async startTone(
    freq: number = DEFAULT_FREQUENCY,
    volume: number = DEFAULT_VOLUME,
    type: WaveType = DEFAULT_TYPE,
    pan: number = 0,
    duration: number = DEFAULT_DURATION,
  ): Promise<void> {
    await this.playOscillator(freq, freq, duration, volume, type, pan)
  }

  public async startSweep(
    startFreq: number,
    endFreq: number,
    duration: number,
    volume: number = DEFAULT_VOLUME,
    type: WaveType = DEFAULT_TYPE,
    pan: number = 0,
  ): Promise<void> {
    await this.playOscillator(startFreq, endFreq, duration, volume, type, pan)
  }

  public stopTone(): void {
    if (!this._isPlaying || !this.audioCtx) return

    this.oscillator?.stop()
    this.oscillator?.disconnect()
    this.gainNode?.disconnect()
    this.panNode?.disconnect()
    this.analyser?.disconnect()

    this.audioCtx.close()

    this.cleanup()
  }

  public setFrequency(freq: number): void {
    if (!this.oscillator || !this.audioCtx) return
    this.oscillator.frequency.setValueAtTime(freq, this.audioCtx.currentTime)
  }

  public setVolume(volume: number): void {
    if (!this.gainNode || !this.audioCtx) return
    this.gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime)
  }

  public setPan(pan: number): void {
    if (!this.panNode || !this.audioCtx) return
    this.panNode.pan.setValueAtTime(pan, this.audioCtx.currentTime)
  }

  public setWaveType(type: WaveType): void {
    if (!this.oscillator) return
    this.oscillator.type = type
  }

  public getAnalyserNode(): AnalyserNode | null {
    return this.analyser
  }

  public getAudioContext(): AudioContext | null {
    return this.audioCtx
  }

  public async createNoiseNode(
    type: NoiseType = DEFAULT_NOISE_TYPE,
    volume: number = DEFAULT_VOLUME,
  ): Promise<void> {
    if (this._isPlaying) return

    await this.ensureContext()
    this.initNodes()

    if (!this.audioCtx) return

    this.stopNoise()

    this.noiseNode = new AudioWorkletNode(this.audioCtx, 'noise-processor', {
      processorOptions: { noiseType: type },
    })

    // Connect through gain and pan nodes for volume control
    if (this.gainNode && this.panNode) {
      this.noiseNode.connect(this.gainNode)
      this.gainNode.gain.setValueAtTime(volume, this.audioCtx.currentTime)
    }

    this.setIsPlaying(true)
  }

  public stopNoise(): void {
    this.noiseNode?.disconnect()
    this.noiseNode = null
    this.setIsPlaying(false)
  }

  public setNoiseType(type: NoiseType): void {
    if (!this.noiseNode) return
    this.noiseNode.port.postMessage({ type: 'setNoiseType', value: type })
  }

  public async startNoise(
    type: NoiseType = DEFAULT_NOISE_TYPE,
    volume: number = DEFAULT_VOLUME,
  ): Promise<void> {
    await this.createNoiseNode(type, volume)
  }
}
