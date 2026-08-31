/**
 * =========================================================================
 * Expert IELTS 6 — Module 1: Communication Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Charts
 * =========================================================================
 */

window.module1Data = {
    meta: {
        id: "module-01",
        level: "Expert 6",
        band: "Band 6.0 – 7.0",
        moduleNum: "01",
        title: "Communication",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 46,
        tags: [
            { text: "Reading 1a/1b", bg: "var(--col-reading)" },
            { text: "Grammar: Present & Past Tenses", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Media & Collocations", bg: "var(--col-vocab)" },
            { text: "Writing: Task 1 Line Charts & Overviews", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "1a", title: "Digital Camera Artefacts & Present Tenses", desc: "Matching Headings strategy, topic sentences, state verbs, and social media trends overview." },
            { num: "1b", title: "Online Reading Habits & Historical Past Tenses", desc: "Matching Headings, sentence completion, media vocabulary, and Cinema vs. DVD sales line chart report." },
            { num: "Review", title: "Module 1 Mastery Check", desc: "Self-assessment checklist across all core reading, grammar, vocabulary, and writing skills." }
        ]
    },

    // Chart Configuration Schemas for General Chart Engine (deck-charts.js)
    charts: {
        cinemaDvdSales: {
            title: "Income from Cinema Tickets & DVD Sales (2001–2010 in $US Billions)",
            xCategories: [2001, 2004, 2007, 2010],
            yMin: 0,
            yMax: 35,
            yStep: 5,
            yUnit: "bn",
            series: [
                { id: "intl-cinema", name: "International Cinema", color: "#2563eb", data: [11, 19, 24, 32] },
                { id: "intl-dvd", name: "International DVD", color: "#059669", data: [11.5, 18, 17, 22] },
                { id: "us-dvd", name: "US DVD Sales", color: "#ea580c", data: [20, 21, 19, 18] },
                { id: "us-cinema", name: "US Cinema", color: "#dc2626", data: [10, 10.5, 10.8, 11] }
            ]
        },

        friendshipReasons: {
            title: "Reasons for Making vs. Breaking Online Connections (%)",
            categories: [
                { name: "Real-life friends", starting: 75, ending: 5 },
                { name: "Shared interests", starting: 60, ending: 10 },
                { name: "Disliked posts", starting: 0, ending: 65 },
                { name: "Offensive comments", starting: 0, ending: 55 },
                { name: "Lost contact", starting: 20, ending: 45 }
            ],
            series: [
                { id: "starting", name: "Reasons to Start Friendship", color: "#2563eb" },
                { id: "ending", name: "Reasons to End Friendship", color: "#dc2626" }
            ],
            yMax: 80,
            yStep: 20,
            yFormat: (val) => `${val}%`
        }
    },

    // Reading 1a: That's Not a Ghost in Your Picture
    reading1a: {
        passage: `
            <h3>THAT’S NOT A GHOST IN YOUR PICTURE, IT’S JUST THE WAY YOUR DIGITAL CAMERA WORKS.</h3>
            <p><span class="para-tag">Para A</span> <strong>There has been a clear relationship between technological development over the years and a fascination with ‘ghost’ photography.</strong> Images of unexplained circles of light, ghostly mists and human-shaped images fill social media pages on the internet. The explanation is simple: few people realise how digital cameras work. The fact that an image only ‘appeared’ in the photo, but not real life, is not a sign of its ghostly origins. In fact, it is a perfectly normal part of digital photography. Scientists call them ‘photographic artefacts’, because they show things that only exist because it is a photograph. Put simply, contrary to popular belief, <mark class="evidence" id="ev-1a-a" data-q="1a-a"><span class="syn-pair-1" data-q="1a-a">things in photos look different from real life</span></mark>.</p>
            <p><span class="para-tag">Para B</span> <strong><mark class="evidence" id="ev-1a-b" data-q="1a-b"><span class="syn-pair-1" data-q="1a-b">The biggest cause of photographic artefacts is the contrast between how the ‘depth of field’ works in modern cameras and in the human eye.</span></mark></strong> This is because, although it is now possible to take excellent pictures of things <span class="syn-pair-2" data-q="1a-b">far away</span>, the quality of photos of objects that are <span class="syn-pair-2" data-q="1a-b">very near</span> is less accurate. Light causes these misrepresentations. The level of light never changes when humans stare at objects. However, this is not what happens with digital cameras. When a camera points at a light, the light becomes stronger and stronger. Orbs, which are perfect circles of light, are the most common photographic artefact and they are often the result of light reflecting off water or insects in the air near the camera.</p>
            <p><span class="para-tag">Para C</span> It is easy to see why humans see differently from digital cameras. <strong><mark class="evidence" id="ev-1a-c" data-q="1a-c">However, <span class="syn-pair-1" data-q="1a-c">digital cameras are also significantly different from the old film cameras</span>.</mark></strong> In many ways, digital cameras give less reliable results. For example, modern functions allow digital cameras to scan the image <span class="syn-pair-2" data-q="1a-c">more than once over a period of less than a second</span>, or to automatically select <span class="syn-pair-2" data-q="1a-c">how long the lens is open</span>. Generally this produces better photos, but if the camera moves during the photo, it may record multiple images, creating the appearance of ghostly forms. Ghostly mists often appear when the camera picks up the photographer’s own breath on a cold night when the lens is open for longer. This never happened with film cameras.</p>
            <p><span class="para-tag">Para D</span> <strong>Filming under certain conditions will often produce unusual light effects in digital prints.</strong> For instance, <mark class="evidence" id="ev-1a-d" data-q="1a-d"><span class="syn-pair-1" data-q="1a-d">glass often makes objects such as a light source behind the photographer appear in the printed photo</span></mark>. If the glass is clean, it may not be obvious that there was a window and all you see is an object that ‘wasn’t there when I took the photo’. A famous UFO photograph showed two clear bright saucer-shaped objects flying across a blue sky. Although very believable, it was, in fact, just a reflection of some streetlights behind the photographer.</p>
            <p><span class="para-tag">Para E</span> <strong>Most digital cameras come with a good zoom function, letting us take photos from far away.</strong> However, at some point, digital cameras can no longer produce clear images anymore. <mark class="evidence" id="ev-1a-e" data-q="1a-e"><span class="syn-pair-1" data-q="1a-e">As you go nearer, instead of seeing the image as a continuous picture, the digital image becomes pixelated</span></mark>, which means it appears as a group of coloured rectangles. What you see in print is very different from the object in real life, and the purest example of an artefact of the pixellation process. As humans, we specialise in recognising faces or familiar things in random patterns, and may start to imagine things that were not there. In one case, an image with the physical appearance of a ghostly face in a red top appeared in a photo. Zoom out, and it looks more like a doll. Zoom out further, where the camera can cope with the amount of information it receives, and you can see it’s actually a rope holding up a flag.</p>
            <p><span class="para-tag">Para F</span> <strong>A final group of photos have started appearing on the internet.</strong> <mark class="evidence" id="ev-1a-f" data-q="1a-f"><span class="syn-pair-1" data-q="1a-f">Fakes, images created by computer, are not as common on internet sites as you’d imagine, even though it’s possible to produce believable images with photo-editing software.</span></mark> Many smartphones contain apps which make it very easy to produce versions of photos with human forms added. Most of these are easy to spot.</p>
            <p><span class="para-tag">Para G</span> <strong>In considering photographic artefacts, it is necessary to also consider the story.</strong> In many cases, the ghostly nature depends entirely on the fact that the photographer’s claim ‘that wasn’t there when I took the photo’. Often the unexpected appearance of an orb or mist in a photo leads the owner to make enquiries, and once they start to share information with people who believe the place or area to be haunted, they become aware of the possibility that the story could be true. <mark class="evidence" id="ev-1a-g" data-q="1a-g">Such photos <span class="syn-pair-1" data-q="1a-g">end up relying on witness statements to support the claims, which are often unreliable</span></mark>. One thing is sure: ghostly images will continue to appear until smart phone technology moves on.</p>
        `,
        headings: [
            { roman: "i", text: "When you have to learn more from the photographer" },
            { roman: "ii", text: "Not an exact copy of what we see" },
            { roman: "iii", text: "One material that always creates difficulties" },
            { roman: "iv", text: "Web companies that cheat customers" },
            { roman: "v", text: "Altering images to deceive the viewer" },
            { roman: "vi", text: "The closer you get, the more images change" },
            { roman: "vii", text: "A lack of mystery in today’s images" }
        ],
        questions: [
            { qNum: 1, text: "Paragraph A: Main Heading", ans: "ii", evId: "ev-1a-a" },
            { qNum: 2, text: "Paragraph B: Topic Sentence Analysis (Distance)", ans: "Distance", evId: "ev-1a-b" },
            { qNum: 3, text: "Paragraph C: Advanced Timing Methods (Timing)", ans: "Timing", evId: "ev-1a-c" },
            { qNum: 4, text: "Paragraph D: Main Heading", ans: "iii", evId: "ev-1a-d" },
            { qNum: 5, text: "Paragraph E: Main Heading", ans: "vi", evId: "ev-1a-e" },
            { qNum: 6, text: "Paragraph F: Main Heading", ans: "v", evId: "ev-1a-f" },
            { qNum: 7, text: "Paragraph G: Main Heading", ans: "i", evId: "ev-1a-g" }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Paragraph A & Heading ii (Not an exact copy)",
                badge: "Reading 1a Walkthrough • Para A",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> "Scientists call them ‘photographic artefacts’, because they show things that only exist because it is a photograph. Put simply, contrary to popular belief, <mark class="evidence" id="ev-wt-1a-a" data-q="wt-1a-a"><span class="syn-pair-1" data-q="wt-1a-a">things in photos look different from real life</span></mark>."`,
                question: `Select the best heading for <strong>Paragraph A</strong>: <select class="select-input" data-ans="ii"><option value="">Select...</option><option value="i">i. When you have to learn more from the photographer</option><option value="ii">ii. Not an exact copy of what we see</option><option value="iii">iii. One material that always creates difficulties</option><option value="iv">iv. Web companies that cheat customers</option><option value="v">v. Altering images to deceive the viewer</option><option value="vi">vi. The closer you get, the more images change</option><option value="vii">vii. A lack of mystery in today’s images</option></select>`,
                ans: "ii",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"things in photos look different from real life"</em> ↔ <strong>ii. Not an exact copy of what we see</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Paragraph B & Topic Sentence (Distance & Depth of Field)",
                badge: "Reading 1a Walkthrough • Para B",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> "<mark class="evidence" id="ev-wt-1a-b" data-q="wt-1a-b"><strong>The biggest cause of photographic artefacts is <span class="syn-pair-1" data-q="wt-1a-b">the contrast between how the ‘depth of field’ works in modern cameras and in the human eye</span>.</strong></mark> This is because, although it is now possible to take excellent pictures of things <span class="syn-pair-2" data-q="wt-1a-b">far away</span>, the quality of photos of objects that are <span class="syn-pair-2" data-q="wt-1a-b">very near</span> is less accurate."`,
                question: `What is the core repeated topic in Paragraph B? <select class="select-input" data-ans="Distance"><option value="">Select...</option><option value="Distance">Distance (depth of field, far away, very near)</option><option value="Design">Design of lenses</option><option value="History">History of camera manufacturing</option></select>`,
                ans: "Distance",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Repeated Topic Lexicon:</span> <em>depth of field, far away, very near, near the camera</em> &rarr; <strong>Distance</strong>. Heading: <strong>Digital cameras and people see distance differently</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Paragraph C & Topic Sentence (Timing & Multiple Scans)",
                badge: "Reading 1a Walkthrough • Para C",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> "However, <mark class="evidence" id="ev-wt-1a-c" data-q="wt-1a-c"><span class="syn-pair-1" data-q="wt-1a-c">digital cameras are also significantly different from the old film cameras</span></mark>. For example, modern functions allow digital cameras to scan the image <span class="syn-pair-2" data-q="wt-1a-c">more than once over a period of less than a second</span>, or to automatically select <span class="syn-pair-2" data-q="wt-1a-c">how long the lens is open</span>."`,
                question: `What is the primary cause of ghostly mists in Paragraph C? <select class="select-input" data-ans="Timing"><option value="">Select...</option><option value="Timing">Inaccurate photos caused by advanced timing methods</option><option value="Chemicals">Chemical reactions in film</option><option value="Software">Software bugs</option></select>`,
                ans: "Timing",
                explanation: `<div class="syn-key-box"><span class="syn-tag purple">Time Lexicon Match:</span> <em>more than once, a period of less than a second, for longer</em> &rarr; <strong>Inaccurate photos caused by advanced timing methods</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Paragraph D & Heading iii (One material - Glass)",
                badge: "Reading 1a Walkthrough • Para D",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> "Filming under certain conditions will often produce unusual light effects in digital prints. For instance, <mark class="evidence" id="ev-wt-1a-d" data-q="wt-1a-d"><span class="syn-pair-1" data-q="wt-1a-d">glass often makes objects such as a light source behind the photographer appear in the printed photo</span></mark>. If the glass is clean, it may not be obvious that there was a window..."`,
                question: `Select the best heading for <strong>Paragraph D</strong>: <select class="select-input" data-ans="iii"><option value="">Select...</option><option value="i">i. When you have to learn more from the photographer</option><option value="ii">ii. Not an exact copy of what we see</option><option value="iii">iii. One material that always creates difficulties</option><option value="iv">iv. Web companies that cheat customers</option><option value="v">v. Altering images to deceive the viewer</option><option value="vi">vi. The closer you get, the more images change</option><option value="vii">vii. A lack of mystery in today’s images</option></select>`,
                ans: "iii",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"glass often makes objects... appear in printed photo"</em> ↔ <strong>iii. One material that always creates difficulties (glass)</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Paragraph E & Heading vi (Zoom & Pixellation)",
                badge: "Reading 1a Walkthrough • Para E",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> "<mark class="evidence" id="ev-wt-1a-e" data-q="wt-1a-e"><span class="syn-pair-1" data-q="wt-1a-e">As you go nearer, instead of seeing the image as a continuous picture, the digital image becomes pixelated</span></mark>, which means it appears as a group of coloured rectangles. What you see in print is very different from the object in real life..."`,
                question: `Select the best heading for <strong>Paragraph E</strong>: <select class="select-input" data-ans="vi"><option value="">Select...</option><option value="i">i. When you have to learn more from the photographer</option><option value="ii">ii. Not an exact copy of what we see</option><option value="iii">iii. One material that always creates difficulties</option><option value="iv">iv. Web companies that cheat customers</option><option value="v">v. Altering images to deceive the viewer</option><option value="vi">vi. The closer you get, the more images change</option><option value="vii">vii. A lack of mystery in today’s images</option></select>`,
                ans: "vi",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"As you go nearer... image becomes pixelated"</em> ↔ <strong>vi. The closer you get, the more images change</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Paragraph F & Heading v (Altering Images to Deceive)",
                badge: "Reading 1a Walkthrough • Para F",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> "<mark class="evidence" id="ev-wt-1a-f" data-q="wt-1a-f"><span class="syn-pair-1" data-q="wt-1a-f">Fakes, images created by computer, are not as common on internet sites as you’d imagine, even though it’s possible to produce believable images with photo-editing software.</span></mark> Many smartphones contain apps which make it very easy to produce versions of photos with human forms added."`,
                question: `Select the best heading for <strong>Paragraph F</strong>: <select class="select-input" data-ans="v"><option value="">Select...</option><option value="i">i. When you have to learn more from the photographer</option><option value="ii">ii. Not an exact copy of what we see</option><option value="iii">iii. One material that always creates difficulties</option><option value="iv">iv. Web companies that cheat customers</option><option value="v">v. Altering images to deceive the viewer</option><option value="vi">vi. The closer you get, the more images change</option><option value="vii">vii. A lack of mystery in today’s images</option></select>`,
                ans: "v",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"Fakes... produce believable images with photo-editing software"</em> ↔ <strong>v. Altering images to deceive the viewer</strong>.</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Paragraph G & Heading i (Witness Statements)",
                badge: "Reading 1a Walkthrough • Para G",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Para G]</span> "Often the unexpected appearance of an orb or mist in a photo leads the owner to make enquiries... <mark class="evidence" id="ev-wt-1a-g" data-q="wt-1a-g">Such photos <span class="syn-pair-1" data-q="wt-1a-g">end up relying on witness statements to support the claims, which are often unreliable</span></mark>."`,
                question: `Select the best heading for <strong>Paragraph G</strong>: <select class="select-input" data-ans="i"><option value="">Select...</option><option value="i">i. When you have to learn more from the photographer</option><option value="ii">ii. Not an exact copy of what we see</option><option value="iii">iii. One material that always creates difficulties</option><option value="iv">iv. Web companies that cheat customers</option><option value="v">v. Altering images to deceive the viewer</option><option value="vi">vi. The closer you get, the more images change</option><option value="vii">vii. A lack of mystery in today’s images</option></select>`,
                ans: "i",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"relying on witness statements... photographer's claim"</em> ↔ <strong>i. When you have to learn more from the photographer</strong>.</div>`
            }
        ]
    },

    // Reading 1b: Why reading online may be slowing your brain down
    reading1b: {
        passage: `
            <h3>WHY READING ONLINE MAY BE SLOWING YOUR BRAIN DOWN</h3>
            <p><span class="para-tag">Para A</span> <strong>If the person reading this article were reading online, I would need to keep things brief. A lot of you would have left already.</strong> <mark class="evidence" id="ev-1b-7" data-q="1b-7"><span class="syn-pair-1" data-q="1b-7">For every 150 ‘readers’ who open an article on the internet, one in three of them will leave within seconds</span></mark>. Of the 100 who stay, only 95 will be able to concentrate and look beyond the photograph and headline at the top. Even fewer will get to even the middle of the article. Put simply, only a very small number of people actually read articles on the web.</p>
            <p><span class="para-tag">Para B</span> <strong>Not being able to stay focused is a problem. Deeper levels of thinking and understanding may be something we are losing now much of our reading is going online.</strong> <mark class="evidence" id="ev-1b-b" data-q="1b-b">A. V. Kak found in one study that <span class="syn-pair-1" data-q="1b-b">people were able to remember more information from an article that they read on paper</span>, than a similar group who read the same article online.</mark> Imagine the effect of this on a medical student who only studies papers online. Surfing the internet may seem like an efficient way of reading, but getting the physical text out of the library means you’re less likely to forget.</p>
            <p><span class="para-tag">Para C</span> <strong>Even more dispiriting is the way these poor understandings are being passed on to others.</strong> Evidence suggests that <mark class="evidence" id="ev-1b-c" data-q="1b-c"><span class="syn-pair-1" data-q="1b-c">people are creating links to articles they have not fully read, and even adding comments before getting to the end</span></mark>. Josh Schartz, a data expert, studies the reading styles of people online. Data was not available on the exact moment when a person stopped reading and then left a recommendation. However, his research suggests that <mark class="evidence" id="ev-1b-8" data-q="1b-8"><span class="syn-pair-2" data-q="1b-8">the overall number of comments and the number of people who scrolled down to the end of the article did not match</span></mark>. This suggests that there is a very loose relationship between reading to the end and commenting. Commenting without reading everything only creates more and more misinformation.</p>
            <p><span class="para-tag">Para D</span> <strong>Studies of the brain have suggested that we should be more concerned about this than we are.</strong> <mark class="evidence" id="ev-1b-9" data-q="1b-9">Michael Merzenich has long argued <span class="syn-pair-1" data-q="1b-9">against the argument that the brain is formed in the early years of childhood, then remains stable</span>.</mark> Many believed that, once damaged, parts of the brain would never recover again. In fact, <mark class="evidence" id="ev-1b-d" data-q="1b-d"><span class="syn-pair-2" data-q="1b-d">the brain is constantly changing and re-organizing itself, losing the connections that it does not need</span></mark>. As people spend less time thinking for longer periods of time, their brains react by re-wiring, deleting the bits associated with careful thought, making it much harder in the future to think hard about issues.</p>
            <p><span class="para-tag">Para E</span> <strong>Many have argued that this is nothing new. People have always started novels and not finished them.</strong> Even films, which require a relatively short commitment of only an hour or so of our time, are sometimes unable to keep our attention to the end. However, <mark class="evidence" id="ev-1b-e" data-q="1b-e"><span class="syn-pair-1" data-q="1b-e">Alvin Toffler argued that the amount of free information that is thrown at us every day is different from anything that came before</span></mark>. We now have so much choice that many people refuse to waste their time on anything unless something is truly fascinating.</p>
            <p><span class="para-tag">Para F</span> <strong>The problem is even worse when you consider the kind of things we read online.</strong> Unfortunately, just as our bodies are programmed to want to eat fats and sugars, things which we know are not good for us, <mark class="evidence" id="ev-1b-f" data-q="1b-f"><span class="syn-pair-1" data-q="1b-f">our brains prefer to read things that are shocking</span>, such as gossiping, describing the embarrassment of others or just looking at attractive people. In other words, we read things we know we should not. Some experts have referred to this as ‘<span class="vocab-word" data-word="psychological obesity" data-def="A state of mental overload from consuming sensational, unwholesome digital information." data-ipa="/ˌsaɪ.kəˈlɒdʒ.ɪ.kəl əʊˈbiː.sə.ti/" data-pos="noun">psychological obesity</span>’</mark>.</p>
            <p><span class="para-tag">Para G</span> <strong>Editors of respectable newspapers are aware that this kind of content is popular, but they put important news stories on the front cover anyway.</strong> They know that unpleasant stories, such as the events in war-torn areas, or poverty, matter and people should know about things beyond their daily lives. Online news sites only recommend articles on things we have shown an interest in before. In other words, <mark class="evidence" id="ev-1b-g" data-q="1b-g">what Nicholas Negroponte called the ‘The Daily Me’, <span class="syn-pair-1" data-q="1b-g">bringing personalized content, also means that you miss being introduced to new concepts</span>. With modern online news providers, you could exist quite happily never knowing what is happening outside of your personal interests.</mark></p>
        `,
        headings: [
            { roman: "i", text: "Sharing half-understood ideas" },
            { roman: "ii", text: "An old situation that’s now more intense" },
            { roman: "iii", text: "Too much knowledge can be bad" },
            { roman: "iv", text: "Statistics showing how people read (Example Para A)" },
            { roman: "v", text: "Pleasure in unhealthy content" },
            { roman: "vi", text: "Longer-lasting memories from books" },
            { roman: "vii", text: "Increased capacity for critical thought" },
            { roman: "viii", text: "Living in a world of your own" },
            { roman: "ix", text: "Only reading the reviews" },
            { roman: "x", text: "A biological response to habits" }
        ],
        questions: [
            { qNum: 1, text: "1. Paragraph B: Main Heading", ans: "vi", evId: "ev-1b-b" },
            { qNum: 2, text: "2. Paragraph C: Main Heading", ans: "i", evId: "ev-1b-c" },
            { qNum: 3, text: "3. Paragraph D: Main Heading", ans: "x", evId: "ev-1b-d" },
            { qNum: 4, text: "4. Paragraph E: Main Heading", ans: "ii", evId: "ev-1b-e" },
            { qNum: 5, text: "5. Paragraph F: Main Heading", ans: "v", evId: "ev-1b-f" },
            { qNum: 6, text: "6. Paragraph G: Main Heading", ans: "viii", evId: "ev-1b-g" }
        ],
        completionQuestions: [
            { qNum: 7, text: "7. Around a third of internet surfers stay on a page for <input type=\"text\" class=\"blank-input\" data-ans=\"seconds\" placeholder=\"[7]...\" style=\"width:130px;\">.", ans: "seconds", evId: "ev-1b-7" },
            { qNum: 8, text: "8. According to Josh Schartz, the number of <input type=\"text\" class=\"blank-input\" data-ans=\"comments\" placeholder=\"[8]...\" style=\"width:130px;\"> is greater than the number of people who finish reading.", ans: "comments", evId: "ev-1b-8" },
            { qNum: 9, text: "9. Michael Merzenich found that brains still changed after the period of <input type=\"text\" class=\"blank-input\" data-ans=\"childhood\" placeholder=\"[9]...\" style=\"width:130px;\"> came to an end.", ans: "childhood", evId: "ev-1b-9" },
            { qNum: 10, text: "10. ‘Psychological obesity’ is the natural preference for shocking <input type=\"text\" class=\"blank-input\" data-ans=\"content|things\" placeholder=\"[10]...\" style=\"width:130px;\"> in articles.", ans: "content|things", evId: "ev-1b-f" }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Paragraph B & Heading vi (Memories from Paper/Books)",
                badge: "Reading 1b Walkthrough • Para B",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> "A. V. Kak found in one study that <mark class="evidence" id="ev-wt-1b-b" data-q="wt-1b-b"><span class="syn-pair-1" data-q="wt-1b-b">people were able to remember more information from an article that they read on paper</span>, than a similar group who read the same article online.</mark>"`,
                question: `Select the best heading for <strong>Paragraph B</strong>: <select class="select-input" data-ans="vi"><option value="">Select...</option><option value="i">i. Sharing half-understood ideas</option><option value="ii">ii. An old situation that’s now more intense</option><option value="iii">iii. Too much knowledge can be bad</option><option value="v">v. Pleasure in unhealthy content</option><option value="vi">vi. Longer-lasting memories from books</option><option value="viii">viii. Living in a world of your own</option><option value="x">x. A biological response to habits</option></select>`,
                ans: "vi",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"remember more information... read on paper"</em> ↔ <strong>vi. Longer-lasting memories from books</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Paragraph C & Heading i (Sharing Half-Understood Ideas)",
                badge: "Reading 1b Walkthrough • Para C",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> "Evidence suggests that <mark class="evidence" id="ev-wt-1b-c" data-q="wt-1b-c"><span class="syn-pair-1" data-q="wt-1b-c">people are creating links to articles they have not fully read, and even adding comments before getting to the end</span></mark>."`,
                question: `Select the best heading for <strong>Paragraph C</strong>: <select class="select-input" data-ans="i"><option value="">Select...</option><option value="i">i. Sharing half-understood ideas</option><option value="ii">ii. An old situation that’s now more intense</option><option value="v">v. Pleasure in unhealthy content</option><option value="vi">vi. Longer-lasting memories from books</option><option value="viii">viii. Living in a world of your own</option><option value="x">x. A biological response to habits</option></select>`,
                ans: "i",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"creating links to articles they have not fully read"</em> ↔ <strong>i. Sharing half-understood ideas</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Paragraph D & Heading x (Biological Response & Re-Wiring)",
                badge: "Reading 1b Walkthrough • Para D",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> "<mark class="evidence" id="ev-wt-1b-d" data-q="wt-1b-d"><span class="syn-pair-1" data-q="wt-1b-d">In fact, the brain is constantly changing and re-organizing itself, losing the connections that it does not need.</span> As people spend less time thinking for longer periods of time, their brains react by re-wiring...</mark>"`,
                question: `Select the best heading for <strong>Paragraph D</strong>: <select class="select-input" data-ans="x"><option value="">Select...</option><option value="i">i. Sharing half-understood ideas</option><option value="ii">ii. An old situation that’s now more intense</option><option value="v">v. Pleasure in unhealthy content</option><option value="vi">vi. Longer-lasting memories from books</option><option value="viii">viii. Living in a world of your own</option><option value="x">x. A biological response to habits</option></select>`,
                ans: "x",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"brain is constantly changing and re-organizing itself... re-wiring"</em> ↔ <strong>x. A biological response to habits</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Paragraph E & Heading ii (Old Situation More Intense)",
                badge: "Reading 1b Walkthrough • Para E",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> "Many have argued that this is nothing new. People have always started novels and not finished them... However, <mark class="evidence" id="ev-wt-1b-e" data-q="wt-1b-e"><span class="syn-pair-1" data-q="wt-1b-e">Alvin Toffler argued that the amount of free information that is thrown at us every day is different from anything that came before</span></mark>."`,
                question: `Select the best heading for <strong>Paragraph E</strong>: <select class="select-input" data-ans="ii"><option value="">Select...</option><option value="i">i. Sharing half-understood ideas</option><option value="ii">ii. An old situation that’s now more intense</option><option value="v">v. Pleasure in unhealthy content</option><option value="vi">vi. Longer-lasting memories from books</option><option value="viii">viii. Living in a world of your own</option><option value="x">x. A biological response to habits</option></select>`,
                ans: "ii",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"nothing new... but amount of info thrown at us is different from anything before"</em> ↔ <strong>ii. An old situation that’s now more intense</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Paragraph F & Heading v (Pleasure in Unhealthy Content)",
                badge: "Reading 1b Walkthrough • Para F",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> "Unfortunately, just as our bodies are programmed to want to eat fats and sugars... <mark class="evidence" id="ev-wt-1b-f" data-q="wt-1b-f"><span class="syn-pair-1" data-q="wt-1b-f">our brains prefer to read things that are shocking... referred to this as ‘psychological obesity’</span></mark>."`,
                question: `Select the best heading for <strong>Paragraph F</strong>: <select class="select-input" data-ans="v"><option value="">Select...</option><option value="i">i. Sharing half-understood ideas</option><option value="ii">ii. An old situation that’s now more intense</option><option value="v">v. Pleasure in unhealthy content</option><option value="vi">vi. Longer-lasting memories from books</option><option value="viii">viii. Living in a world of your own</option><option value="x">x. A biological response to habits</option></select>`,
                ans: "v",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"want to eat fats and sugars... brains prefer shocking things / psychological obesity"</em> ↔ <strong>v. Pleasure in unhealthy content</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Paragraph G & Heading viii (Living in a World of Your Own)",
                badge: "Reading 1b Walkthrough • Para G",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Para G]</span> "<mark class="evidence" id="ev-wt-1b-g" data-q="wt-1b-g">Nicholas Negroponte called the ‘The Daily Me’, <span class="syn-pair-1" data-q="wt-1b-g">bringing personalized content, also means that you miss being introduced to new concepts... exist quite happily never knowing what is happening outside of your personal interests.</span></mark>"`,
                question: `Select the best heading for <strong>Paragraph G</strong>: <select class="select-input" data-ans="viii"><option value="">Select...</option><option value="i">i. Sharing half-understood ideas</option><option value="ii">ii. An old situation that’s now more intense</option><option value="v">v. Pleasure in unhealthy content</option><option value="vi">vi. Longer-lasting memories from books</option><option value="viii">viii. Living in a world of your own</option><option value="x">x. A biological response to habits</option></select>`,
                ans: "viii",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"The Daily Me... never knowing what is happening outside of your personal interests"</em> ↔ <strong>viii. Living in a world of your own</strong>.</div>`
            }
        ]
    },
    charts: {
        friendshipReasons: {
            title: "Reasons to Make or Break Friendship Connections (%)",
            categories: ["Real-life Known", "Shared Interests", "Mutual Friends", "Disliked Posts", "Offensive Comments", "Lack of Contact"],
            series: [
                { id: "make", name: "Reasons to Make Connection", color: "#2563eb", data: [78, 62, 54, 0, 0, 0] },
                { id: "break", name: "Reasons to Break Connection", color: "#dc2626", data: [0, 0, 0, 58, 67, 48] }
            ],
            yMax: 100,
            yStep: 20,
            yFormat: (val) => val + "%"
        },
        cinemaDvdSales: {
            title: "Cinema Ticket vs. DVD Sales (2001–2010) in US$ Billion",
            xCategories: ["2001", "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009", "2010"],
            series: [
                { id: "us_cinema", name: "US Cinema Ticket Sales", color: "#2563eb", data: [10, 10.5, 11, 11.2, 11.5, 12, 12.2, 12, 11.5, 11] },
                { id: "us_dvd", name: "US DVD Sales", color: "#f59e0b", data: [20, 21.5, 23, 24, 25, 23.5, 22, 20.5, 19, 18] },
                { id: "intl_cinema", name: "International Cinema Ticket Sales", color: "#059669", data: [11, 12.5, 14, 16.5, 19, 22, 25, 28, 30.5, 32.5] },
                { id: "intl_dvd", name: "International DVD Sales", color: "#dc2626", data: [11.5, 13.5, 16, 18, 17.5, 18.5, 19.5, 20.5, 21.5, 22] }
            ],
            yMin: 0,
            yMax: 35,
            yStep: 5,
            yUnit: "$B"
        }
    }
};
