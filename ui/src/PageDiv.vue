<script setup lang="ts">
import { getDomainText } from './i18n'
import { createPage } from './page-generator'
import { getPageGeneratorDefault } from './page-generator-default'
import { getPostalSettingDefault } from './postal-setting-default'
import { getDefaultAddressList } from './address'
import type { 
  LocationFontSize,
  PageGenerator as PageGeneratorProperties } from './page-generator'
import type {
  PostalSetting as PostalSettingProperites } from './postal-setting'
import { createPostalAddressCellDisplays } from './postal-address'
import { createCellTextDisplayFromAddresses } from './postal-cell-text-display'
import PageGeneratorSetting from './PageGeneratorSetting.vue'
import PostalSetting from './PostalSetting.vue'
import DisclosureAddress from './DisclosureAddress.vue'
import Disclosure from './Disclosure.vue'
import { getAppRoot } from './app-root'
import { ref, watch, onBeforeMount } from 'vue'
import { RouterLink } from 'vue-router'

const dataUrl = ref('')

const pageSetting = ref<PageGeneratorProperties>(getPageGeneratorDefault())
const postalSetting = ref<PostalSettingProperites>(getPostalSettingDefault())
const addresses = ref<string[][]>(getDefaultAddressList())
const rootPath = ref<string | null>(null)

/**
 * update dataUrl
 */
async function updateDataUrl(): Promise<void> {
  const pageSettingValue = pageSetting.value
  const postalSettingValue = postalSetting.value
  const addressesValue = addresses.value
  if (pageSettingValue && postalSettingValue && addressesValue) {
    const outUrl = await createPage(pageSettingValue, 
      createCellTextDisplayFromAddresses(postalSettingValue, addressesValue)) 
    dataUrl.value = outUrl ?? ''
  }
}

/**
 * start updateDataUrl proc
 */
function startUpdateDataUrl(): void {
  (async () => {
    await updateDataUrl()
  })()
}

/**
 * update window title
 */
function updateWindowTitle(): void {
  document.title = getDomainText('page-div', 'Divide Page')
}

/**
 * start load root
 */
function startLoadRoot(): void {
  (async () => {
    rootPath.value = await getAppRoot()
  })()
}

onBeforeMount(startUpdateDataUrl) 
onBeforeMount(updateWindowTitle)
onBeforeMount(startLoadRoot)

watch(addresses, (newValue) => {
  startUpdateDataUrl()
})

watch(postalSetting, (newValue) => {
  startUpdateDataUrl()
})

watch(pageSetting, (newValue)=> {
  startUpdateDataUrl()
})

const generatorSettingTitle = getDomainText('page-div', 'Division Setting')
const postalSettingTitle = getDomainText('page-div', 'Postal Setting')
const addressSettingTitle = getDomainText('page-div', 'Address Setting')
const downloadFileName = getDomainText('page-div', 'CardsInPage.pdf')
</script>
<template>
  <nav class="header" v-if="rootPath">
    <RouterLink class="contents" :to="`${rootPath}index.html`">
      {{ getDomainText('index', 'Go to About') }}
    </RouterLink>
  </nav>
  <div class="base">
    <div class="operation-container">
      <Disclosure :title="generatorSettingTitle">
        <PageGeneratorSetting v-model="pageSetting" />
      </Disclosure>
      <Disclosure :title="postalSettingTitle">
        <PostalSetting v-model="postalSetting" />
      </Disclosure>
      <DisclosureAddress :title="addressSettingTitle"
        v-model="addresses"/>
    </div>
    <div>
      <div v-if="dataUrl" class="download">
        <a
          class="download-link"
          :download="downloadFileName"
          :href="dataUrl" >
          {{ getDomainText('page-div', 'Download') }}
        </a>
      </div>
      <div v-if="dataUrl" class="preview-container">
       <embed 
          type="application/pdf"
          :src="dataUrl"
          class="preview"/>
      </div>
    </div>
  </div>
</template>
<style scoped>

.header {
  display: block flex;
  margin: 0.25em 0.5em;
  justify-content: end;
}

.base {
  display: block flex;
  width: 100%;
  flex-wrap: wrap;
}

.operation-container {
  margin-top: 0.5em;
  margin-left: 0.5em;
}

.preview-container {
  display: block flex; 
  justify-content: center;
  width: 620px;
}

.download {
  margin-top: 0.5em;
  margin-left: 0.5em;
}

.preview {
  width: 600px;
  height: calc(600px * 1.5); 
  display: block;
}


@media screen and (width < 380px) {
  .preview-container {
    width: 100%;
  }
  .preview {
    width: 360px;
    height: calc(360px * 1.5); 
  }
}

@media screen and (380px <= width < 400px) {
  .preview-container {
    width: 100%;
  }
  .preview {
    width: 380px;
    height: calc(380px * 1.5);
  }
}

@media screen and (400px <= width < 420px) {
  .preview-container {
    width: 100%;
  }
  .preview {
    width: 400px;
    height: calc(400px * 1.5);
  }
}
</style>
<!-- vi: se ts=2 sw=2 et: -->
