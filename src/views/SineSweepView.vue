<template>
  <PageLayout title="Sine Sweep Generator">
    <div class="space-y-6">
      <div>
        <label for="frequencyRange" class="block text-sm/6 font-medium text-gray-900">
          Frequency Range: {{ frequencyRange[0] }} - {{ frequencyRange[1] }} Hz
        </label>
        <RangeSlider
          v-model="frequencyRange"
          :min="20"
          :max="2000"
          :step="1"
          :tooltips="true"
          :is-range="true"
          class="mt-2"
        />
      </div>

      <div class="grid grid-cols-2 gap-4">
        <div class="max-w-64">
          <ControlSelect
            :model-value="waveType"
            label="Wave Type"
            :options="WAVE_TYPE_OPTIONS"
            @update:model-value="handleWaveTypeChange"
          />
        </div>

        <div class="max-w-64">
          <ControlInput
            v-model="duration"
            label="Duration (seconds)"
            type="number"
            :min="0.1"
            :max="60"
            :step="0.1"
          />
        </div>
      </div>

      <div class="flex gap-4 justify-center mt-10">
        <ControlButton
          class="bg-green-600 text-white hover:bg-green-700"
          :disabled="isPlaying"
          @click="handleStart"
        >
          <PlayIcon class="w-5 h-5" />
          Play
        </ControlButton>
        <ControlButton
          class="bg-red-600 text-white hover:bg-red-700"
          :disabled="!isPlaying"
          @click="stop"
        >
          <StopIcon class="w-5 h-5" />
          Stop
        </ControlButton>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { PlayIcon, StopIcon } from '@heroicons/vue/24/solid'
import PageLayout from '@/layouts/PageLayout.vue'
import RangeSlider from '@/components/RangeSlider.vue'
import ControlButton from '@/components/ControlButton.vue'
import ControlSelect from '@/components/ControlSelect.vue'
import ControlInput from '@/components/ControlInput.vue'
import { useAudioEngine } from '@/composables/useAudioEngine'
import type { WaveType } from '@/services/WebAudioService'

const {
  waveType,
  isPlaying,
  startSweep,
  stop,
  duration,
  setWaveType,
  WAVE_TYPE_OPTIONS,
  frequencyRange,
} = useAudioEngine()

function handleWaveTypeChange(value: string | number) {
  setWaveType(value as WaveType)
}

function handleStart() {
  startSweep()
}
</script>
