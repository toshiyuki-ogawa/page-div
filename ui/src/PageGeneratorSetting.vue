<script setup lang="ts">
import { getDomainText } from './i18n'
import { createPage } from './page-generator'
import type { PageGenerator as PageGeneratorProperties } from './page-generator'
import { getPageGeneratorNames } from './page-generator'
import { createPostalAddressCellDisplays } from './postal-address'
import { ref } from 'vue'
import { getPageGeneratorDefault } from './page-generator-default'

const model = defineModel<PageGeneratorProperties>({
  type: Object,
  default: getPageGeneratorDefault()
})


/**
 * get true if the name indicate integer field.
 */
function isIntField(name: string): boolean {
  return 'gridLineWidth' != name
}

function handleToSetupMargin(event: SubmitEvent) {
  const formElm = event.target as HTMLFormElement
  const inputsNames = getPageGeneratorNames()
  const newSetting = {} as { [name: string]: number }
  getPageGeneratorNames().forEach(name => {
    const inputElem = formElm.elements.namedItem(name) as HTMLInputElement
    newSetting[name] = isIntField(name) 
      ? parseInt(inputElem.value) : parseFloat(inputElem.value)
  })
  model.value = newSetting as PageGeneratorProperties
}

</script>
<template>
  <form @submit.prevent="handleToSetupMargin">
    <div>
      <button>{{ getDomainText('page-div', 'Update') }}</button>
    </div>
    <table>
      <tbody>
        <tr>
          <th>{{ getDomainText('page-div', 'Margin top') }}</th>
          <td><input type="number"
            :value="model.topMargin" name="topMargin" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Margin bottom') }}</th>
          <td><input type="number"
            :value="model.bottomMargin" name="bottomMargin" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Margin left') }}</th>
          <td><input type="number"
            :value="model.leftMargin" name="leftMargin" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Margin right') }}</th>
          <td><input type="number"
            :value="model.rightMargin" name="rightMargin" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Gap Columns') }}</th>
          <td><input type="number"
            :value="model.columnGap" name="columnGap" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Gap Rows') }}</th>
          <td><input type="number"
            :value="model.rowGap" name="rowGap" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Count of Rows') }}</th>
          <td><input type="number"
            :value="model.rowsCount" name="rowsCount" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Count of Columns') }}</th>
          <td><input type="number"
            :value="model.columnsCount" name="columnsCount" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Grid line width') }}</th>
          <td><input type="number"
            :value="model.gridLineWidth"
            name="gridLineWidth"
            step="0.001" /></td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<style scoped>

</style>
<!-- vi: se ts=2 sw=2 et: -->
