import { App as VueApp, createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import App from './App.vue'

import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'
import useI18n from './composables/useI18n'

const app: VueApp = createApp(App)

const { restoreUser } = useAuthentication()
const { i18n, loadLanguage } = useI18n()

;(async function () {
  await restoreUser()

  app.use(i18n)
  loadLanguage('en')
  app.use(router)
  app.mount('#app')
})()
