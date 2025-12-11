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

    // Get responsive raindrop count based on screen size (optimized for performance)
    function getRainCount() {
        const screenWidth = window.innerWidth;
        if (screenWidth < 480) return 50;      // Mobile phones (reduced from 80)
        if (screenWidth < 768) return 80;      // Tablets (reduced from 120)
        if (screenWidth < 1200) return 120;    // Small laptops (reduced from 180)
        return 180;                            // Desktop (reduced from 320 for better performance)
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

            // Slightly higher opacity on desktop for better visibility
            const screenWidth = window.innerWidth;
            if (screenWidth >= 1200) {
                this.opacity = Math.random() * 0.35 + 0.5; // 0.5-0.85 on desktop (increased from 0.4-0.7)
            } else {
                this.opacity = Math.random() * 0.3 + 0.4; // 0.4-0.7 on smaller screens
            }

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

            // Random direction: 0 = vertical, 1 = diagonal right, -1 = diagonal left
            const directionChance = Math.random();
            if (directionChance < 0.65) {
                this.direction = 0; // 65% vertical
            } else if (directionChance < 0.825) {
                this.direction = 1; // 17.5% diagonal right
            } else {
                this.direction = -1; // 17.5% diagonal left
            }

            // Create jagged path down screen
            this.segments = [];
            this.createBoltPath();

            // Visual properties
            this.opacity = 0; // Start invisible for growth animation
            this.thickness = Math.random() * 2 + 2;

            // Only orange lightning (realistic) - keep color at full opacity to avoid pixelation
            this.color = 'rgba(255, 160, 64, 1)';

            // Timing and animation
            this.createdAt = Date.now();
            this.lifetime = config.lightning.boltDuration;
            this.flickerCount = 0;
            this.maxFlickers = 4 + Math.floor(Math.random() * 3); // 4-6 flickers

            // Growth animation (lightning develops from top to bottom)
            this.growthDuration = 150; // 150ms to fully grow
            this.currentSegment = 0; // Which segment we're currently drawing
        }

        createBoltPath() {
            let currentX = this.startX;
            let currentY = this.startY;

            // Responsive segment count and size based on screen width
            const screenWidth = window.innerWidth;
            let segments, zigzagRange, branchLength;

            if (screenWidth < 480) {
                // Mobile: smaller, fewer segments
                segments = 12 + Math.floor(Math.random() * 8); // 12-20 segments
                zigzagRange = 60; // Reduced zigzag
                branchLength = 2 + Math.floor(Math.random() * 2); // 2-4 branch segments
            } else if (screenWidth < 768) {
                // Tablet: medium size
                segments = 15 + Math.floor(Math.random() * 10); // 15-25 segments
                zigzagRange = 90;
                branchLength = 3 + Math.floor(Math.random() * 3); // 3-6 branch segments
            } else {
                // Desktop: full size
                segments = 18 + Math.floor(Math.random() * 15); // 18-33 segments
                zigzagRange = 140;
                branchLength = 4 + Math.floor(Math.random() * 5); // 4-8 branch segments
            }

            const segmentHeight = height / segments;

            // Diagonal drift per segment
            const diagonalDrift = this.direction * (15 + Math.random() * 10); // 15-25px drift per segment

            for (let i = 0; i < segments; i++) {
                // Add some randomness to X position (zigzag)
                const offsetX = (Math.random() - 0.5) * zigzagRange;
                const nextX = currentX + offsetX + diagonalDrift;
                const nextY = currentY + segmentHeight;

                this.segments.push({
                    x1: currentX,
                    y1: currentY,
                    x2: nextX,
                    y2: nextY
                });

                // Random branches (45% chance on desktop, 30% on mobile)
                const branchChance = screenWidth < 768 ? 0.7 : 0.55;
                if (Math.random() > branchChance && i > 3) {
                    let branchX = currentX;
                    let branchY = currentY;

                    // Branch direction (opposite to main bolt direction for more sprawl)
                    const branchDirection = Math.random() > 0.5 ? 1 : -1;

                    for (let j = 0; j < branchLength; j++) {
                        const branchOffsetX = (Math.random() - 0.5) * (zigzagRange * 0.6) + (branchDirection * 20);
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

            // Growth animation - lightning develops from top to bottom
            const growthProgress = Math.min(age / this.growthDuration, 1);
            this.currentSegment = Math.floor(growthProgress * this.segments.length);

            // Flicker effect - bolt "blinks" several times before disappearing
            const flickerStartProgress = 0.5; // Start flickering at 50% of lifetime (after growth)

            // Reduce max brightness on desktop
            const screenWidth = window.innerWidth;
            const maxBrightness = screenWidth >= 1200 ? 0.7 : 1; // 70% on desktop, 100% on mobile

            if (progress < flickerStartProgress) {
                // Full brightness during growth and hold phase (adjusted for desktop)
                this.opacity = maxBrightness;
            } else {
                // Flicker phase - rapid on/off cycles
                const flickerPhase = (progress - flickerStartProgress) / (1 - flickerStartProgress);
                const flickerSpeed = 8; // How fast it flickers
                const flickerValue = Math.sin(flickerPhase * Math.PI * flickerSpeed);

                // Gradually reduce maximum brightness during flickers (adjusted for desktop)
                const maxOpacity = maxBrightness - (flickerPhase * 0.3 * maxBrightness);

                // Create sharp on/off effect
                if (flickerValue > 0) {
                    this.opacity = maxOpacity;
                } else {
                    this.opacity = 0.1; // Almost off during "off" phase
                }

                // Final fade out at the very end
                if (progress > 0.95) {
                    this.opacity *= (1 - (progress - 0.95) / 0.05);
                }
            }

            return age < this.lifetime;
        }

        draw() {
            // Only draw segments that have "grown" so far
            this.segments.forEach((segment, index) => {
                // Skip segments that haven't appeared yet in growth animation
                if (index > this.currentSegment) return;

                // Main bolt glow - dimmer on desktop
                const screenWidth = window.innerWidth;
                if (screenWidth >= 1200) {
                    ctx.shadowBlur = 18; // Reduced on desktop
                } else {
                    ctx.shadowBlur = 25;
                }
                ctx.shadowColor = this.color;

                // Draw thicker glow - dimmer on desktop
                const glowOpacity = screenWidth >= 1200 ? 0.3 : 0.4;
                const glowThickness = screenWidth >= 1200 ? 4 : 5;
                ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity * glowOpacity})`);
                ctx.lineWidth = this.thickness * glowThickness;
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();

                // Draw main bolt
                ctx.strokeStyle = this.color.replace(/[\d.]+\)$/g, `${this.opacity})`);
                ctx.lineWidth = segment.isBranch ? this.thickness * 0.6 : this.thickness;
                ctx.beginPath();
                ctx.moveTo(segment.x1, segment.y1);
                ctx.lineTo(segment.x2, segment.y2);
                ctx.stroke();

                // Draw bright core - dimmer on desktop
                const coreOpacity = screenWidth >= 1200 ? this.opacity * 0.75 : this.opacity;
                ctx.strokeStyle = `rgba(255, 255, 255, ${coreOpacity})`;
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

        // Screen flash - dimmer on desktop
        lightning.active = true;
        const screenWidth = window.innerWidth;
        if (screenWidth >= 1200) {
            lightning.flashIntensity = 0.4 + Math.random() * 0.3; // 0.4-0.7 on desktop (dimmer)
        } else {
            lightning.flashIntensity = 0.6 + Math.random() * 0.4; // 0.6-1.0 on smaller screens
        }

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
        // Draw screen flash - realistic orange lightning glow
        if (lightning.active) {
            // Multiple layers for realistic orange flash
            const gradient1 = ctx.createRadialGradient(
                width / 2, height / 3, 0,
                width / 2, height / 3, width * 0.6
            );
            gradient1.addColorStop(0, `rgba(255, 200, 100, ${lightning.flashIntensity * 0.25})`);
            gradient1.addColorStop(0.3, `rgba(255, 150, 50, ${lightning.flashIntensity * 0.15})`);
            gradient1.addColorStop(0.6, `rgba(255, 119, 0, ${lightning.flashIntensity * 0.08})`);
            gradient1.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient1;
            ctx.fillRect(0, 0, width, height);

            // Additional bright orange overlay for intensity
            const gradient2 = ctx.createRadialGradient(
                width / 2, height / 4, 0,
                width / 2, height / 4, width * 0.4
            );
            gradient2.addColorStop(0, `rgba(255, 180, 80, ${lightning.flashIntensity * 0.2})`);
            gradient2.addColorStop(0.5, `rgba(255, 140, 40, ${lightning.flashIntensity * 0.1})`);
            gradient2.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.fillStyle = gradient2;
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
