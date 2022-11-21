import { App as VueApp, createApp } from 'vue'

import '@unocss/reset/tailwind.css'
import 'uno.css'

import App from './App.vue'
import router from './bootstrap/router'
import useAuthentication from './composables/useAuthentication'
import usei18n from './composables/usei18n'
import useCustomUser from './composables/useCustomUser'

// COMPOSABLES
const { user, restoreUser } = useAuthentication()
const { customUser, loadCustomUser } = useCustomUser()
const { i18n, loadLocale } = usei18n()

// APP INSTANCE
const app: VueApp = createApp(App)

// I18N
loadLocale()
app.use(i18n) // ZO VROEG MOGELIJK!

// RESTORE USER
;(async function () {
  await restoreUser()
  if (user.value) await loadCustomUser(user.value.uid)

  app.use(router)

  app.mount('#app')
})()
