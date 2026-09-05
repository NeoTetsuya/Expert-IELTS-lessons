# Authoritative Guide: Converting IELTS Lesson Markdown to Interactive Presentations

This guide provides the complete, canonical specification for taking an IELTS lesson content markdown file (from `md files/`) and transforming it into a high-performance, responsive 16:9 interactive HTML presentation deck (`expert X/module-XX.html`) powered by `template-engine.js` and `deck-engine.js`.

---

## 1. Golden Rules & Architectural Constraints

Before processing any markdown file or writing code, internalize these mandatory project constraints:

1. **Safety Backup First**:
   - **Always** create a full timestamped backup in `backup_files/` before modifying or creating presentation files.
2. **Never Paste Answers as Static Text — Convert All Answers into Interactive Exercises**:
   - The markdown file is a teacher's answer key or curriculum source containing both questions and answers. **Never paste the answers as static plain text or bullet points on the slide!**
   - Every single exercise must be transformed into an interactive exercise:
     - Dropdowns: `<select class="select-input" data-ans="...">`
     - Blanks: `<input type="text" class="blank-input" data-ans="..." placeholder="...">`
     - Item explanations: `<div class="item-explanation">` that reveals why the answer is correct when checked.
     - Evidence triggers: `<button class="syn-btn" data-ev="..." onclick="...">💡</button>` linking to passage evidence.
3. **Always Include Full Reading Passages**:
   - On split-reading slides, **always provide the entire, complete verbatim reading passage** from the textbook/markdown file (every paragraph: `Intro`, `Para 1`, `Para 2`, etc.). Never truncate the passage into small 2-sentence extracts. Students and teachers must be able to scan the entire passage, practice skimming, and find evidence in context.
4. **Strictly Omit Speaking Skills**:
   - **Never create Speaking slides or exercises**. Speaking is taught in separate formats. Skip all markdown sections discussing Speaking (e.g. Part 1, Part 2, Part 3 prompts).
5. **No Placeholder Creation**:
   - Do not create or populate content in placeholder directories or empty `.gitkeep` stubs (e.g. `expert 7.5/`) unless specifically requested.
6. **16:9 Responsive Viewport**:
   - Decks must scale dynamically inside `.deck-viewport` and `.deck-stage` (`1920×1080` base coordinate space) with high-contrast, WCAG AAA compliant text tokens.
7. **Exact Template Compatibility**:
   - Use only templates registered in [`js/template-engine.js`](file:///d:/Github%20Repos/Expert-IELTS-lessons/js/template-engine.js). Never invent custom template names on `<slide-card>` (such as `split-reading`, `model-essay`, `grammar-rule`, or `exercise-blank`), as they will fall back to `tmpl-standard` without specialized layouts or action buttons.

---

## 2. Markdown File Anatomy

Files in `md files/` (e.g., `md files/e6/m4 content.md`) follow a standardized hierarchical layout based on the Expert IELTS coursebook:

```markdown
# Module [N]: [Module Title]

## [N]a [Unit A Topic]

### Reading ([Question Type]) (pp. XX–YY)
#### Before you read
- Lead-in discussion questions, photo descriptions, or background brainstorming.

#### Text referencing / Vocabulary / Strategy
- Cohesive referencing analysis, prefixes, collocations, or matching pre-tasks.
- **CRITICAL**: The markdown lists answers (e.g. *these* -> awards; *his* -> Alfred Nobel). **You must transform these into interactive dropdown selects or cloze blanks!**

#### Reading Passage 1 / Passage Excerpt
- Full reading passage text. **Must be preserved in full on the split-reading slide!**

#### Test practice: Questions 1–[K]
- Question stems, options (A–D, etc.), verified answer keys, and bracketed line citations `[cite: ...]`.
- **CRITICAL**: Build interactive question cards with `<select class="select-input" data-ans="...">` and evidence buttons.

### Language development ([Grammar Focus]) (p. ZZ)
- Grammar rules, degrees of certainty, concept check questions, cloze exercises, or sentence transformation tables.
- **CRITICAL**: Transform every sentence into an interactive gap-fill with `<input type="text" class="blank-input" data-ans="...">`.

### Writing ([Task 2 / Task 1 Focus]) (pp. AA–BB)
- Prompt deconstruction, student model comparisons, structural anatomy, cohesive devices, and sentence ordering challenges.
- **CRITICAL**: Transform sentence ordering into interactive select dropdowns and paragraph analysis into interactive evaluations.

---

## [N]b [Unit B Topic]

### Reading ([Second Question Type]) (pp. CC–DD)
- Background science, full reading passages, strategy notes, test practice questions, and line citations.

### Writing ([Full Essay Architecture]) (pp. EE–FF)
- Task 2 essay prompt, brainstorming spidergrams, 4-stage essay structure, cohesion upgrade editing workshops, and full Band 8.5 model essays.

### Review (p. GG)
- Self-assessment rubrics and module mastery checklists.
```

---

## 3. Template Registry & Slot Mapping Matrix

`template-engine.js` expands `<slide-card>` tags into full `<section class="slide">` DOM trees. Always use the canonical template names and slot identifiers below:

| UI Purpose | Template Name | Required Child Slots | Example Content |
|---|---|---|---|
| **Title Slide** | `template="title"` | `<span slot="badge">`<br>`<span slot="title">`<br>`<span slot="subtitle">`<br>`<div slot="roadmap">` | Module badges, main title with `&amp;`, syllabus cards with `deckEngine.jumpToSkill('...')`. |
| **Section Divider** | `template="section-divider"` | `<div slot="content">` | Section chips/pills highlighting upcoming lesson topics. |
| **Split Reading** | `template="reading-split"`<br>*(Never use `split-reading`)* | `<div slot="passage">`<br>`<div slot="questions">` | Left pane: **FULL passage text** with `[Para X]`. Right pane: interactive questions, select inputs, or matching cards. |
| **Interactive Grid** | `template="exercise-grid"`<br>*(Use for general grids, walkthroughs, grammar matrices, & model comparisons)* | `<div slot="grid">` | Two-column cards, walkthrough containers, 3-column grammar matrices, or model paragraph comparisons. |
| **Essay Model** | `template="writing-model"` | `<div slot="prompt">`<br>`<div slot="annotations">`<br>`<div slot="model">` | Left col: prompt card & structural outline. Right col: scrollable model essay with highlighted signposts. |
| **Pre-Reading Strategy** | `template="strategy"` | `<div slot="sentences">`<br>`<div slot="guide">` | Left col: question sentences to deconstruct. Right col: step-by-step strategy guide. |
| **Mastery Checklist** | `template="summary-checklist"` | `<div slot="grid">` | Two-column checklist items with checkmark badges for module sign-off. |
| **Gap-Fill Passage** | `template="gap-fill-passage"` | `<div slot="passage">`<br>`<div slot="rules-col">` | Left col: narrative passage with inline blank inputs. Right col: grammar rules or word banks. |
| **Lexicon Hub** | `template="vocab-cards"` or `template="vocab-grid"` | `<div slot="cards">`<br>`<div slot="inspector">` | Left col: word card chips. Right col: phonetic transcription and collocation inspector. |

---

## 4. Converting Answer Keys into Interactive Exercises

### Pattern 1: Text Referencing (Pronouns & Anaphora)
Instead of static text, build an interactive card with a quote extract and a dropdown:
```html
<div class="card q-card" data-q="ref-1" style="border-left: 5px solid var(--col-reading); padding: 18px 22px;">
    <div style="font-size: 18px; font-weight: 800; color: var(--col-reading); margin-bottom: 8px;">
        1. Context: "these" (line 4)
    </div>
    <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px 16px; font-size: 17px; line-height: 1.6; margin-bottom: 12px;">
        <em>"Many institutes offer their own national awards, and then there are international prizes too. Probably the most famous of all of <mark class="ref-highlight">these</mark> are the annual Nobel Prizes."</em>
    </div>
    <div style="display: flex; justify-content: space-between; align-items: center;">
        <span style="font-size: 16.5px; font-weight: 700;">What does "these" refer back to?</span>
        <select class="select-input" data-ans="awards" style="font-weight: 700; min-width: 220px; padding: 8px 12px;">
            <option value="">Select referent...</option>
            <option value="awards">awards and prizes in science</option>
            <option value="institutes">national institutes</option>
            <option value="chemists">Swedish chemists</option>
        </select>
    </div>
    <div class="item-explanation" style="font-size: 15.5px; margin-top: 8px;">
        <strong>Answer: awards and prizes in science</strong> — "these" refers back to the antecedent category mentioned in the preceding sentence.
    </div>
</div>
```

### Pattern 2: Matching Features with Evidence Grounding
```html
<div class="card q-card" data-q="tp-1" style="padding: 14px 18px; margin-bottom: 10px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-size: 16.5px; font-weight: 700;"><strong>1.</strong> It may allow medical practitioners to identify an illness.</span>
        <button class="syn-btn" data-ev="ev-tp-1" onclick="deckEngine.toggleSynonymExplanation('tp-1', 'ev-tp-1')" title="Show passage evidence">💡</button>
    </div>
    <div style="margin-top: 8px;">
        <select class="select-input" data-ans="C" style="width: 100%; font-weight: 700; padding: 8px 12px;">
            <option value="">-- Choose Scientist / Institution --</option>
            <option value="A">A. Michael Smith (Cornell University)</option>
            <option value="B">B. Justin Schmidt (Southwestern Biological Inst)</option>
            <option value="C">C. Oxford University</option>
            <option value="D">D. The University of Chile</option>
        </select>
    </div>
    <div class="item-explanation" style="font-size: 15px; margin-top: 6px;">
        <strong>Correct: C (Oxford University)</strong> — Paragraph 3 states: <em>"...asking patients whether their pain worsened going over speed bumps... could help doctors in a diagnosis."</em>
    </div>
</div>
```

### Pattern 3: Sentence Completion (Strict Word Limit)
```html
<div class="card q-card" data-q="sc-7" style="padding: 14px 18px; margin-bottom: 10px;">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
        <span style="font-size: 16.5px; line-height: 1.6;">
            <strong>7.</strong> To ensure the science was correct, the film-maker asked a famous 
            <input type="text" class="blank-input" data-ans="astrophysicist" placeholder="word..." style="width: 160px; font-weight: 700;"> 
            for help.
        </span>
        <button class="syn-btn" data-ev="ev-sc-7" onclick="deckEngine.toggleSynonymExplanation('sc-7', 'ev-sc-7')" title="Show passage evidence">💡</button>
    </div>
    <div class="item-explanation" style="font-size: 15px; margin-top: 6px;">
        <strong>Answer: astrophysicist</strong> (Paragraph 1: <em>"...got advice from well-known astrophysicist Professor Kip Thorne."</em>)
    </div>
</div>
```

### Pattern 4: Socratic Question Walkthrough
```html
<slide-card template="exercise-grid" skill="read" title="Walkthrough: Question 1 — Medical Diagnosis (Oxford University)" badge="Reading 4a • Socratic Deep Dive">
    <div slot="grid">
        <div class="walkthrough-container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 24px;">
            <div class="card" style="padding: 22px; border-left: 5px solid var(--col-reading);">
                <h4 style="font-size: 18px; font-weight: 700; color: var(--col-reading); margin-bottom: 10px;">📖 Text Excerpt (Paragraph 3)</h4>
                <p style="font-size: 16px; line-height: 1.7;">
                    "The scientists learnt that doctors can diagnose appendicitis — a serious medical condition — by the levels of pain the patient feels when travelling over speed bumps..."
                </p>
            </div>
            <div class="card" style="padding: 22px; border-left: var(--col-vocab); border-left-width: 5px; border-left-style: solid;">
                <h4 style="font-size: 18px; font-weight: 700; color: var(--col-vocab); margin-bottom: 10px;">🎯 Paraphrase Alignment &amp; Distractor Trap</h4>
                <ul style="padding-left: 20px; font-size: 16px; line-height: 1.8;">
                    <li><strong>Question Prompt:</strong> <em>"allow medical practitioners to identify an illness"</em></li>
                    <li><strong>Text Equivalent:</strong> <em>"help doctors in a diagnosis of appendicitis"</em></li>
                    <li><strong>Distractor Trap:</strong> A and B describe sting pain, not an internal disease diagnosis!</li>
                    <li><strong>Correct Match:</strong> <span class="tag-pill" style="background: #0284c7; color: #fff;">C — Oxford University</span></li>
                </ul>
            </div>
        </div>
    </div>
</slide-card>
```

---

## 5. Full Passages vs Snippets

Every reading split-view slide **must include the entire reading passage**:
1. Add `<span class="para-tag">[Para 1]</span>`, `<span class="para-tag">[Para 2]</span>`, etc., at the beginning of each paragraph.
2. Wrap key evidence in `<mark class="evidence" id="ev-..." data-q="...">` with distinct IDs matching the question items.
3. Use high-legibility styling: `style="font-size: 20px; line-height: 1.8;"`.
4. Ensure the reading pane has `overflow-y: auto;` so students can scroll through the entire text comfortably.

---

## 6. Pre-flight QA Checklist

- [ ] Has a safety backup been created in `backup_files/`?
- [ ] Are all Speaking exercises completely removed?
- [ ] Are all reading passages provided in **full**, with paragraph tags?
- [ ] Is every single answer in the markdown converted into an **interactive input or select**?
- [ ] Are there **zero** static answer keys or plain text cheat sheets?
- [ ] Are all `<slide-card>` template names from the approved registry (`reading-split`, `exercise-grid`, etc.)?
- [ ] Are redundant inner `.action-row` blocks removed (relying on the template's bottom action bar)?
- [ ] Does every interactive input have `data-ans="..."` and an accompanying `.item-explanation`?
- [ ] Has `index.html` been updated with the accurate slide count?
