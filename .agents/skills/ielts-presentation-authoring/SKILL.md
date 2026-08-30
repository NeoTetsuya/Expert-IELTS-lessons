---
name: ielts-presentation-authoring
description: >-
  Use this skill when creating, modifying, or adding content to any HTML
  presentation file in the Expert-IELTS-lessons repository. Covers the
  declarative slide-card system, all 16 built-in templates, mandatory rules
  (no Speaking, 1-question-per-walkthrough, synonym grounding, action rows),
  skill-color tokens, theme presets, and the 4-Stage Reading Framework.
  Always read this before creating new module HTML files or adding slides.
---

# IELTS Presentation Authoring Guide

**Before creating or modifying any HTML presentation file in this repository, you MUST read the full reference document:**

→ [Architecture & Rules Reference](./references/architecture_and_rules.md)

That document contains everything you need:

## Quick Checklist

1. **Read the reference** — it has the boilerplate, all 16 template samples, and the 10 mandatory rules.
2. **Pick a theme** — set `data-theme` on `<html>` (academic, bold-signal, electric, botanical, voltage, vintage).
3. **Use `<slide-card>`** — always use the declarative syntax, never raw `<section>` for new modules.
4. **Follow the 4-Stage Reading Framework:**
   - Stage 1: Strategy slide (keyword deconstruction, no passage)
   - Stage 2: Full split-view (complete passage + all questions)
   - Stage 3: Walkthrough slides (1 question per slide)
   - Stage 4: Grammar / Vocab / Writing mastery
5. **Never create Speaking slides** — only Reading, Grammar, Vocabulary, Writing.
6. **Always include action rows** on interactive slides (`checkAnswers`, `revealAnswers`, `resetAnswers`).
7. **Use synonym grounding** — `.syn-pair-1` (green anchor), `.syn-pair-2` (purple qualifier), `<mark class="evidence">`.
8. **Tag paragraphs** — `<span class="para-tag">[A]</span>`.
9. **Build bundle after changes** — run `node build-bundle.js`.

## Reference Contents

The [full reference](./references/architecture_and_rules.md) includes:

| Section | What it covers |
|:---|:---|
| §1 Architecture Overview | Mermaid diagram of the full rendering pipeline |
| §2 Core Logic Patterns | Rendering modes, answer checking, evidence grounding, step reveal |
| §3 Template Catalog | All 16 templates with slot names and layout types |
| §4 Mandatory Rules | 10 non-negotiable rules with code examples |
| §5 Slide-Card Samples | 12 copy-paste samples (A–L) for every template type |
| §6 Starter Boilerplate | Complete new module HTML file |
| §7 Build & Deploy | Commands reference |
| §8 Theme System | 6 themes with fonts and aesthetics |
| §9 Reading Framework | 4-Stage summary |
