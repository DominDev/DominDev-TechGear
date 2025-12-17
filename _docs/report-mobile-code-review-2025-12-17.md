# Code Review & Mobile Fixes Report

**Data:** 2025-12-17
**Status:** ✅ UKOŃCZONE (krytyczne naprawy)
**Dotyczy:** Problemy z trybem mobile, modale, przyciski inventory

---

## PODSUMOWANIE KRYTYCZNYCH BŁĘDÓW

### 🔴 KRYTYCZNY: Przyciski Add to Cart / Specs nie działają (PRODUKCJA)

**Problem:** Funkcje `addToCart()`, `toggleProductSpecs()`, `changeQty()`, `removeItem()` są eksponowane na `window` TYLKO w trybie deweloperskim (localhost/127.0.0.1).

**Lokalizacja:** [main.js:103-108](assets/js/main.js#L103-L108)

```javascript
// Expose functions in dev mode only for debugging
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    window.addToCart = addToCart;
    window.changeQty = changeQty;
    window.removeItem = removeItem;
    window.toggleProductSpecs = toggleProductSpecs;
}
```

**Skutek:** Na produkcji (GitHub Pages) przyciski "SPECS" i "+ INVENTORY" w kartach produktów oraz przyciski +/- w koszyku nie działają, ponieważ funkcje nie są dostępne globalnie.

**Naprawa:** Usunąć warunek deweloperski - funkcje muszą być zawsze dostępne globalnie.

---

### 🔴 KRYTYCZNY: Konflikt event listenerów na overlay

**Problem:** Overlay ma dwa różne event listenery, które mogą powodować konflikty:
1. W `initCart()` - [cart.js:265-268](assets/js/cart.js#L265-L268)
2. W `initOverlay()` - [main.js:118-133](assets/js/main.js#L118-L133)

**Skutek:** Podwójne wywołania mogą powodować nieprzewidywalne zachowanie - modal może się otwierać i natychmiast zamykać.

**Naprawa:** Usunąć listener z `initCart()` - `initOverlay()` obsługuje oba przypadki.

---

## PROBLEMY MOBILE CSS

### 🟡 ŚREDNI: Overflow i układ na bardzo małych ekranach (< 360px)

**Problem:** Na ekranach < 360px niektóre elementy mogą wychodzić poza viewport.

**Lokalizacje do sprawdzenia:**
- `.hero-cta-box` - przyciski CTA mogą się nie mieścić
- `.filter-tab` - filtry produktów mogą być zbyt szerokie
- `.faq-question` - tekst może być obcięty

---

### 🟡 ŚREDNI: Z-index modal vs menu mobile

**Problem:** Menu mobilne ma `z-index: var(--z-sidebar)` (8900), a modal auth ma `z-index: var(--z-modal)` (9000). Hamburger ma `z-index: 8901`.

**Potencjalny problem:** Kiedy menu mobilne jest otwarte i użytkownik kliknie przycisk LOGIN, modal może otworzyć się pod menu.

**Sprawdzić w:** [layout.css:245](assets/css/layout.css#L245), [components.css:466](assets/css/components.css#L466)

---

### 🟢 DROBNY: Cart sidebar na mobile

**Problem:** Cart sidebar zajmuje 100% szerokości na mobile - to OK, ale przycisk close jest mały.

**Lokalizacja:** [components.css:721-722](assets/css/components.css#L721-L722)

---

## PROBLEMY JAVASCRIPT

### 🔴 KRYTYCZNY: Brakuje globalnego eksportu funkcji (opisane wyżej)

### 🟡 ŚREDNI: Podwójne event listenery na auth toggle

**Problem:** W `initAuth()` są dodawane event listenery do `authToggle`, ale później w `updateAuthUI()` jest nadpisywany `onclick`:

```javascript
// initAuth() - dodaje addEventListener
authToggle.addEventListener('click', () => {...});

// updateAuthUI() - nadpisuje onclick
authToggle.onclick = logout; // lub toggleAuthModal
```

**Lokalizacja:** [auth.js:379-389](assets/js/auth.js#L379-L389) vs [auth.js:248](assets/js/auth.js#L248)

**Skutek:** Możliwe podwójne wywołania funkcji.

---

### 🟡 ŚREDNI: Cart items używają inline onclick

**Problem:** Cart items renderowane w `createCartRow()` używają inline `onclick="window.changeQty(...)"`, co wymaga globalnego eksportu funkcji.

**Lokalizacja:** [cart.js:189-197](assets/js/cart.js#L189-L197)

---

## PROBLEMY HTML/SEMANTYKA

### 🟢 DROBNY: Podwójny H1 w preloaderze

**Problem:** Jest `<h1>` w preloaderze i `<h1>` w hero.

**Lokalizacja:**
- [index.html:50](index.html#L50) - preloader
- [index.html:236](index.html#L236) - hero (główny)

**Naprawa:** Zmienić preloader na `<div>` lub `<p>`.

---

### 🟢 DROBNY: Atrybuty aria na przyciskach

**Problem:** Niektóre przyciski mają `aria-label`, inne nie - brak spójności.

---

## PLAN NAPRAW (PRIORYTETYZOWANY)

### FAZA 1 - KRYTYCZNE (do natychmiastowej naprawy)

1. **[KRYTYCZNY]** Usunąć warunek deweloperski z main.js - funkcje muszą być globalnie dostępne
2. **[KRYTYCZNY]** Usunąć zduplikowany event listener overlay z cart.js

### FAZA 2 - ŚREDNIE

3. **[ŚREDNI]** Ujednolicić obsługę auth toggle - usunąć nadpisywanie onclick
4. **[ŚREDNI]** Sprawdzić z-index hierarchy dla menu mobile + modal

### FAZA 3 - DROBNE (opcjonalne)

5. **[DROBNY]** Zmienić H1 w preloaderze na inny element
6. **[DROBNY]** Dodać brakujące aria-label do przycisków

---

## STATUS NAPRAW

| # | Problem | Status | Plik |
|---|---------|--------|------|
| 1 | Funkcje globalne | ✅ Naprawione | main.js:103-106 |
| 2 | Overlay listener | ✅ Naprawione | cart.js:264-265 |
| 3 | Auth toggle | ✅ Naprawione | auth.js:378-379, 299-310 |
| 4 | Z-index hierarchy | ✅ OK (sprawdzone) | - |
| 5 | Podwójny H1 | ✅ Naprawione | index.html:50 |
| 6 | Aria labels | ⏳ Opcjonalne | - |

---

## NOTATKI Z ANALIZY

### Struktura plików CSS
- `base.css` - zmienne, reset, typografia
- `layout.css` - header, hero, footer, responsywność
- `components.css` - przyciski, karty, modale, FAQ
- `animations.css` - keyframes, efekty

### Struktura plików JS
- `main.js` - inicjalizacja, preloader
- `products.js` - dane produktów, renderowanie kart
- `cart.js` - logika koszyka, localStorage
- `auth.js` - logika auth, localStorage
- `utils.js` - helpery (debounce, scroll, FAQ)

### Breakpoints CSS
- 1200px - large tablets/small laptops
- 992px - tablets landscape
- 900px (portrait) - tablets portrait
- 768px - tablets/mobile
- 480px - small mobile
- 360px - very small mobile

---

*Dokument będzie aktualizowany w miarę postępu napraw.*
