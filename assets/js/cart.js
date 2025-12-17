/* ============================================================================
   CART.JS - Shopping Cart Logic with localStorage Persistence
   ============================================================================ */

import { getProductById } from './products.js';

const CART_STORAGE_KEY = 'techgear_cart';

// Cart state: Array of { id, qty, ...productData }
let cart = loadCartFromStorage();

/**
 * Toggle cart sidebar visibility
 */
export function toggleCart() {
    const sidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlayBg');

    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
}

/**
 * Add product to cart
 * @param {Number} productId - Product ID
 */
export function addToCart(productId) {
    // Validate product ID
    const id = Number(productId);
    if (!Number.isInteger(id) || id <= 0) {
        console.error(`Invalid product ID: ${productId}. Must be a positive integer.`);
        return;
    }

    const product = getProductById(id);
    if (!product) {
        console.error(`Product with ID ${id} not found`);
        return;
    }

    // Check if product already exists in cart
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.qty++;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            img: product.img,
            qty: 1
        });
    }

    saveCartToStorage();
    updateCartUI();
    toggleCart(); // Open cart to show feedback

    // Visual feedback on cart button
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.classList.remove('active');
        // Trigger reflow to restart animation
        void cartCount.offsetWidth;
        cartCount.classList.add('active');
    }
}

/**
 * Update quantity of cart item
 * @param {Number} productId - Product ID
 * @param {Number} change - Quantity change (+1 or -1)
 */
export function changeQty(productId, change) {
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex === -1) return;

    cart[itemIndex].qty += change;

    // Remove item if quantity drops to 0 or below
    if (cart[itemIndex].qty <= 0) {
        cart.splice(itemIndex, 1);
    }

    saveCartToStorage();
    updateCartUI();
}

/**
 * Remove item completely from cart
 * @param {Number} productId - Product ID
 */
export function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage();
    updateCartUI();
}

/**
 * Clear entire cart
 */
export function clearCart() {
    if (cart.length === 0) return;

    const confirmed = confirm('Clear entire inventory?');
    if (confirmed) {
        cart = [];
        saveCartToStorage();
        updateCartUI();
    }
}

/**
 * Update cart UI (sidebar content, counter, total)
 */
export function updateCartUI() {
    const container = document.getElementById('cartItemsContainer');
    const totalEl = document.getElementById('cartTotalValue');
    const countEl = document.getElementById('cartCount');

    if (!container || !totalEl || !countEl) return;

    // Clear container
    container.innerHTML = '';

    let grandTotal = 0;
    let totalCount = 0;

    if (cart.length === 0) {
        // Empty state
        container.innerHTML = `
            <div class="cart-empty">
                <p class="text-code text-dim">[ INVENTORY_EMPTY ]</p>
            </div>
        `;
    } else {
        // Render cart items
        cart.forEach(item => {
            grandTotal += item.price * item.qty;
            totalCount += item.qty;

            const row = createCartRow(item);
            container.appendChild(row);
        });
    }

    // Update total
    totalEl.textContent = `${grandTotal.toFixed(2)} PLN`;

    // Update counter badge
    countEl.textContent = totalCount;
    if (totalCount > 0) {
        countEl.classList.add('active');
    } else {
        countEl.classList.remove('active');
    }

    // Update mobile cart bar
    updateMobileCartBar(totalCount, grandTotal);
}

/**
 * Update mobile sticky cart bar
 * @param {Number} count - Total items count
 * @param {Number} total - Grand total price
 */
function updateMobileCartBar(count, total) {
    const mobileBar = document.getElementById('mobileCartBar');
    const mobileCount = document.getElementById('mobileCartCount');
    const mobileTotal = document.getElementById('mobileCartTotal');

    if (!mobileBar) return;

    // Update values
    if (mobileCount) mobileCount.textContent = count;
    if (mobileTotal) mobileTotal.textContent = `${total.toFixed(0)} PLN`;

    // Show/hide bar based on cart content
    if (count > 0) {
        mobileBar.classList.add('visible');
        document.body.classList.add('cart-bar-visible');
    } else {
        mobileBar.classList.remove('visible');
        document.body.classList.remove('cart-bar-visible');
    }
}

/**
 * Create a cart item row element
 * @param {Object} item - Cart item
 * @returns {HTMLElement} - Cart row element
 */
function createCartRow(item) {
    const row = document.createElement('div');
    row.className = 'cart-item-row';

    // Generate proper image path (item.img is just the filename now)
    const imgSrc = `assets/img/products/${item.img}-600.jpg`;

    row.innerHTML = `
        <img src="${imgSrc}"
             alt="${item.name}"
             class="cart-img"
             loading="lazy"
             onerror="this.src='assets/img/placeholder.jpg'">

        <div class="cart-info">
            <div class="cart-name">${item.name}</div>
            <div class="cart-price">
                ${item.price} PLN
                <span class="cart-qty">x ${item.qty}</span>
            </div>
        </div>

        <div class="cart-controls">
            <button class="qty-btn" onclick="window.changeQty(${item.id}, -1)" aria-label="Decrease quantity">
                −
            </button>
            <span class="cart-qty-value">${item.qty}</span>
            <button class="qty-btn" onclick="window.changeQty(${item.id}, 1)" aria-label="Increase quantity">
                +
            </button>
            <button class="qty-btn remove" onclick="window.removeItem(${item.id})" aria-label="Remove item">
                ✕
            </button>
        </div>
    `;

    return row;
}

/**
 * Handle checkout (placeholder for future integration)
 */
export function handleCheckout() {
    if (cart.length === 0) {
        alert('Your inventory is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    // Placeholder - replace with actual payment integration
    alert(`Checkout initiated!\n\nTotal: ${total.toFixed(2)} PLN\n\nThis is a demo. Payment integration coming soon.`);

    // Optional: Clear cart after successful checkout
    // cart = [];
    // saveCartToStorage();
    // updateCartUI();
}

/**
 * Save cart to localStorage
 */
function saveCartToStorage() {
    try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (error) {
        console.error('Failed to save cart to localStorage:', error);
    }
}

/**
 * Load cart from localStorage
 * @returns {Array} - Cart items
 */
function loadCartFromStorage() {
    try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
        return [];
    }
}

/**
 * Get current cart state
 * @returns {Array} - Current cart items
 */
export function getCart() {
    return cart;
}

/**
 * Initialize cart on page load
 */
export function initCart() {
    updateCartUI();

    // NOTE: Overlay click handler is managed by initOverlay() in main.js
    // to avoid duplicate listeners and conflicts with auth modal

    // Close cart button
    const cartClose = document.getElementById('cartClose');
    if (cartClose) {
        cartClose.addEventListener('click', toggleCart);
    }

    // Cart toggle button
    const cartToggle = document.getElementById('cartToggle');
    if (cartToggle) {
        cartToggle.addEventListener('click', toggleCart);
    }

    // Mobile cart bar button
    const mobileCartBtn = document.getElementById('mobileCartBtn');
    if (mobileCartBtn) {
        mobileCartBtn.addEventListener('click', toggleCart);
    }

    // Checkout button
    const checkoutBtn = document.getElementById('checkoutBtn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', handleCheckout);
    }

    // Close cart on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const sidebar = document.getElementById('cartSidebar');
            if (sidebar && sidebar.classList.contains('active')) {
                toggleCart();
            }
        }
    });
}
