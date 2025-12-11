/* ============================================================================
   MISTY-RAIN.JS - Atmospheric Mist with Thunderstorm Effects
   ============================================================================ */

/**
 * Misty Rain Effect with Lightning
 * Creates subtle mist particles with occasional lightning flashes
 */
export function initMistyRain() {
    const canvas = document.getElementById('rainCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height;
    let mist = [];
    let animationId;

    // Lightning state
    let lightning = {
        active: false,
        intensity: 0,
        nextStrike: 0,
        flashCount: 0,
        flashesRemaining: 0
    };

    // Get responsive mist particle count based on screen size
    function getMistCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) return 30;     // Mobile phones
        if (screenWidth < 768) return 50;     // Tablets
        if (screenWidth < 1200) return 80;    // Small laptops
        return 100;                           // Desktop
    }

    // Mist configuration
    const config = {
        count: getMistCount(),
        colors: [
            'rgba(255, 119, 0, 0.15)',       // Tactical Orange (very subtle)
            'rgba(0, 240, 255, 0.15)',       // System Cyan (very subtle)
            'rgba(255, 136, 32, 0.2)',       // Orange Bright
            'rgba(51, 246, 255, 0.2)'        // Cyan Bright
        ],
        speedBase: 0.3,                      // Very slow drift
        particleSize: { min: 1, max: 3 },    // Small particles
        lightning: {
            minInterval: 8000,               // Min 8 seconds between storms
            maxInterval: 15000,              // Max 15 seconds between storms
            flashDuration: 150,              // Each flash lasts 150ms
            minFlashes: 1,                   // Minimum flashes per storm
            maxFlashes: 3                    // Maximum flashes per storm
        }
    };

    // Resize canvas to window size
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Update mist count on resize
        const newCount = getMistCount();
        if (newCount !== config.count) {
            config.count = newCount;
            initMist();
        }
    }

    // Mist Particle class
    class MistParticle {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            // If initial, spread across screen, else start at random edge
            if (initial) {
                this.y = Math.random() * height;
            } else {
                // Start from top or sides randomly
                const edge = Math.random();
                if (edge < 0.7) {
                    this.y = -10;
                    this.x = Math.random() * width;
                } else {
                    this.y = Math.random() * height;
                    this.x = Math.random() < 0.5 ? -10 : width + 10;
                }
            }

            // Movement properties
            this.speedY = Math.random() * 0.3 + config.speedBase;
            this.speedX = (Math.random() - 0.5) * 0.5; // Slight horizontal drift
            this.size = Math.random() * (config.particleSize.max - config.particleSize.min) + config.particleSize.min;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.wobble = Math.random() * 0.02;
            this.wobbleOffset = Math.random() * Math.PI * 2;

            // Random color
            const colorPick = Math.random();
            if (colorPick < 0.4) {
                this.color = config.colors[0]; // Orange
            } else if (colorPick < 0.8) {
                this.color = config.colors[1]; // Cyan
            } else if (colorPick < 0.9) {
                this.color = config.colors[2]; // Orange bright
            } else {
                this.color = config.colors[3]; // Cyan bright
            }
        }

        update() {
            // Wobble effect for organic movement
            this.wobbleOffset += this.wobble;
            this.x += this.speedX + Math.sin(this.wobbleOffset) * 0.3;
            this.y += this.speedY;

            // Reset if out of bounds
            if (this.y > height + 10 || this.x < -10 || this.x > width + 10) {
                this.reset();
            }
        }

        draw() {
            // Draw as a soft circle
            const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size);

            // Lightning brightness boost
            let brightness = lightning.active ? lightning.intensity : 1;
            let adjustedOpacity = this.opacity * brightness;

            gradient.addColorStop(0, this.color.replace(/[\d.]+\)$/g, `${adjustedOpacity})`));
            gradient.addColorStop(1, this.color.replace(/[\d.]+\)$/g, '0)'));

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    // Initialize mist particles
    function initMist() {
        mist = [];
        for (let i = 0; i < config.count; i++) {
            mist.push(new MistParticle());
        }

        // Schedule first lightning
        scheduleLightning();
    }

    // Schedule next lightning strike
    function scheduleLightning() {
        const interval = Math.random() *
            (config.lightning.maxInterval - config.lightning.minInterval) +
            config.lightning.minInterval;

        lightning.nextStrike = Date.now() + interval;
        lightning.flashesRemaining = Math.floor(
            Math.random() * (config.lightning.maxFlashes - config.lightning.minFlashes + 1)
        ) + config.lightning.minFlashes;
    }

    // Update lightning effect
    function updateLightning() {
        const now = Date.now();

        // Check if it's time for a lightning strike
        if (!lightning.active && now >= lightning.nextStrike) {
            if (lightning.flashesRemaining > 0) {
                // Start a flash
                lightning.active = true;
                lightning.intensity = 0.3 + Math.random() * 0.4; // Random intensity
                lightning.flashCount = 0;

                // Flash will auto-end after duration
                setTimeout(() => {
                    lightning.active = false;
                    lightning.flashesRemaining--;

                    // Schedule next flash in this storm (quick succession)
                    if (lightning.flashesRemaining > 0) {
                        lightning.nextStrike = now + 100 + Math.random() * 300;
                    } else {
                        // Storm over, schedule next storm
                        scheduleLightning();
                    }
                }, config.lightning.flashDuration);
            }
        }

        // Draw lightning flash overlay
        if (lightning.active) {
            // Add white flash overlay
            ctx.fillStyle = `rgba(255, 255, 255, ${lightning.intensity * 0.08})`;
            ctx.fillRect(0, 0, width, height);

            // Add cyan/orange glow
            const gradient = ctx.createRadialGradient(
                width / 2, height / 3, 0,
                width / 2, height / 3, width
            );
            gradient.addColorStop(0, `rgba(0, 240, 255, ${lightning.intensity * 0.15})`);
            gradient.addColorStop(0.5, `rgba(255, 119, 0, ${lightning.intensity * 0.08})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw each mist particle
        mist.forEach(particle => {
            particle.update();
            particle.draw();
        });

        // Update and draw lightning
        updateLightning();

        animationId = requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener('resize', resize);

    // Initialize
    resize();
    initMist();
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
