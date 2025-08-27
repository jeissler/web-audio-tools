import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { WebAudioService, type WaveType } from './WebAudioService'

// Mock Web Audio API
const mockAudioContext = {
  createOscillator: vi.fn(() => ({
    type: 'sine',
    frequency: { setValueAtTime: vi.fn(), linearRampToValueAtTime: vi.fn() },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
    disconnect: vi.fn(),
    onended: vi.fn(),
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
  audioWorklet: {
    addModule: vi.fn().mockResolvedValue(undefined),
  },
  currentTime: 0,
  destination: {},
  close: vi.fn(),
  resume: vi.fn().mockResolvedValue(undefined),
  state: 'running',
}

// Mock AudioWorkletNode
const mockAudioWorkletNode = {
  port: {
    postMessage: vi.fn(),
  },
  connect: vi.fn(),
  disconnect: vi.fn(),
}

// Setup/teardown Web Audio API mocks
const setupWebAudioMocks = () => {
  const originalAudioContext = window.AudioContext
  const mockConstructor = vi.fn(() => mockAudioContext)

  // @ts-expect-error - Mocking browser API
  window.AudioContext = mockConstructor
  // @ts-expect-error - Mocking browser API
  window.webkitAudioContext = mockConstructor

  // Mock AudioWorkletNode constructor
  global.AudioWorkletNode = vi.fn(() => mockAudioWorkletNode) as unknown as typeof AudioWorkletNode

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
  // @ts-expect-error - Cleaning up mock
  delete global.AudioWorkletNode
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
  })

  describe('startTone', () => {
    it('should start tone and set isPlaying to true', async () => {
      await service.startTone()
      expect(service.isPlaying).toBe(true)
    })

    it('should not start tone if already playing', async () => {
      await service.startTone()
      const initialContext = service.getAudioContext()
      await service.startTone()
      expect(service.getAudioContext()).toBe(initialContext)
    })

    it('should create audio context when starting tone', async () => {
      await service.startTone()
      expect(service.getAudioContext()).not.toBeNull()
    })
  })

  describe('startSweep', () => {
    it('should start frequency sweep', async () => {
      await service.startSweep(440, 880, 2)
      expect(service.isPlaying).toBe(true)
    })

    it('should use linear ramp for frequency changes', async () => {
      await service.startSweep(440, 880, 2)
      expect(mockAudioContext.createOscillator).toHaveBeenCalled()
      const oscillator = mockAudioContext.createOscillator.mock.results[0].value
      expect(oscillator.frequency.linearRampToValueAtTime).toHaveBeenCalledWith(
        880,
        expect.any(Number),
      )
    })
  })

  describe('stopTone', () => {
    it('should stop tone and set isPlaying to false', async () => {
      await service.startTone()
      service.stopTone()
      expect(service.isPlaying).toBe(false)
    })

    it('should reset audio context after stopping', async () => {
      await service.startTone()
      service.stopTone()
      expect(service.getAudioContext()).toBeNull()
    })
  })

  describe('wave types', () => {
    it('should support all oscillator types', async () => {
      const waveTypes: WaveType[] = ['sine', 'square', 'sawtooth', 'triangle']

      for (const type of waveTypes) {
        await service.startTone(440, 0.5, type)
        service.stopTone()
        expect(service.isPlaying).toBe(false)
      }
    })
  })

  describe('noise functionality', () => {
    it('should create noise node', async () => {
      await service.createNoiseNode()
      expect(service.isPlaying).toBe(true)
    })

    it('should stop noise', async () => {
      await service.createNoiseNode()
      service.stopNoise()
      expect(service.isPlaying).toBe(false)
    })
  })

  describe('error handling', () => {
    it('should handle AudioWorklet module loading failure', async () => {
      mockAudioContext.audioWorklet.addModule = vi
        .fn()
        .mockRejectedValue(new Error('Module not found'))
      await service.startTone()
      expect(service.isPlaying).toBe(true) // Should still work despite AudioWorklet failure
    })

    it('should throw error when Web Audio API is not supported', async () => {
      // @ts-expect-error - Testing error case
      delete window.AudioContext
      // @ts-expect-error - Testing error case
      delete window.webkitAudioContext

      await expect(service.startTone()).rejects.toThrow('Web Audio API is not supported')
    })
  })

  describe('edge cases', () => {
    it('should handle multiple start/stop cycles', async () => {
      await service.startTone()
      service.stopTone()
      await service.startTone()
      service.stopTone()

      expect(service.isPlaying).toBe(false)
    })
  })

  describe('observer pattern', () => {
    it('should call callback on state changes', async () => {
      const mockCallback = vi.fn()
      const serviceWithCallback = new WebAudioService(mockCallback)

      await serviceWithCallback.startTone()
      serviceWithCallback.stopTone()

      expect(mockCallback).toHaveBeenCalledTimes(2)
      expect(mockCallback).toHaveBeenNthCalledWith(1, true)
      expect(mockCallback).toHaveBeenNthCalledWith(2, false)
    })

    it('should not call callback when state unchanged', async () => {
      const mockCallback = vi.fn()
      const serviceWithCallback = new WebAudioService(mockCallback)

      await serviceWithCallback.startTone()
      mockCallback.mockClear()
      await serviceWithCallback.startTone() // No state change

      expect(mockCallback).not.toHaveBeenCalled()
      serviceWithCallback.stopTone()
    })
  })
})
