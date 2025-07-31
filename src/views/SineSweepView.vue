<template>
  <PageLayout title="Sine Sweep">
    <div class="space-y-6 text-gray-700">
      <p class="leading-relaxed">
        Create frequency sweeps from low to high frequencies. Useful for analyzing room acoustics,
        testing speaker response, and identifying resonant frequencies in audio systems.
      </p>

      <div class="bg-green-50 border-l-4 border-green-400 p-4 rounded-r-lg">
        <h3 class="font-semibold text-green-900 mb-2">Coming Soon</h3>
        <p class="text-green-800 leading-relaxed">
          This tool is currently under development. Check back soon for a fully functional sine
          sweep generator!
        </p>
      </div>
    </div>
  </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue'
</script>
