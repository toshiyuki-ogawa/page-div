<script setup lang="ts">
  const props = withDefaults(defineProps<{
      width: string
      height: string
      fill?: string
    }>(), {
    width: '120px',
    height: '120px',
    fill: 'var(--main-color-fg)'
  })


</script>
<template>
  <svg xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 100 100"
    class="progress-box"
    :width="props.width"
    :height="props.height">
    <rect x="10%" y="40%" width="20%" height="20%" rx="2%" ry="2%"
      :fill="props.fill">
      <animate
        attributeName="width"
        values="0%; 20%; 20%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="0%; 20%; 20%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="rx"
        values="0%; 2%; 2%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="ry"
        values="0%; 2%; 2%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="x"
        values="20%; 10%; 10%; 20%"
        dur="2s"
        keyTimes="0; 0.25; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="50%; 40%; 40%; 50%"
        dur="2s"
        keyTimes="0; 0.25; 0.9; 1.0"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="40%" y="40%" width="20%" height="20%" rx="2%" ry="2%"
      :fill="props.fill">
      <animate
        attributeName="width"
        values="0%; 0%; 20%; 20%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.5; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="0%; 0%; 20%; 20%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.5; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="rx"
        values="0%; 0%; 2%; 2%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.5; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="ry"
        values="0%; 0%; 2%; 2%; 0%"
        dur="2s"
        keyTimes="0; 0.25; 0.5; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="x"
        values="50%; 50%; 40%; 40%; 50%"
        dur="2s"
        keyTimes="0; 0.25; 0.5; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="50%; 50%; 40%; 40%; 50%"
        dur="2s"
        keyTimes="0; 0.25; 0.5; 0.9; 1.0"
        repeatCount="indefinite"
      />
    </rect>

    <rect x="70%" y="40%" width="20%" height="20%" rx="2%" ry="2%"
      :fill="props.fill">
      <animate
        attributeName="width"
        values="0%; 0%; 20%; 20%; 0%"
        dur="2s"
        keyTimes="0; 0.5; 0.75; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="height"
        values="0%; 0%; 20%; 20%; 0%"
        dur="2s"
        keyTimes="0; 0.5; 0.75; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="rx"
        values="0%; 0%; 2%; 2%; 0%"
        dur="2s"
        keyTimes="0; 0.5; 0.75; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="ry"
        values="0%; 0%; 2%; 2%; 0%"
        dur="2s"
        keyTimes="0; 0.5; 0.75; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="x"
        values="80%; 80%; 70%; 70%; 80%"
        dur="2s"
        keyTimes="0; 0.5; 0.75; 0.9; 1.0"
        repeatCount="indefinite"
      />
      <animate
        attributeName="y"
        values="50%; 50%; 40%; 40%; 50%"
        dur="2s"
        keyTimes="0; 0.5; 0.75; 0.9; 1.0"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
</template>
<style scoped>


</style>
<!-- vi: se ts=2 sw=2 et: -->
