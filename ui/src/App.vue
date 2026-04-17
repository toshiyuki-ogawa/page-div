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
import { ref, watch, onBeforeMount } from 'vue'

const dataUrl = ref('')

const pageSetting = ref<PageGeneratorProperties>(getPageGeneratorDefault())
const postalSetting = ref<PostalSettingProperites>(getPostalSettingDefault())
const addresses = ref<string[][]>(getDefaultAddressList())

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

onBeforeMount(startUpdateDataUrl) 

watch(addresses, (newValue) => {
  startUpdateDataUrl()
})

watch(postalSetting, (newValue) => {
  startUpdateDataUrl()
})

watch(pageSetting, (newValue)=> {
  startUpdateDataUrl()
})


</script>
<template>
  <Disclosure :title="getDomainText('page-div', 'Generator Setting')">
    <PageGeneratorSetting v-model="pageSetting" />
  </Disclosure>
  <Disclosure :title="getDomainText('page-div', 'Postal Setting')">
    <PostalSetting v-model="postalSetting" />
  </Disclosure>
  <DisclosureAddress :title="getDomainText('page-div', 'Address Setting')"
    v-model="addresses"/>

  <embed 
    type="application/pdf"
    v-if="dataUrl"
    :src="dataUrl"
    class="preview"/>
</template>
<style scoped>

.preview {
  width: 600px;
  height: 800px;
}

</style>
<!-- vi: se ts=2 sw=2 et: -->
