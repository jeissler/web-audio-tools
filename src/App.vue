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
      <div class="bg-gray-900 shadow-lg flex-shrink-0 py-6 px-3">
        <MainNavigation />
      </div>

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
import { MusicalNoteIcon } from '@heroicons/vue/24/outline'
import MainNavigation from '@/components/MainNavigation.vue'
</script>
