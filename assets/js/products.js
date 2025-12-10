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

/**
 * Render products to the grid
 * @param {Array} productsToRender - Filtered products array
 */
export function renderProducts(productsToRender = products) {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    grid.innerHTML = '';

    productsToRender.forEach((product, index) => {
        const card = createProductCard(product, index);
        grid.appendChild(card);
    });

    // Trigger scroll reveal animations
    setTimeout(() => {
        document.querySelectorAll('.card.reveal').forEach(el => {
            el.classList.add('active');
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

    card.innerHTML = `
        <div class="product-img-wrap">
            ${pictureHTML}
        </div>

        <div class="product-meta">
            <span class="product-id text-code">// ITEM_${String(product.id).padStart(3, '0')}</span>
            <span class="product-price">${product.price} PLN</span>
        </div>

        <h3 class="product-name">${product.name}</h3>

        <div class="product-actions">
            <button class="btn btn-specs" onclick="window.toggleProductSpecs(${product.id})">
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
    const filtered = category === 'all'
        ? products
        : products.filter(p => p.category === category);

    renderProducts(filtered);
}

/**
 * Search products by name
 * @param {String} query - Search query
 */
export function searchProducts(query) {
    const lowerQuery = query.toLowerCase().trim();

    if (!lowerQuery) {
        renderProducts(products);
        return;
    }

    const filtered = products.filter(p =>
        p.name.toLowerCase().includes(lowerQuery)
    );

    renderProducts(filtered);

    // Show message if no results
    if (filtered.length === 0) {
        const grid = document.getElementById('productGrid');
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 0;">
                <p class="text-code text-dim" style="font-size: 1.2rem;">
                    [ NO_RESULTS_FOUND ]
                </p>
                <p class="text-dim" style="margin-top: 1rem;">
                    Try searching for: mouse, keyboard, audio
                </p>
            </div>
        `;
    }
}

/**
 * Get product by ID
 * @param {Number} id - Product ID
 * @returns {Object|undefined} - Product object
 */
export function getProductById(id) {
    return products.find(p => p.id === id);
}
