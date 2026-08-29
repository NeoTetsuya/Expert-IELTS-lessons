/**
 * Live File Watcher for Modular CSS Sources (css_src/)
 * Auto-compiles to presentation-base.css on any change
 */
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const cssSrcDir = path.join(rootDir, 'css_src');
const outputPath = path.join(rootDir, 'presentation-base.css');

function buildCss() {
    try {
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

        fs.writeFileSync(outputPath, cssBundleCode, 'utf8');
        const timestamp = new Date().toLocaleTimeString();
        console.log(`[${timestamp}] ✓ Recompiled presentation-base.css (${cssFiles.length} modules, ${(fs.statSync(outputPath).size / 1024).toFixed(1)} KB)`);
    } catch (err) {
        console.error('Error rebuilding CSS:', err);
    }
}

console.log('👀 Watching css_src/ for changes...');
buildCss();

let debounceTimer = null;
fs.watch(cssSrcDir, (eventType, filename) => {
    if (filename && filename.endsWith('.css')) {
        clearTimeout(debounceTimer);
        debounceTimer = setTimeout(() => {
            console.log(`Detected change in ${filename}...`);
            buildCss();
        }, 100);
    }
});
