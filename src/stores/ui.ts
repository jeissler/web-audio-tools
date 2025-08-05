import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUIStore = defineStore('ui', () => {
  const volumeWarningDismissed = ref(false)

  function dismissVolumeWarning() {
    volumeWarningDismissed.value = true
  }

  return {
    volumeWarningDismissed,
    dismissVolumeWarning,
  }
})
