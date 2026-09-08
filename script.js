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
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        // Keep floating dock navigation links in sync with active section
        const floatingLinks = document.querySelectorAll('#floating-dock .fd-link[data-section]');
        floatingLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
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
    }
    
    toggleMenu() {
        this.toggle.classList.toggle('active');
        this.navLinks.classList.toggle('mobile-active');
        
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
            // Initialize all components
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
// START THE SYSTEM
// ========================================
const portfolioSystem = new PortfolioSystem();

// Export for debugging (optional)
if (typeof window !== 'undefined') {
    window.PortfolioSystem = portfolioSystem;
}
