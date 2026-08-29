/**
 * Reading Grounder & Vocabulary Explainer Engine (ReadingGrounder)
 * Handles:
 * 1. Interactive Vocabulary Popovers (Definitions, IPA, Audio Pronunciation, and Dual-Pane Highlighting).
 * 2. Automatic dictionary lookup for reading question keywords and passage evidence.
 * 3. Automatic synonym badge rendering from data-syn attributes.
 * 4. Evidence hover focus synchronization.
 */

class ReadingGrounder {
    static init() {
        this.renderSynonymBadges();
        this.bindEvidenceHover();
        this.bindVocabExplainer();
        this.injectVocabStyles();
    }

    /**
     * Built-in IELTS Academic Dictionary for Reading Questions & Target Passage Excerpts
     */
    static get dictionary() {
        return {
            'sharing experiences': {
                word: 'sharing experiences',
                pos: 'phrase',
                ipa: '/ˈʃeə.rɪŋ ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Communicating and recounting personal events to others in social interactions.',
                colloc: 'Paraphrases: "extraordinary experiences" / "tell others"'
            },
            'satisfaction': {
                word: 'satisfaction',
                pos: 'noun',
                ipa: '/ˌsæt.ɪsˈfæk.ʃən/',
                def: 'A pleasant feeling of fulfillment or pleasure.',
                colloc: 'gain / derive satisfaction from'
            },
            'immediate and long-term': {
                word: 'immediate & long-term',
                pos: 'phrase',
                ipa: '/ɪˈmiː.di.ət ænd lɒŋ tɜːm/',
                def: 'Happening in the present moment as well as extending far into the future.',
                colloc: 'Paraphrases: "in the moment" vs. "in the long run"'
            },
            'extraordinary': {
                word: 'extraordinary',
                pos: 'adj.',
                ipa: '/ɪkˈstrɔː.dɪn.ər.i/',
                def: 'Very unusual, special, or remarkable; far beyond ordinary.',
                colloc: 'extraordinary experience / achievement'
            },
            'pleasurable': {
                word: 'pleasurable',
                pos: 'adj.',
                ipa: '/ˈpleʒ.ər.ə.bəl/',
                def: 'Giving a feeling of happy satisfaction or enjoyable sensation.',
                colloc: 'pleasurable in the moment'
            },
            'reminisce': {
                word: 'reminisce',
                pos: 'verb',
                ipa: '/ˌrem.ɪˈnɪs/',
                def: 'To talk, write, or think about enjoyable past experiences.',
                colloc: 'reminisce about the past / fond memories'
            },
            'social communication': {
                word: 'social communication',
                pos: 'noun',
                ipa: '/ˈsəʊ.ʃəl kəˌmjuː.nɪˈkeɪ.ʃən/',
                def: 'The exchange of ideas and information between people in social settings.',
                colloc: 'Paraphrases: "social interaction"'
            },
            'in common': {
                word: 'in common',
                pos: 'idiom / phrase',
                ipa: '/ɪn ˈkɒm.ən/',
                def: 'Shared equally between two or more parties; possessing shared traits.',
                colloc: 'have things in common ↔ grounded in similarities'
            },
            'grounded in': {
                word: 'grounded in',
                pos: 'verb / adj.',
                ipa: '/ˈɡraʊn.dɪd ɪn/',
                def: 'Firmly based on, rooted in, or determined by foundational factors.',
                colloc: 'grounded in similarities / evidence'
            },
            'unusual experiences': {
                word: 'unusual experiences',
                pos: 'noun phrase',
                ipa: '/ʌnˈjuː.ʒu.əl ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Novel, rare, or out-of-the-ordinary events in life.',
                colloc: 'Paraphrases: "extraordinary experiences"'
            },
            'mistakenly thought': {
                word: 'mistakenly thought',
                pos: 'verb phrase',
                ipa: '/mɪˈsteɪ.kən.li θɔːt/',
                def: 'Held an incorrect or inaccurate belief before research evidence.',
                colloc: 'believed ↔ mistakenly thought'
            },
            'participants': {
                word: 'participants',
                pos: 'noun',
                ipa: '/pɑːˈtɪs.ɪ.pənts/',
                def: 'People who take part in a scientific experiment, study, or survey.',
                colloc: 'study participants / sample size'
            },
            'reflected': {
                word: 'reflected',
                pos: 'verb',
                ipa: '/rɪˈflek.tɪd/',
                def: 'Accurately mirrored, reproduced, or represented real-world dynamics.',
                colloc: 'reflected what happens in the real world'
            },
            'criteria': {
                word: 'criteria',
                pos: 'noun (pl.)',
                ipa: '/kraɪˈtɪə.ri.ə/',
                def: 'Standards or principles by which something is judged or decided.',
                colloc: 'different criteria ↔ appearance vs. competence'
            },
            'tailor-made': {
                word: 'tailor-made',
                pos: 'adj.',
                ipa: '/ˈteɪ.lə meɪd/',
                def: 'Made specifically for a particular individual or purpose.',
                colloc: 'specially designed clothes ↔ tailor-made suit'
            },
            'competent': {
                word: 'competent',
                pos: 'adj.',
                ipa: '/ˈkɒm.pɪ.tənt/',
                def: 'Having the necessary ability, knowledge, or skill to do something successfully.',
                colloc: 'highly competent / professional'
            },
            'snap judgement': {
                word: 'snap judgement',
                pos: 'noun',
                ipa: '/snæp ˈdʒʌdʒ.mənt/',
                def: 'A decision or opinion made instantly without deliberation.',
                colloc: 'almost immediately ↔ snap judgement / in one second'
            },
            'enclothed cognition': {
                word: 'enclothed cognition',
                pos: 'noun',
                ipa: '/ɪnˈkləʊðd kɒɡˈnɪʃ.ən/',
                def: 'The systematic influence of clothing on wearers\' psychological processes and cognitive focus.',
                colloc: 'theory of enclothed cognition'
            },
            'impressing others': {
                word: 'impressing others',
                pos: 'phrase',
                ipa: '/ɪmˈpres.ɪŋ ˈʌð.əz/',
                def: 'Gaining admiration or attention from peers through luxury or display.',
                colloc: 'other people notice them ↔ impressing others'
            },
            'belonging': {
                word: 'belonging',
                pos: 'noun',
                ipa: '/bɪˈlɒŋ.ɪŋ/',
                def: 'A sense of being accepted, connected, and part of a social group.',
                colloc: 'signal group belonging ↔ dress in a similar way'
            }
        };
    }

    /**
     * Interactive Vocabulary Highlighting, Pronunciation, and Short Definitions
     */
    static bindVocabExplainer() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.vocab-word, .vocab-term, .syn-pair-1, .syn-pair-2, .syn-pair-3, [data-def]');
            
            // If clicking inside the popover itself (e.g. replay audio or close), don't close
            if (e.target.closest('#vocabPopover')) return;

            if (target) {
                // If it's a synonym span or vocab word, look up its definition
                const text = target.textContent.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, "").trim();
                const matchedDict = this.lookupDict(text, target);

                if (matchedDict || target.dataset.def || target.classList.contains('vocab-word')) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showVocabPopover(target, matchedDict);
                }
            } else {
                this.hideVocabPopover();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideVocabPopover();
            }
        });
    }

    static lookupDict(rawText, el) {
        if (!rawText) return null;
        const dict = this.dictionary;

        // Exact match
        if (dict[rawText]) return dict[rawText];

        // Partial or substring match
        for (const [key, val] of Object.entries(dict)) {
            if (rawText.includes(key) || key.includes(rawText)) {
                return val;
            }
        }

        // Check data attributes on element
        if (el.dataset.word && dict[el.dataset.word.toLowerCase()]) {
            return dict[el.dataset.word.toLowerCase()];
        }

        return null;
    }

    static showVocabPopover(el, dictData = null) {
        // Remove previous active glow
        document.querySelectorAll('.vocab-word.active-vocab, .vocab-term.active-vocab').forEach(v => {
            v.classList.remove('active-vocab');
        });
        el.classList.add('active-vocab');

        const cleanWord = el.dataset.word || (dictData ? dictData.word : el.textContent.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, ""));
        const pos = el.dataset.pos || (dictData ? dictData.pos : 'IELTS KEYWORD');
        const ipa = el.dataset.ipa || (dictData ? dictData.ipa : '');
        const def = el.dataset.def || (dictData ? dictData.def : 'Key academic term targeted in the reading passage & questions.');
        const colloc = el.dataset.colloc || (dictData ? dictData.colloc : '');

        // Auto-play native speech pronunciation in Google Female UK voice
        this.speakWord(cleanWord);

        // Get or create popover element
        let popover = document.getElementById('vocabPopover');
        if (!popover) {
            popover = document.createElement('div');
            popover.id = 'vocabPopover';
            popover.className = 'vocab-popover';
            document.body.appendChild(popover);
        }

        popover.innerHTML = `
            <div class="vp-header">
                <div class="vp-title-group">
                    <span class="vp-word">${cleanWord}</span>
                    <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                        ${pos ? `<span class="vp-pos">${pos}</span>` : ''}
                        ${ipa ? `<span class="vp-ipa">${ipa}</span>` : ''}
                    </div>
                </div>
                <div class="vp-actions">
                    <button class="vp-audio-btn" title="Listen to pronunciation" onclick="ReadingGrounder.speakWord('${cleanWord.replace(/'/g, "\\'")}')">🔊 Listen</button>
                    <button class="vp-close-btn" title="Close" onclick="ReadingGrounder.hideVocabPopover()">✕</button>
                </div>
            </div>
            <div class="vp-body">
                <div class="vp-def">${def}</div>
                ${colloc ? `<div class="vp-colloc"><strong>Target Linkage:</strong> <em>${colloc}</em></div>` : ''}
            </div>
        `;

        // Position popover relative to clicked element
        popover.style.display = 'block';
        const rect = el.getBoundingClientRect();
        const popRect = popover.getBoundingClientRect();

        let top = rect.bottom + 8;
        let left = rect.left + (rect.width / 2) - (popRect.width / 2);

        // Prevent overflowing viewport
        if (top + popRect.height > window.innerHeight - 20) {
            top = Math.max(10, rect.top - popRect.height - 8);
        }
        if (left < 10) left = 10;
        if (left + popRect.width > window.innerWidth - 10) {
            left = window.innerWidth - popRect.width - 10;
        }

        popover.style.top = `${top}px`;
        popover.style.left = `${left}px`;
    }

    static hideVocabPopover() {
        const popover = document.getElementById('vocabPopover');
        if (popover) {
            popover.style.display = 'none';
        }
        document.querySelectorAll('.vocab-word.active-vocab, .vocab-term.active-vocab').forEach(v => {
            v.classList.remove('active-vocab');
        });
    }

    static speakWord(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.9;

        const preferredVoice = this.getPreferredVoice();
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    static getPreferredVoice() {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;

        // 1. Prioritize Google UK English Female
        const googleUkFemale = voices.find(v => 
            v.name.includes('Google') && 
            (v.name.includes('UK English Female') || (v.lang.replace('_', '-').startsWith('en-GB') && v.name.toLowerCase().includes('female')))
        );
        if (googleUkFemale) return googleUkFemale;

        // 2. Any Google UK English voice
        const googleUk = voices.find(v => v.name.includes('Google') && (v.lang === 'en-GB' || v.lang === 'en_GB'));
        if (googleUk) return googleUk;

        // 3. Natural British Female voices (e.g. Microsoft Libby, Hazel, Sonia, Serena)
        const britishFemale = voices.find(v => 
            (v.lang === 'en-GB' || v.lang === 'en_GB') && 
            (v.name.toLowerCase().includes('female') || v.name.includes('Natural') || v.name.includes('Libby') || v.name.includes('Hazel') || v.name.includes('Sonia') || v.name.includes('Serena'))
        );
        if (britishFemale) return britishFemale;

        // 4. Any en-GB voice
        return voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB') || null;
    }

    static injectVocabStyles() {
        if (document.getElementById('readingGrounderStyles')) return;
        const style = document.createElement('style');
        style.id = 'readingGrounderStyles';
        style.textContent = `
            .vocab-word, .vocab-term {
                border-bottom: 2px dashed #059669;
                color: #065f46;
                font-weight: 600;
                cursor: pointer;
                border-radius: 3px;
                padding: 1px 3px;
                transition: all 0.2s ease;
                display: inline;
            }
            .vocab-word:hover, .vocab-term:hover {
                background: #d1fae5;
                color: #047857;
            }
            .vocab-word.active-vocab, .vocab-term.active-vocab {
                background: #a7f3d0 !important;
                color: #064e3b !important;
                box-shadow: 0 0 0 2px #10b981;
            }

            /* Floating Vocab Popover Card */
            .vocab-popover {
                position: fixed;
                z-index: 10000;
                display: none;
                width: 330px;
                max-width: 90vw;
                background: #ffffff;
                border: 2px solid #10b981;
                border-radius: 12px;
                padding: 14px 16px;
                box-shadow: 0 12px 28px -5px rgba(0, 0, 0, 0.22), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                font-family: var(--font-body, 'DM Sans', sans-serif);
                animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .vp-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 8px;
                margin-bottom: 8px;
                gap: 8px;
            }

            .vp-title-group {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .vp-word {
                font-size: 17.5px;
                font-weight: 800;
                color: #0f172a;
                font-family: var(--font-display, sans-serif);
            }

            .vp-pos {
                font-size: 11.5px;
                font-weight: 700;
                color: #059669;
                text-transform: uppercase;
                background: #ecfdf5;
                padding: 1px 6px;
                border-radius: 4px;
                width: max-content;
            }

            .vp-ipa {
                font-size: 12.5px;
                color: #64748b;
                font-family: 'JetBrains Mono', monospace;
            }

            .vp-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .vp-audio-btn {
                background: #ecfdf5;
                border: 1px solid #a7f3d0;
                color: #059669;
                font-size: 12px;
                font-weight: 700;
                padding: 4px 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .vp-audio-btn:hover {
                background: #10b981;
                color: #ffffff;
            }

            .vp-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                padding: 2px 6px;
                line-height: 1;
                border-radius: 4px;
            }

            .vp-close-btn:hover {
                color: #ef4444;
                background: #fee2e2;
            }

            .vp-body {
                font-size: 14px;
                line-height: 1.5;
                color: #334155;
            }

            .vp-def {
                margin-bottom: 6px;
                font-weight: 500;
            }

            .vp-colloc {
                font-size: 12.5px;
                color: #475569;
                background: #f8fafc;
                padding: 6px 8px;
                border-radius: 6px;
                border-left: 3px solid #059669;
            }

            @keyframes popoverFadeIn {
                from { opacity: 0; transform: translateY(-4px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renders concise data-syn attributes into styled synonym cards
     */
    static renderSynonymBadges() {
        document.querySelectorAll('[data-syn]').forEach(container => {
            const raw = container.dataset.syn;
            if (!raw) return;

            const pairs = raw.split('|').map(p => p.trim());
            const fragment = document.createDocumentFragment();

            pairs.forEach(pair => {
                const parts = pair.split(':');
                if (parts.length >= 2) {
                    const color = parts[0].trim().toLowerCase();
                    const text = parts.slice(1).join(':').trim();

                    const box = document.createElement('div');
                    box.className = 'syn-key-box';

                    const tag = document.createElement('span');
                    tag.className = `syn-tag ${color}`;
                    tag.textContent = color.charAt(0).toUpperCase() + color.slice(1) + ':';

                    const label = document.createElement('span');
                    label.innerHTML = text.replace(/'([^']+)'/g, '<em>"$1"</em>');

                    box.appendChild(tag);
                    box.appendChild(label);
                    fragment.appendChild(box);
                }
            });

            container.appendChild(fragment);
        });
    }

    /**
     * Highlights corresponding evidence when hovering over question cards
     */
    static bindEvidenceHover() {
        document.querySelectorAll('.q-card[data-q], [data-evidence-target]').forEach(card => {
            const qKey = card.dataset.q;
            if (!qKey) return;

            card.addEventListener('mouseenter', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.add('hover-focus'));
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.remove('hover-focus'));
            });
        });
    }
}

// Auto-run on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    ReadingGrounder.init();
});
