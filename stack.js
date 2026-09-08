/* ========================================
   TECH STACK & ENGINEERING DEPENDENCY GRAPH
   Makes the Tech Stack interactive:
   - Category filtering (Languages, Frontend, Backend, Database, AI, Tools, All)
   - Graph exploration: highlights projects & experience on hover/select
   - Contextual telemetry tooltip (HUD)
   - Animate companion technologies
   - Pin/lock inspection with Escape to clear
   ======================================== */

(function () {
    'use strict';

    // ── Engineering Dependency Graph Mapping ──
    const DEPENDENCY_GRAPH = {
        'React.js': {
            category: 'Frontend',
            role: 'Component-driven UI library powering dynamic template generation and responsive user interfaces',
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain'],
            timeline: ['CultureVo (NoviFE Platform)'],
            related: ['Next.js', 'JavaScript/ES6+', 'JavaScript', 'Tailwind CSS', 'Node.js', 'HTML5/CSS3']
        },
        'Next.js': {
            category: 'Frontend',
            role: 'Production React framework powering PWA architecture & multi-personality AI interactions in NoviFE',
            projects: [],
            timeline: ['CultureVo (NoviFE Platform)'],
            related: ['React.js', 'JavaScript/ES6+', 'JavaScript', 'Tailwind CSS']
        },
        'JavaScript/ES6+': {
            category: 'Frontend & Logic',
            role: 'Core language driving full-stack reactivity, async streams, and Chrome extension service workers',
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain', 'Svalinn'],
            timeline: ['CultureVo (NoviFE Platform)', 'NextTech Lab'],
            related: ['JavaScript', 'React.js', 'Node.js', 'Next.js', 'HTML5/CSS3']
        },
        'JavaScript': {
            category: 'Languages',
            role: 'Core language driving full-stack reactivity, async streams, and Chrome extension service workers',
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain', 'Svalinn'],
            timeline: ['CultureVo (NoviFE Platform)', 'NextTech Lab'],
            related: ['JavaScript/ES6+', 'React.js', 'Node.js', 'Next.js', 'HTML5/CSS3']
        },
        'Tailwind CSS': {
            category: 'Frontend',
            role: 'Utility-first CSS framework for responsive layout systems in Calmify and CultureVo platform',
            projects: ['Calmify', 'BuddyOnTrain'],
            timeline: ['CultureVo (NoviFE Platform)'],
            related: ['React.js', 'Next.js', 'HTML5/CSS3']
        },
        'HTML5/CSS3': {
            category: 'Frontend',
            role: 'Semantic DOM architecture and responsive styling system across all web applications',
            projects: ['Portfolio Generator', 'Calmify', 'RunDown - AI Task Manager', 'BuddyOnTrain', 'Svalinn'],
            timeline: ['CultureVo (NoviFE Platform)'],
            related: ['JavaScript/ES6+', 'Tailwind CSS']
        },
        'Node.js': {
            category: 'Backend',
            role: 'Event-driven async runtime powering REST API backends, Socket.IO WebSockets & MongoDB services',
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain'],
            timeline: ['CultureVo (NoviFE Platform)', 'NextTech Lab'],
            related: ['Express.js', 'MongoDB', 'REST APIs', 'Socket.IO', 'JavaScript/ES6+']
        },
        'Express.js': {
            category: 'Backend',
            role: 'Fast Node.js HTTP framework managing REST endpoints, JWT authorization & middleware chains',
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain'],
            timeline: ['SRM University AP'],
            related: ['Node.js', 'REST APIs', 'MongoDB', 'JWT Auth']
        },
        'Python': {
            category: 'Backend & Languages',
            role: 'Backend programming language powering Flask microservices, Outlook email extraction & AI prompt pipelines',
            projects: ['RunDown - AI Task Manager'],
            timeline: ['Visa', 'SRM University AP'],
            related: ['Flask', 'Azure OpenAI']
        },
        'Flask': {
            category: 'Backend',
            role: 'Lightweight WSGI web framework architecting the RunDown task extraction & Microsoft Graph sync service',
            projects: ['RunDown - AI Task Manager'],
            timeline: [],
            related: ['Python', 'Azure OpenAI', 'REST APIs', 'Google APIs']
        },
        'REST APIs': {
            category: 'Backend',
            role: 'Contract-based HTTP architecture for modular client-server data flow and CRUD endpoints',
            projects: ['Portfolio Generator', 'Calmify', 'RunDown - AI Task Manager', 'BuddyOnTrain'],
            timeline: ['CultureVo (NoviFE Platform)', 'NextTech Lab', 'SRM University AP'],
            related: ['Node.js', 'Express.js', 'Flask', 'Postman', 'JWT Auth']
        },
        'MongoDB': {
            category: 'Databases',
            role: 'NoSQL document store managing user accounts, portfolio templates, and travel buddy connections',
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain'],
            timeline: ['SRM University AP'],
            related: ['Mongoose ODM', 'Node.js', 'Express.js']
        },
        'Mongoose ODM': {
            category: 'Databases',
            role: 'Schema validation and query modeling abstraction layer for MongoDB databases',
            projects: ['Portfolio Generator', 'Calmify'],
            timeline: [],
            related: ['MongoDB', 'Express.js', 'Node.js']
        },
        'MySQL': {
            category: 'Databases',
            role: 'Relational ACID SQL database for structured employee records, departments, and payroll data',
            projects: ['Employee Management System'],
            timeline: ['SRM University AP'],
            related: ['SQL', 'Java']
        },
        'SQL': {
            category: 'Databases',
            role: 'Structured relational query syntax utilized in Java JDBC database transactions and reporting',
            projects: ['Employee Management System'],
            timeline: ['SRM University AP'],
            related: ['MySQL', 'Java']
        },
        'Azure OpenAI': {
            category: 'AI / ML',
            role: 'Enterprise LLM API powering contextual chat in Calmify and automatic event parsing in RunDown',
            projects: ['Calmify', 'RunDown - AI Task Manager'],
            timeline: ['NextTech Lab', 'SRM University AP'],
            related: ['Python', 'Flask', 'Socket.IO', 'Node.js']
        },
        'Gemini API': {
            category: 'AI / ML',
            role: 'Google AI multimodal API utilized for experimental AI prototyping and API integration at NextTech Lab',
            projects: [],
            timeline: ['NextTech Lab'],
            related: ['Google APIs', 'Azure OpenAI', 'Python']
        },
        'Google APIs': {
            category: 'AI / ML & Auth',
            role: 'OAuth 2.0 authorization, cloud APIs, and calendar integration protocols',
            projects: ['RunDown - AI Task Manager'],
            timeline: ['NextTech Lab'],
            related: ['Azure OpenAI', 'JWT Auth', 'REST APIs']
        },
        'Git / GitHub': {
            category: 'Tools',
            role: 'Distributed version control, collaborative workflows, and repository management across 1000+ commits',
            projects: ['Portfolio Generator', 'Calmify', 'RunDown - AI Task Manager', 'BuddyOnTrain', 'Svalinn', 'Employee Management System'],
            timeline: ['Visa', 'CultureVo (NoviFE Platform)', 'NextTech Lab', 'SRM University AP'],
            related: ['VS Code']
        },
        'Socket.IO': {
            category: 'Tools',
            role: 'Bidirectional WebSocket real-time communication pipeline powering Calmify chat (500+ msgs/day)',
            projects: ['Calmify'],
            timeline: ['NextTech Lab'],
            related: ['Node.js', 'Express.js', 'React.js']
        },
        'JWT Auth': {
            category: 'Tools',
            role: 'RFC 7519 cryptographic JSON Web Token authorization securing API endpoints and sessions',
            projects: ['Portfolio Generator', 'BuddyOnTrain'],
            timeline: ['SRM University AP'],
            related: ['Node.js', 'Express.js', 'REST APIs']
        },
        'Postman': {
            category: 'Tools',
            role: 'API lifecycle suite for designing, testing, and debugging RESTful services & authentication flows',
            projects: ['Portfolio Generator', 'RunDown - AI Task Manager', 'BuddyOnTrain'],
            timeline: ['CultureVo (NoviFE Platform)', 'NextTech Lab'],
            related: ['REST APIs', 'Express.js', 'Flask']
        },
        'VS Code': {
            category: 'Tools',
            role: 'Integrated engineering environment with debugging, linting, and workspace terminal workflows',
            projects: ['Portfolio Generator', 'Calmify', 'RunDown - AI Task Manager', 'BuddyOnTrain', 'Svalinn', 'Employee Management System'],
            timeline: ['Visa', 'CultureVo (NoviFE Platform)', 'NextTech Lab', 'SRM University AP'],
            related: ['Git / GitHub']
        },
        'C++': {
            category: 'Languages',
            role: 'Systems language utilized for algorithm design, data structures, and computational foundation at SRM AP',
            projects: [],
            timeline: ['SRM University AP'],
            related: ['Python', 'Java']
        },
        'Java': {
            category: 'Languages',
            role: 'Object-oriented programming language architecting desktop Swing/JFrame GUI and JDBC database transactions',
            projects: ['Employee Management System'],
            timeline: ['SRM University AP'],
            related: ['MySQL', 'SQL', 'C++']
        }
    };

    class TechStackInspector {
        constructor() {
            this.section = document.getElementById('stack');
            if (!this.section) return;

            this.pinnedNode = null;
            this.activeHoverNode = null;
            this._hoverTimeout = null;

            this._initCategoryFilters();
            this._createTooltip();
            this._createGraphBanner();
            this._initTechNodes();
            this._bindGlobalEvents();
        }

        // ── 1. Category Filtering ─────────────
        _initCategoryFilters() {
            // Find or build the filter bar
            let filterBar = this.section.querySelector('.stack-filters');
            if (!filterBar) {
                filterBar = document.createElement('div');
                filterBar.className = 'stack-filters';
                filterBar.setAttribute('role', 'tablist');
                filterBar.setAttribute('aria-label', 'Filter Tech Stack by Category');

                const categories = [
                    { id: 'all',       label: 'ALL',        icon: 'fas fa-th-large' },
                    { id: 'languages', label: 'LANGUAGES',  icon: 'fas fa-code' },
                    { id: 'frontend',  label: 'FRONTEND',   icon: 'fab fa-react' },
                    { id: 'backend',   label: 'BACKEND',    icon: 'fab fa-node-js' },
                    { id: 'database',  label: 'DATABASE',   icon: 'fas fa-database' },
                    { id: 'ai',        label: 'AI / ML',    icon: 'fas fa-brain' },
                    { id: 'tools',     label: 'TOOLS',      icon: 'fas fa-tools' }
                ];

                filterBar.innerHTML = categories.map((cat, idx) => `
                    <button class="stack-filter-btn ${idx === 0 ? 'active' : ''}"
                            data-filter="${cat.id}"
                            role="tab"
                            aria-selected="${idx === 0 ? 'true' : 'false'}"
                            tabindex="${idx === 0 ? '0' : '-1'}">
                        <i class="${cat.icon}" aria-hidden="true"></i> ${cat.label}
                    </button>
                `).join('');

                const grid = this.section.querySelector('.stack-grid');
                if (grid) {
                    this.section.querySelector('.container').insertBefore(filterBar, grid);
                }
            }

            this.filterBtns = filterBar.querySelectorAll('.stack-filter-btn');
            this.modules = this.section.querySelectorAll('.stack-module');

            this.filterBtns.forEach((btn, idx) => {
                btn.addEventListener('click', () => {
                    this.setCategoryFilter(btn.dataset.filter);
                });

                // Keyboard arrow navigation
                btn.addEventListener('keydown', (e) => {
                    let nextIdx = null;
                    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        nextIdx = (idx + 1) % this.filterBtns.length;
                    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        nextIdx = (idx - 1 + this.filterBtns.length) % this.filterBtns.length;
                    }

                    if (nextIdx !== null) {
                        e.preventDefault();
                        this.filterBtns[nextIdx].focus();
                        this.filterBtns[nextIdx].click();
                    }
                });
            });
        }

        setCategoryFilter(categoryId) {
            this.filterBtns.forEach(btn => {
                const isActive = btn.dataset.filter === categoryId;
                btn.classList.toggle('active', isActive);
                btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
                btn.tabIndex = isActive ? 0 : -1;
            });

            this.modules.forEach(module => {
                const moduleCat = module.dataset.category;
                const match = categoryId === 'all' || moduleCat === categoryId;

                if (match) {
                    module.classList.remove('module-hidden');
                    module.style.display = '';
                } else {
                    module.classList.add('module-hidden');
                    module.style.display = 'none';
                }
            });
        }

        // ── 2. Contextual Telemetry Tooltip (HUD) ──
        _createTooltip() {
            this.tooltip = document.createElement('div');
            this.tooltip.className = 'stack-tooltip';
            this.tooltip.setAttribute('role', 'tooltip');
            this.tooltip.setAttribute('aria-hidden', 'true');
            this.tooltip.innerHTML = `
                <div class="st-header">
                    <span class="st-status-dot"></span>
                    <span class="st-tech-name"></span>
                    <span class="st-tech-version"></span>
                </div>
                <div class="st-role"></div>
                <div class="st-stats">
                    <span class="st-stat st-projects-stat"><i class="fas fa-server"></i> <span class="st-num">0</span> Projects</span>
                    <span class="st-stat st-timeline-stat"><i class="fas fa-briefcase"></i> <span class="st-num">0</span> Roles</span>
                    <span class="st-stat st-related-stat"><i class="fas fa-project-diagram"></i> <span class="st-num">0</span> Linked</span>
                </div>
                <div class="st-footer">Click to lock graph inspection &bull; Esc to reset</div>
            `;
            document.body.appendChild(this.tooltip);
        }

        // ── 3. Pinned Graph Banner ────────────
        _createGraphBanner() {
            this.banner = document.createElement('div');
            this.banner.className = 'stack-graph-banner';
            this.banner.innerHTML = `
                <div class="sg-content">
                    <span class="sg-dot"></span>
                    <span class="sg-title">DEP_GRAPH //</span>
                    <span class="sg-node">INSPECTING:</span>
                    <span class="sg-name"></span>
                    <span class="sg-stats"></span>
                </div>
                <button class="sg-clear-btn" aria-label="Clear graph inspection (Escape)">
                    <i class="fas fa-times"></i> Clear (Esc)
                </button>
            `;
            this.section.querySelector('.container').appendChild(this.banner);

            this.banner.querySelector('.sg-clear-btn').addEventListener('click', () => {
                this.clearInspection();
            });
        }

        // ── 4. Tech Item Node Wiring ──────────
        _initTechNodes() {
            this.techItems = this.section.querySelectorAll('.tech-item');

            this.techItems.forEach(item => {
                const nameEl = item.querySelector('.tech-name');
                const name = nameEl?.textContent?.trim() || '';
                const version = item.querySelector('.tech-version')?.textContent?.trim() || '';

                item.dataset.tech = name;
                item.setAttribute('role', 'button');
                item.setAttribute('tabindex', '0');
                item.setAttribute('aria-label', `Inspect ${name} dependencies`);

                // Pointer hover with debounce buffer to eliminate flickering
                item.addEventListener('mouseenter', () => {
                    if (this.pinnedNode) return; // Keep pinned node in focus
                    clearTimeout(this._hoverTimeout);
                    if (this.activeHoverNode === name) return; // Already inspecting
                    this.inspectNode(name, version, item, false);
                });

                item.addEventListener('mouseleave', () => {
                    if (this.pinnedNode) return;
                    clearTimeout(this._hoverTimeout);
                    this._hoverTimeout = setTimeout(() => {
                        this.clearHover();
                    }, 80);
                });

                // Click to pin/lock
                item.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (this.pinnedNode === name) {
                        this.clearInspection();
                    } else {
                        this.pinNode(name, version, item);
                    }
                });

                // Keyboard activation
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        if (this.pinnedNode === name) {
                            this.clearInspection();
                        } else {
                            this.pinNode(name, version, item);
                        }
                    }
                });
            });
        }

        // ── 5. Graph Highlighting Engine ──────
        inspectNode(techName, version, itemEl, isPinned) {
            const data = DEPENDENCY_GRAPH[techName] || {
                role: 'Technology component in engineering system',
                projects: [],
                timeline: [],
                related: []
            };

            this.activeHoverNode = techName;

            // Highlight Tech Items in stack
            this.techItems.forEach(item => {
                const itName = item.dataset.tech;
                if (itName === techName) {
                    item.classList.add('dep-active-node');
                    item.classList.remove('dep-linked-tech', 'dep-dimmed-tech');
                } else if (data.related.includes(itName)) {
                    item.classList.add('dep-linked-tech');
                    item.classList.remove('dep-active-node', 'dep-dimmed-tech');
                } else {
                    item.classList.add('dep-dimmed-tech');
                    item.classList.remove('dep-active-node', 'dep-linked-tech');
                }
            });

            // If pinned to lock, highlight connected projects and timeline
            if (isPinned) {
                // Highlight Projects
                const projectCards = document.querySelectorAll('.system-card');
                projectCards.forEach(card => {
                    const cardName = card.querySelector('.system-name')?.textContent?.trim() || '';
                    const match = data.projects.some(p => cardName.toLowerCase().includes(p.toLowerCase()) || p.toLowerCase().includes(cardName.toLowerCase()));

                    if (match) {
                        card.classList.add('dep-highlight-project');
                        card.classList.remove('dep-dimmed-project');

                        // Add dynamic dependency indicator badge if not present
                        let badge = card.querySelector('.dep-project-badge');
                        if (!badge) {
                            badge = document.createElement('div');
                            badge.className = 'dep-project-badge';
                            card.insertBefore(badge, card.querySelector('.system-image'));
                        }
                        badge.innerHTML = `<i class="fas fa-bolt"></i> REQUIRES: <span>${techName}</span>`;
                    } else {
                        card.classList.add('dep-dimmed-project');
                        card.classList.remove('dep-highlight-project');
                        const badge = card.querySelector('.dep-project-badge');
                        if (badge) badge.remove();
                    }
                });

                // Also highlight Featured Card if it matches
                const featuredCards = document.querySelectorAll('.featured-card');
                featuredCards.forEach(fcard => {
                    const match = data.projects.includes('Calmify');
                    if (match) {
                        fcard.classList.add('dep-highlight-project');
                        fcard.classList.remove('dep-dimmed-project');
                    } else {
                        fcard.classList.add('dep-dimmed-project');
                        fcard.classList.remove('dep-highlight-project');
                    }
                });

                // Highlight Experience / Timeline
                const timelineItems = document.querySelectorAll('.timeline-item');
                timelineItems.forEach(item => {
                    const header = item.querySelector('.timeline-summary, .timeline-header')?.textContent?.trim() || '';
                    const match = data.timeline.some(t => header.toLowerCase().includes(t.toLowerCase()) || t.toLowerCase().includes(header.toLowerCase()));

                    if (match) {
                        item.classList.add('dep-highlight-timeline');
                        item.classList.remove('dep-dimmed-timeline');

                        let badge = item.querySelector('.dep-timeline-badge');
                        if (!badge) {
                            badge = document.createElement('span');
                            badge.className = 'dep-timeline-badge';
                            item.querySelector('.timeline-summary, .timeline-header')?.appendChild(badge);
                        }
                        badge.innerHTML = `<i class="fas fa-bolt"></i> UTILIZED IN ROLE`;
                    } else {
                        item.classList.add('dep-dimmed-timeline');
                        item.classList.remove('dep-highlight-timeline');
                        const badge = item.querySelector('.dep-timeline-badge');
                        if (badge) badge.remove();
                    }
                });
            }

            // Update & Show Contextual Tooltip HUD
            this._updateTooltip(techName, version, data, itemEl, isPinned);
        }

        _updateTooltip(techName, version, data, itemEl, isPinned) {
            const nameSpan = this.tooltip.querySelector('.st-tech-name');
            const verSpan = this.tooltip.querySelector('.st-tech-version');
            const roleDiv = this.tooltip.querySelector('.st-role');
            const projNum = this.tooltip.querySelector('.st-projects-stat .st-num');
            const timeNum = this.tooltip.querySelector('.st-timeline-stat .st-num');
            const relNum = this.tooltip.querySelector('.st-related-stat .st-num');
            const footer = this.tooltip.querySelector('.st-footer');

            nameSpan.textContent = techName;
            verSpan.textContent = version || data.category;
            roleDiv.textContent = data.role;
            projNum.textContent = data.projects.length;
            timeNum.textContent = data.timeline.length;
            relNum.textContent = data.related.length;

            footer.textContent = isPinned
                ? 'Inspection LOCKED • Scroll down to view • Esc to reset'
                : 'Click to lock graph inspection • Esc to reset';

            // Position Tooltip using Fixed Viewport Coordinates
            const rect = itemEl.getBoundingClientRect();
            const tooltipWidth = Math.min(320, window.innerWidth - 32);
            const tooltipHeight = 150;

            // Preferred position: above the item
            let top = rect.top - tooltipHeight - 10;
            let left = rect.left + (rect.width / 2) - (tooltipWidth / 2);

            // If clipped at top (navbar is ~72px tall), place below the item
            if (top < 75) {
                top = rect.bottom + 10;
            }

            // If clipped at bottom of screen
            if (top + tooltipHeight > window.innerHeight - 12) {
                top = Math.max(75, window.innerHeight - tooltipHeight - 12);
            }

            // Horizontal bounds
            if (left < 16) left = 16;
            if (left + tooltipWidth > window.innerWidth - 16) {
                left = window.innerWidth - tooltipWidth - 16;
            }

            this.tooltip.style.top = `${Math.round(top)}px`;
            this.tooltip.style.left = `${Math.round(left)}px`;
            this.tooltip.classList.add('st-visible');
        }

        pinNode(techName, version, itemEl) {
            clearTimeout(this._hoverTimeout);
            this.pinnedNode = techName;
            this.inspectNode(techName, version, itemEl, true);

            // Show Banner
            const data = DEPENDENCY_GRAPH[techName] || { projects: [], timeline: [], related: [] };
            this.banner.querySelector('.sg-name').textContent = techName;
            this.banner.querySelector('.sg-stats').textContent =
                `(${data.projects.length} Projects • ${data.timeline.length} Roles • ${data.related.length} Linked Techs)`;
            this.banner.classList.add('sg-visible');
        }

        clearHover() {
            clearTimeout(this._hoverTimeout);
            if (this.pinnedNode) return;
            this.tooltip.classList.remove('st-visible');
            this.activeHoverNode = null;

            // Reset tech items
            this.techItems.forEach(item => {
                item.classList.remove('dep-active-node', 'dep-linked-tech', 'dep-dimmed-tech');
            });
        }

        clearInspection() {
            clearTimeout(this._hoverTimeout);
            this.pinnedNode = null;
            this.banner.classList.remove('sg-visible');

            // Reset projects
            document.querySelectorAll('.system-card, .featured-card').forEach(card => {
                card.classList.remove('dep-highlight-project', 'dep-dimmed-project');
                const badge = card.querySelector('.dep-project-badge');
                if (badge) badge.remove();
            });

            // Reset timeline
            document.querySelectorAll('.timeline-item').forEach(item => {
                item.classList.remove('dep-highlight-timeline', 'dep-dimmed-timeline');
                const badge = item.querySelector('.dep-timeline-badge');
                if (badge) badge.remove();
            });

            this.clearHover();
        }

        _bindGlobalEvents() {
            // Escape clears inspection
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (this.pinnedNode || this.activeHoverNode) {
                        this.clearInspection();
                    }
                }
            });

            // Clicking outside tech stack clears pin
            document.addEventListener('click', (e) => {
                if (this.pinnedNode) {
                    if (!e.target.closest('#stack') && !e.target.closest('.stack-tooltip') && !e.target.closest('.stack-graph-banner')) {
                        this.clearInspection();
                    }
                }
            });
        }
    }

    // ── Init on DOM ready ─────────────────
    let inspectorInstance = null;
    function init() {
        if (!inspectorInstance) {
            inspectorInstance = new TechStackInspector();
            window.techStackInspector = inspectorInstance;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
