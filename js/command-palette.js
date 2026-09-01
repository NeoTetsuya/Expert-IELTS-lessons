/**
 * Expert IELTS Presentations — Modern Command Palette (cmdk-inspired)
 * 
 * Accessible, fast ⌘K command menu for instant slide navigation,
 * classroom tool launching, and theme switching.
 */

(function () {
    'use strict';

    class CommandPalette {
        constructor() {
            this.isOpen = false;
            this.modal = null;
            this.input = null;
            this.list = null;
            this.items = [];
            this.filteredItems = [];
            this.selectedIndex = 0;

            this.init();
        }

        init() {
            document.addEventListener('DOMContentLoaded', () => {
                this.createModal();
                this.bindGlobalShortcuts();
            });
        }

        bindGlobalShortcuts() {
            document.addEventListener('keydown', (e) => {
                const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k';
                const isSlash = e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA';

                if (isCmdK || isSlash) {
                    e.preventDefault();
                    this.toggle();
                } else if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
            });
        }

        createModal() {
            if (document.getElementById('cmdk-modal-backdrop')) {
                this.modal = document.getElementById('cmdk-modal-backdrop');
                return;
            }

            const backdrop = document.createElement('div');
            backdrop.id = 'cmdk-modal-backdrop';
            backdrop.className = 'cmdk-backdrop cmdk-hidden';
            backdrop.setAttribute('role', 'dialog');
            backdrop.setAttribute('aria-modal', 'true');
            backdrop.setAttribute('aria-label', 'Presentation Command Menu');

            backdrop.innerHTML = `
                <div class="cmdk-dialog" id="cmdk-dialog">
                    <div class="cmdk-input-wrap">
                        <svg class="cmdk-search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                        <input type="text" id="cmdk-input" class="cmdk-input" placeholder="Type a slide title, tool name, or command (↑↓ to navigate)..." autocomplete="off" spellcheck="false" />
                        <kbd class="cmdk-esc-badge">ESC</kbd>
                    </div>
                    <div class="cmdk-list" id="cmdk-list" role="listbox"></div>
                    <div class="cmdk-footer">
                        <span><kbd>↑</kbd> <kbd>↓</kbd> Navigate</span>
                        <span><kbd>↵</kbd> Select</span>
                        <span><kbd>ESC</kbd> Close</span>
                    </div>
                </div>
            `;

            document.body.appendChild(backdrop);
            this.modal = backdrop;
            this.input = document.getElementById('cmdk-input');
            this.list = document.getElementById('cmdk-list');

            // Backdrop click
            backdrop.addEventListener('click', (e) => {
                if (e.target === backdrop) this.close();
            });

            // Input filtering & navigation
            this.input.addEventListener('input', () => {
                this.filter(this.input.value);
            });

            this.input.addEventListener('keydown', (e) => {
                if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    this.navigate(1);
                } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    this.navigate(-1);
                } else if (e.key === 'Enter') {
                    e.preventDefault();
                    this.executeSelected();
                }
            });
        }

        collectItems() {
            const items = [];

            // 1. Educator Presenter Tools
            items.push(
                { group: 'Presenter Tools', icon: '⏱️', title: 'Classroom Timer', shortcut: 'T', action: () => window.classroomTimer && window.classroomTimer.toggleModal() },
                { group: 'Presenter Tools', icon: '✨', title: 'Vocabulary & Key Highlights', shortcut: 'V', action: () => window.toggleVocabHighlight && window.toggleVocabHighlight() },
                { group: 'Presenter Tools', icon: '🔦', title: 'Presentation Spotlight', shortcut: 'S', action: () => window.presentationSpotlight && window.presentationSpotlight.toggle() },
                { group: 'Presenter Tools', icon: '🔴', title: 'Laser Pointer', shortcut: 'L', action: () => window.laserPointer && window.laserPointer.toggle() },
                { group: 'Presenter Tools', icon: '✏️', title: 'Pen Drawing Annotation', shortcut: 'P', action: () => window.presenterDrawing && window.presenterDrawing.toggle() },
                { group: 'Presenter Tools', icon: '👥', title: 'Random Student Picker', shortcut: 'R', action: () => window.studentPicker && window.studentPicker.toggle() },
                { group: 'Presenter Tools', icon: '🎨', title: 'Switch Presentation Theme', shortcut: 'Alt+T', action: () => window.themeModal && window.themeModal.open() },
                { group: 'Presenter Tools', icon: '✍️', title: 'Writing Model Annotator', shortcut: 'W', action: () => window.writingAnnotator && window.writingAnnotator.toggle() }
            );

            // 2. Slide Navigation Cards
            const slides = window.deckEngine ? Array.from(window.deckEngine.slides) : Array.from(document.querySelectorAll('.slide'));
            slides.forEach((slide, idx) => {
                const title = slide.getAttribute('title') || slide.querySelector('h1, h2, h3')?.textContent || `Slide ${idx + 1}`;
                const subtitle = slide.getAttribute('subtitle') || slide.getAttribute('badge') || '';
                const skill = slide.getAttribute('skill') || '';

                const skillIcons = {
                    title: '📌',
                    read: '📖',
                    write: '✍️',
                    grammar: '📐',
                    vocab: '🔤',
                    review: '🎯'
                };

                items.push({
                    group: 'Slide Navigation',
                    icon: skillIcons[skill] || '📑',
                    title: `Slide ${idx + 1}: ${title}`,
                    subtitle: subtitle,
                    action: () => {
                        if (window.deckEngine) {
                            window.deckEngine.jumpToSlide(idx);
                        }
                    }
                });
            });

            this.items = items;
        }

        open() {
            this.collectItems();
            this.isOpen = true;
            this.modal.classList.remove('cmdk-hidden');
            this.input.value = '';
            this.filter('');
            setTimeout(() => this.input.focus(), 50);
        }

        close() {
            this.isOpen = false;
            this.modal.classList.add('cmdk-hidden');
        }

        toggle() {
            if (this.isOpen) this.close();
            else this.open();
        }

        filter(query) {
            const q = query.trim().toLowerCase();
            if (!q) {
                this.filteredItems = [...this.items];
            } else {
                this.filteredItems = this.items.filter(item => 
                    item.title.toLowerCase().includes(q) || 
                    (item.subtitle && item.subtitle.toLowerCase().includes(q)) ||
                    item.group.toLowerCase().includes(q)
                );
            }
            this.selectedIndex = 0;
            this.renderList();
        }

        renderList() {
            if (this.filteredItems.length === 0) {
                this.list.innerHTML = `<div class="cmdk-empty">No matching slides or tools found</div>`;
                return;
            }

            let currentGroup = '';
            let html = '';

            this.filteredItems.forEach((item, idx) => {
                if (item.group !== currentGroup) {
                    currentGroup = item.group;
                    html += `<div class="cmdk-group-heading">${currentGroup}</div>`;
                }

                const isSelected = idx === this.selectedIndex;
                html += `
                    <div class="cmdk-item ${isSelected ? 'cmdk-selected' : ''}" data-idx="${idx}" role="option" aria-selected="${isSelected}">
                        <span class="cmdk-item-icon">${item.icon}</span>
                        <div class="cmdk-item-content">
                            <div class="cmdk-item-title">${item.title}</div>
                            ${item.subtitle ? `<div class="cmdk-item-subtitle">${item.subtitle}</div>` : ''}
                        </div>
                        ${item.shortcut ? `<kbd class="cmdk-item-kbd">${item.shortcut}</kbd>` : ''}
                    </div>
                `;
            });

            this.list.innerHTML = html;

            // Click handlers
            this.list.querySelectorAll('.cmdk-item').forEach(el => {
                el.addEventListener('click', () => {
                    const idx = parseInt(el.getAttribute('data-idx'), 10);
                    this.selectedIndex = idx;
                    this.executeSelected();
                });
            });

            // Scroll selected into view
            const selectedEl = this.list.querySelector('.cmdk-selected');
            if (selectedEl) {
                selectedEl.scrollIntoView({ block: 'nearest' });
            }
        }

        navigate(delta) {
            if (this.filteredItems.length === 0) return;
            this.selectedIndex = (this.selectedIndex + delta + this.filteredItems.length) % this.filteredItems.length;
            this.renderList();
        }

        executeSelected() {
            if (this.filteredItems.length === 0) return;
            const item = this.filteredItems[this.selectedIndex];
            if (item && item.action) {
                this.close();
                item.action();
                if (window.toast) {
                    window.toast.info(`Switched to ${item.title}`);
                }
            }
        }
    }

    window.commandPalette = new CommandPalette();

})();
