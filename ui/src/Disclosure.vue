<script setup lang="ts">
import { ref, useTemplateRef, watch, reactive, onMounted } from 'vue'
import TriangleTitle from './TriangleTitle.vue'
const props = withDefaults(defineProps<{
  title: string,
  iconSize?: string,
  fill?: string,
  open?: boolean
}>(), {
  iconSize: '1.4em',
  fill: 'var(--main-color-fg)',
  open: false
})

const containerRef = useTemplateRef('container')
const containerStyle = reactive<{ [key: string]: string | number }>({})
const open = ref(props.open)


/**
 * synchronize container max-height with open status
 */
function syncContainerHeightWithOpenStatus(): void {
  if (containerRef.value) {
    if (open.value) {
      containerStyle.maxHeight = `${containerRef.value.scrollHeight}px`
    } else {
      containerStyle.maxHeight = 0
    } 
  }
}
onMounted(() => {
  syncContainerHeightWithOpenStatus()
})

watch(open, (newValue, oldValue) => {
  syncContainerHeightWithOpenStatus()
})


</script>
<template>
  <TriangleTitle 
    :title="props.title"
    :iconSize="props.iconSize"
    :fill="props.fill"
    v-model="open" />
  <div ref='container'
    class="accordion"
    :style="containerStyle">
    <slot></slot>
  </div>
</template>
<style scoped>

.accordion {
  overflow: hidden;
  transition: max-height 0.2s ease-out;
}

</style>
<!-- vi: se ts=2 sw=2 et: -->
