import fs, { promises } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = path.join(process.cwd(), 'src/utils/token.json')
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  'src/utils/mct-birds-translations.json',
)
const SPREADSHEET_ID = '1XtHJVf7jJGY-im3M6Au8gW-A_J32BW5pAsEo8VLucpg'
const AVAILABLE_LOCALES = ['en', 'nl', 'zh'] // 'en' is the default

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await promises.readFile(TOKEN_PATH)
    const credentials = JSON.parse(content)
    return google.auth.fromJSON(credentials)
  } catch (err) {
    return null
  }
}

/**
 * Serializes credentials to a file comptible with GoogleAUth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client) {
  const content = await promises.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await promises.writeFile(TOKEN_PATH, payload)
}

/**
 * Load or request or authorization to call APIs.
 *
 */
async function authorize() {
  let client = await loadSavedCredentialsIfExist()
  if (client) {
    return client
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  })
  if (client.credentials) {
    await saveCredentials(client)
  }
  return client
}

function generateTranslationFiles(auth) {
  const service = google.sheets({ version: 'v4', auth })

  const promises = AVAILABLE_LOCALES.map(async (locale) => {
    const result = await service.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${locale}`,
    })

    if (result.data.values) {
      const keys = result.data.values
      keys.shift() // Also remove the first row (the header)

      const translations = {}

      for (const key of keys) {
        translations[key[0]] = key[2] // key[1] is the default english value
      }

      fs.writeFile(
        `./src/locales/${locale}.json`,
        JSON.stringify({ locale: locale, translations }),
        (err) => {
          if (err) throw err
          console.info(`./src/locales/${locale}.json generated`)
        },
      )
    }
  })

  Promise.all(promises)
}

authorize().then(generateTranslationFiles).catch(console.error)
