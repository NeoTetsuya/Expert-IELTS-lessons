/**
 * enhance_theme_motifs.js
 * Injects signature SVG emblems, badges, and watermarks for all 28 themes into:
 *   1. themes_src/ (01-editorial.css, 02-bold-brutalist.css, 03-dark-cyber.css, 04-tactile-retro.css)
 *   2. js/deck-theme-engine.js (rich emblems, categories, palettes, and preview banners)
 *   3. css_src/ (02-stage-layout.css, 11-hud-tools-theme-modal.css)
 */

const fs = require('fs');
const path = require('path');

// Helper to encode SVG to clean data URI
function svgToDataUri(svg) {
    const cleaned = svg.replace(/>\s+</g, '><').trim();
    return `data:image/svg+xml;utf8,${encodeURIComponent(cleaned)}`;
}

// 28 Thematic SVG Definitions
const MOTIFS = {
    'academic': {
        category: 'Editorial',
        palette: ['#1e3a8a', '#ea580c', '#f8fafc'],
        color: '#1e3a8a',
        opacity: '0.08',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6l18 9-18 9L6 15z"/><path d="M12 18v12c0 6 5.37 11 12 11s12-5 12-11V18"/><path d="M42 16v14"/><circle cx="42" cy="32" r="2" fill="currentColor"/><path d="M18 27c1.5 2 3.8 3 6 3s4.5-1 6-3"/></svg>`
    },
    'monograph': {
        category: 'Editorial',
        palette: ['#334155', '#d97706', '#fdfcf7'],
        color: '#334155',
        opacity: '0.08',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M38 6c-8 2-14 9-16 19l-8 8c-2 2-3 5-3 5s3-1 5-3l8-8c10-2 17-8 19-16"/><path d="M11 38l-4 4"/><path d="M6 34c6 0 11-2 16-6"/><path d="M26 14c-4 0-7 2-10 6"/></svg>`
    },
    'broadside': {
        category: 'Editorial',
        palette: ['#09090b', '#dc2626', '#f8f9fa'],
        color: '#09090b',
        opacity: '0.09',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="6" width="36" height="36" rx="2"/><path d="M12 12h24"/><path d="M12 18h24"/><path d="M12 24h10"/><path d="M12 28h10"/><path d="M12 32h10"/><rect x="26" y="24" width="10" height="12" fill="currentColor" opacity="0.2"/></svg>`
    },
    'botanical': {
        category: 'Editorial',
        palette: ['#064e3b', '#10b981', '#f5f7f4'],
        color: '#064e3b',
        opacity: '0.12',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 40c12-4 22-14 26-26"/><path d="M34 14c4-8 8-10 8-10s-2 4-10 8c-4 2-5 6-4 8 2 1 6 0 8-4z"/><path d="M22 25c-4-4-5-8-5-8s4 1 8 5c3 3 3 6 1 7s-3 0-4-4z"/><path d="M14 33c-3-3-4-6-4-6s3 1 6 4c2 2 2 4 1 5s-2 0-3-3z"/><circle cx="28" cy="20" r="2" fill="currentColor"/><circle cx="20" cy="28" r="2" fill="currentColor"/></svg>`
    },
    'vellum': {
        category: 'Editorial',
        palette: ['#d97706', '#b45309', '#14110f'],
        color: '#d97706',
        opacity: '0.20',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="11" stroke-dasharray="3 3"/><path d="M24 14v20"/><path d="M14 24h20"/><path d="M18 18l12 12"/><path d="M18 30l12-12"/><circle cx="24" cy="24" r="4" fill="currentColor"/></svg>`
    },
    'terracotta': {
        category: 'Editorial',
        palette: ['#c2410c', '#ea580c', '#faf6f0'],
        color: '#c2410c',
        opacity: '0.11',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h12"/><path d="M20 8v4c0 3-4 6-6 10s-2 8 2 12 10 6 16 0 2-8-2-12-6-7-6-10V8"/><path d="M13 18c-3 1-5 4-5 7s2 5 5 5"/><path d="M35 18c3 1 5 4 5 7s-2 5-5 5"/><path d="M18 40h12"/></svg>`
    },
    'slate-archive': {
        category: 'Editorial',
        palette: ['#475569', '#94a3b8', '#f8fafc'],
        color: '#475569',
        opacity: '0.10',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 10h32"/><path d="M12 10c0-3 3-4 6-4s6 1 6 4"/><path d="M24 10c0-3 3-4 6-4s6 1 6 4"/><path d="M14 10v26"/><path d="M20 10v26"/><path d="M28 10v26"/><path d="M34 10v26"/><path d="M8 36h32"/><path d="M6 40h36"/></svg>`
    },
    'editorial-forest': {
        category: 'Editorial',
        palette: ['#14532d', '#16a34a', '#f4f7f4'],
        color: '#14532d',
        opacity: '0.12',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 6l-9 12h5l-7 11h6l-6 11h22l-6-11h6l-7-11h5z"/><path d="M24 40v6"/><path d="M10 44c4-3 9-4 14-4s10 1 14 4"/></svg>`
    },
    'soft-editorial': {
        category: 'Editorial',
        palette: ['#059669', '#e11d48', '#fbf8f5'],
        color: '#059669',
        opacity: '0.10',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="5" fill="currentColor"/><circle cx="24" cy="13" r="6"/><circle cx="35" cy="24" r="6"/><circle cx="24" cy="35" r="6"/><circle cx="13" cy="24" r="6"/><path d="M24 24l16 16"/></svg>`
    },
    'bold-signal': {
        category: 'Brutalist',
        palette: ['#e11d48', '#facc15', '#09090b'],
        color: '#e11d48',
        opacity: '0.15',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M26 4l-14 22h14l-4 18 18-24H26z"/><path d="M6 10l8-8"/><path d="M6 22l14-14"/><path d="M6 34l20-20"/></svg>`
    },
    'swiss-ikb': {
        category: 'Brutalist',
        palette: ['#002fa7', '#2563eb', '#ffffff'],
        color: '#002fa7',
        opacity: '0.14',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="16"/><line x1="24" y1="4" x2="24" y2="44"/><line x1="4" y1="24" x2="44" y2="24"/><rect x="20" y="20" width="8" height="8" fill="currentColor"/><path d="M12 6h4"/><path d="M12 42h4"/><path d="M6 12v4"/><path d="M42 12v4"/></svg>`
    },
    'bauhaus-bold': {
        category: 'Brutalist',
        palette: ['#dc2626', '#2563eb', '#eab308'],
        color: '#dc2626',
        opacity: '0.16',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="16" cy="18" r="10" fill="#dc2626" opacity="0.6"/><rect x="22" y="16" width="18" height="18" fill="#2563eb" opacity="0.6"/><path d="M18 42l12-20 12 20z" fill="#eab308" opacity="0.7"/></svg>`
    },
    'cyber-punch': {
        category: 'Brutalist',
        palette: ['#ec4899', '#06b6d4', '#0f172a'],
        color: '#ec4899',
        opacity: '0.15',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M24 4l5 12 13-3-6 12 12 5-13 5 3 13-12-6-5 12-5-12-12 6 3-13-13-5 12-5-6-12 13 3z" fill="currentColor" opacity="0.3"/><circle cx="24" cy="24" r="6" fill="currentColor"/></svg>`
    },
    'neomorphism': {
        category: 'Brutalist',
        palette: ['#6366f1', '#818cf8', '#f1f5f9'],
        color: '#6366f1',
        opacity: '0.14',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="16"/><circle cx="24" cy="24" r="10" fill="currentColor" opacity="0.2"/><line x1="24" y1="14" x2="24" y2="20" stroke-width="3"/><circle cx="24" cy="8" r="2" fill="currentColor"/><circle cx="40" cy="24" r="2" fill="currentColor"/><circle cx="8" cy="24" r="2" fill="currentColor"/></svg>`
    },
    'stencil-tablet': {
        category: 'Brutalist',
        palette: ['#0284c7', '#38bdf8', '#0f172a'],
        color: '#0284c7',
        opacity: '0.16',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="10" width="36" height="28" rx="4"/><path d="M14 18h6v12h-6"/><path d="M28 18h6v12h-6"/><circle cx="10" cy="14" r="1.5" fill="currentColor"/><circle cx="38" cy="14" r="1.5" fill="currentColor"/><circle cx="10" cy="34" r="1.5" fill="currentColor"/><circle cx="38" cy="34" r="1.5" fill="currentColor"/></svg>`
    },
    'electric': {
        category: 'Cyber',
        palette: ['#0284c7', '#38bdf8', '#090d16'],
        color: '#38bdf8',
        opacity: '0.22',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="16" y="16" width="16" height="16" rx="2" fill="currentColor" opacity="0.3"/><line x1="24" y1="4" x2="24" y2="16"/><line x1="24" y1="32" x2="24" y2="44"/><line x1="4" y1="24" x2="16" y2="24"/><line x1="32" y1="24" x2="44" y2="24"/><circle cx="24" cy="4" r="2" fill="currentColor"/><circle cx="24" cy="44" r="2" fill="currentColor"/><circle cx="4" cy="24" r="2" fill="currentColor"/><circle cx="44" cy="24" r="2" fill="currentColor"/><path d="M10 10l6 6"/><path d="M38 38l-6-6"/><circle cx="10" cy="10" r="2" fill="currentColor"/><circle cx="38" cy="38" r="2" fill="currentColor"/></svg>`
    },
    'voltage': {
        category: 'Cyber',
        palette: ['#a855f7', '#c084fc', '#0b0617'],
        color: '#c084fc',
        opacity: '0.24',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M28 4l-16 22h14l-4 18 18-24H26z"/><path d="M38 12c4 4 6 9 6 15"/><path d="M4 27c0-6 2-11 6-15"/><circle cx="24" cy="24" r="20" stroke-dasharray="4 4" stroke-width="1.5"/></svg>`
    },
    'neon-tokyo': {
        category: 'Cyber',
        palette: ['#f43f5e', '#06b6d4', '#070a13'],
        color: '#f43f5e',
        opacity: '0.25',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8h12"/><path d="M14 14h20"/><rect x="16" y="14" width="16" height="24" rx="6" fill="currentColor" opacity="0.3"/><line x1="24" y1="8" x2="24" y2="14"/><line x1="24" y1="38" x2="24" y2="44"/><line x1="20" y1="22" x2="28" y2="22"/><line x1="20" y1="28" x2="28" y2="28"/><circle cx="24" cy="44" r="2" fill="currentColor"/></svg>`
    },
    'terminal-green': {
        category: 'Cyber',
        palette: ['#22c55e', '#4ade80', '#030a05'],
        color: '#22c55e',
        opacity: '0.25',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="8" width="40" height="32" rx="4"/><line x1="4" y1="16" x2="44" y2="16"/><path d="M12 24l5 4-5 4"/><line x1="22" y1="32" x2="30" y2="32" stroke-width="3"/></svg>`
    },
    'midnight-monochrome': {
        category: 'Cyber',
        palette: ['#f8fafc', '#94a3b8', '#000000'],
        color: '#f8fafc',
        opacity: '0.22',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M36 28A16 16 0 1 1 20 12a13 13 0 0 0 16 16z" fill="currentColor" opacity="0.3"/><circle cx="24" cy="24" r="20" stroke-dasharray="2 4"/><circle cx="34" cy="14" r="2" fill="currentColor"/></svg>`
    },
    'synthwave-84': {
        category: 'Cyber',
        palette: ['#f97316', '#d946ef', '#180b2a'],
        color: '#d946ef',
        opacity: '0.25',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="20" r="14" fill="currentColor" opacity="0.3"/><line x1="10" y1="20" x2="38" y2="20"/><line x1="12" y1="24" x2="36" y2="24"/><line x1="4" y1="32" x2="44" y2="32"/><line x1="2" y1="44" x2="46" y2="44"/><line x1="8" y1="32" x2="4" y2="44"/><line x1="16" y1="32" x2="14" y2="44"/><line x1="24" y1="32" x2="24" y2="44"/><line x1="32" y1="32" x2="34" y2="44"/><line x1="40" y1="32" x2="44" y2="44"/></svg>`
    },
    '8-bit-orbit': {
        category: 'Cyber',
        palette: ['#00ffcc', '#22c55e', '#09101f'],
        color: '#00ffcc',
        opacity: '0.28',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="currentColor"><path d="M18 6h12v4H18zM10 10h4v6h-4zM34 10h4v6h-4zM10 16h28v10H10zM6 22h4v8H6zM38 22h4v8h-4zM14 26h4v4h-4zM30 26h4v4h-4zM14 36h6v6h-6zM28 36h6v6h-6zM10 32h4v4h-4zM34 32h4v4h-4z"/></svg>`
    },
    'dark': {
        category: 'Cyber',
        palette: ['#38bdf8', '#64748b', '#030712'],
        color: '#38bdf8',
        opacity: '0.20',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="24 4 42 14 42 34 24 44 6 34 6 14" fill="currentColor" opacity="0.2"/><polygon points="24 12 34 18 34 30 24 36 14 30 14 18"/><circle cx="24" cy="24" r="3" fill="currentColor"/></svg>`
    },
    'vintage': {
        category: 'Retro',
        palette: ['#78350f', '#b45309', '#fbf8f1'],
        color: '#78350f',
        opacity: '0.12',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="24" r="18" stroke-dasharray="5 3"/><circle cx="24" cy="24" r="13"/><path d="M15 20h18"/><path d="M15 28h18"/><path d="M24 16v16"/><path d="M38 20c2 2 4 2 6 0"/><path d="M38 24c2 2 4 2 6 0"/><path d="M38 28c2 2 4 2 6 0"/></svg>`
    },
    'notebook': {
        category: 'Retro',
        palette: ['#2563eb', '#ef4444', '#fdfdfb'],
        color: '#2563eb',
        opacity: '0.14',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="10" y="6" width="30" height="36" rx="3"/><line x1="18" y1="6" x2="18" y2="42" stroke="#ef4444"/><circle cx="10" cy="12" r="3" fill="currentColor"/><circle cx="10" cy="20" r="3" fill="currentColor"/><circle cx="10" cy="28" r="3" fill="currentColor"/><circle cx="10" cy="36" r="3" fill="currentColor"/><line x1="22" y1="16" x2="34" y2="16"/><line x1="22" y1="24" x2="34" y2="24"/><line x1="22" y1="32" x2="34" y2="32"/></svg>`
    },
    'blueprint': {
        category: 'Retro',
        palette: ['#38bdf8', '#0284c7', '#0a2342'],
        color: '#38bdf8',
        opacity: '0.18',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="24" cy="10" r="4"/><path d="M22 14l-10 26"/><path d="M26 14l10 26"/><path d="M16 28h16"/><line x1="24" y1="24" x2="24" y2="32"/><circle cx="24" cy="24" r="1" fill="currentColor"/></svg>`
    },
    'risograph-pop': {
        category: 'Retro',
        palette: ['#ec4899', '#3b82f6', '#fdfbf7'],
        color: '#ec4899',
        opacity: '0.14',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="20" cy="20" r="12" fill="#ec4899" opacity="0.4"/><circle cx="28" cy="28" r="12" fill="#3b82f6" opacity="0.4"/><circle cx="24" cy="24" r="18" stroke-dasharray="2 4"/><line x1="24" y1="2" x2="24" y2="8"/><line x1="24" y1="40" x2="24" y2="46"/><line x1="2" y1="24" x2="8" y2="24"/><line x1="40" y1="24" x2="46" y2="24"/></svg>`
    },
    'kraft-paper': {
        category: 'Retro',
        palette: ['#a35b2a', '#78350f', '#e6d5bc'],
        color: '#a35b2a',
        opacity: '0.14',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="8" width="36" height="32" rx="2"/><line x1="6" y1="20" x2="42" y2="20"/><path d="M16 28h16"/><path d="M16 34h10"/><circle cx="34" cy="31" r="4" stroke-dasharray="2 2"/></svg>`
    },
    'coral': {
        category: 'Retro',
        palette: ['#f97316', '#06b6d4', '#fbf8f5'],
        color: '#f97316',
        opacity: '0.14',
        svg: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M24 44v-14c0-6 4-10 8-14"/><path d="M32 16v-8"/><path d="M32 24c4-2 8-6 8-12"/><path d="M24 30c-4-4-8-8-8-14v-8"/><path d="M16 22c-3-2-6-5-6-10"/><path d="M4 42c6-2 14-2 20 0s14 2 20 0"/></svg>`
    }
};

console.log(`Generated definitions for ${Object.keys(MOTIFS).length} motifs.`);

// Export for usage
module.exports = { MOTIFS, svgToDataUri };
