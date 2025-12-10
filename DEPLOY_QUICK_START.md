# ⚡ GitHub Pages Deployment - Quick Start

## ✅ Configuration Complete!

Your **semperis-movies** repository is configured for GitHub Pages deployment.

---

## 📋 What Was Done

| Item | Status | Details |
|------|--------|---------|
| `package.json` | ✅ | Added `homepage` & `deploy` script |
| `vite.config.ts` | ✅ | Added `base: '/semperis-movies/'` |
| GitHub Actions | ✅ | `.github/workflows/deploy.yml` created |

---

## 🚀 Next Steps (Do These Now!)

### 1️⃣ Enable GitHub Pages in Repository Settings
```
Settings → Pages → Source: gh-pages (root) → Save
```
📍 Go to: https://github.com/galbenshushan/semperis-movies/settings/pages

### 2️⃣ Push Your Changes
```bash
git add .
git commit -m "Configure GitHub Pages deployment"
git push origin main
```

### 3️⃣ Monitor Deployment
- 📊 View: https://github.com/galbenshushan/semperis-movies/actions
- ⏱️ Takes: 2-5 minutes

### 4️⃣ Visit Your Live Site
```
🌍 https://galbenshushan.github.io/semperis-movies/
```

---

## 📝 Code Snippets (Already Applied)

### package.json
```json
{
  "homepage": "https://galbenshushan.github.io/semperis-movies/",
  "scripts": {
    "deploy": "npm run build && gh-pages -d dist"
  }
}
```

### vite.config.ts
```typescript
export default defineConfig({
  base: '/semperis-movies/',
  plugins: [react()],
})
```

### .github/workflows/deploy.yml
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      - run: npm ci
      - run: npm run test -- --run
      - run: npm run build
      - uses: actions/deploy-pages@v3
```

---

## 🔗 Important URLs

| Purpose | URL |
|---------|-----|
| **Live Site** | https://galbenshushan.github.io/semperis-movies/ |
| **Repository** | https://github.com/galbenshushan/semperis-movies |
| **Actions Workflows** | https://github.com/galbenshushan/semperis-movies/actions |
| **Settings** | https://github.com/galbenshushan/semperis-movies/settings |
| **Pages Config** | https://github.com/galbenshushan/semperis-movies/settings/pages |

---

## 🆘 If Something Goes Wrong

**Blank page or 404?**
- ❌ Wrong: `base: 'semperis-movies'`
- ✅ Correct: `base: '/semperis-movies/'`

**Deployment fails?**
- Check Actions tab for error messages
- Ensure `gh-pages` branch exists
- Verify GitHub Pages settings point to `gh-pages` branch

**Assets not loading?**
- Clear browser cache: `Ctrl+Shift+Delete`
- Wait 2-3 minutes for cache refresh
- Check DevTools Console for 404 errors

---

## 📱 Update Your README (Optional)

Add this to show your live demo:

```markdown
## 🚀 Live Demo
[**View the project live →**](https://galbenshushan.github.io/semperis-movies/)
```

Or with a badge:

```markdown
[![Deploy to GitHub Pages](https://github.com/galbenshushan/semperis-movies/actions/workflows/deploy.yml/badge.svg)](https://galbenshushan.github.io/semperis-movies/)
```

---

## ✨ You're All Set!

Your project will automatically deploy every time you push to `main` 🎉
