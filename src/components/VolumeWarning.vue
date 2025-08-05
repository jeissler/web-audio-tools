<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 -translate-y-2"
    enter-to-class="opacity-100 translate-y-0"
    leave-active-class="transition-all duration-200 ease-in"
    leave-from-class="opacity-100 translate-y-0"
    leave-to-class="opacity-0 -translate-y-2"
  >
    <div v-if="isVisible" class="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
      <div class="flex items-start gap-3">
        <div class="flex-shrink-0">
          <ExclamationTriangleIcon class="w-6 h-6 text-amber-600" />
        </div>
        <div class="flex-1">
          <h3 class="text-lg font-semibold text-amber-800">Volume Warning!</h3>
          <p class="text-sm text-amber-700 mt-1">
            Please turn down your volume before playing audio to avoid sudden loud sounds.
          </p>
        </div>
        <button
          @click="hide"
          class="flex-shrink-0 p-1 rounded-full hover:bg-amber-100 transition-colors"
        >
          <XMarkIcon class="w-5 h-5 text-amber-600" />
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ExclamationTriangleIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import { useUIStore } from '@/stores/ui'

const uiStore = useUIStore()

const isVisible = computed(() => !uiStore.volumeWarningDismissed)

function hide() {
  uiStore.dismissVolumeWarning()
}
</script>
