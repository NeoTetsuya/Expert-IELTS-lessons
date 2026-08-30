#!/usr/bin/env node

/**
 * =========================================================================
 * GRAMMAR SLIDE BUILDER & EXTRACTOR
 * Expert IELTS Presentations Automation Engine
 * Extracts rules, tables, and exercises from references/grammar_sources/
 * and generates theme-safe, design-token-compliant <slide-card> markup.
 * =========================================================================
 */

const fs = require('fs');
const path = require('path');

const ROOT_DIR = path.resolve(__dirname, '..');
const SOURCES_DIR = path.join(ROOT_DIR, 'references', 'grammar_sources');

function cleanText(str) {
    if (!str) return '';
    return str.replace(/\s+/g, ' ').trim();
}

function stripHtmlTags(str) {
    if (!str) return '';
    return str.replace(/<[^>]*>/g, '').trim();
}

/**
 * Parses an HTML grammar file and extracts key educational sections
 */
function parseGrammarFile(filePath) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const html = fs.readFileSync(filePath, 'utf8');

    // 1. Extract Title
    const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || html.match(/<title>([\s\S]*?)<\/title>/i);
    const title = titleMatch ? cleanText(stripHtmlTags(titleMatch[1])) : 'Grammar Masterclass';

    // 2. Extract Subtitle / Header Description
    const descMatch = html.match(/<p class="[^"]*text-indigo-100[^"]*"[^>]*>([\s\S]*?)<\/p>/i) ||
                      html.match(/<p class="[^"]*subtitle[^"]*"[^>]*>([\s\S]*?)<\/p>/i);
    const description = descMatch ? cleanText(stripHtmlTags(descMatch[1])) : '';

    // 3. Extract Interactive Cards / Rules
    const ruleCards = [];
    const cardRegex = /<div class="[^"]*interactive-card[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi;
    let cardMatch;
    while ((cardMatch = cardRegex.exec(html)) !== null) {
        const cardHtml = cardMatch[0];
        const h4Match = cardHtml.match(/<h4[^>]*>([\s\S]*?)<\/h4>/i);
        const pMatch = cardHtml.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
        const exampleBlock = cardHtml.match(/<div class="[^"]*bg-indigo-50[^"]*"[\s\S]*?>([\s\S]*?)<\/div>/i) ||
                             cardHtml.match(/<div class="[^"]*bg-slate-100[^"]*"[\s\S]*?>([\s\S]*?)<\/div>/i);

        if (h4Match) {
            ruleCards.push({
                heading: cleanText(stripHtmlTags(h4Match[1])),
                explanation: pMatch ? cleanText(stripHtmlTags(pMatch[1])) : '',
                examples: exampleBlock ? cleanText(stripHtmlTags(exampleBlock[1]).replace(/👉/g, '• ')) : ''
            });
        }
    }

    // 4. Extract Structure Tables or Positive/Negative Cards
    const structMatches = html.match(/<div class="[^"]*bg-white border-2 border-indigo-100[^"]*"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/gi);

    return {
        filePath,
        title,
        description,
        ruleCards,
        rawHtmlLength: html.length
    };
}

/**
 * Generates theme-safe <slide-card template="grammar-masterclass"> markup
 */
function generateGrammarSlideCard(data, options = {}) {
    const slideTitle = options.title || data.title;
    const skillBadge = options.badge || 'Grammar Masterclass';

    let leftRulesHtml = '';
    let rightContrastHtml = '';

    if (data.ruleCards.length >= 2) {
        // Left Column: Rule 1
        const r1 = data.ruleCards[0];
        leftRulesHtml += `
                    <div class="rule-card" style="margin-bottom:14px;">
                        <div style="font-size:21px; font-weight:800; color:var(--col-grammar); margin-bottom:6px;">1. ${r1.heading}</div>
                        <p style="font-size:18px; line-height:1.6; margin:0 0 8px 0;">${r1.explanation}</p>
                        ${r1.examples ? `<div style="font-size:16.5px; line-height:1.5; color:var(--text-muted); background:rgba(0,0,0,0.03); padding:8px 12px; border-radius:6px;">${r1.examples}</div>` : ''}
                    </div>`;

        // Left Column: Rule 2
        const r2 = data.ruleCards[1];
        leftRulesHtml += `
                    <div class="rule-card">
                        <div style="font-size:21px; font-weight:800; color:var(--col-reading); margin-bottom:6px;">2. ${r2.heading}</div>
                        <p style="font-size:18px; line-height:1.6; margin:0 0 8px 0;">${r2.explanation}</p>
                        ${r2.examples ? `<div style="font-size:16.5px; line-height:1.5; color:var(--text-muted); background:rgba(0,0,0,0.03); padding:8px 12px; border-radius:6px;">${r2.examples}</div>` : ''}
                    </div>`;

        // Right Column: Summary / Contrast Card
        rightContrastHtml = `
                    <div class="card" style="background:#ffffff; border-top:5px solid var(--col-grammar); padding:20px 24px; margin-bottom:12px;">
                        <h4 style="color:var(--col-grammar); font-size:19px; font-weight:800; margin-bottom:8px;">🎯 Key Academic IELTS Takeaway</h4>
                        <p style="font-size:16.5px; line-height:1.6; color:var(--text-dark); margin:0;">
                            Accurate selection of tenses demonstrates grammatical range and accuracy (Criterion 4) across Task 1 overviews and Task 2 argument development.
                        </p>
                    </div>
                    <div class="card" style="background:#f0fdf4; border:1.5px solid #86efac; padding:16px 20px;">
                        <h4 style="color:#166534; font-size:17.5px; font-weight:800; margin-bottom:6px;">💡 IELTS Band 7+ Tip</h4>
                        <div style="font-size:16px; line-height:1.55; color:#14532d;">
                            Always verify time markers and stative vs dynamic verb contexts before finalizing sentence structure.
                        </div>
                    </div>`;
    } else {
        leftRulesHtml = `
                    <div class="rule-card">
                        <div style="font-size:21px; font-weight:800; color:var(--col-grammar); margin-bottom:6px;">1. Core Rules &amp; Usage</div>
                        <p style="font-size:18px; line-height:1.6; margin:0;">${data.description || 'Master core structural principles for high-scoring IELTS grammar.'}</p>
                    </div>`;
        rightContrastHtml = `
                    <div class="card" style="background:#ffffff; border-left:5px solid var(--col-reading); padding:20px 24px;">
                        <h4 style="color:var(--col-reading); font-size:19px; font-weight:800; margin-bottom:8px;">📋 Practical Application</h4>
                        <p style="font-size:16.5px; line-height:1.6; color:var(--text-dark); margin:0;">
                            Apply these rules to eliminate typical band 5-6 errors in formal writing and reading comprehension.
                        </p>
                    </div>`;
    }

    return `
            <!-- GRAMMAR MASTERCLASS SLIDE -->
            <slide-card template="grammar-masterclass" skill="grammar" title="${slideTitle}">
                <div slot="rules">${leftRulesHtml}
                </div>
                <div slot="contrast-card">${rightContrastHtml}
                </div>
            </slide-card>`;
}

/**
 * CLI Handler
 */
function main() {
    const args = process.argv.slice(2);

    if (args.length === 0 || args.includes('--help')) {
        console.log(`
Grammar Slide Builder & Extractor
---------------------------------
Usage:
  node scripts/grammar-slide-builder.js --list
  node scripts/grammar-slide-builder.js --source <path-to-source-html>
  node scripts/grammar-slide-builder.js --module <e.g. expert_6/module_2a_relative_clauses.html>

Examples:
  node scripts/grammar-slide-builder.js --module expert_6/module_2a_relative_clauses.html
  node scripts/grammar-slide-builder.js --source references/grammar_sources/expert_5/module_2a_comparatives_superlatives.html
        `);
        return;
    }

    if (args.includes('--list')) {
        console.log(`\nAvailable Grammar Sources in ${SOURCES_DIR}:\n`);
        const levels = ['expert_5', 'expert_6', 'expert_7.5'];
        levels.forEach(lvl => {
            const dir = path.join(SOURCES_DIR, lvl);
            if (fs.existsSync(dir)) {
                const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
                console.log(`📁 ${lvl} (${files.length} sources):`);
                files.forEach(f => console.log(`   - ${lvl}/${f}`));
                console.log('');
            }
        });
        return;
    }

    let sourceFile = null;
    const sourceIdx = args.indexOf('--source');
    const modIdx = args.indexOf('--module');

    if (sourceIdx !== -1 && args[sourceIdx + 1]) {
        sourceFile = path.resolve(ROOT_DIR, args[sourceIdx + 1]);
    } else if (modIdx !== -1 && args[modIdx + 1]) {
        sourceFile = path.join(SOURCES_DIR, args[modIdx + 1]);
    }

    if (!sourceFile) {
        console.error('Error: Please specify --source <path> or --module <rel-path>');
        process.exit(1);
    }

    try {
        const parsed = parseGrammarFile(sourceFile);
        console.log(`\n✅ Successfully parsed: ${path.basename(sourceFile)}`);
        console.log(`Title: ${parsed.title}`);
        console.log(`Rules Found: ${parsed.ruleCards.length}`);

        const slideMarkup = generateGrammarSlideCard(parsed);
        console.log('\n================ GENERATED SLIDE-CARD MARKUP ================\n');
        console.log(slideMarkup);
        console.log('\n=============================================================\n');
    } catch (err) {
        console.error(`❌ Error parsing file: ${err.message}`);
        process.exit(1);
    }
}

if (require.main === module) {
    main();
}

module.exports = {
    parseGrammarFile,
    generateGrammarSlideCard
};
