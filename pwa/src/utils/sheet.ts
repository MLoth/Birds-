// @ts-nocheck
// This is originally a JS-file. Also, it's only used by our developers.

import fs, { promises as fsPromises } from 'fs'
import path from 'path'
import process from 'process'
import { authenticate } from '@google-cloud/local-auth'
import { google } from 'googleapis'
import { AVAILABLE_LOCALES } from '../composables/usei18n'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly']
const TOKEN_PATH = path.join(process.cwd(), '/src/utils/token.json')
const CREDENTIALS_PATH = path.join(
  process.cwd(),
  '/src/utils/mct-birds-translations.json',
)

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist() {
  try {
    const content = await fsPromises.readFile(TOKEN_PATH)
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
  const content = await fsPromises.readFile(CREDENTIALS_PATH)
  const keys = JSON.parse(content)
  const key = keys.installed || keys.web
  const payload = JSON.stringify({
    type: 'authorized_user',
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  })
  await fsPromises.writeFile(TOKEN_PATH, payload)
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

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
async function generateMessagesForLocales(auth) {
  const sheets = google.sheets({ version: 'v4', auth })

  AVAILABLE_LOCALES.map(async (locale) => {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: '1XtHJVf7jJGY-im3M6Au8gW-A_J32BW5pAsEo8VLucpg',
      range: locale,
    })
    const rows = res.data.values

    if (!rows || rows.length === 0) return

    rows!.shift()

    const translations = { [locale]: {} }
    for (const row of rows) {
      // @ts-ignore
      translations[locale][row[0]] = row[2]
    }

    await fsPromises.writeFile(
      path.join(process.cwd(), `/src/locales/${locale}.json`),
      JSON.stringify(translations),
    )
  })

  // en => { messages }
  // nl => { messages }
  // zh => { messages }
}

authorize().then(generateMessagesForLocales).catch(console.error)
