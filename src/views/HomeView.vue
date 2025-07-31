<template>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
    <!-- Tone Generator Card -->
    <router-link
      :to="{ name: 'tone-generator' }"
      class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 block"
    >
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
          <MusicalNoteIcon class="w-6 h-6 text-blue-600" />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Tone Generator</h2>
          <p class="text-gray-600">Generate pure sine, square, and triangle waves</p>
        </div>
      </div>
      <div
        class="h-24 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-dashed border-blue-200 rounded-lg flex items-center justify-center"
      >
        <p class="text-blue-600 font-medium text-sm">Generate precise audio tones</p>
      </div>
    </router-link>

    <!-- Sine Sweep Generator Card -->
    <router-link
      :to="{ name: 'sine-sweep' }"
      class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 block"
    >
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
          <ChartBarIcon class="w-6 h-6 text-green-600" />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Sine Sweep Generator</h2>
          <p class="text-gray-600">Create frequency sweeps for testing and analysis</p>
        </div>
      </div>
      <div
        class="h-24 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-dashed border-green-200 rounded-lg flex items-center justify-center"
      >
        <p class="text-green-600 font-medium text-sm">Create frequency sweeps</p>
      </div>
    </router-link>

    <!-- Audio Analyzer Card -->
    <router-link
      :to="{ name: 'audio-analyzer' }"
      class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 block"
    >
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
          <ChartBarSquareIcon class="w-6 h-6 text-purple-600" />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Audio Analyzer</h2>
          <p class="text-gray-600">Real-time spectrum and waveform analysis</p>
        </div>
      </div>
      <div
        class="h-24 bg-gradient-to-r from-purple-50 to-violet-50 border-2 border-dashed border-purple-200 rounded-lg flex items-center justify-center"
      >
        <p class="text-purple-600 font-medium text-sm">Analyze audio in real-time</p>
      </div>
    </router-link>

    <!-- Noise Generator Card -->
    <router-link
      :to="{ name: 'noise-generator' }"
      class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 block"
    >
      <div class="flex items-center space-x-4 mb-4">
        <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
          <SignalIcon class="w-6 h-6 text-orange-600" />
        </div>
        <div>
          <h2 class="text-xl font-semibold text-gray-900">Noise Generator</h2>
          <p class="text-gray-600">Generate white, pink, and brown noise</p>
        </div>
      </div>
      <div
        class="h-24 bg-gradient-to-r from-orange-50 to-amber-50 border-2 border-dashed border-orange-200 rounded-lg flex items-center justify-center"
      >
        <p class="text-orange-600 font-medium text-sm">Create various noise types</p>
      </div>
    </router-link>
  </div>
</template>

<script setup lang="ts">
import {
  MusicalNoteIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'
</script>
