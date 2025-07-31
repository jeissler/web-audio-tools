<template>
  <div class="min-h-screen bg-gray-50 grid grid-cols-[auto_1fr]">
    <!-- Full width header -->
    <header class="col-span-2 bg-white border-b border-gray-200 px-6 py-4">
      <div class="max-w-7xl mx-auto">
        <h1 class="text-2xl font-bold text-gray-900">Audio Tools</h1>
      </div>
    </header>

    <!-- Skinny left sidebar with icons only -->
    <nav class="w-16 bg-gray-900 min-h-screen flex flex-col items-center py-6">
      <!-- Audio icon as main nav item -->
      <div class="mb-8">
        <div class="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <MusicalNoteIcon class="w-6 h-6 text-white" />
        </div>
      </div>

      <!-- Navigation icons -->
      <div class="flex flex-col space-y-4">
        <router-link
          to="/"
          class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          active-class="text-white bg-gray-800"
        >
          <HomeIcon class="w-5 h-5" />
        </router-link>

        <router-link
          to="/about"
          class="w-10 h-10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
          active-class="text-white bg-gray-800"
        >
          <InformationCircleIcon class="w-5 h-5" />
        </router-link>
      </div>
    </nav>

    <!-- Main content area -->
    <main class="p-6">
      <div class="max-w-4xl mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { MusicalNoteIcon, HomeIcon, InformationCircleIcon } from '@heroicons/vue/24/outline'
</script>
