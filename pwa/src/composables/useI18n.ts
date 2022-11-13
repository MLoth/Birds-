import { createI18n } from 'vue-i18n'

const AVAILABLE_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'nl', label: 'Dutch' },
  { code: 'zh', label: 'Chinese' },
]

const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  availableLocales: AVAILABLE_LANGUAGES.map((l) => l.code),
})

const loadLanguage = async (lang: string) => {
  if (!AVAILABLE_LANGUAGES.map((l) => l.code).includes(lang)) {
    return
  }

  // set i18n instance locale
  i18n.global.locale = lang as any
  i18n.global.setLocaleMessage(
    lang,
    await import(`../locales/${lang}.json`).then((m) => m.default.translations),
  )
}

export default () => {
  return {
    AVAILABLE_LANGUAGES,
    i18n,
    t: i18n.global.t,

    loadLanguage,
  }
}
