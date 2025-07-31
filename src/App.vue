<template>
  <div class="h-screen bg-gray-50 flex flex-col">
    <!-- Full width header -->
    <header class="bg-white border-b border-gray-200 px-6 py-4">
      <div class="max-w-7xl mx-auto flex items-center space-x-3">
        <router-link
          :to="{ name: 'home' }"
          class="flex items-center space-x-3 hover:opacity-80 transition-opacity"
        >
          <div class="w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center">
            <MusicalNoteIcon class="w-5 h-5 text-white" />
          </div>
          <h1 class="text-2xl font-bold text-gray-900">Audio Tools</h1>
        </router-link>
      </div>
    </header>

    <!-- Main content area with sidebar -->
    <div class="flex flex-1">
      <!-- Left sidebar -->
      <nav class="w-16 bg-gray-900 h-full py-6 px-3">
        <router-link
          :to="{ name: 'home' }"
          class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          :class="{ 'text-white bg-gray-800': $route.name === 'home' }"
        >
          <HomeIcon class="w-5 h-5" />
        </router-link>

        <router-link
          :to="{ name: 'about' }"
          class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          :class="{ 'text-white bg-gray-800': $route.name === 'about' }"
        >
          <InformationCircleIcon class="w-5 h-5" />
        </router-link>
      </nav>

      <!-- Main content area -->
      <main class="flex-1 p-6">
        <div class="max-w-4xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { MusicalNoteIcon, HomeIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>
