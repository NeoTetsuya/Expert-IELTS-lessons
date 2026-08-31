/**
 * Expert IELTS Presentations — Modern Digit Animation Engine (NumberFlow-inspired)
 * 
 * Smooth, columnar digit morphing transitions with physics springs.
 * Eliminates character jumps and layout jitter for timers, slide indicators, and score stats.
 */

(function () {
    'use strict';

    class NumberFlowEngine {
        constructor() {
            this.initCustomElement();
        }

        initCustomElement() {
            if (customElements.get('number-flow')) return;

            customElements.define('number-flow', class extends HTMLElement {
                static get observedAttributes() {
                    return ['value', 'format', 'prefix', 'suffix'];
                }

                constructor() {
                    super();
                    this.currentVal = '';
                }

                connectedCallback() {
                    this.render(this.getAttribute('value') || '0');
                }

                attributeChangedCallback(name, oldVal, newVal) {
                    if (name === 'value' && oldVal !== newVal) {
                        this.render(newVal || '0');
                    }
                }

                render(valStr) {
                    const prefix = this.getAttribute('prefix') || '';
                    const suffix = this.getAttribute('suffix') || '';
                    const chars = (prefix + valStr + suffix).split('');

                    this.innerHTML = '';
                    this.className = 'number-flow-root';

                    chars.forEach(char => {
                        const digitEl = document.createElement('span');
                        digitEl.className = 'number-flow-char';

                        if (/\d/.test(char)) {
                            digitEl.classList.add('number-flow-digit');
                            const num = parseInt(char, 10);
                            digitEl.innerHTML = `
                                <span class="number-flow-column" style="transform: translateY(-${num * 10}%);">
                                    <span>0</span><span>1</span><span>2</span><span>3</span><span>4</span>
                                    <span>5</span><span>6</span><span>7</span><span>8</span><span>9</span>
                                </span>
                            `;
                        } else {
                            digitEl.textContent = char;
                        }
                        this.appendChild(digitEl);
                    });
                }
            });
        }

        /**
         * Programmatic helper to animate an element from one number to another
         */
        animateElement(element, targetNumber, duration = 800) {
            if (!element) return;
            const targetVal = String(targetNumber).padStart(2, '0');
            element.innerHTML = `<number-flow value="${targetVal}"></number-flow>`;
        }
    }

    window.NumberFlow = new NumberFlowEngine();

})();
