// scripts/translate-en-to-es.js
import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'

const rootDir = path.resolve('src', 'i18n')
const enFile = path.join(rootDir, 'en', 'translation.json')
const esFile = path.join(rootDir, 'es', 'translation.json')

const main = async () => {
  const raw = fs.readFileSync(enFile, 'utf-8')
  const enJson = JSON.parse(raw)

  const response = await fetch('http://localhost:8000/translate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: enJson,
      target_lang: 'ES',
    }),
  })

  if (!response.ok) {
    console.error('❌ Failed to translate:', await response.text())
    process.exit(1)
  }

  const translated = await response.json()

  // Ensure target directory exists
  fs.mkdirSync(path.join(rootDir, 'es'), { recursive: true })
  fs.writeFileSync(esFile, JSON.stringify(translated, null, 2), 'utf-8')

  console.log('✅ Spanish translation written to', esFile)
}

main()
