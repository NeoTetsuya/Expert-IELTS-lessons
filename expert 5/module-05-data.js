/**
 * =========================================================================
 * Expert IELTS 5 — Module 5: The World Around Us Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Walkthroughs
 * =========================================================================
 */

window.module5Data = {
    meta: {
        id: "module-05",
        level: "Expert 5",
        band: "Band 5.0 – 6.0",
        moduleNum: "05",
        title: "The World Around Us",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 32,
        tags: [
            { text: "Reading 5a/5b", bg: "var(--col-reading)" },
            { text: "Grammar: -ing vs Infinitives", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Weather & Pollution", bg: "var(--col-vocab)" },
            { text: "Writing: Task 1 Line Graphs & Trends", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "5a", title: "Journeys & World Travel", desc: "Matching information across long-distance cycle trips, -ing forms vs infinitives, and Task 1 tourism income line graph." },
            { num: "5b", title: "Weather & Visual Pollution", desc: "Weather lexicon, climate change collocations, visual pollution reading, and Task 1 environmental concern analysis." },
            { num: "Review", title: "Module 5 Mastery Check", desc: "Comprehensive checklist across matching information, trend grammar, and Task 1 data reporting." }
        ]
    },

    // Charts configuration
    charts: {
        tourismIncome: {
            title: "Income from Tourism by Region (1960–2010)",
            xAxis: ["1960", "1970", "1980", "1990", "2000", "2005", "2010"],
            yAxisLabel: "Billion US Dollars",
            series: [
                { name: "Europe", data: [40, 110, 240, 220, 360, 440, 480], color: "#2563eb" },
                { name: "Asia and Pacific", data: [10, 30, 80, 110, 190, 290, 380], color: "#16a34a" },
                { name: "Americas", data: [25, 60, 140, 160, 230, 250, 280], color: "#ea580c" },
                { name: "Africa", data: [5, 10, 15, 12, 18, 22, 25], color: "#7c3aed" }
            ]
        },
        environmentalConcern: {
            title: "Public Concern Over Environmental Issues (2000–2010)",
            xAxis: ["2000", "2002", "2004", "2006", "2008", "2010"],
            yAxisLabel: "% Rating 'Very Serious'",
            series: [
                { name: "Water Shortages", data: [62, 64, 63, 65, 70, 58], color: "#0284c7" },
                { name: "Air Pollution", data: [58, 60, 62, 66, 52, 50], color: "#ea580c" },
                { name: "Automobile Emissions", data: [54, 56, 57, 59, 53, 48], color: "#7c3aed" },
                { name: "Climate Change", data: [50, 48, 51, 60, 55, 46], color: "#16a34a" }
            ]
        }
    },

    // Reading 5a: A different way to see the world (Mark Beaumont)
    reading5a: {
        passage: `
            <h3>A DIFFERENT WAY TO SEE THE WORLD</h3>
            <p class="reading-lead"><em>Mark Beaumont found that many countries look different from a bicycle. Our reporter writes about Mark's experience of cycling round the world.</em></p>
            <p><span class="para-tag">Para A</span> <mark class="evidence" id="ev-5a-3" data-q="5a-3"><span class="syn-pair-1" data-q="5a-3">An <span class="vocab-word" data-word="extraordinary" data-ipa="/ɪkˈstrɔː.dɪn.ər.i/" data-pos="adj." data-def="Very unusual, remarkable, or special." data-colloc="extraordinary cyclist">extraordinary</span> cyclist, Mark Beaumont, has completed a number of amazing long-distance trips on his bike</span>. <span class="syn-pair-2" data-q="5a-3">In 2008, for example, he rode for 18,296 miles around the world. Two years later he made a 13,080-mile <span class="vocab-word" data-word="journey" data-ipa="/ˈdʒɜː.ni/" data-pos="noun" data-def="An act of travelling from one place to another." data-colloc="long journey">journey</span> through the Americas. In 2015 he cycled 6,762 miles from Cairo to Cape Town</span></mark>.</p>
            <p><span class="para-tag">Para B</span> <mark class="evidence" id="ev-5a-5" data-q="5a-5">On that last journey Mark succeeded in breaking — by as much as 17 days — the world record for cycling across Africa. To do this, he rode 160 miles a day. He explains that it was certainly not easy to keep up this speed. <span class="syn-pair-1" data-q="5a-5">There were, for example, long delays at border crossings and queues of traffic often stopped him from travelling fast</span>. <span class="syn-pair-2" data-q="5a-5">Broken roads caused problems and the weather also affected how fast he could go</span></mark>.</p>
            <p><span class="para-tag">Para C</span> On all his journeys Mark has been interested by the <span class="vocab-word" data-word="landscapes" data-ipa="/ˈlænd.skeɪps/" data-pos="noun" data-def="All the visible features of an area of countryside or land." data-colloc="varied landscapes">landscapes</span> he has seen. He says these often differ from what he expected. <mark class="evidence" id="ev-5a-1" data-q="5a-1"><span class="syn-pair-1" data-q="5a-1">When people think about Patagonia, for instance, they imagine the beautiful mountains and lakes</span>... <span class="syn-pair-2" data-q="5a-1">but when I cycled there, I realised that large parts of it are just miles and miles of grassland... What is romantic and exciting for most holidaymakers can become very boring</span> when you see nothing else for several days</mark>.</p>
            <p><span class="para-tag">Para D</span> Of all the landscapes he has seen, Mark has particularly enjoyed some of the wild parts of Texas and the Deep South of the USA. 'I remember waking before daylight. <mark class="evidence" id="ev-5a-4" data-q="5a-4"><span class="syn-pair-1" data-q="5a-4">I had to remove the ice from my tent when it was still dark</span>. <span class="syn-pair-2" data-q="5a-4">Then I set out on roads with absolutely no one else around. I was in the middle of this enormous desert</span></mark> and all I could hear was the sound of animals calling. When I look back now, it was one of my favourite times: to be totally alone in that <span class="vocab-word" data-word="environment" data-ipa="/ɪnˈvaɪ.rən.mənt/" data-pos="noun" data-def="The surroundings or conditions in which a person operates." data-colloc="remote environment">environment</span>.'</p>
            <p><span class="para-tag">Para E</span> His travels have also taught Mark about how differently people around the world view cycling. In Europe, North America and Australia, cycling is a sport which people do mainly to keep fit and have fun. But in many places Mark visited, a bicycle is something rather different. It is a type of transport that many people dream of getting one day. People who are used to walking everywhere wish they had enough money to buy a bike in order to get from A to B much more quickly and easily. People who see a bicycle that way often found it hard to understand why Mark wanted to cycle such long distances for no obvious reason.</p>
            <p><span class="para-tag">Para F</span> But for Mark, cycling is by far the best way to see the world. 'It's never boring when you're cycling. You notice everything, especially when riding alone. When you cycle, you get a wonderful view of the world. It is amazing to see how the people and cultures change from one place to the next.' The kindness of the people Mark met was what <span class="vocab-word" data-word="impressed" data-ipa="/ɪmˈprest/" data-pos="adj." data-def="Feeling admiration and respect for something." data-colloc="impressed him most">impressed</span> him most. 'Even in the poorest countries, I never had to ask a second person for a place to stay.'</p>
            <p><span class="para-tag">Para G</span> So how does Mark feel at the end of one of his big adventures? He says that, <mark class="evidence" id="ev-5a-2" data-q="5a-2"><span class="syn-pair-1" data-q="5a-2">because the projects involve huge effort, time and costs</span>, <span class="syn-pair-2" data-q="5a-2">his main emotion is relief that he has completed the trip successfully</span></mark>. 'It is not until later that you have time to think about what the journey meant, the landscapes you saw and the people you met. And then you start thinking about where you might go next.'</p>
        `,
        questions: [
            { qNum: "5a-1", text: "1. an example of a place where Mark felt bored", ans: "C", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5a-1" },
            { qNum: "5a-2", text: "2. a comment on the expense of organising a cycle trip", ans: "G", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5a-2" },
            { qNum: "5a-3", text: "3. a description of the extent of Mark's travels", ans: "A", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5a-3" },
            { qNum: "5a-4", text: "4. a reference to how cold the weather was", ans: "D", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5a-4" },
            { qNum: "5a-5", text: "5. some reasons why making progress can be difficult", ans: "B", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5a-5" }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph C (Felt Bored in Patagonia)",
                badge: "Reading 5a Walkthrough • Q1",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> "When people think about <span class="syn-pair-1" data-q="wt-5a-1">Patagonia</span>, for instance, they imagine the beautiful mountains... but when I cycled there, I realised that large parts of it are just miles and miles of grassland... <span class="syn-pair-2" data-q="wt-5a-1">can become very boring when you see nothing else for several days</span>."`,
                question: `1. Which paragraph contains an example of a <span class="syn-pair-1" data-q="wt-5a-1">place</span> where Mark <span class="syn-pair-2" data-q="wt-5a-1">felt bored</span>?`,
                ans: "C",
                boxOptions: [
                    { letter: "A", text: "Paragraph A" }, { letter: "B", text: "Paragraph B" }, { letter: "C", text: "Paragraph C" },
                    { letter: "D", text: "Paragraph D" }, { letter: "E", text: "Paragraph E" }, { letter: "F", text: "Paragraph F" }, { letter: "G", text: "Paragraph G" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Target Match:</span> <em>"felt bored"</em> matches <em>"very boring when you see nothing else for several days"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Place Example:</span> Patagonia (grassland landscape) ➔ <strong>Paragraph C</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph G (Expense of Cycle Trip)",
                badge: "Reading 5a Walkthrough • Q2",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Para G]</span> "He says that, because the projects involve <span class="syn-pair-1" data-q="wt-5a-2">huge effort, time and costs</span>, his main emotion is <span class="syn-pair-2" data-q="wt-5a-2">relief that he has completed the trip successfully</span>."`,
                question: `2. Which paragraph contains a comment on the <span class="syn-pair-1" data-q="wt-5a-2">expense of organising a cycle trip</span>?`,
                ans: "G",
                boxOptions: [
                    { letter: "A", text: "Paragraph A" }, { letter: "B", text: "Paragraph B" }, { letter: "C", text: "Paragraph C" },
                    { letter: "D", text: "Paragraph D" }, { letter: "E", text: "Paragraph E" }, { letter: "F", text: "Paragraph F" }, { letter: "G", text: "Paragraph G" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Target Match:</span> <em>"expense of organising"</em> ↔ <em>"projects involve huge effort, time and costs"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph G</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph A (Extent of Travels)",
                badge: "Reading 5a Walkthrough • Q3",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> "<span class="syn-pair-1" data-q="wt-5a-3">Mark Beaumont</span>, has completed a number of amazing long-distance trips on his bike. In 2008, for example, he <span class="syn-pair-2" data-q="wt-5a-3">rode for 18,296 miles around the world. Two years later he made a 13,080-mile journey through the Americas. In 2015 he cycled 6,762 miles from Cairo to Cape Town</span>."`,
                question: `3. Which paragraph contains a description of the <span class="syn-pair-2" data-q="wt-5a-3">extent of Mark's travels</span>?`,
                ans: "A",
                boxOptions: [
                    { letter: "A", text: "Paragraph A" }, { letter: "B", text: "Paragraph B" }, { letter: "C", text: "Paragraph C" },
                    { letter: "D", text: "Paragraph D" }, { letter: "E", text: "Paragraph E" }, { letter: "F", text: "Paragraph F" }, { letter: "G", text: "Paragraph G" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Target Match:</span> <em>"extent of Mark's travels"</em> ↔ list of mileage & destinations (<em>18,296 miles round the world, 13,080 miles through Americas, 6,762 miles Cairo to Cape Town</em>).</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph A</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph D (Cold Weather & Ice)",
                badge: "Reading 5a Walkthrough • Q4",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> "I remember waking before daylight. I had to <span class="syn-pair-1" data-q="wt-5a-4">remove the ice from my tent when it was still dark</span>. Then I set out on roads with absolutely no one else around."`,
                question: `4. Which paragraph contains a reference to <span class="syn-pair-1" data-q="wt-5a-4">how cold the weather was</span>?`,
                ans: "D",
                boxOptions: [
                    { letter: "A", text: "Paragraph A" }, { letter: "B", text: "Paragraph B" }, { letter: "C", text: "Paragraph C" },
                    { letter: "D", text: "Paragraph D" }, { letter: "E", text: "Paragraph E" }, { letter: "F", text: "Paragraph F" }, { letter: "G", text: "Paragraph G" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Target Match:</span> <em>"how cold the weather was"</em> ↔ <em>"remove the ice from my tent when it was still dark"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph D</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph B (Difficulty Making Progress)",
                badge: "Reading 5a Walkthrough • Q5",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> "He explains that it was certainly not easy to keep up this speed. There were, for example, <span class="syn-pair-1" data-q="wt-5a-5">long delays at border crossings and queues of traffic often stopped him... Broken roads caused problems</span> and the weather also affected..."`,
                question: `5. Which paragraph contains <span class="syn-pair-1" data-q="wt-5a-5">some reasons why making progress can be difficult</span>?`,
                ans: "B",
                boxOptions: [
                    { letter: "A", text: "Paragraph A" }, { letter: "B", text: "Paragraph B" }, { letter: "C", text: "Paragraph C" },
                    { letter: "D", text: "Paragraph D" }, { letter: "E", text: "Paragraph E" }, { letter: "F", text: "Paragraph F" }, { letter: "G", text: "Paragraph G" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Target Match:</span> <em>"making progress can be difficult"</em> ↔ <em>"delays at borders, traffic queues, broken roads, weather"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph B</strong>.</div>`
            }
        ]
    },

    // Reading 5b: The problem of visual pollution
    reading5b: {
        passage: `
            <h3>THE PROBLEM OF VISUAL POLLUTION</h3>
            <p><span class="para-tag">Para A</span> <mark class="evidence" id="ev-5b-4" data-q="5b-4"><span class="syn-pair-1" data-q="5b-4">Visual pollution means that people cannot enjoy what they see</span>. <span class="syn-pair-2" data-q="5b-4">There are two types of visual pollution in the modern world: one is when <span class="vocab-word" data-word="visibility" data-ipa="/ˌvɪz.əˈbɪl.ə.ti/" data-pos="noun" data-def="The distance one can clearly see." data-colloc="visibility is limited">visibility</span> is limited by haze; another is visual untidiness, when buildings and signs spoil the view</span></mark>.</p>
            <p><span class="para-tag">Para B</span> Air pollution from cars and factories reduces visibility. It looks like a brown haze over cities, but it also affects the countryside. Scientists measured the visibility at a United States national park and found that on a clear day, it is possible to see for 320 kilometres. On a hazy day, that distance falls to 48 kilometres.</p>
            <p><span class="para-tag">Para C</span> Transport and <span class="vocab-word" data-word="industry" data-ipa="/ˈɪn.də.stri/" data-pos="noun" data-def="Economic activity concerned with manufacturing and processing." data-colloc="major industry">industry</span> are both major man-made causes of air pollution. But there are also natural sources of haze — smoke from forest fires, for instance. The pollution that creates haze can travel thousands of kilometres. <mark class="evidence" id="ev-5b-7" data-q="5b-7"><span class="syn-pair-1" data-q="5b-7">In Southeast Asia, haze from enormous forest fires cost billions of dollars in health care. These fires have also stopped many tourists from visiting the area in the last decade</span></mark>. Fires in Sumatra and Borneo affected not only Indonesia, but also Malaysia, Singapore and Thailand. Developers started many of these fires often illegally because they wanted to use the land for building or farming. <mark class="evidence" id="ev-5b-5" data-q="5b-5"><span class="syn-pair-2" data-q="5b-5">It is possible that some of the fires will continue to burn for years</span></mark>.</p>
            <p><span class="para-tag">Para D</span> Scientists can measure haze, but people have different opinions about other forms of visual pollution. Wind turbines, billboards, power lines, mobile phone towers, even modern buildings can all cause different feelings. <mark class="evidence" id="ev-5b-8" data-q="5b-8"><span class="syn-pair-1" data-q="5b-8">To the businessman, a billboard in a good location may be beautiful. But to the traveller who would like to see the hills or the pretty village behind that billboard, it is visual pollution</span></mark>.</p>
            <p><span class="para-tag">Para E</span> When more people started to drive in the mid-20th century, businesses put large advertising hoardings next to busy roads. However, in the 1960s, <mark class="evidence" id="ev-5b-6" data-q="5b-6"><span class="syn-pair-1" data-q="5b-6">many people began to complain about them, saying they were ugly and stopped drivers from focusing on the road</span></mark>. More modern examples of visual pollution are mobile phone towers and spray-painted graffiti. <mark class="evidence" id="ev-5b-3" data-q="5b-3"><span class="syn-pair-2" data-q="5b-3">Some mobile phone towers have been made to look like trees or plants, which has reduced the visual impact</span></mark>, but attempts to ban the sale of spray paint to young people have not had much effect.</p>
            <p><span class="para-tag">Para F</span> But do these more <span class="vocab-word" data-word="subjective" data-ipa="/səbˈdʒek.tɪv/" data-pos="adj." data-def="Based on personal feelings or opinions rather than facts." data-colloc="subjective types">subjective</span> types of visual pollution really matter? <mark class="evidence" id="ev-5b-2" data-q="5b-2"><span class="syn-pair-1" data-q="5b-2">The dangerous effects of air pollution are obvious, with more and more people suffering from breathing problems... people who have an unpleasant view from their window are 40 percent more likely to feel sad or depressed</span>. <span class="syn-pair-2" data-q="5b-2">And there are several studies which show that physical environment affects stress levels</span></mark>. Being in beautiful surroundings — beside a lake or in a forest, for instance — tends to make people feel more relaxed.</p>
            <p><span class="para-tag">Para G</span> Moreover, another <span class="vocab-word" data-word="consequence" data-ipa="/ˈkɒn.sɪ.kwəns/" data-pos="noun" data-def="A result or effect of an action or condition." data-colloc="another consequence">consequence</span> of visual pollution is that it destroys the individual differences that make the world so special. In the past every town, city and suburb had its own unique character. Now they are starting to look the same all over the world. There are identical fast-food restaurants, billboards, motorways and petrol stations everywhere. <mark class="evidence" id="ev-5b-1" data-q="5b-1"><span class="syn-pair-1" data-q="5b-1">Although this has a negative effect on the quality of life, it is probably already too late to change the situation</span></mark>.</p>
        `,
        questions: [
            { qNum: "5b-1", text: "1. a reference to a problem that may no longer be possible to solve", ans: "G", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-1" },
            { qNum: "5b-2", text: "2. examples of visual pollution having an impact on health", ans: "F", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-2" },
            { qNum: "5b-3", text: "3. an example of a deliberate way of hiding something unattractive", ans: "E", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-3" },
            { qNum: "5b-4", text: "4. definitions of different kinds of visual pollution", ans: "A", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-4" },
            { qNum: "5b-5", text: "5. an example of a problem that may last for a long time", ans: "C", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-5" },
            { qNum: "5b-6", text: "6. a reference to the fact that visual pollution can cause accidents", ans: "E", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-6" },
            { qNum: "5b-7", text: "7. a reference to the impact of visual pollution on the economy", ans: "C", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-7" },
            { qNum: "5b-8", text: "8. an example of different ways of viewing the same thing", ans: "D", options: ["A", "B", "C", "D", "E", "F", "G"], evId: "ev-5b-8" }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph G (Problem Impossible to Solve)",
                badge: "Reading 5b Walkthrough • Q1",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Para G]</span> <mark class="evidence" id="ev-wt-5b-1" data-q="wt-5b-1">"<span class="syn-pair-1" data-q="wt-5b-1">Although this has a negative effect on the quality of life</span>, <span class="syn-pair-2" data-q="wt-5b-1">it is probably already too late to change the situation</span>."</mark>`,
                question: `1. Which paragraph contains <span class="syn-pair-2" data-q="wt-5b-1">a reference to a problem that may no longer be possible to solve</span>?`,
                ans: "G",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"no longer possible to solve"</em> ↔ <em>"probably already too late to change the situation"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph G</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph F (Impact on Health & Mood)",
                badge: "Reading 5b Walkthrough • Q2",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> <mark class="evidence" id="ev-wt-5b-2" data-q="wt-5b-2">"<span class="syn-pair-1" data-q="wt-5b-2">with more and more people suffering from breathing problems... 40 percent more likely to feel sad or depressed</span>. <span class="syn-pair-2" data-q="wt-5b-2">And there are several studies which show that physical environment affects stress levels</span>."</mark>`,
                question: `2. Which paragraph contains <span class="syn-pair-1" data-q="wt-5b-2">examples of visual pollution having an impact on health</span>?`,
                ans: "F",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"impact on health"</em> ↔ <em>"breathing problems, feel sad/depressed, stress levels"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph F</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph E (Hiding Unattractive Towers)",
                badge: "Reading 5b Walkthrough • Q3",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-5b-3" data-q="wt-5b-3">"<span class="syn-pair-1" data-q="wt-5b-3">Some mobile phone towers have been made to look like trees or plants</span>, <span class="syn-pair-2" data-q="wt-5b-3">which has reduced the visual impact</span>..."</mark>`,
                question: `3. Which paragraph contains <span class="syn-pair-1" data-q="wt-5b-3">an example of a deliberate way of hiding something unattractive</span>?`,
                ans: "E",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"deliberate way of hiding"</em> ↔ <em>"made to look like trees or plants"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph E</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph A (Definitions of Visual Pollution)",
                badge: "Reading 5b Walkthrough • Q4",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> <mark class="evidence" id="ev-wt-5b-4" data-q="wt-5b-4">"<span class="syn-pair-1" data-q="wt-5b-4">There are two types of visual pollution in the modern world</span>: <span class="syn-pair-2" data-q="wt-5b-4">one is when visibility is limited by haze; another is visual untidiness, when buildings and signs spoil the view</span>."</mark>`,
                question: `4. Which paragraph contains <span class="syn-pair-1" data-q="wt-5b-4">definitions of different kinds of visual pollution</span>?`,
                ans: "A",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"definitions of different kinds"</em> ↔ <em>"two types: visibility limited by haze / visual untidiness"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph A</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph C (Problem Lasting for Years)",
                badge: "Reading 5b Walkthrough • Q5",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> <mark class="evidence" id="ev-wt-5b-5" data-q="wt-5b-5">"<span class="syn-pair-1" data-q="wt-5b-5">Developers started many of these fires often illegally...</span> <span class="syn-pair-2" data-q="wt-5b-5">It is possible that some of the fires will continue to burn for years</span>."</mark>`,
                question: `5. Which paragraph contains <span class="syn-pair-2" data-q="wt-5b-5">an example of a problem that may last for a long time</span>?`,
                ans: "C",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"last for a long time"</em> ↔ <em>"continue to burn for years"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph C</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph E (Causing Road Accidents)",
                badge: "Reading 5b Walkthrough • Q6",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-5b-6" data-q="wt-5b-6">"...in the 1960s, <span class="syn-pair-1" data-q="wt-5b-6">many people began to complain about them, saying they were ugly</span> and <span class="syn-pair-2" data-q="wt-5b-6">stopped drivers from focusing on the road</span>."</mark>`,
                question: `6. Which paragraph contains <span class="syn-pair-2" data-q="wt-5b-6">a reference to the fact that visual pollution can cause accidents</span>?`,
                ans: "E",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"can cause accidents"</em> ↔ <em>"stopped drivers from focusing on the road"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph E</strong>.</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph C (Economic Impact & Tourism)",
                badge: "Reading 5b Walkthrough • Q7",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> <mark class="evidence" id="ev-wt-5b-7" data-q="wt-5b-7">"<span class="syn-pair-1" data-q="wt-5b-7">In Southeast Asia, haze from enormous forest fires cost billions of dollars in health care</span>. <span class="syn-pair-2" data-q="wt-5b-7">These fires have also stopped many tourists from visiting the area</span>..."</mark>`,
                question: `7. Which paragraph contains <span class="syn-pair-1" data-q="wt-5b-7">a reference to the impact of visual pollution on the economy</span>?`,
                ans: "C",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"impact on the economy"</em> ↔ <em>"cost billions of dollars / stopped tourists from visiting"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph C</strong>.</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph D (Different Perspectives)",
                badge: "Reading 5b Walkthrough • Q8",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> <mark class="evidence" id="ev-wt-5b-8" data-q="wt-5b-8">"<span class="syn-pair-1" data-q="wt-5b-8">To the businessman, a billboard in a good location may be beautiful</span>. <span class="syn-pair-2" data-q="wt-5b-8">But to the traveller who would like to see the hills... it is visual pollution</span>."</mark>`,
                question: `8. Which paragraph contains <span class="syn-pair-1" data-q="wt-5b-8">an example of different ways of viewing the same thing</span>?`,
                ans: "D",
                boxOptions: [{ letter: "A", text: "Para A" }, { letter: "B", text: "Para B" }, { letter: "C", text: "Para C" }, { letter: "D", text: "Para D" }, { letter: "E", text: "Para E" }, { letter: "F", text: "Para F" }, { letter: "G", text: "Para G" }],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"different ways of viewing the same thing"</em> ↔ <em>"businessman (beautiful) vs traveller (visual pollution)"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Location:</span> <strong>Paragraph D</strong>.</div>`
            }
        ]
    }
};

window.moduleData = window.module5Data;
