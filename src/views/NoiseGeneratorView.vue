<template>
  <PageLayout title="Noise Generator">
    <div class="space-y-6 text-gray-700">
      <p class="leading-relaxed">
        Generate different types of noise including white noise, pink noise, and brown noise. Useful
        for masking sounds, testing audio equipment, and creating ambient audio.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button
          v-for="noiseType in noiseTypes"
          :key="noiseType.value"
          @click="selectNoiseType(noiseType.value)"
          :class="[
            'relative p-6 rounded-xl border-2 transition-all duration-200 text-left flex flex-col items-start cursor-pointer',
            selectedNoiseType === noiseType.value
              ? 'border-blue-500 bg-blue-50 shadow-lg'
              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md',
          ]"
        >
          <h3 class="font-bold text-lg text-gray-900 mb-2">{{ noiseType.label }}</h3>
          <p class="text-sm text-gray-600">{{ noiseType.description }}</p>
        </button>
      </div>

      <div class="flex justify-center pt-4">
        <ControlButton
          @click="togglePlay"
          :class="[
            'px-8 py-4 text-lg font-semibold',
            isPlaying
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white',
          ]"
        >
          <span v-if="isPlaying">Stop Noise</span>
          <span v-else>Play {{ selectedNoiseLabel }}</span>
        </ControlButton>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue'
import ControlButton from '@/components/ControlButton.vue'
import { useAudioEngine } from '@/composables/useAudioEngine'
import { NOISE_TYPE_OPTIONS, DEFAULT_NOISE_TYPE } from '@/constants/audio'
import type { NoiseType } from '@/services/modules'
import { ref, computed } from 'vue'

const { isPlaying, startNoise, stopNoise, setNoiseType } = useAudioEngine()
const selectedNoiseType = ref<NoiseType>(DEFAULT_NOISE_TYPE)

const noiseTypeDescriptions = {
  white: 'Equal power across all frequencies',
  pink: 'Equal power per octave',
  brown: 'Equal power per octave, decreasing with frequency',
}

const noiseTypes = NOISE_TYPE_OPTIONS.map((option) => ({
  value: option.value,
  label: `${option.label} Noise`,
  description: noiseTypeDescriptions[option.value],
}))

const selectedNoiseLabel = computed(() => {
  const noiseType = noiseTypes.find((nt) => nt.value === selectedNoiseType.value)
  return noiseType?.label || 'Noise'
})

function selectNoiseType(type: NoiseType) {
  selectedNoiseType.value = type
  setNoiseType(type)
}

async function togglePlay() {
  if (isPlaying.value) {
    stopNoise()
  } else {
    await startNoise(selectedNoiseType.value)
  }
}
</script>
