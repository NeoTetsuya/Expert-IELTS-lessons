/**
 * ==========================================================================
 * DECK THEME ENGINE (Frontend Slides Aesthetics System)
 * Provides 6 pre-filled distinctive theme presets, typography pairings,
 * live theme switcher modal, and keyboard shortcuts (Shift+T to cycle).
 * ==========================================================================
 */

class DeckThemeEngine {
    constructor() {
        this.STORAGE_KEY = 'deck_theme_preset';
        this.themes = [
            {
                id: 'academic',
                name: 'Academic Editorial',
                displayFont: 'Playfair Display',
                bodyFont: 'DM Sans',
                icon: '🎓',
                desc: 'Classic authoritative editorial serif with modern sans-serif body.',
                previewBg: 'linear-gradient(135deg, #1e3a8a, #0b1120)'
            },
            {
                id: 'bold-signal',
                name: 'Bold Signal',
                displayFont: 'Space Grotesk',
                bodyFont: 'Plus Jakarta Sans',
                icon: '⚡',
                desc: 'High-contrast, bold brutalist typography with punchy coral accents.',
                previewBg: 'linear-gradient(135deg, #881337, #111827)'
            },
            {
                id: 'electric',
                name: 'Electric Studio',
                displayFont: 'Manrope',
                bodyFont: 'Outfit',
                icon: '💎',
                desc: 'Ultra-clean modern geometric tech feel with cobalt blue and cyan.',
                previewBg: 'linear-gradient(135deg, #1e1b4b, #030712)'
            },
            {
                id: 'botanical',
                name: 'Dark Botanical',
                displayFont: 'Cormorant Garamond',
                bodyFont: 'Plus Jakarta Sans',
                icon: '🌿',
                desc: 'Refined literary luxury with elegant serif headers and emerald green.',
                previewBg: 'linear-gradient(135deg, #064e3b, #061a14)'
            },
            {
                id: 'voltage',
                name: 'Creative Voltage',
                displayFont: 'Syne',
                bodyFont: 'Space Grotesk',
                icon: '🚀',
                desc: 'Avant-garde dynamic creative energy with electric purple accents.',
                previewBg: 'linear-gradient(135deg, #3b0764, #090514)'
            },
            {
                id: 'vintage',
                name: 'Vintage Editorial',
                displayFont: 'Bodoni Moda',
                bodyFont: 'DM Sans',
                icon: '📜',
                desc: 'Sophisticated literary masterclass with Bodoni high-contrast serifs.',
                previewBg: 'linear-gradient(135deg, #44403c, #1c1917)'
            }
        ];

        // Determine default or saved theme
        let saved = null;
        try {
            saved = localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        const docDefault = document.documentElement.getAttribute('data-theme') || 
                           document.body.getAttribute('data-theme') || 'academic';
        this.currentTheme = saved || docDefault;

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme, false);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Shortcut: Shift + T to cycle themes
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && (e.key === 'T' || e.key === 't') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }

    applyTheme(themeId, showToast = true) {
        const theme = this.themes.find(t => t.id === themeId) || this.themes[0];
        this.currentTheme = theme.id;
        
        document.documentElement.setAttribute('data-theme', theme.id);
        document.body.setAttribute('data-theme', theme.id);
        try {
            localStorage.setItem(this.STORAGE_KEY, theme.id);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }

        if (showToast) {
            this.showToast(`${theme.icon} Theme: ${theme.name} (${theme.displayFont} + ${theme.bodyFont})`);
        }

        // Update active state in modal if open
        document.querySelectorAll('.theme-card-option').forEach(card => {
            if (card.dataset.themeId === theme.id) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    cycleTheme() {
        const currentIndex = this.themes.findIndex(t => t.id === this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.applyTheme(this.themes[nextIndex].id, true);
    }

    showToast(message) {
        let toast = document.getElementById('themeToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'themeToast';
            toast.className = 'theme-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            toast.classList.remove('visible');
        }, 2600);
    }

    injectUI() {
        if (document.getElementById('themePickerModal')) return;

        // Modal
        const modal = document.createElement('div');
        modal.id = 'themePickerModal';
        modal.className = 'theme-picker-modal';
        modal.style.display = 'none';

        const themeCards = this.themes.map(t => `
            <div class="theme-card-option ${t.id === this.currentTheme ? 'active' : ''}" 
                 data-theme-id="${t.id}" 
                 onclick="deckThemeEngine.applyTheme('${t.id}')">
                <div class="theme-preview-banner" style="background:${t.previewBg}">
                    <span class="theme-icon">${t.icon}</span>
                </div>
                <div class="theme-card-body">
                    <div class="theme-card-title">${t.name}</div>
                    <div class="theme-card-fonts">${t.displayFont} + ${t.bodyFont}</div>
                    <div class="theme-card-desc">${t.desc}</div>
                </div>
            </div>
        `).join('');

        modal.innerHTML = `
            <div class="theme-modal-backdrop" onclick="deckThemeEngine.closeModal()"></div>
            <div class="theme-modal-dialog">
                <div class="theme-modal-header">
                    <div>
                        <h2>🎨 Presentation Aesthetic Themes</h2>
                        <p>Select a typography and atmosphere pairing (Shortcut: <kbd>Shift + T</kbd> to cycle live).</p>
                    </div>
                    <button class="theme-modal-close" onclick="deckThemeEngine.closeModal()">×</button>
                </div>
                <div class="theme-grid">
                    ${themeCards}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    openModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'flex';
    }

    closeModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'none';
    }

    toggleModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal && modal.style.display === 'flex') {
            this.closeModal();
        } else {
            this.openModal();
        }
    }
}

// Global instantiation
window.deckThemeEngine = new DeckThemeEngine();
