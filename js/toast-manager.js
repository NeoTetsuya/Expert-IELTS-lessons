/**
 * Expert IELTS Presentations — Modern Toast Manager (Sonner-inspired)
 * 
 * High-performance, stacked, accessible toast notification system.
 * Zero external dependencies, theme-aware, with swipe/click dismissal and action buttons.
 */

(function () {
    'use strict';

    class ToastManager {
        constructor() {
            this.toasts = [];
            this.container = null;
            this.maxVisible = 3;
            this.initContainer();
        }

        initContainer() {
            if (document.getElementById('sonner-toast-container')) {
                this.container = document.getElementById('sonner-toast-container');
                return;
            }

            const container = document.createElement('div');
            container.id = 'sonner-toast-container';
            container.className = 'sonner-toast-container';
            container.setAttribute('aria-live', 'polite');
            container.setAttribute('aria-atomic', 'true');
            document.body.appendChild(container);
            this.container = container;
        }

        createToastElement(id, message, type = 'info', options = {}) {
            const toast = document.createElement('div');
            toast.className = `sonner-toast sonner-toast-${type}`;
            toast.id = `toast-${id}`;
            toast.setAttribute('role', 'status');

            const icons = {
                success: `<svg class="sonner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>`,
                error: `<svg class="sonner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>`,
                warning: `<svg class="sonner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>`,
                info: `<svg class="sonner-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>`,
                loading: `<svg class="sonner-icon sonner-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>`
            };

            let actionsHtml = '';
            if (options.action) {
                actionsHtml = `<button class="sonner-action-btn" id="toast-action-${id}">${options.action.label}</button>`;
            }

            toast.innerHTML = `
                <div class="sonner-toast-body">
                    <span class="sonner-icon-wrap sonner-icon-${type}">${icons[type] || icons.info}</span>
                    <div class="sonner-toast-content">
                        <div class="sonner-toast-title">${options.title ? `<strong>${options.title}</strong>` : ''}</div>
                        <div class="sonner-toast-message">${message}</div>
                    </div>
                    ${actionsHtml}
                    <button class="sonner-close-btn" aria-label="Close">&times;</button>
                </div>
            `;

            const closeBtn = toast.querySelector('.sonner-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', () => this.dismiss(id));
            }

            if (options.action && options.action.onClick) {
                const actionBtn = toast.querySelector(`#toast-action-${id}`);
                if (actionBtn) {
                    actionBtn.addEventListener('click', () => {
                        options.action.onClick();
                        this.dismiss(id);
                    });
                }
            }

            return toast;
        }

        show(message, type = 'info', options = {}) {
            this.initContainer();
            const id = 't_' + Math.random().toString(36).substr(2, 9);
            const duration = options.duration !== undefined ? options.duration : 4000;

            const toastEl = this.createToastElement(id, message, type, options);
            this.container.appendChild(toastEl);

            const toastObj = { id, el: toastEl, timeout: null };

            if (duration > 0) {
                toastObj.timeout = setTimeout(() => {
                    this.dismiss(id);
                }, duration);
            }

            this.toasts.push(toastObj);
            this.updateStackPositions();

            // Slide in animation
            requestAnimationFrame(() => {
                toastEl.classList.add('sonner-visible');
            });

            return id;
        }

        success(message, options = {}) {
            return this.show(message, 'success', options);
        }

        error(message, options = {}) {
            return this.show(message, 'error', options);
        }

        warning(message, options = {}) {
            return this.show(message, 'warning', options);
        }

        info(message, options = {}) {
            return this.show(message, 'info', options);
        }

        loading(message, options = {}) {
            return this.show(message, 'loading', { ...options, duration: 0 });
        }

        dismiss(id) {
            const index = this.toasts.findIndex(t => t.id === id);
            if (index === -1) return;

            const toastObj = this.toasts[index];
            if (toastObj.timeout) clearTimeout(toastObj.timeout);

            toastObj.el.classList.remove('sonner-visible');
            toastObj.el.classList.add('sonner-exiting');

            setTimeout(() => {
                if (toastObj.el.parentNode) {
                    toastObj.el.parentNode.removeChild(toastObj.el);
                }
                this.toasts = this.toasts.filter(t => t.id !== id);
                this.updateStackPositions();
            }, 300);
        }

        updateStackPositions() {
            const total = this.toasts.length;
            this.toasts.forEach((toast, idx) => {
                const depth = total - 1 - idx;
                if (depth >= this.maxVisible) {
                    toast.el.style.opacity = '0';
                    toast.el.style.pointerEvents = 'none';
                } else {
                    toast.el.style.opacity = '1';
                    toast.el.style.pointerEvents = 'auto';
                    const offsetY = depth * 14;
                    const scale = 1 - depth * 0.05;
                    toast.el.style.transform = `translateY(-${offsetY}px) scale(${scale})`;
                    toast.el.style.zIndex = `${1000 - depth}`;
                }
            });
        }
    }

    // Expose global singleton
    window.sonnerToast = new ToastManager();
    window.toast = window.sonnerToast;

})();
