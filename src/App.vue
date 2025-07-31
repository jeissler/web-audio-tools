<template>
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
    <!-- Full width header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4 shadow-sm flex-shrink-0">
      <div class="max-w-7xl mx-auto flex items-center space-x-3">
        <router-link
          :to="{ name: 'home' }"
          class="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <div class="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center shadow-md">
            <MusicalNoteIcon class="w-5 h-5 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Audio Tools</h1>
        </router-link>
      </div>
    </header>

    <!-- Main content area with sidebar -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Left sidebar -->
      <nav class="w-16 bg-gray-900 shadow-lg flex-shrink-0 py-6 px-3 flex flex-col">
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
          :to="{ name: 'tone-generator' }"
          class="w-10 h-10 flex items-center justify-center text-blue-400 hover:bg-blue-900/30 rounded-full transition-all duration-200 shadow-sm hover:shadow-md mb-2 flex-shrink-0"
          :class="{
            'bg-blue-900/30 shadow-md': $route.name === 'tone-generator',
          }"
        >
          <MusicalNoteIcon class="w-5 h-5" />
        </router-link>
        <router-link
          :to="{ name: 'sine-sweep' }"
          class="w-10 h-10 flex items-center justify-center text-green-400 hover:bg-green-900/30 rounded-full transition-all duration-200 shadow-sm hover:shadow-md mb-2 flex-shrink-0"
          :class="{
            'bg-green-900/30 shadow-md': $route.name === 'sine-sweep',
          }"
        >
          <ChartBarIcon class="w-5 h-5" />
        </router-link>
        <router-link
          :to="{ name: 'audio-analyzer' }"
          class="w-10 h-10 flex items-center justify-center text-purple-400 hover:bg-purple-900/30 rounded-full transition-all duration-200 shadow-sm hover:shadow-md mb-2 flex-shrink-0"
          :class="{
            'bg-purple-900/30 shadow-md': $route.name === 'audio-analyzer',
          }"
        >
          <ChartBarSquareIcon class="w-5 h-5" />
        </router-link>
        <router-link
          :to="{ name: 'noise-generator' }"
          class="w-10 h-10 flex items-center justify-center text-orange-400 hover:bg-orange-900/30 rounded-full transition-all duration-200 shadow-sm hover:shadow-md flex-shrink-0"
          :class="{
            'bg-orange-900/30 shadow-md': $route.name === 'noise-generator',
          }"
        >
          <SignalIcon class="w-5 h-5" />
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

      <!-- Main content area -->
      <main class="flex-1 overflow-y-auto p-6">
        <div class="max-w-4xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
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
</script>
