/**
 * Master Bundle Builder for IELTS Interactive HTML Presentations
 * Combines:
 *   1. Modular JavaScript files from /js/ into js/deck-bundle.js
 *   2. Modular CSS component files from /css_src/ into presentation-base.css
 */
const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');
const cssSrcDir = path.join(__dirname, 'css_src');

// ==========================================
// 1. BUNDLE JAVASCRIPT MODULES
// ==========================================
const jsFilesToBundle = [
    'template-engine.js',
    'deck-core.js',
    'deck-components.js',
    'deck-theme-engine.js',
    'image-viewer.js',
    'mobile.js',
    'teacher-highlighter.js',
    'step-reveal.js',
    'student-picker.js',
    'paragraph-loupe.js',
    'presenter-notes.js',
    'reading-grounder.js',
    'reading-highlighter.js',
    'vocab-bank.js',
    'essay-analyzer.js',
    'writing-annotator.js',
    'progress-tracker.js',
    'slide-navigator.js',
    'presentation-spotlight.js',
    'flashcard-engine.js',
    'print-optimizer.js',
    'laser-pointer.js',
    'pen-annotation.js',
    'classroom-timer.js',
    'toast-manager.js',
    'number-flow.js',
    'command-palette.js',
    'deck-charts.js',
    'grammar-reference.js',
    'presentation-tools.js',
    'presenter-sync.js',
    'presenter-drawing.js',
    'presenter-view.js',
    'lesson-protection.js'
];

let jsBundleCode = `/**
 * Universal IELTS Presentation Master Bundle
 * Auto-instantiates DeckEngine on window.deckEngine
 * Generated from modular files in /js/
 */
`;

jsFilesToBundle.forEach(fileName => {
    const filePath = path.join(jsDir, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        jsBundleCode += `\n/* ==================== MODULE: ${fileName} ==================== */\n`;
        jsBundleCode += content + '\n';
    } else {
        console.warn(`⚠️ Warning: JS Module ${fileName} not found in ${jsDir}`);
    }
});

const jsOutputPath = path.join(jsDir, 'deck-bundle.js');
fs.writeFileSync(jsOutputPath, jsBundleCode, 'utf8');
console.log('✓ Master JS bundle built:');
console.log(`  - ${jsOutputPath} (${(fs.statSync(jsOutputPath).size / 1024).toFixed(1)} KB)`);

// ==========================================
// 2. BUNDLE MODULAR CSS COMPONENTS
// ==========================================
if (fs.existsSync(cssSrcDir)) {
    const cssFiles = fs.readdirSync(cssSrcDir)
        .filter(f => f.endsWith('.css'))
        .sort();

    let cssBundleCode = '';
    cssFiles.forEach((file, index) => {
        const filePath = path.join(cssSrcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        cssBundleCode += content;
        if (index < cssFiles.length - 1) {
            cssBundleCode += '\n';
        }
    });

    const cssOutputPath = path.join(__dirname, 'presentation-base.css');
    fs.writeFileSync(cssOutputPath, cssBundleCode, 'utf8');
    console.log('✓ Master CSS bundle built from /css_src/:');
    console.log(`  - ${cssOutputPath} (${(fs.statSync(cssOutputPath).size / 1024).toFixed(1)} KB) [${cssFiles.length} modules]`);
}

// ==========================================
// 3. BUNDLE MODULAR THEMES (themes_src/ -> themes.css)
// ==========================================
const themesSrcDir = path.join(__dirname, 'themes_src');
if (fs.existsSync(themesSrcDir)) {
    const themeFiles = fs.readdirSync(themesSrcDir)
        .filter(f => f.endsWith('.css'))
        .sort();

    let themesBundleCode = `/* ==========================================================================
   EXPERT IELTS PRESENTATIONS - DRAMATIC THEME PRESETS (themes.css)
   Compiled from modular sources in /themes_src/
   ========================================================================== */\n\n`;

    themeFiles.forEach((file, index) => {
        const filePath = path.join(themesSrcDir, file);
        const content = fs.readFileSync(filePath, 'utf8');
        themesBundleCode += `/* ==================== THEME MODULE: ${file} ==================== */\n`;
        themesBundleCode += content + '\n\n';
    });

    const themesOutputPath = path.join(__dirname, 'themes.css');
    fs.writeFileSync(themesOutputPath, themesBundleCode, 'utf8');
    console.log('✓ Master Themes bundle built from /themes_src/:');
    console.log(`  - ${themesOutputPath} (${(fs.statSync(themesOutputPath).size / 1024).toFixed(1)} KB) [${themeFiles.length} theme modules]`);
}





