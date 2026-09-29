/* ========================================
   PORTFOLIO SYSTEM - INTERACTIVE ENGINE
   JavaScript for terminal effects, animations, and system interactions
   ======================================== */

// ========================================
// CONFIGURATION
// ========================================
const CONFIG = {
    // Terminal typing animation configuration
    terminal: {
        typeSpeed: 50,           // Characters per second
        deleteSpeed: 30,
        pauseDuration: 2000,     // Pause between commands
        cursorBlinkSpeed: 530
    },
    
    // Scroll animation configuration
    scroll: {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    },
    
    // Data for terminal animation
    outputs: {
        name: 'Saket Mishra',
        role: 'Full Stack Engineer | Backend Specialist | AI Integration Expert',
        stack: 'React | Node.js | MongoDB | Python | Azure OpenAI | REST APIs | Socket.IO'
    },
    
    // Typing commands rotation
    typingCommands: [
        'cat systems.json',
        'npm run build',
        'docker ps -a',
        'git status',
        'kubectl get pods',
        'node server.js'
    ]
};

// ========================================
// TERMINAL TYPING ANIMATION
// ========================================
class TerminalTyper {
    constructor() {
        this.currentCommandIndex = 0;
        this.isTyping = false;
    }
    
    // Type out terminal outputs on page load
    async initializeOutputs() {
        await this.sleep(500);
        
        // Type name
        await this.typeText('name-output', CONFIG.outputs.name);
        await this.sleep(800);
        
        // Type role
        await this.typeText('role-output', CONFIG.outputs.role);
        await this.sleep(800);
        
        // Type tech stack
        await this.typeText('stack-output', CONFIG.outputs.stack);
        await this.sleep(1500);
        
        // Start rotating commands
        this.startCommandRotation();
    }
    
    // Type text character by character
    async typeText(elementId, text) {
        const element = document.getElementById(elementId);
        if (!element) return;
        
        element.textContent = '';
        
        for (let i = 0; i < text.length; i++) {
            element.textContent += text[i];
            await this.sleep(CONFIG.terminal.typeSpeed);
        }
    }
    
    // Start rotating through typing commands
    startCommandRotation() {
        this.rotateCommand();
    }
    
    async rotateCommand() {
        const cursorElement = document.getElementById('typing-cursor');
        if (!cursorElement) return;
        
        const command = CONFIG.typingCommands[this.currentCommandIndex];
        
        // Type the command
        cursorElement.textContent = '';
        for (let i = 0; i < command.length; i++) {
            cursorElement.textContent += command[i];
            await this.sleep(CONFIG.terminal.typeSpeed);
        }
        
        // Pause
        await this.sleep(CONFIG.terminal.pauseDuration);
        
        // Delete the command
        for (let i = command.length; i > 0; i--) {
            cursorElement.textContent = command.substring(0, i - 1);
            await this.sleep(CONFIG.terminal.deleteSpeed);
        }
        
        await this.sleep(500);
        
        // Move to next command
        this.currentCommandIndex = (this.currentCommandIndex + 1) % CONFIG.typingCommands.length;
        
        // Repeat
        this.rotateCommand();
    }
    
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ========================================
// SCROLL PROGRESS INDICATOR
// ========================================
class ScrollProgress {
    constructor() {
        this.progressBar = document.getElementById('scroll-progress');
        this.ticking = false;
        this.init();
    }
    
    init() {
        if (!this.progressBar) return;
        
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateProgress();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
        
        // Initial update
        this.updateProgress();
    }
    
    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        
        this.progressBar.style.width = Math.min(100, Math.max(0, scrolled)) + '%';
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.ticking = false;
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        // Show/hide based on scroll position with RAF throttling
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    if (window.pageYOffset > 300) {
                        this.button.classList.add('visible');
                    } else {
                        this.button.classList.remove('visible');
                    }
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
        
        // Scroll to top on click
        this.button.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

// ========================================
// SCROLL ANIMATIONS & REVEALS
// ========================================
class ScrollAnimations {
    constructor() {
        this.prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.sectionObserver = null;
        this.cardObserver = null;
        this.timelineObserver = null;
        this.init();
    }
    
    init() {
        // If reduced motion is requested, instantly reveal everything without animation
        if (this.prefersReducedMotion) {
            this.revealAllInstantly();
            return;
        }

        this.initSectionReveals();
        this.initProjectCardReveals();
        this.initTimelineActivations();
    }

    revealAllInstantly() {
        document.querySelectorAll('.section-header, .config-block, .stack-module, .timeline-item, .system-card, .endpoint-card').forEach(el => {
            el.classList.add('is-revealed', 'card-revealed', 'timeline-active');
            el.style.opacity = '1';
            el.style.transform = 'none';
        });
    }

    initSectionReveals() {
        const revealSelectors = [
            '.section-header',
            '.config-block',
            '.stack-module',
            '.endpoint-card',
            '.arch-layout',
            '.profile-content'
        ];

        const elements = document.querySelectorAll(revealSelectors.join(', '));
        elements.forEach(el => el.classList.add('reveal-on-scroll'));

        this.sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-revealed');
                    this.sectionObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(el => this.sectionObserver.observe(el));
    }

    initProjectCardReveals() {
        const cards = document.querySelectorAll('.system-card');
        if (cards.length === 0) return;

        cards.forEach((card) => {
            card.classList.add('reveal-card');
        });

        let staggerIndex = 0;
        let staggerTimer = null;

        this.cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const delay = staggerIndex * 70; // 70ms cascade
                    staggerIndex++;

                    setTimeout(() => {
                        card.classList.add('card-revealed');
                    }, delay);

                    clearTimeout(staggerTimer);
                    staggerTimer = setTimeout(() => {
                        staggerIndex = 0;
                    }, 350);

                    this.cardObserver.unobserve(card);
                }
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -40px 0px'
        });

        cards.forEach(card => this.cardObserver.observe(card));
    }

    initTimelineActivations() {
        const items = document.querySelectorAll('.timeline-item');
        if (items.length === 0) return;

        this.timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('timeline-active');
                } else if (entry.boundingClientRect.top > 0) {
                    // Only deactivate if scrolling back up above the item
                    entry.target.classList.remove('timeline-active');
                }
            });
        }, {
            threshold: 0.25,
            rootMargin: '0px 0px -80px 0px'
        });

        items.forEach(item => this.timelineObserver.observe(item));
    }
}

// ========================================
// INTERACTIVE TIMELINE ACCORDION & PROGRESS RAIL
// ========================================
class TimelineInteractiveEngine {
    constructor() {
        this.container = document.getElementById('timeline-container');
        this.railFill = document.getElementById('timeline-rail-fill');
        this.items = Array.from(document.querySelectorAll('.timeline-item'));
        this.ticking = false;
        this.init();
    }

    init() {
        if (!this.container || this.items.length === 0) return;

        // Initialize accordion toggles
        this.items.forEach(item => {
            const summary = item.querySelector('.timeline-summary');
            if (!summary) return;

            // Click handler
            summary.addEventListener('click', (e) => {
                this.toggleItem(item);
            });

            // Keyboard handler
            summary.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.toggleItem(item);
                }
            });
        });

        // Initialize scroll listener for rail fill
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateRailProgress();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        // Initial progress calculation
        this.updateRailProgress();
    }

    toggleItem(targetItem) {
        const isCurrentlyExpanded = targetItem.classList.contains('is-expanded');
        const summary = targetItem.querySelector('.timeline-summary');
        
        if (isCurrentlyExpanded) {
            targetItem.classList.remove('is-expanded');
            if (summary) summary.setAttribute('aria-expanded', 'false');
        } else {
            targetItem.classList.add('is-expanded');
            if (summary) summary.setAttribute('aria-expanded', 'true');
        }

        // Recalculate rail progress after expansion transition
        setTimeout(() => this.updateRailProgress(), 360);
    }

    updateRailProgress() {
        if (!this.railFill || !this.container) return;

        const containerRect = this.container.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Trigger point: when timeline reaches ~65% down the viewport
        const triggerY = windowHeight * 0.65;
        const containerTop = containerRect.top;
        const containerHeight = containerRect.height;

        if (containerTop > triggerY) {
            this.railFill.style.height = '0%';
            return;
        }

        const distanceScrolled = triggerY - containerTop;
        const percentage = Math.min(100, Math.max(0, (distanceScrolled / containerHeight) * 100));

        this.railFill.style.height = `${percentage.toFixed(1)}%`;
    }
}

// ========================================
// SUBTLE DEVELOPER PARALLAX
// ========================================
class SubtleParallaxEngine {
    constructor() {
        this.terminal = document.querySelector('.terminal-window');
        this.prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.ticking = false;
        this.init();
    }

    init() {
        if (this.prefersReducedMotion || !this.terminal) return;

        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.updateParallax();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        this.updateParallax();
    }

    updateParallax() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollY < 900) {
            // Subtle 4.5% vertical counter-drift
            const offset = (scrollY * 0.045).toFixed(2);
            this.terminal.style.setProperty('--parallax-terminal', `${offset}px`);
        }
    }
}

// ========================================
// NAVIGATION HIGHLIGHTING (ACTIVE SECTION SPY)
// ========================================
class NavigationHighlight {
    constructor() {
        this.sections = [];
        this.navLinks = [];
        this.ticking = false;
        this.init();
    }
    
    init() {
        this.sections = Array.from(document.querySelectorAll('section[id]'));
        this.navLinks = Array.from(document.querySelectorAll('.nav-links a'));
        
        if (this.sections.length === 0 || this.navLinks.length === 0) return;
        
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.highlightNavigation();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });
        
        // Smooth scroll on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        this.highlightNavigation();
    }
    
    highlightNavigation() {
        let current = '';
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // If at the very bottom of the document, highlight the last section
        if (scrollY + windowHeight >= docHeight - 60) {
            current = this.sections[this.sections.length - 1].getAttribute('id');
        } else {
            this.sections.forEach(section => {
                const sectionTop = section.offsetTop;
                if (scrollY >= sectionTop - 180) {
                    current = section.getAttribute('id');
                }
            });
        }

        if (!current && this.sections.length > 0) {
            current = this.sections[0].getAttribute('id');
        }
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'true');
            }
        });

        // Keep floating dock navigation links in sync with active section
        const floatingLinks = document.querySelectorAll('#floating-dock .fd-link[data-section]');
        floatingLinks.forEach(link => {
            link.classList.remove('active');
            link.removeAttribute('aria-current');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
                link.setAttribute('aria-current', 'true');
            }
        });
    }
}

// ========================================
// FLOATING DOCK NAVIGATION ENGINE
// ========================================
class FloatingNavEngine {
    constructor() {
        this.dock = document.getElementById('floating-dock');
        this.navLinks = document.querySelectorAll('#floating-dock .fd-link[data-section]');
        this.lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
        this.ticking = false;
        this.isClickScrolling = false;
        this.scrollTimeout = null;
        this.init();
    }

    init() {
        if (!this.dock) return;

        // Listen for scroll events with passive listener & RAF
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        }, { passive: true });

        // Smooth scroll on section click
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) {
                        // Pause scroll-hide during smooth programmatic scroll
                        this.isClickScrolling = true;
                        this.showDock();
                        clearTimeout(this.scrollTimeout);
                        
                        const offset = 80;
                        const targetPos = target.getBoundingClientRect().top + window.pageYOffset - offset;
                        window.scrollTo({
                            top: targetPos,
                            behavior: 'smooth'
                        });

                        // Release flag after animation completes
                        this.scrollTimeout = setTimeout(() => {
                            this.isClickScrolling = false;
                            this.lastScrollY = window.pageYOffset || document.documentElement.scrollTop;
                        }, 800);
                    }
                }
            });
        });

        // Initial state check
        this.handleScroll();
    }

    handleScroll() {
        if (!this.dock || this.isClickScrolling) return;

        const currentScrollY = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const delta = currentScrollY - this.lastScrollY;

        // Hide at the very top of the page (< 100px) where standard top nav is visible
        if (currentScrollY < 100) {
            this.hideDock();
        } 
        // Always show if user is at the bottom of the page
        else if (currentScrollY + windowHeight >= docHeight - 40) {
            this.showDock();
        }
        // Scrolling DOWN -> Hide
        else if (delta > 6 && currentScrollY > 150) {
            this.hideDock();
        }
        // Scrolling UP -> Reveal
        else if (delta < -6) {
            this.showDock();
        }

        this.lastScrollY = currentScrollY;
    }

    showDock() {
        if (this.dock.classList.contains('fd-hidden')) {
            this.dock.classList.remove('fd-hidden');
        }
    }

    hideDock() {
        if (!this.dock.classList.contains('fd-hidden')) {
            this.dock.classList.add('fd-hidden');
        }
    }
}


// ========================================
// MOBILE NAVIGATION TOGGLE
// ========================================
class MobileNav {
    constructor() {
        this.toggle = document.querySelector('.mobile-toggle');
        this.navLinks = document.querySelector('.nav-links');
        this.init();
    }
    
    init() {
        if (!this.toggle) return;
        
        this.toggle.addEventListener('click', () => {
            this.toggleMenu();
        });
        
        // Close menu when clicking on a link
        if (this.navLinks) {
            const links = this.navLinks.querySelectorAll('a');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    this.closeMenu();
                });
            });
        }
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (this.navLinks && !e.target.closest('.system-nav')) {
                this.closeMenu();
            }
        });

        // Close on Escape, and auto-close when resizing up to desktop
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.toggle.classList.contains('active')) {
                this.closeMenu();
                this.toggle.focus();
            }
        });
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768 && this.toggle.classList.contains('active')) {
                this.closeMenu();
            }
        }, { passive: true });
    }
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        const open = this.navLinks.classList.toggle('mobile-active');
        // Thumb-friendly: lock background scroll while the drawer is open
        document.body.style.overflow = open ? 'hidden' : '';
        if (open) {
            const first = this.navLinks.querySelector('a');
            if (first) first.focus({ preventScroll: true });
        }
        
        // Animate hamburger
        const spans = this.toggle.querySelectorAll('span');
        if (this.toggle.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    }
    
    closeMenu() {
        this.toggle.classList.remove('active');
        this.navLinks.classList.remove('mobile-active');
        // Restore scroll only if no overlay owns the lock
        const overlayOpen = document.querySelector('#project-modal.pm-visible, #cmd-palette.cp-visible, #interactive-terminal.itm-open, #shortcuts-modal:not([hidden])');
        const videoOpen = document.getElementById('videoModal')?.style.display === 'flex';
        if (!overlayOpen && !videoOpen && document.body.style.overflow === 'hidden') {
            document.body.style.overflow = '';
        }
        
        const spans = this.toggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
}

// ========================================
// TECH STACK PROGRESS BARS ANIMATION
// ========================================
class TechStackAnimation {
    constructor() {
        this.observed = false;
        this.init();
    }
    
    init() {
        const stackSection = document.getElementById('stack');
        if (!stackSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.observed) {
                    this.animateBars();
                    this.observed = true;
                }
            });
        }, {
            threshold: 0.3
        });
        
        observer.observe(stackSection);
    }
    
    animateBars() {
        const bars = document.querySelectorAll('.tech-fill');
        bars.forEach((bar, index) => {
            setTimeout(() => {
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 50);
            }, index * 50);
        });
    }
}

// ========================================
// SYSTEM STATUS COMPONENT & INDICATORS
// ========================================
class SystemStatus {
    constructor() {
        this.uptimeEl = document.getElementById('ssw-session-uptime');
        this.statusBadge = document.querySelector('.ssw-online-badge');
        this.startTime = Date.now();
        this.init();
    }

    init() {
        this.updateStatuses();
        setInterval(() => this.updateStatuses(), 5000);

        // Update live session timer every second if element present
        if (this.uptimeEl) {
            this.updateUptime();
            setInterval(() => this.updateUptime(), 1000);
        }
    }

    updateUptime() {
        if (!this.uptimeEl) return;
        const elapsedSecs = Math.floor((Date.now() - this.startTime) / 1000);
        const hrs = String(Math.floor(elapsedSecs / 3600)).padStart(2, '0');
        const mins = String(Math.floor((elapsedSecs % 3600) / 60)).padStart(2, '0');
        const secs = String(elapsedSecs % 60).padStart(2, '0');
        this.uptimeEl.textContent = `SESSION: ${hrs}:${mins}:${secs}`;
    }

    updateStatuses() {
        // Project card indicators heartbeat
        const indicators = document.querySelectorAll('.status-indicator.running');
        indicators.forEach(indicator => {
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = 'pulse 2s ease-in-out infinite';
            }, 10);
        });

        // Telemetry widget subtle heartbeat sync
        if (this.statusBadge) {
            this.statusBadge.style.boxShadow = '0 0 16px rgba(16, 185, 129, 0.45)';
            setTimeout(() => {
                if (this.statusBadge) {
                    this.statusBadge.style.boxShadow = '';
                }
            }, 600);
        }
    }
}

// ========================================
// CURSOR GLOW EFFECT
// ========================================
class CursorGlow {
    constructor() {
        this.glow = null;
        const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const coarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches;
        if (calm || coarse) return;
        this.init();
    }
    
    init() {
        // Create glow element
        this.glow = document.createElement('div');
        this.glow.className = 'cursor-glow';
        this.glow.style.cssText = `
            position: fixed;
            width: 300px;
            height: 300px;
            border-radius: 50%;
            pointer-events: none;
            background: radial-gradient(circle, rgba(6, 182, 212, 0.03) 0%, transparent 70%);
            transform: translate(-50%, -50%);
            z-index: 9998;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(this.glow);
        
        // Track mouse movement
        document.addEventListener('mousemove', (e) => {
            this.glow.style.left = e.clientX + 'px';
            this.glow.style.top = e.clientY + 'px';
            this.glow.style.opacity = '1';
        });
        
        document.addEventListener('mouseleave', () => {
            this.glow.style.opacity = '0';
        });
    }
}

// ========================================
// FEATURED SYSTEMS COUNTER ANIMATION
// ========================================
class MetricsCounter {
    constructor() {
        this.animated = false;
        this.init();
    }
    
    init() {
        const profileSection = document.getElementById('profile');
        if (!profileSection) return;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.animated) {
                    this.animateCounters();
                    this.animated = true;
                }
            });
        }, {
            threshold: 0.5
        });
        
        observer.observe(profileSection);
    }
    
    animateCounters() {
        const counters = document.querySelectorAll('.metric-value');
        
        counters.forEach(counter => {
            const target = counter.textContent;
            const isNumeric = /^\d+/.test(target);
            
            if (isNumeric) {
                const number = parseInt(target);
                const duration = 2000;
                const increment = number / (duration / 16);
                let current = 0;
                
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= number) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.floor(current) + target.replace(/^\d+/, '');
                    }
                }, 16);
            }
        });
    }
}

// ========================================
// CONSOLE EASTER EGG
// ========================================
class ConsoleEasterEgg {
    constructor() {
        this.init();
    }
    
    init() {
        const styles = [
            'color: #06b6d4',
            'font-family: monospace',
            'font-size: 14px',
            'font-weight: bold'
        ].join(';');
        
        console.log('%c┌─────────────────────────────────────┐', styles);
        console.log('%c│  SYSTEM: Saket Mishra Portfolio    │', styles);
        console.log('%c│  STATUS: Operational                │', styles);
        console.log('%c│  VERSION: 2.0.0                     │', styles);
        console.log('%c│  STACK: MERN + AI                   │', styles);
        console.log('%c└─────────────────────────────────────┘', styles);
        console.log('%c\nLooking for something? Check out:', 'color: #94a3b8; font-family: monospace;');
        console.log('%c→ GitHub: https://github.com/saketmishra7224', 'color: #cbd5e1; font-family: monospace;');
        console.log('%c→ LinkedIn: https://linkedin.com/in/saket-mishra-1a1b312a1', 'color: #cbd5e1; font-family: monospace;');
        console.log('%c\nInterested in working together? Let\'s connect!', 'color: #10b981; font-family: monospace; font-weight: bold;');
    }
}

// ========================================
// KEYBOARD SHORTCUTS MODAL ENGINE
// ========================================
class ShortcutsModalEngine {
    constructor() {
        this.modal = document.getElementById('shortcuts-modal');
        this.closeBtn = document.getElementById('sc-close-btn');
        this.isOpen = false;
        this.previouslyFocused = null;
        this.init();
    }

    init() {
        if (!this.modal) return;

        // Export globally for Command Palette or terminal calls
        window.shortcutsModal = this;

        // Close button click
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', () => this.close());
        }

        // Click outside modal container to close
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });

        // Keydown listener
        document.addEventListener('keydown', (e) => {
            const targetTag = (e.target.tagName || '').toLowerCase();
            const isInput = targetTag === 'input' || targetTag === 'textarea' || e.target.isContentEditable;

            // Trigger: '?' (Shift + /) when not typing in an input
            if (e.key === '?' && !isInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
                e.preventDefault();
                this.toggle();
                return;
            }

            // Trigger: Ctrl/Cmd + / (always works)
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.toggle();
                return;
            }

            // Escape key closes modal if open
            if (e.key === 'Escape' && this.isOpen) {
                e.preventDefault();
                e.stopPropagation();
                this.close();
                return;
            }

            // Home key: Scroll to top (when not typing)
            if (e.key === 'Home' && !isInput && !this.isOpen) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }

            // End key: Scroll to bottom (when not typing)
            if (e.key === 'End' && !isInput && !this.isOpen) {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
    }

    open() {
        if (!this.modal || this.isOpen) return;
        this.isOpen = true;
        this.previouslyFocused = document.activeElement;
        this.modal.removeAttribute('hidden');
        document.body.style.overflow = 'hidden';
        
        // Focus close button for accessibility
        setTimeout(() => {
            if (this.closeBtn) this.closeBtn.focus();
        }, 60);
    }

    close() {
        if (!this.modal || !this.isOpen) return;
        this.isOpen = false;
        this.modal.setAttribute('hidden', '');
        document.body.style.overflow = '';
        
        // Return focus
        if (this.previouslyFocused && typeof this.previouslyFocused.focus === 'function') {
            this.previouslyFocused.focus();
        }
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }
}

// ========================================
// EASTER EGG: KONAMI CODE ENGINE
// ========================================
class KonamiCodeEngine {
    constructor() {
        this.sequence = [
            'arrowup', 'arrowup',
            'arrowdown', 'arrowdown',
            'arrowleft', 'arrowright',
            'arrowleft', 'arrowright',
            'b', 'a'
        ];
        this.buffer = [];
        this.toast = document.getElementById('dev-mode-toast');
        this.closeBtn = document.getElementById('dmt-close-btn');
        this.isActive = false;
        this.init();
    }

    init() {
        if (this.closeBtn) {
            this.closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.deactivate();
            });
        }

        if (this.toast) {
            this.toast.addEventListener('click', () => {
                this.deactivate();
            });
        }

        document.addEventListener('keydown', (e) => {
            const tag = (e.target.tagName || '').toLowerCase();
            const isInput = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;
            if (isInput) return;

            // Esc key deactivates dev mode if active and no modal open
            if (e.key === 'Escape' && this.isActive) {
                const shortcutsModalOpen = window.shortcutsModal && window.shortcutsModal.isOpen;
                if (!shortcutsModalOpen) {
                    this.deactivate();
                    return;
                }
            }

            const key = e.key.toLowerCase();
            this.buffer.push(key);

            // Keep buffer trimmed to sequence length
            if (this.buffer.length > this.sequence.length) {
                this.buffer.shift();
            }

            // Check match
            if (this.buffer.length === this.sequence.length) {
                const match = this.sequence.every((val, index) => val === this.buffer[index]);
                if (match) {
                    this.toggle();
                    this.buffer = []; // reset after match
                }
            }
        });
    }

    toggle() {
        this.isActive ? this.deactivate() : this.activate();
    }

    activate() {
        this.isActive = true;
        document.body.classList.add('dev-mode-active');
        if (this.toast) {
            this.toast.classList.remove('dmt-hidden');
        }
        console.log(
            '%c[ACCESS GRANTED] Developer Mode Activated!\n' +
            '%cMatrix phosphor scanline accent engaged.\n' +
            'Press Esc, click the HUD notification, or re-enter the Konami code to deactivate.',
            'color: #10b981; font-weight: bold; font-size: 14px;',
            'color: #94a3b8; font-size: 12px;'
        );
    }

    deactivate() {
        this.isActive = false;
        document.body.classList.remove('dev-mode-active');
        if (this.toast) {
            this.toast.classList.add('dmt-hidden');
        }
        console.log('%c[SYSTEM] Developer Mode Deactivated.', 'color: #64748b; font-size: 12px;');
    }
}


// ========================================
// MICRO-INTERACTIONS ENGINE
// Magnetic buttons & card cursor spotlight tracking
// ========================================
class MicroInteractionsEngine {
    constructor() {
        this.cards = document.querySelectorAll('.system-card');
        this.magneticButtons = document.querySelectorAll('.action-btn, #terminal-fab, #back-to-top');
        this.isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
        this.prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (this.prefersReducedMotion || this.isTouch) return;

        this.initCardSpotlight();
        this.initMagneticButtons();
    }

    initCardSpotlight() {
        this.cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                card.style.setProperty('--mouse-x', `${x.toFixed(1)}px`);
                card.style.setProperty('--mouse-y', `${y.toFixed(1)}px`);
            });

            card.addEventListener('mouseleave', () => {
                card.style.setProperty('--mouse-x', '-999px');
                card.style.setProperty('--mouse-y', '-999px');
            });
        });
    }

    initMagneticButtons() {
        this.magneticButtons.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const centerX = rect.left + rect.width / 2;
                const centerY = rect.top + rect.height / 2;

                // Gentle magnetic pull: max 4-6px displacement
                const deltaX = (e.clientX - centerX) * 0.22;
                const deltaY = (e.clientY - centerY) * 0.22;

                btn.style.transform = `translate(${deltaX.toFixed(1)}px, ${deltaY.toFixed(1)}px)`;
                btn.style.transition = 'transform 0.08s ease-out';
            });

            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
                btn.style.transition = 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)';
            });
        });
    }
}

// ========================================
// PERFORMANCE MONITORING
// ========================================
class PerformanceMonitor {
    constructor() {
        this.init();
    }
    
    init() {
        // Log performance metrics
        window.addEventListener('load', () => {
            setTimeout(() => {
                if (typeof performance !== 'undefined' && typeof performance.getEntriesByType === 'function') {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('%cPerformance Metrics:', 'color: #10b981; font-weight: bold;');
                        console.log(`%cPage Load: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`, 'color: #cbd5e1;');
                        console.log(`%cDOM Ready: ${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`, 'color: #cbd5e1;');
                    }
                }
            }, 0);
        });
    }
}

// ========================================
// INITIALIZATION
// ========================================
class PortfolioSystem {
    constructor() {
        this.components = [];
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
        } else {
            this.initializeComponents();
        }
    }
    
    initializeComponents() {
        console.log('%c[SYSTEM] Initializing portfolio system...', 'color: #06b6d4; font-weight: bold;');
        
        try {
            // Initialize all components (power flag first: canvas engines read it)
            this.components.push(new PowerSaverEngine());
            this.components.push(new TerminalTyper());
            this.components.push(new ScrollProgress());
            this.components.push(new BackToTop());
            this.components.push(new ScrollAnimations());
            this.components.push(new SubtleParallaxEngine());
            this.components.push(new NavigationHighlight());
            this.components.push(new TimelineInteractiveEngine());
            this.components.push(new MobileNav());
            this.components.push(new TechStackAnimation());
            this.components.push(new SystemStatus());
            this.components.push(new CursorGlow());
            this.components.push(new MetricsCounter());
            this.components.push(new ConsoleEasterEgg());
            this.components.push(new ShortcutsModalEngine());
            this.components.push(new KonamiCodeEngine());
            this.components.push(new MicroInteractionsEngine());
            this.components.push(new PerformanceMonitor());
            this.components.push(new FloatingNavEngine());
            this.components.push(new HeroNetworkEngine());
            this.components.push(new HeroChromeEngine());
            this.components.push(new SystemsShowcaseEngine());
            this.components.push(new TimelineYearEngine());
            this.components.push(new ArchAmbientEngine());
            this.components.push(new ArchTooltipEngine());
            this.components.push(new ArchTierCollapseEngine());
            this.components.push(new StackMapEngine());
            this.components.push(new CursorEngine());
            this.components.push(new RevealTypeEngine());
            
            // Start terminal typing animation
            const typer = this.components.find(c => c instanceof TerminalTyper);
            if (typer) {
                typer.initializeOutputs();
            }
            
            console.log('%c[SYSTEM] ✓ All components initialized successfully', 'color: #10b981; font-weight: bold;');
        } catch (error) {
            console.error('[SYSTEM] ✗ Initialization error:', error);
        }
    }
}

// ========================================
// VIDEO MODAL FUNCTIONS
// ========================================
function openVideoModal(event, videoId) {
    event.preventDefault();
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Set the YouTube embed URL with autoplay
    videoFrame.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    modal.style.display = 'flex';
    
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
}

function closeVideoModal() {
    const modal = document.getElementById('videoModal');
    const videoFrame = document.getElementById('videoFrame');
    
    // Stop the video by removing the src
    videoFrame.src = '';
    modal.style.display = 'none';
    
    // Restore body scroll
    document.body.style.overflow = '';
}

// Close modal when clicking outside the video
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('videoModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeVideoModal();
            }
        });
    }
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeVideoModal();
        }
    });
});

// ========================================
// HERO NETWORK CANVAS — abstract system visualization
// Layers: Frontend / API / Backend / Database / AI / Cloud
// Subtle drift, links, travelling particles, cursor shift, hover glow.
// ========================================
class HeroNetworkEngine {
    constructor() {
        this.canvas = document.getElementById('hero-network');
        if (!this.canvas) return;
        this.ctx = this.canvas.getContext('2d');
        this.hero = document.getElementById('system');
        this.reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || document.documentElement.dataset.power === 'low';
        this.mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
        this.hover = { x: -9999, y: -9999 };
        this.nodes = [];
        this.packets = [];
        this.running = true;
        this.layers = ['Frontend', 'API', 'Backend', 'Database', 'AI', 'Cloud'];
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });
        this.seed();

        if (this.reduced) { this.drawStatic(); return; }

        // Pause offscreen
        if ('IntersectionObserver' in window && this.hero) {
            new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const visible = e.isIntersecting;
                    if (visible && !this.running) { this.running = true; this.loop(); }
                    if (!visible) this.running = false;
                });
            }, { threshold: 0 }).observe(this.hero);
        }

        // Cursor shift (desktop, fine pointers only)
        const fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (fine && this.hero) {
            this.hero.addEventListener('mousemove', (e) => {
                const r = this.hero.getBoundingClientRect();
                this.mouse.tx = (e.clientX - r.left) / Math.max(1, r.width);
                this.mouse.ty = (e.clientY - r.top) / Math.max(1, r.height);
                const cr = this.canvas.getBoundingClientRect();
                this.hover.x = e.clientX - cr.left;
                this.hover.y = e.clientY - cr.top;
            }, { passive: true });
            this.hero.addEventListener('mouseleave', () => {
                this.hover.x = -9999; this.hover.y = -9999;
            }, { passive: true });
        }

        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.running) this.loop();
        });

        this.loop();
    }

    resize() {
        const dpr = Math.min(1.5, window.devicePixelRatio || 1);
        const r = this.canvas.getBoundingClientRect();
        const w = Math.max(1, Math.round(r.width));
        const h = Math.max(1, Math.round(r.height));
        this.canvas.width = Math.round(w * dpr);
        this.canvas.height = Math.round(h * dpr);
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.w = w; this.h = h;
        this.seed();
    }

    seed() {
        if (!this.w) return;
        const count = Math.max(22, Math.min(44, Math.floor(this.w / 34)));
        this.nodes = [];
        for (let i = 0; i < count; i++) {
            this.nodes.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                vx: (Math.random() - 0.5) * 0.22,
                vy: (Math.random() - 0.5) * 0.22,
                r: 1.2 + Math.random() * 1.6,
                layer: this.layers[i % this.layers.length]
            });
        }
        this.packets = [];
        for (let i = 0; i < 8; i++) {
            const a = this.nodes[Math.floor(Math.random() * this.nodes.length)];
            const b = this.nodes[Math.floor(Math.random() * this.nodes.length)];
            if (a && b && a !== b) this.packets.push({ a, b, t: Math.random() });
        }
    }

    step() {
        this.mouse.x += (this.mouse.tx - this.mouse.x) * 0.04;
        this.mouse.y += (this.mouse.ty - this.mouse.y) * 0.04;
        const px = (this.mouse.x - 0.5) * 14;
        const py = (this.mouse.y - 0.5) * 10;

        for (const n of this.nodes) {
            n.x += n.vx; n.y += n.vy;
            if (n.x < -20) n.x = this.w + 20;
            if (n.x > this.w + 20) n.x = -20;
            if (n.y < -20) n.y = this.h + 20;
            if (n.y > this.h + 20) n.y = -20;
            n.sx = n.x + px; n.sy = n.y + py;
        }
        for (const p of this.packets) {
            p.t += 0.006;
            if (p.t >= 1) {
                p.t = 0;
                p.a = this.nodes[Math.floor(Math.random() * this.nodes.length)];
                p.b = this.nodes[Math.floor(Math.random() * this.nodes.length)];
            }
        }
    }

    draw() {
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        const LINK = 150;

        // Links
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const a = this.nodes[i], b = this.nodes[j];
                const dx = a.sx - b.sx, dy = a.sy - b.sy;
                const d = Math.hypot(dx, dy);
                if (d < LINK) {
                    const alpha = (1 - d / LINK) * 0.22;
                    ctx.strokeStyle = `rgba(52, 211, 153, ${alpha.toFixed(3)})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(a.sx, a.sy);
                    ctx.lineTo(b.sx, b.sy);
                    ctx.stroke();
                }
            }
        }

        // Travelling particles
        for (const p of this.packets) {
            if (!p.a || !p.b) continue;
            const x = p.a.sx + (p.b.sx - p.a.sx) * p.t;
            const y = p.a.sy + (p.b.sy - p.a.sy) * p.t;
            ctx.fillStyle = 'rgba(52, 211, 153, 0.55)';
            ctx.beginPath();
            ctx.arc(x, y, 1.4, 0, Math.PI * 2);
            ctx.fill();
        }

        // Nodes (+ hover reaction)
        for (const n of this.nodes) {
            const dh = Math.hypot(n.sx - this.hover.x, n.sy - this.hover.y);
            const hot = dh < 90;
            const r = hot ? n.r + 1.4 : n.r;
            ctx.fillStyle = hot ? 'rgba(52, 211, 153, 0.9)' : 'rgba(168, 177, 185, 0.5)';
            ctx.beginPath();
            ctx.arc(n.sx, n.sy, r, 0, Math.PI * 2);
            ctx.fill();
            if (hot) {
                ctx.strokeStyle = 'rgba(52, 211, 153, 0.35)';
                ctx.beginPath();
                ctx.arc(n.sx, n.sy, r + 6, 0, Math.PI * 2);
                ctx.stroke();
            } else {
                ctx.fillStyle = 'rgba(52, 211, 153, 0.10)';
                ctx.beginPath();
                ctx.arc(n.sx, n.sy, r + 5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
    }

    drawStatic() {
        this.step();
        this.draw();
    }

    loop() {
        if (!this.running || document.hidden) return;
        this.step();
        this.draw();
        requestAnimationFrame(() => this.loop());
    }
}

// ========================================
// HERO CHROME — nav compress, scroll fade, portrait parallax
// ========================================
class HeroChromeEngine {
    constructor() {
        this.nav = document.querySelector('.system-nav');
        this.heroBox = document.querySelector('.hero-container');
        this.hero = document.getElementById('system');
        this.pic = document.querySelector('.hero-pic');
        this.toggle = document.querySelector('.mobile-toggle');
        this.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.ticking = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => { this.onScroll(); this.ticking = false; });
                this.ticking = true;
            }
        }, { passive: true });
        this.onScroll();

        // Mobile drawer a11y state
        if (this.toggle) {
            this.toggle.addEventListener('click', () => {
                const open = this.toggle.classList.contains('active');
                this.toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
            });
        }

        // Subtle portrait parallax (fine pointers, motion-safe)
        const fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        if (fine && !this.reduced && this.hero && this.pic) {
            this.hero.addEventListener('mousemove', (e) => {
                const r = this.hero.getBoundingClientRect();
                const dx = ((e.clientX - r.left) / r.width - 0.5) * 10;
                const dy = ((e.clientY - r.top) / r.height - 0.5) * 8;
                this.pic.style.transform = `translate(${dx.toFixed(1)}px, ${dy.toFixed(1)}px)`;
            }, { passive: true });
            this.hero.addEventListener('mouseleave', () => {
                this.pic.style.transform = '';
            }, { passive: true });
        }
    }

    onScroll() {
        const y = window.pageYOffset || document.documentElement.scrollTop;
        if (this.nav) this.nav.classList.toggle('nav-compressed', y > 24);
        if (this.heroBox) {
            this.heroBox.classList.remove('hero-fade');
            this.heroBox.style.opacity = '';
        }
    }
}

// ========================================
// SYSTEMS SHOWCASE — progress rail, live index, cursor parallax
// Presentation only. Card DOM, links, and modal hooks untouched.
// ========================================
class SystemsShowcaseEngine {
    constructor() {
        this.section = document.getElementById('systems');
        this.grid = document.getElementById('systems-grid');
        if (!this.section || !this.grid) return;
        this.cards = Array.from(this.grid.querySelectorAll('.system-card'));
        this.fill = document.getElementById('systems-progress-fill');
        this.current = document.getElementById('systems-current');
        this.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        this.ticking = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => { this.update(); this.ticking = false; });
                this.ticking = true;
            }
        }, { passive: true });
        this.update();

        // Screenshot drift: a few pixels toward cursor (featured + grid)
        if (this.fine && !this.reduced) {
            this.cards.forEach(card => {
                const img = card.querySelector('.system-image');
                if (!img) return;
                card.addEventListener('mousemove', (e) => {
                    const r = card.getBoundingClientRect();
                    const dx = ((e.clientX - r.left) / Math.max(1, r.width) - 0.5) * 10;
                    const dy = ((e.clientY - r.top) / Math.max(1, r.height) - 0.5) * 8;
                    card.style.setProperty('--px', `${dx.toFixed(1)}px`);
                    card.style.setProperty('--py', `${dy.toFixed(1)}px`);
                }, { passive: true });
                card.addEventListener('mouseleave', () => {
                    card.style.setProperty('--px', '0px');
                    card.style.setProperty('--py', '0px');
                }, { passive: true });
            });
        }
    }

    update() {
        const vh = window.innerHeight || 800;
        const r = this.section.getBoundingClientRect();

        // Progress: section top at 70% viewport -> bottom at 45% viewport
        const span = Math.max(1, r.height - vh * 0.25);
        const p = Math.min(1, Math.max(0, (vh * 0.7 - r.top) / span));
        if (this.fill) this.fill.style.width = `${(p * 100).toFixed(1)}%`;

        // Live index: last card whose top cleared 62% of viewport
        let idx = 1;
        this.cards.forEach((card, i) => {
            const cr = card.getBoundingClientRect();
            if (cr.top < vh * 0.62) idx = i + 1;
        });
        if (this.current) this.current.textContent = String(idx).padStart(2, '0');
    }
}

// ========================================
// TIMELINE YEAR ENGINE — activates nearest deployment-year tick
// Presentation only. Dates, roles, and accordion hooks untouched.
// ========================================
class TimelineYearEngine {
    constructor() {
        this.container = document.getElementById('timeline-container');
        if (!this.container) return;
        this.years = Array.from(this.container.querySelectorAll('.timeline-year'));
        if (this.years.length === 0) return;
        this.ticking = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                window.requestAnimationFrame(() => { this.update(); this.ticking = false; });
                this.ticking = true;
            }
        }, { passive: true });
        this.update();
    }

    update() {
        const vh = window.innerHeight || 800;
        let active = this.years[0];
        this.years.forEach(tick => {
            if (tick.getBoundingClientRect().top < vh * 0.6) active = tick;
        });
        this.years.forEach(tick => tick.classList.toggle('year-active', tick === active));
    }
}

// ========================================
// ARCH AMBIENT FIELD — calm downward particle drift behind the pipeline
// Decorative only. No edges drawn, so no architecture is implied.
// ========================================
class ArchAmbientEngine {
    constructor() {
        this.canvas = document.getElementById('arch-canvas');
        this.pane = document.querySelector('.arch-graph-pane');
        if (!this.canvas || !this.pane) return;
        this.reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || document.documentElement.dataset.power === 'low';
        if (this.reduced) return;
        this.ctx = this.canvas.getContext('2d');
        this.parts = [];
        this.running = true;
        this.init();
    }

    init() {
        this.resize();
        window.addEventListener('resize', () => this.resize(), { passive: true });

        if ('IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const vis = e.isIntersecting;
                    if (vis && !this.running) { this.running = true; this.loop(); }
                    if (!vis) this.running = false;
                });
            }, { threshold: 0 }).observe(this.pane);
        }
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.running) this.loop();
        });
        this.loop();
    }

    resize() {
        const dpr = Math.min(1.5, window.devicePixelRatio || 1);
        const r = this.pane.getBoundingClientRect();
        this.w = Math.max(1, Math.round(r.width));
        this.h = Math.max(1, Math.round(r.height));
        this.canvas.width = Math.round(this.w * dpr);
        this.canvas.height = Math.round(this.h * dpr);
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        this.parts = [];
        const n = Math.max(24, Math.min(60, Math.floor(this.w * this.h / 22000)));
        for (let i = 0; i < n; i++) {
            this.parts.push({
                x: Math.random() * this.w,
                y: Math.random() * this.h,
                vy: 0.12 + Math.random() * 0.3,
                vx: (Math.random() - 0.5) * 0.08,
                r: 0.8 + Math.random() * 1.4,
                a: 0.15 + Math.random() * 0.3,
                ph: Math.random() * Math.PI * 2
            });
        }
    }

    loop() {
        if (!this.running || document.hidden) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        const t = performance.now() / 1000;
        for (const p of this.parts) {
            p.y += p.vy; p.x += p.vx;
            if (p.y > this.h + 6) { p.y = -6; p.x = Math.random() * this.w; }
            const tw = p.a * (0.7 + 0.3 * Math.sin(t * 1.4 + p.ph));
            ctx.fillStyle = `rgba(52, 211, 153, ${tw.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        requestAnimationFrame(() => this.loop());
    }
}

// ========================================
// ARCH TOOLTIP — hover readout sourced from existing node DOM text
// ========================================
class ArchTooltipEngine {
    constructor() {
        this.section = document.getElementById('architecture');
        if (!this.section) return;
        this.fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        this.reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!this.fine || this.reduced) return;
        this.tip = document.createElement('div');
        this.tip.className = 'arch-tooltip';
        this.tip.setAttribute('role', 'tooltip');
        document.body.appendChild(this.tip);
        this.bind();
    }

    bind() {
        const nodes = this.section.querySelectorAll('.arch-node');
        nodes.forEach(node => {
            node.addEventListener('mouseenter', (e) => this.show(node, e), { passive: true });
            node.addEventListener('mousemove', (e) => this.place(e), { passive: true });
            node.addEventListener('mouseleave', () => this.hide(), { passive: true });
            node.addEventListener('click', () => this.hide(), { passive: true });
        });
    }

    show(node, e) {
        const tier = node.closest('.arch-tier');
        const tierName = tier ? (tier.querySelector('.arch-tier-title') || {}).textContent : '';
        const name = (node.querySelector('.an-name') || {}).textContent || '';
        const meta = (node.querySelector('.an-meta') || {}).textContent || '';
        this.tip.innerHTML = '';
        const t = document.createElement('div'); t.className = 'at-tier'; t.textContent = (tierName || '').trim();
        const n = document.createElement('div'); n.className = 'at-name'; n.textContent = name.trim();
        const m = document.createElement('div'); m.className = 'at-meta'; m.textContent = meta.trim();
        const h = document.createElement('div'); h.className = 'at-hint'; h.textContent = 'Click to inspect data paths';
        this.tip.append(t, n, m, h);
        this.tip.classList.add('at-visible');
        this.place(e);
    }

    place(e) {
        if (!e || e.clientX === undefined) return;
        const pad = 14;
        const w = 270, h = 130;
        let x = e.clientX + 16, y = e.clientY + 16;
        if (x + w > window.innerWidth - pad) x = e.clientX - w - 8;
        if (y + h > window.innerHeight - pad) y = e.clientY - h - 8;
        this.tip.style.left = `${Math.round(x)}px`;
        this.tip.style.top = `${Math.round(y)}px`;
    }

    hide() { this.tip.classList.remove('at-visible'); }
}

// ========================================
// ARCH TIER COLLAPSE — expandable layer groups (compact viewports)
// ========================================
class ArchTierCollapseEngine {
    constructor() {
        this.section = document.getElementById('architecture');
        if (!this.section) return;
        this.tiers = Array.from(this.section.querySelectorAll('.arch-tier'));
        this.tiers.forEach(tier => {
            const header = tier.querySelector('.arch-tier-header');
            if (!header || header.querySelector('.arch-collapse-hint')) return;
            const chev = document.createElement('i');
            chev.className = 'fas fa-chevron-down arch-collapse-hint';
            chev.setAttribute('aria-hidden', 'true');
            header.appendChild(chev);
            header.setAttribute('role', 'button');
            header.setAttribute('tabindex', '0');
            header.setAttribute('aria-expanded', 'true');
            const toggle = () => {
                const collapsed = tier.classList.toggle('tier-collapsed');
                header.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
            };
            header.addEventListener('click', (e) => {
                if (window.innerWidth <= 600) toggle();
            });
            header.addEventListener('keydown', (e) => {
                if ((e.key === 'Enter' || e.key === ' ') && window.innerWidth <= 600) {
                    e.preventDefault();
                    toggle();
                }
            });
        });
    }
}

// ========================================
// STACK MAP — constellation hub wired to the existing category filter
// Labels mirror existing module headers. No technologies added or renamed.
// ========================================
class StackMapEngine {
    constructor() {
        this.map = document.getElementById('stack-map');
        this.section = document.getElementById('stack');
        if (!this.map || !this.section) return;
        this.canvas = document.getElementById('stack-canvas');
        this.core = this.map.querySelector('.stack-hub-core');
        this.sats = Array.from(this.map.querySelectorAll('.stack-sat'));
        this.reduced = (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || document.documentElement.dataset.power === 'low';
        this.running = true;
        this.packets = [];
        this.ends = [];
        this.init();
    }

    filter(id) {
        if (window.techStackInspector) window.techStackInspector.setCategoryFilter(id);
        this.syncActive(id);
    }

    syncActive(id) {
        this.sats.forEach(s => s.classList.toggle('sat-active', s.dataset.cluster === id));
        this.peer(id === 'all' ? null : id);
    }

    peer(cluster) {
        this.section.querySelectorAll('.stack-module').forEach(m => {
            m.classList.toggle('map-peer', !!cluster && m.dataset.category === cluster);
        });
    }

    init() {
        // Satellite <-> existing filter wiring
        this.sats.forEach(sat => {
            sat.addEventListener('mouseenter', () => this.peer(sat.dataset.cluster), { passive: true });
            sat.addEventListener('mouseleave', () => {
                const active = this.sats.find(s => s.classList.contains('sat-active'));
                this.peer(active ? active.dataset.cluster : null);
            }, { passive: true });
            sat.addEventListener('click', () => {
                this.filter(sat.dataset.cluster);
                // On phones, bring the filtered cluster group into view
                if (window.innerWidth < 768) {
                    const grid = this.section.querySelector('.stack-grid');
                    if (grid) grid.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        if (this.core) this.core.addEventListener('click', () => this.filter('all'));

        // Keep satellites in sync when filter tabs are used directly
        this.section.querySelectorAll('.stack-filter-btn').forEach(btn => {
            btn.addEventListener('click', () => this.syncActive(btn.dataset.filter));
        });

        // Reverse highlight: hovering a cluster module lights its satellite
        this.section.querySelectorAll('.stack-module').forEach(m => {
            m.addEventListener('mouseenter', () => {
                const sat = this.sats.find(s => s.dataset.cluster === m.dataset.category);
                if (sat) sat.classList.add('sat-active');
            }, { passive: true });
            m.addEventListener('mouseleave', () => {
                const active = document.querySelector('.stack-filter-btn.active');
                const id = active ? active.dataset.filter : 'all';
                this.syncActive(id);
            }, { passive: true });
        });

        if (!this.canvas || this.reduced) return;
        this.ctx = this.canvas.getContext('2d');
        this.measure();
        window.addEventListener('resize', () => this.measure(), { passive: true });
        window.addEventListener('load', () => this.measure(), { passive: true });

        if ('IntersectionObserver' in window) {
            new IntersectionObserver((entries) => {
                entries.forEach(e => {
                    const vis = e.isIntersecting;
                    if (vis && !this.running) { this.running = true; this.loop(); }
                    if (!vis) this.running = false;
                });
            }, { threshold: 0 }).observe(this.map);
        }
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden && this.running) this.loop();
        });
        this.loop();
    }

    measure() {
        const dpr = Math.min(1.5, window.devicePixelRatio || 1);
        const r = this.map.getBoundingClientRect();
        this.w = Math.max(1, Math.round(r.width));
        this.h = Math.max(1, Math.round(r.height));
        this.canvas.width = Math.round(this.w * dpr);
        this.canvas.height = Math.round(this.h * dpr);
        this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const base = this.map.getBoundingClientRect();
        const center = (el) => {
            const q = el.getBoundingClientRect();
            return { x: q.left - base.left + q.width / 2, y: q.top - base.top + q.height / 2 };
        };
        const origin = center(this.core);
        this.ends = this.sats.map(s => center(s));
        this.origin = origin;
        this.packets = this.ends.map((_, i) => ({ i, t: Math.random() }));
    }

    loop() {
        if (!this.running || document.hidden) return;
        const ctx = this.ctx;
        ctx.clearRect(0, 0, this.w, this.h);
        if (this.origin) {
            this.ends.forEach((p) => {
                ctx.strokeStyle = 'rgba(52, 211, 153, 0.16)';
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(this.origin.x, this.origin.y);
                ctx.lineTo(p.x, p.y);
                ctx.stroke();
            });
            for (const k of this.packets) {
                k.t += 0.008;
                if (k.t >= 1) k.t = 0;
                const p = this.ends[k.i];
                if (!p) continue;
                const x = this.origin.x + (p.x - this.origin.x) * k.t;
                const y = this.origin.y + (p.y - this.origin.y) * k.t;
                ctx.fillStyle = 'rgba(52, 211, 153, 0.6)';
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
        }
        requestAnimationFrame(() => this.loop());
    }
}

// ========================================
// CURSOR FOLLOWER — faint contextual indicator, native cursor preserved
// Desktop fine-pointers only. VIEW on projects, arrow on external links.
// ========================================
class CursorEngine {
    constructor() {
        this.el = document.getElementById('cursor');
        if (!this.el) return;
        const fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
        const calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (!fine || calm) return;
        this.ring = this.el.querySelector('.cursor-ring');
        this.label = this.el.querySelector('.cursor-label');
        this.x = -100; this.y = -100;
        this.rx = -100; this.ry = -100;
        this.on = false;
        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.x = e.clientX; this.y = e.clientY;
            if (!this.on) { this.on = true; this.el.classList.add('cursor-on'); }
            this.context(e);
        }, { passive: true });
        document.addEventListener('mouseleave', () => {
            this.on = false;
            this.el.classList.remove('cursor-on');
        });
        document.addEventListener('mouseenter', () => {
            if (this.x > -100) { this.on = true; this.el.classList.add('cursor-on'); }
        });
        this.loop();
    }

    context(e) {
        const t = e.target;
        if (!t || !t.closest) return;
        let mode = '', text = '';
        if (t.closest('.system-card')) { mode = 'cursor-view'; text = 'VIEW'; }
        else if (t.closest('a[target="_blank"]')) { mode = 'cursor-link'; text = '↗'; }
        else if (t.closest('button, input, .endpoint-link')) { mode = 'cursor-down'; }
        this.el.classList.remove('cursor-view', 'cursor-link', 'cursor-down');
        if (mode) this.el.classList.add(mode);
        if (this.label) this.label.textContent = text;
    }

    loop() {
        this.rx += (this.x - this.rx) * 0.16;
        this.ry += (this.y - this.ry) * 0.16;
        this.el.style.transform = `translate(${this.rx.toFixed(1)}px, ${this.ry.toFixed(1)}px)`;
        requestAnimationFrame(() => this.loop());
    }
}

// ========================================
// TYPE REVEAL — staggered word entrance for headings + hero arrival
// Splits text nodes into word spans (presentation only, copy untouched).
// Hierarchy: hero strongest, sections subtle, footer untouched.
// ========================================
class RevealTypeEngine {
    constructor() {
        this.calm = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    split(el) {
        let i = 0;
        const walk = (node) => {
            Array.from(node.childNodes).forEach(child => {
                if (child.nodeType === 3) {
                    const frag = document.createDocumentFragment();
                    child.textContent.split(/(\s+)/).forEach(part => {
                        if (!part) return;
                        if (/^\s+$/.test(part)) {
                            frag.appendChild(document.createTextNode(' '));
                        } else {
                            const w = document.createElement('span');
                            w.className = 'w';
                            const inner = document.createElement('span');
                            inner.className = 'wi';
                            inner.style.setProperty('--i', i++);
                            inner.textContent = part;
                            w.appendChild(inner);
                            frag.appendChild(w);
                        }
                    });
                    node.replaceChild(frag, child);
                } else if (child.nodeType === 1) {
                    walk(child);
                }
            });
        };
        walk(el);
        return i;
    }

    init() {
        const heroName = document.querySelector('.hero-name');
        const titles = Array.from(document.querySelectorAll('.section-title'));
        const hero = document.getElementById('system');

        if (this.calm) {
            titles.forEach(t => t.classList.add('is-in'));
            if (heroName) heroName.classList.add('is-in');
            return;
        }

        // Hero arrival (strongest motion on the page)
        if (hero) {
            hero.classList.add('boot-enter');
            void hero.offsetHeight;
        }
        if (heroName) {
            this.split(heroName);
            requestAnimationFrame(() => requestAnimationFrame(() => {
                heroName.classList.add('is-in');
                if (hero) { hero.classList.add('boot-in'); }
            }));
        } else if (hero) {
            requestAnimationFrame(() => requestAnimationFrame(() => hero.classList.add('boot-in')));
        }

        // Section headings: subtle stagger on first reveal
        titles.forEach(t => this.split(t));
        if (!('IntersectionObserver' in window)) {
            titles.forEach(t => t.classList.add('is-in'));
            return;
        }
        const io = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.35, rootMargin: '0px 0px -40px 0px' });
        titles.forEach(t => io.observe(t));
    }
}

// ========================================
// POWER SAVER — flags low-powered / data-saving devices before any
// canvas engine constructs, so they render calm fallbacks instead.
// ========================================
class PowerSaverEngine {
    constructor() {
        try {
            const conn = navigator.connection || {};
            const cores = navigator.hardwareConcurrency || 8;
            const ram = navigator.deviceMemory || 8;
            if (conn.saveData === true || cores <= 4 || ram <= 3) {
                document.documentElement.dataset.power = 'low';
            }
        } catch (e) { /* noop */ }
    }
}

// ========================================
// START THE SYSTEM
// ========================================
const portfolioSystem = new PortfolioSystem();

// Export for debugging (optional)
if (typeof window !== 'undefined') {
    window.PortfolioSystem = portfolioSystem;
}
