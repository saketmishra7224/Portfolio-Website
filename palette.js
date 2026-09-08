/* ========================================
   COMMAND PALETTE
   Linear / Vercel / Raycast-style global command palette.
   Activated with "/" or "Ctrl/Cmd + K".
   ======================================== */

(function () {
    'use strict';

    // ── Palette items ─────────────────────
    const PALETTE_ITEMS = [
        // Navigation
        { id: 'nav-status',       label: 'View System Status',        section: 'Navigation', icon: 'fas fa-heartbeat',        action: () => scrollTo('#system-status-widget') },
        { id: 'nav-profile',      label: 'Go to Profile',             section: 'Navigation', icon: 'fas fa-user',            action: () => scrollTo('#profile') },
        { id: 'nav-stack',        label: 'Go to Tech Stack',          section: 'Navigation', icon: 'fas fa-layer-group',     action: () => scrollTo('#stack') },
        { id: 'nav-architecture', label: 'Go to System Architecture', section: 'Navigation', icon: 'fas fa-project-diagram', action: () => scrollTo('#architecture') },
        { id: 'nav-projects',     label: 'Go to Projects',            section: 'Navigation', icon: 'fas fa-server',          action: () => scrollTo('#systems') },
        { id: 'nav-experience',   label: 'Go to Experience',          section: 'Navigation', icon: 'fas fa-briefcase',       action: () => scrollTo('#timeline') },
        { id: 'nav-contact',      label: 'Go to Contact',             section: 'Navigation', icon: 'fas fa-envelope',        action: () => scrollTo('#endpoints') },
        { id: 'nav-top',          label: 'Scroll to Top',             section: 'Navigation', icon: 'fas fa-arrow-up',        action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },

        // Actions
        { id: 'act-resume',    label: 'Open Resume',               section: 'Actions',    icon: 'fas fa-file-alt',      action: () => window.open('assets/Resume.pdf', '_blank') },
        { id: 'act-shortcuts', label: 'View Keyboard Shortcuts',  section: 'Actions',    icon: 'fas fa-keyboard',      action: () => { if (window.shortcutsModal) window.shortcutsModal.open(); } },
        { id: 'act-terminal',  label: 'Toggle Terminal',           section: 'Actions',    icon: 'fas fa-terminal',      action: () => { if (window.interactiveTerminal) window.interactiveTerminal.toggle(); } },

        // Tech Stack Filters
        { id: 'stack-all',       label: 'Filter Stack: All Modules',     section: 'Tech Stack', icon: 'fas fa-layer-group', action: () => { scrollTo('#stack'); if (window.techStackInspector) window.techStackInspector.setCategoryFilter('all'); } },
        { id: 'stack-languages', label: 'Filter Stack: Languages',       section: 'Tech Stack', icon: 'fas fa-code',        action: () => { scrollTo('#stack'); if (window.techStackInspector) window.techStackInspector.setCategoryFilter('languages'); } },
        { id: 'stack-frontend',  label: 'Filter Stack: Frontend',        section: 'Tech Stack', icon: 'fab fa-react',       action: () => { scrollTo('#stack'); if (window.techStackInspector) window.techStackInspector.setCategoryFilter('frontend'); } },
        { id: 'stack-backend',   label: 'Filter Stack: Backend',         section: 'Tech Stack', icon: 'fab fa-node-js',     action: () => { scrollTo('#stack'); if (window.techStackInspector) window.techStackInspector.setCategoryFilter('backend'); } },
        { id: 'stack-database',  label: 'Filter Stack: Databases',       section: 'Tech Stack', icon: 'fas fa-database',    action: () => { scrollTo('#stack'); if (window.techStackInspector) window.techStackInspector.setCategoryFilter('database'); } },
        { id: 'stack-ai',        label: 'Filter Stack: AI / ML',         section: 'Tech Stack', icon: 'fas fa-brain',       action: () => { scrollTo('#stack'); if (window.techStackInspector) window.techStackInspector.setCategoryFilter('ai'); } },
        { id: 'stack-tools',     label: 'Filter Stack: Tools & Infra',   section: 'Tech Stack', icon: 'fas fa-tools',       action: () => { scrollTo('#stack'); if (window.techStackInspector) window.techStackInspector.setCategoryFilter('tools'); } },

        // Architecture Pipeline
        { id: 'arch-client',   label: 'Architecture: Client Layer (Web/Ext/Desktop)',   section: 'Architecture', icon: 'fas fa-globe',        action: () => { scrollTo('#architecture'); if (window.systemArchitectureInspector) window.systemArchitectureInspector.selectNode('user-web', true); } },
        { id: 'arch-frontend', label: 'Architecture: Frontend (React/Next.js)',         section: 'Architecture', icon: 'fab fa-react',        action: () => { scrollTo('#architecture'); if (window.systemArchitectureInspector) window.systemArchitectureInspector.selectNode('front-react', true); } },
        { id: 'arch-realtime', label: 'Architecture: API & Real-Time (WebSockets/REST)', section: 'Architecture', icon: 'fas fa-bolt',         action: () => { scrollTo('#architecture'); if (window.systemArchitectureInspector) window.systemArchitectureInspector.selectNode('api-socket', true); } },
        { id: 'arch-backend',  label: 'Architecture: Backend (Node.js/Flask/Java)',     section: 'Architecture', icon: 'fab fa-node-js',      action: () => { scrollTo('#architecture'); if (window.systemArchitectureInspector) window.systemArchitectureInspector.selectNode('back-node', true); } },
        { id: 'arch-database', label: 'Architecture: Database & Storage (MongoDB/MySQL)',section: 'Architecture', icon: 'fas fa-database',     action: () => { scrollTo('#architecture'); if (window.systemArchitectureInspector) window.systemArchitectureInspector.selectNode('db-mongo', true); } },
        { id: 'arch-ai',       label: 'Architecture: AI & Automation (Azure/Gemini)',   section: 'Architecture', icon: 'fas fa-brain',        action: () => { scrollTo('#architecture'); if (window.systemArchitectureInspector) window.systemArchitectureInspector.selectNode('ai-azure', true); } },

        // Projects
        { id: 'proj-portfolio', label: 'Inspect Portfolio Generator', section: 'Projects', icon: 'fas fa-microchip', action: () => { if (window.projectModal) window.projectModal.openByName('Portfolio Generator'); else scrollTo('#systems'); } },
        { id: 'proj-calmify',   label: 'Inspect Calmify (AI Platform)', section: 'Projects', icon: 'fas fa-microchip', action: () => { if (window.projectModal) window.projectModal.openByName('Calmify'); else scrollTo('#systems'); } },
        { id: 'proj-rundown',   label: 'Inspect RunDown (Task Manager)', section: 'Projects', icon: 'fas fa-microchip', action: () => { if (window.projectModal) window.projectModal.openByName('RunDown'); else scrollTo('#systems'); } },
        { id: 'proj-train',     label: 'Inspect BuddyOnTrain',        section: 'Projects', icon: 'fas fa-microchip', action: () => { if (window.projectModal) window.projectModal.openByName('BuddyOnTrain'); else scrollTo('#systems'); } },
        { id: 'proj-svalinn',   label: 'Inspect Svalinn (Extension)', section: 'Projects', icon: 'fas fa-microchip', action: () => { if (window.projectModal) window.projectModal.openByName('Svalinn'); else scrollTo('#systems'); } },
        { id: 'proj-ems',       label: 'Inspect Employee Mgmt System', section: 'Projects', icon: 'fas fa-microchip', action: () => { if (window.projectModal) window.projectModal.openByName('Employee Management System'); else scrollTo('#systems'); } },

        // Links
        { id: 'link-github',   label: 'Open GitHub',         section: 'Links',      icon: 'fab fa-github',        action: () => window.open('https://github.com/saketmishra7224', '_blank') },
        { id: 'link-linkedin', label: 'Open LinkedIn',       section: 'Links',      icon: 'fab fa-linkedin',      action: () => window.open('https://linkedin.com/in/saket-mishra-1a1b312a1', '_blank') },
        { id: 'link-instagram',label: 'Open Instagram',      section: 'Links',      icon: 'fab fa-instagram',     action: () => window.open('https://www.instagram.com/saketmishra.99/', '_blank') },
        { id: 'link-email',    label: 'Send Email',          section: 'Links',      icon: 'fas fa-paper-plane',   action: () => window.open('mailto:saketmishra9476@gmail.com') },
    ];

    // ── Helpers ───────────────────────────
    function scrollTo(selector) {
        const el = document.querySelector(selector);
        if (el) {
            const top = el.offsetTop - 80; // account for fixed nav
            window.scrollTo({ top, behavior: 'smooth' });
        }
    }

    // ── Command Palette Class ─────────────
    class CommandPalette {
        constructor() {
            this.isOpen = false;
            this.selectedIndex = 0;
            this.filtered = [...PALETTE_ITEMS];
            this._build();
            this._bind();
        }

        // ── Build DOM ─────────────────────
        _build() {
            // Backdrop
            this.backdrop = document.createElement('div');
            this.backdrop.id = 'cmd-palette-backdrop';

            // Container
            this.container = document.createElement('div');
            this.container.id = 'cmd-palette';
            this.container.setAttribute('role', 'dialog');
            this.container.setAttribute('aria-label', 'Command palette');
            this.container.innerHTML = `
                <div class="cp-search-wrap">
                    <i class="fas fa-search cp-search-icon"></i>
                    <input
                        type="text"
                        id="cp-input"
                        class="cp-input"
                        placeholder="Type a command…"
                        autocomplete="off"
                        autocorrect="off"
                        autocapitalize="off"
                        spellcheck="false"
                        aria-label="Search commands" />
                    <kbd class="cp-kbd">ESC</kbd>
                </div>
                <div class="cp-results" id="cp-results" role="listbox"></div>
                <div class="cp-footer">
                    <span><kbd>↑↓</kbd> navigate</span>
                    <span><kbd>↵</kbd> select</span>
                    <span><kbd>esc</kbd> close</span>
                </div>
            `;

            document.body.appendChild(this.backdrop);
            document.body.appendChild(this.container);

            this.input   = document.getElementById('cp-input');
            this.results = document.getElementById('cp-results');
        }

        // ── Bind Events ──────────────────
        _bind() {
            // Global activation: "/" or Ctrl/Cmd+K
            document.addEventListener('keydown', (e) => {
                const tag = (e.target.tagName || '').toLowerCase();
                const isEditable = tag === 'input' || tag === 'textarea' || e.target.isContentEditable;

                // Ctrl/Cmd + K  — always works
                if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                    e.preventDefault();
                    this.isOpen ? this.close() : this.open();
                    return;
                }

                // "/" — only when not typing in an input
                if (e.key === '/' && !isEditable && !e.ctrlKey && !e.metaKey && !e.altKey) {
                    e.preventDefault();
                    this.open();
                    return;
                }
            });

            // Backdrop click closes
            this.backdrop.addEventListener('click', () => this.close());

            // Input events
            this.input.addEventListener('input', () => this._onInput());
            this.input.addEventListener('keydown', (e) => this._onKeydown(e));
        }

        // ── Open / Close ─────────────────
        open() {
            if (this.isOpen) return;
            this.isOpen = true;
            this.input.value = '';
            this.filtered = [...PALETTE_ITEMS];
            this.selectedIndex = 0;

            this.backdrop.classList.add('cp-visible');
            this.container.classList.add('cp-visible');

            this._render();
            // Small delay so the animation starts, then focus
            requestAnimationFrame(() => {
                requestAnimationFrame(() => this.input.focus());
            });
        }

        close() {
            if (!this.isOpen) return;
            this.isOpen = false;
            this.backdrop.classList.remove('cp-visible');
            this.container.classList.remove('cp-visible');
        }

        // ── Input handler ────────────────
        _onInput() {
            const q = this.input.value.trim().toLowerCase();
            if (!q) {
                this.filtered = [...PALETTE_ITEMS];
            } else {
                this.filtered = PALETTE_ITEMS.filter(item => {
                    const haystack = `${item.label} ${item.section}`.toLowerCase();
                    // every word in query must appear somewhere
                    return q.split(/\s+/).every(word => haystack.includes(word));
                });
            }
            this.selectedIndex = 0;
            this._render();
        }

        // ── Keydown handler ──────────────
        _onKeydown(e) {
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                this.selectedIndex = Math.min(this.filtered.length - 1, this.selectedIndex + 1);
                this._updateSelection();
                this._scrollToSelected();
                return;
            }
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                this._updateSelection();
                this._scrollToSelected();
                return;
            }
            if (e.key === 'Enter') {
                e.preventDefault();
                this._executeSelected();
                return;
            }
            if (e.key === 'Escape') {
                e.preventDefault();
                this.close();
                return;
            }
            // Tab cycles down like arrow
            if (e.key === 'Tab') {
                e.preventDefault();
                if (e.shiftKey) {
                    this.selectedIndex = Math.max(0, this.selectedIndex - 1);
                } else {
                    this.selectedIndex = Math.min(this.filtered.length - 1, this.selectedIndex + 1);
                }
                this._updateSelection();
                this._scrollToSelected();
            }
        }

        // ── Render results ───────────────
        _render() {
            if (this.filtered.length === 0) {
                this.results.innerHTML = '<div class="cp-empty">No matching commands</div>';
                return;
            }

            let html = '';
            let currentSection = '';

            this.filtered.forEach((item, i) => {
                if (item.section !== currentSection) {
                    currentSection = item.section;
                    html += `<div class="cp-section-label">${currentSection}</div>`;
                }
                const active = i === this.selectedIndex ? 'cp-item-active' : '';
                html += `
                    <div class="cp-item ${active}" data-index="${i}" role="option" aria-selected="${i === this.selectedIndex}">
                        <i class="${item.icon} cp-item-icon"></i>
                        <span class="cp-item-label">${item.label}</span>
                        ${item.section === 'Links' ? '<i class="fas fa-external-link-alt cp-item-ext"></i>' : ''}
                    </div>`;
            });

            this.results.innerHTML = html;

            // Click + hover
            this.results.querySelectorAll('.cp-item').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    this.selectedIndex = parseInt(el.dataset.index, 10);
                    this._updateSelection();
                });
                el.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.selectedIndex = parseInt(el.dataset.index, 10);
                    this._executeSelected();
                });
            });
        }

        // ── Update selection highlight ───
        _updateSelection() {
            const items = this.results.querySelectorAll('.cp-item');
            items.forEach((el, i) => {
                const isActive = i === this.selectedIndex;
                el.classList.toggle('cp-item-active', isActive);
                el.setAttribute('aria-selected', isActive);
            });
        }

        // ── Scroll selected into view ────
        _scrollToSelected() {
            const active = this.results.querySelector('.cp-item-active');
            if (active) {
                active.scrollIntoView({ block: 'nearest' });
            }
        }

        // ── Execute selected item ────────
        _executeSelected() {
            const item = this.filtered[this.selectedIndex];
            if (!item) return;
            this.close();
            // Slight delay so the close animation plays before navigating
            setTimeout(() => item.action(), 120);
        }
    }

    // ── Init on DOM ready ─────────────────
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => new CommandPalette());
    } else {
        new CommandPalette();
    }
})();
