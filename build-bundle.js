/**
 * Master Bundle Builder for IELTS Interactive HTML Presentations
 * Combines:
 *   1. Modular JavaScript files into js/deck-bundle.js
 *   2. Modular CSS files from css/ into presentation-base.bundle.css
 */
const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');
const cssDir = path.join(__dirname, 'css');

// 1. Bundle JavaScript Modules
const jsFilesToBundle = [
    'deck-core.js',
    'deck-components.js',
    'deck-theme-engine.js',
    'teacher-highlighter.js',
    'step-reveal.js',
    'student-picker.js',
    'paragraph-loupe.js',
    'presenter-notes.js',
    'reading-grounder.js',
    'reading-highlighter.js',
    'vocab-bank.js',
    'essay-analyzer.js',
    'progress-tracker.js',
    'slide-navigator.js',
    'presentation-spotlight.js',
    'flashcard-engine.js',
    'print-optimizer.js',
    'laser-pointer.js',
    'pen-annotation.js',
    'classroom-timer.js',
    'presentation-tools.js'
];

let jsBundleCode = `/**
 * Universal IELTS Presentation Master Bundle (JS)
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

// 2. Bundle CSS Modules
const cssFilesToBundle = [
    'tokens.css',
    'layout.css',
    'typography.css',
    'components.css',
    'skills.css',
    'animations.css',
    'controls.css'
];

let cssBundleCode = `/* ==========================================================================
   UNIVERSAL PRESENTATION BASE STYLESHEET (COMPILED MASTER BUNDLE)
   Compiled automatically from modular components in /css/
   ========================================================================== */
`;

cssFilesToBundle.forEach(fileName => {
    const filePath = path.join(cssDir, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        cssBundleCode += `\n/* ==================== COMPONENT: ${fileName} ==================== */\n`;
        cssBundleCode += content + '\n';
    } else {
        console.warn(`⚠️ Warning: CSS Module ${fileName} not found in ${cssDir}`);
    }
});

const cssOutputPath = path.join(__dirname, 'presentation-base.bundle.css');
fs.writeFileSync(cssOutputPath, cssBundleCode, 'utf8');
console.log('✓ Master CSS bundle built:');
console.log(`  - ${cssOutputPath} (${(fs.statSync(cssOutputPath).size / 1024).toFixed(1)} KB)`);



