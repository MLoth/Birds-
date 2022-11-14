import { createI18n } from 'vue-i18n'

export const AVAILABLE_LOCALES: string[] = ['en', 'nl', 'zh']
const DEFAULT_LOCALE = 'zh'

const i18n = createI18n({
  locale: DEFAULT_LOCALE,
  fallbackLocale: 'en',
})

const loadLocale = async (locale: string = DEFAULT_LOCALE) => {
  if (!AVAILABLE_LOCALES.includes(locale)) return

  i18n.global.locale = locale
  i18n.global.setLocaleMessage(
    locale,
    await import(`../locales/${locale}.json`).then((m) => m.default[locale]),
  )
}

export default () => {
  return {
    AVAILABLE_LOCALES,
    i18n,
    t: i18n.global.t,

    loadLocale,
  }
}
