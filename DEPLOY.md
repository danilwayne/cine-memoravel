# Publicar no GitHub Pages

## Por que a tela fica branca?

Se o site mostra só o título **CineMemorável** e nada mais, o GitHub Pages está servindo o **código-fonte** (`src/main.tsx`), não a pasta **`dist`** gerada pelo build.

O navegador não executa TypeScript direto — é preciso publicar o resultado de `npm run build`.

---

## Opção A — Deploy automático (recomendado)

1. No GitHub: **Settings → Secrets → Actions** → crie `VITE_TMDB_TOKEN` com seu token TMDB (só a parte `eyJ...`).

2. **Settings → Pages → Source** → escolha **GitHub Actions**.

3. Envie o código para a branch `main` (com a pasta `.github/workflows/deploy.yml`).

4. Em **Actions**, aguarde o workflow **Deploy GitHub Pages** terminar em verde.

5. Abra: https://danilwayne.github.io/cine-memoravel/

---

## Opção B — Deploy manual

No terminal, na pasta do projeto:

```bash
npm install
npm run deploy
```

Isso faz o build e envia **somente a pasta `dist`** para a branch `gh-pages`.

Depois, no GitHub: **Settings → Pages → Source** → branch **`gh-pages`** → pasta **`/ (root)`**.

---

## Conferir se o deploy está certo

Abra o site, pressione **F12 → Network** e recarregue.

O `index.html` deve referenciar algo como:

```
/cine-memoravel/assets/index-xxxxx.js
```

**Errado** (código-fonte, não buildado):

```
/src/main.tsx
```

---

## Token TMDB no build

O arquivo `.env` local **não vai** para o GitHub. Para o site em produção carregar filmes:

- Use o secret `VITE_TMDB_TOKEN` no GitHub Actions, **ou**
- Rode `npm run build` localmente com `.env` preenchido antes de `npm run deploy`.
