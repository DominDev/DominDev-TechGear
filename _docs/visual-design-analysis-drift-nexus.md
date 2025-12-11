# 🎨 ANALIZA WIZUALNA - DRIFT NEXUS (Mockup Source)
**Data:** 2025-12-10
**Projekt:** TechGear - Visual Redesign
**Źródło:** mockup-source-01.png do mockup-source-06.png

---

## 📋 SPIS TREŚCI

1. [Identyfikacja Brand & Projekt](#identyfikacja-brand--projekt)
2. [Paleta Kolorów](#paleta-kolorów)
3. [Typografia](#typografia)
4. [Komponenty UI](#komponenty-ui)
5. [Layout & Kompozycja](#layout--kompozycja)
6. [Efekty Wizualne](#efekty-wizualne)
7. [Animacje & Interakcje](#animacje--interakcje)
8. [Atmosfera & Mood](#atmosfera--mood)

---

## 🎯 IDENTYFIKACJA BRAND & PROJEKT

### Nazwa Projektu
**DRIFT NEXUS**

### Kategoria
Gaming / Metaverse / NFT Avatars / Web3 Gaming Platform

### Charakter Wizualny
- **Styl:** Cyberpunk / Futurystyczny / Sci-Fi
- **Vibe:** Premium, High-Tech, Immersive, "Ready for the Metaverse"
- **Target:** Gaming enthusiasts, Crypto/NFT community, Metaverse early adopters

---

## 🎨 PALETA KOLORÓW

### Kolory Główne (Primary)

#### Cyan/Teal (Główny Akcent)
```css
--color-cyan-primary: #00F0FF;        /* Bright Cyan - główny akcent */
--color-cyan-medium: #00D4E5;         /* Medium Cyan */
--color-cyan-dark: #00A8B8;           /* Dark Cyan - ciemniejszy odcień */
--color-teal-deep: #006B7D;           /* Deep Teal - tło, głębia */
```

**Użycie:**
- Ramki ozdobne (corner brackets)
- Highlight na przyciskach i hover states
- Akcentowanie nagłówków sekcji
- Glow effects
- Linie łączące w UI
- Podświetlenie krawędzi kart

#### Yellow/Gold (Sekundary Accent)
```css
--color-yellow-bright: #FFD700;       /* Bright Gold */
--color-yellow-warm: #FFC107;         /* Warm Yellow */
--color-orange-accent: #FF9500;       /* Orange-Yellow */
```

**Użycie:**
- Corner brackets (żółte naroża L-kształtne)
- Glow na 3D obiektach (kostka, geometria)
- Akcenty na elementach interaktywnych
- Podświetlenie krawędzi w UI

### Kolory Tła (Backgrounds)

#### Deep Dark (Główne Tło)
```css
--color-bg-void: #000000;             /* Pure Black - sekcje */
--color-bg-dark: #0A0A0F;             /* Very Dark Blue-Black */
--color-bg-space: #0D1117;            /* Deep Space Blue-Black */
--color-bg-panel: #151923;            /* Dark Panel Background */
```

#### Mid-Tone Backgrounds
```css
--color-bg-teal-dark: #0D2A35;        /* Dark Teal Background */
--color-bg-blue-dark: #0F1B2E;        /* Dark Blue Background */
```

### Kolory Tekstu

```css
--color-text-primary: #FFFFFF;        /* Pure White - nagłówki */
--color-text-secondary: #E0E0E0;      /* Light Gray - body text */
--color-text-dim: #A0A0A0;            /* Dim Gray - secondary info */
--color-text-code: #00F0FF;           /* Cyan - tech codes */
```

### Kolory Gradientów

```css
/* Hero Background Gradient */
background: radial-gradient(
    circle at center,
    rgba(0, 240, 255, 0.15) 0%,
    rgba(0, 107, 125, 0.3) 40%,
    rgba(0, 0, 0, 1) 80%
);

/* Button Hover Gradient */
background: linear-gradient(
    135deg,
    rgba(0, 240, 255, 0.2) 0%,
    rgba(255, 215, 0, 0.1) 100%
);

/* Card Border Gradient */
border-image: linear-gradient(
    45deg,
    #00F0FF 0%,
    #FFD700 50%,
    #00F0FF 100%
) 1;
```

---

## ✍️ TYPOGRAFIA

### Czcionki Główne

#### Logo & Display (DRIFT NEXUS)
- **Font:** Futurystyczna sans-serif, prawdopodobnie custom lub:
  - **Alternatywy:** Orbitron, Exo 2, Rajdhani (Bold/ExtraBold), Teko
- **Charakterystyka:**
  - Szeroka (wide/expanded)
  - Geometryczna
  - Bold/Black weight
  - Uppercase
  - Spacing: bardzo szerokie letter-spacing
  - Wysokość: duża x-height

**Przykładowe CSS:**
```css
.brand-title {
    font-family: 'Orbitron', 'Rajdhani', sans-serif;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    font-size: clamp(4rem, 10vw, 8rem);
}
```

#### Nagłówki Sekcji (H1, H2)
- **Font:** Bold sans-serif z kondensowaną wersją
- **Alternatywy:** Bebas Neue, Teko, Oswald, Rajdhani
- **Charakterystyka:**
  - Condensed lub semi-condensed
  - Bold/ExtraBold
  - Uppercase
  - Tight letter-spacing

**Przykładowe CSS:**
```css
.section-title {
    font-family: 'Bebas Neue', 'Teko', sans-serif;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: clamp(2.5rem, 5vw, 4rem);
}
```

#### Body Text & Descriptions
- **Font:** Clean sans-serif
- **Alternatywy:** Inter, Roboto, 'Open Sans', System-UI
- **Charakterystyka:**
  - Regular/Medium weight
  - Normal letter-spacing
  - Line-height: 1.6-1.8

**Przykładowe CSS:**
```css
.body-text {
    font-family: 'Inter', 'Roboto', sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.7;
    letter-spacing: 0.01em;
}
```

#### Tech Codes & Labels
- **Font:** Monospace
- **Alternatywy:** 'Share Tech Mono', 'Courier New', 'Roboto Mono'
- **Charakterystyka:**
  - Monospace
  - Small size (0.8-0.9rem)
  - Uppercase
  - Cyan color (#00F0FF)

**Przykładowe CSS:**
```css
.tech-label {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #00F0FF;
}
```

### Hierarchia Wielkości

```css
/* Scale System */
--font-size-display: clamp(5rem, 12vw, 10rem);    /* NEXUS */
--font-size-h1: clamp(3rem, 8vw, 6rem);           /* Hero titles */
--font-size-h2: clamp(2rem, 5vw, 3.5rem);         /* Section titles */
--font-size-h3: clamp(1.5rem, 3vw, 2rem);         /* Subsection */
--font-size-body: clamp(1rem, 1.5vw, 1.125rem);   /* Body text */
--font-size-small: clamp(0.875rem, 1.2vw, 1rem);  /* Small text */
--font-size-label: clamp(0.75rem, 1vw, 0.875rem); /* Labels/codes */
```

---

## 🧩 KOMPONENTY UI

### 1. Corner Brackets (Ramki Ozdobne) ⟨ ⟩

**Najważniejszy element wizualny!**

#### Typy Brackets:

**A. L-Shape Corners (Naroża L)**
```
┌─          ─┐


└─          ─┘
```

**Charakterystyka:**
- Pozycja: narożniki elementów (top-left, top-right, bottom-left, bottom-right)
- Kolor: Cyan (#00F0FF) lub Yellow (#FFD700)
- Szerokość linii: 2-3px
- Długość ramienia: 15-30px
- Odstęp od krawędzi: 5-10px (wewnątrz lub na zewnątrz elementu)

**CSS Implementacja:**
```css
.corner-bracket {
    position: relative;
}

/* Top-left corner */
.corner-bracket::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    border-top: 3px solid var(--color-cyan);
    border-left: 3px solid var(--color-cyan);
}

/* Top-right corner */
.corner-bracket::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 20px;
    height: 20px;
    border-top: 3px solid var(--color-cyan);
    border-right: 3px solid var(--color-cyan);
}

/* Bottom corners (analogicznie z bottom: 0) */
```

**Użycie:**
- Tytuły sekcji (GAMEPLAY SECTION, ROADMAP)
- Przyciski (DISCOVER, INVENTORY, JOIN NOW)
- Karty (avatar cards, feature cards)
- Hero title (wokół "NEXUS")

#### B. Single Bracket (Pojedyncza Ramka)

**Typ 1: Górny róg**
```
┌─
```

**Typ 2: Pełna ramka**
```
┌───────────────┐
│               │
└───────────────┘
```

**Użycie w mockupie:**
- Wokół tytułów sekcji (ABOUT THE PROJECT, GAMEPLAY SECTION)
- Wokół przycisków CTA
- Jako dekoracja wokół ikonografii

### 2. Przyciski (Buttons)

#### Primary Button (CTA)
```html
<button class="btn-primary">
    DISCOVER
</button>
```

**Styl:**
- Tło: Transparent lub bardzo ciemne (#0A0A0F)
- Border: 2px solid white
- Border-radius: 30-40px (pill shape)
- Padding: 15px 40px
- Font: Bold, uppercase, letter-spacing: 0.1em
- Corner brackets: Cyan na hover

**Hover State:**
```css
.btn-primary:hover {
    background: rgba(0, 240, 255, 0.1);
    border-color: #00F0FF;
    box-shadow: 0 0 20px rgba(0, 240, 255, 0.5);
    /* + animowane corner brackets */
}
```

#### Secondary Button
- Mniejszy padding
- Cieńsza ramka (1px)
- Bez corner brackets

### 3. Karty (Cards)

#### Avatar Card (Ecosystem Section)
```html
<div class="avatar-card">
    <img src="avatar.jpg" alt="Avatar">
    <div class="card-id">FXH-2135067</div>
    <div class="card-icon">*</div>
</div>
```

**Styl:**
- Kształt: Zaokrąglony prostokąt (border-radius: 20-30px)
- Border: 2-3px solid
- Border color: Gradient (cyan → yellow lub white)
- Padding: 15px
- Background: Dark (#0D1117) z lekką przezroczystością
- Corner accent: Żółty w prawym dolnym rogu

**Hover Effect:**
- Podniesienie (translateY: -10px)
- Glow effect (box-shadow cyan)
- Border color shift

### 4. Ikony

#### Social Icons (Discord, Custom)
- Kształt: Rounded square z border
- Border: 2px solid white
- Corner brackets: Małe L-shaped cyan brackets
- Size: 50-60px
- Background: Transparent lub dark
- Icon color: White

#### Feature Icons (Roadmap)
- Styl: Minimalistyczny line-art
- Kolor: White outline
- Background: Dark rounded square
- Size: 80-100px

### 5. Nawigacja (Navigation)

**Top Navigation:**
```html
<nav>
    <div class="logo">DRIFT NEXUS</div>
    <ul class="nav-links">
        <li>ABOUT</li>
        <li>GAMEPLAY</li>
        <li>ECOSYSTEMS</li>
        <li>NFT</li>
        <li>UTILITIES</li>
        <li>ROADMAP</li>
        <li>TEAM</li>
    </ul>
    <button class="btn-nav">INVENTORY</button>
</nav>
```

**Styl:**
- Tło: Transparent z backdrop-blur na scroll
- Wysokość: 80-100px
- Font: Medium weight, uppercase
- Link spacing: 30-40px
- Hover: Cyan underline animation

### 6. Roadmap Timeline

**Struktura:**
- Linia łącząca: Horizontal line z punktami (nodes)
- Node: Okrąg z ikoną
- Card: Pod każdym node
- Connecting line: 2px solid white/cyan

**Node Style:**
```css
.timeline-node {
    width: 120px;
    height: 120px;
    border: 3px solid white;
    border-radius: 20px;
    background: #0A0A0F;
    display: flex;
    align-items: center;
    justify-content: center;
}
```

---

## 📐 LAYOUT & KOMPOZYCJA

### Grid System

**Kontener:**
```css
.container {
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 60px;
}

@media (max-width: 768px) {
    .container {
        padding: 0 20px;
    }
}
```

### Sekcje (Sections)

#### Hero Section (Full Screen)
```css
.hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    overflow: hidden;
}
```

**Struktura:**
- Background: Fullscreen image/video z character
- Overlay: Gradient dark z przezroczystością
- Title: Bardzo duży (10-12rem), centered, białe litery
- Subtitle: Pod title, mniejszy
- CTA: Centered pod subtitle
- Decorative elements: Corner brackets, floating particles

#### Content Section
```css
.section {
    padding: 120px 0;
    position: relative;
}

.section-dark {
    background: #000000;
}

.section-teal {
    background: linear-gradient(180deg, #0D2A35 0%, #000000 100%);
}
```

**Struktura:**
- Section title: Centered z corner brackets
- Description: Centered, max-width: 800px
- Content: Grid lub Flex (cards, images)

### Kompozycja Elementów

#### Z-Index Hierarchy
```css
--z-particles: 0;
--z-background: 1;
--z-content: 10;
--z-decorations: 15;
--z-nav: 1000;
--z-modal: 9000;
```

#### Spacing System
```css
--spacing-xs: 8px;
--spacing-sm: 16px;
--spacing-md: 32px;
--spacing-lg: 64px;
--spacing-xl: 120px;
--spacing-xxl: 200px;
```

---

## ✨ EFEKTY WIZUALNE

### 1. Glow Effects (Poświata)

**Cyan Glow:**
```css
.glow-cyan {
    box-shadow:
        0 0 10px rgba(0, 240, 255, 0.3),
        0 0 20px rgba(0, 240, 255, 0.2),
        0 0 40px rgba(0, 240, 255, 0.1);
}
```

**Yellow/Gold Glow:**
```css
.glow-yellow {
    box-shadow:
        0 0 15px rgba(255, 215, 0, 0.4),
        0 0 30px rgba(255, 215, 0, 0.2),
        0 0 60px rgba(255, 215, 0, 0.1);
}
```

**Użycie:**
- 3D obiekty (kostka, geometria)
- Hover state na przyciskach
- Aktywne elementy nawigacji
- Krawędzie kart

### 2. Backdrop Blur

```css
.glass-panel {
    background: rgba(10, 10, 15, 0.7);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
}
```

**Użycie:**
- Navbar po scroll
- Modal overlays
- Karty na tle zdjęć

### 3. Gradients

**Background Gradient (Hero):**
```css
background: radial-gradient(
    circle at 30% 50%,
    rgba(0, 240, 255, 0.15) 0%,
    rgba(0, 107, 125, 0.25) 30%,
    rgba(13, 42, 53, 0.5) 50%,
    rgba(0, 0, 0, 1) 80%
);
```

**Text Gradient:**
```css
.gradient-text {
    background: linear-gradient(135deg, #00F0FF 0%, #FFD700 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
```

### 4. Particle Effects

**Tło z Cząsteczkami:**
- Małe kropki świetlne (cyan/white)
- Linie łączące (network pattern)
- Animacja: powolny ruch (parallax)
- Density: ~50-80 particles na viewport

**Implementacja:** Canvas lub CSS (pseudo-elements)

### 5. 3D Elements

**3D Kostka (mockup-02):**
- Geometria: Wireframe cube
- Kolor: Cyan edges
- Glow: Yellow na niektórych krawędziach
- Animacja: Powolna rotacja (3D transform)
- Shadow: Soft shadow pod obiektem

**CSS 3D Transform:**
```css
.cube-3d {
    transform: perspective(1000px) rotateX(15deg) rotateY(30deg);
    transform-style: preserve-3d;
}
```

### 6. Image Overlays

**Cyberpunk City Background (mockup-03):**
- Overlay: Dark gradient (#000 50% opacity)
- Color grading: Blue-teal tint
- Blur: Subtle background blur (opcjonalnie)
- Vignette: Dark corners

```css
.image-overlay {
    position: relative;
}

.image-overlay::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.3) 0%,
        rgba(0, 0, 0, 0.7) 100%
    );
    mix-blend-mode: multiply;
}
```

---

## 🎬 ANIMACJE & INTERAKCJE

### 1. Scroll Animations

**Fade In + Slide Up:**
```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(60px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.reveal {
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}
```

**Stagger Animation (Karty):**
```css
.card:nth-child(1) { animation-delay: 0.1s; }
.card:nth-child(2) { animation-delay: 0.2s; }
.card:nth-child(3) { animation-delay: 0.3s; }
```

### 2. Hover Animations

**Button Hover:**
```css
.btn {
    transition: all 0.3s ease;
}

.btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 240, 255, 0.3);
}

/* Corner brackets animate in */
.btn:hover::before,
.btn:hover::after {
    animation: cornerBracketIn 0.3s ease;
}
```

**Card Hover:**
```css
.card {
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
    transform: translateY(-15px) scale(1.02);
    box-shadow: 0 20px 60px rgba(0, 240, 255, 0.4);
}
```

### 3. Loading/Entrance Animations

**Logo Entrance:**
- Fade in + scale (z 0.8 do 1)
- Letter spacing animation (od szerokiego do normalnego)
- Glow effect narasta

**Hero Title:**
- Clip-path animation (reveal z lewej do prawej)
- Lub letter-by-letter typing effect
- Glow pulsing

### 4. Particle Motion

**Floating Particles:**
```css
@keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-20px); }
}

.particle {
    animation: float 3s ease-in-out infinite;
}
```

### 5. 3D Rotation

**Cube/Geometry:**
```css
@keyframes rotate3D {
    from { transform: perspective(1000px) rotateY(0deg) rotateX(10deg); }
    to { transform: perspective(1000px) rotateY(360deg) rotateX(10deg); }
}

.cube-3d {
    animation: rotate3D 20s linear infinite;
}
```

---

## 🌌 ATMOSFERA & MOOD

### Vibe Główny

**Cyberpunk Elegance + Gaming Premium**

#### Kluczowe Elementy Atmosfery:

1. **Futurystyczny High-Tech:**
   - Geometryczne kształty (kostki, wielokąty)
   - Technologiczne UI elements (corner brackets, tech codes)
   - Neon accents (cyan, yellow)
   - Matrix-style effects (particles, lines)

2. **Dark & Mysterious:**
   - Bardzo ciemne tło (pure black)
   - Deep space vibes
   - Subtle lighting (glows, highlights)
   - Vignette effects

3. **Premium & Polished:**
   - Clean typography
   - Smooth animations
   - Attention to detail (borders, corners)
   - High-quality imagery (3D renders, characters)

4. **Gaming/Metaverse:**
   - Avatar-centric (duże, wyeksponowane postacie)
   - Immersive full-screen sections
   - Action-oriented CTA (JOIN NOW, DISCOVER)
   - Ecosystem/roadmap emphasis

### Inspiracje Wizualne

**Podobne Estetyki:**
- Cyberpunk 2077 (UI design)
- Blade Runner (neon, dark city)
- Tron Legacy (geometric, glows)
- Ready Player One (metaverse vibes)
- NFT marketplaces (premium crypto aesthetic)

### Mood Board Keywords

- Cyberpunk
- Neon
- Matrix
- Digital
- Futuristic
- High-Tech
- Space
- Metaverse
- Premium Gaming
- Sci-Fi
- Dark Mode
- Glowing Edges
- Geometric
- 3D Renders
- Avatar-Centric

---

## 🔍 SZCZEGÓŁY TECHNICZNE

### Corner Brackets - Detailed Specs

**Wymiary:**
```css
/* Small brackets (buttons, icons) */
--bracket-size-sm: 15px;
--bracket-thickness-sm: 2px;

/* Medium brackets (cards) */
--bracket-size-md: 25px;
--bracket-thickness-md: 2px;

/* Large brackets (section titles) */
--bracket-size-lg: 40px;
--bracket-thickness-lg: 3px;
```

**Pozycjonowanie:**
```css
/* Offset od krawędzi elementu */
--bracket-offset: 10px;

/* Przykład: top-left bracket */
.bracket-tl {
    top: var(--bracket-offset);
    left: var(--bracket-offset);
    width: var(--bracket-size-md);
    height: var(--bracket-size-md);
    border-top: var(--bracket-thickness-md) solid var(--color-cyan);
    border-left: var(--bracket-thickness-md) solid var(--color-cyan);
}
```

### Przykładowe Komponenty z Mockupów

#### 1. Section Title z Brackets (GAMEPLAY SECTION)
```html
<div class="section-title-wrapper">
    <span class="bracket-top-left"></span>
    <h2 class="section-title">GAMEPLAY SECTION</h2>
    <span class="bracket-bottom-right"></span>
</div>
```

```css
.section-title-wrapper {
    position: relative;
    display: inline-block;
    padding: 20px 60px;
}

.bracket-top-left,
.bracket-bottom-right {
    position: absolute;
    width: 30px;
    height: 30px;
}

.bracket-top-left {
    top: 0;
    left: 0;
    border-top: 3px solid #00F0FF;
    border-left: 3px solid #00F0FF;
}

.bracket-bottom-right {
    bottom: 0;
    right: 0;
    border-bottom: 3px solid #00F0FF;
    border-right: 3px solid #00F0FF;
}

.section-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 2.5rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #FFFFFF;
}
```

#### 2. Avatar Card (ECOSYSTEM Section)
```html
<div class="avatar-card">
    <div class="card-image-wrapper">
        <img src="avatar.jpg" alt="Avatar" class="card-image">
        <div class="card-corner-icon">*</div>
    </div>
    <div class="card-id">FXH-2135067</div>
</div>
```

```css
.avatar-card {
    position: relative;
    width: 320px;
    border: 3px solid transparent;
    border-radius: 30px;
    padding: 20px;
    background:
        linear-gradient(#0D1117, #0D1117) padding-box,
        linear-gradient(135deg, #00F0FF, #FFD700) border-box;
    transition: all 0.3s ease;
}

.avatar-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 50px rgba(0, 240, 255, 0.4);
}

.card-image-wrapper {
    position: relative;
    border-radius: 20px;
    overflow: hidden;
    margin-bottom: 15px;
}

.card-image {
    width: 100%;
    height: auto;
    display: block;
}

.card-corner-icon {
    position: absolute;
    bottom: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    background: #FFFFFF;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    color: #000;
}

.card-id {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    color: #FFFFFF;
    text-align: center;
    letter-spacing: 0.1em;
}
```

#### 3. CTA Button (DISCOVER, JOIN NOW)
```html
<button class="btn-cta">
    DISCOVER
</button>
```

```css
.btn-cta {
    position: relative;
    padding: 18px 50px;
    font-family: 'Rajdhani', sans-serif;
    font-size: 1rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.15em;
    color: #FFFFFF;
    background: transparent;
    border: 2px solid #FFFFFF;
    border-radius: 40px;
    cursor: pointer;
    transition: all 0.3s ease;
    overflow: hidden;
}

/* Corner brackets animują się na hover */
.btn-cta::before,
.btn-cta::after {
    content: '';
    position: absolute;
    width: 0;
    height: 0;
    border: 2px solid #00F0FF;
    transition: all 0.3s ease;
    opacity: 0;
}

.btn-cta::before {
    top: -2px;
    left: -2px;
    border-right: none;
    border-bottom: none;
}

.btn-cta::after {
    bottom: -2px;
    right: -2px;
    border-left: none;
    border-top: none;
}

.btn-cta:hover {
    background: rgba(0, 240, 255, 0.1);
    border-color: #00F0FF;
    box-shadow: 0 0 30px rgba(0, 240, 255, 0.5);
}

.btn-cta:hover::before,
.btn-cta:hover::after {
    width: 20px;
    height: 20px;
    opacity: 1;
}
```

---

## 📱 RESPONSIVE DESIGN

### Breakpoints

```css
/* Mobile */
@media (max-width: 480px) {
    .section-title { font-size: 2rem; }
    .container { padding: 0 20px; }
}

/* Tablet */
@media (max-width: 768px) {
    .hero-title { font-size: 5rem; }
    .avatar-card { width: 100%; }
}

/* Desktop */
@media (min-width: 1024px) {
    /* Full effects enabled */
}

/* Large Desktop */
@media (min-width: 1440px) {
    .container { max-width: 1600px; }
}
```

### Mobile Adaptations

1. **Corner Brackets:**
   - Zmniejszone (15px → 10px)
   - Opcjonalnie ukryte na najmniejszych ekranach

2. **Typography:**
   - Display titles: Znacznie mniejsze (clamp)
   - Letter-spacing: Zredukowane

3. **Spacing:**
   - Padding sections: 80px → 60px → 40px
   - Card gaps: 32px → 20px → 16px

4. **Effects:**
   - Particle count: Reduced o 50%
   - Glow intensity: Zmniejszone
   - Animations: Simplified lub wyłączone (prefers-reduced-motion)

---

## 🎯 KEY TAKEAWAYS (Najważniejsze Elementy)

### Must-Have Features dla TechGear:

1. **Corner Brackets System** ⭐⭐⭐⭐⭐
   - To najbardziej charakterystyczny element
   - Nadaje "cyber-tech" vibe
   - Stosować wszędzie: przyciski, karty, tytuły

2. **Cyan + Yellow Color Scheme** ⭐⭐⭐⭐⭐
   - Kontrast z czarnym tłem = wow effect
   - Cyan jako główny, yellow jako akcent

3. **Dark Pure Black Backgrounds** ⭐⭐⭐⭐⭐
   - #000000 lub bardzo ciemne (#0A0A0F)
   - Maksymalny kontrast z neonami

4. **Glow Effects** ⭐⭐⭐⭐
   - Box-shadow z cyan/yellow
   - Hover states
   - Active elements

5. **Bold Typography** ⭐⭐⭐⭐⭐
   - Duże, grube, uppercase
   - Wide letter-spacing
   - Geometryczne fonty

6. **3D Elements & Particles** ⭐⭐⭐
   - Dodają głębi
   - Background motion
   - Opcjonalne na mobile

7. **Smooth Animations** ⭐⭐⭐⭐
   - Fade in, slide up
   - Hover effects (lift + glow)
   - Transition duration: 0.3s

---

**Koniec dokumentacji wizualnej** 🏁
