import { readFileSync, writeFileSync, existsSync } from 'fs'

if (!existsSync('.env')) {
  console.log('Crie o arquivo .env com: VITE_TMDB_TOKEN=seu_token_eyJ...')
  process.exit(1)
}

const content = readFileSync('.env', 'utf8')
const match = content.match(/^VITE_TMDB_TOKEN=(.*)$/m)

if (!match) {
  console.log('Adicione no .env: VITE_TMDB_TOKEN=seu_token')
  process.exit(1)
}

let token = match[1].trim().replace(/^["']|["']$/g, '')
const jwtIndex = token.indexOf('eyJ')

if (jwtIndex > 0) {
  token = token.slice(jwtIndex)
  writeFileSync('.env', `VITE_TMDB_TOKEN=${token}\n`, 'utf8')
  console.log('Corrigido: removida API Key colada antes do token JWT.')
} else if (!token.startsWith('eyJ')) {
  console.log('Use o API Read Access Token da TMDB (deve comecar com eyJ).')
  process.exit(1)
} else {
  console.log('Token .env ja esta no formato correto.')
}
