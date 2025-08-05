<template>
  <header class="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex-shrink-0">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Left side - Logo and title -->
      <router-link
        :to="{ name: 'home' }"
        class="flex items-center space-x-3 hover:opacity-80 transition-opacity"
      >
        <div class="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center shadow-md">
          <MusicalNoteIcon class="w-5 h-5 text-white" />
        </div>
        <h1 class="text-2xl font-bold text-gray-900">Audio Tools</h1>
      </router-link>

      <!-- Right side - Volume control -->
      <div class="flex items-center space-x-2">
        <span class="text-sm text-gray-600">master</span>
        <SpeakerWaveIcon class="w-5 h-5 text-gray-600" />
        <RangeSlider v-model="volume" :min="0" :max="1" :step="0.01" :minimal="true" class="w-32" />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { MusicalNoteIcon, SpeakerWaveIcon } from '@heroicons/vue/24/outline'
import RangeSlider from '@/components/RangeSlider.vue'
import { useAudioEngine } from '@/composables/useAudioEngine'

const { volume } = useAudioEngine()
</script>
