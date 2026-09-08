/* ========================================
   PROJECT SYSTEM INSPECTOR & DETAIL MODAL
   Upgrades project cards into interactive software systems.
   Provides an elegant, accessible modal/drawer with deep engineering details.
   ======================================== */

(function () {
    'use strict';

    // ── Extended project data derived entirely from existing codebase ──
    const PROJECT_DATA = {
        'Portfolio Generator': {
            category: 'Full-Stack Web System',
            version: 'v2.4.0',
            features: [
                '5 fully customizable portfolio templates with real-time live preview',
                'MongoDB document persistence layer for user profiles and project data',
                '10+ modular RESTful API endpoints handling template configurations',
                'Stateless JWT authentication and role-based session authorization',
                'Real-time live editor with instant responsive viewports switching'
            ],
            engineering: [
                'MERN architecture (MongoDB, Express.js, React.js, Node.js)',
                'RESTful API pipeline designed with Mongoose ODM and JSON schemas',
                'Component-driven React frontend architecture with dynamic template injection',
                'Secure authentication flow with JSON Web Tokens (JWT) & bcrypt hashing',
                'Deployed and monitored on Render cloud infrastructure with high availability'
            ]
        },
        'Calmify': {
            category: 'AI Wellness Platform',
            version: 'v3.1.2',
            features: [
                'AI-driven contextual mental wellness dialogue powered by Azure OpenAI',
                'Real-time bidirectional WebSocket communication via Socket.IO',
                'Role-based access control (RBAC) separating user and administrative capabilities',
                'Production throughput handling 500+ messages per day with 99% uptime',
                'Integrated full walkthrough video demonstration'
            ],
            engineering: [
                'Azure OpenAI integration leveraging contextual prompt pipelines and streaming',
                'Socket.IO WebSocket architecture with automatic reconnection and fallback',
                'Tailwind CSS utility-driven responsive design system',
                'MongoDB database with optimized indexing for message transcripts and user states',
                'Express.js middleware security chain including rate-limiting and sanitization'
            ]
        },
        'RunDown - AI Task Manager': {
            category: 'AI Automation System',
            version: 'v1.8.0',
            features: [
                'Automatic event & deadline extraction from Microsoft Outlook email streams',
                'NLP-powered conversational task creation with natural language understanding',
                'Smart deadline detection with automated reminder scheduling',
                'Seamless two-way Microsoft Calendar synchronization via Microsoft Graph API',
                'OAuth 2.0 authorization code flow for secure corporate account linking'
            ],
            engineering: [
                'Python Flask backend architected with modular RESTful endpoints',
                'Azure OpenAI prompting pipelines for structured JSON extraction from emails',
                'Microsoft Graph API client handling Mail and Calendar resource events',
                'OAuth 2.0 PKCE authentication flow securing tenant-level access',
                'Event-driven background task scheduling and datetime parsing engine'
            ]
        },
        'BuddyOnTrain': {
            category: 'Real-Time Social Platform',
            version: 'v2.0.4',
            features: [
                'Live train schedule lookup and travel itinerary search',
                'Real-time buddy matching algorithm connecting passengers on identical routes',
                'Social networking features including friend requests, status, and messaging',
                'Scalable infrastructure tested and optimized for 100+ concurrent users',
                'Secure travel profile management and verified itinerary storage'
            ],
            engineering: [
                'Single Page Application (SPA) built with React.js and Tailwind CSS',
                'Node.js & Express.js REST API with route caching and indexing',
                'MongoDB document store schema optimized for geographic and schedule queries',
                'Stateless JWT authorization verifying passenger identities and requests',
                'Non-blocking async I/O handlers engineered for concurrent traveler matching'
            ]
        },
        'Svalinn': {
            category: 'Browser Security & Focus System',
            version: 'v1.5.2',
            features: [
                'Password-protected distracting website blocking to maintain deep focus',
                'Official Chrome Web Store publication with 100+ active users and 4.8/5 rating',
                '100% privacy-first local storage architecture with zero external data collection',
                'Instant one-click toggle with password verification challenge',
                'Customizable site blacklist with regex pattern matching'
            ],
            engineering: [
                'Chrome Extension Manifest V3 compliant service worker architecture',
                'Chrome DeclarativeNetRequest, Tabs, and Storage API integration',
                'Zero external runtime dependencies: 100% vanilla JavaScript for instant execution',
                'Local cryptographic credential hashing and storage isolation',
                'Low memory footprint (<5MB RAM) operating silently in the browser background'
            ]
        },
        'Employee Management System': {
            category: 'Enterprise Desktop Software',
            version: 'v1.0.0',
            features: [
                'Comprehensive CRUD operations for employee records and personnel files',
                'Department tracking and organizational hierarchy mapping',
                'Automated report generation and tabular payroll summaries',
                'Real-time transactional data persistence with atomic database commits',
                'Clean, intuitive desktop graphical user interface (GUI)'
            ],
            engineering: [
                'Native Java desktop application built using Swing and JFrame components',
                'Model-View-Controller (MVC) architectural design pattern',
                'MySQL relational database integration using JDBC database drivers',
                'SQL injection prevention via PreparedStatement parameter binding',
                'Event-driven action listeners powering desktop interface reactivity'
            ]
        }
    };

    // ── Helper: Extract card data from DOM ──
    function parseCard(cardEl) {
        const name = cardEl.querySelector('.system-name')?.textContent?.trim() || '';
        const desc = cardEl.querySelector('.system-desc')?.textContent?.trim() || '';
        const status = cardEl.querySelector('.status-text')?.textContent?.trim() || 'RUNNING';
        const imgEl = cardEl.querySelector('.system-image img');
        const imgSrc = imgEl?.getAttribute('src') || '';
        const imgAlt = imgEl?.getAttribute('alt') || name;

        // Architecture items
        const arch = [];
        cardEl.querySelectorAll('.arch-item').forEach(item => {
            const label = item.querySelector('.arch-label')?.textContent?.trim().replace(':', '') || '';
            const value = item.querySelector('.arch-value')?.textContent?.trim() || '';
            if (label && value) arch.push({ label, value });
        });

        // Technology tags
        const tags = [];
        cardEl.querySelectorAll('.sys-tag').forEach(t => {
            const txt = t.textContent.trim();
            if (txt) tags.push(txt);
        });

        // Links
        const links = [];
        cardEl.querySelectorAll('.sys-link').forEach(link => {
            const href = link.getAttribute('href') || '#';
            const text = link.textContent.trim();
            const icon = link.querySelector('i')?.className || '';
            const isVideo = link.getAttribute('onclick')?.includes('openVideoModal') || false;
            const onclick = link.getAttribute('onclick') || null;
            const isLive = link.classList.contains('sys-link-live') || text.toLowerCase().includes('demo') || text.toLowerCase().includes('store');
            const isGithub = link.classList.contains('sys-link-github') || text.toLowerCase().includes('github') || text.toLowerCase().includes('repo');

            links.push({ href, text, icon, isVideo, onclick, isLive, isGithub });
        });

        const extra = PROJECT_DATA[name] || {
            category: 'Software System',
            version: 'v1.0.0',
            features: [desc],
            engineering: arch.map(a => `${a.label}: ${a.value}`)
        };

        return { name, desc, status, imgSrc, imgAlt, arch, tags, links, extra };
    }

    // ── Build Modal DOM elements ───────────
    function createModalDOM() {
        const backdrop = document.createElement('div');
        backdrop.id = 'project-modal-backdrop';

        const modal = document.createElement('div');
        modal.id = 'project-modal';
        modal.setAttribute('role', 'dialog');
        modal.setAttribute('aria-modal', 'true');
        modal.setAttribute('aria-labelledby', 'pm-title');
        modal.innerHTML = `
            <div class="pm-drag-handle" aria-hidden="true"></div>
            <button class="pm-close" id="pm-close-btn" aria-label="Close project modal (Escape)">
                <i class="fas fa-times" aria-hidden="true"></i>
            </button>
            <div class="pm-content" id="pm-content"></div>
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);

        return {
            backdrop,
            modal,
            content: modal.querySelector('#pm-content'),
            closeBtn: modal.querySelector('#pm-close-btn')
        };
    }

    // ── Render Modal Body Content ──────────
    function buildModalHTML(data) {
        // Links HTML
        const linksHtml = data.links.map(l => {
            if (l.isVideo) {
                return `
                    <a href="#" class="pm-link pm-link-video" onclick="${l.onclick}">
                        <i class="fas fa-video" aria-hidden="true"></i> Video Walkthrough
                    </a>
                `;
            }
            if (l.isLive) {
                return `
                    <a href="${l.href}" target="_blank" rel="noopener noreferrer" class="pm-link pm-link-primary">
                        <i class="fas fa-external-link-alt" aria-hidden="true"></i> ${l.text.includes('Store') ? 'Chrome Web Store' : 'Live System Demo'}
                    </a>
                `;
            }
            if (l.isGithub) {
                return `
                    <a href="${l.href}" target="_blank" rel="noopener noreferrer" class="pm-link">
                        <i class="fab fa-github" aria-hidden="true"></i> Source Code (GitHub)
                    </a>
                `;
            }
            return `
                <a href="${l.href}" target="_blank" rel="noopener noreferrer" class="pm-link">
                    <i class="${l.icon}" aria-hidden="true"></i> ${l.text}
                </a>
            `;
        }).join('');

        // Tags HTML
        const tagsHtml = data.tags.map(t => `<span class="pm-tag"><i class="fas fa-code-branch" aria-hidden="true"></i> ${t}</span>`).join('');

        // Architecture items HTML
        const archHtml = data.arch.map(a => `
            <div class="pm-arch-row">
                <span class="pm-arch-label">${a.label}</span>
                <span class="pm-arch-value">${a.value}</span>
            </div>
        `).join('');

        // Features list
        const featuresHtml = data.extra.features.map(f => `<li>${f}</li>`).join('');

        // Engineering list
        const engineeringHtml = data.extra.engineering.map(e => `<li>${e}</li>`).join('');

        return `
            <div class="pm-hero">
                <img src="${data.imgSrc}" alt="${data.imgAlt}" class="pm-hero-img" />
                <div class="pm-hero-overlay"></div>
                <div class="pm-hero-info">
                    <div class="pm-status">
                        <span class="pm-status-dot" aria-hidden="true"></span>
                        <span class="pm-status-text">SYSTEM // ${data.status} &bull; ${data.extra.version}</span>
                    </div>
                    <h2 class="pm-title" id="pm-title">${data.name}</h2>
                </div>
            </div>

            <div class="pm-body">
                <!-- Section 1: Overview -->
                <div class="pm-section">
                    <h3 class="pm-section-title">
                        <i class="fas fa-terminal" aria-hidden="true"></i> System Overview
                    </h3>
                    <p class="pm-desc">${data.desc}</p>
                </div>

                <!-- Section 2: Technology Badges -->
                <div class="pm-section">
                    <h3 class="pm-section-title">
                        <i class="fas fa-layer-group" aria-hidden="true"></i> Core Stack & Badges
                    </h3>
                    <div class="pm-tags">
                        ${tagsHtml}
                    </div>
                </div>

                <!-- Section 3: Architecture Specs -->
                <div class="pm-section">
                    <h3 class="pm-section-title">
                        <i class="fas fa-sitemap" aria-hidden="true"></i> Architecture Matrix
                    </h3>
                    <div class="pm-arch">
                        ${archHtml}
                    </div>
                </div>

                <!-- Section 4: Features & Engineering Details -->
                <div class="pm-two-col">
                    <div class="pm-section">
                        <h3 class="pm-section-title">
                            <i class="fas fa-check-circle" aria-hidden="true"></i> Key Capabilities
                        </h3>
                        <ul class="pm-list">
                            ${featuresHtml}
                        </ul>
                    </div>

                    <div class="pm-section">
                        <h3 class="pm-section-title">
                            <i class="fas fa-cogs" aria-hidden="true"></i> Engineering Details
                        </h3>
                        <ul class="pm-list">
                            ${engineeringHtml}
                        </ul>
                    </div>
                </div>

                <!-- Section 5: System Links & Deployment -->
                <div class="pm-section pm-links-section">
                    <h3 class="pm-section-title">
                        <i class="fas fa-link" aria-hidden="true"></i> Deployments & Repository
                    </h3>
                    <div class="pm-links">
                        ${linksHtml}
                    </div>
                </div>
            </div>
        `;
    }

    // ── Project Modal Controller ───────────
    class ProjectModalController {
        constructor() {
            const dom = createModalDOM();
            this.backdrop = dom.backdrop;
            this.modal = dom.modal;
            this.content = dom.content;
            this.closeBtn = dom.closeBtn;
            this.isOpen = false;
            this.lastFocusedElement = null;

            this._initCards();
            this._bindEvents();
        }

        _initCards() {
            const cards = document.querySelectorAll('.system-card');
            cards.forEach(card => {
                // Ensure a View Details button exists
                let btn = card.querySelector('.sys-details-btn');
                if (!btn) {
                    btn = document.createElement('button');
                    btn.className = 'sys-details-btn';
                    const name = card.querySelector('.system-name')?.textContent?.trim() || 'system';
                    btn.setAttribute('aria-label', `View ${name} details`);
                    btn.innerHTML = '<i class="fas fa-microchip" aria-hidden="true"></i> View System Details';

                    const linksDiv = card.querySelector('.system-links');
                    if (linksDiv) {
                        card.insertBefore(btn, linksDiv);
                    } else {
                        card.appendChild(btn);
                    }
                }

                // Explicit click on View Details button
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.open(card);
                });

                // Clicking anywhere on card (except actual links) opens details
                card.addEventListener('click', (e) => {
                    if (e.target.closest('a') || e.target.closest('.sys-link')) {
                        return; // let link navigation happen normally
                    }
                    if (e.target.closest('.sys-details-btn')) {
                        return; // handled by button listener
                    }
                    this.open(card);
                });
            });
        }

        _bindEvents() {
            // Close button click
            this.closeBtn.addEventListener('click', () => this.close());

            // Backdrop click
            this.backdrop.addEventListener('click', () => this.close());

            // Escape key & Tab trapping
            document.addEventListener('keydown', (e) => {
                if (!this.isOpen) return;

                if (e.key === 'Escape') {
                    e.preventDefault();
                    this.close();
                    return;
                }

                if (e.key === 'Tab') {
                    this._handleTabTrap(e);
                }
            });

            // Mobile drag handle touch gestures
            let startY = 0;
            let currentY = 0;

            const handleTouchStart = (e) => {
                if (window.innerWidth > 768) return;
                startY = e.touches[0].clientY;
                currentY = startY;
            };

            const handleTouchMove = (e) => {
                if (window.innerWidth > 768 || !startY) return;
                currentY = e.touches[0].clientY;
                const diff = currentY - startY;
                if (diff > 0) {
                    // Pulling down
                    this.modal.style.transform = `translateY(${diff}px)`;
                }
            };

            const handleTouchEnd = () => {
                if (window.innerWidth > 768 || !startY) return;
                const diff = currentY - startY;
                this.modal.style.transform = '';
                if (diff > 90) {
                    this.close();
                }
                startY = 0;
                currentY = 0;
            };

            const dragHandle = this.modal.querySelector('.pm-drag-handle');
            if (dragHandle) {
                dragHandle.addEventListener('touchstart', handleTouchStart, { passive: true });
                dragHandle.addEventListener('touchmove', handleTouchMove, { passive: true });
                dragHandle.addEventListener('touchend', handleTouchEnd, { passive: true });
            }
        }

        _handleTabTrap(e) {
            const focusables = this.modal.querySelectorAll(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusables.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        open(cardEl) {
            this.lastFocusedElement = document.activeElement;
            const data = parseCard(cardEl);
            this.content.innerHTML = buildModalHTML(data);
            this.content.scrollTop = 0;

            this.isOpen = true;
            this.backdrop.classList.add('pm-visible');
            this.modal.classList.add('pm-visible');
            document.body.style.overflow = 'hidden';

            // Focus close button for keyboard accessibility
            requestAnimationFrame(() => {
                this.closeBtn.focus();
            });
        }

        openByName(name) {
            const cards = document.querySelectorAll('.system-card');
            for (const card of cards) {
                const cardName = card.querySelector('.system-name')?.textContent?.trim();
                if (cardName && cardName.toLowerCase().includes(name.toLowerCase())) {
                    this.open(card);
                    return true;
                }
            }
            return false;
        }

        close() {
            if (!this.isOpen) return;
            this.isOpen = false;
            this.backdrop.classList.remove('pm-visible');
            this.modal.classList.remove('pm-visible');
            document.body.style.overflow = '';

            // Return focus to triggering element
            if (this.lastFocusedElement && typeof this.lastFocusedElement.focus === 'function') {
                this.lastFocusedElement.focus();
            }
        }
    }

    // ── Init on DOM ready ─────────────────
    let controllerInstance = null;
    function init() {
        if (!controllerInstance) {
            controllerInstance = new ProjectModalController();
            window.projectModal = controllerInstance;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
