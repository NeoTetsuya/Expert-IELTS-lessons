const fs = require('fs');
const path = require('path');
const { MOTIFS, svgToDataUri } = require('./enhance_theme_motifs');

const rootDir = path.resolve(__dirname, '..');

// 1. Update css_src/02-stage-layout.css to support .notebook::after watermark
const stageLayoutPath = path.join(rootDir, 'css_src', '02-stage-layout.css');
let stageLayoutCss = fs.readFileSync(stageLayoutPath, 'utf8');

if (!stageLayoutCss.includes('--theme-watermark')) {
    const watermarkCss = `
/* Theme Watermark / Signature Motif on Slides */
.notebook::after {
    content: '';
    position: absolute;
    bottom: 24px;
    right: 28px;
    width: 68px;
    height: 68px;
    background: var(--theme-watermark, none) no-repeat center / contain;
    opacity: var(--theme-watermark-opacity, 0.08);
    pointer-events: none;
    z-index: 2;
    transition: opacity 0.3s ease, transform 0.3s ease;
}
`;
    stageLayoutCss += watermarkCss;
    fs.writeFileSync(stageLayoutPath, stageLayoutCss, 'utf8');
    console.log('✓ Injected .notebook::after watermark into css_src/02-stage-layout.css');
}

// 2. Update css_src/11-hud-tools-theme-modal.css for rich preview cards
const modalCssPath = path.join(rootDir, 'css_src', '11-hud-tools-theme-modal.css');
let modalCss = fs.readFileSync(modalCssPath, 'utf8');

if (!modalCss.includes('.theme-movement-tag')) {
    const richModalCss = `
/* Enhanced Theme Card Preview & Emblems */
.theme-preview-banner {
    height: 62px !important;
    position: relative;
    display: flex !important;
    align-items: center !important;
    justify-content: space-between !important;
    padding: 0 16px !important;
    overflow: hidden;
}

.theme-preview-banner .theme-emblem {
    width: 38px;
    height: 38px;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.45));
    transition: transform 0.22s cubic-bezier(0.16, 1, 0.3, 1);
}

.theme-preview-banner .theme-emblem svg {
    width: 32px;
    height: 32px;
}

.theme-card-option:hover .theme-emblem {
    transform: scale(1.15) rotate(-4deg);
}

.theme-movement-tag {
    font-family: var(--font-mono, monospace);
    font-size: 10px;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 0.9px;
    padding: 3px 8px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.52);
    color: #f1f5f9;
    backdrop-filter: blur(4px);
    border: 1px solid rgba(255, 255, 255, 0.18);
}

.theme-palette-dots {
    display: flex;
    align-items: center;
    gap: 5px;
}

.theme-palette-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 1px solid rgba(255, 255, 255, 0.45);
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
}
`;
    modalCss += richModalCss;
    fs.writeFileSync(modalCssPath, modalCss, 'utf8');
    console.log('✓ Injected rich modal preview styling into css_src/11-hud-tools-theme-modal.css');
}

// 3. Inject --theme-watermark and --theme-watermark-opacity into themes_src files
const themeSourceFiles = [
    path.join(rootDir, 'themes_src', '01-editorial.css'),
    path.join(rootDir, 'themes_src', '02-bold-brutalist.css'),
    path.join(rootDir, 'themes_src', '03-dark-cyber.css'),
    path.join(rootDir, 'themes_src', '04-tactile-retro.css')
];

themeSourceFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let modified = false;

    Object.entries(MOTIFS).forEach(([themeId, data]) => {
        const themePattern = new RegExp(`(\\[data-theme=["']${themeId}["'][^\\]]*\\s*\\{[^}]*?)(\\n\\})`, 'g');
        if (themePattern.test(content) && !content.includes(`--theme-watermark`)) {
            // Already has or check per theme
        }
        
        // Match specific theme block
        const blockRegex = new RegExp(`(\\[data-theme=["']${themeId}["'][^{]*\\{)([^}]*?)(\\n\\})`);
        const match = content.match(blockRegex);
        if (match) {
            let inner = match[2];
            if (!inner.includes('--theme-watermark:')) {
                const dataUri = svgToDataUri(data.svg);
                const injectVars = `\n    --theme-watermark: url("${dataUri}");\n    --theme-watermark-opacity: ${data.opacity};`;
                content = content.replace(blockRegex, `$1$2${injectVars}$3`);
                modified = true;
            }
        }
    });

    if (modified) {
        fs.writeFileSync(file, content, 'utf8');
        console.log(`✓ Updated theme watermarks in ${path.basename(file)}`);
    } else {
        console.log(`- Watermarks already present or skipped in ${path.basename(file)}`);
    }
});

console.log('✓ Repository motifs injection complete.');
