import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { WebAudioService, type WaveType } from '../WebAudioService'

// Mock Web Audio API
const mockAudioContext = {
  createOscillator: vi.fn(() => ({
    type: 'sine',
    frequency: { setValueAtTime: vi.fn() },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn(),
  })),
  createGain: vi.fn(() => ({
    gain: { setValueAtTime: vi.fn() },
    connect: vi.fn(),
    disconnect: vi.fn(),
  })),
  createStereoPanner: vi.fn(() => ({
    pan: { setValueAtTime: vi.fn() },
    connect: vi.fn(),
    disconnect: vi.fn(),
  })),
  createAnalyser: vi.fn(() => ({
    connect: vi.fn(),
    disconnect: vi.fn(),
  })),
  currentTime: 0,
  destination: {},
  close: vi.fn(),
}

// Setup/teardown Web Audio API mocks
const setupWebAudioMocks = () => {
  const originalAudioContext = window.AudioContext
  const mockConstructor = vi.fn(() => mockAudioContext)

  // @ts-expect-error - Mocking browser API
  window.AudioContext = mockConstructor
  // @ts-expect-error - Mocking browser API
  window.webkitAudioContext = mockConstructor

  vi.clearAllMocks()
  return originalAudioContext
}

const teardownWebAudioMocks = (originalAudioContext?: typeof AudioContext) => {
  if (originalAudioContext) {
    window.AudioContext = originalAudioContext
  } else {
    // @ts-expect-error - Cleaning up mock
    delete window.AudioContext
  }
  // @ts-expect-error - Cleaning up mock
  delete window.webkitAudioContext
}

describe('WebAudioService', () => {
  let service: WebAudioService
  let originalAudioContext: typeof AudioContext | undefined

  beforeEach(() => {
    originalAudioContext = setupWebAudioMocks()
    service = new WebAudioService()
  })

  afterEach(() => {
    teardownWebAudioMocks(originalAudioContext)
    if (service.isPlaying) {
      service.stopTone()
    }
  })

  describe('initialization', () => {
    it('should initialize with isPlaying as false', () => {
      expect(service.isPlaying).toBe(false)
    })

    it('should return null for audio context before initialization', () => {
      expect(service.getAudioContext()).toBeNull()
    })

    it('should return null for analyser before initialization', () => {
      expect(service.getAnalyserNode()).toBeNull()
    })
  })

  describe('startTone', () => {
    it('should start tone and set isPlaying to true', () => {
      service.startTone()
      expect(service.isPlaying).toBe(true)
    })

    it('should not start tone if already playing', () => {
      service.startTone()
      const initialContext = service.getAudioContext()
      service.startTone()
      expect(service.getAudioContext()).toBe(initialContext)
    })

    it('should create audio context when starting tone', () => {
      service.startTone()
      expect(service.getAudioContext()).not.toBeNull()
    })

    it('should create analyser when starting tone', () => {
      service.startTone()
      expect(service.getAnalyserNode()).not.toBeNull()
    })
  })

  describe('stopTone', () => {
    it('should stop tone and set isPlaying to false', () => {
      service.startTone()
      service.stopTone()
      expect(service.isPlaying).toBe(false)
    })

    it('should not stop if not playing', () => {
      service.stopTone()
      expect(service.isPlaying).toBe(false)
    })

    it('should reset audio context after stopping', () => {
      service.startTone()
      service.stopTone()
      expect(service.getAudioContext()).toBeNull()
    })

    it('should reset analyser after stopping', () => {
      service.startTone()
      service.stopTone()
      expect(service.getAnalyserNode()).toBeNull()
    })
  })

  describe('parameter setters', () => {
    beforeEach(() => {
      service.startTone()
    })

    it('should set frequency without throwing error', () => {
      expect(() => service.setFrequency(660)).not.toThrow()
    })

    it('should set volume without throwing error', () => {
      expect(() => service.setVolume(0.7)).not.toThrow()
    })

    it('should set pan without throwing error', () => {
      expect(() => service.setPan(0.3)).not.toThrow()
    })

    it('should set wave type without throwing error', () => {
      expect(() => service.setWaveType('square')).not.toThrow()
    })
  })

  describe('wave types', () => {
    it('should support all oscillator types', () => {
      const waveTypes: WaveType[] = ['sine', 'square', 'sawtooth', 'triangle']

      waveTypes.forEach((type) => {
        service.startTone(440, 0.5, type)
        service.stopTone()
        expect(service.isPlaying).toBe(false)
      })
    })
  })

  describe('edge cases', () => {
    it('should handle multiple start/stop cycles', () => {
      service.startTone()
      service.stopTone()
      service.startTone()
      service.stopTone()

      expect(service.isPlaying).toBe(false)
    })

    it('should handle parameter updates when not playing', () => {
      expect(() => {
        service.setFrequency(880)
        service.setVolume(0.8)
        service.setPan(0.5)
        service.setWaveType('square')
      }).not.toThrow()
    })
  })
})
