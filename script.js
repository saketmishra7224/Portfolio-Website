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
        this.init();
    }
    
    init() {
        if (!this.progressBar) return;
        
        window.addEventListener('scroll', () => {
            this.updateProgress();
        });
        
        // Initial update
        this.updateProgress();
    }
    
    updateProgress() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        
        this.progressBar.style.width = scrolled + '%';
    }
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
class BackToTop {
    constructor() {
        this.button = document.getElementById('back-to-top');
        this.init();
    }
    
    init() {
        if (!this.button) return;
        
        // Show/hide based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                this.button.classList.add('visible');
            } else {
                this.button.classList.remove('visible');
            }
        });
        
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
// SCROLL ANIMATIONS (Intersection Observer)
// ========================================
class ScrollAnimations {
    constructor() {
        this.observer = null;
        this.init();
    }
    
    init() {
        // Create intersection observer
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('fade-in');
                        
                        // Optional: unobserve after animation
                        // this.observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: CONFIG.scroll.threshold,
                rootMargin: CONFIG.scroll.rootMargin
            }
        );
        
        // Observe all animatable elements
        this.observeElements();
    }
    
    observeElements() {
        const selectors = [
            '.config-block',
            '.stack-module',
            '.featured-card',
            '.system-card',
            '.timeline-item',
            '.endpoint-card'
        ];
        
        selectors.forEach(selector => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(el => {
                this.observer.observe(el);
            });
        });
    }
}

// ========================================
// NAVIGATION HIGHLIGHTING
// ========================================
class NavigationHighlight {
    constructor() {
        this.sections = [];
        this.navLinks = [];
        this.init();
    }
    
    init() {
        // Get all sections and nav links
        this.sections = document.querySelectorAll('section[id]');
        this.navLinks = document.querySelectorAll('.nav-links a');
        
        if (this.sections.length === 0 || this.navLinks.length === 0) return;
        
        // Add scroll listener
        window.addEventListener('scroll', () => {
            this.highlightNavigation();
        });
        
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
    }
    
    highlightNavigation() {
        let current = '';
        
        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });
        
        this.navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
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
// SYSTEM STATUS INDICATORS
// ========================================
class SystemStatus {
    constructor() {
        this.updateStatuses();
        setInterval(() => this.updateStatuses(), 5000);
    }
    
    updateStatuses() {
        const indicators = document.querySelectorAll('.status-indicator.running');
        indicators.forEach(indicator => {
            // Simulate system heartbeat
            indicator.style.animation = 'none';
            setTimeout(() => {
                indicator.style.animation = 'pulse 2s ease-in-out infinite';
            }, 10);
        });
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
// KEYBOARD SHORTCUTS
// ========================================
class KeyboardShortcuts {
    constructor() {
        this.init();
    }
    
    init() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + K: Focus search (placeholder for future)
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                console.log('Search feature coming soon!');
            }
            
            // Ctrl/Cmd + /: Show keyboard shortcuts
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                this.showShortcuts();
            }
            
            // Home key: Scroll to top
            if (e.key === 'Home') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
            
            // End key: Scroll to bottom
            if (e.key === 'End') {
                e.preventDefault();
                window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
            }
        });
    }
    
    showShortcuts() {
        console.log('%cKeyboard Shortcuts:', 'color: #06b6d4; font-weight: bold; font-size: 16px;');
        console.log('%c• Home - Scroll to top', 'color: #cbd5e1;');
        console.log('%c• End - Scroll to bottom', 'color: #cbd5e1;');
        console.log('%c• Ctrl/Cmd + / - Show shortcuts', 'color: #cbd5e1;');
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
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log('%cPerformance Metrics:', 'color: #10b981; font-weight: bold;');
                    console.log(`%cPage Load: ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`, 'color: #cbd5e1;');
                    console.log(`%cDOM Ready: ${Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart)}ms`, 'color: #cbd5e1;');
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
            this.components.push(new NavigationHighlight());
            this.components.push(new MobileNav());
            this.components.push(new TechStackAnimation());
            this.components.push(new SystemStatus());
            this.components.push(new CursorGlow());
            this.components.push(new MetricsCounter());
            this.components.push(new ConsoleEasterEgg());
            this.components.push(new KeyboardShortcuts());
            this.components.push(new PerformanceMonitor());
            
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
