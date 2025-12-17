/* ============================================================================
   PRODUCTS.JS - Product Database & Rendering Logic
   ============================================================================ */

export const products = [
    // MICE (3 products)
    {
        id: 1,
        name: 'NIGHTHAWK X2 PRO',
        category: 'mouse',
        price: 349,
        img: 'nighthawk-x2-pro',
        badge: 'BESTSELLER', // Badge type: BESTSELLER, NEW, SALE
        specs: {
            'DPI Range': '100-16,000 (adjustable)',
            'Sensor': 'PixArt PMW3399 Optical',
            'Weight': '59g (ultralight)',
            'Buttons': '8 programmable',
            'Connection': 'Wireless 2.4GHz + Bluetooth 5.0',
            'Battery': 'Up to 90 hours',
            'Polling Rate': '1000Hz'
        }
    },
    {
        id: 2,
        name: 'VIPER STEALTH',
        category: 'mouse',
        price: 299,
        img: 'viper-stealth',
        specs: {
            'DPI Range': '100-12,000',
            'Sensor': 'Optical Precision',
            'Weight': '72g',
            'Buttons': '6 programmable',
            'Connection': 'USB-C Wired',
            'Cable': 'Braided, 2m',
            'Polling Rate': '1000Hz'
        }
    },
    {
        id: 3,
        name: 'GHOST TRACKER',
        category: 'mouse',
        price: 419,
        img: 'ghost-tracker',
        specs: {
            'DPI Range': '50-20,000',
            'Sensor': 'Laser High-Precision',
            'Weight': '85g (adjustable)',
            'Buttons': '12 programmable + scroll wheel',
            'Connection': 'Tri-mode (2.4GHz/BT/Wired)',
            'Battery': 'Rechargeable Li-ion, 120h',
            'RGB': 'Per-zone customizable'
        }
    },

    // KEYBOARDS (3 products)
    {
        id: 4,
        name: 'CYBERDECK MK.IV',
        category: 'keyboard',
        price: 1299,
        img: 'cyberdeck-mk-iv',
        badge: 'NEW',
        specs: {
            'Layout': 'TKL (87-key)',
            'Switches': 'Cherry MX Red (linear)',
            'Actuation Force': '45g',
            'Keycaps': 'Double-shot PBT',
            'Backlight': 'Per-key RGB (16.8M colors)',
            'Connection': 'USB-C detachable',
            'Features': 'Hot-swappable switches, aluminum frame'
        }
    },
    {
        id: 5,
        name: 'MECHANIC K-75',
        category: 'keyboard',
        price: 649,
        img: 'mechanic-k-75',
        specs: {
            'Layout': 'Full-size (104-key)',
            'Switches': 'Gateron Brown (tactile)',
            'Actuation Force': '55g',
            'Keycaps': 'ABS shine-through',
            'Backlight': 'RGB zones (9 zones)',
            'Connection': 'USB 2.0',
            'Features': 'Media keys, wrist rest included'
        }
    },
    {
        id: 6,
        name: 'SHADOWTYPE MINI',
        category: 'keyboard',
        price: 899,
        img: 'shadowtype-mini',
        specs: {
            'Layout': '60% compact (61-key)',
            'Switches': 'Kailh Box White (clicky)',
            'Actuation Force': '50g',
            'Keycaps': 'PBT dye-sublimated',
            'Backlight': 'Per-key RGB + underglow',
            'Connection': 'Wireless BT 5.1 + USB-C',
            'Battery': '3000mAh, 6 months standby',
            'Features': 'Programmable via software'
        }
    },

    // AUDIO (3 products)
    {
        id: 7,
        name: 'TG-1 PRO WIRELESS',
        category: 'audio',
        price: 899,
        img: 'tg-1-pro-wireless',
        specs: {
            'Driver': '50mm Neodymium',
            'Frequency': '20Hz - 20kHz',
            'Impedance': '32 Ohm',
            'Connection': 'Wireless 2.4GHz + 3.5mm',
            'Microphone': 'Detachable noise-canceling',
            'Battery': 'Up to 30 hours',
            'Weight': '320g',
            'Features': '7.1 virtual surround, memory foam earcups'
        }
    },
    {
        id: 8,
        name: 'VOID SURROUND',
        category: 'audio',
        price: 599,
        img: 'void-surround',
        specs: {
            'Driver': '40mm custom-tuned',
            'Frequency': '15Hz - 25kHz',
            'Impedance': '64 Ohm',
            'Connection': 'USB wired',
            'Microphone': 'Unidirectional flip-to-mute',
            'Cable': '2.5m braided',
            'Weight': '280g',
            'Features': 'RGB lighting, in-line controls'
        }
    },
    {
        id: 9,
        name: 'SILENT PREDATOR',
        category: 'audio',
        price: 1199,
        img: 'silent-predator',
        badge: 'BESTSELLER',
        specs: {
            'Driver': 'Planar magnetic 60mm',
            'Frequency': '10Hz - 50kHz',
            'Impedance': '80 Ohm',
            'Connection': 'Wireless aptX HD + USB-C + 3.5mm',
            'Microphone': 'Dual-mic AI noise cancellation',
            'Battery': '40 hours with ANC',
            'Weight': '380g',
            'Features': 'Active noise cancellation, premium leather'
        }
    },

    // ADDITIONAL PRODUCTS FOR PAGINATION TESTING
    {
        id: 10,
        name: 'RAPTOR ELITE',
        category: 'mouse',
        price: 279,
        img: 'viper-stealth', // reuse existing image
        specs: {
            'DPI Range': '200-10,000',
            'Sensor': 'Optical Gaming',
            'Weight': '68g',
            'Buttons': '5 programmable',
            'Connection': 'USB-C Wired',
            'Cable': 'Paracord 1.8m',
            'Polling Rate': '1000Hz'
        }
    },
    {
        id: 11,
        name: 'STRIKER PRO X',
        category: 'keyboard',
        price: 899,
        img: 'cyberdeck-mk-iv', // reuse existing image
        specs: {
            'Layout': 'Full-size (104-key)',
            'Switches': 'Gateron Brown (tactile)',
            'Actuation Force': '55g',
            'Keycaps': 'PBT Double-shot',
            'Backlight': 'RGB Per-key',
            'Connection': 'USB-C + Wireless',
            'Features': 'Media keys, wrist rest included'
        }
    },
    {
        id: 12,
        name: 'ECHO STORM',
        category: 'audio',
        price: 449,
        img: 'void-surround', // reuse existing image
        badge: 'SALE',
        specs: {
            'Driver': '50mm Neodymium',
            'Frequency': '20Hz - 20kHz',
            'Impedance': '32 Ohm',
            'Connection': '3.5mm + USB',
            'Microphone': 'Detachable boom mic',
            'Cable': '2m braided',
            'Weight': '310g',
            'Features': 'Memory foam pads, breathable mesh'
        }
    },
    {
        id: 13,
        name: 'PHANTOM WIRELESS',
        category: 'mouse',
        price: 389,
        img: 'ghost-tracker', // reuse existing image
        badge: 'NEW',
        specs: {
            'DPI Range': '100-18,000',
            'Sensor': 'HERO 25K',
            'Weight': '63g',
            'Buttons': '7 programmable',
            'Connection': 'LIGHTSPEED Wireless',
            'Battery': '70 hours',
            'Polling Rate': '1000Hz'
        }
    },
    {
        id: 14,
        name: 'MATRIX 60',
        category: 'keyboard',
        price: 549,
        img: 'mechanic-k-75', // reuse existing image
        specs: {
            'Layout': '60% Compact',
            'Switches': 'Cherry MX Blue (clicky)',
            'Actuation Force': '60g',
            'Keycaps': 'ABS Double-shot',
            'Backlight': 'White LED',
            'Connection': 'Bluetooth 5.1 + USB-C',
            'Features': 'Portable, aluminum case'
        }
    },
    {
        id: 15,
        name: 'BASS CANNON X7',
        category: 'audio',
        price: 799,
        img: 'silent-predator', // reuse existing image
        specs: {
            'Driver': 'Dual 45mm + Bass enhancer',
            'Frequency': '5Hz - 40kHz',
            'Impedance': '48 Ohm',
            'Connection': 'Wireless + Wired',
            'Microphone': 'Retractable ClearCast',
            'Battery': '30 hours',
            'Weight': '340g',
            'Features': 'DTS Headphone:X 2.0, ChatMix dial'
        }
    }
];

/**
 * Generate responsive picture element with modern formats
 * @param {String} imgName - Base image filename (without extension)
 * @param {String} alt - Alt text
 * @returns {String} - Picture element HTML
 */
function generatePictureHTML(imgName, alt) {
    const basePath = 'assets/img/products';

    return `
        <picture>
            <source
                type="image/avif"
                srcset="${basePath}/${imgName}-300.avif 300w,
                        ${basePath}/${imgName}-600.avif 600w,
                        ${basePath}/${imgName}-900.avif 900w"
                sizes="(max-width: 480px) 300px, (max-width: 768px) 600px, 900px">

            <source
                type="image/webp"
                srcset="${basePath}/${imgName}-300.webp 300w,
                        ${basePath}/${imgName}-600.webp 600w,
                        ${basePath}/${imgName}-900.webp 900w"
                sizes="(max-width: 480px) 300px, (max-width: 768px) 600px, 900px">

            <img
                src="${basePath}/${imgName}-600.jpg"
                srcset="${basePath}/${imgName}-300.jpg 300w,
                        ${basePath}/${imgName}-600.jpg 600w,
                        ${basePath}/${imgName}-900.jpg 900w"
                sizes="(max-width: 480px) 300px, (max-width: 768px) 600px, 900px"
                alt="${alt}"
                class="product-img"
                loading="lazy"
                onerror="this.src='assets/img/placeholder.jpg'">
        </picture>
    `;
}

/* ----------------------------------------------------------------------------
   PAGINATION STATE
   ---------------------------------------------------------------------------- */
let currentPage = 1;
let currentProducts = products; // Currently filtered/searched products
let currentCategory = 'all';
let currentSearchQuery = '';

/**
 * Get products per page based on screen width
 * @returns {Number} - Number of products per page
 */
function getProductsPerPage() {
    const width = window.innerWidth;

    if (width >= 1400) {
        // 4 columns - show 8 products (2 rows)
        return 8;
    } else if (width >= 1024) {
        // 3 columns - show 6 products (2 rows)
        return 6;
    } else if (width >= 640) {
        // 2 columns - show 4 products (2 rows)
        return 4;
    } else {
        // 1 column - show 4 products
        return 4;
    }
}

/**
 * Get paginated products
 * @param {Array} allProducts - Full products array
 * @param {Number} page - Page number (1-based)
 * @returns {Object} - { items, totalPages, currentPage, totalItems, perPage }
 */
function getPaginatedProducts(allProducts, page = 1) {
    const perPage = getProductsPerPage();
    const totalItems = allProducts.length;
    const totalPages = Math.ceil(totalItems / perPage);
    const validPage = Math.max(1, Math.min(page, totalPages || 1));

    const startIndex = (validPage - 1) * perPage;
    const endIndex = startIndex + perPage;
    const items = allProducts.slice(startIndex, endIndex);

    return {
        items,
        totalPages,
        currentPage: validPage,
        totalItems,
        perPage
    };
}

/**
 * Render pagination controls
 * @param {Number} currentPage - Current page number
 * @param {Number} totalPages - Total number of pages
 */
function renderPagination(currentPage, totalPages) {
    let paginationContainer = document.getElementById('productPagination');

    // Create pagination container if it doesn't exist
    if (!paginationContainer) {
        const grid = document.getElementById('productGrid');
        if (!grid) return;

        paginationContainer = document.createElement('div');
        paginationContainer.id = 'productPagination';
        paginationContainer.className = 'pagination';
        grid.parentNode.insertBefore(paginationContainer, grid.nextSibling);
    }

    // Hide pagination if only one page
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        paginationContainer.classList.remove('visible');
        return;
    }

    paginationContainer.classList.add('visible');

    // Generate page numbers
    let pagesHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const activeClass = i === currentPage ? 'active' : '';
        pagesHTML += `<button class="pagination-page ${activeClass}" data-page="${i}">${i}</button>`;
    }

    paginationContainer.innerHTML = `
        <button class="pagination-btn pagination-prev" ${currentPage === 1 ? 'disabled' : ''} data-page="${currentPage - 1}">
            <span class="pagination-arrow">◄</span>
            <span class="pagination-text">PREV</span>
        </button>
        <div class="pagination-pages">
            ${pagesHTML}
        </div>
        <button class="pagination-btn pagination-next" ${currentPage === totalPages ? 'disabled' : ''} data-page="${currentPage + 1}">
            <span class="pagination-text">NEXT</span>
            <span class="pagination-arrow">►</span>
        </button>
        <span class="pagination-info">// PAGE ${currentPage} OF ${totalPages}</span>
    `;

    // Add event listeners
    paginationContainer.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const page = parseInt(e.currentTarget.dataset.page);
            if (page && !e.currentTarget.disabled) {
                goToPage(page);
            }
        });
    });
}

/**
 * Go to specific page
 * @param {Number} page - Page number
 * @param {Boolean} scroll - Whether to scroll to products section
 */
export function goToPage(page, scroll = true) {
    currentPage = page;
    renderProducts(currentProducts, page);

    // Scroll to top of products section
    if (scroll) {
        const arsenal = document.getElementById('arsenal');
        if (arsenal) {
            const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
            window.scrollTo({
                top: arsenal.offsetTop - headerHeight - 20,
                behavior: 'smooth'
            });
        }
    }
}

/**
 * Handle window resize - recalculate pagination
 */
let resizeTimeout;
function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Recalculate current page to avoid showing empty page
        const { totalPages } = getPaginatedProducts(currentProducts, currentPage);
        if (currentPage > totalPages) {
            currentPage = totalPages || 1;
        }
        renderProducts(currentProducts, currentPage);
    }, 250);
}

// Initialize resize listener
if (typeof window !== 'undefined') {
    window.addEventListener('resize', handleResize);
}

/**
 * Render products to the grid with pagination
 * @param {Array} productsToRender - Filtered products array
 * @param {Number} page - Page number (default: 1)
 */
export function renderProducts(productsToRender = products, page = 1) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    currentProducts = productsToRender;

    const { items, totalPages, currentPage: validPage, totalItems } = getPaginatedProducts(productsToRender, page);

    grid.innerHTML = '';

    if (items.length === 0) {
        grid.innerHTML = `
            <div class="no-products">
                <p class="text-code text-dim">[ NO_PRODUCTS_FOUND ]</p>
            </div>
        `;
        renderPagination(1, 1);
        return;
    }

    items.forEach((product, index) => {
        const card = createProductCard(product, index);
        grid.appendChild(card);
    });

    // Render pagination
    renderPagination(validPage, totalPages);

    // Trigger scroll reveal animations
    setTimeout(() => {
        document.querySelectorAll('.card.reveal').forEach(el => {
            el.classList.add('visible');
        });
    }, 100);
}

/**
 * Create a single product card element
 * @param {Object} product - Product data
 * @param {Number} index - Index for stagger animation
 * @returns {HTMLElement} - Product card element
 */
function createProductCard(product, index) {
    const card = document.createElement('div');
    card.className = 'card reveal';
    card.style.transitionDelay = `${index * 0.1}s`;
    card.dataset.productId = product.id;

    // Generate specs HTML
    const specsHTML = Object.entries(product.specs)
        .map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`)
        .join('');

    // Generate responsive picture element
    const pictureHTML = generatePictureHTML(product.img, product.name);

    // Generate badge HTML if exists
    const badgeHTML = product.badge
        ? `<span class="product-badge product-badge--${product.badge.toLowerCase()}">${product.badge}</span>`
        : '';

    card.innerHTML = `
        <div class="product-img-wrap" onclick="window.openQuickView(${product.id})" role="button" tabindex="0" aria-label="View ${product.name} details">
            ${badgeHTML}
            ${pictureHTML}
        </div>

        <div class="product-meta">
            <span class="product-id text-code">// ITEM_${String(product.id).padStart(3, '0')}</span>
            <span class="product-price">${product.price} PLN</span>
        </div>

        <h3 class="product-name">${product.name}</h3>

        <div class="product-actions">
            <button class="btn btn-secondary btn-specs" onclick="window.toggleProductSpecs(${product.id})">
                SPECS
            </button>
            <button class="btn btn-glitch btn-add-cart" onclick="window.addToCart(${product.id})">
                + INVENTORY
            </button>
        </div>

        <div class="product-specs" id="specs-${product.id}">
            <p class="specs-title">TECHNICAL_SPECIFICATIONS:</p>
            <ul class="specs-list">
                ${specsHTML}
            </ul>
        </div>
    `;

    return card;
}

/**
 * Toggle product specifications visibility
 * @param {Number} productId - Product ID
 */
export function toggleProductSpecs(productId) {
    const specsEl = document.getElementById(`specs-${productId}`);
    if (!specsEl) return;

    specsEl.classList.toggle('active');
}

/**
 * Filter products by category
 * @param {String} category - Category name or 'all'
 */
export function filterProducts(category) {
    currentCategory = category;
    currentPage = 1; // Reset to first page

    const filtered = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    // Apply search filter if active
    const finalFiltered = currentSearchQuery
        ? filtered.filter(p => p.name.toLowerCase().includes(currentSearchQuery))
        : filtered;

    renderProducts(finalFiltered, 1);
}

/**
 * Search products by name
 * @param {String} query - Search query
 * @returns {Number} - Number of results found
 */
export function searchProducts(query) {
    currentSearchQuery = query.toLowerCase().trim();
    currentPage = 1; // Reset to first page

    // Start with category filter
    let filtered = currentCategory === 'all'
        ? products
        : products.filter(p => p.category === currentCategory);

    // Apply search filter
    if (currentSearchQuery) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(currentSearchQuery)
        );
    }

    renderProducts(filtered, 1);

    return filtered.length;
}

/**
 * Get product by ID
 * @param {Number} id - Product ID
 * @returns {Object|undefined} - Product object
 */
export function getProductById(id) {
    return products.find(p => p.id === id);
}
