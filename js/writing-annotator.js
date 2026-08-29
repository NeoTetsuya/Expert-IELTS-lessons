/**
 * =========================================================================
 * WRITING ANNOTATOR & PHRASE STUDY ENGINE
 * Expert IELTS Course Presentations Architecture
 * Provides interactive signposting highlights, vocabulary collocations,
 * phrase breakdown modals, and text-to-speech essay narration.
 * =========================================================================
 */

(function () {
    'use strict';

    class WritingAnnotator {
        static init() {
            this.createModal();
            this.bindEvents();
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
                            <p id="wm-desc">Description text</p>
                        </div>
                        <div class="wm-section wm-upgrade" id="wm-upgrade-box">
                            <span class="wm-label">⭐ Band 7+ Lexical Upgrade</span>
                            <p id="wm-upgrade">Upgrade example</p>
                        </div>
                    </div>
                    <div class="writing-modal-footer">
                        <button class="btn-action" onclick="WritingAnnotator.speakPhrase()" style="margin-right:auto; font-size:15px;">🔊 Listen Phrase</button>
                        <button class="btn-action btn-primary" onclick="WritingAnnotator.closeModal()" style="font-size:15px;">Got It</button>
                    </div>
                </div>
            </div>`;

            document.body.insertAdjacentHTML('beforeend', modalHtml);
        }

        static bindEvents() {
            // Event delegation for clicks on phrases and vocab
            document.addEventListener('click', (e) => {
                const target = e.target.closest('.hl-phrase, .hl-vocab, .hl-connector');
                if (target) {
                    e.preventDefault();
                    e.stopPropagation();
                    const title = target.getAttribute('data-title') || target.textContent.trim();
                    const type = target.getAttribute('data-type') || (target.classList.contains('hl-vocab') ? 'Topic Collocation' : 'Opinion Signposting');
                    const desc = target.getAttribute('data-desc') || 'Essential IELTS Task 2 phrasing for clear paragraph cohesion and lexical scoring.';
                    const upgrade = target.getAttribute('data-upgrade') || '';
                    this.showModal(title, type, desc, upgrade);
                }
            });

            // Close on Escape
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeModal();
                }
            });

            // Close when clicking backdrop
            const modal = document.getElementById('writing-phrase-modal');
            if (modal) {
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) {
                        this.closeModal();
                    }
                });
            }
        }

        static showModal(title, type, desc, upgrade) {
            const modal = document.getElementById('writing-phrase-modal');
            const card = document.getElementById('writing-modal-card');
            if (!modal || !card) return;

            document.getElementById('wm-title').textContent = title;
            document.getElementById('wm-badge').textContent = type;
            document.getElementById('wm-desc').textContent = desc;

            const upBox = document.getElementById('wm-upgrade-box');
            if (upgrade && upgrade.trim() !== '') {
                upBox.style.display = 'block';
                document.getElementById('wm-upgrade').textContent = upgrade;
            } else {
                upBox.style.display = 'none';
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
            const essayPane = slide.querySelector('.writing-model-pane, [data-slot="model-essay"]');
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
            }
        }
    }

    window.WritingAnnotator = WritingAnnotator;
    window.speakEssay = (btn) => WritingAnnotator.speakEssay(btn);
    window.toggleWritingHighlights = (btn) => WritingAnnotator.toggleHighlights(btn);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => WritingAnnotator.init());
    } else {
        WritingAnnotator.init();
    }
})();
