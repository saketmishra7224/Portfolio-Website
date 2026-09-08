/* ========================================
   SYSTEM ARCHITECTURE ENGINE
   Interactive Full-Stack Architecture Pipeline:
   User -> Frontend -> API / Real-Time Layer -> Backend -> Database / External Services -> AI / Automation
   - Interactive clickable nodes with flow path tracing
   - Telemetry inspector with protocol specs, data ingress/egress & engineering decisions
   - Cross-linking to projects and experience
   - Lightweight pure SVG + CSS architecture (zero 3D bloat)
   - Graceful mobile pipeline
   ======================================== */

(function () {
    'use strict';

    // ── Architectural Nodes & Pipeline Definition ──
    const ARCH_DATA = {
        // TIER 1: User / Client Layer
        'user-web': {
            id: 'user-web',
            name: 'Web & Mobile Browsers',
            tier: 'Tier 1 // Client Layer',
            icon: 'fas fa-globe',
            protocol: 'HTTP/2 • HTTPS • WSS',
            summary: 'Cross-platform end users accessing responsive Single Page Applications and PWAs across desktop, tablet, and mobile viewports.',
            upstream: [],
            downstream: ['front-react', 'front-next', 'front-tailwind'],
            projects: ['Portfolio Generator', 'Calmify', 'RunDown - AI Task Manager', 'BuddyOnTrain'],
            experience: ['CultureVo (NoviFE Platform)', 'SRM University AP'],
            rationale: 'Mobile-first responsive design ensures 100% device compatibility with zero client-side installation overhead.'
        },
        'user-ext': {
            id: 'user-ext',
            name: 'Chrome Extension Client',
            tier: 'Tier 1 // Client Layer',
            icon: 'fab fa-chrome',
            protocol: 'Chrome Runtime IPC',
            summary: 'Active browser users requiring distraction blocking directly inside the Chrome Web Store extension runtime.',
            upstream: [],
            downstream: ['db-local'],
            projects: ['Svalinn'],
            experience: [],
            rationale: 'Manifest V3 extension client executes within Chrome browser sandbox, prioritizing immediate responsiveness and privacy.'
        },
        'user-desktop': {
            id: 'user-desktop',
            name: 'Desktop Operating System',
            tier: 'Tier 1 // Client Layer',
            icon: 'fas fa-desktop',
            protocol: 'JVM Native Window Event System',
            summary: 'Enterprise workstation operators interacting with local Swing/JFrame window manager and OS native input peripherals.',
            upstream: [],
            downstream: ['back-java'],
            projects: ['Employee Management System'],
            experience: ['SRM University AP'],
            rationale: 'Direct native desktop deployment provides low-latency transactional execution for internal enterprise record management.'
        },

        // TIER 2: Frontend Layer
        'front-react': {
            id: 'front-react',
            name: 'React.js Component Engine',
            tier: 'Tier 2 // Presentation Tier',
            icon: 'fab fa-react',
            protocol: 'Virtual DOM • ES6+ JSX • React Hooks',
            summary: 'Component-driven Single Page Application framework rendering real-time portfolio previews, live chat interfaces, and buddy feeds.',
            upstream: ['user-web'],
            downstream: ['api-rest', 'api-socket', 'api-auth'],
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain'],
            experience: ['CultureVo (NoviFE Platform)', 'NextTech Lab'],
            rationale: 'Modular component architecture with declarative state allows instant UI updates without whole-page browser reloads.'
        },
        'front-next': {
            id: 'front-next',
            name: 'Next.js 15 PWA Platform',
            tier: 'Tier 2 // Presentation Tier',
            icon: 'fas fa-layer-group',
            protocol: 'App Router • SSR • PWA Service Workers',
            summary: 'Hybrid server-rendered and client-hydrated Progressive Web App architecture engineered for the NoviFE cultural AI platform.',
            upstream: ['user-web'],
            downstream: ['api-rest', 'api-socket'],
            projects: [],
            experience: ['CultureVo (NoviFE Platform)'],
            rationale: 'Next.js App Router optimizes first contentful paint (FCP) and handles multi-personality AI interactions smoothly for 1000+ users.'
        },
        'front-tailwind': {
            id: 'front-tailwind',
            name: 'Tailwind CSS Design System',
            tier: 'Tier 2 // Presentation Tier',
            icon: 'fas fa-palette',
            protocol: 'Utility-First JIT Compiler • CSS3',
            summary: 'Zero-runtime utility CSS compilation engine enforcing design consistency, high-contrast dark modes, and fluid responsive grids.',
            upstream: ['user-web'],
            downstream: ['front-react', 'front-next'],
            projects: ['Calmify', 'BuddyOnTrain'],
            experience: ['CultureVo (NoviFE Platform)'],
            rationale: 'Eliminates dead CSS bundles and optimizes production payloads to less than 20KB for instantaneous rendering.'
        },

        // TIER 3: API & Real-Time Gateway Layer
        'api-rest': {
            id: 'api-rest',
            name: 'RESTful API Gateway',
            tier: 'Tier 3 // API & Communication Tier',
            icon: 'fas fa-network-wired',
            protocol: 'HTTP/1.1 & HTTPS • JSON Payloads • CORS',
            summary: 'Stateless contract-driven API endpoints handling CRUD transactions, template configurations, and portfolio persistence.',
            upstream: ['front-react', 'front-next'],
            downstream: ['back-node', 'back-flask'],
            projects: ['Portfolio Generator', 'Calmify', 'RunDown - AI Task Manager', 'BuddyOnTrain'],
            experience: ['CultureVo (NoviFE Platform)', 'NextTech Lab', 'SRM University AP'],
            rationale: 'Strict REST semantics with structured JSON schemas decouple frontend presentation from backend microservices.'
        },
        'api-socket': {
            id: 'api-socket',
            name: 'Socket.IO Real-Time Gateway',
            tier: 'Tier 3 // API & Communication Tier',
            icon: 'fas fa-bolt',
            protocol: 'WebSocket (WSS) • Polling Fallback • RFC 6455',
            summary: 'Full-duplex bidirectional communication channel streaming conversational AI responses and multi-user chat events in Calmify.',
            upstream: ['front-react', 'front-next'],
            downstream: ['back-node'],
            projects: ['Calmify'],
            experience: ['NextTech Lab'],
            rationale: 'Eliminates HTTP polling overhead, maintaining a continuous sub-50ms latency pipeline for 500+ daily wellness messages.'
        },
        'api-auth': {
            id: 'api-auth',
            name: 'JWT Security & Session Layer',
            tier: 'Tier 3 // API & Communication Tier',
            icon: 'fas fa-shield-alt',
            protocol: 'RFC 7519 JWT • Bearer Tokens • SHA-256',
            summary: 'Cryptographic token validation gateway verifying user identities, role-based authorizations (RBAC), and session expiration.',
            upstream: ['front-react'],
            downstream: ['back-node'],
            projects: ['Portfolio Generator', 'BuddyOnTrain', 'Calmify'],
            experience: ['SRM University AP'],
            rationale: 'Stateless JWT tokens remove centralized session store bottlenecks, allowing horizontal backend scaling.'
        },
        'api-graph': {
            id: 'api-graph',
            name: 'Microsoft Graph & OAuth 2.0',
            tier: 'Tier 3 // API & Communication Tier',
            icon: 'fab fa-microsoft',
            protocol: 'OAuth 2.0 PKCE • REST • Graph API v1.0',
            summary: 'Enterprise integration gateway extracting live Outlook email message streams and synchronizing calendar events in RunDown.',
            upstream: ['front-react'],
            downstream: ['back-flask'],
            projects: ['RunDown - AI Task Manager'],
            experience: ['NextTech Lab'],
            rationale: 'Direct Graph API webhooks avoid polling Outlook servers and maintain automated calendar synchronization.'
        },

        // TIER 4: Backend Layer
        'back-node': {
            id: 'back-node',
            name: 'Node.js & Express.js Services',
            tier: 'Tier 4 // Application Logic Tier',
            icon: 'fab fa-node-js',
            protocol: 'Asynchronous Event Loop • V8 Engine',
            summary: 'High-throughput async backend microservice layer processing business validation, WebSocket routing, and DB connection pooling.',
            upstream: ['api-rest', 'api-socket', 'api-auth'],
            downstream: ['db-mongo', 'ai-azure', 'ext-render'],
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain'],
            experience: ['CultureVo (NoviFE Platform)', 'NextTech Lab'],
            rationale: 'Non-blocking I/O multiplexes concurrent user connections effortlessly without multi-threading memory overhead.'
        },
        'back-flask': {
            id: 'back-flask',
            name: 'Python & Flask Microservices',
            tier: 'Tier 4 // Application Logic Tier',
            icon: 'fab fa-python',
            protocol: 'WSGI • Python 3.11 • JSON Endpoints',
            summary: 'Specialized Python backend orchestrating email parsing pipelines, prompt formatting, and task deadline calculation algorithms.',
            upstream: ['api-rest', 'api-graph'],
            downstream: ['ai-azure', 'ai-pipeline', 'ext-render'],
            projects: ['RunDown - AI Task Manager'],
            experience: ['SRM University AP'],
            rationale: 'Python ecosystem provides unmatched native libraries for string processing, datetime calculation, and AI SDK integration.'
        },
        'back-java': {
            id: 'back-java',
            name: 'Java MVC Architecture (Swing/JDBC)',
            tier: 'Tier 4 // Application Logic Tier',
            icon: 'fab fa-java',
            protocol: 'JDK 17 • MVC Pattern • Event Dispatch Thread',
            summary: 'Enterprise desktop business tier encapsulating department hierarchies, payroll calculations, and report generation workflows.',
            upstream: ['user-desktop'],
            downstream: ['db-mysql'],
            projects: ['Employee Management System'],
            experience: ['SRM University AP'],
            rationale: 'Strict object-oriented model separates graphical presentation from relational database transactions.'
        },

        // TIER 5: Database & External Services Tier
        'db-mongo': {
            id: 'db-mongo',
            name: 'MongoDB Atlas & Mongoose ODM',
            tier: 'Tier 5 // Persistence & External Tier',
            icon: 'fas fa-database',
            protocol: 'WiredTiger Engine • BSON • TCP 27017',
            summary: 'Distributed document store persisting portfolio configurations, user accounts, chat transcripts, and travel itineraries.',
            upstream: ['back-node'],
            downstream: [],
            projects: ['Portfolio Generator', 'Calmify', 'BuddyOnTrain'],
            experience: ['SRM University AP'],
            rationale: 'Document model natively maps to JSON application objects, allowing schema evolution without database downtime migrations.'
        },
        'db-mysql': {
            id: 'db-mysql',
            name: 'MySQL Relational Database (JDBC)',
            tier: 'Tier 5 // Persistence & External Tier',
            icon: 'fas fa-table',
            protocol: 'JDBC 4.2 • SQL Queries • PreparedStatement',
            summary: 'Relational ACID persistence layer guaranteeing atomic commits for employee salary files, departmental shifts, and audit logs.',
            upstream: ['back-java'],
            downstream: [],
            projects: ['Employee Management System'],
            experience: ['SRM University AP'],
            rationale: 'Foreign key constraints and indexed B-Trees ensure relational data integrity and prevent SQL injection attacks.'
        },
        'db-local': {
            id: 'db-local',
            name: 'Chrome Isolated Local Storage',
            tier: 'Tier 5 // Persistence & External Tier',
            icon: 'fas fa-lock',
            protocol: 'Chrome Storage API • On-Device Cryptography',
            summary: 'Zero-knowledge on-device storage for Svalinn Chrome extension preserving user blocking rules and encrypted passwords.',
            upstream: ['user-ext'],
            downstream: [],
            projects: ['Svalinn'],
            experience: [],
            rationale: 'Zero external network transmission guarantees 100% user privacy and complies with Chrome Web Store security standards.'
        },
        'ext-render': {
            id: 'ext-render',
            name: 'Render Cloud Infrastructure',
            tier: 'Tier 5 // Persistence & External Tier',
            icon: 'fas fa-cloud',
            protocol: 'Automated CI/CD • TLS 1.3 • Containerized',
            summary: 'Cloud hosting platform running production containers for Portfolio Generator, Calmify, RunDown, and BuddyOnTrain.',
            upstream: ['back-node', 'back-flask'],
            downstream: [],
            projects: ['Portfolio Generator', 'Calmify', 'RunDown - AI Task Manager', 'BuddyOnTrain'],
            experience: [],
            rationale: 'Automated Git-triggered deployments with automatic SSL certificates and 99% verified service uptime.'
        },

        // TIER 6: AI & Automation Tier
        'ai-azure': {
            id: 'ai-azure',
            name: 'Azure OpenAI (LLM Inference)',
            tier: 'Tier 6 // AI & Intelligence Tier',
            icon: 'fas fa-brain',
            protocol: 'Azure REST SDK • Streaming Responses • HTTPS',
            summary: 'Cognitive LLM infrastructure generating empathetic dialogue in Calmify and parsing unstructured Outlook emails into task JSON.',
            upstream: ['back-node', 'back-flask'],
            downstream: ['ai-pipeline'],
            projects: ['Calmify', 'RunDown - AI Task Manager'],
            experience: ['NextTech Lab', 'SRM University AP'],
            rationale: 'Enterprise SLA with strict data residency, privacy guarantees, and low-latency token generation.'
        },
        'ai-gemini': {
            id: 'ai-gemini',
            name: 'Gemini Multimodal API',
            tier: 'Tier 6 // AI & Intelligence Tier',
            icon: 'fas fa-robot',
            protocol: 'Google GenAI SDK • Multimodal REST',
            summary: 'Exploratory multimodal intelligence framework utilized for rapid prototyping and live API integration at NextTech Lab.',
            upstream: ['back-flask'],
            downstream: [],
            projects: [],
            experience: ['NextTech Lab'],
            rationale: 'Large context window allows processing multi-modal documents and fast experimental validation.'
        },
        'ai-pipeline': {
            id: 'ai-pipeline',
            name: 'Event-Driven Extraction Pipeline',
            tier: 'Tier 6 // AI & Intelligence Tier',
            icon: 'fas fa-calendar-check',
            protocol: 'Regex NLP • Datetime Extraction • Graph Sync',
            summary: 'Automated parsing engine converting unstructured email bodies into structured task records with strict ISO-8601 deadlines.',
            upstream: ['ai-azure', 'back-flask'],
            downstream: ['api-graph'],
            projects: ['RunDown - AI Task Manager'],
            experience: ['Visa', 'SRM University AP'],
            rationale: 'Combines LLM intelligence with deterministic regex validation to eliminate hallucinated calendar dates.'
        }
    };

    class SystemArchitectureInspector {
        constructor() {
            this.section = document.getElementById('architecture');
            if (!this.section) return;

            this.selectedNodeId = 'front-react'; // Default active node
            this.hoveredNodeId = null;

            this.nodes = this.section.querySelectorAll('.arch-node');
            this.inspector = this.section.querySelector('.arch-inspector');

            this._initNodes();
            this._initGlobalEvents();

            // Select default node on init
            this.selectNode('front-react', false);
        }

        _initNodes() {
            this.nodes.forEach(node => {
                const id = node.dataset.nodeId;
                if (!id || !ARCH_DATA[id]) return;

                node.setAttribute('role', 'button');
                node.setAttribute('tabindex', '0');
                node.setAttribute('aria-label', `Inspect architecture node: ${ARCH_DATA[id].name}`);

                // Click to select/lock
                node.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.selectNode(id, true);
                });

                // Hover preview
                node.addEventListener('mouseenter', () => {
                    this.hoverNode(id);
                });

                node.addEventListener('mouseleave', () => {
                    this.clearHover();
                });

                // Keyboard activation
                node.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        this.selectNode(id, true);
                    }
                });
            });
        }

        _initGlobalEvents() {
            // Escape resets selection to default or clears
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    if (this.selectedNodeId) {
                        this.selectNode('front-react', false);
                    }
                }
            });
        }

        hoverNode(nodeId) {
            this.hoveredNodeId = nodeId;
            this._highlightPaths(nodeId);
        }

        clearHover() {
            this.hoveredNodeId = null;
            if (this.selectedNodeId) {
                this._highlightPaths(this.selectedNodeId);
            } else {
                this._resetAllNodeStates();
            }
        }

        selectNode(nodeId, shouldScrollInspector) {
            if (!ARCH_DATA[nodeId]) return;
            this.selectedNodeId = nodeId;
            this._highlightPaths(nodeId);
            this._renderInspector(nodeId);

            // On mobile, smoothly bring inspector into view if user tapped a node
            if (shouldScrollInspector && window.innerWidth <= 992 && this.inspector) {
                const top = this.inspector.getBoundingClientRect().top + window.scrollY - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        }

        _highlightPaths(targetId) {
            const data = ARCH_DATA[targetId];
            if (!data) return;

            const upstreamSet = new Set(data.upstream || []);
            const downstreamSet = new Set(data.downstream || []);

            this.nodes.forEach(node => {
                const id = node.dataset.nodeId;
                node.classList.remove(
                    'arch-node-active',
                    'arch-node-upstream',
                    'arch-node-downstream',
                    'arch-node-dimmed'
                );

                if (id === targetId) {
                    node.classList.add('arch-node-active');
                } else if (upstreamSet.has(id)) {
                    node.classList.add('arch-node-upstream');
                } else if (downstreamSet.has(id)) {
                    node.classList.add('arch-node-downstream');
                } else {
                    node.classList.add('arch-node-dimmed');
                }
            });

            // Update SVG Connectors if present
            this._updateSvgLines(targetId, upstreamSet, downstreamSet);
        }

        _resetAllNodeStates() {
            this.nodes.forEach(node => {
                node.classList.remove(
                    'arch-node-active',
                    'arch-node-upstream',
                    'arch-node-downstream',
                    'arch-node-dimmed'
                );
            });
        }

        _updateSvgLines(targetId, upstreamSet, downstreamSet) {
            const svg = this.section.querySelector('.arch-bus-svg');
            if (!svg) return;

            const lines = svg.querySelectorAll('.arch-bus-line');
            lines.forEach(line => {
                const from = line.dataset.from;
                const to = line.dataset.to;

                line.classList.remove('line-active', 'line-upstream', 'line-downstream', 'line-dimmed');

                if (from === targetId || to === targetId) {
                    line.classList.add('line-active');
                } else if (upstreamSet.has(from) && to === targetId) {
                    line.classList.add('line-upstream');
                } else if (from === targetId && downstreamSet.has(to)) {
                    line.classList.add('line-downstream');
                } else {
                    line.classList.add('line-dimmed');
                }
            });
        }

        _renderInspector(nodeId) {
            const data = ARCH_DATA[nodeId];
            if (!data || !this.inspector) return;

            // Projects HTML
            let projectsHtml = '';
            if (data.projects && data.projects.length > 0) {
                projectsHtml = data.projects.map(p => `
                    <div class="ai-project-pill">
                        <span class="ai-pill-name"><i class="fas fa-cube" aria-hidden="true"></i> ${p}</span>
                        <button class="ai-pill-btn" data-project="${p}" aria-label="Inspect ${p} project specifications">
                            Inspect <i class="fas fa-arrow-right" aria-hidden="true"></i>
                        </button>
                    </div>
                `).join('');
            } else {
                projectsHtml = '<div class="ai-empty-meta">Core platform architectural standard</div>';
            }

            // Experience HTML
            let experienceHtml = '';
            if (data.experience && data.experience.length > 0) {
                experienceHtml = data.experience.map(e => `
                    <div class="ai-exp-pill">
                        <i class="fas fa-briefcase" aria-hidden="true"></i> ${e}
                    </div>
                `).join('');
            } else {
                experienceHtml = '<div class="ai-empty-meta">Enterprise & full-stack development foundation</div>';
            }

            // Upstream nodes HTML
            const upstreamHtml = data.upstream.length > 0
                ? data.upstream.map(u => {
                    const uData = ARCH_DATA[u];
                    return `<span class="ai-flow-tag upstream" data-target="${u}"><i class="fas fa-arrow-up" aria-hidden="true"></i> ${uData ? uData.name : u}</span>`;
                }).join('')
                : '<span class="ai-flow-none">Initial Client Entry Point</span>';

            // Downstream nodes HTML
            const downstreamHtml = data.downstream.length > 0
                ? data.downstream.map(d => {
                    const dData = ARCH_DATA[d];
                    return `<span class="ai-flow-tag downstream" data-target="${d}"><i class="fas fa-arrow-down" aria-hidden="true"></i> ${dData ? dData.name : d}</span>`;
                }).join('')
                : '<span class="ai-flow-none">Terminal Persistence / Model Tier</span>';

            this.inspector.innerHTML = `
                <div class="ai-card">
                    <!-- Inspector Header -->
                    <div class="ai-header">
                        <div class="ai-badge-row">
                            <span class="ai-tier-tag">${data.tier}</span>
                            <span class="ai-status"><span class="ai-status-dot"></span> ACTIVE COMPONENT</span>
                        </div>
                        <h3 class="ai-title"><i class="${data.icon}" aria-hidden="true"></i> ${data.name}</h3>
                        <div class="ai-protocol"><i class="fas fa-code-branch" aria-hidden="true"></i> Protocol: <span>${data.protocol}</span></div>
                    </div>

                    <!-- Summary & Role -->
                    <div class="ai-body">
                        <div class="ai-section">
                            <h4 class="ai-sub-title"><i class="fas fa-info-circle" aria-hidden="true"></i> Architectural Role</h4>
                            <p class="ai-desc">${data.summary}</p>
                        </div>

                        <!-- Data Flow (Ingress / Egress) -->
                        <div class="ai-section">
                            <h4 class="ai-sub-title"><i class="fas fa-exchange-alt" aria-hidden="true"></i> Data Pipeline</h4>
                            <div class="ai-flow-grid">
                                <div class="ai-flow-col">
                                    <span class="ai-flow-label">Ingress (Upstream)</span>
                                    <div class="ai-flow-tags">${upstreamHtml}</div>
                                </div>
                                <div class="ai-flow-col">
                                    <span class="ai-flow-label">Egress (Downstream)</span>
                                    <div class="ai-flow-tags">${downstreamHtml}</div>
                                </div>
                            </div>
                        </div>

                        <!-- Projects Utilizing Component -->
                        <div class="ai-section">
                            <h4 class="ai-sub-title"><i class="fas fa-server" aria-hidden="true"></i> Systems Utilizing Component</h4>
                            <div class="ai-projects-list">
                                ${projectsHtml}
                            </div>
                        </div>

                        <!-- Experience / Roles -->
                        <div class="ai-section">
                            <h4 class="ai-sub-title"><i class="fas fa-user-check" aria-hidden="true"></i> Applied Experience</h4>
                            <div class="ai-exp-list">
                                ${experienceHtml}
                            </div>
                        </div>

                        <!-- Engineering Decision -->
                        <div class="ai-section ai-rationale-section">
                            <h4 class="ai-sub-title"><i class="fas fa-lightbulb" aria-hidden="true"></i> Architectural Rationale</h4>
                            <p class="ai-rationale">${data.rationale}</p>
                        </div>
                    </div>
                </div>
            `;

            // Wire up "Inspect" buttons inside project pills
            this.inspector.querySelectorAll('.ai-pill-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const proj = btn.dataset.project;
                    if (window.projectModal && proj) {
                        window.projectModal.openByName(proj);
                    }
                });
            });

            // Wire up flow tags to click and jump to that node
            this.inspector.querySelectorAll('.ai-flow-tag').forEach(tag => {
                tag.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const target = tag.dataset.target;
                    if (target) {
                        this.selectNode(target, true);
                    }
                });
            });
        }
    }

    // ── Init on DOM ready ─────────────────
    let archInstance = null;
    function init() {
        if (!archInstance) {
            archInstance = new SystemArchitectureInspector();
            window.systemArchitectureInspector = archInstance;
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
