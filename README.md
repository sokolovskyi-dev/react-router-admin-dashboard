# ⚡️ Vite React Template (2025)

A modern, production-ready Vite + React + SWC starter with strict code quality, clean architecture, and perfect developer experience.
Designed for real-world scalable applications using 2025 frontend standards.

## 🚀 Features

- ⚡ Vite + SWC — ultra-fast dev & build
- 🧩 React 19 — modern runtime
- 🧹 ESLint 9 (Flat Config) — React, Hooks, Import, A11y, Prettier
- 🎨 Prettier 3 — automatic formatting
- 🪝 Husky 9 + lint-staged — auto-fix before commit
- 🔍 Strict import validation (alias resolver, no-unresolved)
- 🧭 Alias @ → src (Vite + VS Code + ESLint)
- 🌗 Modern CSS architecture (design tokens, resets, layout system)
- 📱 Mobile-first viewport + safe-area insets
- 🛑 vite-plugin-checker → ESLint overlay in browser
- 🐢 Guaranteed Node 20+ compatibility

## 📦 Getting Started

### ✅ The fastest and cleanest way to start:

1. Open the repository:
   https://github.com/sokolovskyi-dev/vite-react-template

2. Click the green button:
   🖱️👉 **“Use this template → Create a new repository”**

3. Choose a name (e.g. my-app)

4. Clone your new repository:

```bash
git clone https://github.com/YOUR_USERNAME/my-app
cd my-app
npm install
npm run dev
```

This creates a fresh project without git history, fully ready for development.
Husky pre-commit hooks are automatically enabled after `npm install`.

🔧💡 After creating a new project from this template, update your package.json metadata:

```json
"homepage": "https://your_username.github.io/your_repo_name/",
"repository": {
  "type": "git",
  "url": "https://github.com/your_username/your_repo_name.git"
},
"bugs": {
  "url": "https://github.com/your_username/your_repo_name/issues"
}
```

### ✅ The second way to start — Fast CLI Setup:

```bash
npx degit sokolovskyi-dev/vite-react-template my-app
cd my-app
npm install
npm run dev
```

Initialize a fresh Git repository (because degit does NOT include .git):

```bash
git init
git add .
git commit -m "init"
```

Optionally connect to your own GitHub repo:

```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

🔧💡 After creating a new project from this template, update your package.json metadata

## 🧩 Scripts

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint \"src/**/*.{js,jsx}\"",
  "format": "prettier --write \"src/**/*.{js,jsx,css,json,md}\"",
  "prepare": "husky"
}
```

❗ Updated for Husky 9 (no deprecated husky install).

## 🪝 Pre-Commit Code Quality (Husky 9)

lint-staged automatically:

- 🧹 Runs ESLint fix
- 🎨 Applies Prettier formatting
- ⛔ Blocks commit if code is broken
  Config:

```json
"lint-staged": {
  "src/**/*.{js,jsx}": [
    "eslint --fix",
    "prettier --write"
  ]
}
```

Hook location:

```bash
.husky/pre-commit
```

Contents:

```bash
npx lint-staged
```

## 🎨 CSS Architecture

This template includes a modern, modular, scalable CSS foundation inspired by:

- Vercel design system
- Radix UI primitives
- Tailwind Core principles
- Large-scale React apps

🗂 Structure (src/styles)
| File | Purpose |
| ------------------ | ------------------------------------------------------------- |
| **variables.css** | Design tokens: colors, spacing, radiuses, fonts, animations |
| **base.css** | Global resets, typography, dark mode, safe-area |
| **layout.css** | Container system, responsive spacing, sections |
| **components.css** | Buttons, inputs, form controls, focus-visible styles |
| **utils.css** | Helper classes: visually-hidden, flex-center, no-scroll, etc. |

🎨 CSS entry point (index.css):

```css
@import 'modern-normalize/modern-normalize.css';
@import './variables.css';
@import './base.css';
@import './layout.css';
@import './components.css';
@import './utils.css';
```

## 🧭 Path Aliases (@ → src)

Import like this:

```js
import Button from '@/components/Button';
import useUser from '@/hooks/useUser';
```

Configured in:

```
vite.config.js
jsconfig.json
eslint.config.js
```

## 💡 Recommended VS Code Extensions

.vscode/extensions.json:

```json
{
  "recommendations": [
    "dbaeumer.vscode-eslint",
    "esbenp.prettier-vscode",
    "streetsidesoftware.code-spell-checker",
    "bradlc.vscode-tailwindcss"
  ]
}
```

## 🔧 Upgrade to TypeScript (optional)

Install TS:

```bash
npm i -D typescript @types/react @types/react-dom
npx tsc --init
```

Rename files:

```
main.jsx → main.tsx
App.jsx → App.tsx
*.jsx → *.tsx
```

Install resolver:

```bash
npm i -D eslint-import-resolver-typescript
```

Update eslint.config.js:

```js
"import/resolver": {
  alias: {
    map: [["@", "./src"]],
    extensions: [".js", ".jsx", ".ts", ".tsx"]
  },
  typescript: {}
}
```

## 🚀 Deployment

## 🚀 Deployment

This template supports any hosting platform (root domain or subfolder) using a single configuration via VITE_BASE.

By default, the app is deployed to the root (/).
If your hosting platform serves the app from a subdirectory, you only need to set VITE_BASE.

#### 🔺 Vercel (recommended)

No configuration required.

- Build:

```bash
npm run build
```

- Output 🗂: dist/
  Deploy by:
- Drag & drop dist → https://vercel.com
- or connect GitHub repo

#### 🌐 Netlify

No configuration required.

Deploy by dragging dist/ into the Netlify dashboard
or by connecting a GitHub repository.

#### 🖥 VPS / Render / Railway / Docker / Custom Nginx

If deployed on the root domain:

```env
VITE_BASE=/
```

If deployed in a subfolder (e.g. /app/):

```env
VITE_BASE=/app/
```

Build:

```bash
npm run build
```

Serve the dist/ directory with your web server.

#### 🐙 GitHub Pages

GitHub Pages serves apps from a repository subpath , not from /, so VITE_BASE must be set.

Example:

```cpp
https://USERNAME.github.io/REPO_NAME/

```

This template supports GitHub Pages by setting VITE_BASE during the build step in GitHub Actions.

✅ 1. Enable GitHub Pages

- Go to: **Settings → Pages → Build and deployment**

- Set: **Source: GitHub Actions**

- (Do NOT use gh-pages branch — this template deploys using Actions only.)

✅ 2. Add the workflow file

Create file:

```bash
.github/workflows/deploy.yml

```

Paste:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm

      - run: npm ci
      - run: npm run lint

      - name: Build project
        run: npm run build
        env:
          # ✅ Auto-detect repo name → correct base path for GitHub Pages
          VITE_BASE: /${{ github.event.repository.name }}/

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest

    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}

    steps:
      - uses: actions/deploy-pages@v4
        id: deployment
```

✅ 3. Push to main

- Commit and push:

```bash
git add .
git commit -m "Enable GitHub Pages deployment"
git push origin main
```

✅🌐 5. Live URL

Your app will be available at:

```cpp
https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/
```

🎉 Done!

You now have automatic, zero-maintenance CI/CD deployment

## 🧭 React Router (Base Path Support)

When an app is deployed to a subdirectory (for example, GitHub Pages), React Router must use the same base path as Vite.

This template automatically synchronizes routing with the build base using:

```js
import.meta.env.BASE_URL;
```

✅ Required configuration

Choose the setup that matches your router type.

🔹 Data Router (createBrowserRouter)

File: where the router is created (e.g. src/router/router.js)

```js
import { createBrowserRouter } from 'react-router-dom';

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.BASE_URL,
});
```

🔹 Classic Router (<BrowserRouter>)

File: App.jsx or main.jsx

```js
import { BrowserRouter } from 'react-router-dom';

export function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      {/* routes */}
    </BrowserRouter>
  );
}



🔍 Why this is required

Vite builds the app using base from vite.config.js

import.meta.env.BASE_URL always matches that value

React Router must use the same base to generate correct URLs

This ensures routing works correctly:

in local development

on root-domain hosting (Vercel, Netlify)

on subdirectory hosting (GitHub Pages)



## 📄 License

MIT © 2025 Serhii Sokolovskyi

You may freely use, modify and distribute this template.

## ⭐ Support the project

If this template helped you:

- ⭐ Star the repo
- 🍴 Fork it
- 🧑‍💻 Follow the author
- 🐙 https://github.com/sokolovskyi-dev

## 🎉 Happy Coding!

Build fast, clean, modern React apps — with zero setup.
```
