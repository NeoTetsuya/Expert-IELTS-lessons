/**
 * =========================================================================
 * TEMPLATE ENGINE (Declarative Slide Expander)
 * Expert IELTS Course Presentations Architecture
 * =========================================================================
 */

(function () {
    'use strict';

    class TemplateEngine {
        static async init() {
            // 1. Ensure templates are in DOM
            await this.loadTemplates();

            // 2. Expand all slide-card elements in document
            this.expandSlides();
        }

        static async loadTemplates() {
            // If templates already exist in document (e.g. inline), do nothing
            if (document.getElementById('tmpl-walkthrough')) return;

            // Otherwise fetch from relative templates directory
            try {
                // Check possible relative paths for subfolders vs root
                const templatePaths = [
                    '../templates/slide-templates.html',
                    'templates/slide-templates.html',
                    '../../templates/slide-templates.html'
                ];

                for (const tPath of templatePaths) {
                    try {
                        const res = await fetch(tPath);
                        if (res.ok) {
                            const htmlText = await res.text();
                            const container = document.createElement('div');
                            container.id = 'slide-templates-catalog';
                            container.style.display = 'none';
                            container.innerHTML = htmlText;
                            document.body.prepend(container);
                            return;
                        }
                    } catch (e) {
                        // try next path
                    }
                }
            } catch (err) {
                console.warn('TemplateEngine: Could not fetch external template catalog, relying on embedded definitions.', err);
            }
        }

        static expandSlides() {
            const slideElements = document.querySelectorAll('slide-card, [data-template]');
            const totalSlides = slideElements.length;
            if (totalSlides === 0) return;

            slideElements.forEach((el, index) => {
                const templateName = el.getAttribute('template') || el.getAttribute('data-template');
                const templateId = templateName.startsWith('tmpl-') ? templateName : `tmpl-${templateName}`;
                const templateEl = document.getElementById(templateId);

                if (!templateEl) {
                    console.error(`TemplateEngine: Template #${templateId} not found for slide ${index + 1}!`);
                    return;
                }

                // Clone template content
                const clone = templateEl.content.cloneNode(true);
                const section = clone.querySelector('section.slide');

                // Assign slide ID and index
                const slideNumStr = String(index + 1).padStart(2, '0');
                const totalNumStr = String(totalSlides).padStart(2, '0');
                const slideId = el.getAttribute('id') || `slide-${index + 1}`;
                section.id = slideId;

                // Transfer skill attribute (read, grammar, vocab, write, review)
                const skill = el.getAttribute('skill') || el.getAttribute('data-skill') || section.getAttribute('data-skill') || 'read';
                section.setAttribute('data-skill', skill);

                // Update dynamic slide number in header
                const numEl = section.querySelector('[data-slot="slide-number"], .slide-number');
                if (numEl) {
                    numEl.textContent = `${slideNumStr} / ${totalNumStr}`;
                }

                // Fill direct text attributes
                ['title', 'subtitle', 'badge', 'instruction'].forEach(attr => {
                    const val = el.getAttribute(attr);
                    if (val) {
                        const target = section.querySelector(`[data-slot="${attr}"]`);
                        if (target) target.innerHTML = val;
                    }
                });

                // Transfer all named slots from child elements
                const slotChildren = el.querySelectorAll('[slot]');
                slotChildren.forEach(child => {
                    const slotName = child.getAttribute('slot');
                    const target = section.querySelector(`[data-slot="${slotName}"]`);
                    if (target) {
                        // Transfer attributes from slot child if present (e.g. data-q, data-ev, tag, num, ans, options)
                        if (child.hasAttribute('tag')) {
                            const hdr = section.querySelector('[data-slot="passage-header"]');
                            if (hdr) hdr.innerHTML = `📖 Passage Excerpt: Paragraph [${child.getAttribute('tag')}]`;
                        }
                        if (child.hasAttribute('data-q')) {
                            const qCard = section.querySelector('.q-card, [data-slot="question-card"]');
                            if (qCard) qCard.setAttribute('data-q', child.getAttribute('data-q'));
                            const evBtn = section.querySelector('.syn-btn, [data-slot="evidence-btn"]');
                            if (evBtn) evBtn.setAttribute('data-q', child.getAttribute('data-q'));
                        }
                        if (child.hasAttribute('data-ev')) {
                            const evBtn = section.querySelector('.syn-btn, [data-slot="evidence-btn"]');
                            if (evBtn) evBtn.setAttribute('data-ev', child.getAttribute('data-ev'));
                            const markEl = section.querySelector('mark.evidence');
                            if (markEl) markEl.id = child.getAttribute('data-ev');
                        }

                        // Copy inner HTML
                        target.innerHTML = child.innerHTML;
                    }
                });

                // If element has raw HTML children without explicit slot and target has default slot
                if (slotChildren.length === 0 && el.innerHTML.trim() !== '') {
                    const defaultSlot = section.querySelector('[data-slot="content"], [data-slot="grid"]');
                    if (defaultSlot) defaultSlot.innerHTML = el.innerHTML;
                }

                // Replace <slide-card> with fully expanded <section class="slide">
                el.parentNode.replaceChild(section, el);
            });
        }
    }

    // Auto-initialize when DOM is ready, before deck-engine starts
    window.TemplateEngine = TemplateEngine;
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => TemplateEngine.init());
    } else {
        TemplateEngine.init();
    }
})();
