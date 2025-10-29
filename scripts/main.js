// SPIDER v2.1 - Main Interactive JavaScript
// Advanced frontend functionality with smooth animations and interactions

class SpiderMainApp {
    constructor() {
        this.isLoaded = false;
        this.currentSection = 'home';
        this.agents = [
            {
                id: 'coding',
                name: 'Coding Agent',
                description: 'Full-Stack Developer with 3D web capabilities',
                status: 'online'
            },
            {
                id: 'design',
                name: 'Design Agent',
                description: 'UI/UX Specialist with glassmorphism effects',
                status: 'online'
            },
            {
                id: 'mobile',
                name: 'Mobile Agent',
                description: 'Wireless ADB Controller and App Manager',
                status: 'online'
            },
            {
                id: 'teaching',
                name: 'Teaching Agent',
                description: 'Educational Master with systematic courses',
                status: 'online'
            },
            {
                id: 'powerbi',
                name: 'PowerBI Agent',
                description: 'Analytics Expert with advanced dashboards',
                status: 'online'
            },
            {
                id: 'word',
                name: 'Word Agent',
                description: 'Document Specialist with AI content generation',
                status: 'online'
            }
        ];
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initLoading();
        this.initScrollEffects();
        this.initAnimations();
        this.initAgentInteractions();
        this.initDemo();
        this.initContactForm();
        
        console.log('🚀 SPIDER v2.1 Main App initialized');
    }

    bindEvents() {
        // Navigation
        this.bindNavigation();
        
        // Mobile menu
        this.bindMobileMenu();
        
        // Hero actions
        this.bindHeroActions();
        
        // Window events
        window.addEventListener('resize', () => this.handleResize());
        window.addEventListener('scroll', () => this.handleScroll());
        
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
    }

    initLoading() {
        const loadingScreen = document.getElementById('loading-screen');
        const progressBar = document.querySelector('.progress-bar');
        
        if (!loadingScreen) return;

        // Simulate loading progression
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15 + 5;
            if (progress > 100) progress = 100;
            
            if (progressBar) {
                progressBar.style.width = progress + '%';
            }
            
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingScreen.classList.add('hidden');
                    this.isLoaded = true;
                    this.startMainAnimations();
                }, 500);
            }
        }, 200);
    }

    startMainAnimations() {
        // Trigger hero animations
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('loaded');
        }

        // Animate stats counter
        this.animateStats();
        
        // Start type writer effect for hero subtitle
        this.typeWriterEffect();
    }

    animateStats() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const increment = target / 60;
                    let current = 0;
                    
                    const updateNumber = () => {
                        current += increment;
                        if (current < target) {
                            entry.target.textContent = Math.floor(current);
                            requestAnimationFrame(updateNumber);
                        } else {
                            entry.target.textContent = target;
                        }
                    };
                    
                    updateNumber();
                    observer.unobserve(entry.target);
                }
            });
        });

        statNumbers.forEach(stat => observer.observe(stat));
    }

    typeWriterEffect() {
        const subtitle = document.querySelector('.hero-subtitle');
        if (!subtitle) return;

        const text = subtitle.innerHTML;
        subtitle.innerHTML = '';
        subtitle.style.opacity = '1';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                subtitle.innerHTML = text.slice(0, i + 1);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        setTimeout(typeWriter, 1000);
    }

    bindNavigation() {
        const navLinks = document.querySelectorAll('.nav-links a');
        
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('data-section');
                this.navigateToSection(targetSection);
            });
        });
    }

    navigateToSection(section) {
        const targetElement = document.getElementById(section);
        if (!targetElement) return;

        // Update active nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        document.querySelector(`[data-section="${section}"]`).classList.add('active');

        // Smooth scroll to section
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

        this.currentSection = section;
    }

    bindMobileMenu() {
        const navToggle = document.querySelector('.nav-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (!navToggle || !navLinks) return;

        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
    }

    bindHeroActions() {
        const launchBtn = document.querySelector('.btn-launch');
        const exploreBtn = document.querySelector('.btn-explore');

        if (launchBtn) {
            launchBtn.addEventListener('click', () => {
                this.navigateToSection('demo');
                this.startDemo();
            });
        }

        if (exploreBtn) {
            exploreBtn.addEventListener('click', () => {
                this.navigateToSection('agents');
            });
        }
    }

    initScrollEffects() {
        // Parallax effects
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = document.querySelectorAll('.parallax');
            const speed = 0.5;

            parallax.forEach(element => {
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });

        // Section reveal animations
        const sections = document.querySelectorAll('section');
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    initAnimations() {
        // GSAP timeline for complex animations
        if (typeof gsap !== 'undefined') {
            // Hero animation timeline
            const heroTl = gsap.timeline({ delay: 3.5 });
            
            heroTl.from('.hero-badge', { opacity: 0, y: 30, duration: 0.8 })
                  .from('.hero-title .title-line', { opacity: 0, y: 50, duration: 1 }, '-=0.4')
                  .from('.hero-title .title-version', { opacity: 0, scale: 0, duration: 0.6 }, '-=0.2')
                  .from('.hero-subtitle', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
                  .from('.hero-stats', { opacity: 0, y: 40, duration: 0.8 }, '-=0.2')
                  .from('.hero-actions', { opacity: 0, y: 40, duration: 0.8 }, '-=0.2')
                  .from('.hero-scroll', { opacity: 0, y: 20, duration: 0.6 }, '-=0.2');

            // Floating elements animation
            gsap.to('.float-element', {
                y: '-20px',
                duration: 3,
                ease: 'power2.inOut',
                stagger: 0.2,
                repeat: -1,
                yoyo: true
            });
        }
    }

    initAgentInteractions() {
        const agentCards = document.querySelectorAll('.agent-card');
        
        agentCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.onAgentHover(card);
            });
            
            card.addEventListener('mouseleave', () => {
                this.onAgentLeave(card);
            });

            // Agent activation buttons
            const activateBtn = card.querySelector('.btn-agent');
            if (activateBtn) {
                activateBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const agentId = activateBtn.getAttribute('data-agent-id');
                    this.activateAgent(agentId);
                });
            }
        });
    }

    onAgentHover(card) {
        // Add glow effect
        card.style.filter = 'brightness(1.1)';
        card.style.transform = 'translateY(-5px)';
        
        // Animate tech tags
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach((tag, index) => {
            setTimeout(() => {
                tag.style.transform = 'scale(1.1)';
            }, index * 100);
        });
    }

    onAgentLeave(card) {
        card.style.filter = 'brightness(1)';
        card.style.transform = 'translateY(0)';
        
        const techTags = card.querySelectorAll('.tech-tag');
        techTags.forEach(tag => {
            tag.style.transform = 'scale(1)';
        });
    }

    activateAgent(agentId) {
        const agent = this.agents.find(a => a.id === agentId);
        if (!agent) return;

        // Show activation notification
        this.showNotification(`${agent.name} Activated!`, 'success');
        
        // Add visual feedback
        const card = document.querySelector(`[data-agent="${agentId}"]`);
        if (card) {
            card.classList.add('activated');
            setTimeout(() => {
                card.classList.remove('activated');
            }, 2000);
        }

        // Simulate agent response
        setTimeout(() => {
            this.showNotification(`${agent.name}: Ready to assist! 🚀`, 'info');
        }, 1500);
    }

    initDemo() {
        const startDemoBtn = document.querySelector('.btn-start-demo');
        const agentButtons = document.querySelectorAll('.agent-btn[data-demo-agent]');
        const cmdButtons = document.querySelectorAll('.cmd-btn');

        if (startDemoBtn) {
            startDemoBtn.addEventListener('click', () => {
                this.startDemo();
            });
        }

        agentButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.selectDemoAgent(btn.getAttribute('data-demo-agent'));
            });
        });

        cmdButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.executeCommand(btn.getAttribute('data-command'));
            });
        });
    }

    startDemo() {
        const demoScreen = document.querySelector('.demo-screen');
        const placeholder = document.querySelector('.demo-placeholder');
        
        if (!demoScreen || !placeholder) return;

        // Replace placeholder with demo interface
        placeholder.innerHTML = `
            <div class="demo-active">
                <div class="demo-header">
                    <div class="demo-status online">
                        <span class="status-dot"></span>
                        <span>SPIDER v2.1 Online</span>
                    </div>
                </div>
                <div class="demo-console">
                    <div class="console-line">
                        <span class="prompt">spider@v2.1:~$</span>
                        <span class="cursor">|</span>
                    </div>
                </div>
                <div class="demo-metrics">
                    <div class="metric">
                        <span class="metric-label">Response Time</span>
                        <span class="metric-value">300ms</span>
                    </div>
                    <div class="metric">
                        <span class="metric-label">Active Agents</span>
                        <span class="metric-value">6/6</span>
                    </div>
                </div>
            </div>
        `;

        // Add demo CSS if not present
        this.addDemoCSS();
        
        // Start demo animation
        this.animateDemo();
    }

    selectDemoAgent(agentId) {
        const buttons = document.querySelectorAll('.agent-btn[data-demo-agent]');
        buttons.forEach(btn => btn.classList.remove('active'));
        
        const selectedBtn = document.querySelector(`[data-demo-agent="${agentId}"]`);
        if (selectedBtn) {
            selectedBtn.classList.add('active');
        }

        this.showNotification(`Selected ${agentId.toUpperCase()} Agent for demo`, 'info');
    }

    executeCommand(command) {
        const console = document.querySelector('.demo-console');
        if (!console) return;

        // Add command to console
        const commandLine = document.createElement('div');
        commandLine.className = 'console-line';
        commandLine.innerHTML = `
            <span class="prompt">spider@v2.1:~$</span>
            <span class="command">${command}</span>
        `;
        console.appendChild(commandLine);

        // Simulate response
        setTimeout(() => {
            const responseLine = document.createElement('div');
            responseLine.className = 'console-line response';
            responseLine.innerHTML = `<span class="output">✅ Executing: ${command}...</span>`;
            console.appendChild(responseLine);

            // Auto-scroll
            console.scrollTop = console.scrollHeight;
        }, 500);
    }

    addDemoCSS() {
        if (document.getElementById('demo-styles')) return;

        const style = document.createElement('style');
        style.id = 'demo-styles';
        style.textContent = `
            .demo-active {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: rgba(10, 10, 15, 0.9);
                border-radius: 10px;
                padding: 20px;
            }
            
            .demo-status {
                display: flex;
                align-items: center;
                gap: 8px;
                color: #00ffff;
                margin-bottom: 20px;
            }
            
            .status-dot {
                width: 8px;
                height: 8px;
                background: #00ff00;
                border-radius: 50%;
                animation: pulse 2s infinite;
            }
            
            .demo-console {
                flex: 1;
                font-family: 'Courier New', monospace;
                background: rgba(0, 0, 0, 0.5);
                border-radius: 5px;
                padding: 15px;
                overflow-y: auto;
                max-height: 200px;
                margin-bottom: 15px;
            }
            
            .console-line {
                margin-bottom: 8px;
                color: #00ffff;
            }
            
            .prompt {
                color: #00ff00;
                margin-right: 8px;
            }
            
            .command {
                color: #ffffff;
            }
            
            .output {
                color: #ffff00;
            }
            
            .cursor {
                animation: blink 1s infinite;
            }
            
            .demo-metrics {
                display: flex;
                justify-content: space-between;
                gap: 20px;
            }
            
            .metric {
                text-align: center;
            }
            
            .metric-label {
                display: block;
                color: #b3b3b3;
                font-size: 0.9rem;
            }
            
            .metric-value {
                display: block;
                color: #00ffff;
                font-weight: bold;
                font-size: 1.2rem;
            }
            
            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.5; }
            }
            
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }

    animateDemo() {
        const cursor = document.querySelector('.cursor');
        const metrics = document.querySelectorAll('.metric-value');
        
        // Animate cursor
        if (cursor) {
            setInterval(() => {
                cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
            }, 500);
        }

        // Animate metrics
        metrics.forEach((metric, index) => {
            setInterval(() => {
                const currentValue = parseInt(metric.textContent);
                const variation = Math.floor(Math.random() * 20) - 10;
                metric.textContent = Math.max(0, currentValue + variation) + (index === 0 ? 'ms' : '/6');
            }, 2000 + index * 500);
        });
    }

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleContactSubmit(form);
        });

        // Add input animations
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
        });
    }

    handleContactSubmit(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        this.showNotification('Message sent successfully! 📧', 'success');
        
        // Reset form with animation
        setTimeout(() => {
            form.reset();
            form.querySelectorAll('.form-group').forEach(group => {
                group.classList.remove('focused');
            });
        }, 1000);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">${this.getNotificationIcon(type)}</span>
                <span class="notification-text">${message}</span>
            </div>
        `;

        // Add notification styles if not present
        this.addNotificationCSS();

        // Add to page
        document.body.appendChild(notification);

        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);

        // Auto-remove
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    getNotificationIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type] || icons.info;
    }

    addNotificationCSS() {
        if (document.getElementById('notification-styles')) return;

        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(26, 26, 46, 0.95);
                border: 1px solid rgba(0, 255, 255, 0.3);
                border-radius: 10px;
                padding: 15px 20px;
                backdrop-filter: blur(20px);
                transform: translateX(100%);
                transition: transform 0.3s ease;
                z-index: 10000;
                min-width: 300px;
                box-shadow: 0 8px 32px rgba(0, 255, 255, 0.2);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .notification-icon {
                font-size: 1.2rem;
            }
            
            .notification-text {
                color: #ffffff;
                font-size: 0.95rem;
            }
            
            .notification-success {
                border-color: rgba(0, 255, 0, 0.5);
            }
            
            .notification-error {
                border-color: rgba(255, 0, 0, 0.5);
            }
            
            .notification-warning {
                border-color: rgba(255, 165, 0, 0.5);
            }
        `;
        document.head.appendChild(style);
    }

    handleResize() {
        // Update Three.js scene
        if (window.spiderScene) {
            window.spiderScene.onWindowResize();
        }
        
        // Update mobile menu state
        if (window.innerWidth > 768) {
            const navLinks = document.querySelector('.nav-links');
            const navToggle = document.querySelector('.nav-toggle');
            
            if (navLinks) navLinks.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }

    handleScroll() {
        const scrolled = window.pageYOffset;
        const nav = document.querySelector('.main-nav');
        
        // Update navigation background
        if (nav) {
            if (scrolled > 50) {
                nav.style.background = 'rgba(10, 10, 15, 0.95)';
            } else {
                nav.style.background = 'rgba(10, 10, 15, 0.9)';
            }
        }

        // Update current section
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                this.currentSection = section.id;
                this.updateActiveNavLink();
            }
        });
    }

    updateActiveNavLink() {
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.classList.remove('active');
        });
        
        const activeLink = document.querySelector(`[data-section="${this.currentSection}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    handleKeyboard(e) {
        // Quick navigation with numbers
        if (e.altKey) {
            const sectionMap = {
                '1': 'home',
                '2': 'agents',
                '3': 'features',
                '4': 'demo',
                '5': 'contact'
            };
            
            if (sectionMap[e.key]) {
                e.preventDefault();
                this.navigateToSection(sectionMap[e.key]);
            }
        }
        
        // Escape key to close modals/menus
        if (e.key === 'Escape') {
            const navLinks = document.querySelector('.nav-links.active');
            const navToggle = document.querySelector('.nav-toggle.active');
            
            if (navLinks) navLinks.classList.remove('active');
            if (navToggle) navToggle.classList.remove('active');
        }
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.spiderApp = new SpiderMainApp();
});

// Keep all backend logic intact - this is purely frontend enhancement
console.log('🕷️ SPIDER v2.1 Frontend Enhanced - Backend Logic Preserved');