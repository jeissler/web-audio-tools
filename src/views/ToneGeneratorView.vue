<template>
  <PageLayout title="Tone Generator">
    <div class="space-y-6">
      <div>
        <label for="frequency" class="block text-sm/6 font-medium text-gray-900">
          Frequency: {{ frequency }} Hz
        </label>
        <RangeSlider
          v-model="frequency"
          :min="20"
          :max="2000"
          :step="1"
          :tooltips="true"
          class="mt-2"
        />
      </div>

      <div class="max-w-64">
        <ControlSelect v-model="waveType" label="Wave Type" :options="WAVE_TYPE_OPTIONS" />
      </div>

      <div class="flex gap-4 justify-center">
        <ControlButton
          class="bg-green-600 text-white hover:bg-green-700"
          :disabled="isPlaying"
          @click="start"
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
import { useAudioEngine } from '@/composables/useAudioEngine'
import { WAVE_TYPE_OPTIONS } from '@/stores/audio'

const { frequency, waveType, isPlaying, start, stop } = useAudioEngine()
</script>
