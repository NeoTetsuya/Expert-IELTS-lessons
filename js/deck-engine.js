/**
 * Universal IELTS Presentation Engine - Modular Auto-Loader
 * Dynamically and synchronously loads all modular component scripts in sequence.
 *
 * Edit individual modules in /js/:
 * - deck-core.js, deck-components.js, deck-theme-engine.js, image-viewer.js, mobile.js
 * - teacher-highlighter.js, step-reveal.js, student-picker.js
 * - paragraph-loupe.js, presenter-notes.js, reading-grounder.js
 * - reading-highlighter.js, vocab-bank.js, essay-analyzer.js, writing-annotator.js
 * - progress-tracker.js, slide-navigator.js, presentation-spotlight.js
 * - flashcard-engine.js, print-optimizer.js, laser-pointer.js
 * - pen-annotation.js, classroom-timer.js, toast-manager.js, number-flow.js
 * - command-palette.js, deck-charts.js, grammar-reference.js
 * - presentation-tools.js, presenter-sync.js, presenter-drawing.js, presenter-view.js
 * - lesson-protection.js
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
    //    NOTE: Must stay in sync with jsFilesToBundle in build-bundle.js
    const modules = [
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
        'category-sorter.js',
        'presenter-sync.js',
        'presenter-drawing.js',
        'presenter-view.js',
        'lesson-protection.js'
    ];

    // 3. Inject scripts sequentially with async=false (replaces deprecated document.write)
    //    async=false preserves execution order while avoiding the deprecated document.write API
    const head = document.head || document.documentElement;
    modules.forEach(function(moduleName) {
        const script = document.createElement('script');
        script.src = basePath + moduleName;
        script.async = false;
        head.appendChild(script);
    });
})();
