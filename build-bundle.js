/**
 * Master Bundle Builder for IELTS Interactive HTML Presentations
 * Combines all modular JavaScript files into:
 *   1. js/deck-engine.js
 *   2. js/deck-bundle.js
 */
const fs = require('fs');
const path = require('path');

const jsDir = path.join(__dirname, 'js');

const filesToBundle = [
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

let bundleCode = `/**
 * Universal IELTS Presentation Master Bundle
 * Auto-instantiates DeckEngine on window.deckEngine
 * Generated from modular files in /js/
 */
`;

filesToBundle.forEach(fileName => {
    const filePath = path.join(jsDir, fileName);
    if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, 'utf8');
        bundleCode += `\n/* ==================== MODULE: ${fileName} ==================== */\n`;
        bundleCode += content + '\n';
    } else {
        console.warn(`⚠️ Warning: Module ${fileName} not found in ${jsDir}`);
    }
});

const outputPath = path.join(jsDir, 'deck-bundle.js');

fs.writeFileSync(outputPath, bundleCode, 'utf8');

console.log('✓ Master bundle built successfully:');
console.log(`  - ${outputPath} (${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);


