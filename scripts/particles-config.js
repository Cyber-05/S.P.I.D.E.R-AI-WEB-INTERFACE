// SPIDER v2.1 - Advanced Particles Configuration
// Enhanced particle system for immersive background effects

class SpiderParticles {
    constructor() {
        this.config = {
            particles: {
                number: {
                    value: 150,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: ['#00ffff', '#0080ff', '#ff0080', '#ff6b35']
                },
                shape: {
                    type: ['circle', 'triangle', 'polygon'],
                    stroke: {
                        width: 0,
                        color: '#000000'
                    },
                    polygon: {
                        nb_sides: 6
                    }
                },
                opacity: {
                    value: 0.4,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 0.8,
                        opacity_min: 0.1,
                        sync: false
                    }
                },
                size: {
                    value: 3,
                    random: true,
                    anim: {
                        enable: true,
                        speed: 2,
                        size_min: 0.5,
                        sync: false
                    }
                },
                line_linked: {
                    enable: true,
                    distance: 120,
                    color: '#00ffff',
                    opacity: 0.2,
                    width: 1,
                    shadow: {
                        enable: true,
                        color: '#00ffff',
                        blur: 5
                    }
                },
                move: {
                    enable: true,
                    speed: 1.5,
                    direction: 'none',
                    random: true,
                    straight: false,
                    out_mode: 'bounce',
                    bounce: true,
                    attract: {
                        enable: true,
                        rotateX: 600,
                        rotateY: 1200
                    }
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: ['grab', 'bubble']
                    },
                    onclick: {
                        enable: true,
                        mode: 'repulse'
                    },
                    resize: true
                },
                modes: {
                    grab: {
                        distance: 140,
                        line_linked: {
                            opacity: 0.8,
                            color: '#00ffff'
                        }
                    },
                    bubble: {
                        distance: 200,
                        size: 8,
                        duration: 0.4,
                        opacity: 0.8,
                        speed: 3
                    },
                    repulse: {
                        distance: 150,
                        duration: 0.4
                    }
                }
            },
            retina_detect: true,
            fps_limit: 60,
            background: {
                color: 'transparent'
            }
        };

        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initParticles());
        } else {
            this.initParticles();
        }
    }

    initParticles() {
        // Check if particles.js is loaded
        if (typeof particlesJS === 'undefined') {
            console.warn('Particles.js not loaded, skipping particle initialization');
            return;
        }

        const particlesContainer = document.getElementById('particles-js');
        if (!particlesContainer) {
            console.warn('Particles container not found');
            return;
        }

        // Initialize particles
        particlesJS('particles-js', this.config);

        // Add custom particle effects
        this.addCustomEffects();
        
        // Bind scroll effects
        this.bindScrollEffects();

        console.log('✅ SPIDER Particles initialized successfully');
    }

    addCustomEffects() {
        // Add aurora effect
        this.createAuroraEffect();
        
        // Add floating orbs
        this.createFloatingOrbs();
    }

    createAuroraEffect() {
        const aurora = document.createElement('div');
        aurora.id = 'aurora-effect';
        aurora.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            background: 
                radial-gradient(ellipse 800px 600px at 10% 80%, rgba(0, 255, 255, 0.15) 0%, transparent 50%),
                radial-gradient(ellipse 600px 800px at 90% 20%, rgba(255, 0, 128, 0.1) 0%, transparent 50%),
                radial-gradient(ellipse 400px 300px at 50% 50%, rgba(0, 128, 255, 0.08) 0%, transparent 50%);
            animation: aurora-flow 15s ease-in-out infinite;
        `;

        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.appendChild(aurora);
        }

        // Add keyframe animation
        if (!document.getElementById('aurora-keyframes')) {
            const style = document.createElement('style');
            style.id = 'aurora-keyframes';
            style.textContent = `
                @keyframes aurora-flow {
                    0%, 100% {
                        filter: hue-rotate(0deg) brightness(1);
                        transform: scale(1) rotate(0deg);
                    }
                    25% {
                        filter: hue-rotate(90deg) brightness(1.2);
                        transform: scale(1.1) rotate(3deg);
                    }
                    50% {
                        filter: hue-rotate(180deg) brightness(0.8);
                        transform: scale(0.9) rotate(-2deg);
                    }
                    75% {
                        filter: hue-rotate(270deg) brightness(1.1);
                        transform: scale(1.05) rotate(1deg);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    createFloatingOrbs() {
        const orbCount = 12;
        const heroSection = document.querySelector('.hero-section');
        
        if (!heroSection) return;

        for (let i = 0; i < orbCount; i++) {
            const orb = document.createElement('div');
            orb.className = 'floating-orb';
            orb.style.cssText = `
                position: absolute;
                width: ${Math.random() * 6 + 4}px;
                height: ${Math.random() * 6 + 4}px;
                background: ${i % 2 === 0 ? 
                    'radial-gradient(circle, #00ffff 0%, transparent 70%)' : 
                    'radial-gradient(circle, #ff0080 0%, transparent 70%)'
                };
                border-radius: 50%;
                pointer-events: none;
                z-index: 2;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: float-orb ${15 + Math.random() * 10}s ease-in-out infinite;
                animation-delay: ${Math.random() * 5}s;
                opacity: 0.6;
                box-shadow: 0 0 20px currentColor;
            `;

            heroSection.appendChild(orb);
        }

        // Add orb animation keyframes
        if (!document.getElementById('orb-keyframes')) {
            const style = document.createElement('style');
            style.id = 'orb-keyframes';
            style.textContent = `
                @keyframes float-orb {
                    0%, 100% {
                        transform: translateY(0px) translateX(0px) scale(1);
                        opacity: 0.3;
                    }
                    25% {
                        transform: translateY(-30px) translateX(15px) scale(1.2);
                        opacity: 0.8;
                    }
                    50% {
                        transform: translateY(-10px) translateX(-20px) scale(0.8);
                        opacity: 0.5;
                    }
                    75% {
                        transform: translateY(-40px) translateX(10px) scale(1.1);
                        opacity: 0.7;
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    bindScrollEffects() {
        let ticking = false;
        
        const updateParticlesOnScroll = () => {
            const scrollTop = window.pageYOffset;
            const scrollPercent = scrollTop / (document.documentElement.scrollHeight - window.innerHeight);
            
            // Update particle opacity based on scroll
            const particlesContainer = document.getElementById('particles-js');
            if (particlesContainer) {
                const opacity = Math.max(0.1, 1 - scrollPercent * 1.5);
                particlesContainer.style.opacity = opacity;
            }

            // Update aurora effect
            const aurora = document.getElementById('aurora-effect');
            if (aurora) {
                const intensity = Math.max(0.1, 1 - scrollPercent);
                aurora.style.opacity = intensity;
                aurora.style.transform = `translateY(${scrollPercent * 100}px) scale(${1 + scrollPercent * 0.2})`;
            }

            // Update floating orbs
            const orbs = document.querySelectorAll('.floating-orb');
            orbs.forEach((orb, index) => {
                const delay = index * 0.1;
                const movement = scrollPercent * (50 + index * 10);
                orb.style.transform = `translateY(${movement}px) translateX(${Math.sin(scrollPercent * 5 + delay) * 20}px)`;
                orb.style.opacity = Math.max(0.1, 0.8 - scrollPercent);
            });

            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateParticlesOnScroll);
                ticking = true;
            }
        });
    }

    // Method to update particle configuration dynamically
    updateConfig(newConfig) {
        this.config = { ...this.config, ...newConfig };
        this.initParticles();
    }

    // Method to pause/resume particles
    toggleParticles() {
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            const currentDisplay = particlesContainer.style.display;
            particlesContainer.style.display = currentDisplay === 'none' ? 'block' : 'none';
        }
    }

    // Method to change particle color theme
    setColorTheme(colors) {
        this.config.particles.color.value = colors;
        this.config.particles.line_linked.color = colors[0];
        this.initParticles();
    }

    // Cleanup method
    destroy() {
        // Remove aurora effect
        const aurora = document.getElementById('aurora-effect');
        if (aurora) aurora.remove();

        // Remove floating orbs
        const orbs = document.querySelectorAll('.floating-orb');
        orbs.forEach(orb => orb.remove());

        // Remove style elements
        const auroraKeyframes = document.getElementById('aurora-keyframes');
        if (auroraKeyframes) auroraKeyframes.remove();

        const orbKeyframes = document.getElementById('orb-keyframes');
        if (orbKeyframes) orbKeyframes.remove();

        console.log('🧹 SPIDER Particles cleaned up');
    }
}

// Initialize particles system
document.addEventListener('DOMContentLoaded', () => {
    window.spiderParticles = new SpiderParticles();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.spiderParticles) {
        window.spiderParticles.destroy();
    }
});

// Export for potential external usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SpiderParticles;
}