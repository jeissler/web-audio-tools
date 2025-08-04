import {
  DEFAULT_FREQUENCY,
  DEFAULT_VOLUME,
  DEFAULT_TYPE,
  DEFAULT_DURATION,
} from '@/constants/audio'

export type WaveType = OscillatorType // 'sine' | 'square' | 'sawtooth' | 'triangle'

interface WebkitWindow extends Window {
  webkitAudioContext?: typeof AudioContext
}

export class WebAudioService {
  private audioCtx: AudioContext | null = null
  private oscillator: OscillatorNode | null = null
  private gainNode: GainNode | null = null
  private panNode: StereoPannerNode | null = null
  private analyser: AnalyserNode | null = null
  private _isPlaying = false

  get isPlaying(): boolean {
    return this._isPlaying
  }

  private ensureContext(): void {
    if (this.audioCtx) return

    const AudioCtx = window.AudioContext || (window as WebkitWindow).webkitAudioContext

    if (!AudioCtx) throw new Error('Web Audio API is not supported in this browser.')

    this.audioCtx = new AudioCtx()
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
    this._isPlaying = false
  }

  public startTone(
    freq: number = DEFAULT_FREQUENCY,
    volume: number = DEFAULT_VOLUME,
    type: WaveType = DEFAULT_TYPE,
    pan: number = 0,
    duration: number = DEFAULT_DURATION,
  ): void {
    if (this._isPlaying) return

    this.ensureContext()
    this.initNodes()

    if (!this.audioCtx || !this.gainNode || !this.panNode) return

    const startTime = this.audioCtx.currentTime
    const stopTime = startTime + duration

    this.oscillator = this.audioCtx.createOscillator()
    this.oscillator.type = type
    this.oscillator.frequency.setValueAtTime(freq, startTime)

    this.gainNode.gain.setValueAtTime(volume, startTime)
    this.panNode.pan.setValueAtTime(pan, startTime)

    this.oscillator.connect(this.gainNode)
    this.oscillator.start(startTime)
    this.oscillator.stop(stopTime)

    this._isPlaying = true

    // Clean up nodes after the tone stops
    this.oscillator.onended = () => this.cleanup()
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
}
