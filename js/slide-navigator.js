/**
 * Universal Slide Grid Navigator & Quick-Jump Engine (SlideNavigator)
 * 
 * Provides an interactive slide thumbnail/grid view for teachers and students:
 * 1. Press 'G' (Grid) or click the Navigator icon in the toolbar to see all slides.
 * 2. Instant search filter to jump directly to any skill, topic, or slide title.
 * 3. Quick-key jumps (e.g. typing slide number).
 */

class SlideNavigator {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        this.createNavigatorModal();
        this.bindKeyboardShortcuts();
    }

    createNavigatorModal() {
        const modal = document.createElement('div');
        modal.id = 'slideNavigatorModal';
        modal.className = 'slide-nav-modal';
        modal.style.display = 'none';
        modal.innerHTML = `
            <div class="slide-nav-backdrop" onclick="slideNavigator.toggle()"></div>
            <div class="slide-nav-container">
                <div class="slide-nav-header">
                    <div style="display:flex; align-items:center; gap:10px;">
                        <span style="font-size:20px; font-weight:800;">📑 Slide Navigator</span>
                        <span id="navSlideTotal" style="font-size:13px; opacity:0.6; font-family:var(--font-mono, monospace);"></span>
                    </div>
                    <input type="text" id="slideSearchInput" class="slide-search-box" placeholder="🔍 Filter by title, skill (read, grammar, vocab, write)..." oninput="slideNavigator.filterSlides(this.value)" />
                    <button class="slide-nav-close" onclick="slideNavigator.toggle()">×</button>
                </div>
                <div class="slide-nav-grid" id="slideNavGrid"></div>
            </div>
        `;
        document.body.appendChild(modal);

        // Inject Styles
        const style = document.createElement('style');
        style.id = 'slideNavigatorStyles';
        style.textContent = `
            .slide-nav-modal {
                position: fixed;
                inset: 0;
                z-index: 999999;
                display: flex;
                align-items: center;
                justify-content: center;
                user-select: none;
                animation: navFadeIn 0.2s ease;
            }
            .slide-nav-backdrop {
                position: absolute;
                inset: 0;
                background: rgba(10, 15, 29, 0.85);
                backdrop-filter: blur(8px);
            }
            .slide-nav-container {
                position: relative;
                width: 90vw;
                max-width: 1300px;
                height: 85vh;
                background: #0f172a;
                border: 1px solid rgba(255, 255, 255, 0.16);
                border-radius: 16px;
                display: flex;
                flex-direction: column;
                box-shadow: 0 25px 60px rgba(0, 0, 0, 0.6);
                overflow: hidden;
                color: #ffffff;
            }
            .slide-nav-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 16px 24px;
                background: rgba(255, 255, 255, 0.04);
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
                gap: 16px;
            }
            .slide-search-box {
                flex: 1;
                max-width: 480px;
                background: rgba(255, 255, 255, 0.08);
                border: 1.5px solid rgba(255, 255, 255, 0.16);
                padding: 8px 16px;
                border-radius: 8px;
                color: #ffffff;
                font-size: 14px;
                outline: none;
            }
            .slide-search-box:focus {
                border-color: #38bdf8;
                background: rgba(255, 255, 255, 0.14);
            }
            .slide-nav-close {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 26px;
                cursor: pointer;
                line-height: 1;
            }
            .slide-nav-close:hover { color: #fff; }
            .slide-nav-grid {
                flex: 1;
                overflow-y: auto;
                padding: 24px;
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                gap: 18px;
            }
            .slide-nav-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1.5px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 16px;
                cursor: pointer;
                transition: all 0.2s ease;
                display: flex;
                flex-direction: column;
                gap: 8px;
            }
            .slide-nav-card:hover {
                background: rgba(255, 255, 255, 0.12);
                border-color: #38bdf8;
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
            }
            .slide-nav-card.active-card {
                border-color: #10b981;
                background: rgba(16, 185, 129, 0.15);
            }
            .slide-nav-card-top {
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .slide-nav-num {
                font-family: var(--font-mono, monospace);
                font-size: 12px;
                font-weight: 700;
                color: #94a3b8;
            }
            .slide-nav-badge {
                font-size: 11px;
                font-weight: 700;
                padding: 2px 8px;
                border-radius: 4px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }
            .slide-nav-title {
                font-size: 15px;
                font-weight: 700;
                color: #f8fafc;
                line-height: 1.35;
            }
            @keyframes navFadeIn {
                from { opacity: 0; transform: scale(0.97); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    renderGrid() {
        const grid = document.getElementById('slideNavGrid');
        const totalSpan = document.getElementById('navSlideTotal');
        if (!grid || !window.deckEngine) return;

        const slides = window.deckEngine.slides;
        if (totalSpan) totalSpan.textContent = `(${slides.length} Slides)`;

        grid.innerHTML = '';
        slides.forEach((slide, idx) => {
            const titleEl = slide.querySelector('.slide-title, .section-title, .title-main, h1, h2');
            const titleText = titleEl ? titleEl.textContent.trim().replace(/\s+/g, ' ') : `Slide ${idx + 1}`;
            const skill = slide.dataset.skill || 'general';

            const card = document.createElement('div');
            card.className = `slide-nav-card ${idx === window.deckEngine.currentSlide ? 'active-card' : ''}`;
            card.dataset.index = idx;
            card.dataset.search = `${titleText} ${skill} slide ${idx + 1}`.toLowerCase();
            card.onclick = () => {
                window.deckEngine.showSlide(idx);
                this.toggle(false);
            };

            const skillColors = {
                read: '#2563eb',
                grammar: '#ea580c',
                vocab: '#059669',
                write: '#7c3aed',
                review: '#0891b2',
                section: '#64748b',
                title: '#3b82f6'
            };
            const badgeBg = skillColors[skill] || '#475569';

            card.innerHTML = `
                <div class="slide-nav-card-top">
                    <span class="slide-nav-num">Slide ${idx + 1}</span>
                    <span class="slide-nav-badge" style="background:${badgeBg}; color:#fff;">${skill}</span>
                </div>
                <div class="slide-nav-title">${titleText}</div>
            `;
            grid.appendChild(card);
        });
    }

    filterSlides(query) {
        const q = query.trim().toLowerCase();
        document.querySelectorAll('.slide-nav-card').forEach(card => {
            const match = !q || card.dataset.search.includes(q);
            card.style.display = match ? 'flex' : 'none';
        });
    }

    toggle(forceState) {
        this.isOpen = typeof forceState === 'boolean' ? forceState : !this.isOpen;
        const modal = document.getElementById('slideNavigatorModal');
        if (modal) {
            modal.style.display = this.isOpen ? 'flex' : 'none';
            if (this.isOpen) {
                this.renderGrid();
                const searchInput = document.getElementById('slideSearchInput');
                if (searchInput) {
                    searchInput.value = '';
                    searchInput.focus();
                }
            }
        }
    }

    bindKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            if (e.target.tagName === 'INPUT' && e.target.id !== 'slideSearchInput') return;
            if (e.target.tagName === 'SELECT' || e.target.tagName === 'TEXTAREA') return;

            const key = e.key.toLowerCase();
            if (key === 'g') {
                e.preventDefault();
                this.toggle();
            } else if (key === 'escape' && this.isOpen) {
                this.toggle(false);
            }
        });
    }
}

// Global auto-instantiation
let slideNavigator;
window.addEventListener('DOMContentLoaded', () => {
    slideNavigator = new SlideNavigator();
});
