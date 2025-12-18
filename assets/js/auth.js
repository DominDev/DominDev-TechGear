/* ============================================================================
   AUTH.JS - Authentication Logic (Mock with localStorage)
   ============================================================================ */

const AUTH_STORAGE_KEY = 'techgear_auth';
const USERS_STORAGE_KEY = 'techgear_users';

let currentUser = loadAuthFromStorage();
let focusTrapHandler = null;

// Password requirements configuration
const PASSWORD_REQUIREMENTS = {
    minLength: 8,
    requireUppercase: true,
    requireLowercase: true,
    requireNumber: true
};

/**
 * Enable focus trap inside modal for accessibility
 * @param {HTMLElement} modal - Modal element
 */
function enableFocusTrap(modal) {
    const focusableElements = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusableArray = Array.from(focusableElements).filter(el => {
        // Only include visible elements
        return el.offsetParent !== null && !el.closest('.auth-view-hidden');
    });
    const firstElement = focusableArray[0];
    const lastElement = focusableArray[focusableArray.length - 1];

    focusTrapHandler = (e) => {
        if (e.key !== 'Tab') return;

        if (e.shiftKey) {
            if (document.activeElement === firstElement) {
                e.preventDefault();
                lastElement.focus();
            }
        } else {
            if (document.activeElement === lastElement) {
                e.preventDefault();
                firstElement.focus();
            }
        }
    };

    modal.addEventListener('keydown', focusTrapHandler);
}

/**
 * Disable focus trap
 */
function disableFocusTrap() {
    if (focusTrapHandler) {
        const modal = document.getElementById('authModal');
        if (modal) {
            modal.removeEventListener('keydown', focusTrapHandler);
        }
        focusTrapHandler = null;
    }
}

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
 * Switch between login and register views
 * @param {String} view - 'login' or 'register'
 */
function switchAuthView(view) {
    const loginView = document.getElementById('loginView');
    const registerView = document.getElementById('registerView');

    if (view === 'register') {
        loginView.classList.add('auth-view-hidden');
        registerView.classList.remove('auth-view-hidden');
        // Focus first input in register form
        setTimeout(() => {
            const firstInput = registerView.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    } else {
        registerView.classList.add('auth-view-hidden');
        loginView.classList.remove('auth-view-hidden');
        // Focus first input in login form
        setTimeout(() => {
            const firstInput = loginView.querySelector('input');
            if (firstInput) firstInput.focus();
        }, 100);
    }

    // Clear all form inputs and feedback
    clearAllForms();

    // Re-enable focus trap for new view
    const modal = document.getElementById('authModal');
    disableFocusTrap();
    enableFocusTrap(modal);
}

/**
 * Clear all form inputs and feedback messages
 */
function clearAllForms() {
    // Clear all inputs
    const inputs = document.querySelectorAll('.auth-modal input');
    inputs.forEach(input => {
        input.value = '';
        input.classList.remove('input-error', 'input-success');
    });

    // Clear all feedback messages
    const feedbacks = document.querySelectorAll('.auth-modal .form-feedback');
    feedbacks.forEach(fb => {
        fb.textContent = '';
        fb.classList.remove('error', 'success');
    });

    // Reset password requirements
    const reqItems = document.querySelectorAll('.password-requirements li');
    reqItems.forEach(item => {
        item.classList.remove('met');
        const icon = item.querySelector('.req-icon');
        if (icon) icon.textContent = '○';
    });
}

/**
 * Validate email format
 * @param {String} email - Email address
 * @returns {Boolean}
 */
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

/**
 * Check password requirements
 * @param {String} password - Password string
 * @returns {Object} - { isValid, checks }
 */
function checkPasswordRequirements(password) {
    const checks = {
        length: password.length >= PASSWORD_REQUIREMENTS.minLength,
        uppercase: /[A-Z]/.test(password),
        lowercase: /[a-z]/.test(password),
        number: /[0-9]/.test(password)
    };

    const isValid = checks.length && checks.uppercase && checks.lowercase && checks.number;

    return { isValid, checks };
}

/**
 * Update password requirements UI
 * @param {Object} checks - Requirement checks object
 */
function updatePasswordRequirementsUI(checks) {
    const reqLength = document.getElementById('reqLength');
    const reqUppercase = document.getElementById('reqUppercase');
    const reqLowercase = document.getElementById('reqLowercase');
    const reqNumber = document.getElementById('reqNumber');

    const updateReq = (element, met) => {
        if (!element) return;
        const icon = element.querySelector('.req-icon');
        if (met) {
            element.classList.add('met');
            if (icon) icon.textContent = '●';
        } else {
            element.classList.remove('met');
            if (icon) icon.textContent = '○';
        }
    };

    updateReq(reqLength, checks.length);
    updateReq(reqUppercase, checks.uppercase);
    updateReq(reqLowercase, checks.lowercase);
    updateReq(reqNumber, checks.number);
}

/**
 * Set input state and feedback
 * @param {HTMLInputElement} input - Input element
 * @param {String} feedbackId - Feedback element ID
 * @param {String} state - 'error', 'success', or 'neutral'
 * @param {String} message - Feedback message
 */
function setInputState(input, feedbackId, state, message = '') {
    const feedback = document.getElementById(feedbackId);

    // Reset classes
    input.classList.remove('input-error', 'input-success');
    if (feedback) {
        feedback.classList.remove('error', 'success');
        feedback.textContent = message;
    }

    // Apply new state
    if (state === 'error') {
        input.classList.add('input-error');
        if (feedback) feedback.classList.add('error');
    } else if (state === 'success') {
        input.classList.add('input-success');
        if (feedback) feedback.classList.add('success');
    }
}

/**
 * Validate login form fields
 * @returns {Boolean}
 */
function validateLoginForm() {
    const emailInput = document.getElementById('loginEmail');
    const passwordInput = document.getElementById('loginPassword');
    let isValid = true;

    // Validate email
    if (!emailInput.value.trim()) {
        setInputState(emailInput, 'loginEmailFeedback', 'error', 'EMAIL_REQUIRED');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        setInputState(emailInput, 'loginEmailFeedback', 'error', 'INVALID_EMAIL_FORMAT');
        isValid = false;
    } else {
        setInputState(emailInput, 'loginEmailFeedback', 'neutral');
    }

    // Validate password
    if (!passwordInput.value) {
        setInputState(passwordInput, 'loginPasswordFeedback', 'error', 'PASSWORD_REQUIRED');
        isValid = false;
    } else {
        setInputState(passwordInput, 'loginPasswordFeedback', 'neutral');
    }

    return isValid;
}

/**
 * Validate register form fields
 * @returns {Boolean}
 */
function validateRegisterForm() {
    const emailInput = document.getElementById('registerEmail');
    const passwordInput = document.getElementById('registerPassword');
    const confirmInput = document.getElementById('registerPasswordConfirm');
    let isValid = true;

    // Validate email
    if (!emailInput.value.trim()) {
        setInputState(emailInput, 'registerEmailFeedback', 'error', 'EMAIL_REQUIRED');
        isValid = false;
    } else if (!isValidEmail(emailInput.value.trim())) {
        setInputState(emailInput, 'registerEmailFeedback', 'error', 'INVALID_EMAIL_FORMAT');
        isValid = false;
    } else {
        // Check if user already exists
        const users = getStoredUsers();
        if (users.find(u => u.email === emailInput.value.trim())) {
            setInputState(emailInput, 'registerEmailFeedback', 'error', 'EMAIL_ALREADY_EXISTS');
            isValid = false;
        } else {
            setInputState(emailInput, 'registerEmailFeedback', 'success', 'EMAIL_AVAILABLE');
        }
    }

    // Validate password
    const { isValid: passwordValid, checks } = checkPasswordRequirements(passwordInput.value);
    updatePasswordRequirementsUI(checks);

    if (!passwordInput.value) {
        setInputState(passwordInput, 'registerPasswordFeedback', 'error', 'PASSWORD_REQUIRED');
        isValid = false;
    } else if (!passwordValid) {
        setInputState(passwordInput, 'registerPasswordFeedback', 'error', 'PASSWORD_TOO_WEAK');
        isValid = false;
    } else {
        setInputState(passwordInput, 'registerPasswordFeedback', 'success', 'PASSWORD_STRONG');
    }

    // Validate password confirmation
    if (!confirmInput.value) {
        setInputState(confirmInput, 'registerPasswordConfirmFeedback', 'error', 'CONFIRM_PASSWORD_REQUIRED');
        isValid = false;
    } else if (confirmInput.value !== passwordInput.value) {
        setInputState(confirmInput, 'registerPasswordConfirmFeedback', 'error', 'PASSWORDS_DO_NOT_MATCH');
        isValid = false;
    } else {
        setInputState(confirmInput, 'registerPasswordConfirmFeedback', 'success', 'PASSWORDS_MATCH');
    }

    return isValid;
}

/**
 * Toggle authentication modal visibility
 */
export function toggleAuthModal() {
    const modal = document.getElementById('authModal');
    const overlay = document.getElementById('overlayBg');

    const isOpening = !modal.classList.contains('active');

    modal.classList.toggle('active');
    overlay.classList.toggle('active');

    if (isOpening) {
        // Reset to login view when opening
        switchAuthView('login');
        enableFocusTrap(modal);
    } else {
        disableFocusTrap();
        clearAllForms();
    }
}

/**
 * Handle login form submission
 * @param {Event} e - Form submit event
 */
export async function handleLogin(e) {
    e.preventDefault();

    // Validate form
    if (!validateLoginForm()) {
        return;
    }

    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    // Get stored users
    const users = getStoredUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
        setInputState(
            document.getElementById('loginEmail'),
            'loginEmailFeedback',
            'error',
            'USER_NOT_FOUND'
        );
        return;
    }

    // Hash the entered password and compare with stored hash
    const passwordHash = await hashPassword(password);
    if (user.passwordHash !== passwordHash) {
        setInputState(
            document.getElementById('loginPassword'),
            'loginPasswordFeedback',
            'error',
            'INCORRECT_PASSWORD'
        );
        return;
    }

    // Login successful
    loginUser(user);
    toggleAuthModal();
    e.target.reset();
}

/**
 * Handle registration form submission
 * @param {Event} e - Form submit event
 */
export async function handleRegister(e) {
    e.preventDefault();

    // Validate form
    if (!validateRegisterForm()) {
        return;
    }

    const email = document.getElementById('registerEmail').value.trim();
    const password = document.getElementById('registerPassword').value;

    // Hash password before storing
    const passwordHash = await hashPassword(password);

    // Create new user
    const newUser = {
        id: Date.now(),
        email: email,
        passwordHash: passwordHash,
        createdAt: new Date().toISOString()
    };

    const users = getStoredUsers();
    users.push(newUser);
    saveUsers(users);

    // Auto-login after registration
    loginUser(newUser);
    toggleAuthModal();
    e.target.reset();

    // Show success feedback (could be enhanced with a toast notification)
    console.log('Account created successfully! Welcome to TechGear.');
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
    const userNameMobileEl = document.getElementById('userNameMobile');
    const authToggle = document.getElementById('authToggle');
    const authToggleMobile = document.getElementById('authToggleMobile');

    const username = currentUser ? currentUser.email.split('@')[0].toUpperCase() : '';

    // Update desktop auth button
    if (authToggle) {
        if (currentUser) {
            if (userNameEl) {
                userNameEl.textContent = `USER_${username}`;
                userNameEl.classList.remove('user-hidden');
            }

            authToggle.innerHTML = `
                <svg class="icon-user" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="user-name text-cyan">${username}</span>
            `;
            authToggle.onclick = logout;
            authToggle.title = 'Logout';
        } else {
            if (userNameEl) {
                userNameEl.classList.add('user-hidden');
            }

            authToggle.innerHTML = `
                <svg class="icon-user" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
            `;
            authToggle.onclick = toggleAuthModal;
            authToggle.title = 'Login or Register';
        }
    }

    // Update mobile auth button
    if (authToggleMobile) {
        if (currentUser) {
            if (userNameMobileEl) {
                userNameMobileEl.textContent = username;
                userNameMobileEl.classList.remove('user-hidden');
            }

            authToggleMobile.innerHTML = `
                <svg class="icon-user" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="text-code">LOGOUT</span>
                <span class="user-name text-cyan">${username}</span>
            `;
            authToggleMobile.onclick = logout;
            authToggleMobile.title = 'Logout';
        } else {
            if (userNameMobileEl) {
                userNameMobileEl.classList.add('user-hidden');
            }

            authToggleMobile.innerHTML = `
                <svg class="icon-user" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                </svg>
                <span class="text-code">LOGIN</span>
            `;
            authToggleMobile.onclick = () => {
                toggleAuthModal();
                const navMenu = document.querySelector('.nav-menu');
                const hamburger = document.querySelector('.hamburger');
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    hamburger.classList.remove('active');
                    document.body.style.overflow = '';
                }
            };
            authToggleMobile.title = 'Login or Register';
        }
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
 * Setup real-time validation for registration form
 */
function setupRealtimeValidation() {
    const registerPassword = document.getElementById('registerPassword');
    const registerPasswordConfirm = document.getElementById('registerPasswordConfirm');
    const registerEmail = document.getElementById('registerEmail');

    // Real-time password validation
    if (registerPassword) {
        registerPassword.addEventListener('input', () => {
            const { checks } = checkPasswordRequirements(registerPassword.value);
            updatePasswordRequirementsUI(checks);

            // Also check confirmation match if it has a value
            if (registerPasswordConfirm && registerPasswordConfirm.value) {
                if (registerPasswordConfirm.value === registerPassword.value) {
                    setInputState(registerPasswordConfirm, 'registerPasswordConfirmFeedback', 'success', 'PASSWORDS_MATCH');
                } else {
                    setInputState(registerPasswordConfirm, 'registerPasswordConfirmFeedback', 'error', 'PASSWORDS_DO_NOT_MATCH');
                }
            }
        });
    }

    // Real-time password confirmation validation
    if (registerPasswordConfirm) {
        registerPasswordConfirm.addEventListener('input', () => {
            if (!registerPasswordConfirm.value) {
                setInputState(registerPasswordConfirm, 'registerPasswordConfirmFeedback', 'neutral');
            } else if (registerPasswordConfirm.value === registerPassword.value) {
                setInputState(registerPasswordConfirm, 'registerPasswordConfirmFeedback', 'success', 'PASSWORDS_MATCH');
            } else {
                setInputState(registerPasswordConfirm, 'registerPasswordConfirmFeedback', 'error', 'PASSWORDS_DO_NOT_MATCH');
            }
        });
    }

    // Real-time email validation (on blur to avoid annoying validation while typing)
    if (registerEmail) {
        registerEmail.addEventListener('blur', () => {
            if (registerEmail.value.trim()) {
                if (!isValidEmail(registerEmail.value.trim())) {
                    setInputState(registerEmail, 'registerEmailFeedback', 'error', 'INVALID_EMAIL_FORMAT');
                } else {
                    // Check if email exists
                    const users = getStoredUsers();
                    if (users.find(u => u.email === registerEmail.value.trim())) {
                        setInputState(registerEmail, 'registerEmailFeedback', 'error', 'EMAIL_ALREADY_EXISTS');
                    } else {
                        setInputState(registerEmail, 'registerEmailFeedback', 'success', 'EMAIL_AVAILABLE');
                    }
                }
            }
        });
    }
}

/**
 * Initialize authentication system
 */
export function initAuth() {
    updateAuthUI();

    // Footer auth link
    const authFooterLink = document.getElementById('authFooterLink');
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

    // View toggle buttons
    const showRegisterBtn = document.getElementById('showRegister');
    const showLoginBtn = document.getElementById('showLogin');

    if (showRegisterBtn) {
        showRegisterBtn.addEventListener('click', () => switchAuthView('register'));
    }

    if (showLoginBtn) {
        showLoginBtn.addEventListener('click', () => switchAuthView('login'));
    }

    // Setup real-time validation
    setupRealtimeValidation();

    // Close modal on Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('authModal');
            if (modal && modal.classList.contains('active')) {
                toggleAuthModal();
            }
        }
    });
}
