<template>
  <div class="h-screen bg-gray-50 flex flex-col overflow-hidden">
    <MainHeader />

    <div class="flex flex-1 overflow-hidden">
      <div class="bg-gray-900 shadow-lg flex-shrink-0 py-6 px-3">
        <MainNavigation />
      </div>

      <main class="flex-1 overflow-y-auto p-6">
        <div class="max-w-4xl mx-auto">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import MainHeader from '@/components/MainHeader.vue'
import MainNavigation from '@/components/MainNavigation.vue'
</script>
