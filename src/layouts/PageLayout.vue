<template>
  <div class="space-y-4">
    <VolumeWarning />
    <div
      class="bg-white rounded-lg shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <h2 class="text-xl font-semibold text-gray-900 mb-2">{{ title }}</h2>
      <p v-if="$slots.description" class="text-gray-600 mb-6">
        <slot name="description" />
      </p>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import VolumeWarning from '@/components/VolumeWarning.vue'

interface Props {
  title: string
}

defineProps<Props>()
</script>
