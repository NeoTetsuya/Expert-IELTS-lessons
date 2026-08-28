/**
 * ==========================================================================
 * EXPERT IELTS - THEME SWITCHER ENGINE
 * Supports Dark / Light Mode Toggle with Local Persistence
 * ==========================================================================
 */

class ThemeSwitcher {
    constructor() {
        this.STORAGE_KEY = 'deck_hub_theme';
        let saved = 'dark';
        try {
            saved = localStorage.getItem(this.STORAGE_KEY) || 'dark';
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        this.currentTheme = saved;
        this.init();
    }

    init() {
        // Apply theme immediately to documentElement to avoid flicker
        this.applyTheme(this.currentTheme);

        // When DOM is ready, hydrate toggle button
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.hydrateToggle());
        } else {
            this.hydrateToggle();
        }

        // Global shortcut 'D' to toggle theme
        document.addEventListener('keydown', (e) => {
            if (e.key.toLowerCase() === 'd' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) {
                this.toggleTheme();
            }
        });
    }

    applyTheme(theme) {
        this.currentTheme = theme;
        document.documentElement.setAttribute('data-theme', theme);
        try {
            localStorage.setItem(this.STORAGE_KEY, theme);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }

        const btn = document.getElementById('themeToggleBtn');
        if (btn) {
            btn.innerHTML = theme === 'dark' 
                ? '☀️ <span class="theme-label">Light Mode</span>' 
                : '🌙 <span class="theme-label">Dark Mode</span>';
            btn.setAttribute('title', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode (Shortcut: D)`);
            btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`);
        }
    }

    toggleTheme() {
        const nextTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme(nextTheme);
    }

    hydrateToggle() {
        let btn = document.getElementById('themeToggleBtn');
        if (!btn) {
            const container = document.querySelector('.header-actions');
            if (container) {
                btn = document.createElement('button');
                btn.id = 'themeToggleBtn';
                btn.className = 'btn-theme-toggle';
                container.appendChild(btn);
            }
        }

        if (btn) {
            btn.innerHTML = this.currentTheme === 'dark' 
                ? '☀️ <span class="theme-label">Light Mode</span>' 
                : '🌙 <span class="theme-label">Dark Mode</span>';
            btn.onclick = () => this.toggleTheme();
        }
    }
}

// Instantiate globally
window.themeSwitcher = new ThemeSwitcher();
