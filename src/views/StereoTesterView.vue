<template>
  <PageLayout title="Right/Left Stereo Tester">
    <template #description>
      Test stereo channel separation and balance. Verify that your audio system correctly reproduces
      left and right channels.
    </template>

    <div class="space-y-6">
      <!-- Global Controls -->
      <div class="space-y-4">
        <div class="max-w-64">
          <ControlSelect
            :model-value="waveType"
            label="Wave Type"
            :options="WAVE_TYPE_OPTIONS"
            @update:model-value="handleWaveTypeChange"
          />
        </div>

        <div>
          <label class="block text-sm/6 font-medium text-gray-900 mb-2">
            Frequency: {{ frequency }} Hz
          </label>
          <RangeSlider
            :model-value="frequency"
            :min="20"
            :max="2000"
            :step="1"
            :tooltips="true"
            class="mt-2"
            @update:model-value="handleFrequencyChange"
          />
        </div>

        <div>
          <label class="block text-sm/6 font-medium text-gray-900 mb-2">
            Stereo Pan: {{ panLabel }}
          </label>
          <RangeSlider
            v-model="pan"
            :min="-1"
            :max="1"
            :step="0.1"
            :tooltips="true"
            :connect="false"
            class="mt-2"
            @update:model-value="handlePanChange"
          />
        </div>
      </div>

      <!-- Pan Play/Stop -->
      <div class="flex gap-4 justify-center">
        <ControlButton
          class="bg-purple-600 text-white hover:bg-purple-700"
          :disabled="isAnyPlaying"
          @click="startPanTest"
        >
          <PlayIcon class="w-5 h-5" />
          Play at Pan Position
        </ControlButton>
        <ControlButton
          class="bg-red-600 text-white hover:bg-red-700"
          :disabled="!isPlaying"
          @click="stopPanTest"
        >
          <StopIcon class="w-5 h-5" />
          Stop
        </ControlButton>
      </div>

      <div class="grid grid-cols-2 gap-6 mt-12">
        <!-- Left Channel -->
        <div class="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-blue-900">Left Channel</h3>
            <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
          </div>

          <div class="space-y-4">
            <div class="flex gap-2">
              <ControlButton
                class="bg-blue-600 text-white hover:bg-blue-700 flex-1"
                :disabled="isLeftPlaying || isAnyPlaying"
                @click="startLeft"
              >
                <PlayIcon class="w-4 h-4" />
                Play Left
              </ControlButton>
              <ControlButton
                class="bg-red-600 text-white hover:bg-red-700 flex-1"
                :disabled="!isLeftPlaying"
                @click="stopLeft"
              >
                <StopIcon class="w-4 h-4" />
                Stop
              </ControlButton>
            </div>
          </div>
        </div>

        <!-- Right Channel -->
        <div class="bg-green-50 border border-green-200 rounded-lg p-6">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-green-900">Right Channel</h3>
            <div class="w-4 h-4 bg-green-500 rounded-full"></div>
          </div>

          <div class="space-y-4">
            <div class="flex gap-2">
              <ControlButton
                class="bg-green-600 text-white hover:bg-green-700 flex-1"
                :disabled="isRightPlaying || isAnyPlaying"
                @click="startRight"
              >
                <PlayIcon class="w-4 h-4" />
                Play Right
              </ControlButton>
              <ControlButton
                class="bg-red-600 text-white hover:bg-red-700 flex-1"
                :disabled="!isRightPlaying"
                @click="stopRight"
              >
                <StopIcon class="w-4 h-4" />
                Stop
              </ControlButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { PlayIcon, StopIcon } from '@heroicons/vue/24/solid'
import PageLayout from '@/layouts/PageLayout.vue'
import RangeSlider from '@/components/RangeSlider.vue'
import ControlButton from '@/components/ControlButton.vue'
import ControlSelect from '@/components/ControlSelect.vue'
import { useAudioEngine } from '@/composables/useAudioEngine'
import type { WaveType } from '@/services/WebAudioService'

const {
  frequency,
  pan,
  waveType,
  isPlaying,
  start,
  stop,
  setFrequency,
  setPan,
  setWaveType,
  WAVE_TYPE_OPTIONS,
} = useAudioEngine()

const isLeftPlaying = ref(false)
const isRightPlaying = ref(false)

const isAnyPlaying = computed(() => isPlaying.value || isLeftPlaying.value || isRightPlaying.value)

const panLabel = computed(() => {
  if (pan.value === -1) return 'Full Left'
  if (pan.value === 1) return 'Full Right'
  if (pan.value === 0) return 'Center'
  if (pan.value < 0) return `${Math.abs(pan.value * 100).toFixed(0)}% Left`
  return `${(pan.value * 100).toFixed(0)}% Right`
})

function handleFrequencyChange(value: number | [number, number]) {
  setFrequency(value as number)
}

function handlePanChange(value: number | [number, number]) {
  setPan(value as number)
}

function handleWaveTypeChange(value: string | number) {
  setWaveType(value as WaveType)
}

function startPanTest() {
  // Use current pan position and start playing
  start()
  isLeftPlaying.value = false
  isRightPlaying.value = false
}

function stopPanTest() {
  stop()
  isLeftPlaying.value = false
  isRightPlaying.value = false
}

function startLeft() {
  setPan(-1)
  start()
  isLeftPlaying.value = true
  isRightPlaying.value = false
}

function startRight() {
  setPan(1)
  start()
  isRightPlaying.value = true
  isLeftPlaying.value = false
}

function stopLeft() {
  stop()
  isLeftPlaying.value = false
}

function stopRight() {
  stop()
  isRightPlaying.value = false
}
</script>
