// SPIDER v2.1 - Advanced Animations & Transitions
// Professional-grade animation system for stunning visual effects

class SpiderAnimations {
    constructor() {
        this.animationQueue = [];
        this.isAnimating = false;
        this.observers = new Map();
        
        this.init();
    }

    init() {
        this.setupIntersectionObservers();
        this.initScrollAnimations();
        this.initMouseFollower();
        this.initPageTransitions();
        this.setupPerformanceOptimizations();
        
        console.log('✨ SPIDER Animations System initialized');
    }

    setupIntersectionObservers() {
        // Fade In Animation Observer
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateFadeIn(entry.target);
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        // Slide Up Animation Observer
        const slideObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSlideUp(entry.target);
                    slideObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.2,
            rootMargin: '0px 0px -30px 0px'
        });

        // Scale Animation Observer
        const scaleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateScale(entry.target);
                    scaleObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.3
        });

        // Apply observers to elements
        this.applyObservers(fadeObserver, slideObserver, scaleObserver);
        
        // Store observers for cleanup
        this.observers.set('fade', fadeObserver);
        this.observers.set('slide', slideObserver);
        this.observers.set('scale', scaleObserver);
    }

    applyObservers(fadeObserver, slideObserver, scaleObserver) {
        // Fade animations
        const fadeElements = document.querySelectorAll(
            '.feature-card, .agent-card, .contact-form, .section-header'
        );
        fadeElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(20px)';
            fadeObserver.observe(el);
        });

        // Slide animations  
        const slideElements = document.querySelectorAll(
            '.hero-stats .stat-item, .demo-controls .control-group'
        );
        slideElements.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(40px)';
            el.style.transitionDelay = `${index * 0.1}s`;
            slideObserver.observe(el);
        });

        // Scale animations
        const scaleElements = document.querySelectorAll(
            '.agent-icon, .feature-icon, .btn'
        );
        scaleElements.forEach(el => {
            el.style.transform = 'scale(0.8)';
            el.style.opacity = '0';
            scaleObserver.observe(el);
        });
    }

    animateFadeIn(element) {
        element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add sparkle effect
        this.addSparkleEffect(element);
    }

    animateSlideUp(element) {
        element.style.transition = 'all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
        
        // Add subtle glow
        element.style.boxShadow = '0 4px 20px rgba(0, 255, 255, 0.15)';
        setTimeout(() => {
            element.style.boxShadow = '';
        }, 1000);
    }

    animateScale(element) {
        element.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        element.style.transform = 'scale(1)';
        element.style.opacity = '1';
    }

    addSparkleEffect(element) {
        const sparkles = [];
        const sparkleCount = 5;
        
        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle-effect';
            sparkle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: #00ffff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 1000;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: sparkle-float 2s ease-out forwards;
                box-shadow: 0 0 6px #00ffff;
            `;
            
            element.appendChild(sparkle);
            sparkles.push(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }

        // Add sparkle keyframes if not present
        if (!document.getElementById('sparkle-keyframes')) {
            const style = document.createElement('style');
            style.id = 'sparkle-keyframes';
            style.textContent = `
                @keyframes sparkle-float {
                    0% {
                        opacity: 1;
                        transform: translateY(0) scale(0);
                    }
                    50% {
                        opacity: 1;
                        transform: translateY(-20px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translateY(-40px) scale(0);
                    }
                }
            `;
            document.head.appendChild(style);
        }
    }

    initScrollAnimations() {
        let ticking = false;
        
        const updateScrollAnimations = () => {
            const scrolled = window.pageYOffset;
            const windowHeight = window.innerHeight;
            
            // Parallax background elements
            const parallaxElements = document.querySelectorAll('.floating-elements .float-element');
            parallaxElements.forEach((el, index) => {
                const speed = 0.1 + (index * 0.05);
                const yPos = scrolled * speed;
                el.style.transform = `translate3d(0, ${yPos}px, 0) rotate(${scrolled * 0.1}deg)`;
            });

            // Progress indicators
            this.updateProgressIndicators(scrolled);
            
            // Section-based animations
            this.updateSectionAnimations(scrolled, windowHeight);
            
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollAnimations);
                ticking = true;
            }
        }, { passive: true });
    }

    updateProgressIndicators(scrolled) {
        const progress = Math.min(scrolled / (document.documentElement.scrollHeight - window.innerHeight), 1);
        
        // Update scroll progress bar if exists
        let progressBar = document.getElementById('scroll-progress');
        if (!progressBar) {
            progressBar = document.createElement('div');
            progressBar.id = 'scroll-progress';
            progressBar.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                height: 3px;
                background: linear-gradient(90deg, #00ffff, #ff0080);
                z-index: 10001;
                transition: width 0.1s ease;
                box-shadow: 0 0 10px rgba(0, 255, 255, 0.5);
            `;
            document.body.appendChild(progressBar);
        }
        
        progressBar.style.width = `${progress * 100}%`;
    }

    updateSectionAnimations(scrolled, windowHeight) {
        const sections = document.querySelectorAll('section');
        
        sections.forEach((section, index) => {
            const rect = section.getBoundingClientRect();
            const isVisible = rect.top < windowHeight && rect.bottom > 0;
            
            if (isVisible) {
                const visibility = Math.min(Math.max((windowHeight - rect.top) / windowHeight, 0), 1);
                
                // Apply section-specific animations
                this.applySectionAnimation(section, visibility, index);
            }
        });
    }

    applySectionAnimation(section, visibility, index) {
        const sectionId = section.id;
        
        switch (sectionId) {
            case 'home':
                this.animateHeroSection(section, visibility);
                break;
            case 'agents':
                this.animateAgentsSection(section, visibility);
                break;
            case 'features':
                this.animateFeaturesSection(section, visibility);
                break;
            case 'demo':
                this.animateDemoSection(section, visibility);
                break;
        }
    }

    animateHeroSection(section, visibility) {
        const title = section.querySelector('.hero-title');
        const subtitle = section.querySelector('.hero-subtitle');
        
        if (title) {
            const scale = 1 + (visibility * 0.05);
            title.style.transform = `scale(${scale}) perspective(1000px) rotateX(${visibility * 2}deg)`;
        }
        
        if (subtitle) {
            const blur = (1 - visibility) * 2;
            subtitle.style.filter = `blur(${blur}px)`;
        }
    }

    animateAgentsSection(section, visibility) {
        const cards = section.querySelectorAll('.agent-card');
        
        cards.forEach((card, index) => {
            const delay = index * 0.1;
            const progress = Math.max(0, Math.min(visibility - delay, 1));
            
            if (progress > 0) {
                const rotationY = (1 - progress) * 45;
                card.style.transform = `perspective(1000px) rotateY(${rotationY}deg) translateZ(${progress * 20}px)`;
                card.style.opacity = progress;
            }
        });
    }

    animateFeaturesSection(section, visibility) {
        const features = section.querySelectorAll('.feature-card');
        
        features.forEach((feature, index) => {
            const wave = Math.sin(visibility * Math.PI + index) * 10;
            feature.style.transform = `translateY(${wave}px) rotate(${visibility * 2}deg)`;
        });
    }

    animateDemoSection(section, visibility) {
        const demoScreen = section.querySelector('.demo-screen');
        
        if (demoScreen) {
            const perspective = 1000 - (visibility * 200);
            const rotateX = (1 - visibility) * 15;
            demoScreen.style.transform = `perspective(${perspective}px) rotateX(${rotateX}deg)`;
        }
    }

    initMouseFollower() {
        // Create cursor follower
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        follower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #00ffff, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            mix-blend-mode: difference;
            transition: transform 0.1s ease;
            opacity: 0.7;
        `;
        document.body.appendChild(follower);

        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        // Smooth follow animation
        const animateFollower = () => {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            
            follower.style.left = `${followerX - 10}px`;
            follower.style.top = `${followerY - 10}px`;
            
            requestAnimationFrame(animateFollower);
        };
        animateFollower();

        // Interactive elements
        const interactiveElements = document.querySelectorAll('button, a, .agent-card, .feature-card');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                follower.style.transform = 'scale(2)';
                follower.style.background = 'radial-gradient(circle, #ff0080, transparent)';
            });
            
            el.addEventListener('mouseleave', () => {
                follower.style.transform = 'scale(1)';
                follower.style.background = 'radial-gradient(circle, #00ffff, transparent)';
            });
        });
    }

    initPageTransitions() {
        // Smooth page transitions for navigation
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('data-section');
                this.smoothNavigate(targetId);
            });
        });
    }

    smoothNavigate(targetId) {
        const targetSection = document.getElementById(targetId);
        if (!targetSection) return;

        // Add transition overlay
        const overlay = document.createElement('div');
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(45deg, rgba(0,255,255,0.1), rgba(255,0,128,0.1));
            backdrop-filter: blur(5px);
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
        `;
        document.body.appendChild(overlay);

        // Animate overlay
        setTimeout(() => overlay.style.opacity = '1', 10);
        
        // Navigate
        setTimeout(() => {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Remove overlay
            setTimeout(() => {
                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 300);
            }, 100);
        }, 200);
    }

    setupPerformanceOptimizations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableAnimations();
            return;
        }

        // Performance monitoring
        let animationFrameId;
        let lastTime = 0;
        
        const monitorPerformance = (currentTime) => {
            const deltaTime = currentTime - lastTime;
            
            if (deltaTime < 16) { // Less than 60 FPS
                this.reduceAnimationComplexity();
            }
            
            lastTime = currentTime;
            animationFrameId = requestAnimationFrame(monitorPerformance);
        };
        
        requestAnimationFrame(monitorPerformance);

        // Cleanup on page unload
        window.addEventListener('beforeunload', () => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
        });
    }

    disableAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        `;
        document.head.appendChild(style);
    }

    reduceAnimationComplexity() {
        // Reduce particle count and animation frequency
        if (window.spiderParticles) {
            window.spiderParticles.updateConfig({
                particles: {
                    number: { value: 75 } // Reduce from 150
                }
            });
        }

        // Disable some visual effects
        const follower = document.querySelector('.cursor-follower');
        if (follower) {
            follower.style.display = 'none';
        }
    }

    // Public methods for external control
    pauseAnimations() {
        document.body.style.animationPlayState = 'paused';
        this.isAnimating = false;
    }

    resumeAnimations() {
        document.body.style.animationPlayState = 'running';
        this.isAnimating = true;
    }

    triggerAnimation(element, animationType = 'fadeIn') {
        switch (animationType) {
            case 'fadeIn':
                this.animateFadeIn(element);
                break;
            case 'slideUp':
                this.animateSlideUp(element);
                break;
            case 'scale':
                this.animateScale(element);
                break;
        }
    }

    // Cleanup method
    destroy() {
        this.observers.forEach(observer => observer.disconnect());
        this.observers.clear();
        
        const follower = document.querySelector('.cursor-follower');
        if (follower) follower.remove();
        
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) progressBar.remove();
        
        console.log('🧹 SPIDER Animations cleaned up');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.spiderAnimations = new SpiderAnimations();
});

// Cleanup on page unload
window.addEventListener('beforeunload', () => {
    if (window.spiderAnimations) {
        window.spiderAnimations.destroy();
    }
});