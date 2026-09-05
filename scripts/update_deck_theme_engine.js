const fs = require('fs');
const path = require('path');
const { MOTIFS } = require('./enhance_theme_motifs');

const themeEnginePath = path.join(__dirname, '..', 'js', 'deck-theme-engine.js');
let content = fs.readFileSync(themeEnginePath, 'utf8');

// Build enhanced themes data structure
// We read current themes from deck-theme-engine.js or construct with MOTIFS
const enhancedThemes = [
    {
        id: 'academic',
        name: 'Academic Editorial',
        category: 'Editorial',
        displayFont: 'Playfair Display',
        bodyFont: 'DM Sans',
        icon: '🎓',
        desc: 'Classic authoritative Oxford serif headers with scholarly navy and amber rule lines.',
        previewBg: 'linear-gradient(135deg, #1e3a8a, #0b1120)',
        palette: ['#1e3a8a', '#ea580c', '#f8fafc'],
        svg: MOTIFS['academic'].svg
    },
    {
        id: 'monograph',
        name: 'Scholarly Monograph',
        category: 'Editorial',
        displayFont: 'Cinzel',
        bodyFont: 'Plus Jakarta Sans',
        icon: '📜',
        desc: 'Deep scholarly charcoal ink, Roman inscriptional headers, and warm antique paper.',
        previewBg: 'linear-gradient(135deg, #334155, #0f172a)',
        palette: ['#334155', '#d97706', '#fdfcf7'],
        svg: MOTIFS['monograph'].svg
    },
    {
        id: 'broadside',
        name: 'Editorial Broadsheet',
        category: 'Editorial',
        displayFont: 'Playfair Display',
        bodyFont: 'DM Sans',
        icon: '📰',
        desc: 'High-contrast Victorian newspaper headline typography with crisp editorial column rules.',
        previewBg: 'linear-gradient(135deg, #09090b, #27272a)',
        palette: ['#09090b', '#dc2626', '#f8f9fa'],
        svg: MOTIFS['broadside'].svg
    },
    {
        id: 'botanical',
        name: 'Dark Botanical',
        category: 'Editorial',
        displayFont: 'Cormorant Garamond',
        bodyFont: 'Plus Jakarta Sans',
        icon: '🌿',
        desc: 'Refined literary luxury with organic sage, forest foliage accents, and Garamond serifs.',
        previewBg: 'linear-gradient(135deg, #064e3b, #061a14)',
        palette: ['#064e3b', '#10b981', '#f5f7f4'],
        svg: MOTIFS['botanical'].svg
    },
    {
        id: 'vellum',
        name: 'Illuminated Vellum',
        category: 'Editorial',
        displayFont: 'Cinzel',
        bodyFont: 'Plus Jakarta Sans',
        icon: '🕯️',
        desc: 'Dark manuscript parchment with burnished gold foil accents and illuminated drop caps.',
        previewBg: 'linear-gradient(135deg, #b45309, #14110f)',
        palette: ['#d97706', '#b45309', '#14110f'],
        svg: MOTIFS['vellum'].svg
    },
    {
        id: 'terracotta',
        name: 'Tuscan Terracotta',
        category: 'Editorial',
        displayFont: 'Playfair Display',
        bodyFont: 'Outfit',
        icon: '🏺',
        desc: 'Warm sun-baked Tuscan earthenware with Mediterranean rust, olive, and warm cream cards.',
        previewBg: 'linear-gradient(135deg, #c2410c, #431407)',
        palette: ['#c2410c', '#ea580c', '#faf6f0'],
        svg: MOTIFS['terracotta'].svg
    },
    {
        id: 'slate-archive',
        name: 'Slate Archive',
        category: 'Editorial',
        displayFont: 'Cinzel',
        bodyFont: 'DM Sans',
        icon: '🏛️',
        desc: 'Archival stone and slate grey with silver metallic divider lines and classic Roman headers.',
        previewBg: 'linear-gradient(135deg, #475569, #0f172a)',
        palette: ['#475569', '#94a3b8', '#f8fafc'],
        svg: MOTIFS['slate-archive'].svg
    },
    {
        id: 'editorial-forest',
        name: 'Forest Editorial',
        category: 'Editorial',
        displayFont: 'Cormorant Garamond',
        bodyFont: 'DM Sans',
        icon: '🌲',
        desc: 'Deep alpine pine green with subtle coniferous tree watermark and crisp editorial hierarchy.',
        previewBg: 'linear-gradient(135deg, #14532d, #052e16)',
        palette: ['#14532d', '#16a34a', '#f4f7f4'],
        svg: MOTIFS['editorial-forest'].svg
    },
    {
        id: 'soft-editorial',
        name: 'Soft Editorial',
        category: 'Editorial',
        displayFont: 'Cormorant Garamond',
        bodyFont: 'Outfit',
        icon: '🌸',
        desc: 'Warm almond paper with sage, blush rose, and elegant editorial serifs.',
        previewBg: 'linear-gradient(135deg, #059669, #e11d48)',
        palette: ['#059669', '#e11d48', '#fbf8f5'],
        svg: MOTIFS['soft-editorial'].svg
    },
    {
        id: 'bold-signal',
        name: 'Bold Signal',
        category: 'Brutalist',
        displayFont: 'Space Grotesk',
        bodyFont: 'Plus Jakarta Sans',
        icon: '⚡',
        desc: 'High-voltage signal crimson with caution yellow accents and pitch-black slab borders.',
        previewBg: 'linear-gradient(135deg, #e11d48, #09090b)',
        palette: ['#e11d48', '#facc15', '#09090b'],
        svg: MOTIFS['bold-signal'].svg
    },
    {
        id: 'swiss-ikb',
        name: 'Swiss Klein Blue',
        category: 'Brutalist',
        displayFont: 'Space Grotesk',
        bodyFont: 'Plus Jakarta Sans',
        icon: '📐',
        desc: 'International Klein Blue (#002FA7) with strict Swiss grid alignment crosshairs.',
        previewBg: 'linear-gradient(135deg, #002fa7, #090d16)',
        palette: ['#002fa7', '#2563eb', '#ffffff'],
        svg: MOTIFS['swiss-ikb'].svg
    },
    {
        id: 'bauhaus-bold',
        name: 'Bauhaus Geometric',
        category: 'Brutalist',
        displayFont: 'Space Grotesk',
        bodyFont: 'Outfit',
        icon: '🟥',
        desc: 'Primary geometric trinity (cadmium red, cobalt blue, yellow triangle) with stark contrast.',
        previewBg: 'linear-gradient(135deg, #dc2626, #2563eb)',
        palette: ['#dc2626', '#2563eb', '#eab308'],
        svg: MOTIFS['bauhaus-bold'].svg
    },
    {
        id: 'cyber-punch',
        name: 'Cyber Punch',
        category: 'Brutalist',
        displayFont: 'Syne',
        bodyFont: 'Plus Jakarta Sans',
        icon: '💥',
        desc: 'Hot neon magenta against carbon panels with comic action explosion burst motif.',
        previewBg: 'linear-gradient(135deg, #ec4899, #080b14)',
        palette: ['#ec4899', '#06b6d4', '#0f172a'],
        svg: MOTIFS['cyber-punch'].svg
    },
    {
        id: 'neomorphism',
        name: 'Tactile Neomorphism',
        category: 'Brutalist',
        displayFont: 'Plus Jakarta Sans',
        bodyFont: 'DM Sans',
        icon: '🎛️',
        desc: 'Soft debossed rotary dials, physical toggle switches, and 3D tactile elevation.',
        previewBg: 'linear-gradient(135deg, #6366f1, #1e1b4b)',
        palette: ['#6366f1', '#818cf8', '#f1f5f9'],
        svg: MOTIFS['neomorphism'].svg
    },
    {
        id: 'stencil-tablet',
        name: 'Industrial Stencil',
        category: 'Brutalist',
        displayFont: 'Syne',
        bodyFont: 'Space Grotesk',
        icon: '🏷️',
        desc: 'Heavy industrial crate stencil serial numbers with chamfered corners and hex bolt hardware.',
        previewBg: 'linear-gradient(135deg, #0284c7, #0f172a)',
        palette: ['#0284c7', '#38bdf8', '#0f172a'],
        svg: MOTIFS['stencil-tablet'].svg
    },
    {
        id: 'electric',
        name: 'Electric Studio',
        category: 'Cyber',
        displayFont: 'Manrope',
        bodyFont: 'Outfit',
        icon: '💎',
        desc: 'Cyberpunk dark obsidian studio with glowing cyan circuit traces and diamond microprocessor.',
        previewBg: 'linear-gradient(135deg, #0284c7, #030712)',
        palette: ['#0284c7', '#38bdf8', '#090d16'],
        svg: MOTIFS['electric'].svg
    },
    {
        id: 'voltage',
        name: 'Creative Voltage',
        category: 'Cyber',
        displayFont: 'Syne',
        bodyFont: 'Space Grotesk',
        icon: '🚀',
        desc: 'Dual jagged electric arc lightning discharge vectors with glowing purple accents.',
        previewBg: 'linear-gradient(135deg, #3b0764, #090514)',
        palette: ['#a855f7', '#c084fc', '#0b0617'],
        svg: MOTIFS['voltage'].svg
    },
    {
        id: 'neon-tokyo',
        name: 'Neon Tokyo',
        category: 'Cyber',
        displayFont: 'Space Grotesk',
        bodyFont: 'Outfit',
        icon: '🏮',
        desc: 'Midnight Tokyo rain aesthetic with glowing Japanese cyber lanterns and neon pink/cyan signs.',
        previewBg: 'linear-gradient(135deg, #f43f5e, #070a13)',
        palette: ['#f43f5e', '#06b6d4', '#070a13'],
        svg: MOTIFS['neon-tokyo'].svg
    },
    {
        id: 'terminal-green',
        name: 'Phosphor CRT Terminal',
        category: 'Cyber',
        displayFont: 'JetBrains Mono',
        bodyFont: 'JetBrains Mono',
        icon: '📟',
        desc: 'Vintage CRT computer monitor with glowing green phosphor prompt >_ and scanline raster.',
        previewBg: 'linear-gradient(135deg, #22c55e, #030a05)',
        palette: ['#22c55e', '#4ade80', '#030a05'],
        svg: MOTIFS['terminal-green'].svg
    },
    {
        id: 'midnight-monochrome',
        name: 'OLED Monochrome',
        category: 'Cyber',
        displayFont: 'Plus Jakarta Sans',
        bodyFont: 'DM Sans',
        icon: '🌑',
        desc: 'Pure OLED deep pitch black with ultra-clean silver monochrome and celestial lunar eclipse.',
        previewBg: 'linear-gradient(135deg, #334155, #000000)',
        palette: ['#f8fafc', '#94a3b8', '#000000'],
        svg: MOTIFS['midnight-monochrome'].svg
    },
    {
        id: 'synthwave-84',
        name: 'Synthwave Sunset',
        category: 'Cyber',
        displayFont: 'Syne',
        bodyFont: 'Space Grotesk',
        icon: '🌅',
        desc: 'Retro 80s perspective wireframe grid horizon with segmented vector neon sun.',
        previewBg: 'linear-gradient(135deg, #d946ef, #180b2a)',
        palette: ['#f97316', '#d946ef', '#180b2a'],
        svg: MOTIFS['synthwave-84'].svg
    },
    {
        id: '8-bit-orbit',
        name: '8-Bit Orbit Arcade',
        category: 'Cyber',
        displayFont: 'Press Start 2P',
        bodyFont: 'JetBrains Mono',
        icon: '👾',
        desc: 'CRT pixel-art space invader UFO arcade sprite with stepped pixel borders and retro cyan glow.',
        previewBg: 'linear-gradient(135deg, #00ffcc, #09101f)',
        palette: ['#00ffcc', '#22c55e', '#09101f'],
        svg: MOTIFS['8-bit-orbit'].svg
    },
    {
        id: 'dark',
        name: 'Carbon Stealth',
        category: 'Cyber',
        displayFont: 'Plus Jakarta Sans',
        bodyFont: 'DM Sans',
        icon: '🌙',
        desc: 'Sleek carbon dark matte panels with subtle blue glowing borders and faceted diamond shield.',
        previewBg: 'linear-gradient(135deg, #1e293b, #030712)',
        palette: ['#38bdf8', '#64748b', '#030712'],
        svg: MOTIFS['dark'].svg
    },
    {
        id: 'vintage',
        name: 'Vintage Manuscript',
        category: 'Retro',
        displayFont: 'Bodoni Moda',
        bodyFont: 'DM Sans',
        icon: '📜',
        desc: 'Aged sepia ledger paper with circular postal cancellation date stamp and antique wax seal.',
        previewBg: 'linear-gradient(135deg, #78350f, #291c13)',
        palette: ['#78350f', '#b45309', '#fbf8f1'],
        svg: MOTIFS['vintage'].svg
    },
    {
        id: 'notebook',
        name: 'Spiral Notepad',
        category: 'Retro',
        displayFont: 'DM Sans',
        bodyFont: 'DM Sans',
        icon: '📓',
        desc: 'Spiral wire binding rings, ruled paper lines, and vertical red notebook margin guide.',
        previewBg: 'linear-gradient(135deg, #2563eb, #1e293b)',
        palette: ['#2563eb', '#ef4444', '#fdfdfb'],
        svg: MOTIFS['notebook'].svg
    },
    {
        id: 'blueprint',
        name: 'Technical Blueprint',
        category: 'Retro',
        displayFont: 'Space Grotesk',
        bodyFont: 'JetBrains Mono',
        icon: '📐',
        desc: 'Cyanotype blueprint grid with technical architect drafting compass and crosshairs.',
        previewBg: 'linear-gradient(135deg, #0284c7, #0a2342)',
        palette: ['#38bdf8', '#0284c7', '#0a2342'],
        svg: MOTIFS['blueprint'].svg
    },
    {
        id: 'risograph-pop',
        name: 'Risograph Print',
        category: 'Retro',
        displayFont: 'Fraunces',
        bodyFont: 'Outfit',
        icon: '🖨️',
        desc: 'Duotone halftone screen printing rosette texture with offset print registration crosshairs.',
        previewBg: 'linear-gradient(135deg, #ec4899, #1e1b4b)',
        palette: ['#ec4899', '#3b82f6', '#fdfbf7'],
        svg: MOTIFS['risograph-pop'].svg
    },
    {
        id: 'kraft-paper',
        name: 'Kraft Cardboard',
        category: 'Retro',
        displayFont: 'Fraunces',
        bodyFont: 'DM Sans',
        icon: '📦',
        desc: 'Tactile craft packaging cardboard texture with vintage PRIORITY AIR MAIL rubber stamp.',
        previewBg: 'linear-gradient(135deg, #a35b2a, #2a1e13)',
        palette: ['#a35b2a', '#78350f', '#e6d5bc'],
        svg: MOTIFS['kraft-paper'].svg
    },
    {
        id: 'coral',
        name: 'Marine Coral',
        category: 'Retro',
        displayFont: 'Playfair Display',
        bodyFont: 'Outfit',
        icon: '🪸',
        desc: 'Marine coral reef branch with oceanic wave ripples and warm coral/teal vibrancy.',
        previewBg: 'linear-gradient(135deg, #f97316, #0e2a38)',
        palette: ['#f97316', '#06b6d4', '#fbf8f5'],
        svg: MOTIFS['coral'].svg
    }
];

// Replace this.themes in deck-theme-engine.js
const themesArrayString = JSON.stringify(enhancedThemes, null, 4);

// Replace the constructor themes definition
const themesRegex = /this\.themes = \[[\s\S]*?\];/;
content = content.replace(themesRegex, `this.themes = ${themesArrayString};`);

// Replace themeCards mapping in injectUI() to render rich preview banner with emblem and palette dots
const injectUiRegex = /const themeCards = this\.themes\.map\(t => `[\s\S]*?`\)\.join\(''\);/;
const richThemeCardsCode = `const themeCards = this.themes.map(t => {
            const dotsHtml = (t.palette || []).map(c => \`<span class="theme-palette-dot" style="background:\${c};"></span>\`).join('');
            return \`
            <div class="theme-card-option \${t.id === this.currentTheme ? 'active' : ''}" 
                 data-theme-id="\${t.id}" 
                 onclick="deckThemeEngine.applyTheme('\${t.id}')">
                <div class="theme-preview-banner" style="background:\${t.previewBg}">
                    <div class="theme-emblem">\${t.svg || t.icon}</div>
                    <span class="theme-movement-tag">\${t.category || 'Theme'}</span>
                    <div class="theme-palette-dots">\${dotsHtml}</div>
                </div>
                <div class="theme-card-body">
                    <div class="theme-card-title">\${t.icon} \${t.name}</div>
                    <div class="theme-card-fonts">\${t.displayFont} + \${t.bodyFont}</div>
                    <div class="theme-card-desc">\${t.desc}</div>
                </div>
            </div>
            \`;
        }).join('');`;

content = content.replace(injectUiRegex, richThemeCardsCode);

fs.writeFileSync(themeEnginePath, content, 'utf8');
console.log('✓ Successfully enriched js/deck-theme-engine.js with rich motifs, palettes, and categories.');
