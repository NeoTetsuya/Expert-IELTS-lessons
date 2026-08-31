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

        // Hydrate Degree Cost Bar Chart (Module 3a)
        const degreeChartEl = document.getElementById('chart-degree-costs');
        if (degreeChartEl && !degreeChartEl.dataset.rendered) {
            this.renderDegreeCostBarChart(degreeChartEl);
            degreeChartEl.dataset.rendered = 'true';
        }

        // Hydrate Public vs Private School Pie Charts (Module 3a Extra)
        const schoolPieEl = document.getElementById('chart-school-pies');
        if (schoolPieEl && !schoolPieEl.dataset.rendered) {
            this.renderSchoolPieCharts(schoolPieEl);
            schoolPieEl.dataset.rendered = 'true';
        }

        // Hydrate Women's Earnings Multi-Line Graph (Module 3b)
        const womensEarningsEl = document.getElementById('chart-womens-earnings');
        if (womensEarningsEl && !womensEarningsEl.dataset.rendered) {
            this.renderWomensEarningsLineChart(womensEarningsEl);
            womensEarningsEl.dataset.rendered = 'true';
        }

        // Hydrate Education Lifetime Income Bar Chart (Module 3 Review)
        const eduIncomeEl = document.getElementById('chart-education-income');
        if (eduIncomeEl && !eduIncomeEl.dataset.rendered) {
            this.renderEducationIncomeBarChart(eduIncomeEl);
            eduIncomeEl.dataset.rendered = 'true';
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
     * Module 3a: Average Cost of an Undergraduate Degree in 2015 (Group Bar Chart)
     */
    renderDegreeCostBarChart(container) {
        const countries = [
            {
                name: 'UK',
                studyFees: 30000,
                livingCosts: 37000,
                totalCost: 67000
            },
            {
                name: 'Australia',
                studyFees: 57000,
                livingCosts: 42000,
                totalCost: 99000
            },
            {
                name: 'United States',
                studyFees: 56500,
                livingCosts: 32000,
                totalCost: 88500
            },
            {
                name: 'Germany',
                studyFees: 13000,
                livingCosts: 41000,
                totalCost: 54000
            }
        ];

        const width = 680;
        const height = 400;
        const margin = { top: 35, right: 30, bottom: 50, left: 65 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Average Cost of an Undergraduate Degree in 2015 (in US$)</h4>
                <div class="ielts-chart-legend">
                    <div class="ielts-legend-item" data-series="fees">
                        <span class="ielts-legend-color" style="background:#0284c7;"></span>
                        <span>Study fees (3-year)</span>
                    </div>
                    <div class="ielts-legend-item" data-series="living">
                        <span class="ielts-legend-color" style="background:#dc2626;"></span>
                        <span>Living costs (3-year)</span>
                    </div>
                    <div class="ielts-legend-item" data-series="total">
                        <span class="ielts-legend-color" style="background:#16a34a;"></span>
                        <span>Total (3-year degree)</span>
                    </div>
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="tooltip-degree-chart"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#fffbeb" rx="4" />
        `;

        // Y Axis Grid lines (0 to 120,000 in steps of 20,000)
        const yMax = 120000;
        for (let yVal = 0; yVal <= yMax; yVal += 20000) {
            const yPos = margin.top + plotHeight - (yVal / yMax) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#d6d3d1" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-size:12px; font-weight:600;">${yVal.toLocaleString()}</text>
            `;
        }

        // Axes
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
        `;

        // Grouped bars per country
        const groupWidth = plotWidth / countries.length;
        const barWidth = 28;
        const gap = 6;
        const totalBarsWidth = barWidth * 3 + gap * 2;
        const offset = (groupWidth - totalBarsWidth) / 2;

        countries.forEach((c, idx) => {
            const groupX = margin.left + idx * groupWidth + offset;

            // Bar 1: Study Fees (Blue)
            const h1 = (c.studyFees / yMax) * plotHeight;
            const y1 = margin.top + plotHeight - h1;
            html += `
                <g class="chart-bar-group" data-series="fees" data-label="${c.name} - Study Fees" data-val="$${c.studyFees.toLocaleString()}">
                    <rect x="${groupX}" y="${y1}" width="${barWidth}" height="${h1}" rx="3" fill="#0284c7" class="chart-bar" />
                </g>
            `;

            // Bar 2: Living Costs (Red)
            const h2 = (c.livingCosts / yMax) * plotHeight;
            const y2 = margin.top + plotHeight - h2;
            html += `
                <g class="chart-bar-group" data-series="living" data-label="${c.name} - Living Costs" data-val="$${c.livingCosts.toLocaleString()}">
                    <rect x="${groupX + barWidth + gap}" y="${y2}" width="${barWidth}" height="${h2}" rx="3" fill="#dc2626" class="chart-bar" />
                </g>
            `;

            // Bar 3: Total Degree Cost (Green)
            const h3 = (c.totalCost / yMax) * plotHeight;
            const y3 = margin.top + plotHeight - h3;
            html += `
                <g class="chart-bar-group" data-series="total" data-label="${c.name} - Total Cost" data-val="$${c.totalCost.toLocaleString()}">
                    <rect x="${groupX + (barWidth + gap) * 2}" y="${y3}" width="${barWidth}" height="${h3}" rx="3" fill="#16a34a" class="chart-bar" />
                </g>
            `;

            // Country Label
            const centerX = margin.left + idx * groupWidth + groupWidth / 2;
            html += `
                <text x="${centerX}" y="${margin.top + plotHeight + 24}" text-anchor="middle" class="chart-axis-text" style="font-size:14px; font-weight:700; fill:#1e293b;">${c.name}</text>
            `;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindChartEvents(container, 'tooltip-degree-chart');
    }

    /**
     * Module 3a Extra: Public vs Private Schools (Dual Pie Charts)
     */
    renderSchoolPieCharts(container) {
        const width = 640;
        const height = 310;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Public vs. Private Sector Schooling Distribution</h4>
                <div class="ielts-chart-legend">
                    <div class="ielts-legend-item">
                        <span class="ielts-legend-color" style="background:#0284c7;"></span>
                        <span>Public Sector</span>
                    </div>
                    <div class="ielts-legend-item">
                        <span class="ielts-legend-color" style="background:#c2410c;"></span>
                        <span>Private Sector</span>
                    </div>
                </div>
            </div>
            <div style="display:flex; justify-content:space-around; align-items:center; width:100%; padding:10px 0;">
                <!-- Pie 1: Number of students (90% Public / 10% Private) -->
                <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                    <div style="font-weight:700; font-size:16.5px; color:#1e293b; margin-bottom:8px;">Number of students in schools</div>
                    <svg viewBox="0 0 200 200" style="width:190px; height:190px;">
                        <!-- Public 90% Arc (0 to 324 deg) -->
                        <path d="M 100,100 L 100,10 A 90,90 0 1,0 152.9,27.1 Z" fill="#0284c7" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Private 10% Arc (324 to 360 deg) -->
                        <path d="M 100,100 L 152.9,27.1 A 90,90 0 0,0 100,10 Z" fill="#c2410c" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Labels -->
                        <text x="85" y="115" fill="#ffffff" font-size="20" font-weight="800" text-anchor="middle">90%</text>
                        <text x="125" y="45" fill="#ffffff" font-size="14" font-weight="800" text-anchor="middle">10%</text>
                    </svg>
                    <div style="display:flex; gap:16px; margin-top:8px; font-size:14px; font-weight:700;">
                        <span style="color:#0284c7;">■ Public: 90%</span>
                        <span style="color:#c2410c;">■ Private: 10%</span>
                    </div>
                </div>

                <!-- Pie 2: Number of schools (75% Public / 25% Private) -->
                <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                    <div style="font-weight:700; font-size:16.5px; color:#1e293b; margin-bottom:8px;">Number of schools</div>
                    <svg viewBox="0 0 200 200" style="width:190px; height:190px;">
                        <!-- Public 75% Arc (0 to 270 deg) -->
                        <path d="M 100,100 L 100,10 A 90,90 0 1,0 10,100 Z" fill="#0284c7" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Private 25% Arc (270 to 360 deg) -->
                        <path d="M 100,100 L 10,100 A 90,90 0 0,0 100,10 Z" fill="#c2410c" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Labels -->
                        <text x="95" y="125" fill="#ffffff" font-size="20" font-weight="800" text-anchor="middle">75%</text>
                        <text x="50" y="60" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle">25%</text>
                    </svg>
                    <div style="display:flex; gap:16px; margin-top:8px; font-size:14px; font-weight:700;">
                        <span style="color:#0284c7;">■ Public: 75%</span>
                        <span style="color:#c2410c;">■ Private: 25%</span>
                    </div>
                </div>
            </div>
        `;

        container.innerHTML = html;
    }

    /**
     * Module 3b Extra: Women's weekly earnings as % of men's wages (Multi-Line Graph)
     */
    renderWomensEarningsLineChart(container) {
        const years = [1975, 1980, 1985, 1990, 1995, 2000, 2005];

        const series = [
            {
                id: 'age-16-24',
                name: '16 to 24 years',
                color: '#e11d48',
                data: [78, 82, 89, 90, 91, 92, 92]
            },
            {
                id: 'age-25-34',
                name: '25 to 34 years',
                color: '#0284c7',
                data: [67, 70, 75, 80, 83, 84, 89]
            },
            {
                id: 'age-35-44',
                name: '35 to 44 years',
                color: '#16a34a',
                data: [59, 59, 64, 70, 73, 70, 74]
            },
            {
                id: 'age-45-54',
                name: '45 to 54 years',
                color: '#9333ea',
                data: [57, 56, 60, 64, 67, 73, 75]
            }
        ];

        const width = 680;
        const height = 390;
        const margin = { top: 30, right: 110, bottom: 45, left: 55 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Women's Weekly Earnings as a Percentage of Men's Wages (USA, 1975–2005)</h4>
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
                <div class="ielts-chart-tooltip" id="tooltip-womens-chart"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#fffbeb" rx="4" />
        `;

        // Y Axis Grid lines (50% to 100% by 10)
        for (let yVal = 50; yVal <= 100; yVal += 10) {
            const yPos = margin.top + plotHeight - ((yVal - 50) / 50) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#d6d3d1" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-weight:600;">${yVal}%</text>
            `;
        }

        // X Axis Years
        const xStep = plotWidth / (years.length - 1);
        years.forEach((yr, idx) => {
            const xPos = margin.left + idx * xStep;
            html += `
                <line x1="${xPos}" y1="${margin.top + plotHeight}" x2="${xPos}" y2="${margin.top + plotHeight + 5}" class="chart-axis-line" stroke="#78716c" />
                <text x="${xPos}" y="${margin.top + plotHeight + 22}" text-anchor="middle" class="chart-axis-text" style="font-weight:700;">${yr}</text>
            `;
        });

        // Axes lines
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
        `;

        // Render series polylines
        series.forEach(s => {
            const points = s.data.map((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - ((val - 50) / 50) * plotHeight;
                return `${x},${y}`;
            }).join(' ');

            html += `
                <g class="chart-series-group" data-line-id="${s.id}">
                    <polyline points="${points}" stroke="${s.color}" stroke-width="3.5" fill="none" class="chart-line" />
            `;

            s.data.forEach((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - ((val - 50) / 50) * plotHeight;
                html += `
                    <circle cx="${x}" cy="${y}" r="4.5" fill="${s.color}" stroke="#ffffff" stroke-width="1.5" class="chart-dot" data-label="${s.name} (${years[idx]})" data-val="${val}% of men's wages" />
                `;
            });

            // End line label
            const lastX = margin.left + (years.length - 1) * xStep;
            const lastY = margin.top + plotHeight - ((s.data[s.data.length - 1] - 50) / 50) * plotHeight;
            html += `
                <text x="${lastX + 8}" y="${lastY + 4}" fill="${s.color}" font-size="12" font-weight="700">${s.name}</text>
                </g>
            `;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindLineChartEvents(container, 'tooltip-womens-chart');
    }

    /**
     * Module 3 Review: Lifetime Income by Education Level (Bar Chart)
     */
    renderEducationIncomeBarChart(container) {
        const data = [
            { level: 'High School', value: 1.2, display: '$1.2M' },
            { level: "Associate's", value: 1.4, display: '$1.4M' },
            { level: "Bachelor's", value: 2.1, display: '$2.1M' },
            { level: "Master's", value: 2.5, display: '$2.5M' },
            { level: 'Doctorate (PhD)', value: 3.4, display: '$3.4M' },
            { level: 'Professional', value: 4.4, display: '$4.4M' }
        ];

        const width = 640;
        const height = 360;
        const margin = { top: 30, right: 30, bottom: 65, left: 55 };
        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">Lifetime Earnings by Education Level (USA, in $ Millions)</h4>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="tooltip-edu-chart"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#f8fafc" rx="4" />
        `;

        // Y Axis Grid lines (0 to 5.0 in steps of 1.0)
        const yMax = 5.0;
        for (let yVal = 0; yVal <= yMax; yVal += 1.0) {
            const yPos = margin.top + plotHeight - (yVal / yMax) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#e2e8f0" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-size:12px; font-weight:600;">$${yVal.toFixed(1)}M</text>
            `;
        }

        // Axes
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#64748b" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#64748b" stroke-width="1.5" />
        `;

        const barWidth = 44;
        const colStep = plotWidth / data.length;

        data.forEach((d, idx) => {
            const x = margin.left + idx * colStep + (colStep - barWidth) / 2;
            const barH = (d.value / yMax) * plotHeight;
            const y = margin.top + plotHeight - barH;

            html += `
                <g class="chart-bar-group" data-label="${d.level}" data-val="${d.display}">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="url(#barGrad-${idx})" class="chart-bar" />
                    <!-- Value on top of bar -->
                    <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="#0369a1">${d.display}</text>
                    <!-- Label below axis -->
                    <text x="${x + barWidth / 2}" y="${margin.top + plotHeight + 14}" text-anchor="end" transform="rotate(-35, ${x + barWidth / 2}, ${margin.top + plotHeight + 14})" class="chart-axis-text" style="font-size:12px; font-weight:700; fill:#1e293b;">${d.level}</text>
                </g>
            `;
        });

        // Add defs for gradient bars
        html += `
            <defs>
        `;
        data.forEach((d, idx) => {
            html += `
                <linearGradient id="barGrad-${idx}" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stop-color="#0284c7" />
                    <stop offset="100%" stop-color="#0369a1" />
                </linearGradient>
            `;
        });
        html += `
            </defs>
            </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindChartEvents(container, 'tooltip-edu-chart');
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
