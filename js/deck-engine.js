/**
 * Universal IELTS Presentation Engine - Modular Auto-Loader
 * Dynamically and synchronously loads all modular component scripts in sequence.
 * 
 * Edit individual modules in /js/:
 * - deck-core.js, deck-components.js, deck-theme-engine.js
 * - teacher-highlighter.js, step-reveal.js, student-picker.js
 * - paragraph-loupe.js, presenter-notes.js, reading-grounder.js
 * - reading-highlighter.js, vocab-bank.js, essay-analyzer.js
 * - progress-tracker.js, slide-navigator.js, presentation-spotlight.js
 * - flashcard-engine.js, print-optimizer.js, laser-pointer.js
 * - pen-annotation.js, classroom-timer.js, presentation-tools.js
 */

(function() {
    // 1. Detect base path of deck-engine.js
    const currentScript = document.currentScript || (function() {
        const scripts = document.getElementsByTagName('script');
        for (let i = scripts.length - 1; i >= 0; i--) {
            if (scripts[i].src && scripts[i].src.indexOf('deck-engine.js') !== -1) {
                return scripts[i];
            }
        }
        return scripts[scripts.length - 1];
    })();

    let basePath = '';
    if (currentScript && currentScript.src) {
        basePath = currentScript.src.substring(0, currentScript.src.lastIndexOf('/') + 1);
    } else {
        basePath = '../js/';
    }

    // 2. Ordered list of modular presentation engine components
    const modules = [
        'template-engine.js',
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
        'writing-annotator.js',
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

    // 3. Inject scripts synchronously so they execute in order before DOMContentLoaded
    modules.forEach(function(moduleName) {
        document.write('<script src="' + basePath + moduleName + '"><\/script>');
    });
})();
