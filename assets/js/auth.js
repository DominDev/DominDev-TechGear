/* ============================================================================
   AUTH.JS - Authentication Logic (Mock with localStorage)
   ============================================================================ */

const AUTH_STORAGE_KEY = 'techgear_auth';
const USERS_STORAGE_KEY = 'techgear_users';

let currentUser = loadAuthFromStorage();

/**
 * Hash password using Web Crypto API (SHA-256)
 * @param {String} password - Plain text password
 * @returns {Promise<String>} - Hex-encoded hash
 */
async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}

/**
 * Toggle authentication modal visibility
 */
export function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    const overlay = document.getElementById('overlayBg');

    modal.classList.toggle('active');
    overlay.classList.toggle('active');
}

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
export async function handleLogin(e) {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Validate inputs
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    // Get stored users
    const users = getStoredUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        alert('User not found. Please create an account.');
        return;
    }

    // Hash the entered password and compare with stored hash
    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
        alert('Incorrect password');
        return;
    }

    // Login successful
    loginUser(user);
    toggleAuthModal();

    // Clear form
    e.target.reset();
}

/**
 * Handle registration form submission
 * @param {Event} e - Form submit event
 */
export async function handleRegister(e) {
    e.preventDefault();

    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;

    // Validate inputs
    if (!email || !password) {
        alert('Please enter both email and password');
        return;
    }

    if (password.length < 6) {
        alert('Password must be at least 6 characters long');
        return;
    }

    // Check if user already exists
    const users = getStoredUsers();
    if (users.find(u => u.email === email)) {
        alert('User with this email already exists. Please login.');
        return;
    }

    // Hash password before storing
    const passwordHash = await hashPassword(password);

    // Create new user
    const newUser = {
        id: Date.now(),
        email: email,
        passwordHash: passwordHash, // Stored as SHA-256 hash
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveUsers(users);

    // Auto-login after registration
    loginUser(newUser);
    toggleAuthModal();

    // Clear form
    e.target.reset();

    alert('Account created successfully! Welcome to TechGear.');
}

/**
 * Login user (set current user and update UI)
 * @param {Object} user - User object
 */
function loginUser(user) {
    currentUser = {
        id: user.id,
        email: user.email
    };

    saveAuthToStorage();
    updateAuthUI();
}

/**
 * Logout current user
 */
export function logout() {
    const confirmed = confirm('Logout from your account?');
    if (!confirmed) return;

    currentUser = null;
    saveAuthToStorage();
    updateAuthUI();
}

/**
 * Update authentication UI (show/hide user info)
 */
export function updateAuthUI() {
    const userNameEl = document.getElementById('userName');
    const authToggle = document.getElementById('authToggle');

    if (!userNameEl || !authToggle) return;

    if (currentUser) {
        // User logged in
        const username = currentUser.email.split('@')[0].toUpperCase();
        userNameEl.textContent = `USER_${username}`;
        userNameEl.style.display = 'inline';

        // Change auth button to logout
        authToggle.innerHTML = `
            <span class="icon-user">👤</span>
            <span class="user-name text-cyan">${username}</span>
        `;
        authToggle.onclick = logout;
        authToggle.title = 'Logout';
    } else {
        // User not logged in
        userNameEl.style.display = 'none';
        authToggle.innerHTML = `<span class="icon-user">🔐</span>`;
        authToggle.onclick = toggleAuthModal;
        authToggle.title = 'Login or Register';
    }
}

/**
 * Get current logged-in user
 * @returns {Object|null} - Current user or null
 */
export function getCurrentUser() {
    return currentUser;
}

/**
 * Check if user is authenticated
 * @returns {Boolean}
 */
export function isAuthenticated() {
    return currentUser !== null;
}

/**
 * Get all stored users
 * @returns {Array} - Array of user objects
 */
function getStoredUsers() {
    try {
        const stored = localStorage.getItem(USERS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (error) {
        console.error('Failed to load users from localStorage:', error);
        return [];
    }
}

/**
 * Save users to localStorage
 * @param {Array} users - Users array
 */
function saveUsers(users) {
    try {
        localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
    } catch (error) {
        console.error('Failed to save users to localStorage:', error);
    }
}

/**
 * Save auth state to localStorage
 */
function saveAuthToStorage() {
    try {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
    } catch (error) {
        console.error('Failed to save auth to localStorage:', error);
    }
}

/**
 * Load auth state from localStorage
 * @returns {Object|null} - Current user or null
 */
function loadAuthFromStorage() {
    try {
        const stored = localStorage.getItem(AUTH_STORAGE_KEY);
        return stored ? JSON.parse(stored) : null;
    } catch (error) {
        console.error('Failed to load auth from localStorage:', error);
        return null;
    }
}

/**
 * Initialize authentication system
 */
export function initAuth() {
    updateAuthUI();

    // Auth toggle button
    const authToggle = document.getElementById('authToggle');
    const authFooterLink = document.getElementById('authFooterLink');

    if (authToggle) {
        authToggle.addEventListener('click', () => {
            if (!isAuthenticated()) {
                toggleAuthModal();
            } else {
                logout();
            }
        });
    }

    if (authFooterLink) {
        authFooterLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isAuthenticated()) {
                toggleAuthModal();
            }
        });
    }

    // Modal close button
    const authClose = document.getElementById('authClose');
    if (authClose) {
        authClose.addEventListener('click', toggleAuthModal);
    }

    // Form submissions
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('authModal');
            if (modal && modal.classList.contains('active')) {
                toggleAuthModal();
            }
        }
    });

    // Close modal when clicking overlay (only if auth modal is open)
    const overlay = document.getElementById('overlayBg');
    if (overlay) {
        overlay.addEventListener('click', () => {
            const authModal = document.getElementById('authModal');
            if (authModal && authModal.classList.contains('active')) {
                toggleAuthModal();
            }
        });
    }
}
