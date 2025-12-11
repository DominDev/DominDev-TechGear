/* ============================================================================
   PARALLAX.JS - Parallax Scrolling Effects
   ============================================================================ */

/**
 * Initialize parallax effect for hero section
 * Creates smooth parallax movement on scroll
 */
export function initParallax() {
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg-image');
    const heroContent = document.querySelector('.hero-content-wrapper');
    const heroGeo = document.querySelectorAll('.hero-geometric');

    if (!hero || !heroBg || !heroContent) return;

    let ticking = false;

    /**
     * Update parallax positions based on scroll
     */
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const heroHeight = hero.offsetHeight;

        // Only apply parallax if we're within hero section
        if (scrolled <= heroHeight) {
            // Background moves slower (0.5x speed) - parallax effect
            const bgTransform = scrolled * 0.5;
            heroBg.style.transform = `translateY(${bgTransform}px)`;

            // Content moves slower (0.3x speed) for depth
            const contentTransform = scrolled * 0.3;
            heroContent.style.transform = `translateY(${contentTransform}px)`;

            // Fade out content as we scroll
            const opacity = 1 - (scrolled / heroHeight) * 1.5;
            heroContent.style.opacity = Math.max(0, opacity);

            // Geometric shapes move at different speeds for depth
            heroGeo.forEach((geo, index) => {
                const speed = 0.2 + (index * 0.1); // Different speeds: 0.2, 0.3, 0.4
                const transform = scrolled * speed;
                geo.style.transform = `translateY(${transform}px)`;
            });
        }

        ticking = false;
    }

    /**
     * Request animation frame for smooth performance
     */
    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    // Listen to scroll events
    window.addEventListener('scroll', requestTick, { passive: true });

    // Initial update
    updateParallax();
}

/**
 * Mouse parallax effect for hero
 * Creates subtle movement based on mouse position
 */
export function initMouseParallax() {
    const heroContent = document.querySelector('.hero-content-wrapper');
    const heroGeo = document.querySelectorAll('.hero-geometric');

    if (!heroContent) return;

    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth - 0.5) * 2; // -1 to 1
        mouseY = (e.clientY / window.innerHeight - 0.5) * 2; // -1 to 1
    });

    /**
     * Animate parallax smoothly with lerp (linear interpolation)
     */
    function animate() {
        // Smooth lerp for natural movement
        currentX += (mouseX - currentX) * 0.05;
        currentY += (mouseY - currentY) * 0.05;

        // Apply subtle movement to content (max 20px)
        const moveX = currentX * 20;
        const moveY = currentY * 20;

        if (heroContent) {
            heroContent.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }

        // Geometric shapes move more (max 40px) for depth
        heroGeo.forEach((geo, index) => {
            const multiplier = 1.5 + (index * 0.5); // Different amounts
            const geoMoveX = currentX * 40 * multiplier;
            const geoMoveY = currentY * 40 * multiplier;
            geo.style.transform = `translate(${geoMoveX}px, ${geoMoveY}px)`;
        });

        requestAnimationFrame(animate);
    }

    animate();
}
