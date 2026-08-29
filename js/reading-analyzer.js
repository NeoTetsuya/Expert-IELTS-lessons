/**
 * Expert IELTS Presentations — Reading Passage & Question Analyzer Engine (ReadingAnalyzer)
 * 
 * Features:
 * 1. Dynamic SVG Evidence Connection Arrows: Automatically connects Question cards (.q-card, .syn-btn)
 *    to Reading Passage Evidence highlights (mark.evidence, .syn-pair-1, [data-q]).
 * 2. Active Slide Awareness: Dynamically re-binds and calculates coordinates on slide navigation.
 * 3. Dual-Language Translation Mode: Instant switching between EN, VIE, and Dual Parallel views.
 * 4. Conflict-Free Hotkeys:
 *    - 'Shift + E': Toggle Evidence Connection Arrows on/off
 *    - 'Shift + V': Cycle Translation Modes (English -> Vietnamese -> Dual)
 *    - 'Escape': Clear active arrow and highlights
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
      this.bindEvidenceConnections();
      this.bindSlideChangeWatcher();
      this.bindControls();
      this.bindKeyboardShortcuts();
      console.log('📖 [Expert IELTS] Slide-Aware Reading Analyzer & Evidence Arrow Engine initialized.');
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
          z-index: 99999;
        }

        /* Animated flowing arrow path */
        @keyframes arrowFlow {
          from { stroke-dashoffset: 26; }
          to { stroke-dashoffset: 0; }
        }

        .reading-arrow-path {
          stroke: #10b981;
          stroke-width: 2.75;
          fill: none;
          stroke-dasharray: 6, 4;
          animation: arrowFlow 0.9s linear infinite;
          filter: drop-shadow(0 2px 6px rgba(16, 185, 129, 0.5));
        }

        /* Active Evidence Highlighting */
        mark.evidence.active-evidence,
        .ans-target.active-target,
        .syn-pair-1.active-target,
        .syn-pair-2.active-target {
          outline: 2.5px solid #10b981 !important;
          box-shadow: 0 0 16px rgba(16, 185, 129, 0.55) !important;
          border-radius: 4px;
          filter: brightness(1.05);
          z-index: 30;
          transition: all 0.2s ease;
        }

        /* Active Question Card Highlighting */
        .q-card.q-card-active,
        .question-item.q-card-active,
        [data-q].q-card-active {
          border-color: #10b981 !important;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.5), 0 8px 16px -2px rgba(0, 0, 0, 0.15) !important;
          transition: all 0.2s ease;
        }

        /* Evidence Button Pulse when Connected */
        .syn-btn.active-syn-btn {
          background: #10b981 !important;
          color: #ffffff !important;
          border-color: #059669 !important;
          box-shadow: 0 0 10px rgba(16, 185, 129, 0.5) !important;
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
            <marker id="reading-arrow-marker" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
              <path d="M 0 1 L 10 5 L 0 9 z" fill="#10b981" />
            </marker>
          </defs>
        `;
        document.body.appendChild(svg);
      }
      this.svg = svg;
    }

    /**
     * Finds the currently active slide container in the deck
     */
    getActiveSlide() {
      return document.querySelector('.slide.active') || document.querySelector('.slide.visible') || document.body;
    }

    /**
     * Binds evidence triggers (.syn-btn, .q-card, mark.evidence, .ans-target)
     */
    bindEvidenceConnections() {
      const activeSlide = this.getActiveSlide();
      if (!activeSlide) return;

      // 1. Hook into "💡 Evidence" buttons (.syn-btn[data-ev])
      activeSlide.querySelectorAll('.syn-btn[data-ev]').forEach(btn => {
        const evId = btn.dataset.ev;
        const qCard = btn.closest('.q-card, [data-q]');
        const evMark = activeSlide.querySelector(`#${evId}`) || document.getElementById(evId);

        btn.addEventListener('mouseenter', () => {
          this.activatePair(evMark, qCard || btn, false);
        });

        btn.addEventListener('mouseleave', () => {
          this.deactivateAll();
        });

        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.activatePair(evMark, qCard || btn, true);
        });
      });

      // 2. Hook into Question Cards (.q-card[data-q])
      activeSlide.querySelectorAll('.q-card[data-q]').forEach(qCard => {
        const qId = qCard.dataset.q;
        const evMarks = activeSlide.querySelectorAll(`[data-q="${qId}"], mark.evidence[id*="${qId}"]`);
        const evMark = evMarks.length > 0 ? evMarks[0] : null;

        qCard.addEventListener('mouseenter', () => {
          if (evMark) this.activatePair(evMark, qCard, false);
        });

        qCard.addEventListener('mouseleave', () => {
          this.deactivateAll();
        });
      });

      // 3. Hook into Evidence Elements in Reading Pane (mark.evidence, .ans-target, .syn-pair-1)
      activeSlide.querySelectorAll('mark.evidence, .ans-target, .syn-pair-1, .syn-pair-2').forEach(evEl => {
        const qId = evEl.dataset.q;
        const evId = evEl.id;

        let qCard = null;
        if (qId) {
          qCard = activeSlide.querySelector(`.q-card[data-q="${qId}"], [data-q="${qId}"]`);
        } else if (evId) {
          qCard = activeSlide.querySelector(`[data-ev="${evId}"]`);
        }

        if (qCard) {
          evEl.style.cursor = 'pointer';
          evEl.addEventListener('mouseenter', () => {
            this.activatePair(evEl, qCard, false);
          });
          evEl.addEventListener('mouseleave', () => {
            this.deactivateAll();
          });
          evEl.addEventListener('click', (e) => {
            e.stopPropagation();
            this.activatePair(evEl, qCard, true);
          });
        }
      });

      // 4. Track scrolling inside reading or question split panes
      activeSlide.querySelectorAll('.reading-pane, .question-pane, .split-view-container').forEach(pane => {
        pane.addEventListener('scroll', () => this.drawConnection(), { passive: true });
      });
    }

    /**
     * Re-binds connections whenever presentation changes slides
     */
    bindSlideChangeWatcher() {
      // Mutation observer on deck stage to detect slide changes
      const stage = document.getElementById('deckStage') || document.querySelector('.deck-stage') || document.body;
      if (stage) {
        const observer = new MutationObserver(() => {
          this.deactivateAll();
          setTimeout(() => this.bindEvidenceConnections(), 100);
        });
        observer.observe(stage, { attributes: true, subtree: true, attributeFilter: ['class'] });
      }

      // Custom window event if dispatched by DeckEngine
      window.addEventListener('slideChange', () => {
        this.deactivateAll();
        setTimeout(() => this.bindEvidenceConnections(), 100);
      });
    }

    activatePair(evidenceEl, cardEl, scrollToEvidence = false) {
      this.deactivateAll(false);

      if (evidenceEl) {
        evidenceEl.classList.add('active-evidence', 'active-target');
        this.activeTarget = evidenceEl;

        if (scrollToEvidence && evidenceEl.scrollIntoView) {
          evidenceEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }

      if (cardEl) {
        cardEl.classList.add('q-card-active');
        const synBtn = cardEl.querySelector('.syn-btn') || (cardEl.classList.contains('syn-btn') ? cardEl : null);
        if (synBtn) synBtn.classList.add('active-syn-btn');
        this.activeCard = cardEl;
      }

      this.startSmoothTracking();
    }

    deactivateAll(clearCanvas = true) {
      document.querySelectorAll('.active-evidence, .active-target').forEach(t => {
        t.classList.remove('active-evidence', 'active-target');
      });
      document.querySelectorAll('.q-card-active, .active-syn-btn').forEach(c => {
        c.classList.remove('q-card-active', 'active-syn-btn');
      });

      this.activeTarget = null;
      this.activeCard = null;
      if (clearCanvas) this.clearCanvas();
    }

    startSmoothTracking() {
      if (this.arrowAnimFrame) cancelAnimationFrame(this.arrowAnimFrame);
      const startTime = performance.now();
      const duration = 650;

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

      // Ensure both elements are visible on screen
      if (fromRect.width === 0 || toRect.width === 0 || fromRect.bottom < 0 || toRect.bottom < 0) {
        this.clearCanvas();
        return;
      }

      // Calculate start and end points
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
        path.setAttribute('marker-end', 'url(#reading-arrow-marker)');
        this.svg.appendChild(path);
      }

      path.setAttribute('d', pathData);
    }

    clearCanvas() {
      const path = document.getElementById('reading-arrow-active');
      if (path) path.remove();
    }

    bindControls() {
      // Toggle button in UI if present
      const toggleArrowBtn = document.getElementById('btn-toggle-arrows');
      if (toggleArrowBtn) {
        toggleArrowBtn.addEventListener('click', () => {
          this.showArrows = !this.showArrows;
          toggleArrowBtn.classList.toggle('active', this.showArrows);
          if (!this.showArrows) this.clearCanvas();
          else this.drawConnection();
        });
      }

      // Window resize & global scroll re-anchor
      window.addEventListener('resize', () => this.drawConnection(), { passive: true });
      window.addEventListener('scroll', () => this.drawConnection(), { passive: true });
    }

    switchLanguage(lang) {
      this.currentLang = lang;
      const activeSlide = this.getActiveSlide();
      if (!activeSlide) return;

      activeSlide.querySelectorAll('[data-en][data-vi]').forEach(el => {
        if (lang === 'vi') {
          el.innerHTML = el.dataset.vi;
        } else if (lang === 'en') {
          el.innerHTML = el.dataset.en;
        } else if (lang === 'dual') {
          el.innerHTML = `
            <div class="reading-dual-block">
              <div class="reading-en-pane mb-2 text-slate-800 font-medium">${el.dataset.en}</div>
              <div class="reading-vi-pane text-slate-500 italic text-sm border-t border-slate-200 pt-2">${el.dataset.vi}</div>
            </div>
          `;
        }
      });

      this.bindEvidenceConnections();
      this.drawConnection();
    }

    /**
     * Conflict-Free Keyboard Shortcuts:
     * - 'Shift + E': Toggle Evidence Arrows
     * - 'Shift + V': Toggle Translation (EN / VIE / Dual)
     * - 'Escape': Clear active arrow
     */
    bindKeyboardShortcuts() {
      document.addEventListener('keydown', (e) => {
        if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;

        const key = e.key.toLowerCase();

        // 1. Shift + E -> Toggle Evidence Connection Arrows (Non-conflicting)
        if (e.shiftKey && key === 'e') {
          e.preventDefault();
          this.showArrows = !this.showArrows;
          if (!this.showArrows) this.clearCanvas();
          else this.drawConnection();
          console.log(`[Reading Analyzer] Evidence Arrows: ${this.showArrows ? 'ON' : 'OFF'}`);
        }

        // 2. Shift + V -> Cycle Translation Language (EN -> VIE -> Dual)
        else if (e.shiftKey && key === 'v') {
          e.preventDefault();
          const nextLang = this.currentLang === 'en' ? 'vi' : (this.currentLang === 'vi' ? 'dual' : 'en');
          this.switchLanguage(nextLang);
          console.log(`[Reading Analyzer] Language mode: ${nextLang.toUpperCase()}`);
        }

        // 3. Escape -> Clear active arrow
        else if (key === 'escape') {
          this.deactivateAll();
        }
      });
    }
  }

  // Instantiate and export to window
  window.readingAnalyzer = new ReadingAnalyzer();
})();
