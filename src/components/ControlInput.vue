<template>
  <label class="block text-sm/6 font-medium text-gray-900 mb-2">
    {{ label }}
  </label>
  <input
    :type="type"
    :value="modelValue"
    :min="min"
    :max="max"
    :step="step"
    :disabled="disabled"
    class="w-full appearance-none rounded-md bg-white py-1.5 px-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-indigo-600 sm:text-sm/6 disabled:bg-gray-50 disabled:text-gray-500"
    @input="handleInput"
  />
</template>

<script setup lang="ts">
interface Props {
  modelValue: string | number
  label: string
  type?: string
  min?: string | number
  max?: string | number
  step?: string | number
  disabled?: boolean
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  min: 0,
  max: 100,
  step: 1,
  disabled: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: string | number]
}>()

function handleInput({ target }: Event) {
  const value = (target as HTMLInputElement).value
  const type = (target as HTMLInputElement).type

  emit('update:modelValue', type === 'number' ? parseFloat(value) || 0 : value)
}
</script>
