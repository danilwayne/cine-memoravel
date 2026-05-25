# Publicar no GitHub Pages — passo a passo

## Por que a tela fica branca?

O site em produção ainda está com o **código-fonte** (erro no Console ao carregar `/src/main.tsx`).

O GitHub Pages precisa receber a pasta **`docs`** (site já buildado), não os arquivos `src/`.

---

## Solução rápida (recomendada)

### 1. Gerar a pasta `docs` no seu PC

No terminal, na pasta do projeto:

```bash
npm install
npm run build:pages
```

Isso cria/atualiza a pasta **`docs`** com o site pronto.

### 2. Enviar para o GitHub

Suba **todo o projeto** para o repositório `danilwayne/cine-memoravel`, incluindo a pasta **`docs`**.

(Pelo GitHub Desktop, VS Code, ou site do GitHub — upload da pasta `docs`.)

### 3. Configurar o GitHub Pages

No repositório no GitHub:

1. **Settings** → **Pages**
2. **Source:** Deploy from a branch
3. **Branch:** `main` (ou `master`)
4. **Pasta:** `/docs`  ← importante!
5. Salvar e aguardar 1–2 minutos

### 4. Testar

Abra: https://danilwayne.github.io/cine-memoravel/

Pressione **Ctrl+Shift+R** (recarregar sem cache).

No Console (F12), o erro de `/src/main.tsx` deve sumir.

---

## Como conferir se está certo

Clique com botão direito na página → **Ver código-fonte**.

Deve aparecer:

```html
<script src="/cine-memoravel/assets/index-xxxxx.js">
```

**Não** deve aparecer:

```html
<script src="/src/main.tsx">
```

---

## Token TMDB (filmes carregarem)

Antes de `npm run build:pages`, confira o `.env` na raiz:

```env
VITE_TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9...
```

(Só o token que começa com `eyJ`, sem colar a API Key junto.)

O token entra no build — sem ele o site abre, mas os filmes não carregam.

---

## Outra opção: `npm run deploy`

Envia a pasta `dist` para a branch `gh-pages`.

Depois em **Pages** → branch **`gh-pages`** → pasta **`/ (root)`**.
