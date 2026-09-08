/* ========================================
   INTERACTIVE TERMINAL CONSOLE
   A real developer-console experience for the portfolio.
   Commands, autocomplete, history, boot-up sequence, typing animation.
   ======================================== */

// ========================================
// TERMINAL DATA — sourced from existing HTML
// ========================================
const TERMINAL_DATA = {
    about: {
        name: 'Saket Mishra',
        role: 'Full Stack Engineer',
        specialization: ['Backend Systems', 'AI Integration'],
        education: 'B.Tech CSE @ SRM University AP',
        year: '3rd Year (Aug 2023 – May 2027)',
        location: 'Mangalgiri, Andhra Pradesh, India',
        focus: 'Scalable Web Applications',
        architecture: ['MERN Stack', 'RESTful APIs', 'Microservices'],
        strengths: ['Full Stack Development', 'API Integration', 'Real-time Systems'],
        interests: ['AI/ML Integration', 'Distributed Systems', 'Cloud Architecture'],
        metrics: { projects: '20+', apis: '10+', commits: '1000+', stacks: '3+' }
    },

    skills: {
        frontend: [
            { name: 'React.js', version: 'v19' },
            { name: 'Next.js', version: 'v15' },
            { name: 'JavaScript/ES6+', version: 'ES2024' },
            { name: 'Tailwind CSS', version: 'v3' },
            { name: 'HTML5/CSS3', version: 'latest' }
        ],
        backend: [
            { name: 'Node.js', version: 'v20' },
            { name: 'Express.js', version: 'v4' },
            { name: 'Python', version: 'v3.11' },
            { name: 'Flask', version: 'v3' },
            { name: 'REST APIs', version: 'spec' }
        ],
        databases: [
            { name: 'MongoDB', version: 'v7' },
            { name: 'Mongoose ODM', version: 'v8' },
            { name: 'MySQL', version: 'v8' },
            { name: 'SQL', version: 'std' }
        ],
        ai_ml: [
            { name: 'Azure OpenAI', version: 'API' },
            { name: 'Gemini API', version: 'v1' },
            { name: 'Google APIs', version: 'OAuth2' }
        ],
        tools: [
            { name: 'Git / GitHub', version: 'v2' },
            { name: 'Socket.IO', version: 'v4' },
            { name: 'JWT Auth', version: 'std' },
            { name: 'Postman', version: 'v10' },
            { name: 'VS Code', version: 'latest' }
        ],
        languages: [
            { name: 'C++', version: 'C++17' },
            { name: 'JavaScript', version: 'ES6+' },
            { name: 'Python', version: '3.11' },
            { name: 'Java', version: 'JDK17' }
        ]
    },

    projects: [
        {
            name: 'Portfolio Generator',
            desc: 'MERN-based dynamic portfolio generator with 5 templates, real-time preview, and MongoDB persistence. 10+ REST APIs with JWT authentication.',
            tech: ['React.js', 'Node.js', 'MongoDB', 'REST API'],
            live: 'https://portfolio-generator-4z89.onrender.com/',
            repo: 'https://github.com/saketmishra7224/Portfolio-Generator',
            status: 'RUNNING'
        },
        {
            name: 'Calmify',
            desc: 'Full-stack mental wellness platform with Azure OpenAI integration, real-time chat via Socket.IO, and role-based access. 500+ msgs/day, 99% uptime.',
            tech: ['React', 'Node.js', 'Azure AI', 'Socket.IO'],
            live: 'https://calmify-frontend-363o.onrender.com/',
            repo: 'https://github.com/saketmishra7224/Calmify',
            status: 'RUNNING'
        },
        {
            name: 'RunDown - AI Task Manager',
            desc: 'Intelligent task management with Azure OpenAI for automatic event extraction from Outlook emails. NLP-powered conversational task creation, smart deadline detection.',
            tech: ['Flask', 'Azure OpenAI', 'MS Graph', 'OAuth 2.0'],
            live: 'https://rundown-sx8n.onrender.com/',
            repo: 'https://github.com/saketmishra7224/RUNDOWN',
            status: 'RUNNING'
        },
        {
            name: 'BuddyOnTrain',
            desc: 'Real-time social platform for train travelers. Train search, buddy matching, friend requests, and secure auth for 100+ concurrent users.',
            tech: ['React.js', 'Node.js', 'MongoDB', 'JWT'],
            live: 'https://trainbuddy.onrender.com/',
            repo: 'https://github.com/saketmishra7224/BuddyOnTrain',
            status: 'RUNNING'
        },
        {
            name: 'Svalinn',
            desc: 'Chrome extension for focus enhancement with password-protected site blocking. Local storage for credentials. 100+ active users, 4.8/5 rating.',
            tech: ['JavaScript', 'Chrome API', 'Extension'],
            live: 'https://chromewebstore.google.com/detail/svalinn/aikbllpnjoaiabkibdddehegojiiehal',
            repo: 'https://github.com/saketmishra7224/Svalinn',
            status: 'RUNNING'
        },
        {
            name: 'Employee Management System',
            desc: 'Desktop application for comprehensive employee management with CRUD operations, real-time data persistence, and intuitive GUI.',
            tech: ['Java', 'JFrame', 'JDBC', 'MySQL'],
            live: null,
            repo: 'https://github.com/saketmishra7224/Employee-Management-System-Java-',
            status: 'RUNNING'
        }
    ],

    experience: [
        {
            role: 'Systems Engineering Intern',
            company: 'Visa',
            period: 'May 2026 – July 2026',
            details: [
                'Engineered multi-agent automation system for AHA (Alert Handling Agreement) Review process',
                'Built end-to-end analysis agent classifying alerts: valid, human intervention, or manual validation',
                'Developed and integrated 10 custom MCP tools within an enterprise MCP server',
                'Implemented parallelized batch processing (batches of 25) for high-throughput AHA review',
                'Designed conversational interface with live stats, progress tracking, and Excel report generation',
                'Delivered unified solution across Web UI, CLI, and Claude Code engineering workflows'
            ]
        },
        {
            role: 'Front-End Developer Intern',
            company: 'CultureVo (NoviFE Platform)',
            period: 'May 2025 – October 2025',
            details: [
                'Built complete frontend for NoviFE, AI cultural companion platform',
                'Scale: Engaging 1000+ users across 50+ global AI personalities',
                'Tech: Next.js 15, React 19, Tailwind CSS',
                'Architecture: Responsive PWA with real-time API integration',
                'Delivered production-ready frontend powering multi-personality AI interactions'
            ]
        },
        {
            role: 'Member — NextTech Lab',
            company: 'SRM University AP',
            period: 'Feb 2025 – Aug 2025',
            details: [
                'Focus: AI-driven prototypes and real-time API integration',
                'Designed and built AI prototypes with live API integration',
                'Guided 3+ junior developers in full-stack development',
                'Agile workflows, improved sprint velocity through collaboration',
                'Accelerated lab\'s project delivery through technical leadership'
            ]
        },
        {
            role: 'B.Tech Computer Science',
            company: 'SRM University AP',
            period: 'Aug 2023 – May 2027',
            details: [
                'Specialization: Full-stack development, AI integration, distributed systems',
                '5+ production systems deployed across MERN stack and AI domains',
                'Hackathon success, real-world deployment experience',
                'System design, API architecture, scalable backend development'
            ]
        }
    ],

    contact: {
        github: { url: 'https://github.com/saketmishra7224', label: 'github.com/saketmishra7224' },
        linkedin: { url: 'https://linkedin.com/in/saket-mishra-1a1b312a1', label: 'linkedin.com/in/saket-mishra' },
        email: { url: 'mailto:saketmishra9476@gmail.com', label: 'saketmishra9476@gmail.com' },
        instagram: { url: 'https://www.instagram.com/saketmishra.99/', label: '@saketmishra.99' },
        phone: { url: 'tel:+919569778960', label: '+91 9569778960' },
        location: { url: null, label: 'Mangalgiri, Andhra Pradesh, India' }
    }
};

// ========================================
// COMMAND REGISTRY
// ========================================
const COMMANDS = {
    help: {
        description: 'List all available commands',
        execute: () => {
            const cmds = Object.entries(COMMANDS)
                .filter(([name]) => name !== 'sudo hire saket')
                .map(([name, cmd]) => {
                    const padded = name.padEnd(14);
                    return `  <span class="itm-cmd-name">${padded}</span> <span class="itm-muted">${cmd.description}</span>`;
                });
            return [
                '<span class="itm-heading">Available Commands:</span>',
                '',
                ...cmds,
                '',
                '<span class="itm-muted">Tip: Use Tab for autocomplete, ↑/↓ for command history</span>'
            ].join('\n');
        }
    },

    about: {
        description: 'Display profile information',
        execute: () => {
            const d = TERMINAL_DATA.about;
            return [
                '<span class="itm-heading">┌─── ENGINEERING.PROFILE ───┐</span>',
                '',
                `  <span class="itm-key">name:</span>           <span class="itm-value">"${d.name}"</span>`,
                `  <span class="itm-key">role:</span>           <span class="itm-value">"${d.role}"</span>`,
                `  <span class="itm-key">specialization:</span> <span class="itm-value">[${d.specialization.map(s => `"${s}"`).join(', ')}]</span>`,
                `  <span class="itm-key">education:</span>      <span class="itm-value">"${d.education}"</span>`,
                `  <span class="itm-key">year:</span>           <span class="itm-value">"${d.year}"</span>`,
                `  <span class="itm-key">location:</span>       <span class="itm-value">"${d.location}"</span>`,
                `  <span class="itm-key">focus:</span>          <span class="itm-value">"${d.focus}"</span>`,
                `  <span class="itm-key">architecture:</span>   <span class="itm-value">[${d.architecture.map(a => `"${a}"`).join(', ')}]</span>`,
                `  <span class="itm-key">strengths:</span>      <span class="itm-value">[${d.strengths.map(s => `"${s}"`).join(', ')}]</span>`,
                `  <span class="itm-key">interests:</span>      <span class="itm-value">[${d.interests.map(i => `"${i}"`).join(', ')}]</span>`,
                '',
                '<span class="itm-heading">  Impact Metrics:</span>',
                `  <span class="itm-key">projects_built:</span> <span class="itm-number">${d.metrics.projects}</span>`,
                `  <span class="itm-key">rest_apis:</span>      <span class="itm-number">${d.metrics.apis}</span>`,
                `  <span class="itm-key">github_commits:</span> <span class="itm-number">${d.metrics.commits}</span>`,
                `  <span class="itm-key">stacks_mastered:</span><span class="itm-number"> ${d.metrics.stacks}</span>`,
                '',
                '<span class="itm-heading">└───────────────────────────┘</span>'
            ].join('\n');
        }
    },

    skills: {
        description: 'Show tech stack and proficiencies',
        execute: () => {
            const sections = [];
            sections.push('<span class="itm-heading">┌─── TECH.STACK ─── ~/dependencies/installed ───┐</span>');
            sections.push('');

            const categories = {
                frontend: '⚛  Frontend',
                backend: '⚙  Backend',
                databases: '🗄  Databases',
                ai_ml: '🧠 AI / ML',
                tools: '🔧 Tools & Infra',
                languages: '💻 Languages'
            };

            for (const [key, label] of Object.entries(categories)) {
                const items = TERMINAL_DATA.skills[key];
                if (!items) continue;
                sections.push(`  <span class="itm-heading">${label}</span>`);
                items.forEach(item => {
                    const bar = '█'.repeat(Math.round(item.name.length * 0.8 + 4));
                    sections.push(`    <span class="itm-value">${item.name.padEnd(20)}</span> <span class="itm-muted">${item.version.padEnd(8)}</span> <span class="itm-bar">${bar}</span>`);
                });
                sections.push('');
            }

            sections.push('<span class="itm-heading">└────────────────────────────────────────────────┘</span>');
            return sections.join('\n');
        }
    },

    architecture: {
        description: 'View 6-tier system architecture topology',
        execute: () => {
            const el = document.getElementById('architecture');
            if (el) {
                const top = el.offsetTop - 80;
                window.scrollTo({ top, behavior: 'smooth' });
            }
            return [
                '<span class="itm-heading">┌─── SYSTEM.ARCHITECTURE ─── ~/architecture/topology ───┐</span>',
                '',
                '  <span class="itm-key">Tier 1:</span> <span class="itm-value">User / Clients</span>          <span class="itm-muted">[Web / Chrome Ext / Desktop]</span>',
                '  <span class="itm-cyan">  ↓</span>',
                '  <span class="itm-key">Tier 2:</span> <span class="itm-value">Frontend Layer</span>          <span class="itm-muted">[React.js / Next.js 15 / Tailwind CSS]</span>',
                '  <span class="itm-cyan">  ↓</span>',
                '  <span class="itm-key">Tier 3:</span> <span class="itm-value">API / Real-Time Layer</span>   <span class="itm-muted">[RESTful APIs / Socket.IO / JWT / MS Graph]</span>',
                '  <span class="itm-cyan">  ↓</span>',
                '  <span class="itm-key">Tier 4:</span> <span class="itm-value">Backend Layer</span>           <span class="itm-muted">[Node.js Express / Python Flask / Java MVC]</span>',
                '  <span class="itm-cyan">  ↓</span>',
                '  <span class="itm-key">Tier 5:</span> <span class="itm-value">Database & Services</span>     <span class="itm-muted">[MongoDB Atlas / MySQL / Chrome Local / Render]</span>',
                '  <span class="itm-cyan">  ↓</span>',
                '  <span class="itm-key">Tier 6:</span> <span class="itm-value">AI & Automation Layer</span>   <span class="itm-muted">[Azure OpenAI / Gemini API / NLP Extraction]</span>',
                '',
                '  <span class="itm-success">✓ Scrolled to interactive architecture topology viewer.</span>',
                '<span class="itm-heading">└────────────────────────────────────────────────────────┘</span>'
            ].join('\n');
        }
    },

    projects: {
        description: 'List all deployed projects',
        execute: () => {
            const lines = [];
            lines.push('<span class="itm-heading">┌─── ALL.SYSTEMS ─── ~/projects/deployed ───┐</span>');
            lines.push('');

            TERMINAL_DATA.projects.forEach((p, i) => {
                const statusColor = p.status === 'RUNNING' ? 'itm-success' : 'itm-muted';
                lines.push(`  <span class="itm-heading">[${i + 1}] ${p.name}</span>  <span class="${statusColor}">● ${p.status}</span>`);
                lines.push(`      <span class="itm-muted">${p.desc}</span>`);
                lines.push(`      <span class="itm-key">tech:</span> <span class="itm-value">[${p.tech.join(', ')}]</span>`);
                if (p.live) {
                    lines.push(`      <span class="itm-key">live:</span> <a class="itm-link" href="${p.live}" target="_blank" rel="noopener">${p.live}</a>`);
                }
                lines.push(`      <span class="itm-key">repo:</span> <a class="itm-link" href="${p.repo}" target="_blank" rel="noopener">${p.repo}</a>`);
                lines.push('');
            });

            lines.push('<span class="itm-heading">└────────────────────────────────────────────┘</span>');
            return lines.join('\n');
        }
    },

    experience: {
        description: 'Show engineering timeline',
        execute: () => {
            const lines = [];
            lines.push('<span class="itm-heading">┌─── ENGINEERING.TIMELINE ─── ~/experience/chronological ───┐</span>');
            lines.push('');

            TERMINAL_DATA.experience.forEach(exp => {
                lines.push(`  <span class="itm-heading">${exp.role}</span>`);
                lines.push(`  <span class="itm-value">${exp.company}</span>  <span class="itm-muted">📅 ${exp.period}</span>`);
                exp.details.forEach(detail => {
                    lines.push(`    <span class="itm-muted">→</span> <span class="itm-value">${detail}</span>`);
                });
                lines.push('');
            });

            lines.push('<span class="itm-heading">└────────────────────────────────────────────────────────────┘</span>');
            return lines.join('\n');
        }
    },

    contact: {
        description: 'Display contact endpoints',
        execute: () => {
            const c = TERMINAL_DATA.contact;
            return [
                '<span class="itm-heading">┌─── ENDPOINTS ─── ~/connect/available_channels ───┐</span>',
                '',
                `  <span class="itm-key">GET /github</span>     <a class="itm-link" href="${c.github.url}" target="_blank" rel="noopener">${c.github.label}</a>`,
                `  <span class="itm-key">GET /linkedin</span>   <a class="itm-link" href="${c.linkedin.url}" target="_blank" rel="noopener">${c.linkedin.label}</a>`,
                `  <span class="itm-key">POST /email</span>     <a class="itm-link" href="${c.email.url}">${c.email.label}</a>`,
                `  <span class="itm-key">GET /instagram</span>  <a class="itm-link" href="${c.instagram.url}" target="_blank" rel="noopener">${c.instagram.label}</a>`,
                `  <span class="itm-key">CALL /phone</span>     <a class="itm-link" href="${c.phone.url}">${c.phone.label}</a>`,
                `  <span class="itm-key">GET /location</span>   <span class="itm-value">${c.location.label}</span>`,
                '',
                '<span class="itm-heading">└───────────────────────────────────────────────────┘</span>'
            ].join('\n');
        }
    },

    resume: {
        description: 'Open resume in a new tab',
        execute: () => {
            window.open('assets/Resume.pdf', '_blank');
            return '<span class="itm-success">✓ Opening resume.pdf in new tab...</span>';
        }
    },

    clear: {
        description: 'Clear the terminal output',
        execute: () => '__CLEAR__'
    },

    whoami: {
        description: 'Display current user',
        execute: () => '<span class="itm-value">saket@system — Full Stack Engineer</span>'
    },

    date: {
        description: 'Show current date and time',
        execute: () => `<span class="itm-value">${new Date().toString()}</span>`
    },

    uptime: {
        description: 'Show session uptime',
        execute: () => {
            const ms = performance.now();
            const secs = Math.floor(ms / 1000);
            const mins = Math.floor(secs / 60);
            const hrs = Math.floor(mins / 60);
            return `<span class="itm-value">up ${hrs}h ${mins % 60}m ${secs % 60}s</span>`;
        }
    },

    status: {
        description: 'View system health and portfolio telemetry',
        execute: () => {
            return [
                '<span class="itm-heading">┌─── SYSTEM.STATUS ─── ~/telemetry/health ───┐</span>',
                '',
                '  <span class="itm-key">SYSTEM STATUS:</span> <span class="itm-success">● ONLINE</span>',
                '',
                '  <span class="itm-key">PORTFOLIO:</span>    <span class="itm-success">OPERATIONAL</span>',
                '  <span class="itm-key">PROJECTS:</span>     <span class="itm-cyan">ACTIVE (6/6 Systems Running)</span>',
                '  <span class="itm-key">API:</span>          <span class="itm-blue">CONNECTED (Client Gateway)</span>',
                '  <span class="itm-key">BUILD:</span>        <span class="itm-success">STABLE</span>',
                '',
                '  <span class="itm-muted">[NOTE] Static visual telemetry specification.</span>',
                '<span class="itm-heading">└────────────────────────────────────────────┘</span>'
            ].join('\n');
        }
    },

    neofetch: {
        description: 'Display system & engineering overview',
        execute: () => {
            const d = TERMINAL_DATA.about;
            return [
                '<span class="itm-cyan">        /\\        </span>  <span class="itm-key">saket</span><span class="itm-muted">@</span><span class="itm-key">portfolio-system</span>',
                '<span class="itm-cyan">       /  \\       </span>  <span class="itm-muted">────────────────────────────────────────────</span>',
                `<span class="itm-cyan">      /\\   \\      </span>  <span class="itm-key">Name:</span>         <span class="itm-value">${d.name}</span>`,
                `<span class="itm-cyan">     /  \\   \\     </span>  <span class="itm-key">Role:</span>         <span class="itm-value">${d.role}</span>`,
                `<span class="itm-cyan">    /    \\  /     </span>  <span class="itm-key">Education:</span>    <span class="itm-value">${d.education}</span>`,
                `<span class="itm-cyan">   /  /\\  \\/      </span>  <span class="itm-key">Uptime:</span>       <span class="itm-value">${d.year} (Continuous Learning)</span>`,
                '<span class="itm-cyan">  /  /  \\         </span>  <span class="itm-key">OS:</span>           <span class="itm-value">PortfolioOS v2.4 (x86_64 Web)</span>',
                '<span class="itm-cyan"> /  /    \\        </span>  <span class="itm-key">Host:</span>         <span class="itm-value">GitHub Pages / Cloudflare Edge</span>',
                '<span class="itm-cyan"> \\ /      \\       </span>  <span class="itm-key">Kernel:</span>       <span class="itm-value">Node.js 20 / ES2024 / REST Gateway</span>',
                '<span class="itm-cyan">  \\________\\      </span>  <span class="itm-key">Technologies:</span> <span class="itm-value">React 19, Next.js 15, Node.js, Express, MongoDB, Python, Azure AI</span>',
                '<span class="itm-cyan">                  </span>  <span class="itm-key">Projects:</span>     <span class="itm-value">6 Systems Deployed (CultureVo, Calmify, RunDown...)</span>',
                '<span class="itm-cyan">                  </span>  <span class="itm-key">Shell:</span>        <span class="itm-value">interactive-terminal v2.0</span>',
                `<span class="itm-cyan">                  </span>  <span class="itm-key">Memory:</span>       <span class="itm-value">${d.metrics.commits} commits / ${d.metrics.apis} REST APIs</span>`,
                '',
                '  <span style="color:#ef4444">███</span> <span style="color:#10b981">███</span> <span style="color:#eab308">███</span> <span style="color:#3b82f6">███</span> <span style="color:#8b5cf6">███</span> <span style="color:#06b6d4">███</span> <span style="color:#f1f5f9">███</span>'
            ].join('\n');
        }
    },

    sudo: {
        description: 'Execute administrative actions (try: sudo hire saket)',
        execute: (args) => {
            if (args && args.trim().toLowerCase() === 'hire saket') {
                return COMMANDS['sudo hire saket'].execute();
            }
            return [
                '<span class="itm-cyan">[sudo]</span> password for visitor: <span class="itm-muted">••••••••••••</span>',
                '<span class="itm-success">✓ Access granted.</span>',
                '<span class="itm-muted">Tip: Elevated administrative mode active. Try: </span><span class="itm-cmd-name">sudo hire saket</span>'
            ].join('\n');
        }
    },

    'sudo hire saket': {
        description: 'Execute candidate hiring authorization protocol',
        execute: () => {
            return [
                '<span class="itm-heading">┌─── [ADMIN] CANDIDATE_AUTHORIZATION_PROTOCOL ───┐</span>',
                '',
                '  <span class="itm-key">[AUTH_STEP_1]:</span> Requesting elevated administrative privileges... <span class="itm-success">[GRANTED]</span>',
                '  <span class="itm-key">[AUTH_STEP_2]:</span> Running candidate assessment on Saket Mishra...',
                '    <span class="itm-muted">├─</span> Technical Architecture:     <span class="itm-success">EXCELLENT (MERN Stack + Python + AI)</span>',
                '    <span class="itm-muted">├─</span> Full Stack Competency:      <span class="itm-success">VERIFIED (React 19 / Next.js 15 / Node.js)</span>',
                '    <span class="itm-muted">├─</span> Production Systems:         <span class="itm-success">ENTERPRISE (Visa, CultureVo, Calmify, RunDown...)</span>',
                '    <span class="itm-muted">├─</span> Measurable Impact:          <span class="itm-success">1000+ USERS ENGAGED / 50+ AI MODELS</span>',
                '    <span class="itm-muted">└─</span> Cultural & Team Fit:        <span class="itm-success">STRONG TECHNICAL LEADERSHIP</span>',
                '',
                '  <span class="itm-cyan">▶ OFFER STATUS: IMMEDIATE HIRE RECOMMENDED</span> 🚀',
                '  <span class="itm-muted">────────────────────────────────────────────────</span>',
                '  <span class="itm-heading">Initiate Direct Outreach Channel:</span>',
                '  <span class="itm-key">Email:</span>    <a class="itm-link" href="mailto:saketmishra9476@gmail.com">saketmishra9476@gmail.com</a>',
                '  <span class="itm-key">LinkedIn:</span> <a class="itm-link" href="https://linkedin.com/in/saket-mishra-1a1b312a1" target="_blank" rel="noopener">linkedin.com/in/saket-mishra</a>',
                '  <span class="itm-key">Resume:</span>   <a class="itm-link" href="assets/Resume.pdf" target="_blank" rel="noopener">Open Resume.pdf</a>',
                '  <span class="itm-key">Phone:</span>    <a class="itm-link" href="tel:+919569778960">+91 9569778960</a>',
                '',
                '<span class="itm-heading">└────────────────────────────────────────────────┘</span>'
            ].join('\n');
        }
    }
};

// ========================================
// BOOT SEQUENCE
// ========================================
class BootSequence {
    constructor() {
        this.overlay = null;
        this.hasRun = sessionStorage.getItem('boot_complete') === 'true';
    }

    shouldRun() {
        return !this.hasRun;
    }

    async run() {
        if (!this.shouldRun()) return;

        // Create overlay
        this.overlay = document.createElement('div');
        this.overlay.id = 'boot-overlay';
        this.overlay.innerHTML = `
            <div class="boot-content">
                <div class="boot-lines" id="boot-lines"></div>
                <div class="boot-cursor">_</div>
            </div>
        `;
        document.body.appendChild(this.overlay);
        document.body.style.overflow = 'hidden';

        const bootLines = [
            { text: 'BIOS v2.0.0 — Saket Mishra Engineering System', delay: 80 },
            { text: 'Checking hardware...', delay: 150 },
            { text: '  CPU: MERN Stack Engine .............. [  OK  ]', delay: 100 },
            { text: '  RAM: 1000+ commits loaded ........... [  OK  ]', delay: 80 },
            { text: '  GPU: UI Renderer (React v19) ........ [  OK  ]', delay: 80 },
            { text: '  NET: REST API Gateway ............... [  OK  ]', delay: 100 },
            { text: '', delay: 50 },
            { text: 'Loading modules...', delay: 120 },
            { text: '  [██████████] frontend.module ......... loaded', delay: 60 },
            { text: '  [██████████] backend.module .......... loaded', delay: 60 },
            { text: '  [██████████] database.module ......... loaded', delay: 60 },
            { text: '  [██████████] ai_integration.module ... loaded', delay: 60 },
            { text: '  [██████████] auth.module ............. loaded', delay: 60 },
            { text: '', delay: 50 },
            { text: 'Initializing portfolio system...', delay: 200 },
            { text: '  Mounting 6 deployed systems .......... done', delay: 80 },
            { text: '  Connecting endpoints ................. done', delay: 80 },
            { text: '  Starting interactive terminal ........ done', delay: 80 },
            { text: '', delay: 50 },
            { text: '> System ready. Welcome, visitor.', delay: 300 }
        ];

        const container = document.getElementById('boot-lines');

        for (const line of bootLines) {
            const div = document.createElement('div');
            div.className = 'boot-line';
            container.appendChild(div);

            // Type character by character
            for (let i = 0; i < line.text.length; i++) {
                div.textContent += line.text[i];
                await this._sleep(8);
            }

            // Scroll to bottom
            container.scrollTop = container.scrollHeight;

            await this._sleep(line.delay);
        }

        // Pause then fade out
        await this._sleep(600);
        this.overlay.classList.add('boot-fade-out');

        await this._sleep(800);
        this.overlay.remove();
        document.body.style.overflow = '';

        sessionStorage.setItem('boot_complete', 'true');
        this.hasRun = true;
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ========================================
// INTERACTIVE TERMINAL CLASS
// ========================================
class InteractiveTerminal {
    constructor() {
        this.isOpen = false;
        this.history = [];
        this.historyIndex = -1;
        this.currentInput = '';
        this.suggestions = [];
        this.selectedSuggestion = -1;
        this.isTyping = false;
        this.commandNames = Object.keys(COMMANDS);

        // Restore history from session
        try {
            const saved = sessionStorage.getItem('terminal_history');
            if (saved) this.history = JSON.parse(saved);
        } catch (e) { /* ignore */ }

        this._buildDOM();
        this._bindEvents();
    }

    // ── DOM Construction ──────────────────
    _buildDOM() {
        // Toggle FAB
        this.fab = document.createElement('button');
        this.fab.id = 'terminal-fab';
        this.fab.setAttribute('aria-label', 'Toggle interactive terminal');
        this.fab.innerHTML = '<i class="fas fa-terminal"></i>';
        document.body.appendChild(this.fab);

        // Terminal panel
        this.panel = document.createElement('div');
        this.panel.id = 'interactive-terminal';
        this.panel.setAttribute('role', 'dialog');
        this.panel.setAttribute('aria-label', 'Interactive terminal');
        this.panel.innerHTML = `
            <div class="itm-header">
                <div class="itm-controls">
                    <span class="itm-dot itm-dot-red" title="Close"></span>
                    <span class="itm-dot itm-dot-yellow" title="Minimize"></span>
                    <span class="itm-dot itm-dot-green" title="Maximize"></span>
                </div>
                <div class="itm-title">interactive-terminal — saket@system:~</div>
                <div class="itm-actions">
                    <span class="itm-shortcut">Ctrl+\`</span>
                </div>
            </div>
            <div class="itm-body" id="itm-body">
                <div class="itm-output" id="itm-output"></div>
            </div>
            <div class="itm-input-area">
                <div class="itm-autocomplete" id="itm-autocomplete"></div>
                <div class="itm-input-line">
                    <span class="itm-prompt">saket@system:~$</span>
                    <div class="itm-input-wrapper">
                        <input type="text"
                               id="itm-input"
                               class="itm-input"
                               autocomplete="off"
                               autocorrect="off"
                               autocapitalize="off"
                               spellcheck="false"
                               aria-label="Terminal command input"
                               placeholder="Type a command... (try 'help')" />
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(this.panel);

        // Cache elements
        this.output = document.getElementById('itm-output');
        this.input = document.getElementById('itm-input');
        this.autocomplete = document.getElementById('itm-autocomplete');
        this.body = document.getElementById('itm-body');

        // Print welcome message
        this._appendOutput([
            '<span class="itm-heading">Welcome to Saket Mishra\'s Interactive Terminal</span>',
            '<span class="itm-muted">Type </span><span class="itm-cmd-name">help</span><span class="itm-muted"> to see available commands. Press </span><span class="itm-cmd-name">Ctrl+`</span><span class="itm-muted"> or click the button to toggle.</span>',
            ''
        ].join('\n'));
    }

    // ── Event Bindings ────────────────────
    _bindEvents() {
        // FAB click
        this.fab.addEventListener('click', () => this.toggle());

        // Close on red dot
        this.panel.querySelector('.itm-dot-red').addEventListener('click', () => this.close());

        // Input events
        this.input.addEventListener('keydown', (e) => this._handleKeydown(e));
        this.input.addEventListener('input', () => this._handleInput());

        // Click on panel focuses input
        this.panel.addEventListener('click', (e) => {
            if (e.target.tagName !== 'A' && e.target !== this.input) {
                this.input.focus();
            }
        });

        // Global keyboard shortcut: Ctrl+`
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === '`') {
                e.preventDefault();
                this.toggle();
            }
            if (e.key === 'Escape' && this.isOpen) {
                this.close();
            }
        });

        // Close autocomplete on outside click
        document.addEventListener('click', (e) => {
            if (!this.panel.contains(e.target) && e.target !== this.fab) {
                this._hideAutocomplete();
            }
        });
    }

    // ── Open / Close / Toggle ─────────────
    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        this.panel.classList.add('itm-open');
        this.fab.classList.add('itm-fab-active');
        // Small delay for transition, then focus
        setTimeout(() => this.input.focus(), 300);
    }

    close() {
        this.isOpen = false;
        this.panel.classList.remove('itm-open');
        this.fab.classList.remove('itm-fab-active');
        this._hideAutocomplete();
    }

    // ── Keydown Handler ───────────────────
    _handleKeydown(e) {
        // Tab completion
        if (e.key === 'Tab') {
            e.preventDefault();
            this._tabComplete();
            return;
        }

        // Enter — execute command
        if (e.key === 'Enter') {
            e.preventDefault();
            this._executeInput();
            return;
        }

        // Arrow Up — history previous
        if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (this.suggestions.length > 0 && this.autocomplete.classList.contains('itm-ac-visible')) {
                // Navigate suggestions
                this.selectedSuggestion = Math.max(0, this.selectedSuggestion - 1);
                this._renderAutocomplete();
            } else {
                this._historyUp();
            }
            return;
        }

        // Arrow Down — history next
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (this.suggestions.length > 0 && this.autocomplete.classList.contains('itm-ac-visible')) {
                this.selectedSuggestion = Math.min(this.suggestions.length - 1, this.selectedSuggestion + 1);
                this._renderAutocomplete();
            } else {
                this._historyDown();
            }
            return;
        }

        // Escape — close autocomplete or terminal
        if (e.key === 'Escape') {
            if (this.autocomplete.classList.contains('itm-ac-visible')) {
                e.stopPropagation();
                this._hideAutocomplete();
            }
        }
    }

    // ── Input Handler (autocomplete) ──────
    _handleInput() {
        const val = this.input.value.trim().toLowerCase();
        if (val.length === 0) {
            this._hideAutocomplete();
            return;
        }

        this.suggestions = this.commandNames.filter(cmd => cmd.startsWith(val) && cmd !== val);
        this.selectedSuggestion = this.suggestions.length > 0 ? 0 : -1;

        if (this.suggestions.length > 0) {
            this._renderAutocomplete();
            this.autocomplete.classList.add('itm-ac-visible');
        } else {
            this._hideAutocomplete();
        }
    }

    // ── Autocomplete Rendering ────────────
    _renderAutocomplete() {
        this.autocomplete.innerHTML = this.suggestions.map((cmd, i) => {
            const active = i === this.selectedSuggestion ? 'itm-ac-active' : '';
            const desc = COMMANDS[cmd] ? COMMANDS[cmd].description : '';
            return `<div class="itm-ac-item ${active}" data-cmd="${cmd}">
                <span class="itm-ac-cmd">${cmd}</span>
                <span class="itm-ac-desc">${desc}</span>
            </div>`;
        }).join('');

        // Click to select
        this.autocomplete.querySelectorAll('.itm-ac-item').forEach(item => {
            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.input.value = item.dataset.cmd;
                this._hideAutocomplete();
                this.input.focus();
            });
        });
    }

    _hideAutocomplete() {
        this.autocomplete.classList.remove('itm-ac-visible');
        this.autocomplete.innerHTML = '';
        this.suggestions = [];
        this.selectedSuggestion = -1;
    }

    // ── Tab Completion ────────────────────
    _tabComplete() {
        if (this.suggestions.length > 0 && this.selectedSuggestion >= 0) {
            this.input.value = this.suggestions[this.selectedSuggestion];
        } else {
            const val = this.input.value.trim().toLowerCase();
            const match = this.commandNames.find(cmd => cmd.startsWith(val));
            if (match) {
                this.input.value = match;
            }
        }
        this._hideAutocomplete();
    }

    // ── Command History ───────────────────
    _historyUp() {
        if (this.history.length === 0) return;
        if (this.historyIndex === -1) {
            this.currentInput = this.input.value;
        }
        this.historyIndex = Math.min(this.history.length - 1, this.historyIndex + 1);
        this.input.value = this.history[this.history.length - 1 - this.historyIndex];
    }

    _historyDown() {
        if (this.historyIndex <= 0) {
            this.historyIndex = -1;
            this.input.value = this.currentInput;
            return;
        }
        this.historyIndex--;
        this.input.value = this.history[this.history.length - 1 - this.historyIndex];
    }

    // ── Execute Input ─────────────────────
    async _executeInput() {
        const raw = this.input.value.trim();
        this.input.value = '';
        this._hideAutocomplete();
        this.historyIndex = -1;
        this.currentInput = '';

        if (!raw) return;

        // Save to history
        this.history.push(raw);
        if (this.history.length > 100) this.history.shift();
        try { sessionStorage.setItem('terminal_history', JSON.stringify(this.history)); } catch(e) { /* ignore */ }

        // Echo the command
        this._appendOutput(`<span class="itm-prompt-echo">saket@system:~$</span> <span class="itm-cmd-echo">${this._escapeHtml(raw)}</span>`);

        const normalized = raw.toLowerCase().trim();
        const firstWord = normalized.split(/\s+/)[0];

        let cmd = null;
        let args = '';

        if (COMMANDS[normalized]) {
            cmd = COMMANDS[normalized];
        } else if (COMMANDS[firstWord]) {
            cmd = COMMANDS[firstWord];
            args = normalized.slice(firstWord.length).trim();
        }

        if (cmd) {
            const result = cmd.execute(args);
            if (result === '__CLEAR__') {
                this.output.innerHTML = '';
                return;
            }
            await this._typeOutput(result);
        } else {
            await this._typeOutput(`<span class="itm-error">command not found: ${this._escapeHtml(raw)}</span>\n<span class="itm-muted">Type 'help' to see available commands.</span>`);
        }

        // Blank line after output
        this._appendOutput('');
    }

    // ── Output Rendering ──────────────────
    _appendOutput(html) {
        const div = document.createElement('div');
        div.className = 'itm-output-block';
        div.innerHTML = html;
        this.output.appendChild(div);
        this._scrollToBottom();
    }

    async _typeOutput(html) {
        if (this.isTyping) return; // Prevent overlap
        this.isTyping = true;

        const block = document.createElement('div');
        block.className = 'itm-output-block itm-typing';
        this.output.appendChild(block);

        // Split into lines, type each one
        const lines = html.split('\n');
        for (let li = 0; li < lines.length; li++) {
            const lineEl = document.createElement('div');
            lineEl.className = 'itm-typed-line';
            block.appendChild(lineEl);

            // We insert the full HTML but reveal it character-by-character via a text-mask technique.
            // For simplicity and to preserve HTML tags, we use a progressive reveal approach.
            const tempSpan = document.createElement('span');
            tempSpan.innerHTML = lines[li];
            const plainText = tempSpan.textContent || tempSpan.innerText || '';

            if (plainText.length === 0) {
                lineEl.innerHTML = lines[li] || '&nbsp;';
            } else {
                // Type out with cursor effect
                lineEl.innerHTML = '';
                lineEl.classList.add('itm-line-typing');

                // Set final HTML but hide it; reveal via clip
                const contentSpan = document.createElement('span');
                contentSpan.className = 'itm-reveal';
                contentSpan.innerHTML = lines[li];
                lineEl.appendChild(contentSpan);

                const totalChars = plainText.length;
                const charsPerTick = Math.max(1, Math.ceil(totalChars / 30)); // Adaptive speed
                const tickDelay = 12;

                for (let c = 0; c <= totalChars; c += charsPerTick) {
                    const progress = Math.min(c / totalChars, 1);
                    contentSpan.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`;
                    await this._sleep(tickDelay);
                }
                contentSpan.style.clipPath = 'none';
                lineEl.classList.remove('itm-line-typing');
            }

            this._scrollToBottom();
        }

        block.classList.remove('itm-typing');
        this.isTyping = false;
    }

    _scrollToBottom() {
        this.body.scrollTop = this.body.scrollHeight;
    }

    _escapeHtml(str) {
        const div = document.createElement('div');
        div.textContent = str;
        return div.innerHTML;
    }

    _sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// ========================================
// INITIALIZATION
// ========================================
document.addEventListener('DOMContentLoaded', async () => {
    // Run boot sequence
    const boot = new BootSequence();
    await boot.run();

    // Initialize interactive terminal
    window.interactiveTerminal = new InteractiveTerminal();
});
