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

/**
 * Initialize universal overlay click handler
 * Closes auth modal or cart sidebar when clicking overlay
 */
function initOverlay() {
    const overlay = document.getElementById('overlayBg');
    if (!overlay) return;

    overlay.addEventListener('click', () => {
        const authModal = document.getElementById('authModal');
        const cartSidebar = document.getElementById('cartSidebar');

        // Check which element is currently active and close it
        if (authModal && authModal.classList.contains('active')) {
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
