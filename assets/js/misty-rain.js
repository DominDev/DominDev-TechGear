/* ============================================================================
   MISTY-RAIN.JS - Fine Rain with Lightning Bolts
   ============================================================================ */

/**
 * Fine Rain Effect with Animated Lightning
 * Creates visible fine rain particles with occasional lightning bolts across screen
 */
export function initMistyRain() {
    const canvas = document.getElementById('rainCanvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    let width, height;
    let raindrops = [];
    let animationId;

    // Lightning bolt state
    let lightning = {
        active: false,
        bolts: [],
        nextStrike: 0,
        flashIntensity: 0
    };

    // Get responsive raindrop count based on screen size
    function getRainCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) return 80;      // Mobile phones
        if (screenWidth < 768) return 120;     // Tablets
        if (screenWidth < 1200) return 180;    // Small laptops
        return 250;                            // Desktop
    }

    // Rain configuration
    const config = {
        count: getRainCount(),
        colors: [
            'rgba(255, 119, 0, 0.6)',        // Tactical Orange
            'rgba(0, 240, 255, 0.6)',        // System Cyan
            'rgba(255, 136, 32, 0.7)',       // Orange Bright
            'rgba(51, 246, 255, 0.7)'        // Cyan Bright
        ],
        speedBase: 4,                        // Base falling speed
        lengthMin: 8,                        // Min raindrop length
        lengthMax: 15,                       // Max raindrop length
        lightning: {
            minInterval: 6000,               // Min 6 seconds between lightning
            maxInterval: 12000,              // Max 12 seconds between lightning
            flashDuration: 200,              // Screen flash duration
            boltDuration: 300                // Lightning bolt visible duration
        }
    };

    // Resize canvas to window size
    function resize() {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        // Update rain count on resize
        const newCount = getRainCount();
        if (newCount !== config.count) {
            config.count = newCount;
            initRain();
        }
    }

    // Raindrop class
    class Raindrop {
        constructor() {
            this.reset(true);
        }

        reset(initial = false) {
            this.x = Math.random() * width;
            this.y = initial ? Math.random() * height : -20;
            this.speed = Math.random() * 3 + config.speedBase;
            this.length = Math.random() * (config.lengthMax - config.lengthMin) + config.lengthMin;
            this.opacity = Math.random() * 0.3 + 0.4;
            this.width = Math.random() * 0.5 + 0.5;

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
            if (this.y > height + 20) {
                this.reset();
            }
        }

        draw() {
            ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
            ctx.lineWidth = this.width;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x, this.y + this.length);
            ctx.stroke();
        }
    }

    // Lightning Bolt class
    class LightningBolt {
        constructor() {
            // Random starting point at top of screen
            this.startX = Math.random() * width;
            this.startY = 0;

            // Create jagged path down screen
            this.segments = [];
            this.createBoltPath();

            // Visual properties
            this.opacity = 1;
            this.thickness = Math.random() * 2 + 2;
            this.color = Math.random() > 0.5 ?
                'rgba(0, 240, 255, 1)' :
                'rgba(255, 119, 0, 1)';

            // Timing
            this.createdAt = Date.now();
            this.lifetime = config.lightning.boltDuration;
        }

        createBoltPath() {
            let currentX = this.startX;
            let currentY = this.startY;
            const segments = 15 + Math.floor(Math.random() * 10); // 15-25 segments
            const segmentHeight = height / segments;

            for (let i = 0; i < segments; i++) {
                // Add some randomness to X position (zigzag)
                const offsetX = (Math.random() - 0.5) * 80;
                const nextX = currentX + offsetX;
                const nextY = currentY + segmentHeight;

                this.segments.push({
                    x1: currentX,
                    y1: currentY,
                    x2: nextX,
                    y2: nextY
                });

                // Random branches (30% chance)
                if (Math.random() > 0.7 && i > 3) {
                    const branchLength = 3 + Math.floor(Math.random() * 3);
                    let branchX = currentX;
                    let branchY = currentY;

                    for (let j = 0; j < branchLength; j++) {
                        const branchOffsetX = (Math.random() - 0.5) * 60;
                        const branchNextX = branchX + branchOffsetX;
                        const branchNextY = branchY + segmentHeight * 0.7;

                        this.segments.push({
                            x1: branchX,
                            y1: branchY,
                            x2: branchNextX,
                            y2: branchNextY,
                            isBranch: true
                        });

                        branchX = branchNextX;
                        branchY = branchNextY;
                    }
                }

                currentX = nextX;
                currentY = nextY;
            }
        }

        update() {
            const age = Date.now() - this.createdAt;
            const progress = age / this.lifetime;

            // Fade out
            this.opacity = Math.max(0, 1 - progress);

            return age < this.lifetime;
        }

        draw() {
            this.segments.forEach(segment => {
                // Main bolt glow
                ctx.shadowBlur = 20;
                ctx.shadowColor = this.color;

                // Draw thicker glow
                ctx.strokeStyle = this.color.replace('1)', `${this.opacity * 0.3})`);
                ctx.lineWidth = this.thickness * 4;
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();

                // Draw main bolt
                ctx.strokeStyle = this.color.replace('1)', `${this.opacity})`);
                ctx.lineWidth = segment.isBranch ? this.thickness * 0.6 : this.thickness;
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();

                // Draw bright core
                ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`;
                ctx.lineWidth = segment.isBranch ? this.thickness * 0.3 : this.thickness * 0.5;
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();
            });

            ctx.shadowBlur = 0;
        }
    }

    // Initialize raindrops
    function initRain() {
        raindrops = [];
        for (let i = 0; i < config.count; i++) {
            raindrops.push(new Raindrop());
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
    }

    // Trigger lightning strike
    function triggerLightning() {
        // Create 1-3 lightning bolts
        const boltCount = Math.floor(Math.random() * 3) + 1;
        lightning.bolts = [];

        for (let i = 0; i < boltCount; i++) {
            // Stagger bolt creation slightly
            setTimeout(() => {
                lightning.bolts.push(new LightningBolt());
            }, i * 50);
        }

        // Screen flash
        lightning.active = true;
        lightning.flashIntensity = 0.6 + Math.random() * 0.4;

        // End flash after duration
        setTimeout(() => {
            lightning.active = false;
        }, config.lightning.flashDuration);

        // Schedule next strike
        scheduleLightning();
    }

    // Update lightning
    function updateLightning() {
        const now = Date.now();

        // Check if it's time for lightning
        if (now >= lightning.nextStrike && lightning.bolts.length === 0) {
            triggerLightning();
        }

        // Update and remove dead bolts
        lightning.bolts = lightning.bolts.filter(bolt => bolt.update());
    }

    // Draw lightning effects
    function drawLightning() {
        // Draw screen flash
        if (lightning.active) {
            const gradient = ctx.createRadialGradient(
                width / 2, height / 3, 0,
                width / 2, height / 3, width
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${lightning.flashIntensity * 0.15})`);
            gradient.addColorStop(0.4, `rgba(0, 240, 255, ${lightning.flashIntensity * 0.08})`);
            gradient.addColorStop(0.7, `rgba(255, 119, 0, ${lightning.flashIntensity * 0.05})`);
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, width, height);
        }

        // Draw lightning bolts
        lightning.bolts.forEach(bolt => bolt.draw());
    }

    // Animation loop
    function animate() {
        // Clear canvas
        ctx.clearRect(0, 0, width, height);

        // Update and draw rain
        raindrops.forEach(drop => {
            drop.update();
            drop.draw();
        });

        // Update and draw lightning
        updateLightning();
        drawLightning();

        animationId = requestAnimationFrame(animate);
    }

    // Handle resize
    window.addEventListener('resize', resize);

    // Initialize
    resize();
    initRain();
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
