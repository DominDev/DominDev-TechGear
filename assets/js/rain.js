/* ============================================================================
   RAIN.JS - Cyberpunk Rain Effect for Hero Section
   ============================================================================ */

/**
 * Cyberpunk Rain Effect
 * Creates falling rain drops with depth and glow (like example)
 */
export function initRain() {
    const canvas = document.getElementById('rainCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height;
    let drops = [];

    // Get responsive drop count based on screen size
    function getDropCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) return 40;     // Mobile phones
        if (screenWidth < 768) return 60;     // Tablets
        if (screenWidth < 1200) return 90;    // Small laptops
        return 120;                           // Desktop
    }

    // Rain configuration
    const config = {
        count: getDropCount(),               // Number of drops (responsive)
        colors: [
            'rgba(255, 119, 0, 0.8)',        // Tactical Orange
            'rgba(0, 240, 255, 0.8)',        // System Cyan
            'rgba(255, 136, 32, 0.9)',       // Orange Bright
            'rgba(51, 246, 255, 0.9)'        // Cyan Bright
        ],
        speedBase: 12,                       // Base speed
        lengthBase: 25                       // Base length
    };

    // Resize canvas to window size
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Update drop count on resize
        const newCount = getDropCount();
        if (newCount !== config.count) {
            config.count = newCount;
            initRainDrops();
        }
    }

    // Drop class
    class Drop {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            // If initial, spread across screen, else start above
            this.y = initial ? Math.random() * height : -50;
            this.z = Math.random() * 0.6 + 0.4;  // Depth (affects size and speed)
            this.len = (Math.random() * 25 + config.lengthBase) * this.z;
            this.speed = (Math.random() * 8 + config.speedBase) * this.z;
            this.opacity = Math.random() * 0.5 + 0.3;

            // Random color (favor orange and cyan)
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
            this.y += this.speed;
            if (this.y > height + 50) {
                this.reset();
            }
        }

        draw() {
            ctx.beginPath();
            ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
            ctx.lineWidth = 2 * this.z;
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.len);
            ctx.stroke();

            // Glow effect on some drops
            if (Math.random() > 0.97) {
                ctx.shadowBlur = 15 * this.z;
                ctx.shadowColor = this.color;
                ctx.stroke();
                ctx.shadowBlur = 0;
            }
        }
    }

    // Initialize rain drops
    function initRainDrops() {
        drops = [];
        for (let i = 0; i < config.count; i++) {
            drops.push(new Drop());
        }
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw each drop
        drops.forEach(drop => {
            drop.update();
            drop.draw();
        });

        requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener('resize', () => {
        resize();
        // Optionally reinit drops on resize
    });

    // Initialize
    resize();
    initRainDrops();
    animate();

    // Pause when tab hidden (performance)
    let animationId;
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
