<script setup lang="ts">
import { ref, watch, onBeforeMount, onUnmounted } from 'vue'
import { getDomainText } from './i18n'
import { getDefaultAddressList } from './address'
import Papa from 'papaparse'

const model = defineModel<string[][]>({
  type: Array,
  default: getDefaultAddressList()
})

/**
 * handle submit event
 */
function handleSubmit(event: SubmitEvent) {
  const formElm = event.target as HTMLFormElement
  const inputFile = formElm.elements.namedItem('source')! as HTMLInputElement
  if (inputFile.files!.length) {
    const file = inputFile.files![0]! as File
    Papa.parse<string[], File>(file, {
      skipEmptyLines: true,
      complete: (results, files) => {
        if (results.data.length) {
          model.value = results.data
        }
      }
    })
  }
}


</script>
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <button>{{ getDomainText('page-div', 'Update') }}</button>
    </div>
    <div>
      <label>{{ getDomainText('page-div', 'Address files') }}
        <input name="source" type="file" accept="text/csv" />
      </label>
    </div>
  </form>
  <div class="address-list-container" >
    <ol>
      <li v-for="(item) in model">
        <dl class="address-list">
          <dt>{{ getDomainText('page-div', 'Postal Code') }} </dt>
          <dd>{{ item[0] ?? '' }} </dd>
          <dt>{{ getDomainText('page-div', 'Address') }} </dt>
          <dd>{{ item[1] ?? '' }} </dd>
          <dt>{{ getDomainText('page-div', 'Organization') }} </dt>
          <dd>{{ item[2] ?? '' }} </dd>
          <dt>{{ getDomainText('page-div', 'Role') }} </dt>
          <dd>{{ item[3] ?? '' }} </dd>
          <dt>{{ getDomainText('page-div', 'Name') }} </dt>
          <dd>{{ item[4] ?? '' }} </dd>
          <dt>{{ getDomainText('page-div', 'Digest') }} </dt>
          <dd>{{ item[5] ?? '' }} </dd>
        </dl>
      </li>
    </ol>
  </div>
</template>
<style scoped>

.address-list {
}

.address-list-container {
  max-height: 400px;
  overflow-y: scroll;
}
</style>
<!-- vi: se ts=2 sw=2 et: -->
