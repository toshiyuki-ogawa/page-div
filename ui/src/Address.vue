<script setup lang="ts">
import { ref, watch, onBeforeMount, onUnmounted } from 'vue'
import { getDomainText } from './i18n'
import { getDefaultAddressList } from './address'
import Papa from 'papaparse'

const model = defineModel<string[][]>({
  type: Array,
  default: getDefaultAddressList()
})
const windowWidth = ref(window.innerWidth)

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

/**
 * handle window resized event
 */
function handleWindowResized(event: Event): void {
  windowWidth.value = window.innerWidth;
}

function setupWindowListener(): void {
  window.addEventListener('resize', handleWindowResized)
}

onBeforeMount(setupWindowListener) 

onUnmounted(() => {
  window.removeEventListener('resize', handleWindowResized)
})

const tableWidth = 100 + 340 + 180 + 120 + 180 + 180

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
  <div v-if="windowWidth < tableWidth"
    class="address-list-container" >
    <dl v-for="(item) in model" class="address-list">
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
  </div>
  <table v-else class="address-table">
    <thead>
      <tr>
        <th>{{ getDomainText('page-div', 'Postal Code') }} </th>
        <th>{{ getDomainText('page-div', 'Address') }} </th>
        <th>{{ getDomainText('page-div', 'Organization') }} </th>
        <th>{{ getDomainText('page-div', 'Role') }} </th>
        <th>{{ getDomainText('page-div', 'Name') }} </th>
        <th>{{ getDomainText('page-div', 'Digest') }} </th>
      </tr> 
    </thead>
    <tbody>
      <tr v-for="(item) in model">
        <td>{{ item[0] ?? '' }} </td>
        <td>{{ item[1] ?? '' }} </td>
        <td>{{ item[2] ?? '' }} </td>
        <td>{{ item[3] ?? '' }} </td>
        <td>{{ item[4] ?? '' }} </td>
        <td>{{ item[5] ?? '' }} </td>
      </tr>
    </tbody>
  </table>
</template>
<style scoped>

.address-list {
  margin-top: 0.5em;
}

.address-list-container {
  max-height: 400px;
  overflow-y: scroll;
}

.address-table tbody {
  max-height: 400px;
  overflow-y: scroll;
}
.address-table th {
  text-align: left;
}

.address-table thead,
.address-table tbody {
  display: block;
}

.address-table td:nth-child(1),
.address-table th:nth-child(1) {
  width: 100px;
}

.address-table td:nth-child(2),
.address-table th:nth-child(2)
{
  width: 340px;
} 

.address-table td:nth-child(3),
.address-table th:nth-child(3)
{
  width: 180px;
}

.address-table td:nth-child(4),
.address-table th:nth-child(4)
{
  width: 120px;
}

.address-table td:nth-child(5),
.address-table th:nth-child(5) {
  width: 180px;
}

.address-table td:nth-child(6),
.address-table th:nth-child(6) {
  width: 180px;
}

</style>
<!-- vi: se ts=2 sw=2 et: -->
