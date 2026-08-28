/**
 * ==========================================================================
 * AUTOMATIC MASTER HUB INDEX GENERATOR (update-index.js)
 * Scans all course directories ('expert 5', 'expert 6', 'expert 7.5', etc.),
 * analyzes presentation HTML decks, extracts metadata & slide counts,
 * and updates index.html automatically.
 * 
 * Usage: node scripts/update-index.js
 * ==========================================================================
 */

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const indexHtmlPath = path.join(rootDir, 'index.html');

// Directories to scan for presentation files
const targetDirs = ['expert 5', 'expert 6', 'expert 7.5'];

const accentColors = {
    '01': '#38bdf8',
    '02': '#e11d48',
    '03': '#a855f7',
    '04': '#3b82f6',
    '05': '#10b981',
    '06': '#f97316',
    '07': '#6366f1',
    '08': '#84cc16',
    '09': '#06b6d4',
    '10': '#eab308'
};

function scanDecks() {
    const decks = [];

    targetDirs.forEach(dirName => {
        const dirPath = path.join(rootDir, dirName);
        if (!fs.existsSync(dirPath)) return;

        const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.html'));

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const content = fs.readFileSync(filePath, 'utf8');

            // 1. Extract Title
            let title = 'Untitled Module';
            const titleMatch = content.match(/<title>([^<]+)<\/title>/i);
            if (titleMatch) {
                title = titleMatch[1].replace(/Expert\s*IELTS\s*\d*\s*—\s*/i, '').trim();
            }

            // 2. Extract Slide Count
            const slideMatches = content.match(/<section\s+class=["'][^"']*slide[^"']*["']/gi) || [];
            const slideCount = slideMatches.length || 1;

            // 3. Extract Module Identifier
            const levelSlug = dirName.toLowerCase().replace(/\s+/g, '-');
            const modMatch = file.match(/module-?(\d+)/i);
            const modNum = modMatch ? modMatch[1].padStart(2, '0') : '01';
            const accent = accentColors[modNum] || '#38bdf8';

            // 4. Extract Description & Subparts
            const h1Match = content.match(/<h1[^>]*>([^<]+)<\/h1>/i);
            const mainTitle = h1Match ? h1Match[1].replace(/Module\s*\d+\s*:\s*/i, '').trim() : title;

            // Find skill badges
            const skills = [];
            if (content.includes('data-skill="read"')) skills.push('📖 Split Reading');
            if (content.includes('data-skill="grammar"')) skills.push('📐 Grammar Cloze');
            if (content.includes('data-skill="vocab"')) skills.push('🗂️ Lexical Bank');
            if (content.includes('data-skill="write"')) skills.push('✍️ Task Model');

            // Relative URL for index.html
            const relUrl = `${dirName}/${file}`;

            decks.push({
                dirName,
                levelSlug,
                file,
                relUrl,
                modNum,
                title: mainTitle,
                slideCount,
                accent,
                skills: skills.length > 0 ? skills : ['📖 Reading', '📐 Grammar', '🗂️ Lexicon', '✍️ Writing']
            });
        });
    });

    // Sort by level and module number
    decks.sort((a, b) => {
        if (a.dirName !== b.dirName) return a.dirName.localeCompare(b.dirName);
        return a.modNum.localeCompare(b.modNum);
    });

    return decks;
}

function generateCardHtml(deck) {
    const skillChips = deck.skills.map(s => `<span class="skill-chip">${s}</span>`).join('\n                    ');

    return `        <!-- ${deck.dirName} - Module ${deck.modNum} -->
        <article class="module-card" data-level="${deck.levelSlug}" style="--module-accent: ${deck.accent};">
            <div>
                <div class="card-header-row">
                    <span class="mod-badge">${deck.dirName.toUpperCase()} • Mod ${deck.modNum}</span>
                    <span class="slide-count-tag">${deck.slideCount} Slides</span>
                </div>
                <h3 class="mod-title">${deck.title}</h3>
                <p class="mod-desc">Interactive IELTS presentation deck with grounded reading passages, automated answer checking, and teacher tools.</p>

                <div class="skills-row">
                    ${skillChips}
                </div>
            </div>

            <div class="card-actions">
                <a href="${deck.relUrl}" class="btn-launch" target="_blank">🚀 Launch Presentation</a>
                <button class="btn-preview" onclick="openModal('${deck.relUrl}', '${deck.dirName.toUpperCase()}: ${deck.title}')" title="Preview in Modal">👁️</button>
            </div>
        </article>`;
}

function updateIndexHtml() {
    if (!fs.existsSync(indexHtmlPath)) {
        console.error('index.html not found!');
        return;
    }

    const decks = scanDecks();
    console.log(`Found ${decks.length} presentation decks across course folders.`);

    let indexContent = fs.readFileSync(indexHtmlPath, 'utf8');

    const cardsHtml = decks.map(d => generateCardHtml(d)).join('\n\n');

    // Replace inside <main class="modules-grid" id="modulesGrid">
    const gridRegex = /(<main class="modules-grid" id="modulesGrid">)[\s\S]*?(<\/main>)/i;

    if (gridRegex.test(indexContent)) {
        indexContent = indexContent.replace(gridRegex, `$1\n${cardsHtml}\n    $2`);
        fs.writeFileSync(indexHtmlPath, indexContent, 'utf8');
        console.log('✓ index.html successfully updated with all current decks!');
    } else {
        console.error('Could not locate <main class="modules-grid" id="modulesGrid"> in index.html');
    }
}

updateIndexHtml();
