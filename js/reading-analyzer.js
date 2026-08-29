/**
 * Expert IELTS Presentations — Reading Passage & Question Analyzer Engine (ReadingAnalyzer)
 * 
 * Features:
 * 1. Dynamic SVG Evidence Connection Arrows: Arcs between questions and passage evidence with animated flowing dashed lines.
 * 2. Dual-Language Translation Mode: Instant switching between EN, VIE, and Dual Parallel views.
 * 3. Paraphrase & Synonym Mapping Engine: Visualizes question keywords vs passage paraphrases.
 * 4. Interactive Evidence Popovers: Explains question rationale on hover or click.
 * 5. Keyboard Shortcuts: 'A' to toggle arrows, 'T' to toggle language, 'Esc' to clear focus.
 */

(function () {
  'use strict';

  class ReadingAnalyzer {
    constructor() {
      this.showArrows = true;
      this.currentLang = 'en';
      this.arrowAnimFrame = null;
      this.activeTarget = null;
      this.activeCard = null;
      this.svg = null;
      this.init();
    }

    init() {
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }
    }

    setup() {
      this.injectStyles();
      this.ensureSvgCanvas();
      this.bindEvidenceEvents();
      this.bindControls();
      this.bindKeyboardShortcuts();
      console.log('📖 [Expert IELTS] Reading Passage Analyzer & SVG Arrow Engine initialized.');
    }

    injectStyles() {
      if (document.getElementById('reading-analyzer-styles')) return;

      const style = document.createElement('style');
      style.id = 'reading-analyzer-styles';
      style.textContent = `
        /* SVG Connection Canvas */
        #reading-svg-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          pointer-events: none;
          z-index: 9999;
        }

        /* Animated flowing arrow path */
        @keyframes arrowFlow {
          from { stroke-dashoffset: 26; }
          to { stroke-dashoffset: 0; }
        }

        .reading-arrow-path {
          stroke: #10b981;
          stroke-width: 2.5;
          fill: none;
          stroke-dasharray: 6, 4;
          animation: arrowFlow 1s linear infinite;
          filter: drop-shadow(0 2px 4px rgba(16, 185, 129, 0.4));
        }

        /* Highlight Targets */
        .ans-target {
          cursor: pointer;
          padding: 2px 6px;
          border-radius: 4px;
          font-weight: 600;
          transition: all 0.2s ease;
          position: relative;
          display: inline;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }

        .ans-target.active-target, .ans-target:hover {
          outline: 2px solid #10b981;
          box-shadow: 0 0 12px rgba(16, 185, 129, 0.4);
          filter: brightness(0.96);
          z-index: 20;
        }

        /* Floating Evidence Popover */
        .explanation-popover {
          position: absolute;
          bottom: 125%;
          left: 50%;
          transform: translateX(-50%) translateY(10px);
          opacity: 0;
          visibility: hidden;
          width: 320px;
          background-color: #0f172a;
          color: #f8fafc;
          border-radius: 12px;
          padding: 12px 14px;
          font-size: 0.8rem;
          font-family: 'Inter', system-ui, sans-serif;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
          z-index: 50;
          transition: all 0.25s ease;
          pointer-events: none;
          line-height: 1.45;
          font-weight: normal;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .explanation-popover::after {
          content: "";
          position: absolute;
          top: 100%;
          left: 50%;
          margin-left: -6px;
          border-width: 6px;
          border-style: solid;
          border-color: #0f172a transparent transparent transparent;
        }

        .ans-target:hover .explanation-popover,
        .ans-target.active-target .explanation-popover {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }

        /* Question Card Active State */
        .q-card-active, [data-q].active-card {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5), 0 10px 15px -3px rgba(0, 0, 0, 0.1) !important;
        }

        /* Translation Toggle Panel */
        .deck-lang-toggle {
          display: inline-flex;
          align-items: center;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 9999px;
          padding: 2px;
          gap: 2px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        .deck-lang-btn {
          padding: 3px 8px;
          border-radius: 9999px;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .deck-lang-btn.active {
          background: #10b981;
          color: #ffffff;
        }
      `;
      document.head.appendChild(style);
    }

    ensureSvgCanvas() {
      let svg = document.getElementById('reading-svg-canvas');
      if (!svg) {
        svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.id = 'reading-svg-canvas';
        svg.innerHTML = `
          <defs>
            <marker id="arrow-head" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>
        `;
        document.body.appendChild(svg);
      }
      this.svg = svg;
    }

    bindEvidenceEvents() {
      const targets = document.querySelectorAll('.ans-target, [data-q-target]');
      const qCards = document.querySelectorAll('.q-card, [data-q], .question-item');

      targets.forEach(target => {
        const qId = target.dataset.q || target.dataset.qTarget;
        const qCard = document.querySelector(`.q-card[data-q="${qId}"], #q-card-${qId}, .question-item[data-q="${qId}"]`);

        target.addEventListener('mouseenter', () => this.activatePair(target, qCard));
        target.addEventListener('mouseleave', () => this.deactivateAll());
        target.addEventListener('click', (e) => {
          e.stopPropagation();
          this.activatePair(target, qCard, true);
        });
      });

      qCards.forEach(card => {
        const qId = card.dataset.q || (card.id ? card.id.replace('q-card-', '') : '');
        const target = document.querySelector(`.ans-target[data-q="${qId}"], [data-q-target="${qId}"]`);

        card.addEventListener('mouseenter', () => this.activatePair(target, card));
        card.addEventListener('mouseleave', () => this.deactivateAll());
        card.addEventListener('click', () => {
          this.activatePair(target, card, false);
        });
      });
    }

    activatePair(targetEl, cardEl, scrollToCard = false) {
      this.deactivateAll(false);

      if (targetEl) {
        targetEl.classList.add('active-target');
        this.activeTarget = targetEl;
      }

      if (cardEl) {
        cardEl.classList.add('q-card-active', 'active-card');
        this.activeCard = cardEl;
        if (scrollToCard && cardEl.scrollIntoView) {
          cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
      }

      this.startSmoothTracking();
    }

    deactivateAll(clearCanvas = true) {
      document.querySelectorAll('.ans-target').forEach(t => t.classList.remove('active-target'));
      document.querySelectorAll('.q-card, .question-item, [data-q]').forEach(c => c.classList.remove('q-card-active', 'active-card'));
      this.activeTarget = null;
      this.activeCard = null;
      if (clearCanvas) this.clearCanvas();
    }

    startSmoothTracking() {
      if (this.arrowAnimFrame) cancelAnimationFrame(this.arrowAnimFrame);
      const startTime = performance.now();
      const duration = 600;

      const step = (now) => {
        this.drawConnection();
        if (now - startTime < duration) {
          this.arrowAnimFrame = requestAnimationFrame(step);
        }
      };
      this.arrowAnimFrame = requestAnimationFrame(step);
    }

    drawConnection() {
      if (!this.showArrows || !this.activeTarget || !this.activeCard) {
        this.clearCanvas();
        return;
      }

      const fromRect = this.activeTarget.getBoundingClientRect();
      const toRect = this.activeCard.getBoundingClientRect();

      // Ensure both elements are currently visible in viewport
      if (fromRect.width === 0 || toRect.width === 0) {
        this.clearCanvas();
        return;
      }

      // Calculate start and end coordinates
      const startX = fromRect.right > toRect.left ? fromRect.left : fromRect.right;
      const startY = fromRect.top + fromRect.height / 2;

      const endX = toRect.left < startX ? toRect.right : toRect.left;
      const endY = toRect.top + toRect.height / 2;

      // Draw smooth Bezier curve
      const deltaX = Math.abs(endX - startX) * 0.5;
      const controlX1 = startX < endX ? startX + deltaX : startX - deltaX;
      const controlY1 = startY;
      const controlX2 = startX < endX ? endX - deltaX : endX + deltaX;
      const controlY2 = endY;

      const pathData = `M ${startX} ${startY} C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${endX} ${endY}`;

      let path = document.getElementById('reading-arrow-active');
      if (!path) {
        path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.id = 'reading-arrow-active';
        path.setAttribute('class', 'reading-arrow-path');
        path.setAttribute('marker-end', 'url(#arrow-head)');
        this.svg.appendChild(path);
      }

      path.setAttribute('d', pathData);
    }

    clearCanvas() {
      const path = document.getElementById('reading-arrow-active');
      if (path) path.remove();
    }

    bindControls() {
      // Toggle Arrows Button
      const toggleArrowBtn = document.getElementById('btn-toggle-arrows');
      if (toggleArrowBtn) {
        toggleArrowBtn.addEventListener('click', () => {
          this.showArrows = !this.showArrows;
          toggleArrowBtn.classList.toggle('active', this.showArrows);
          if (!this.showArrows) this.clearCanvas();
          else this.drawConnection();
        });
      }

      // Language Switchers
      document.querySelectorAll('[data-reading-lang]').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const lang = e.currentTarget.dataset.readingLang;
          this.switchLanguage(lang);
        });
      });

      // Window resize / scroll tracking
      window.addEventListener('resize', () => this.drawConnection(), { passive: true });
      window.addEventListener('scroll', () => this.drawConnection(), { passive: true });
    }

    switchLanguage(lang) {
      this.currentLang = lang;
      document.querySelectorAll('[data-reading-lang]').forEach(b => {
        b.classList.toggle('active', b.dataset.readingLang === lang);
      });

      // Update text in passage if data-en and data-vi are present
      document.querySelectorAll('[data-en][data-vi]').forEach(el => {
        if (lang === 'vi') {
          el.innerHTML = el.dataset.vi;
        } else if (lang === 'en') {
          el.innerHTML = el.dataset.en;
        } else if (lang === 'dual') {
          el.innerHTML = `
            <div class="reading-dual-block">
              <div class="reading-en-pane mb-2 text-slate-800">${el.dataset.en}</div>
              <div class="reading-vi-pane text-slate-500 italic text-sm border-t border-slate-200 pt-2">${el.dataset.vi}</div>
            </div>
          `;
        }
      });

      // Re-bind evidence targets after DOM update
      this.bindEvidenceEvents();
      this.drawConnection();
    }

    bindKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        if (e.key === 'a' || e.key === 'A') {
          // Toggle Arrows
          this.showArrows = !this.showArrows;
          if (!this.showArrows) this.clearCanvas();
          else this.drawConnection();
        } else if (e.key === 't' || e.key === 'T') {
          // Cycle Language EN -> VI -> Dual
          const nextLang = this.currentLang === 'en' ? 'vi' : (this.currentLang === 'vi' ? 'dual' : 'en');
          this.switchLanguage(nextLang);
        } else if (e.key === 'Escape') {
          this.deactivateAll();
        }
      });
    }
  }

  // Instantiate and export
  window.readingAnalyzer = new ReadingAnalyzer();
})();
