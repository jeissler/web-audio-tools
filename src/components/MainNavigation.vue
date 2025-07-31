<template>
  <nav class="flex flex-col h-full">
    <!-- Home icon -->
    <router-link
      :to="{ name: 'home' }"
      class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
      :class="{ 'text-white bg-gray-800 shadow-md': $route.name === 'home' }"
    >
      <HomeIcon class="w-5 h-5" />
    </router-link>

    <!-- Divider -->
    <div class="border-t border-gray-700 my-4 flex-shrink-0"></div>

    <!-- Section icons -->
    <router-link
      v-for="item in navigationItems"
      :key="item.name"
      :to="{ name: item.name }"
      class="w-10 h-10 flex items-center justify-center rounded-full transition-all duration-200 shadow-sm hover:shadow-md mb-2 flex-shrink-0 group relative"
      :class="[item.colorClass, item.hoverClass, { [item.activeClass]: $route.name === item.name }]"
      :title="item.title"
    >
      <component :is="item.icon" class="w-5 h-5" />
      <span
        class="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10"
      >
        {{ item.title }}
      </span>
    </router-link>

    <!-- About icon at bottom -->
    <router-link
      :to="{ name: 'about' }"
      class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-full transition-all duration-200 shadow-sm hover:shadow-md mt-auto flex-shrink-0"
      :class="{ 'text-white bg-gray-800 shadow-md': $route.name === 'about' }"
    >
      <InformationCircleIcon class="w-5 h-5" />
    </router-link>
  </nav>
</template>

<script setup lang="ts">
import {
  MusicalNoteIcon,
  HomeIcon,
  InformationCircleIcon,
  ChartBarIcon,
  ChartBarSquareIcon,
  SignalIcon,
} from '@heroicons/vue/24/outline'

const navigationItems = [
  {
    name: 'tone-generator',
    title: 'Tone Generator',
    icon: MusicalNoteIcon,
    colorClass: 'text-blue-400',
    hoverClass: 'hover:bg-blue-900/30',
    activeClass: 'bg-blue-900/30 shadow-md',
  },
  {
    name: 'sine-sweep',
    title: 'Sine Sweep',
    icon: ChartBarIcon,
    colorClass: 'text-green-400',
    hoverClass: 'hover:bg-green-900/30',
    activeClass: 'bg-green-900/30 shadow-md',
  },
  {
    name: 'audio-analyzer',
    title: 'Audio Analyzer',
    icon: ChartBarSquareIcon,
    colorClass: 'text-purple-400',
    hoverClass: 'hover:bg-purple-900/30',
    activeClass: 'bg-purple-900/30 shadow-md',
  },
  {
    name: 'noise-generator',
    title: 'Noise Generator',
    icon: SignalIcon,
    colorClass: 'text-orange-400',
    hoverClass: 'hover:bg-orange-900/30',
    activeClass: 'bg-orange-900/30 shadow-md',
  },
]
</script>
