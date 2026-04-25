<script setup lang="ts">
import { Suspense } from 'vue'
import { RouterView } from 'vue-router'
import Progress from './Progress.vue'

</script>
<template>
  <Suspense>
    <RouterView />
    <template #fallback>
      <div class="fallback">
        <Progress width="120px" height="120px"/>
      </div>
    </template>
  </Suspense>
</template>
<!-- vi: se ts=2 sw=2 et: -->
