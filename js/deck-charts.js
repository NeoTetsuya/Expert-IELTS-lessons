/**
 * =========================================================================
 * IELTS General Interactive SVG Chart Engine (Task 1 Academic Data Visualizations)
 * Supports: Grouped Bar Charts, Multi-Line Graphs, Pie/Donut Charts, Single Bar Charts
 * 100% Native SVG, Zero External Dependencies, Offline-First & Responsive
 * =========================================================================
 */

class DeckCharts {
    constructor() {
        this.registry = new Map();
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', () => {
            this.hydrateAll();
        });

        document.addEventListener('slidechange', () => {
            this.hydrateAll();
        });
    }

    /**
     * Register a chart to be automatically mounted when its container is rendered.
     */
    register(containerId, type, config) {
        this.registry.set(containerId, { type, config });
        const el = document.getElementById(containerId);
        if (el) {
            this.renderRegisteredChart(el, type, config);
        }
    }

    hydrateAll() {
        // Hydrate registered charts
        this.registry.forEach((item, id) => {
            const el = document.getElementById(id);
            if (el && !el.dataset.rendered) {
                this.renderRegisteredChart(el, item.type, item.config);
                el.dataset.rendered = 'true';
            }
        });

        // Hydrate data-chart elements
        document.querySelectorAll('[data-chart-type]').forEach(el => {
            if (!el.dataset.rendered && el.id) {
                const type = el.dataset.chartType;
                const configName = el.dataset.chartConfig;
                const config = configName && window[configName] ? window[configName] : null;
                if (config) {
                    this.renderRegisteredChart(el, type, config);
                    el.dataset.rendered = 'true';
                }
            }
        });
    }

    renderRegisteredChart(container, type, config) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }
        if (!container) return;

        switch (type) {
            case 'grouped-bar':
                this.renderGroupedBarChart(container, config);
                break;
            case 'single-bar':
                this.renderSingleBarChart(container, config);
                break;
            case 'multi-line':
                this.renderMultiLineChart(container, config);
                break;
            case 'pie-grid':
                this.renderPieChartGrid(container, config);
                break;
            default:
                console.warn(`DeckCharts: Unknown chart type "${type}"`);
        }
    }

    /**
     * Reusable Grouped Bar Chart
     */
    renderGroupedBarChart(container, config) {
        const {
            title = '',
            categories = [],
            series = [],
            yMax = 100,
            yStep = 20,
            width = 680,
            height = 390,
            margin = { top: 35, right: 30, bottom: 50, left: 65 },
            yFormat = (val) => val.toLocaleString()
        } = config;

        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${title}</h4>
                <div class="ielts-chart-legend">
        `;

        series.forEach(s => {
            html += `
                <div class="ielts-legend-item" data-series="${s.id}">
                    <span class="ielts-legend-color" style="background:${s.color};"></span>
                    <span>${s.name}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="${tooltipId}"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#fffbeb" rx="4" />
        `;

        // Y Grid
        for (let yVal = 0; yVal <= yMax; yVal += yStep) {
            const yPos = margin.top + plotHeight - (yVal / yMax) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#d6d3d1" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-size:12px; font-weight:600;">${yFormat(yVal)}</text>
            `;
        }

        // Axes lines
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#78716c" stroke-width="1.5" />
        `;

        // Calculate bars
        const groupWidth = plotWidth / categories.length;
        const numSeries = series.length;
        const barWidth = Math.max(14, Math.min(32, (groupWidth * 0.7) / numSeries));
        const gap = 4;
        const totalBarsWidth = barWidth * numSeries + gap * (numSeries - 1);
        const groupOffset = (groupWidth - totalBarsWidth) / 2;

        categories.forEach((cat, catIdx) => {
            const catName = typeof cat === 'string' ? cat : cat.name;
            const groupX = margin.left + catIdx * groupWidth + groupOffset;

            series.forEach((s, sIdx) => {
                const val = typeof cat === 'object' && cat[s.id] !== undefined ? cat[s.id] : s.data[catIdx];
                const barH = (val / yMax) * plotHeight;
                const barY = margin.top + plotHeight - barH;
                const barX = groupX + sIdx * (barWidth + gap);

                html += `
                    <g class="chart-bar-group" data-series="${s.id}" data-label="${catName} - ${s.name}" data-val="${yFormat(val)}">
                        <rect x="${barX}" y="${barY}" width="${barWidth}" height="${barH}" rx="3" fill="${s.color}" class="chart-bar" />
                    </g>
                `;
            });

            // Category label below axis
            const centerX = margin.left + catIdx * groupWidth + groupWidth / 2;
            html += `
                <text x="${centerX}" y="${margin.top + plotHeight + 24}" text-anchor="middle" class="chart-axis-text" style="font-size:14px; font-weight:700; fill:#1e293b;">${catName}</text>
            `;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindBarChartEvents(container, tooltipId);
    }

    /**
     * Reusable Single Bar Chart with gradient options
     */
    renderSingleBarChart(container, config) {
        const {
            title = '',
            data = [], // [{ label: '', value: 0, display: '' }]
            yMax = 5.0,
            yStep = 1.0,
            width = 640,
            height = 360,
            margin = { top: 30, right: 30, bottom: 65, left: 55 },
            yFormat = (val) => `$${val.toFixed(1)}M`
        } = config;

        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${title}</h4>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="${tooltipId}"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#f8fafc" rx="4" />
        `;

        // Y Axis Grid lines
        for (let yVal = 0; yVal <= yMax; yVal += yStep) {
            const yPos = margin.top + plotHeight - (yVal / yMax) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#e2e8f0" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-size:12px; font-weight:600;">${yFormat(yVal)}</text>
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
                <g class="chart-bar-group" data-label="${d.label}" data-val="${d.display || d.value}">
                    <rect x="${x}" y="${y}" width="${barWidth}" height="${barH}" rx="4" fill="url(#barGrad-${idx})" class="chart-bar" />
                    <text x="${x + barWidth / 2}" y="${y - 6}" text-anchor="middle" font-size="12" font-weight="700" fill="#0369a1">${d.display || d.value}</text>
                    <text x="${x + barWidth / 2}" y="${margin.top + plotHeight + 14}" text-anchor="end" transform="rotate(-35, ${x + barWidth / 2}, ${margin.top + plotHeight + 14})" class="chart-axis-text" style="font-size:12px; font-weight:700; fill:#1e293b;">${d.label}</text>
                </g>
            `;
        });

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
        this.bindBarChartEvents(container, tooltipId);
    }

    /**
     * Reusable Multi-Line Graph
     */
    renderMultiLineChart(container, config) {
        const {
            title = '',
            series = [],
            width = 680,
            height = 360,
            margin = { top: 30, right: 140, bottom: 45, left: 60 }
        } = config;

        // Support both xCategories and xAxis aliases
        const xCategories = config.xCategories || config.xAxis || config.categories || [];
        
        // Auto-calculate dynamic y-axis range if not specified
        const allVals = series.flatMap(s => s.data || []);
        const rawMax = allVals.length > 0 ? Math.max(...allVals) : 100;
        const rawMin = allVals.length > 0 ? Math.min(...allVals) : 0;
        
        let yMax = config.yMax;
        if (yMax === undefined) {
            if (rawMax <= 10) yMax = 10;
            else if (rawMax <= 50) yMax = 50;
            else if (rawMax <= 100) yMax = 100;
            else if (rawMax <= 500) yMax = Math.ceil(rawMax / 50) * 50 + 50;
            else yMax = Math.ceil(rawMax / 100) * 100;
        }
        
        const yMin = config.yMin !== undefined ? config.yMin : (rawMin < 0 ? Math.floor(rawMin / 10) * 10 : 0);
        const yStep = config.yStep !== undefined ? config.yStep : (yMax - yMin) / 5;
        
        const isDollars = config.yAxisLabel && (config.yAxisLabel.includes('Dollar') || config.yAxisLabel.includes('$'));
        const yUnit = config.yUnit !== undefined ? config.yUnit : (config.yAxisLabel && config.yAxisLabel.includes('%') ? '%' : '');
        const yFormat = config.yFormat || ((val) => isDollars ? `$${val}B` : `${val}${yUnit}`);

        const plotWidth = width - margin.left - margin.right;
        const plotHeight = height - margin.top - margin.bottom;
        const tooltipId = `tooltip-${Math.random().toString(36).substr(2, 9)}`;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${title}</h4>
                <div class="ielts-chart-legend">
        `;

        series.forEach((s, idx) => {
            const lineId = s.id || `series-${idx}`;
            html += `
                <div class="ielts-legend-item" data-line-id="${lineId}">
                    <span class="ielts-legend-line" style="background:${s.color};"></span>
                    <span>${s.name}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="position:relative; width:100%;">
                <div class="ielts-chart-tooltip" id="${tooltipId}"></div>
                <svg viewBox="0 0 ${width} ${height}" class="ielts-chart-svg" style="width:100%; height:auto; display:block;">
                    <rect x="${margin.left}" y="${margin.top}" width="${plotWidth}" height="${plotHeight}" fill="#f8fafc" rx="6" />
        `;

        // Y Grid
        for (let yVal = yMin; yVal <= yMax + 0.001; yVal += yStep) {
            const yPos = margin.top + plotHeight - ((yVal - yMin) / (yMax - yMin)) * plotHeight;
            html += `
                <line x1="${margin.left}" y1="${yPos}" x2="${margin.left + plotWidth}" y2="${yPos}" class="chart-grid-line" stroke="#e2e8f0" stroke-dasharray="4,4" />
                <text x="${margin.left - 10}" y="${yPos + 4}" text-anchor="end" class="chart-axis-text" style="font-size:12px; font-weight:600; fill:#64748b;">${yFormat(Math.round(yVal))}</text>
            `;
        }

        // X Axis Points
        const xCount = Math.max(1, xCategories.length - 1);
        const xStep = plotWidth / xCount;
        xCategories.forEach((cat, idx) => {
            const xPos = margin.left + idx * xStep;
            html += `
                <line x1="${xPos}" y1="${margin.top + plotHeight}" x2="${xPos}" y2="${margin.top + plotHeight + 5}" class="chart-axis-line" stroke="#94a3b8" />
                <text x="${xPos}" y="${margin.top + plotHeight + 20}" text-anchor="middle" class="chart-axis-text" style="font-size:12px; font-weight:700; fill:#1e293b;">${cat}</text>
            `;
        });

        // Axes lines
        html += `
            <line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#64748b" stroke-width="1.5" />
            <line x1="${margin.left}" y1="${margin.top + plotHeight}" x2="${margin.left + plotWidth}" y2="${margin.top + plotHeight}" class="chart-axis-line" stroke="#64748b" stroke-width="1.5" />
        `;

        // Calculate collision-free positions for end-line labels
        const endLabels = [];
        series.forEach((s, sIdx) => {
            if (s.data && s.data.length > 0 && xCategories.length > 0) {
                const lineId = s.id || `series-${sIdx}`;
                const lastVal = s.data[s.data.length - 1];
                const lastX = margin.left + (xCategories.length - 1) * xStep;
                const lastY = margin.top + plotHeight - ((lastVal - yMin) / (yMax - yMin)) * plotHeight;
                endLabels.push({
                    lineId,
                    name: s.name,
                    color: s.color,
                    origX: lastX,
                    origY: lastY,
                    y: lastY
                });
            }
        });

        if (endLabels.length > 1) {
            // Sort by target Y position (top to bottom)
            endLabels.sort((a, b) => a.origY - b.origY);
            const minGap = 16;
            // Forward relaxation
            for (let i = 1; i < endLabels.length; i++) {
                if (endLabels[i].y < endLabels[i - 1].y + minGap) {
                    endLabels[i].y = endLabels[i - 1].y + minGap;
                }
            }
            // Backward containment if bottom overflows
            const maxY = margin.top + plotHeight + 6;
            if (endLabels[endLabels.length - 1].y > maxY) {
                endLabels[endLabels.length - 1].y = maxY;
                for (let i = endLabels.length - 2; i >= 0; i--) {
                    if (endLabels[i].y > endLabels[i + 1].y - minGap) {
                        endLabels[i].y = endLabels[i + 1].y - minGap;
                    }
                }
            }
        }

        const labelMap = new Map();
        endLabels.forEach(lbl => labelMap.set(lbl.lineId, lbl));

        // Render series
        series.forEach((s, sIdx) => {
            const lineId = s.id || `series-${sIdx}`;
            const points = s.data.map((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - ((val - yMin) / (yMax - yMin)) * plotHeight;
                return `${x},${y}`;
            }).join(' ');

            html += `
                <g class="chart-series-group" data-line-id="${lineId}">
                    <polyline points="${points}" stroke="${s.color}" stroke-width="3.5" fill="none" class="chart-line" />
            `;

            s.data.forEach((val, idx) => {
                const x = margin.left + idx * xStep;
                const y = margin.top + plotHeight - ((val - yMin) / (yMax - yMin)) * plotHeight;
                const valDisplay = yFormat(val);
                html += `
                    <circle cx="${x}" cy="${y}" r="4.5" fill="${s.color}" stroke="#ffffff" stroke-width="1.5" class="chart-dot" data-label="${s.name} (${xCategories[idx] || ''})" data-val="${valDisplay}" />
                `;
            });

            // Collision-free End line label
            const labelInfo = labelMap.get(lineId);
            if (labelInfo) {
                html += `
                    <text x="${labelInfo.origX + 8}" y="${labelInfo.y + 4}" fill="${labelInfo.color}" font-size="12" font-weight="700" class="chart-end-label">${labelInfo.name}</text>
                `;
            }
            html += `</g>`;
        });

        html += `
                </svg>
            </div>
        `;

        container.innerHTML = html;
        this.bindLineChartEvents(container, tooltipId);
    }

    /**
     * Reusable Pie Chart Grid
     */
    renderPieChartGrid(container, config) {
        const {
            mainTitle = '',
            legendItems = [],
            pies = [] // [{ title, primaryPct, secondaryPct, primaryLabel, secondaryLabel, primaryColor, secondaryColor }]
        } = config;

        let html = `
            <div class="ielts-chart-header">
                <h4 class="ielts-chart-title">${mainTitle}</h4>
                <div class="ielts-chart-legend">
        `;

        legendItems.forEach(leg => {
            html += `
                <div class="ielts-legend-item">
                    <span class="ielts-legend-color" style="background:${leg.color};"></span>
                    <span>${leg.label}</span>
                </div>
            `;
        });

        html += `
                </div>
            </div>
            <div style="display:flex; justify-content:space-around; align-items:center; width:100%; padding:10px 0;">
        `;

        pies.forEach(pie => {
            const angle = (pie.primaryPct / 100) * 360;
            const rad = (angle * Math.PI) / 180;
            const R = 80;
            const cx = 100;
            const cy = 100;
            const endX = cx + R * Math.sin(rad);
            const endY = cy - R * Math.cos(rad);
            const largeArc = pie.primaryPct > 50 ? 1 : 0;

            html += `
                <div style="display:flex; flex-direction:column; align-items:center; text-align:center;">
                    <div style="font-weight:700; font-size:16.5px; color:#1e293b; margin-bottom:8px;">${pie.title}</div>
                    <svg viewBox="0 0 200 200" style="width:190px; height:190px;">
                        <!-- Primary Arc -->
                        <path d="M ${cx},${cy} L ${cx},${cy - R} A ${R},${R} 0 ${largeArc},1 ${endX.toFixed(2)},${endY.toFixed(2)} Z" fill="${pie.primaryColor || '#0284c7'}" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Secondary Arc -->
                        <path d="M ${cx},${cy} L ${endX.toFixed(2)},${endY.toFixed(2)} A ${R},${R} 0 ${1 - largeArc},1 ${cx},${cy - R} Z" fill="${pie.secondaryColor || '#ea580c'}" stroke="#ffffff" stroke-width="2.5" />
                        <!-- Labels -->
                        <text x="${pie.primaryTextX || 100}" y="${pie.primaryTextY || 115}" fill="#ffffff" font-size="22" font-weight="800" text-anchor="middle">${pie.primaryPct}%</text>
                        <text x="${pie.secondaryTextX || 83}" y="${pie.secondaryTextY || 48}" fill="#ffffff" font-size="15" font-weight="800" text-anchor="middle">${pie.secondaryPct}%</text>
                    </svg>
                    <div style="display:flex; gap:16px; margin-top:8px; font-size:14px; font-weight:700;">
                        <span style="color:${pie.primaryColor || '#0284c7'};">■ ${pie.primaryLabel}: ${pie.primaryPct}%</span>
                        <span style="color:${pie.secondaryColor || '#ea580c'};">■ ${pie.secondaryLabel}: ${pie.secondaryPct}%</span>
                    </div>
                </div>
            `;
        });

        html += `</div>`;
        container.innerHTML = html;
    }

    /**
     * Tooltip & Interactive Legends Bindings
     */
    bindBarChartEvents(container, tooltipId) {
        const tooltip = container.querySelector(`#${tooltipId}`);
        const barGroups = container.querySelectorAll('.chart-bar-group');
        const legendItems = container.querySelectorAll('.ielts-legend-item');

        barGroups.forEach(grp => {
            grp.addEventListener('mouseenter', (e) => {
                const label = grp.dataset.label;
                const val = grp.dataset.val;
                if (!tooltip) return;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = grp.querySelector('rect').getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            grp.addEventListener('mouseleave', () => {
                if (tooltip) tooltip.classList.remove('show');
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
                if (!tooltip) return;
                tooltip.textContent = `${label}: ${val}`;
                tooltip.classList.add('show');

                const rect = dot.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();
                tooltip.style.left = `${rect.left - containerRect.left + rect.width / 2}px`;
                tooltip.style.top = `${rect.top - containerRect.top}px`;
            });

            dot.addEventListener('mouseleave', () => {
                if (tooltip) tooltip.classList.remove('show');
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
