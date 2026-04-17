<script setup lang="ts">
import { ref, watch } from 'vue'
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
  <table>
    <thead>
      <tr>
        <th>{{ getDomainText('page-div', 'Postal Code') }} </th>
        <th>{{ getDomainText('page-div', 'Address') }} </th>
        <th>{{ getDomainText('page-div', 'Organization') }} </th>
        <th>{{ getDomainText('page-div', 'Role') }} </th>
        <th>{{ getDomainText('page-div', 'Name') }} </th>
      </tr> 
    </thead>
    <tbody>
      <tr v-for="(item) in model">
        <td>{{ item[0] ?? '' }} </td>
        <td>{{ item[1] ?? '' }} </td>
        <td>{{ item[2] ?? '' }} </td>
        <td>{{ item[3] ?? '' }} </td>
        <td>{{ item[4] ?? '' }} </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>

</style>
<!-- vi: se ts=2 sw=2 et: -->
