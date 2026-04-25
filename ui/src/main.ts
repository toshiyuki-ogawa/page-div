import { createApp } from 'vue'
import App from './App.vue'
import { loadI18nSetting } from './i18n'
import { initRouter } from './routes'


(async () => {
  await loadI18nSetting()
  const router = await initRouter()
  createApp(App).use(router).mount('#app')
})()
// vi: se ts=2 sw=2 et:
