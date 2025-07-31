<template>
  <PageLayout title="Noise Generator">
    <div class="space-y-6 text-gray-700">
      <p class="leading-relaxed">
        Generate different types of noise including white noise, pink noise, and brown noise. Useful
        for masking sounds, testing audio equipment, and creating ambient audio.
      </p>

      <div class="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-lg">
        <h3 class="font-semibold text-orange-900 mb-2">Coming Soon</h3>
        <p class="text-orange-800 leading-relaxed">
          This tool is currently under development. Check back soon for a fully functional noise
          generator!
        </p>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue'
</script>
