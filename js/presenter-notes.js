/**
 * ==========================================================================
 * TEACHER PRESENTER NOTES DRAWER (PresenterNotesEngine)
 * Collapsible side-drawer displaying pedagogical talking points,
 * pacing cues, and common IELTS student pitfalls for the active slide.
 * Keyboard shortcut: 'N' (toggle notes)
 * ==========================================================================
 */

class PresenterNotesEngine {
    constructor(deckEngine) {
        this.deckEngine = deckEngine;
        this.isOpen = false;
        this.init();
    }

    init() {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Shortcut 'N' toggles presenter notes
        document.addEventListener('keydown', (e) => {
            if ((e.key === 'n' || e.key === 'N') && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                e.preventDefault();
                this.toggle();
            }
        });
    }

    injectUI() {
        if (document.getElementById('presenterNotesDrawer')) return;

        const drawer = document.createElement('aside');
        drawer.id = 'presenterNotesDrawer';
        drawer.className = 'presenter-notes-drawer';
        drawer.innerHTML = `
            <div class="notes-header">
                <div>
                    <h3>📝 Teacher Presenter Notes</h3>
                    <span class="notes-slide-tag" id="notesSlideTag">Slide 1</span>
                </div>
                <button class="notes-close-btn" onclick="presenterNotesEngine.toggle()">×</button>
            </div>
            <div class="notes-content" id="notesContent">
                <!-- Dynamically hydrated -->
            </div>
        `;
        document.body.appendChild(drawer);
        this.injectStyles();

        // Listen to slide changes to update notes
        window.addEventListener('slidechanged', () => this.updateNotesForCurrentSlide());
        this.updateNotesForCurrentSlide();
    }

    toggle() {
        this.isOpen = !this.isOpen;
        const drawer = document.getElementById('presenterNotesDrawer');
        const btn = document.getElementById('toolNotesBtn');
        if (drawer) drawer.classList.toggle('open', this.isOpen);
        if (btn) btn.classList.toggle('active', this.isOpen);
        if (this.isOpen) this.updateNotesForCurrentSlide();
    }

    updateNotesForCurrentSlide() {
        const activeSlide = document.querySelector('.slide.active');
        const tagEl = document.getElementById('notesSlideTag');
        const contentEl = document.getElementById('notesContent');
        if (!activeSlide || !contentEl) return;

        const skill = activeSlide.dataset.skill || 'general';
        const slideNum = activeSlide.querySelector('.slide-number')?.textContent || 'General Overview';
        if (tagEl) tagEl.textContent = slideNum;

        // Extract custom slide notes or generate pedagogical guidance based on skill
        let customNote = activeSlide.querySelector('.teacher-note')?.innerHTML;
        if (!customNote) {
            customNote = this.getDefaultGuidance(skill, activeSlide);
        }

        contentEl.innerHTML = customNote;
    }

    getDefaultGuidance(skill, slide) {
        switch(skill) {
            case 'read':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (10–12 min)</h4>
                        <p>Have students scan the passage for parallel expressions before answering questions.</p>
                    </div>
                    <div class="note-section warning">
                        <h4>⚠️ Common Student Traps</h4>
                        <p>Students often mistake <strong>NOT GIVEN</strong> for <strong>FALSE/NO</strong>. Remind them: if the text lacks direct confirmation or denial, it must be NOT GIVEN.</p>
                    </div>
                    <div class="note-section tip">
                        <h4>💡 Teacher Tip</h4>
                        <p>Use the <kbd>E</kbd> key for Step Reveal to discuss each question card Socratic-style.</p>
                    </div>
                `;
            case 'grammar':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (8–10 min)</h4>
                        <p>Clarify tense markers and clause construction. Elicit example sentences from 2–3 students.</p>
                    </div>
                    <div class="note-section tip">
                        <h4>💡 Collocation Check</h4>
                        <p>Highlight prepositions and time adverbials (e.g. <em>since 2011</em> vs <em>in 2011</em>).</p>
                    </div>
                `;
            case 'write':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (12–15 min)</h4>
                        <p>Analyze paragraph coherence, cohesive devices, and data comparison structures.</p>
                    </div>
                    <div class="note-section">
                        <h4>📊 Band 7.0+ Criteria</h4>
                        <p>Ensure students note the contrast transition words (<em>while, in contrast, whereas</em>) highlighted on screen.</p>
                    </div>
                `;
            case 'vocab':
                return `
                    <div class="note-section">
                        <h4>🎯 Objective &amp; Timing (6–8 min)</h4>
                        <p>Drill pronunciation using the Multi-Accent speech player. Test word formation suffixes.</p>
                    </div>
                `;
            default:
                return `
                    <div class="note-section">
                        <h4>🎯 Presentation Guidance</h4>
                        <p>Introduce the module syllabus and set the pacing expectations for today's masterclass.</p>
                    </div>
                `;
        }
    }

    injectStyles() {
        if (document.getElementById('presenterNotesStyles')) return;
        const style = document.createElement('style');
        style.id = 'presenterNotesStyles';
        style.textContent = `
            .presenter-notes-drawer {
                position: fixed;
                top: 0;
                right: 0;
                width: 360px;
                height: 100vh;
                background: #0f172a;
                border-left: 1.5px solid rgba(255, 255, 255, 0.16);
                box-shadow: -10px 0 35px rgba(0, 0, 0, 0.6);
                z-index: 99999;
                transform: translateX(100%);
                transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
                display: flex;
                flex-direction: column;
                color: #f8fafc;
            }
            .presenter-notes-drawer.open {
                transform: translateX(0);
            }
            .notes-header {
                padding: 20px 24px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
            }
            .notes-header h3 { font-size: 16px; font-weight: 800; }
            .notes-slide-tag { font-family: var(--font-mono); font-size: 12px; color: #38bdf8; }
            .notes-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 24px;
                cursor: pointer;
            }
            .notes-close-btn:hover { color: #ffffff; }
            .notes-content {
                flex: 1;
                padding: 24px;
                overflow-y: auto;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }
            .note-section {
                background: rgba(255, 255, 255, 0.04);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 10px;
                padding: 14px 16px;
            }
            .note-section h4 { font-size: 13.5px; font-weight: 800; margin-bottom: 6px; color: #38bdf8; }
            .note-section p { font-size: 13px; color: #cbd5e1; line-height: 1.55; }
            .note-section.warning { border-color: rgba(239, 68, 68, 0.4); background: rgba(239, 68, 68, 0.08); }
            .note-section.warning h4 { color: #f87171; }
            .note-section.tip { border-color: rgba(16, 185, 129, 0.4); background: rgba(16, 185, 129, 0.08); }
            .note-section.tip h4 { color: #34d399; }
        `;
        document.head.appendChild(style);
    }
}

// Global instantiation
window.presenterNotesEngine = new PresenterNotesEngine();
