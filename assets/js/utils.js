/* ============================================================================
   UTILS.JS - Helper Functions & Utilities
   ============================================================================ */

/**
 * Debounce function - delays execution until after wait time
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} - Debounced function
 */
export function debounce(func, wait = 300) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Throttle function - limits execution to once per wait period
 * @param {Function} func - Function to throttle
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} - Throttled function
 */
export function throttle(func, wait = 300) {
    let inThrottle;
    return function executedFunction(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, wait);
        }
    };
}

/**
 * Intersection Observer for scroll reveal animations
 * @param {String} selector - CSS selector for elements to observe
 * @param {Object} options - Intersection Observer options
 */
export function initScrollReveal(selector = '.reveal', options = {}) {
    const defaultOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
        ...options
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // ZMIENIONO: active -> visible
                // Optionally unobserve after reveal (performance optimization)
                // observer.unobserve(entry.target);
            }
        });
    }, defaultOptions);

    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    });

    return observer;
}

/**
 * Smooth scroll to element
 * @param {String} targetId - Target element ID (without #)
 * @param {Number} offset - Offset in pixels (default: nav height)
 */
export function smoothScroll(targetId, offset = 90) {
    const target = document.getElementById(targetId);
    if (!target) return;

    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

/**
 * Handle navigation link clicks for smooth scrolling
 */
export function initSmoothScrollLinks() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            // Ignore empty hash links
            if (href === '#' || href === '#!') {
                e.preventDefault();
                return;
            }

            const targetId = href.substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                e.preventDefault();
                smoothScroll(targetId);

                // Update active nav link
                updateActiveNavLink(link);

                // Close mobile menu if open and restore scroll
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
}

/**
 * Update active navigation link
 * @param {HTMLElement} activeLink - Active link element
 */
export function updateActiveNavLink(activeLink) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    activeLink.classList.add('active');
}

/**
 * Track scroll position and update header style
 */
export function initScrollHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    const handleScroll = throttle(() => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);
}

/**
 * Detect current section in viewport and update nav
 */
export function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if (sections.length === 0 || navLinks.length === 0) return;

    // Flag to temporarily disable scroll spy during programmatic scroll
    let isScrolling = false;

    const updateActiveLink = () => {
        // Skip update if we're in the middle of a programmatic scroll
        if (isScrolling) return;

        let currentSection = 'hero'; // Default to hero

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;

            // Check if we've scrolled past this section's start
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    };

    const handleScroll = throttle(updateActiveLink, 100);

    window.addEventListener('scroll', handleScroll);

    // Listen for nav link clicks to immediately set active state
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Immediately set this link as active
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Disable scroll spy temporarily during smooth scroll
            isScrolling = true;
            setTimeout(() => {
                isScrolling = false;
            }, 800); // Match smooth scroll duration
        });
    });

    // Run once on init to set correct initial state
    updateActiveLink();
}

/**
 * Initialize FAQ accordion functionality
 */
export function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all FAQ items
            faqItems.forEach(faq => faq.classList.remove('active'));

            // Toggle current item (if it wasn't active)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

/**
 * Initialize mobile hamburger menu
 */
export function initMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    const toggleMenu = (open) => {
        hamburger.classList.toggle('active', open);
        navMenu.classList.toggle('active', open);

        // Lock/unlock body scroll when menu is open/closed
        if (open !== undefined) {
            document.body.style.overflow = open ? 'hidden' : '';
        } else {
            // Toggle case
            const isOpen = navMenu.classList.contains('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        }
    };

    hamburger.addEventListener('click', () => {
        toggleMenu();
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            if (navMenu.classList.contains('active')) {
                toggleMenu(false);
            }
        }
    });
}

/**
 * Initialize search functionality
 */
export function initSearch(searchCallback) {
    const searchToggle = document.getElementById('searchToggle');
    const searchBar = document.getElementById('searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (!searchToggle || !searchBar || !searchInput) return;

    // Toggle search bar
    searchToggle.addEventListener('click', () => {
        searchBar.classList.toggle('active');
        if (searchBar.classList.contains('active')) {
            searchInput.focus();
        } else {
            searchInput.value = '';
            searchCallback(''); // Reset search
        }
    });

    // Close search
    if (searchClose) {
        searchClose.addEventListener('click', () => {
            searchBar.classList.remove('active');
            searchInput.value = '';
            searchCallback(''); // Reset search
        });
    }

    // Search input with debounce
    const debouncedSearch = debounce((query) => {
        searchCallback(query);
    }, 400);

    searchInput.addEventListener('input', (e) => {
        debouncedSearch(e.target.value);
    });

    // Close search on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchBar.classList.contains('active')) {
            searchBar.classList.remove('active');
            searchInput.value = '';
            searchCallback('');
        }
    });
}

/**
 * Format currency
 * @param {Number} amount - Amount to format
 * @param {String} currency - Currency code
 * @returns {String} - Formatted currency string
 */
export function formatCurrency(amount, currency = 'PLN') {
    return `${amount.toFixed(2)} ${currency}`;
}

/**
 * Generate unique ID
 * @returns {String} - Unique ID
 */
export function generateId() {
    return `id_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Check if element is in viewport
 * @param {HTMLElement} element - Element to check
 * @returns {Boolean} - True if in viewport
 */
export function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

/**
 * Copy text to clipboard
 * @param {String} text - Text to copy
 * @returns {Promise} - Promise that resolves when copied
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (error) {
        console.error('Failed to copy to clipboard:', error);
        return false;
    }
}

/**
 * Get query parameter from URL
 * @param {String} param - Parameter name
 * @returns {String|null} - Parameter value or null
 */
export function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

/**
 * Preload images
 * @param {Array} urls - Array of image URLs
 * @returns {Promise} - Promise that resolves when all images loaded
 */
export function preloadImages(urls) {
    const promises = urls.map(url => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(url);
            img.onerror = () => reject(url);
            img.src = url;
        });
    });

    return Promise.allSettled(promises);
}

/**
 * Initialize hero scroll indicator
 * Scrolls to the next section (arsenal) when clicked
 */
export function initHeroScrollIndicator() {
    const scrollIndicator = document.getElementById('heroScrollIndicator');
    if (!scrollIndicator) return;

    scrollIndicator.addEventListener('click', () => {
        smoothScroll('arsenal');
    });
}

/**
 * Initialize scroll-to-top button
 * Shows when scrolled past hero, scrolls to top when clicked
 */
export function initScrollToTop() {
    const scrollBtn = document.getElementById('scrollToTop');
    if (!scrollBtn) return;

    const showThreshold = 500; // Show after scrolling 500px

    const handleScroll = throttle(() => {
        if (window.scrollY > showThreshold) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    }, 100);

    window.addEventListener('scroll', handleScroll);

    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}
