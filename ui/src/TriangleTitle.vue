<script setup lang="ts">

import { ref, watch }  from 'vue'
const props = withDefaults(defineProps<{
  title: string,
  iconSize?: string,
  fill?: string,
}>(), {
  iconSize: '1.4em',
  fill: 'var(--main-color-fg)'
})

const model = defineModel()

/**
 * create path classes
 */
function pathClasses(): string {
  return [model.value ? 'open' : 'close', 'disclosure'].join(' ')
}

/**
 * handle click container
 */
function handleClick(event: PointerEvent): void {
  const newValue = !model.value
  model.value = newValue
}
</script>
<template>
  <div
    class="title-container"   
    @click="handleClick">
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox="0 0 100 100"
      :width="props.iconSize"
      :height="props.iconSize"
     >
      <path :class="pathClasses()"
        :fill="props.fill" />
    </svg>
    <h2 class="title">{{props.title}}</h2>
  </div> 
</template>
<style scoped>
.title-container {

}

.title-container > *:first-child {
  margin-right: 1px;
}

.title {
  display: inline;
}

.title-container > *:last-child {
  margin-left: 1px;
}

.disclosure {
  transition: all 1s;
}


.close {
  d: path("M 50,50 l 0,45 l 45,-45 l -45,-45 z");
}

.open {
  d: path("M 5,50 l 45,45 l 45,-45 l -45,0 z");
}
</style>
<!-- vi: se ts=2 sw=2 et: -->
