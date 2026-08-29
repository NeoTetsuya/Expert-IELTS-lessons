/**
 * =========================================================================
 * WRITING ANNOTATOR & PHRASE STUDY ENGINE
 * Expert IELTS Course Presentations Architecture
 * Provides interactive signposting highlights, vocabulary collocations,
 * phrase breakdown modals, inline hover tooltips, and text-to-speech essay narration.
 * =========================================================================
 */

(function () {
    'use strict';

    class WritingAnnotator {
        static init() {
            this.createModal();
            this.bindEvents();
            this.enhancePhrases();
        }

        static createModal() {
            if (document.getElementById('writing-phrase-modal')) return;

            const modalHtml = `
            <div id="writing-phrase-modal" class="writing-modal-overlay" style="display:none;">
                <div class="writing-modal-card" id="writing-modal-card">
                    <div class="writing-modal-header">
                        <div>
                            <span id="wm-badge" class="writing-modal-badge">Signposting Device</span>
                            <h3 id="wm-title" class="writing-modal-title">Phrase Title</h3>
                        </div>
                        <button class="writing-modal-close" onclick="WritingAnnotator.closeModal()" title="Close (Esc)">✕</button>
                    </div>
                    <div class="writing-modal-body">
                        <div class="wm-section wm-function">
                            <span class="wm-label">📌 Function &amp; Exam Purpose</span>
                            <p id="wm-desc" style="font-size:17px; line-height:1.6; color:#1e293b; margin:6px 0 0;">Description text</p>
                        </div>
                        <div class="wm-section wm-upgrade" id="wm-upgrade-box" style="margin-top:12px; display:none;">
                            <span class="wm-label" style="color:#059669; font-weight:700;">⭐ Band 7+ Lexical Upgrade</span>
                            <p id="wm-upgrade" style="font-size:16.5px; line-height:1.6; color:#065f46; margin:6px 0 0;">Upgrade example</p>
                        </div>
                    </div>
                    <div class="writing-modal-footer" style="display:flex; justify-content:space-between; align-items:center; margin-top:20px; padding-top:12px; border-top:1px solid #e2e8f0;">
                        <button class="btn-action" onclick="WritingAnnotator.speakPhrase()" style="font-size:15px; padding:6px 14px;">🔊 Listen Phrase</button>
                        <button class="btn-action btn-primary" onclick="WritingAnnotator.closeModal()" style="font-size:15px; padding:6px 16px;">Got It</button>
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        static enhancePhrases() {
            // Add title and aria attributes to all phrases for immediate accessibility
            document.querySelectorAll('.hl-phrase, .hl-vocab, .hl-connector').forEach(el => {
                const phrase = el.getAttribute('data-phrase') || el.getAttribute('data-title') || el.textContent.trim();
                const note = el.getAttribute('data-note') || el.getAttribute('data-desc') || '';
                if (note && !el.title) {
                    el.title = `${phrase}: ${note}`;
                }
                el.setAttribute('tabindex', '0');
                el.setAttribute('role', 'button');
            });
        }

        static bindEvents() {
            // Event delegation for clicks on phrases and vocab
            document.addEventListener('click', (e) => {
                const target = e.target.closest('.hl-phrase, .hl-vocab, .hl-connector');
                if (target) {
                    e.preventDefault();
                    e.stopPropagation();

                    const title = target.getAttribute('data-phrase') || target.getAttribute('data-title') || target.textContent.trim();
                    const type = target.getAttribute('data-type') || (target.classList.contains('hl-vocab') ? 'Topic Collocation' : 'Band 7+ Signposting Device');
                    const desc = target.getAttribute('data-note') || target.getAttribute('data-desc') || 'Essential IELTS Task 1 / Task 2 phrasing for high coherence and lexical scoring.';
                    const upgrade = target.getAttribute('data-upgrade') || '';
                    
                    // Add active ring effect
                    document.querySelectorAll('.hl-phrase.active-phrase, .hl-vocab.active-phrase').forEach(p => p.classList.remove('active-phrase'));
                    target.classList.add('active-phrase');

                    WritingAnnotator.showModal(title, type, desc, upgrade);
                }
            });

            // Enter key on focused phrase
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    const activeEl = document.activeElement;
                    if (activeEl && activeEl.matches('.hl-phrase, .hl-vocab, .hl-connector')) {
                        e.preventDefault();
                        activeEl.click();
                    }
                }
            });

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    WritingAnnotator.closeModal();
                }
            });

            // Close when clicking backdrop
            document.addEventListener('click', (e) => {
                const modal = document.getElementById('writing-phrase-modal');
                if (modal && e.target === modal) {
                    WritingAnnotator.closeModal();
                }
            });

            // Re-enhance on slide change
            document.addEventListener('slidechange', () => {
                WritingAnnotator.enhancePhrases();
            });
        }

        static showModal(title, type, desc, upgrade) {
            WritingAnnotator.createModal();
            const modal = document.getElementById('writing-phrase-modal');
            const card = document.getElementById('writing-modal-card');
            if (!modal || !card) return;

            const titleEl = document.getElementById('wm-title');
            const badgeEl = document.getElementById('wm-badge');
            const descEl = document.getElementById('wm-desc');
            const upBox = document.getElementById('wm-upgrade-box');
            const upEl = document.getElementById('wm-upgrade');

            if (titleEl) titleEl.textContent = title;
            if (badgeEl) badgeEl.textContent = type;
            if (descEl) descEl.textContent = desc;

            if (upBox && upEl) {
                if (upgrade && upgrade.trim() !== '') {
                    upBox.style.display = 'block';
                    upEl.textContent = upgrade;
                } else {
                    upBox.style.display = 'none';
                }
            }

            modal.style.display = 'flex';
            requestAnimationFrame(() => {
                modal.classList.add('show');
                card.classList.add('show');
            });
        }

        static closeModal() {
            const modal = document.getElementById('writing-phrase-modal');
            const card = document.getElementById('writing-modal-card');
            if (!modal) return;

            modal.classList.remove('show');
            if (card) card.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 200);

            document.querySelectorAll('.hl-phrase.active-phrase, .hl-vocab.active-phrase').forEach(p => p.classList.remove('active-phrase'));
        }

        static speakPhrase() {
            const title = document.getElementById('wm-title')?.textContent;
            if (!title || !('speechSynthesis' in window)) return;
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(title);
            utter.rate = 0.90;
            utter.lang = 'en-GB';
            const voices = window.speechSynthesis.getVoices();
            const ukVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
            if (ukVoice) utter.voice = ukVoice;
            window.speechSynthesis.speak(utter);
        }

        static speakEssay(btn) {
            if (!('speechSynthesis' in window)) return;

            if (window._isSpeakingEssay) {
                window.speechSynthesis.cancel();
                window._isSpeakingEssay = false;
                if (btn) btn.innerHTML = '🔊 Listen Model Essay';
                return;
            }

            const slide = btn ? btn.closest('.slide') : document.querySelector('.slide.active');
            if (!slide) return;
            const essayPane = slide.querySelector('.writing-model-pane, [data-slot="model-essay"], [slot="essay"]');
            if (!essayPane) return;

            const text = essayPane.innerText.replace(/Band \d+\+ Official Model Answer/gi, '').trim();
            window.speechSynthesis.cancel();
            const utter = new SpeechSynthesisUtterance(text);
            utter.rate = 0.92;
            utter.lang = 'en-GB';
            const voices = window.speechSynthesis.getVoices();
            const ukVoice = voices.find(v => v.lang === 'en-GB' || v.name.includes('UK') || v.name.includes('British'));
            if (ukVoice) utter.voice = ukVoice;

            utter.onstart = () => {
                window._isSpeakingEssay = true;
                if (btn) btn.innerHTML = '⏹️ Stop Narration';
            };
            utter.onend = utter.onerror = () => {
                window._isSpeakingEssay = false;
                if (btn) btn.innerHTML = '🔊 Listen Model Essay';
            };

            window.speechSynthesis.speak(utter);
        }

        static toggleHighlights(btn) {
            const slide = btn ? btn.closest('.slide') : document.querySelector('.slide.active');
            if (!slide) return;
            slide.classList.toggle('hide-writing-highlights');
            const isHidden = slide.classList.contains('hide-writing-highlights');
            if (btn) {
                btn.innerHTML = isHidden ? '💡 Show Signpost Highlights' : '👁️ Hide Highlights';
                btn.classList.toggle('btn-primary', !isHidden);
            }
        }
    }

    window.WritingAnnotator = WritingAnnotator;
    window.speakEssay = (btn) => WritingAnnotator.speakEssay(btn);
    window.toggleWritingHighlights = (btn) => WritingAnnotator.toggleHighlights(btn);

    // Initialize immediately if DOM is ready, or on DOMContentLoaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => WritingAnnotator.init());
    } else {
        WritingAnnotator.init();
    }
})();
