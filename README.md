# Expert IELTS Interactive Presentations

Interactive, animation-rich, 16:9 HTML slide presentations designed for IELTS Academic & General Training preparation courses.

---

## 📁 Repository Structure

```
├── presentation-base.css          # Universal stylesheet for all presentations
├── presentation_creation_guide.md # Comprehensive guide for creating new modules
├── reading_passages_and_questions_guide.md
├── js/                            # Universal modular presentation engine
│   ├── deck-engine.js             # Master bundle & loader
│   ├── deck-components.js         # Auto-hydrates vertical tabs & HUD
│   ├── reading-highlighter.js     # Evidence & synonym synchronization
│   ├── reading-grounder.js        # Synonym tags & hover sync
│   ├── vocab-bank.js              # Click-to-fill chips & pronunciation
│   ├── essay-analyzer.js          # Cohesion & linking word highlighting
│   ├── progress-tracker.js        # Session persistence & score dashboard
│   ├── slide-navigator.js         # Slide Grid search overlay (G key)
│   ├── presentation-spotlight.js  # Focus screen mutes (B / W / S keys)
│   ├── flashcard-engine.js        # 3D interactive flip cards
│   ├── print-optimizer.js         # Multi-page handout PDF export (Ctrl+P)
│   └── presentation-tools.js      # Timer, laser pointer, annotation pen
├── expert 5/                      # Expert IELTS Level 5 Course Modules
│   ├── module-04.html             # Module 4: The Mind
│   ├── module-05.html             # Module 5: The World Around Us
│   ├── module-06.html             # Module 6: Communication
│   ├── module-07.html             # Module 7: City Life & Public Spaces
│   ├── module-08.html             # Module 8: Activity — Sport & Work and Play
│   ├── module-09.html             # Module 9: Media — The News & Technology
│   └── module-10.html             # Module 10: Communicating — Being Understood & Understanding Others
├── expert 6/                      # Expert IELTS Level 6 Course Modules
└── expert 7.5/                    # Expert IELTS Level 7.5 Course Modules
```

---

## ⌨️ Teacher Shortcuts & Controls

| Shortcut | Function | Description |
| :---: | :--- | :--- |
| <kbd>→</kbd> / <kbd>Space</kbd> | Next Slide | Advance presentation |
| <kbd>←</kbd> | Previous Slide | Return to previous slide |
| <kbd>G</kbd> | Slide Grid Navigator | Fullscreen slide overview with instant topic search |
| <kbd>T</kbd> | Classroom Timer | Countdown timer (1m, 2m, 5m, 10m) with alert chime |
| <kbd>L</kbd> | Laser Pointer | Glowing red pointer cursor |
| <kbd>P</kbd> / <kbd>C</kbd> | Pen Annotation / Clear | Draw live sketches or underline text on screen |
| <kbd>Shift+T</kbd> | Theme Switcher | Cycle live between 6 aesthetic typography & atmosphere presets |
| <kbd>B</kbd> / <kbd>W</kbd> | Blackout / Whiteout | Pitch black or white screen to focus attention |
| <kbd>S</kbd> | Spotlight Dimmer | Highlights circular area around the mouse cursor |
| <kbd>+</kbd> / <kbd>−</kbd> / <kbd>0</kbd> | Font Zoom | Zoom text between 75% and 150% |
| <kbd>F</kbd> | Fullscreen | Toggle fullscreen mode |
| <kbd>Ctrl+P</kbd> | PDF Export | Reconfigures slides into multi-page printable handouts |
| <kbd>?</kbd> / <kbd>H</kbd> | Shortcuts Help | Opens keyboard shortcuts cheatsheet |

---

## 📖 Creating New Modules

Refer to [`presentation_creation_guide.md`](./presentation_creation_guide.md) for the starter boilerplate and complete slide recipes.
