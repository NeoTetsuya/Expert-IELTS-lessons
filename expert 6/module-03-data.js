/**
 * =========================================================================
 * Expert IELTS 6 — Module 3: Work & Study Lesson Dataset
 * Structured Curriculum, Reading Passages, Glossaries, Keys & Chart Configs
 * =========================================================================
 */

window.module3Data = {
    meta: {
        id: "module-03",
        level: "Expert 6",
        band: "Band 6.0 – 7.0",
        title: "Work & Study",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 27
    },

    // Chart Configuration Schemas for General Chart Engine
    charts: {
        degreeCosts: {
            title: "Average Cost of an Undergraduate Degree in 2015 (in US$)",
            categories: [
                { name: "UK", fees: 30000, living: 37000, total: 67000 },
                { name: "Australia", fees: 57000, living: 42000, total: 99000 },
                { name: "United States", fees: 56500, living: 32000, total: 88500 },
                { name: "Germany", fees: 13000, living: 41000, total: 54000 }
            ],
            series: [
                { id: "fees", name: "Study fees (3-year)", color: "#0284c7" },
                { id: "living", name: "Living costs (3-year)", color: "#dc2626" },
                { id: "total", name: "Total (3-year degree)", color: "#16a34a" }
            ],
            yMax: 120000,
            yStep: 20000,
            yFormat: (val) => `$${val.toLocaleString()}`
        },

        schoolPies: {
            mainTitle: "Public vs. Private Sector Schooling Distribution",
            legendItems: [
                { label: "Public Sector", color: "#0284c7" },
                { label: "Private Sector", color: "#ea580c" }
            ],
            pies: [
                {
                    title: "Number of students in schools",
                    primaryPct: 90,
                    secondaryPct: 10,
                    primaryLabel: "Public",
                    secondaryLabel: "Private",
                    primaryColor: "#0284c7",
                    secondaryColor: "#ea580c",
                    primaryTextX: 100,
                    primaryTextY: 115,
                    secondaryTextX: 76,
                    secondaryTextY: 28
                },
                {
                    title: "Number of schools",
                    primaryPct: 75,
                    secondaryPct: 25,
                    primaryLabel: "Public",
                    secondaryLabel: "Private",
                    primaryColor: "#0284c7",
                    secondaryColor: "#ea580c",
                    primaryTextX: 115,
                    primaryTextY: 125,
                    secondaryTextX: 55,
                    secondaryTextY: 65
                }
            ]
        },

        womensEarnings: {
            title: "Women's Weekly Earnings as a Percentage of Men's Wages (USA, 1975–2005)",
            xCategories: [1975, 1980, 1985, 1990, 1995, 2000, 2005],
            yMin: 50,
            yMax: 100,
            yStep: 10,
            yUnit: "%",
            series: [
                { id: "age-16-24", name: "16 to 24 years", color: "#e11d48", data: [78, 82, 89, 90, 91, 92, 92] },
                { id: "age-25-34", name: "25 to 34 years", color: "#0284c7", data: [67, 70, 75, 80, 83, 84, 89] },
                { id: "age-35-44", name: "35 to 44 years", color: "#16a34a", data: [59, 59, 64, 70, 73, 70, 74] },
                { id: "age-45-54", name: "45 to 54 years", color: "#9333ea", data: [57, 56, 60, 64, 67, 73, 75] }
            ]
        },

        educationIncome: {
            title: "Lifetime Earnings by Education Level (USA, in $ Millions)",
            data: [
                { label: "High School", value: 1.2, display: "$1.2M" },
                { label: "Associate's", value: 1.4, display: "$1.4M" },
                { label: "Bachelor's", value: 2.1, display: "$2.1M" },
                { label: "Master's", value: 2.5, display: "$2.5M" },
                { label: "Doctorate (PhD)", value: 3.4, display: "$3.4M" },
                { label: "Professional", value: 4.4, display: "$4.4M" }
            ],
            yMax: 5.0,
            yStep: 1.0,
            yFormat: (val) => `$${val.toFixed(1)}M`
        }
    }
};

// Auto-register chart datasets into global window scope for data-chart-config attributes
window.degreeCostChartConfig = window.module3Data.charts.degreeCosts;
window.schoolPieChartConfig = window.module3Data.charts.schoolPies;
window.womensEarningsChartConfig = window.module3Data.charts.womensEarnings;
window.educationIncomeChartConfig = window.module3Data.charts.educationIncome;
