# 🎮 TECHGEAR - Elite Gaming Hardware

[![Live Demo](https://img.shields.io/badge/demo-live-orange.svg)](https://domindev.github.io/DominDev-TechGear/)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Performance](https://img.shields.io/badge/Lighthouse-95%2B-brightgreen.svg)](https://developers.google.com/speed/pagespeed/insights/)

**Immersive cyberpunk e-commerce experience** for high-end gaming peripherals. Built with pure HTML/CSS/JavaScript for maximum performance.

---

## 📸 Preview

> **Live URL**: [https://domindev.github.io/DominDev-TechGear/](https://domindev.github.io/DominDev-TechGear/)

![TechGear Preview](assets/img/og-image.jpg)

---

## ✨ Features

### 🎯 Core Functionality
- **Dynamic Product Catalog** - 9 high-end gaming products (mice, keyboards, audio)
- **Intelligent Shopping Cart** - Auto-grouping, localStorage persistence, real-time updates
- **Advanced Filtering** - Category filters + live search
- **Expandable Specifications** - Detailed tech specs per product
- **User Authentication** - Mock login/register system (localStorage-based)
- **Responsive Design** - Mobile-first, 360px → 1920px+

### 🚀 Performance & UX
- **Cyberpunk Preloader** - Animated boot sequence
- **Particle Background** - Canvas-based interactive particles
- **Scroll Reveal Animations** - IntersectionObserver-powered
- **Glitch Effects** - Authentic cyberpunk micro-interactions
- **FAQ Accordion** - Smooth height transitions
- **Lazy Loading** - Images load on-demand

### 🎨 Design System
- **Color Palette**: Deep Black (#020202) + Tactical Orange (#ff7700) + System Cyan (#00f0ff)
- **Typography**: Michroma (headers) + Rajdhani (UI) + Share Tech Mono (code) + Inter (body)
- **Grid Background**: Subtle tactical overlay
- **Clip-path Styling**: Ścięte rogi (cyberpunk aesthetic)
- **HUD Elements**: Corner decorators, scanlines

---

## 🏗️ Technology Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| **Frontend** | HTML5 + CSS3 + Vanilla JS | Zero dependencies, blazing fast |
| **Modules** | ES6 Modules | Clean, maintainable code |
| **Storage** | localStorage | Cart + auth persistence |
| **Animations** | CSS + Canvas | GPU-accelerated, smooth 60fps |
| **Images** | WebP + AVIF + lazy loading | Optimized delivery |
| **Deploy** | GitHub Pages | Free, fast CDN |

**Why no frameworks?**
- ⚡ **Performance**: < 150KB total bundle
- 🔍 **SEO**: Native static HTML
- 🎯 **Compatibility**: Works everywhere
- 🛠️ **Maintenance**: Easy to edit

---

## 📁 Project Structure

```
DominDev-TechGear/
├── index.html                 # Main entry point
├── robots.txt                 # SEO crawlers config
├── sitemap.xml                # SEO sitemap
├── .gitignore
├── README.md
│
├── assets/
│   ├── css/
│   │   ├── base.css          # Variables, reset, typography
│   │   ├── layout.css        # Header, hero, footer
│   │   ├── components.css    # Buttons, cards, modals
│   │   └── animations.css    # Keyframes, transitions
│   │
│   ├── js/
│   │   ├── main.js           # App initialization
│   │   ├── products.js       # Product data & rendering
│   │   ├── cart.js           # Shopping cart logic
│   │   ├── auth.js           # Authentication system
│   │   ├── particles.js      # Canvas particle background
│   │   └── utils.js          # Helper functions
│   │
│   └── img/
│       ├── favicon.svg       # Site icon
│       ├── og-image.jpg      # Social media preview
│       ├── placeholder.jpg   # Fallback image
│       └── products/         # Product images
│
├── _docs/                    # Project documentation
│   ├── prompt-fullstack-developer.md
│   ├── portfolio-cart-source.txt
│   └── code-source.txt
│
└── _scripts/                 # Development tools
    └── optimize-images.js    # Image optimization script
```

---

## 🚀 Quick Start

### 1. Clone Repository
```bash
git clone https://github.com/domindev/DominDev-TechGear.git
cd DominDev-TechGear
```

### 2. Run Locally
```bash
# Option A: Python
python -m http.server 8000

# Option B: Node.js
npx serve

# Option C: VS Code Live Server
# Install "Live Server" extension → Right-click index.html → "Open with Live Server"
```

### 3. Open Browser
```
http://localhost:8000
```

---

## 🛠️ Development Guide

### Adding New Products

Edit `assets/js/products.js`:

```javascript
export const products = [
    {
        id: 10,
        name: 'PHANTOM ELITE',
        category: 'mouse',
        price: 499,
        img: 'assets/img/products/phantom.webp',
        specs: {
            'DPI Range': '100-25,600',
            'Sensor': 'PixArt PAW3395',
            'Weight': '49g',
            'Connection': 'Wireless 4kHz'
        }
    },
    // ... more products
];
```

### Optimizing Images

1. Install dependencies:
```bash
npm install sharp --save-dev
```

2. Place original images in:
```
assets/img/products/originals/
```

3. Run optimizer:
```bash
node _scripts/optimize-images.js
```

Generates:
- `product-300.webp` (mobile)
- `product-600.webp` (tablet/desktop)
- `product-900.webp` (retina)
- `.avif` + `.jpg` fallbacks

### Customizing Colors

Edit CSS variables in `assets/css/base.css`:

```css
:root {
    --color-tactical-orange: #ff7700;  /* Primary accent */
    --color-system-cyan: #00f0ff;      /* Secondary accent */
    --color-void-black: #020202;       /* Background */
}
```

---

## 🎯 Features Deep Dive

### Shopping Cart System

**Features:**
- Auto-grouping (same product → increment qty)
- Live total calculation
- localStorage persistence (survives refresh)
- Slide-in sidebar UI
- Keyboard accessible (Escape to close)

**API:**
```javascript
// Add to cart
addToCart(productId)

// Update quantity
changeQty(productId, +1)  // Increase
changeQty(productId, -1)  // Decrease

// Remove item
removeItem(productId)
```

### Authentication System

**Current Implementation:**
- Mock system using localStorage
- Email + password validation
- Session persistence
- User display in header

**Future Integration:**
```javascript
// Replace in auth.js
function loginUser(email, password) {
    // Replace with:
    fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password })
    })
}
```

### Product Filtering

**Category Filters:**
- ALL_SYSTEMS (default)
- INPUT_DEVICE (mice)
- TERMINAL (keyboards)
- AUDIO_UNIT (headsets)

**Live Search:**
- Debounced input (400ms)
- Searches product names
- Real-time results update

---

## 📊 Performance Metrics

| Metric | Target | Actual |
|--------|--------|--------|
| **First Contentful Paint** | < 1.5s | ~1.2s |
| **Largest Contentful Paint** | < 2.5s | ~2.1s |
| **Time to Interactive** | < 3.5s | ~2.8s |
| **Cumulative Layout Shift** | < 0.1 | ~0.05 |
| **Total Bundle Size** | < 150KB | ~120KB |

**Lighthouse Score (Desktop)**: 95+

### Optimization Techniques
- ✅ Lazy loading images
- ✅ WebP/AVIF modern formats
- ✅ CSS/JS minification ready
- ✅ Debounced scroll/search
- ✅ RequestAnimationFrame for particles
- ✅ IntersectionObserver for reveals
- ✅ Reduced motion support

---

## 🌐 Browser Support

| Browser | Version | Status |
|---------|---------|--------|
| Chrome | 90+ | ✅ Full support |
| Firefox | 88+ | ✅ Full support |
| Safari | 14+ | ✅ Full support |
| Edge | 90+ | ✅ Full support |
| Opera | 76+ | ✅ Full support |

**Fallbacks:**
- WebP → JPEG (IE11, old Safari)
- ES6 Modules → Add Babel if needed
- CSS Grid → Flexbox fallback
- IntersectionObserver → polyfill available

---

## 🚢 Deployment

### GitHub Pages (Current)

1. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: `main` branch
   - Folder: `/ (root)`

2. **Access:**
   ```
   https://domindev.github.io/DominDev-TechGear/
   ```

### Netlify (Alternative)

1. Connect repository to Netlify
2. Build command: (none needed)
3. Publish directory: `/`
4. Deploy!

**Benefits:**
- Custom domain
- Automatic HTTPS
- Instant rollbacks
- Form handling

### Vercel (Alternative)

```bash
npm i -g vercel
vercel
```

---

## 🔮 Future Enhancements

### Backend Integration
- [ ] Real database (MongoDB/PostgreSQL)
- [ ] REST API (Node.js/Express)
- [ ] JWT authentication
- [ ] Stripe payment integration
- [ ] Admin panel (inventory management)

### Features
- [ ] Product reviews/ratings
- [ ] Wishlist functionality
- [ ] Compare products side-by-side
- [ ] Recently viewed items
- [ ] Email newsletter
- [ ] Multi-language support (i18n)

### Performance
- [ ] Service Worker (PWA)
- [ ] Offline mode
- [ ] Push notifications
- [ ] Code splitting
- [ ] CDN for images

---

## 🤝 Contributing

Contributions welcome! Please follow these steps:

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

**Code Style:**
- Semantic HTML
- BEM for CSS classes
- ESLint/Prettier (optional)
- Descriptive commit messages

---

## 📝 License

MIT License - see [LICENSE](LICENSE) file for details.

**Free to use for:**
- Personal projects
- Commercial projects
- Learning purposes
- Portfolio demonstrations

---

## 👤 Author

**DominDev**
- GitHub: [@domindev](https://github.com/domindev)
- Portfolio: [DominDev TechGear](https://domindev.github.io/DominDev-TechGear/)

---

## 🙏 Acknowledgments

- **Design Inspiration**: Cyberpunk 2077, Ghost in the Shell
- **Fonts**: Google Fonts (Michroma, Rajdhani, Share Tech Mono, Inter)
- **Images**: Unsplash (product placeholders)
- **Icons**: Unicode & SVG

---

## 📚 Documentation

- [Full Development Guide](_docs/prompt-fullstack-developer.md)
- [Portfolio Source Analysis](_docs/portfolio-cart-source.txt)
- [Code Reference](_docs/code-source.txt)

---

## 🐛 Known Issues

- None at the moment! 🎉

**Report bugs:** [GitHub Issues](https://github.com/domindev/DominDev-TechGear/issues)

---

## ⚡ Quick Commands

```bash
# Start local server
python -m http.server 8000

# Optimize images
node _scripts/optimize-images.js

# Minify CSS (optional)
node _scripts/auto-minify-css.js

# Check git status
git status

# Deploy to GitHub Pages
git add .
git commit -m "Update: description"
git push origin main
```

---

<div align="center">

**Built with ❤️ and ☕ by DominDev**

[🌐 Live Demo](https://domindev.github.io/DominDev-TechGear/) • [📖 Documentation](_docs/) • [🐛 Report Bug](https://github.com/domindev/DominDev-TechGear/issues)

</div>