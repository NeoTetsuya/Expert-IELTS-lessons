/**
 * =========================================================================
 * IELTS Interactive Chart Engine (Task 1 Academic Data Visualizations)
 * Supports: Dual Group Bar Charts, Multi-Line Graphs, and Mini Trend Sketches
 * 100% Native SVG, Zero External Dependencies, Offline-First
 * =========================================================================
 */

class DeckCharts {
    constructor() {
        this.activeTooltips = new Map();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.autoHydrateCharts();
        });

        // Re-check on slide change if charts are dynamically mounted
        document.addEventListener('slidechange', () => {
            this.autoHydrateCharts();
        });
    }

    autoHydrateCharts() {
        // Hydrate Social Media Friendship Bar Chart (Module 1a)
        const socialChartEl = document.getElementById('chart-social-media-connections');
        if (socialChartEl && !socialChartEl.dataset.rendered) {
            this.renderSocialMediaBarChart(socialChartEl);
            socialChartEl.dataset.rendered = 'true';
        }

        // Hydrate Cinema vs DVD Multi-Line Graph (Module 1b)
        const cinemaChartEl = document.getElementById('chart-cinema-dvd-sales');
        if (cinemaChartEl && !cinemaChartEl.dataset.rendered) {
            this.renderCinemaDvdLineChart(cinemaChartEl);
            cinemaChartEl.dataset.rendered = 'true';
        }

        // Hydrate Mini Trend Sketches
        const miniSketchesEl = document.getElementById('chart-mini-trend-sketches');
        if (miniSketchesEl && !miniSketchesEl.dataset.rendered) {
            this.renderMiniTrendSketches(miniSketchesEl);
            miniSketchesEl.dataset.rendered = 'true';
        }
    }

    /**
     * Module 1a: Social Media Friendship Connections (Group Bar Chart)
     */
    renderSocialMediaBarChart(container) {
        const friendCategories = [
            { label: 'Know in real life', value: 82 },
            { label: 'Mutual friends', value: 60 },
            { label: 'Business networks', value: 11 },
            { label: 'Attractiveness', value: 8 },
            { label: 'Increasing friend count', value: 7 }
        ];

        const unfriendCategories = [
            { label: 'Offensive comments', value: 55 },
            { label: "Don't know well", value: 42 },
            { label: 'Trying to sell something', value: 38 },
            { label: 'Depressing comments', value: 22 },
            { label: 'Lack of interaction', value: 20 }
        ];

        const width = 640;
        const height = 380;
        const margin = { top: 35, right: 30, bottom: 95, left: 45 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Reasons to Friend vs. Unfriend on Social Media (%)</h4>
                <div class="ielts-chart-legend">
                    <div class="ielts-legend-item" data-series="friend">
                        <span class="ielts-legend-color" style="background:#0284c7;"></span>
                        <span>Percentage who friend</span>
                    </div>
                    <div class="ielts-legend-item" data-series="unfriend">
                        <span class="ielts-legend-color" style="background:#ea580c;"></span>
                        <span>Percentage who unfriend</span>
                    </div>
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="tooltip-social-chart"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <!-- Background Grid -->
        `;

        // Y Axis Grid lines (0 to 90 by 10)
        for (let yVal = 0; yVal <= 90; yVal += 10) {
            const yPos = margin.top + plotHeight - (yVal / 90) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" />
                <text x="${margin.left - 8}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text">${yVal}</text>
            `;
        }

        // Axes
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
        `;

        // Total 10 columns across the width
        const totalBars = 10;
        const barWidth = 36;
        const colStep = plotWidth / totalBars;

        // Render "Friend" bars (Blue)
        friendCategories.forEach((cat, idx) => {
            const x = margin.left + idx * colStep + (colStep - barWidth) / 2;
            const barH = (cat.value / 90) * plotHeight;
            const y = margin.top + plotHeight - barH;

            html += `
                <g class="chart-bar-group" data-series="friend" data-label="${cat.label}" data-val="${cat.value}%">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="3" fill="#0284c7" class="chart-bar" />
                    <text x="${x + barWidth / 2}" y="${margin.top + plotHeight + 12}" text-anchor="end" transform="rotate(-45, ${x + barWidth / 2}, ${margin.top + plotHeight + 12})" class="chart-axis-text" style="font-size:11px; font-weight:600;">${cat.label}</text>
                </g>
            `;
        });

        // Render "Unfriend" bars (Orange/Red)
        unfriendCategories.forEach((cat, idx) => {
            const x = margin.left + (idx + 5) * colStep + (colStep - barWidth) / 2;
            const barH = (cat.value / 90) * plotHeight;
            const y = margin.top + plotHeight - barH;

            html += `
                <g class="chart-bar-group" data-series="unfriend" data-label="${cat.label}" data-val="${cat.value}%">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="3" fill="#ea580c" class="chart-bar" />
                    <text x="${x + barWidth / 2}" y="${margin.top + plotHeight + 12}" text-anchor="end" transform="rotate(-45, ${x + barWidth / 2}, ${margin.top + plotHeight + 12})" class="chart-axis-text" style="font-size:11px; font-weight:600;">${cat.label}</text>
                </g>
            `;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindChartEvents(container, 'tooltip-social-chart');
    }

    /**
     * Module 1b: Cinema ticket & DVD sales in USA & internationally (Multi-Line Graph)
     */
    renderCinemaDvdLineChart(container) {
        const years = [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010];

        const series = [
            {
                id: 'us-dvd',
                name: 'North American DVD sales',
                color: '#0369a1',
                data: [21, 23, 24, 25, 24, 22.5, 22.2, 22, 19.5, 18.5]
            },
            {
                id: 'us-cinema',
                name: 'North American cinema sales',
                color: '#dc2626',
                data: [10, 11, 11, 10.8, 9.5, 10.2, 10.1, 9.5, 11.2, 11.5]
            },
            {
                id: 'intl-dvd',
                name: 'International DVD sales',
                color: '#16a34a',
                data: [11, 13.2, 13.2, 18, 16, 18.2, 18.2, 19, 20.2, 22]
            },
            {
                id: 'intl-cinema',
                name: 'International cinema sales',
                color: '#7c3aed',
                data: [20, 23.5, 24.2, 28.5, 25.5, 26.5, 26.5, 27.2, 30.2, 32]
            }
        ];

        const width = 680;
        const height = 380;
        const margin = { top: 30, right: 30, bottom: 45, left: 55 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Cinema Ticket &amp; DVD Sales (US$ billion, 2001–2010)</h4>
                <div class="ielts-chart-legend">
        `;

        series.forEach(s => {
            html += `
                <div class="ielts-legend-item" data-line-id="${s.id}">
                    <span class="ielts-legend-line" style="background:${s.color};"></span>
                    <span>${s.name}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="tooltip-cinema-chart"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
        `;

        // Y Axis Grid lines (0 to 40 by 10)
        for (let yVal = 0; yVal <= 40; yVal += 10) {
            const yPos = margin.top + plotHeight - (yVal / 40) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text">${yVal}</text>
            `;
        }

        // Y Axis Label
        html += `
            <text x="${margin.left - 35}" y="${margin.top + plotHeight / 2}" text-anchor="middle" transform="rotate(-90, ${margin.left - 35}, ${margin.top + plotHeight / 2})" class="chart-axis-text" style="font-weight:700; fill:#475569;">US$ billion</text>
        `;

        // X Axis Years
        const xStep = plotWidth / (years.length - 1);
        years.forEach((yr, idx) => {
            const xPos = margin.left + idx * xStep;
            html += `
                <line x1="${xPos}" y1="${margin.top + plotHeight}" x2="${xPos}" y2="${margin.top + plotHeight + 5}" class="chart-axis-line" />
                <text x="${xPos}" y="${margin.top + plotHeight + 22}" text-anchor="middle" class="chart-axis-text" style="font-weight:600;">${yr}</text>
            `;
        });

        // Axes lines
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" />
        `;

        // Render polylines and interactive dots for each series
        series.forEach(s => {
            const points = s.data.map((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - (val / 40) * plotHeight;
                return `${x},${y}`;
            }).join(' ');

            html += `
                <g class="chart-series-group" data-line-id="${s.id}">
                    <polyline points="${points}" stroke="${s.color}" class="chart-line" />
            `;

            s.data.forEach((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - (val / 40) * plotHeight;
                html += `
                    <circle cx="${x}" cy="${y}" r="4" stroke="${s.color}" class="chart-dot" data-label="${s.name} (${years[idx]})" data-val="$${val} Billion" />
                `;
            });

            html += `</g>`;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindLineChartEvents(container, 'tooltip-cinema-chart');
    }

    /**
     * Module 1a: Mini Trend Sketches (A, B, C)
     */
    renderMiniTrendSketches(container) {
        container.innerHTML = `
            <div class="mini-sketches-grid">
                <!-- Sketch A -->
                <div class="mini-sketch-card">
                    <span class="mini-sketch-badge">A</span>
                    <div style="font-weight:700; font-size:15px; margin-bottom:6px; color:#1e293b;">Mobile vs. Landline</div>
                    <svg viewBox="0 0 160 120" style="width:100%; height:110px; background:#fff7ed; border-radius:6px; border:1px solid #fed7aa;">
                        <line x1="15" y1="15" x2="15" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <line x1="15" y1="105" x2="145" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <!-- Mobile line (falling) -->
                        <line x1="20" y1="25" x2="140" y2="90" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
                        <!-- Landline line (rising) -->
                        <line x1="20" y1="85" x2="140" y2="20" stroke="#ea580c" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <div style="display:flex; gap:10px; font-size:12px; margin-top:6px;">
                        <span style="color:#0284c7; font-weight:700;">— Mobile</span>
                        <span style="color:#ea580c; font-weight:700;">— Landline</span>
                    </div>
                </div>

                <!-- Sketch B -->
                <div class="mini-sketch-card">
                    <span class="mini-sketch-badge">B</span>
                    <div style="font-weight:700; font-size:15px; margin-bottom:6px; color:#1e293b;">Usage by Age Groups</div>
                    <svg viewBox="0 0 160 120" style="width:100%; height:110px; background:#fff7ed; border-radius:6px; border:1px solid #fed7aa;">
                        <line x1="15" y1="15" x2="15" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <line x1="15" y1="105" x2="145" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <!-- Under 25 (Tall) -->
                        <rect x="25" y="25" width="22" height="80" fill="#0369a1" rx="2" />
                        <!-- 26-35 -->
                        <rect x="55" y="65" width="22" height="40" fill="#d97706" rx="2" />
                        <!-- 46-55 -->
                        <rect x="85" y="75" width="22" height="30" fill="#0284c7" rx="2" />
                        <!-- Over 56 -->
                        <rect x="115" y="75" width="22" height="30" fill="#c2410c" rx="2" />
                    </svg>
                    <div style="font-size:12px; font-weight:600; color:#64748b; margin-top:6px;">Under 25 dominates</div>
                </div>

                <!-- Sketch C -->
                <div class="mini-sketch-card">
                    <span class="mini-sketch-badge">C</span>
                    <div style="font-weight:700; font-size:15px; margin-bottom:6px; color:#1e293b;">Internet vs. Phone Calls</div>
                    <svg viewBox="0 0 160 120" style="width:100%; height:110px; background:#fff7ed; border-radius:6px; border:1px solid #fed7aa;">
                        <line x1="15" y1="15" x2="15" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <line x1="15" y1="105" x2="145" y2="105" stroke="#94a3b8" stroke-width="1.5" />
                        <!-- Internet (High rising) -->
                        <line x1="20" y1="40" x2="140" y2="20" stroke="#ea580c" stroke-width="3" stroke-linecap="round" />
                        <!-- Phone calls (Low flat) -->
                        <line x1="20" y1="92" x2="140" y2="95" stroke="#0284c7" stroke-width="3" stroke-linecap="round" />
                    </svg>
                    <div style="display:flex; gap:10px; font-size:12px; margin-top:6px;">
                        <span style="color:#ea580c; font-weight:700;">— Internet</span>
                        <span style="color:#0284c7; font-weight:700;">— Phone calls</span>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Tooltip & Interactive Legends Bindings
     */
    bindChartEvents(container, tooltipId) {
        const tooltip = container.querySelector(`#${tooltipId}`);
        const barGroups = container.querySelectorAll('.chart-bar-group');
        const legendItems = container.querySelectorAll('.ielts-legend-item');

        barGroups.forEach(grp => {
            grp.addEventListener('mouseenter', (e) => {
                const label = grp.dataset.label;
                const val = grp.dataset.val;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = grp.querySelector('rect').getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            grp.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });

        legendItems.forEach(item => {
            item.addEventListener('click', () => {
                const series = item.dataset.series;
                const isDimmed = item.classList.toggle('dimmed');

                barGroups.forEach(grp => {
                    if (grp.dataset.series === series) {
                        grp.style.opacity = isDimmed ? '0.15' : '1';
                    }
                });
            });
        });
    }

    bindLineChartEvents(container, tooltipId) {
        const tooltip = container.querySelector(`#${tooltipId}`);
        const dots = container.querySelectorAll('.chart-dot');
        const legendItems = container.querySelectorAll('.ielts-legend-item');
        const seriesGroups = container.querySelectorAll('.chart-series-group');

        dots.forEach(dot => {
            dot.addEventListener('mouseenter', (e) => {
                const label = dot.dataset.label;
                const val = dot.dataset.val;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = dot.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            dot.addEventListener('mouseleave', () => {
                tooltip.classList.remove('show');
            });
        });

        legendItems.forEach(item => {
            item.addEventListener('click', () => {
                const lineId = item.dataset.lineId;
                const isDimmed = item.classList.toggle('dimmed');

                seriesGroups.forEach(grp => {
                    if (grp.dataset.lineId === lineId) {
                        grp.style.opacity = isDimmed ? '0.12' : '1';
                    }
                });
            });
        });
    }
}

// Instantiate and expose globally
window.deckCharts = new DeckCharts();
