# 🚀 TechGear - Deployment Guide

## Quick Deployment to GitHub Pages

### Step 1: Initialize Git Repository (if not done)
```bash
cd DominDev-TechGear
git init
git add .
git commit -m "🎮 Initial commit: TechGear v1.0"
```

### Step 2: Create GitHub Repository
1. Go to https://github.com/new
2. Repository name: `DominDev-TechGear`
3. Public repository
4. Do NOT initialize with README (we already have one)
5. Click "Create repository"

### Step 3: Push to GitHub
```bash
git remote add origin https://github.com/YOUR_USERNAME/DominDev-TechGear.git
git branch -M main
git push -u origin main
```

### Step 4: Enable GitHub Pages
1. Go to repository Settings
2. Navigate to "Pages" (left sidebar)
3. Source: Deploy from a branch
4. Branch: `main`
5. Folder: `/ (root)`
6. Click "Save"

### Step 5: Access Your Site
Wait 1-2 minutes, then visit:
```
https://YOUR_USERNAME.github.io/DominDev-TechGear/
```

---

## Alternative: Netlify Deployment

### Via Netlify UI (Recommended)
1. Go to https://app.netlify.com/
2. Click "Add new site" → "Import an existing project"
3. Connect to GitHub → Select `DominDev-TechGear`
4. Build settings:
   - Build command: (leave empty)
   - Publish directory: `/`
5. Click "Deploy site"

### Via Netlify CLI
```bash
npm install -g netlify-cli
cd DominDev-TechGear
netlify deploy --prod
```

---

## Alternative: Vercel Deployment

```bash
npm install -g vercel
cd DominDev-TechGear
vercel
```

Follow the prompts. Your site will be live at:
```
https://domindev-techgear.vercel.app
```

---

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test cart functionality
- [ ] Test auth system (login/register)
- [ ] Check mobile responsiveness
- [ ] Verify images load (or replace Unsplash URLs with local)
- [ ] Test FAQ accordion
- [ ] Verify product filters
- [ ] Test search functionality
- [ ] Check console for errors
- [ ] Run Lighthouse audit (aim for 90+)

---

## Performance Optimization (Optional)

### 1. Minify CSS/JS
```bash
# Install terser for JS minification
npm install -g terser cssnano-cli

# Minify JavaScript
terser assets/js/main.js -o assets/js/main.min.js -c -m

# Minify CSS
cssnano assets/css/base.css assets/css/base.min.css
```

### 2. Optimize Images
```bash
npm install sharp --save-dev
node _scripts/optimize-images.js
```

### 3. Enable Caching (Netlify/Vercel)
Create `netlify.toml` or `vercel.json` with cache headers.

---

## Troubleshooting

### Issue: Images not loading
**Solution:** Product images use Unsplash URLs. Replace with local images:
1. Download images to `assets/img/products/`
2. Update URLs in `assets/js/products.js`

### Issue: 404 on GitHub Pages
**Solution:**
- Ensure `index.html` is in root directory
- Check GitHub Pages settings (should be `main` branch, root folder)
- Wait 2-3 minutes after enabling Pages

### Issue: JavaScript modules not working
**Solution:**
- Ensure server supports ES6 modules
- For GitHub Pages, modules work natively
- For local testing, use a proper server (not `file://`)

---

## Custom Domain Setup (Optional)

### GitHub Pages
1. Buy domain (e.g., techgear.dev)
2. Add `CNAME` file to root:
   ```
   techgear.dev
   ```
3. Configure DNS:
   - A records pointing to GitHub IPs
   - CNAME: `www` → `YOUR_USERNAME.github.io`
4. Enable HTTPS in GitHub Pages settings

### Netlify
1. Domain settings → Add custom domain
2. Follow DNS configuration steps
3. Netlify handles HTTPS automatically

---

## Monitoring & Analytics (Optional)

### Add Google Analytics
Insert before `</head>` in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Add Plausible Analytics (Privacy-friendly)
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

---

## Maintenance

### Updating Content
```bash
# Edit files locally
git add .
git commit -m "Update: product catalog"
git push origin main
```

GitHub Pages auto-deploys within 1-2 minutes.

### Adding Products
1. Edit `assets/js/products.js`
2. Add product images to `assets/img/products/`
3. Commit and push

---

## Next Steps

1. ✅ Deploy to GitHub Pages
2. 📧 Share link with friends/portfolio
3. 📊 Monitor with Google Analytics
4. 🎨 Customize content (products, colors, texts)
5. 🚀 Consider backend integration (Stripe, database)

---

**Need help?** Check [README.md](../README.md) or [raise an issue](https://github.com/domindev/DominDev-TechGear/issues)
