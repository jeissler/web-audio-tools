<template>
  <div>
    <p class="text-lg text-center text-gray-600 mb-8">
      Audio testing tools for equipment calibration, system analysis, and audio quality assessment.
      Generate precise tones, sweeps, and noise patterns to validate your equipment performance.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <router-link
        v-for="tool in audioTools"
        :key="tool.name"
        :to="{ name: tool.name }"
        class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300 block"
      >
        <div class="flex items-center space-x-4 mb-4">
          <div
            :class="`w-12 h-12 ${tool.theme.iconBg} rounded-lg flex items-center justify-center`"
          >
            <component :is="tool.theme.icon" class="w-6 h-6" />
          </div>
          <div>
            <h2 class="text-xl font-semibold text-gray-900">{{ tool.title }}</h2>
            <p class="text-gray-600">{{ tool.description }}</p>
          </div>
        </div>
        <div
          :class="`h-24 ${tool.theme.actionArea} border-2 border-dashed rounded-lg flex items-center justify-center`"
        >
          <p class="font-medium text-sm">{{ tool.actionText }}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  MusicalNoteIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'

const themes = {
  blue: {
    icon: MusicalNoteIcon,
    iconBg: 'bg-blue-100 text-blue-600',
    actionArea: 'bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200 text-blue-600',
  },
  green: {
    icon: ChartBarIcon,
    iconBg: 'bg-green-100 text-green-600',
    actionArea: 'bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-600',
  },
  orange: {
    icon: SignalIcon,
    iconBg: 'bg-orange-100 text-orange-600',
    actionArea: 'bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200 text-orange-600',
  },
  purple: {
    icon: ChartBarSquareIcon,
    iconBg: 'bg-purple-100 text-purple-600',
    actionArea: 'bg-gradient-to-r from-purple-50 to-violet-50 border-purple-200 text-purple-600',
  },
}

const audioTools = [
  {
    name: 'tone-generator',
    title: 'Tone Generator',
    description: 'Generate pure sine, square, and triangle waves',
    actionText: 'Generate precise audio tones',
    theme: themes.blue,
  },
  {
    name: 'sine-sweep',
    title: 'Sine Sweep Generator',
    description: 'Create frequency sweeps for testing and analysis',
    actionText: 'Create frequency sweeps',
    theme: themes.green,
  },
  {
    name: 'noise-generator',
    title: 'Noise Generator',
    description: 'Generate white, pink, and brown noise',
    actionText: 'Create various noise types',
    theme: themes.orange,
  },
  {
    name: 'stereo-tester',
    title: 'Right/Left Stereo Tester',
    description: 'Test stereo channel separation and balance',
    actionText: 'Test stereo channels',
    theme: themes.purple,
  },
]
</script>
