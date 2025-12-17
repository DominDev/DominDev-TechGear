/* ============================================================================
   MAIN.JS - Application Entry Point & Initialization
   ============================================================================ */

import { renderProducts, filterProducts, searchProducts, toggleProductSpecs } from './products.js';
import { initCart, addToCart, changeQty, removeItem, toggleCart } from './cart.js';
import { initAuth, toggleAuthModal } from './auth.js';
import { initParticles } from './particles.js';
import { initRain } from './rain.js';
import { initMistyRain } from './misty-rain.js';
import { initFog } from './fog.js';
import { initParallax, initMouseParallax } from './parallax.js';
import {
    initScrollReveal,
    initSmoothScrollLinks,
    initScrollHeader,
    initScrollSpy,
    initFAQ,
    initMobileMenu,
    initSearch,
    initHeroScrollIndicator,
    initScrollToTop
} from './utils.js';

/* ----------------------------------------------------------------------------
   PRELOADER - Circular Progress Animation
   ---------------------------------------------------------------------------- */

function initPreloader() {
    const preloader = document.getElementById('preloader');
    const progressRing = document.getElementById('progressRing');
    const statusPercent = document.getElementById('statusPercent');
    const statusText = document.getElementById('statusText');

    if (!preloader || !progressRing || !statusPercent) return;

    // Circle circumference = 2 * PI * r = 2 * 3.14159 * 90 ≈ 565.49
    const circumference = 565.49;

    const messages = [
        '/// INITIALIZING COMBAT SYSTEMS...',
        '/// LOADING TACTICAL ASSETS...',
        '/// CALIBRATING WEAPONS GRID...',
        '/// SYNCING INVENTORY DATABASE...',
        '/// ESTABLISHING SECURE CONNECTION...',
        '/// SYSTEM READY. WELCOME.'
    ];

    let progress = 0;
    let messageIndex = 0;

    // Set initial state
    progressRing.style.strokeDashoffset = circumference;

    const interval = setInterval(() => {
        progress += Math.random() * 12 + 8;

        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);

            // Hide preloader after complete
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500);
        }

        // Update circular progress
        // strokeDashoffset goes from circumference (0%) to 0 (100%)
        const offset = circumference - (progress / 100) * circumference;
        progressRing.style.strokeDashoffset = offset;

        // Update percent text
        statusPercent.textContent = `${Math.floor(progress)}%`;

        // Update message
        if (messageIndex < messages.length - 1 && progress > (messageIndex + 1) * (100 / messages.length)) {
            messageIndex++;
            if (statusText) {
                statusText.textContent = messages[messageIndex];
            }
        }
    }, 300);
}

/* ----------------------------------------------------------------------------
   PRODUCT FILTERS
   ---------------------------------------------------------------------------- */

function initProductFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Filter products
            const category = tab.dataset.filter;
            filterProducts(category);
        });
    });
}

/* ----------------------------------------------------------------------------
   GLOBAL WINDOW FUNCTIONS (Required for inline onclick handlers)
   ---------------------------------------------------------------------------- */

// Expose functions globally - required for product card buttons and cart controls
window.addToCart = addToCart;
window.changeQty = changeQty;
window.removeItem = removeItem;
window.toggleProductSpecs = toggleProductSpecs;

/* ----------------------------------------------------------------------------
   OVERLAY HANDLER
   ---------------------------------------------------------------------------- */

/* ----------------------------------------------------------------------------
   QUICK VIEW MODAL
   ---------------------------------------------------------------------------- */

import { getProductById } from './products.js';

let quickviewQty = 1;
let currentQuickviewProduct = null;

/**
 * Initialize Quick View Modal
 */
function initQuickView() {
    const modal = document.getElementById('quickviewModal');
    const closeBtn = document.getElementById('quickviewClose');
    const overlay = document.getElementById('overlayBg');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const addBtn = document.getElementById('quickviewAddBtn');

    if (!modal) return;

    // Close button
    closeBtn?.addEventListener('click', closeQuickView);

    // Quantity controls
    qtyMinus?.addEventListener('click', () => {
        if (quickviewQty > 1) {
            quickviewQty--;
            updateQtyDisplay();
        }
    });

    qtyPlus?.addEventListener('click', () => {
        if (quickviewQty < 10) {
            quickviewQty++;
            updateQtyDisplay();
        }
    });

    // Add to cart from quickview
    addBtn?.addEventListener('click', () => {
        if (currentQuickviewProduct) {
            for (let i = 0; i < quickviewQty; i++) {
                window.addToCart(currentQuickviewProduct.id);
            }
            closeQuickView();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeQuickView();
        }
    });
}

/**
 * Open Quick View Modal with product data
 */
function openQuickView(productId) {
    const product = getProductById(productId);
    if (!product) return;

    currentQuickviewProduct = product;
    quickviewQty = 1;

    const modal = document.getElementById('quickviewModal');
    const overlay = document.getElementById('overlayBg');

    // Populate modal
    document.getElementById('quickviewImg').src = `assets/img/products/${product.img}-600.jpg`;
    document.getElementById('quickviewImg').alt = product.name;
    document.getElementById('quickviewName').textContent = product.name;
    document.getElementById('quickviewPrice').textContent = `${product.price} PLN`;
    document.getElementById('quickviewCategory').textContent = `// ${product.category.toUpperCase()}`;

    // Badge
    const badge = document.getElementById('quickviewBadge');
    if (product.badge) {
        badge.textContent = product.badge;
        badge.className = `product-badge quickview-badge product-badge--${product.badge.toLowerCase()}`;
        badge.style.display = 'block';
    } else {
        badge.style.display = 'none';
    }

    // Specs
    const specsContainer = document.getElementById('quickviewSpecs');
    const specsHTML = Object.entries(product.specs)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
        .join('');
    specsContainer.innerHTML = `
        <p class="specs-title">TECHNICAL_SPECIFICATIONS:</p>
        <ul class="specs-list">${specsHTML}</ul>
    `;

    updateQtyDisplay();

    // Show modal
    modal?.classList.add('active');
    overlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
}

/**
 * Close Quick View Modal
 */
function closeQuickView() {
    const modal = document.getElementById('quickviewModal');
    const overlay = document.getElementById('overlayBg');

    modal?.classList.remove('active');
    overlay?.classList.remove('active');
    document.body.style.overflow = '';

    currentQuickviewProduct = null;
    quickviewQty = 1;
}

/**
 * Update quantity display
 */
function updateQtyDisplay() {
    const qtyValue = document.getElementById('qtyValue');
    if (qtyValue) {
        qtyValue.textContent = quickviewQty;
    }
}

// Expose globally for product card click
window.openQuickView = openQuickView;

/* ----------------------------------------------------------------------------
   RECENTLY VIEWED PRODUCTS
   ---------------------------------------------------------------------------- */

const RECENTLY_VIEWED_KEY = 'tg_recently_viewed';
const MAX_RECENTLY_VIEWED = 6;

/**
 * Add product to recently viewed list
 */
function addToRecentlyViewed(productId) {
    let viewed = getRecentlyViewed();

    // Remove if already exists (to move to front)
    viewed = viewed.filter(id => id !== productId);

    // Add to beginning
    viewed.unshift(productId);

    // Limit to max items
    viewed = viewed.slice(0, MAX_RECENTLY_VIEWED);

    // Save
    localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(viewed));

    // Update UI
    renderRecentlyViewed();
}

/**
 * Get recently viewed product IDs
 */
function getRecentlyViewed() {
    try {
        const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

/**
 * Render recently viewed products section
 */
function renderRecentlyViewed() {
    const section = document.getElementById('recentlyViewed');
    const grid = document.getElementById('recentlyViewedGrid');

    if (!section || !grid) return;

    const viewedIds = getRecentlyViewed();

    if (viewedIds.length === 0) {
        section.classList.remove('visible');
        return;
    }

    // Build HTML
    let html = '';
    viewedIds.forEach(id => {
        const product = getProductById(id);
        if (!product) return;

        html += `
            <div class="recently-viewed-item" onclick="window.openQuickView(${product.id})">
                <img src="assets/img/products/${product.img}-300.jpg"
                     alt="${product.name}"
                     class="recently-viewed-img"
                     loading="lazy">
                <p class="recently-viewed-name">${product.name}</p>
                <p class="recently-viewed-price">${product.price} PLN</p>
            </div>
        `;
    });

    grid.innerHTML = html;
    section.classList.add('visible');
}

/**
 * Initialize recently viewed (call on page load)
 */
function initRecentlyViewed() {
    renderRecentlyViewed();
}

// Hook into openQuickView to track viewed products
const originalOpenQuickView = openQuickView;
function openQuickViewWithTracking(productId) {
    addToRecentlyViewed(productId);
    originalOpenQuickView(productId);
}
window.openQuickView = openQuickViewWithTracking;

/**
 * Initialize newsletter form
 * Handles form submission with success state
 */
function initNewsletter() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const emailInput = document.getElementById('newsletterEmail');
        const email = emailInput?.value;

        if (email) {
            // Simulate API call (replace with actual endpoint)
            console.log('Newsletter signup:', email);

            // Show success state
            form.classList.add('success');

            // Store in localStorage to prevent re-subscription
            localStorage.setItem('tg_newsletter_subscribed', 'true');
            localStorage.setItem('tg_newsletter_email', email);
        }
    });

    // Check if already subscribed
    if (localStorage.getItem('tg_newsletter_subscribed') === 'true') {
        form.classList.add('success');
    }
}

/**
 * Initialize universal overlay click handler
 * Closes auth modal, cart sidebar, or quickview when clicking overlay
 */
function initOverlay() {
    const overlay = document.getElementById('overlayBg');
    if (!overlay) return;

    overlay.addEventListener('click', () => {
        const authModal = document.getElementById('authModal');
        const cartSidebar = document.getElementById('cartSidebar');
        const quickviewModal = document.getElementById('quickviewModal');

        // Check which element is currently active and close it
        if (quickviewModal && quickviewModal.classList.contains('active')) {
            closeQuickView();
        } else if (authModal && authModal.classList.contains('active')) {
            toggleAuthModal();
        } else if (cartSidebar && cartSidebar.classList.contains('active')) {
            toggleCart();
        }
    });
}

/* ----------------------------------------------------------------------------
   APP INITIALIZATION
   ---------------------------------------------------------------------------- */

function initApp() {
    // 1. Start preloader animation
    initPreloader();

    // 2. Initialize core systems
    initAuth();
    initCart();
    initOverlay();

    // 3. Render products
    renderProducts();
    initProductFilters();

    // 4. Initialize UI utilities
    initScrollReveal();
    initSmoothScrollLinks();
    initScrollHeader();
    initScrollSpy();
    initFAQ();
    initMobileMenu();
    initSearch(searchProducts);
    initHeroScrollIndicator();
    initScrollToTop();
    initNewsletter();
    initQuickView();
    initRecentlyViewed();

    // 5. Initialize visual effects (after page load for performance)
    window.addEventListener('load', () => {
        // initParticles(); // Disabled - using rain in hero instead
        // initRain(); // TEMP DISABLED - testing new misty rain effect
        initFog(); // NEW: Subtle floating fog in background
        initMistyRain(); // NEW: Atmospheric mist with lightning
        // initParallax(); // Disabled - not needed for layered design
        // initMouseParallax(); // Disabled - conflicts with scroll parallax
    });

    // 6. Log system info (dev mode)
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        console.log('%cDEV MODE ACTIVE', 'color: #00f0ff; font-size: 12px;');
        console.log('Use these commands:');
        console.log('  - window.addToCart(id)');
        console.log('  - window.changeQty(id, change)');
        console.log('  - window.removeItem(id)');
    }
}

/* ----------------------------------------------------------------------------
   DOM CONTENT LOADED
   ---------------------------------------------------------------------------- */

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    // DOM already loaded
    initApp();
}

/* ----------------------------------------------------------------------------
   SERVICE WORKER REGISTRATION (for PWA - optional future enhancement)
   ---------------------------------------------------------------------------- */

// Disabled until service-worker.js is implemented
// TODO: Create service-worker.js for PWA functionality
// if ('serviceWorker' in navigator && window.location.protocol === 'https:') {
//     window.addEventListener('load', () => {
//         navigator.serviceWorker.register('/service-worker.js')
//             .then(registration => {
//                 console.log('ServiceWorker registered:', registration);
//             })
//             .catch(error => {
//                 console.log('ServiceWorker registration failed:', error);
//             });
//     });
// }

/* ----------------------------------------------------------------------------
   PERFORMANCE MONITORING (Optional)
   ---------------------------------------------------------------------------- */

window.addEventListener('load', () => {
    // Measure performance (dev mode only)
    if ((window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.performance && window.performance.timing) {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;
        const domReadyTime = timing.domContentLoadedEventEnd - timing.navigationStart;

        console.log(`%c⚡ Performance Metrics`, 'color: #00f0ff; font-weight: bold;');
        console.log(`  DOM Ready: ${domReadyTime}ms`);
        console.log(`  Page Load: ${loadTime}ms`);
    }
});

/* ----------------------------------------------------------------------------
   ERROR HANDLING
   ---------------------------------------------------------------------------- */

window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
    // In production, you might want to send this to an error tracking service
});

window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
});
