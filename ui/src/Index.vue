
<script setup lang="ts">
import { marked } from 'marked'
import { getDocumentText } from './docs'
import { getDomainText } from './i18n'
import { getAppRoot } from './app-root'
import { RouterLink } from 'vue-router'
const index1Md = await getDocumentText('index-1.md')
const index2Md = await getDocumentText('index-2.md')

const index1 = index1Md ? marked.parse(index1Md) : null
const index2 = index2Md ? marked.parse(index2Md) : null
const root = await getAppRoot()
</script>
<template>

  <div class="contents" v-if="index1" v-html="index1" />
  <RouterLink class="contents" :to="`${root}page-div.html`">
    {{ getDomainText('index', 'Go to Page Division') }}
  </RouterLink>
  <div class="contents" v-if="index2" v-html="index2" />
</template>
<style scoped>

.contents {
  margin: 1em;
}

.fallback {
  display: block flex;
  justify-content: center;
}

</style>

<!-- vi: se ts=2 sw=2 et: -->
