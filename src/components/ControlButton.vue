<template>
  <button
    @click="$emit('click')"
    :disabled="disabled"
    :class="[
      'font-bold rounded-lg transition px-6 py-3 flex items-center justify-center gap-2 cursor-pointer',
      $attrs.class ? '' : defaultClasses,
      disabled ? 'disabled:bg-gray-400 disabled:cursor-not-allowed' : '',
    ]"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
interface Props {
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  disabled: false,
})

defineEmits<{
  click: []
}>()

const defaultClasses = 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-50'
</script>
