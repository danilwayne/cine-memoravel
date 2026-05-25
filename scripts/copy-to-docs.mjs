import { cpSync, rmSync, existsSync } from 'fs'

if (!existsSync('dist/index.html')) {
  console.error('Erro: rode "npm run build" antes.')
  process.exit(1)
}

rmSync('docs', { recursive: true, force: true })
cpSync('dist', 'docs', { recursive: true })

console.log('Build copiado para a pasta docs/ — pronto para GitHub Pages.')
