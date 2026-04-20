<script setup lang="ts">
import { getDomainText } from './i18n'
import { createPage } from './page-generator'
import type { LocationFontSize } from './page-generator'
import type { PostalSetting as PostalSettingProperties } from './postal-setting'
import { getPropertiesNames } from './postal-setting'
import { createPostalAddressCellDisplays } from './postal-address'
import { ref } from 'vue'
import { getPostalSettingDefault } from './postal-setting-default'

const model = defineModel<PostalSettingProperties>({
  type: Object,
  default: getPostalSettingDefault()
})

/**
 * handle to setup location font size
 */     
function handleToSetupLocSize(event: SubmitEvent) {
  const formElm = event.target as HTMLFormElement
  const newValue = {} as { [key: string]: number }
  getPropertiesNames().forEach(name => {
    const inputElm = formElm.elements.namedItem(name) as HTMLInputElement
    newValue[name] = parseInt(inputElm.value)
  })
  model.value = newValue as PostalSettingProperties
}

</script>
<template>
  <form @submit.prevent="handleToSetupLocSize">
    <div>
      <button>{{ getDomainText('page-div', 'Update') }}</button>
    </div>
    <table class="number-input-table">
     <thead>
        <tr>
          <th>
          </th>
          <th>
            {{ getDomainText('page-div', 'Loc X') }}
          </th>
          <th>
            {{ getDomainText('page-div', 'Loc Y') }}
          </th>
          <th>
            {{ getDomainText('page-div', 'Font size') }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>{{ getDomainText('page-div', 'Postal code') }}</th>
          <td><input
              class="number-input"
              type="number"
              :value="model.codeLocationX"
              name="codeLocationX" /></td>
          <td><input
              class="number-input"
              type="number"
              :value="model.codeLocationY"
              name="codeLocationY" /></td>
          <td><input
              class="number-input"
              type="number"
              :value="model.codeFontSize"
              name="codeFontSize" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Address') }}</th>
          <td><input
              class="number-input"
              type="number"
              :value="model.addressLocationX"
              name="addressLocationX" /></td>
          <td><input
              class="number-input"
              type="number"
              :value="model.addressLocationY"
              name="addressLocationY" /></td>
          <td><input
              class="number-input"
              type="number"
              :value="model.addressFontSize"
              name="addressFontSize" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Organization') }}</th>
          <td><input
              class="number-input"
              type="number"
              :value="model.organizationLocationX"
              name="organizationLocationX" /></td>
          <td><input
              class="number-input"
              type="number"
              :value="model.organizationLocationY"
              name="organizationLocationY" /></td>
          <td><input
              class="number-input"
              type="number"
              :value="model.organizationFontSize"
              name="organizationFontSize" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Role') }}</th>
          <td><input
              class="number-input"
              type="number"
              :value="model.roleLocationX"
              name="roleLocationX" /></td>
          <td><input
              class="number-input"
              type="number"
              :value="model.roleLocationY"
              name="roleLocationY" /></td>
          <td><input type="number"
              class="number-input"
              :value="model.roleFontSize"
              name="roleFontSize" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Name') }}</th>
          <td><input type="number"
              class="number-input"
              :value="model.nameLocationX"
              name="nameLocationX" /></td>
          <td><input type="number"
              class="number-input"
              :value="model.nameLocationY"
              name="nameLocationY" /></td>
          <td><input type="number"
              class="number-input"
              :value="model.nameFontSize"
              name="nameFontSize" /></td>
        </tr>
        <tr>
          <th>{{ getDomainText('page-div', 'Digest') }}</th>
          <td><input type="number"
              class="number-input"
              :value="model.digestLocationX"
              name="digestLocationX" /></td>
          <td><input type="number"
              class="number-input"
              :value="model.digestLocationY"
              name="digestLocationY" /></td>
          <td><input type="number"
              class="number-input"
              :value="model.digestFontSize"
              name="digestFontSize" /></td>
        </tr>
      </tbody>
    </table>
  </form>
</template>

<style scoped>

.number-input-table thead th {
  text-align: right;
}


.number-input-table tbody th {
  text-align: left;
}

.number-input {
  width: 80px;
  text-align: right;
}

</style>
<!-- vi: se ts=2 sw=2 et: -->
