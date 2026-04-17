import { createApp } from 'vue'
import App from './App.vue'
import { loadI18nSetting } from './i18n'

(async () => {
  await loadI18nSetting()
  createApp(App).mount('#app')
})()
// vi: se ts=2 sw=2 et:
