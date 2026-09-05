/**
 * ==========================================================================
 * DECK THEME ENGINE (Frontend Slides Aesthetics System)
 * Provides 6 pre-filled distinctive theme presets, typography pairings,
 * live theme switcher modal, and keyboard shortcuts (Shift+T to cycle).
 * ==========================================================================
 */

class DeckThemeEngine {
    constructor() {
        this.STORAGE_KEY = 'deck_theme_preset';
        this.themes = [
    {
        "id": "academic",
        "name": "Academic Editorial",
        "category": "Editorial",
        "displayFont": "Playfair Display",
        "bodyFont": "DM Sans",
        "icon": "🎓",
        "desc": "Classic authoritative Oxford serif headers with scholarly navy and amber rule lines.",
        "previewBg": "linear-gradient(135deg, #1e3a8a, #0b1120)",
        "palette": [
            "#1e3a8a",
            "#ea580c",
            "#f8fafc"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M24 6l18 9-18 9L6 15z\"/><path d=\"M12 18v12c0 6 5.37 11 12 11s12-5 12-11V18\"/><path d=\"M42 16v14\"/><circle cx=\"42\" cy=\"32\" r=\"2\" fill=\"currentColor\"/><path d=\"M18 27c1.5 2 3.8 3 6 3s4.5-1 6-3\"/></svg>"
    },
    {
        "id": "monograph",
        "name": "Scholarly Monograph",
        "category": "Editorial",
        "displayFont": "Cinzel",
        "bodyFont": "Plus Jakarta Sans",
        "icon": "📜",
        "desc": "Deep scholarly charcoal ink, Roman inscriptional headers, and warm antique paper.",
        "previewBg": "linear-gradient(135deg, #334155, #0f172a)",
        "palette": [
            "#334155",
            "#d97706",
            "#fdfcf7"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M38 6c-8 2-14 9-16 19l-8 8c-2 2-3 5-3 5s3-1 5-3l8-8c10-2 17-8 19-16\"/><path d=\"M11 38l-4 4\"/><path d=\"M6 34c6 0 11-2 16-6\"/><path d=\"M26 14c-4 0-7 2-10 6\"/></svg>"
    },
    {
        "id": "broadside",
        "name": "Editorial Broadsheet",
        "category": "Editorial",
        "displayFont": "Playfair Display",
        "bodyFont": "DM Sans",
        "icon": "📰",
        "desc": "High-contrast Victorian newspaper headline typography with crisp editorial column rules.",
        "previewBg": "linear-gradient(135deg, #09090b, #27272a)",
        "palette": [
            "#09090b",
            "#dc2626",
            "#f8f9fa"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"6\" y=\"6\" width=\"36\" height=\"36\" rx=\"2\"/><path d=\"M12 12h24\"/><path d=\"M12 18h24\"/><path d=\"M12 24h10\"/><path d=\"M12 28h10\"/><path d=\"M12 32h10\"/><rect x=\"26\" y=\"24\" width=\"10\" height=\"12\" fill=\"currentColor\" opacity=\"0.2\"/></svg>"
    },
    {
        "id": "botanical",
        "name": "Dark Botanical",
        "category": "Editorial",
        "displayFont": "Cormorant Garamond",
        "bodyFont": "Plus Jakarta Sans",
        "icon": "🌿",
        "desc": "Refined literary luxury with organic sage, forest foliage accents, and Garamond serifs.",
        "previewBg": "linear-gradient(135deg, #064e3b, #061a14)",
        "palette": [
            "#064e3b",
            "#10b981",
            "#f5f7f4"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 40c12-4 22-14 26-26\"/><path d=\"M34 14c4-8 8-10 8-10s-2 4-10 8c-4 2-5 6-4 8 2 1 6 0 8-4z\"/><path d=\"M22 25c-4-4-5-8-5-8s4 1 8 5c3 3 3 6 1 7s-3 0-4-4z\"/><path d=\"M14 33c-3-3-4-6-4-6s3 1 6 4c2 2 2 4 1 5s-2 0-3-3z\"/><circle cx=\"28\" cy=\"20\" r=\"2\" fill=\"currentColor\"/><circle cx=\"20\" cy=\"28\" r=\"2\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "vellum",
        "name": "Illuminated Vellum",
        "category": "Editorial",
        "displayFont": "Cinzel",
        "bodyFont": "Plus Jakarta Sans",
        "icon": "🕯️",
        "desc": "Dark manuscript parchment with burnished gold foil accents and illuminated drop caps.",
        "previewBg": "linear-gradient(135deg, #b45309, #14110f)",
        "palette": [
            "#d97706",
            "#b45309",
            "#14110f"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"24\" r=\"16\"/><circle cx=\"24\" cy=\"24\" r=\"11\" stroke-dasharray=\"3 3\"/><path d=\"M24 14v20\"/><path d=\"M14 24h20\"/><path d=\"M18 18l12 12\"/><path d=\"M18 30l12-12\"/><circle cx=\"24\" cy=\"24\" r=\"4\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "terracotta",
        "name": "Tuscan Terracotta",
        "category": "Editorial",
        "displayFont": "Playfair Display",
        "bodyFont": "Outfit",
        "icon": "🏺",
        "desc": "Warm sun-baked Tuscan earthenware with Mediterranean rust, olive, and warm cream cards.",
        "previewBg": "linear-gradient(135deg, #c2410c, #431407)",
        "palette": [
            "#c2410c",
            "#ea580c",
            "#faf6f0"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 8h12\"/><path d=\"M20 8v4c0 3-4 6-6 10s-2 8 2 12 10 6 16 0 2-8-2-12-6-7-6-10V8\"/><path d=\"M13 18c-3 1-5 4-5 7s2 5 5 5\"/><path d=\"M35 18c3 1 5 4 5 7s-2 5-5 5\"/><path d=\"M18 40h12\"/></svg>"
    },
    {
        "id": "slate-archive",
        "name": "Slate Archive",
        "category": "Editorial",
        "displayFont": "Cinzel",
        "bodyFont": "DM Sans",
        "icon": "🏛️",
        "desc": "Archival stone and slate grey with silver metallic divider lines and classic Roman headers.",
        "previewBg": "linear-gradient(135deg, #475569, #0f172a)",
        "palette": [
            "#475569",
            "#94a3b8",
            "#f8fafc"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M8 10h32\"/><path d=\"M12 10c0-3 3-4 6-4s6 1 6 4\"/><path d=\"M24 10c0-3 3-4 6-4s6 1 6 4\"/><path d=\"M14 10v26\"/><path d=\"M20 10v26\"/><path d=\"M28 10v26\"/><path d=\"M34 10v26\"/><path d=\"M8 36h32\"/><path d=\"M6 40h36\"/></svg>"
    },
    {
        "id": "editorial-forest",
        "name": "Forest Editorial",
        "category": "Editorial",
        "displayFont": "Cormorant Garamond",
        "bodyFont": "DM Sans",
        "icon": "🌲",
        "desc": "Deep alpine pine green with subtle coniferous tree watermark and crisp editorial hierarchy.",
        "previewBg": "linear-gradient(135deg, #14532d, #052e16)",
        "palette": [
            "#14532d",
            "#16a34a",
            "#f4f7f4"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M24 6l-9 12h5l-7 11h6l-6 11h22l-6-11h6l-7-11h5z\"/><path d=\"M24 40v6\"/><path d=\"M10 44c4-3 9-4 14-4s10 1 14 4\"/></svg>"
    },
    {
        "id": "soft-editorial",
        "name": "Soft Editorial",
        "category": "Editorial",
        "displayFont": "Cormorant Garamond",
        "bodyFont": "Outfit",
        "icon": "🌸",
        "desc": "Warm almond paper with sage, blush rose, and elegant editorial serifs.",
        "previewBg": "linear-gradient(135deg, #059669, #e11d48)",
        "palette": [
            "#059669",
            "#e11d48",
            "#fbf8f5"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"24\" r=\"5\" fill=\"currentColor\"/><circle cx=\"24\" cy=\"13\" r=\"6\"/><circle cx=\"35\" cy=\"24\" r=\"6\"/><circle cx=\"24\" cy=\"35\" r=\"6\"/><circle cx=\"13\" cy=\"24\" r=\"6\"/><path d=\"M24 24l16 16\"/></svg>"
    },
    {
        "id": "bold-signal",
        "name": "Bold Signal",
        "category": "Brutalist",
        "displayFont": "Space Grotesk",
        "bodyFont": "Plus Jakarta Sans",
        "icon": "⚡",
        "desc": "High-voltage signal crimson with caution yellow accents and pitch-black slab borders.",
        "previewBg": "linear-gradient(135deg, #e11d48, #09090b)",
        "palette": [
            "#e11d48",
            "#facc15",
            "#09090b"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M26 4l-14 22h14l-4 18 18-24H26z\"/><path d=\"M6 10l8-8\"/><path d=\"M6 22l14-14\"/><path d=\"M6 34l20-20\"/></svg>"
    },
    {
        "id": "swiss-ikb",
        "name": "Swiss Klein Blue",
        "category": "Brutalist",
        "displayFont": "Space Grotesk",
        "bodyFont": "Plus Jakarta Sans",
        "icon": "📐",
        "desc": "International Klein Blue (#002FA7) with strict Swiss grid alignment crosshairs.",
        "previewBg": "linear-gradient(135deg, #002fa7, #090d16)",
        "palette": [
            "#002fa7",
            "#2563eb",
            "#ffffff"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"24\" r=\"16\"/><line x1=\"24\" y1=\"4\" x2=\"24\" y2=\"44\"/><line x1=\"4\" y1=\"24\" x2=\"44\" y2=\"24\"/><rect x=\"20\" y=\"20\" width=\"8\" height=\"8\" fill=\"currentColor\"/><path d=\"M12 6h4\"/><path d=\"M12 42h4\"/><path d=\"M6 12v4\"/><path d=\"M42 12v4\"/></svg>"
    },
    {
        "id": "bauhaus-bold",
        "name": "Bauhaus Geometric",
        "category": "Brutalist",
        "displayFont": "Space Grotesk",
        "bodyFont": "Outfit",
        "icon": "🟥",
        "desc": "Primary geometric trinity (cadmium red, cobalt blue, yellow triangle) with stark contrast.",
        "previewBg": "linear-gradient(135deg, #dc2626, #2563eb)",
        "palette": [
            "#dc2626",
            "#2563eb",
            "#eab308"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"16\" cy=\"18\" r=\"10\" fill=\"#dc2626\" opacity=\"0.6\"/><rect x=\"22\" y=\"16\" width=\"18\" height=\"18\" fill=\"#2563eb\" opacity=\"0.6\"/><path d=\"M18 42l12-20 12 20z\" fill=\"#eab308\" opacity=\"0.7\"/></svg>"
    },
    {
        "id": "cyber-punch",
        "name": "Cyber Punch",
        "category": "Brutalist",
        "displayFont": "Syne",
        "bodyFont": "Plus Jakarta Sans",
        "icon": "💥",
        "desc": "Hot neon magenta against carbon panels with comic action explosion burst motif.",
        "previewBg": "linear-gradient(135deg, #ec4899, #080b14)",
        "palette": [
            "#ec4899",
            "#06b6d4",
            "#0f172a"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M24 4l5 12 13-3-6 12 12 5-13 5 3 13-12-6-5 12-5-12-12 6 3-13-13-5 12-5-6-12 13 3z\" fill=\"currentColor\" opacity=\"0.3\"/><circle cx=\"24\" cy=\"24\" r=\"6\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "neomorphism",
        "name": "Tactile Neomorphism",
        "category": "Brutalist",
        "displayFont": "Plus Jakarta Sans",
        "bodyFont": "DM Sans",
        "icon": "🎛️",
        "desc": "Soft debossed rotary dials, physical toggle switches, and 3D tactile elevation.",
        "previewBg": "linear-gradient(135deg, #6366f1, #1e1b4b)",
        "palette": [
            "#6366f1",
            "#818cf8",
            "#f1f5f9"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"24\" r=\"16\"/><circle cx=\"24\" cy=\"24\" r=\"10\" fill=\"currentColor\" opacity=\"0.2\"/><line x1=\"24\" y1=\"14\" x2=\"24\" y2=\"20\" stroke-width=\"3\"/><circle cx=\"24\" cy=\"8\" r=\"2\" fill=\"currentColor\"/><circle cx=\"40\" cy=\"24\" r=\"2\" fill=\"currentColor\"/><circle cx=\"8\" cy=\"24\" r=\"2\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "stencil-tablet",
        "name": "Industrial Stencil",
        "category": "Brutalist",
        "displayFont": "Syne",
        "bodyFont": "Space Grotesk",
        "icon": "🏷️",
        "desc": "Heavy industrial crate stencil serial numbers with chamfered corners and hex bolt hardware.",
        "previewBg": "linear-gradient(135deg, #0284c7, #0f172a)",
        "palette": [
            "#0284c7",
            "#38bdf8",
            "#0f172a"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"6\" y=\"10\" width=\"36\" height=\"28\" rx=\"4\"/><path d=\"M14 18h6v12h-6\"/><path d=\"M28 18h6v12h-6\"/><circle cx=\"10\" cy=\"14\" r=\"1.5\" fill=\"currentColor\"/><circle cx=\"38\" cy=\"14\" r=\"1.5\" fill=\"currentColor\"/><circle cx=\"10\" cy=\"34\" r=\"1.5\" fill=\"currentColor\"/><circle cx=\"38\" cy=\"34\" r=\"1.5\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "electric",
        "name": "Electric Studio",
        "category": "Cyber",
        "displayFont": "Manrope",
        "bodyFont": "Outfit",
        "icon": "💎",
        "desc": "Cyberpunk dark obsidian studio with glowing cyan circuit traces and diamond microprocessor.",
        "previewBg": "linear-gradient(135deg, #0284c7, #030712)",
        "palette": [
            "#0284c7",
            "#38bdf8",
            "#090d16"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"16\" y=\"16\" width=\"16\" height=\"16\" rx=\"2\" fill=\"currentColor\" opacity=\"0.3\"/><line x1=\"24\" y1=\"4\" x2=\"24\" y2=\"16\"/><line x1=\"24\" y1=\"32\" x2=\"24\" y2=\"44\"/><line x1=\"4\" y1=\"24\" x2=\"16\" y2=\"24\"/><line x1=\"32\" y1=\"24\" x2=\"44\" y2=\"24\"/><circle cx=\"24\" cy=\"4\" r=\"2\" fill=\"currentColor\"/><circle cx=\"24\" cy=\"44\" r=\"2\" fill=\"currentColor\"/><circle cx=\"4\" cy=\"24\" r=\"2\" fill=\"currentColor\"/><circle cx=\"44\" cy=\"24\" r=\"2\" fill=\"currentColor\"/><path d=\"M10 10l6 6\"/><path d=\"M38 38l-6-6\"/><circle cx=\"10\" cy=\"10\" r=\"2\" fill=\"currentColor\"/><circle cx=\"38\" cy=\"38\" r=\"2\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "voltage",
        "name": "Creative Voltage",
        "category": "Cyber",
        "displayFont": "Syne",
        "bodyFont": "Space Grotesk",
        "icon": "🚀",
        "desc": "Dual jagged electric arc lightning discharge vectors with glowing purple accents.",
        "previewBg": "linear-gradient(135deg, #3b0764, #090514)",
        "palette": [
            "#a855f7",
            "#c084fc",
            "#0b0617"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M28 4l-16 22h14l-4 18 18-24H26z\"/><path d=\"M38 12c4 4 6 9 6 15\"/><path d=\"M4 27c0-6 2-11 6-15\"/><circle cx=\"24\" cy=\"24\" r=\"20\" stroke-dasharray=\"4 4\" stroke-width=\"1.5\"/></svg>"
    },
    {
        "id": "neon-tokyo",
        "name": "Neon Tokyo",
        "category": "Cyber",
        "displayFont": "Space Grotesk",
        "bodyFont": "Outfit",
        "icon": "🏮",
        "desc": "Midnight Tokyo rain aesthetic with glowing Japanese cyber lanterns and neon pink/cyan signs.",
        "previewBg": "linear-gradient(135deg, #f43f5e, #070a13)",
        "palette": [
            "#f43f5e",
            "#06b6d4",
            "#070a13"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M18 8h12\"/><path d=\"M14 14h20\"/><rect x=\"16\" y=\"14\" width=\"16\" height=\"24\" rx=\"6\" fill=\"currentColor\" opacity=\"0.3\"/><line x1=\"24\" y1=\"8\" x2=\"24\" y2=\"14\"/><line x1=\"24\" y1=\"38\" x2=\"24\" y2=\"44\"/><line x1=\"20\" y1=\"22\" x2=\"28\" y2=\"22\"/><line x1=\"20\" y1=\"28\" x2=\"28\" y2=\"28\"/><circle cx=\"24\" cy=\"44\" r=\"2\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "terminal-green",
        "name": "Phosphor CRT Terminal",
        "category": "Cyber",
        "displayFont": "JetBrains Mono",
        "bodyFont": "JetBrains Mono",
        "icon": "📟",
        "desc": "Vintage CRT computer monitor with glowing green phosphor prompt >_ and scanline raster.",
        "previewBg": "linear-gradient(135deg, #22c55e, #030a05)",
        "palette": [
            "#22c55e",
            "#4ade80",
            "#030a05"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"4\" y=\"8\" width=\"40\" height=\"32\" rx=\"4\"/><line x1=\"4\" y1=\"16\" x2=\"44\" y2=\"16\"/><path d=\"M12 24l5 4-5 4\"/><line x1=\"22\" y1=\"32\" x2=\"30\" y2=\"32\" stroke-width=\"3\"/></svg>"
    },
    {
        "id": "midnight-monochrome",
        "name": "OLED Monochrome",
        "category": "Cyber",
        "displayFont": "Plus Jakarta Sans",
        "bodyFont": "DM Sans",
        "icon": "🌑",
        "desc": "Pure OLED deep pitch black with ultra-clean silver monochrome and celestial lunar eclipse.",
        "previewBg": "linear-gradient(135deg, #334155, #000000)",
        "palette": [
            "#f8fafc",
            "#94a3b8",
            "#000000"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M36 28A16 16 0 1 1 20 12a13 13 0 0 0 16 16z\" fill=\"currentColor\" opacity=\"0.3\"/><circle cx=\"24\" cy=\"24\" r=\"20\" stroke-dasharray=\"2 4\"/><circle cx=\"34\" cy=\"14\" r=\"2\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "synthwave-84",
        "name": "Synthwave Sunset",
        "category": "Cyber",
        "displayFont": "Syne",
        "bodyFont": "Space Grotesk",
        "icon": "🌅",
        "desc": "Retro 80s perspective wireframe grid horizon with segmented vector neon sun.",
        "previewBg": "linear-gradient(135deg, #d946ef, #180b2a)",
        "palette": [
            "#f97316",
            "#d946ef",
            "#180b2a"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"20\" r=\"14\" fill=\"currentColor\" opacity=\"0.3\"/><line x1=\"10\" y1=\"20\" x2=\"38\" y2=\"20\"/><line x1=\"12\" y1=\"24\" x2=\"36\" y2=\"24\"/><line x1=\"4\" y1=\"32\" x2=\"44\" y2=\"32\"/><line x1=\"2\" y1=\"44\" x2=\"46\" y2=\"44\"/><line x1=\"8\" y1=\"32\" x2=\"4\" y2=\"44\"/><line x1=\"16\" y1=\"32\" x2=\"14\" y2=\"44\"/><line x1=\"24\" y1=\"32\" x2=\"24\" y2=\"44\"/><line x1=\"32\" y1=\"32\" x2=\"34\" y2=\"44\"/><line x1=\"40\" y1=\"32\" x2=\"44\" y2=\"44\"/></svg>"
    },
    {
        "id": "8-bit-orbit",
        "name": "8-Bit Orbit Arcade",
        "category": "Cyber",
        "displayFont": "Press Start 2P",
        "bodyFont": "JetBrains Mono",
        "icon": "👾",
        "desc": "CRT pixel-art space invader UFO arcade sprite with stepped pixel borders and retro cyan glow.",
        "previewBg": "linear-gradient(135deg, #00ffcc, #09101f)",
        "palette": [
            "#00ffcc",
            "#22c55e",
            "#09101f"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"currentColor\"><path d=\"M18 6h12v4H18zM10 10h4v6h-4zM34 10h4v6h-4zM10 16h28v10H10zM6 22h4v8H6zM38 22h4v8h-4zM14 26h4v4h-4zM30 26h4v4h-4zM14 36h6v6h-6zM28 36h6v6h-6zM10 32h4v4h-4zM34 32h4v4h-4z\"/></svg>"
    },
    {
        "id": "dark",
        "name": "Carbon Stealth",
        "category": "Cyber",
        "displayFont": "Plus Jakarta Sans",
        "bodyFont": "DM Sans",
        "icon": "🌙",
        "desc": "Sleek carbon dark matte panels with subtle blue glowing borders and faceted diamond shield.",
        "previewBg": "linear-gradient(135deg, #1e293b, #030712)",
        "palette": [
            "#38bdf8",
            "#64748b",
            "#030712"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><polygon points=\"24 4 42 14 42 34 24 44 6 34 6 14\" fill=\"currentColor\" opacity=\"0.2\"/><polygon points=\"24 12 34 18 34 30 24 36 14 30 14 18\"/><circle cx=\"24\" cy=\"24\" r=\"3\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "vintage",
        "name": "Vintage Manuscript",
        "category": "Retro",
        "displayFont": "Bodoni Moda",
        "bodyFont": "DM Sans",
        "icon": "📜",
        "desc": "Aged sepia ledger paper with circular postal cancellation date stamp and antique wax seal.",
        "previewBg": "linear-gradient(135deg, #78350f, #291c13)",
        "palette": [
            "#78350f",
            "#b45309",
            "#fbf8f1"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"24\" r=\"18\" stroke-dasharray=\"5 3\"/><circle cx=\"24\" cy=\"24\" r=\"13\"/><path d=\"M15 20h18\"/><path d=\"M15 28h18\"/><path d=\"M24 16v16\"/><path d=\"M38 20c2 2 4 2 6 0\"/><path d=\"M38 24c2 2 4 2 6 0\"/><path d=\"M38 28c2 2 4 2 6 0\"/></svg>"
    },
    {
        "id": "notebook",
        "name": "Spiral Notepad",
        "category": "Retro",
        "displayFont": "DM Sans",
        "bodyFont": "DM Sans",
        "icon": "📓",
        "desc": "Spiral wire binding rings, ruled paper lines, and vertical red notebook margin guide.",
        "previewBg": "linear-gradient(135deg, #2563eb, #1e293b)",
        "palette": [
            "#2563eb",
            "#ef4444",
            "#fdfdfb"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"10\" y=\"6\" width=\"30\" height=\"36\" rx=\"3\"/><line x1=\"18\" y1=\"6\" x2=\"18\" y2=\"42\" stroke=\"#ef4444\"/><circle cx=\"10\" cy=\"12\" r=\"3\" fill=\"currentColor\"/><circle cx=\"10\" cy=\"20\" r=\"3\" fill=\"currentColor\"/><circle cx=\"10\" cy=\"28\" r=\"3\" fill=\"currentColor\"/><circle cx=\"10\" cy=\"36\" r=\"3\" fill=\"currentColor\"/><line x1=\"22\" y1=\"16\" x2=\"34\" y2=\"16\"/><line x1=\"22\" y1=\"24\" x2=\"34\" y2=\"24\"/><line x1=\"22\" y1=\"32\" x2=\"34\" y2=\"32\"/></svg>"
    },
    {
        "id": "blueprint",
        "name": "Technical Blueprint",
        "category": "Retro",
        "displayFont": "Space Grotesk",
        "bodyFont": "JetBrains Mono",
        "icon": "📐",
        "desc": "Cyanotype blueprint grid with technical architect drafting compass and crosshairs.",
        "previewBg": "linear-gradient(135deg, #0284c7, #0a2342)",
        "palette": [
            "#38bdf8",
            "#0284c7",
            "#0a2342"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"24\" cy=\"10\" r=\"4\"/><path d=\"M22 14l-10 26\"/><path d=\"M26 14l10 26\"/><path d=\"M16 28h16\"/><line x1=\"24\" y1=\"24\" x2=\"24\" y2=\"32\"/><circle cx=\"24\" cy=\"24\" r=\"1\" fill=\"currentColor\"/></svg>"
    },
    {
        "id": "risograph-pop",
        "name": "Risograph Print",
        "category": "Retro",
        "displayFont": "Fraunces",
        "bodyFont": "Outfit",
        "icon": "🖨️",
        "desc": "Duotone halftone screen printing rosette texture with offset print registration crosshairs.",
        "previewBg": "linear-gradient(135deg, #ec4899, #1e1b4b)",
        "palette": [
            "#ec4899",
            "#3b82f6",
            "#fdfbf7"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><circle cx=\"20\" cy=\"20\" r=\"12\" fill=\"#ec4899\" opacity=\"0.4\"/><circle cx=\"28\" cy=\"28\" r=\"12\" fill=\"#3b82f6\" opacity=\"0.4\"/><circle cx=\"24\" cy=\"24\" r=\"18\" stroke-dasharray=\"2 4\"/><line x1=\"24\" y1=\"2\" x2=\"24\" y2=\"8\"/><line x1=\"24\" y1=\"40\" x2=\"24\" y2=\"46\"/><line x1=\"2\" y1=\"24\" x2=\"8\" y2=\"24\"/><line x1=\"40\" y1=\"24\" x2=\"46\" y2=\"24\"/></svg>"
    },
    {
        "id": "kraft-paper",
        "name": "Kraft Cardboard",
        "category": "Retro",
        "displayFont": "Fraunces",
        "bodyFont": "DM Sans",
        "icon": "📦",
        "desc": "Tactile craft packaging cardboard texture with vintage PRIORITY AIR MAIL rubber stamp.",
        "previewBg": "linear-gradient(135deg, #a35b2a, #2a1e13)",
        "palette": [
            "#a35b2a",
            "#78350f",
            "#e6d5bc"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><rect x=\"6\" y=\"8\" width=\"36\" height=\"32\" rx=\"2\"/><line x1=\"6\" y1=\"20\" x2=\"42\" y2=\"20\"/><path d=\"M16 28h16\"/><path d=\"M16 34h10\"/><circle cx=\"34\" cy=\"31\" r=\"4\" stroke-dasharray=\"2 2\"/></svg>"
    },
    {
        "id": "coral",
        "name": "Marine Coral",
        "category": "Retro",
        "displayFont": "Playfair Display",
        "bodyFont": "Outfit",
        "icon": "🪸",
        "desc": "Marine coral reef branch with oceanic wave ripples and warm coral/teal vibrancy.",
        "previewBg": "linear-gradient(135deg, #f97316, #0e2a38)",
        "palette": [
            "#f97316",
            "#06b6d4",
            "#fbf8f5"
        ],
        "svg": "<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 48 48\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.5\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M24 44v-14c0-6 4-10 8-14\"/><path d=\"M32 16v-8\"/><path d=\"M32 24c4-2 8-6 8-12\"/><path d=\"M24 30c-4-4-8-8-8-14v-8\"/><path d=\"M16 22c-3-2-6-5-6-10\"/><path d=\"M4 42c6-2 14-2 20 0s14 2 20 0\"/></svg>"
    }
];

        // Determine default or saved theme
        const pageKey = 'ielts_deck_theme_' + (window.location.pathname || 'global');
        let pageSaved = null;
        let globalSaved = null;
        try {
            pageSaved = localStorage.getItem(pageKey);
            globalSaved = localStorage.getItem(this.STORAGE_KEY);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }
        const docDefault = document.documentElement.getAttribute('data-theme') || 
                           document.body.getAttribute('data-theme');
        this.currentTheme = pageSaved || docDefault || globalSaved || 'academic';

        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme, false, false, false);

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.injectUI());
        } else {
            this.injectUI();
        }

        // Shortcut: Shift + T to cycle themes
        document.addEventListener('keydown', (e) => {
            if (e.shiftKey && (e.key === 'T' || e.key === 't') && !['INPUT', 'TEXTAREA'].includes(e.target.tagName)) {
                e.preventDefault();
                this.cycleTheme();
            }
        });
    }

    applyTheme(themeId, showToast = true, broadcast = true, persistPage = true) {
        const theme = this.themes.find(t => t.id === themeId) || this.themes[0];
        this.currentTheme = theme.id;
        
        document.documentElement.setAttribute('data-theme', theme.id);
        document.body.setAttribute('data-theme', theme.id);
        try {
            if (persistPage) {
                const pageKey = 'ielts_deck_theme_' + (window.location.pathname || 'global');
                localStorage.setItem(pageKey, theme.id);
            }
            localStorage.setItem(this.STORAGE_KEY, theme.id);
        } catch (e) {
            console.warn('localStorage unavailable:', e);
        }

        if (showToast) {
            this.showToast(`${theme.icon} Theme: ${theme.name} (${theme.displayFont} + ${theme.bodyFont})`);
        }

        if (broadcast && window.presenterSyncEngine) {
            window.presenterSyncEngine.emit('THEME_CHANGE', { themeId: theme.id });
        }

        // Update active state in modal if open
        document.querySelectorAll('.theme-card-option').forEach(card => {
            if (card.dataset.themeId === theme.id) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    cycleTheme() {
        const currentIndex = this.themes.findIndex(t => t.id === this.currentTheme);
        const nextIndex = (currentIndex + 1) % this.themes.length;
        this.applyTheme(this.themes[nextIndex].id, true);
    }

    showToast(message) {
        let toast = document.getElementById('themeToast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'themeToast';
            toast.className = 'theme-toast';
            document.body.appendChild(toast);
        }
        toast.textContent = message;
        toast.classList.add('visible');
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => {
            toast.classList.remove('visible');
        }, 2600);
    }

    injectUI() {
        if (document.getElementById('themePickerModal')) return;

        // Modal
        const modal = document.createElement('div');
        modal.id = 'themePickerModal';
        modal.className = 'theme-picker-modal';
        modal.style.display = 'none';

        const themeCards = this.themes.map(t => {
            const dotsHtml = (t.palette || []).map(c => `<span class="theme-palette-dot" style="background:${c};"></span>`).join('');
            return `
            <div class="theme-card-option ${t.id === this.currentTheme ? 'active' : ''}" 
                 data-theme-id="${t.id}" 
                 onclick="deckThemeEngine.applyTheme('${t.id}')">
                <div class="theme-preview-banner" style="background:${t.previewBg}">
                    <div class="theme-emblem">${t.svg || t.icon}</div>
                    <span class="theme-movement-tag">${t.category || 'Theme'}</span>
                    <div class="theme-palette-dots">${dotsHtml}</div>
                </div>
                <div class="theme-card-body">
                    <div class="theme-card-title">${t.icon} ${t.name}</div>
                    <div class="theme-card-fonts">${t.displayFont} + ${t.bodyFont}</div>
                    <div class="theme-card-desc">${t.desc}</div>
                </div>
            </div>
            `;
        }).join('');

        modal.innerHTML = `
            <div class="theme-modal-backdrop" onclick="deckThemeEngine.closeModal()"></div>
            <div class="theme-modal-dialog">
                <div class="theme-modal-header">
                    <div>
                        <h2>🎨 Presentation Aesthetic Themes</h2>
                        <p>Select a typography and atmosphere pairing (Shortcut: <kbd>Shift + T</kbd> to cycle live).</p>
                    </div>
                    <button class="theme-modal-close" onclick="deckThemeEngine.closeModal()">×</button>
                </div>
                <div class="theme-grid">
                    ${themeCards}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    openModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'flex';
    }

    closeModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal) modal.style.display = 'none';
    }

    toggleModal() {
        const modal = document.getElementById('themePickerModal');
        if (modal && modal.style.display === 'flex') {
            this.closeModal();
        } else {
            this.openModal();
        }
    }
}

// Global instantiation
window.deckThemeEngine = new DeckThemeEngine();
