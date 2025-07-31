<template>
  <div ref="sliderRef"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'
import noUiSlider, { type Options, type API } from 'nouislider'
import { commonClasses, minimalClasses, fancyClasses } from './RangeSliderStyles'

interface Props {
  modelValue?: number | [number, number]
  min?: number
  max?: number
  step?: number
  isRange?: boolean
  tooltips?: boolean
  minimal?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  min: 0,
  max: 100,
  step: 1,
  isRange: false,
  tooltips: false,
  minimal: false,
})

const emit = defineEmits<{
  'update:modelValue': [value: number | [number, number]]
}>()

const sliderRef = ref<HTMLElement>()
const slider = ref<API | null>(null)

function initializeSlider() {
  if (!sliderRef.value) return

  const config: Options = {
    start: props.isRange ? [props.min, props.max] : [props.min],
    connect: props.isRange ? true : 'lower',
    range: { min: props.min, max: props.max },
    step: props.step,
    animate: false,
    cssPrefix: '',
    cssClasses: {
      ...commonClasses,
      ...(props.minimal ? minimalClasses : fancyClasses),
    },
    ...(props.tooltips && { tooltips: true }),
    ...(props.isRange && { margin: 100 }),
  }

  slider.value = noUiSlider.create(sliderRef.value, config)

  function handleSliderEvent(values: (number | string)[]) {
    const numericValues = values.map((v) => (typeof v === 'string' ? parseFloat(v) : v))
    const emitValue = props.isRange
      ? ([numericValues[0], numericValues[1]] as [number, number])
      : numericValues[0]
    emit('update:modelValue', emitValue)
  }

  function handleTooltipVisibility(show: boolean) {
    if (!props.tooltips) return
    const tooltips = slider.value?.getTooltips()
    tooltips?.forEach((tooltip) => {
      if (!tooltip) return

      const visibleClasses = ['opacity-100', 'pointer-events-auto']
      const hiddenClasses = ['opacity-0', 'pointer-events-none']
      const allClasses = [...visibleClasses, ...hiddenClasses]

      tooltip.classList.remove(...allClasses)
      tooltip.classList.add(...(show ? visibleClasses : hiddenClasses))
    })
  }

  slider.value.on('change', (values) => {
    handleSliderEvent(values)
    handleTooltipVisibility(false)
  })
  slider.value.on('slide', (values) => {
    handleSliderEvent(values)
    handleTooltipVisibility(true)
  })
}

onMounted(() => {
  initializeSlider()
})

onUnmounted(() => {
  if (slider.value) {
    slider.value.destroy()
  }
})

watch(
  () => props.modelValue,
  (newValue) => {
    if (slider.value && newValue !== undefined) {
      const value = Array.isArray(newValue) ? newValue : [newValue]
      slider.value.set(value)
    }
  },
)
</script>
