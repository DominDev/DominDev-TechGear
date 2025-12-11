/* ============================================================================
   FOG.JS - Subtle Floating Fog Effect
   ============================================================================ */

/**
 * Floating Fog Effect
 * Creates subtle, slowly drifting fog particles in the background
 */
export function initFog() {
    const canvas = document.getElementById('fogCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height;
    let fogParticles = [];
    let animationId;

    // Get responsive particle count (optimized for performance)
    function getFogCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) return 8;       // Mobile (reduced for performance)
        if (screenWidth < 768) return 12;      // Tablets (reduced for performance)
        if (screenWidth < 1200) return 18;     // Small laptops (reduced for performance)
        return 25;                             // Desktop (reduced from 40 for better performance)
    }

    // Fog configuration
    const config = {
        count: getFogCount(),
        colors: [
            'rgba(255, 119, 0, 0.06)',       // Even more subtle orange
            'rgba(0, 240, 255, 0.06)',       // Even more subtle cyan
            'rgba(255, 255, 255, 0.04)'      // Even more subtle white
        ]
    };

    // Resize canvas
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Update fog count on resize
        const newCount = getFogCount();
        if (newCount !== config.count) {
            config.count = newCount;
            initFogParticles();
        }
    }

    // Fog Particle class
    class FogParticle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            // Random position
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : Math.random() * height;

            // Size (larger, more expansive particles for better coverage)
            this.radius = Math.random() * 180 + 120; // 120-300px radius (increased from 80-200)

            // Slower, more fluid drift
            this.vx = (Math.random() - 0.5) * 0.15; // Slower horizontal drift (reduced from 0.3)
            this.vy = (Math.random() - 0.5) * 0.1; // Slower vertical drift (reduced from 0.2)

            // Opacity pulsing - more subtle range
            this.opacity = Math.random() * 0.25 + 0.15; // 0.15-0.4 (reduced from 0.2-0.5)
            this.opacityDir = (Math.random() - 0.5) * 0.0015; // Slower pulse (reduced from 0.002)

            // Color
            this.color = config.colors[Math.floor(Math.random() * config.colors.length)];

            // Longer lifetime for more fluid motion
            this.life = 0;
            this.maxLife = Math.random() * 800 + 500; // 500-1300 frames (increased from 300-800)
        }

        update() {
            // Drift movement
            this.x += this.vx;
            this.y += this.vy;

            // Opacity pulsing - adjusted range for more subtle effect
            this.opacity += this.opacityDir;
            if (this.opacity <= 0.08 || this.opacity >= 0.4) {
                this.opacityDir *= -1;
            }

            // Boundary wrapping
            if (this.x < -this.radius) this.x = width + this.radius;
            if (this.x > width + this.radius) this.x = -this.radius;
            if (this.y < -this.radius) this.y = height + this.radius;
            if (this.y > height + this.radius) this.y = -this.radius;

            // Lifetime
            this.life++;
            if (this.life > this.maxLife) {
                this.reset();
            }
        }

        draw() {
            // Create radial gradient for soft fog
            const gradient = ctx.createRadialGradient(
                this.x, this.y, 0,
                this.x, this.y, this.radius
            );

            const baseColor = this.color.replace(/[\d.]+\)$/, `${this.opacity})`);
            const fadeColor = this.color.replace(/[\d.]+\)$/, '0)');

            gradient.addColorStop(0, baseColor);
            gradient.addColorStop(0.4, baseColor);
            gradient.addColorStop(1, fadeColor);

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize fog particles
    function initFogParticles() {
        fogParticles = [];
        for (let i = 0; i < config.count; i++) {
            fogParticles.push(new FogParticle());
        }
    }

    // Animation loop with frame throttling for better performance
    let lastFrameTime = 0;
    const targetFPS = 30; // Fog runs at 30fps instead of 60fps for better performance
    const frameInterval = 1000 / targetFPS;

    function animate(currentTime = 0) {
        animationId = requestAnimationFrame(animate);

        // Throttle to 30fps for better performance
        const elapsed = currentTime - lastFrameTime;
        if (elapsed < frameInterval) return;

        lastFrameTime = currentTime - (elapsed % frameInterval);

        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw fog
        fogParticles.forEach(particle => {
            particle.update();
            particle.draw();
        });
    }

    // Handle resize
    window.addEventListener('resize', resize);

    // Initialize
    resize();
    initFogParticles();
    animate();

    // Pause when tab hidden (performance)
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        } else if (!animationId) {
            animate();
        }
    });
}
