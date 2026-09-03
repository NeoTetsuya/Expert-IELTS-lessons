/**
 * =========================================================================
 * Expert IELTS 6 — Module 3: Work & Study Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Charts
 * =========================================================================
 */

window.module3Data = {
    meta: {
        id: "module-03",
        level: "Expert 6",
        band: "Band 6.0 – 7.0",
        moduleNum: "03",
        title: "Work & Study",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 47,
        tags: [
            { text: "Reading 3a/3b", bg: "var(--col-reading)" },
            { text: "Grammar: Comparative Forms", bg: "var(--col-grammar)" },
            { text: "Writing: Task 1 Bar & Pie Charts", bg: "var(--col-writing)" },
            { text: "Writing: Task 1 Line Graph", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "3a", title: "Chinese Schooling Experiment & Comparative Forms", desc: "Text structure, summary completion, comparative & superlative forms, degree costs and schooling pie charts." },
            { num: "3b", title: "The Dark Side of Emotional Intelligence & Gender Pay Gap", desc: "YES/NO/NOT GIVEN, summary completion with a box, and Women's earnings gap line graph analysis." },
            { num: "Review", title: "Module 3 Mastery Check", desc: "Core examination checklist across text structure, comparatives, and Task 1 data synthesis." }
        ]
    },

    // Chart Configuration Schemas for General Chart Engine (deck-charts.js)
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
                    secondaryTextX: 83,
                    secondaryTextY: 48
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
            yUnit: "$M"
        }
    },

    // Reading 3a: A Chinese Approach to Learning (Full Exact Passage from module-3-content-v2.md)
    reading3a: {
        walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%206/module-3a-reading-question-walkthrough.html",
        walkthroughTitle: "Module 3a: Education Systems — Deep Question Walkthrough",
        wordBank: ["admitted", "behaved", "control group", "denied", "educated", "experiences", "imagination", "success", "instructors", "time"],
        passage: `
            <h3>A CHINESE APPROACH TO LEARNING</h3>
            <p><span class="para-tag">Intro</span> A recent experiment carried out by the BBC to bring Chinese teachers to the UK is a little unusual. China is a country with a different culture and set of expectations of behaviour in class. It was perhaps only inevitable that the teachers would be shocked by the behaviour they found. The young people themselves admitted to behaving worse than they usually would. Coming from an educational culture where shame and social pressure are the main method of controlling the class, Chinese educators were never going to introduce their methods without protest. Why would anybody expect anything different?</p>
            <p><span class="para-tag">Para A</span> <strong>The reasons behind the experiment were obvious.</strong> <mark class="evidence" id="ev-3a-1" data-q="3a-1"><span class="syn-pair-1" data-q="3a-1">Chinese students regularly come near the top in international comparison tests</span></mark> of students around the planet. They <mark class="evidence" id="ev-3a-1b" data-q="3a-1"><span class="syn-pair-2" data-q="3a-1"><span class="vocab-word" data-word="triumph" data-def="To achieve a great victory, success, or outcome." data-ipa="/ˈtraɪ.əmf/" data-pos="verb">triumph</span> in Maths, Reading and Science</span></mark>, while in the UK, young people have been getting lower marks in recent years. Many in Britain have been wondering if it is time to adopt Chinese methods of education here.</p>
            <p><span class="para-tag">Para B</span> <strong>In the experiment, five teachers were brought from</strong> China and put in a UK school. They taught a group of 50 students maths, reading, science and modern languages. The students in the study group, and <mark class="evidence" id="ev-3a-2" data-q="3a-2">another <span class="syn-pair-1" data-q="3a-2"><span class="vocab-word" data-word="control group" data-def="A benchmark group in an experiment that does not receive the test treatment." data-ipa="/kənˈtrəʊl ɡruːp/" data-pos="noun">control group</span></span> who received regular lessons</mark>, were tested at the end of the period and an <span class="vocab-word" data-word="analysis" data-def="Detailed examination of the elements or structure of something." data-ipa="/əˈnæl.ə.sɪs/" data-pos="noun">analysis</span> of the results was carried out. In addition, both teachers and students who participated in the experiment were given <mark class="evidence" id="ev-3a-3" data-q="3a-3"><span class="syn-pair-1" data-q="3a-3">interviews with one of the researchers on how they felt</span> about what happened</mark>.</p>
            <p><span class="para-tag">Para C</span> <strong>The biggest difference between the two cultures was</strong> the lack of <span class="vocab-word" data-word="discipline" data-def="The practice of training people to obey rules or a code of behavior." data-ipa="/ˈdɪs.ə.plɪn/" data-pos="noun">discipline</span> in British schools. One Chinese teacher pointed out, <mark class="evidence" id="ev-3a-4" data-q="3a-4">‘In China we don’t need classroom management skills because <span class="syn-pair-2" data-q="3a-4">everyone is disciplined by nature, by families, by society</span>.’</mark> Interestingly, students <mark class="evidence" id="ev-3a-5" data-q="3a-5"><span class="syn-pair-2" data-q="3a-5"><span class="vocab-word" data-word="admitted" data-def="Confessed or acknowledged the truth of something reluctantly." data-ipa="/ədˈmɪt.ɪd/" data-pos="verb">admitted</span> that they found themselves behaving worse during the experiment</span> than they normally would</mark> for their British teachers. Many pointed to the fact that the unfamiliarity of the teacher made them feel less comfortable than they normally would. The ‘survive or die’ approach to education was so unfamiliar that many students reacted negatively to it.</p>
            <p><span class="para-tag">Para D</span> <strong>Another key issue was that of the role of creativity</strong> in a classroom where discipline is king. While it was obvious that the British students would benefit from settling down and paying more attention to their lessons, it was also clear that the UK education system does, sometimes, encourage students to think outside of the box, be risk-takers, ask questions and challenge ideas. <mark class="evidence" id="ev-3a-6" data-q="3a-6">The Chinese teachers were uncomfortable with any attempt to ask questions, as it would stop the flow of the lesson they had planned in which there was <span class="syn-pair-1" data-q="3a-6">no opportunity for <span class="vocab-word" data-word="free-thinking" data-def="Forming one's own opinions independently without dogma." data-ipa="/ˈfriːˌθɪŋ.kɪŋ/" data-pos="noun">free-thinking</span></span>.</mark></p>
            <p><span class="para-tag">Para E</span> <strong>All of this suggests that an <span class="vocab-word" data-word="obsession" data-def="An idea or thought that continually preoccupies or intrudes on a person's mind." data-ipa="/əbˈseʃ.ən/" data-pos="noun">obsession</span> with testing does not exist in the UK, which would be untrue.</strong> The purpose of the experiment was to see if British students would benefit from the Chinese approach. However, <mark class="evidence" id="ev-3a-ex4-1" data-q="3a-ex4-1"><span class="syn-pair-1" data-q="3a-ex4-1">the message that the test result is the only thing that matters</span> may not be getting through to students</mark>. One young person commented that <mark class="evidence" id="ev-3a-ex4-2" data-q="3a-ex4-2">‘Their teaching methods did get results but we didn’t always feel we were learning much. <span class="syn-pair-1" data-q="3a-ex4-2">They get results because we are in school for so long</span>.’</mark></p>
            <p><span class="para-tag">Para F</span> <strong>It is not just the contrast between Chinese and British education systems.</strong> In India, a far more radical approach is being taken. At the cutting edge of educational research is the idea that <mark class="evidence" id="ev-3a-ex4-3" data-q="3a-ex4-3"><span class="syn-pair-1" data-q="3a-ex4-3">a little chaos in the classroom is not necessarily a bad thing</span></mark>. Professor Sugata Mitra has introduced the ‘Classroom in the Cloud’ based on his ‘Hole in the Wall’ experiments, which have shown that students can teach themselves and each other through self-instruction. In fact, his research suggests that <mark class="evidence" id="ev-3a-ex4-4" data-q="3a-ex4-4"><span class="syn-pair-1" data-q="3a-ex4-4">the presence of someone in charge is neither essential nor desirable</span></mark>. This minimally invasive education is a practical example of the argument that ‘the mind is not a pot to be filled, but a fire to be started’, but is yet to be tested.</p>
            <p><span class="para-tag">Para G</span> <strong>From the experiment we can draw two conclusions.</strong> Firstly, no one has the monopoly on what is right and wrong with teaching and learning (not even the Finns, currently the world’s leaders in education). Secondly, each country has an educational approach which is <mark class="evidence" id="ev-3a-ex4-5" data-q="3a-ex4-5"><span class="syn-pair-1" data-q="3a-ex4-5">unique and reflects the values and expectations of its society</span></mark>, after decades, if not centuries, of experiment and practice. If nothing else, this experiment proves that point to be true.</p>
        `,
        summaryText: `
            The BBC introduced an experiment to bring Chinese teachers to a British school because of the <strong>1.</strong> <input type="text" class="blank-input" data-ans="success|triumph" placeholder="word..." style="width:130px; font-weight:700;"> <button class="syn-btn" data-ev="ev-3a-1" onclick="deckEngine.toggleSynonymExplanation('3a-1', 'ev-3a-1')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence in Passage">💡</button> of Chinese students in exams. The test results of students with the Chinese teachers were compared to the results of a <strong>2.</strong> <input type="text" class="blank-input" data-ans="control group" placeholder="phrase..." style="width:160px; font-weight:700;"> <button class="syn-btn" data-ev="ev-3a-2" onclick="deckEngine.toggleSynonymExplanation('3a-2', 'ev-3a-2')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence in Passage">💡</button>. Students and teachers were asked about their <strong>3.</strong> <input type="text" class="blank-input" data-ans="experiences" placeholder="word..." style="width:140px; font-weight:700;"> <button class="syn-btn" data-ev="ev-3a-3" onclick="deckEngine.toggleSynonymExplanation('3a-3', 'ev-3a-3')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence in Passage">💡</button> at the end of the experiment. Chinese teachers thought their students were better <strong>4.</strong> <input type="text" class="blank-input" data-ans="behaved" placeholder="word..." style="width:130px; font-weight:700;"> <button class="syn-btn" data-ev="ev-3a-4" onclick="deckEngine.toggleSynonymExplanation('3a-4', 'ev-3a-4')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence in Passage">💡</button> than British children. However, the British children <strong>5.</strong> <input type="text" class="blank-input" data-ans="admitted" placeholder="word..." style="width:130px; font-weight:700;"> <button class="syn-btn" data-ev="ev-3a-5" onclick="deckEngine.toggleSynonymExplanation('3a-5', 'ev-3a-5')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence in Passage">💡</button> that they were particularly naughty because they felt uncomfortable. In addition, class rules meant children felt unable to use their <strong>6.</strong> <input type="text" class="blank-input" data-ans="imagination" placeholder="word..." style="width:150px; font-weight:700;"> <button class="syn-btn" data-ev="ev-3a-6" onclick="deckEngine.toggleSynonymExplanation('3a-6', 'ev-3a-6')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence in Passage">💡</button> well.
        `,
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph A (Exam Success)",
                badge: "Reading 3a Walkthrough • Q1",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> <mark class="evidence" id="ev-wt-3a-1" data-q="wt-3a-1">"The reasons behind the experiment were obvious. <span class="syn-pair-1" data-q="wt-3a-1">Chinese students regularly come near the top in international comparison tests</span> of students around the planet. They <span class="syn-pair-2" data-q="wt-3a-1"><span class="vocab-word" data-word="triumph" data-def="To achieve a great victory, success, or outcome." data-ipa="/ˈtraɪ.əmf/" data-pos="verb">triumph</span> in Maths, Reading and Science</span>, while in the UK, young people have been getting lower marks in recent years."</mark>`,
                question: `1. The BBC introduced an experiment to bring Chinese teachers to a British school because of the exam <span class="syn-pair-2" data-q="wt-3a-1">[ 1 ]</span> of Chinese students.`,
                ans: "success|triumph",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"Chinese students in exams"</em> ↔ <em>"triumph in Maths, Reading and Science"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Grammar Key:</span> Noun required after <em>"exam"</em>. Target word from box: <strong>success</strong> (or <strong>triumph</strong>).</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph B (Benchmark Group)",
                badge: "Reading 3a Walkthrough • Q2",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> <mark class="evidence" id="ev-wt-3a-2" data-q="wt-3a-2">"The students in the study group, and <span class="syn-pair-1" data-q="wt-3a-2">another <span class="vocab-word" data-word="control group" data-def="A benchmark group that does not receive experimental treatment." data-ipa="/kənˈtrəʊl ɡruːp/" data-pos="noun">control group</span></span> who received regular lessons, were <span class="syn-pair-2" data-q="wt-3a-2">tested at the end of the period and an analysis of the results was carried out</span>."</mark>`,
                question: `2. The test results of students with the Chinese teachers were compared to the results of a <span class="syn-pair-1" data-q="wt-3a-2">[ 2 ]</span>.`,
                ans: "control group",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"compared to the results of..."</em> ↔ <em>"study group, and another control group who received regular lessons"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Exact Term:</span> <strong>control group</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph B (Post-Trial Feedback)",
                badge: "Reading 3a Walkthrough • Q3",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> <mark class="evidence" id="ev-wt-3a-3" data-q="wt-3a-3">"In addition, both teachers and students who participated in the experiment were <span class="syn-pair-1" data-q="wt-3a-3">given interviews with one of the researchers</span> on <span class="syn-pair-2" data-q="wt-3a-3">how they felt about what happened</span>."</mark>`,
                question: `3. Students and teachers were asked about their <span class="syn-pair-2" data-q="wt-3a-3">[ 3 ]</span> at the end of the experiment.`,
                ans: "experiences",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"asked about"</em> ↔ <em>"given interviews on"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"how they felt about what happened"</em> = their <strong>experiences</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph C (Classroom Discipline)",
                badge: "Reading 3a Walkthrough • Q4",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> <mark class="evidence" id="ev-wt-3a-4" data-q="wt-3a-4">"The biggest difference between the two cultures was the lack of discipline in British schools. One Chinese teacher pointed out, <span class="syn-pair-1" data-q="wt-3a-4">‘In China we don’t need classroom management skills</span> because <span class="syn-pair-2" data-q="wt-3a-4">everyone is disciplined by nature, by families, by society.’</span>"</mark>`,
                question: `4. Chinese teachers thought their students were better <span class="syn-pair-2" data-q="wt-3a-4">[ 4 ]</span> than British children.`,
                ans: "behaved",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"disciplined by nature"</em> ↔ <em>"better behaved"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Compound Adjective:</span> <em>"better"</em> pairs with past participle <strong>behaved</strong> (well-behaved).</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph C (Pupil Disruption)",
                badge: "Reading 3a Walkthrough • Q5",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> <mark class="evidence" id="ev-wt-3a-5" data-q="wt-3a-5">"Interestingly, students <span class="syn-pair-1" data-q="wt-3a-5"><span class="vocab-word" data-word="admitted" data-def="Confessed or acknowledged reluctantly." data-ipa="/ədˈmɪt.ɪd/" data-pos="verb">admitted</span> that they found themselves <span class="syn-pair-2" data-q="wt-3a-5">behaving worse during the experiment</span> than they normally would</span> for their British teachers."</mark>`,
                question: `5. However, the British children <span class="syn-pair-1" data-q="wt-3a-5">[ 5 ]</span> that they were particularly naughty because they felt uncomfortable.`,
                ans: "admitted",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"particularly naughty / behaving worse"</em> ↔ <em>"found themselves behaving worse"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Reporting Verb:</span> Past tense verb <strong>admitted</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph D (Creativity & Free-Thinking)",
                badge: "Reading 3a Walkthrough • Q6",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> <mark class="evidence" id="ev-wt-3a-6" data-q="wt-3a-6">"The Chinese teachers were uncomfortable with any attempt to ask questions, as it would stop the flow of the lesson they had planned in which there was <span class="syn-pair-1" data-q="wt-3a-6">no opportunity for <span class="vocab-word" data-word="free-thinking" data-def="Forming one's own opinions independently without dogma." data-ipa="/ˈfriːˌθɪŋ.kɪŋ/" data-pos="noun">free-thinking</span></span>."</mark>`,
                question: `6. In addition, class rules meant children felt unable to use their <span class="syn-pair-1" data-q="wt-3a-6">[ 6 ]</span> well.`,
                ans: "imagination",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Paraphrase Key:</span> <em>"no opportunity for free-thinking"</em> ↔ <em>"unable to use their imagination well"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>imagination</strong>.</div>`
            }
        ]
    },

    // Reading 3a Part 2: Exercise 4 (Summary Completion with a Box - Gaps 1 to 5)
    reading3aEx4: {
        walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%206/module-3a-reading-question-walkthrough.html",
        walkthroughTitle: "Module 3a: Education Systems — Deep Question Walkthrough",
        passage: `
            <h3>A CHINESE APPROACH TO LEARNING (PARAS E–G)</h3>
            <p><span class="para-tag">Para E</span> <strong>All of this suggests that an <span class="vocab-word" data-word="obsession" data-def="An idea or thought that continually preoccupies or intrudes on a person's mind." data-ipa="/əbˈseʃ.ən/" data-pos="noun">obsession</span> with testing does not exist in the UK, which would be untrue.</strong> The purpose of the experiment was to see if British students would benefit from the Chinese approach. However, <mark class="evidence" id="ev-3a-ex4-1" data-q="3a-ex4-1"><span class="syn-pair-1" data-q="3a-ex4-1">the message that the test result is the only thing that matters</span></mark> may not be getting through to students. One young person commented that <mark class="evidence" id="ev-3a-ex4-2" data-q="3a-ex4-2">‘Their teaching methods did get results but we didn’t always feel we were learning much. <span class="syn-pair-1" data-q="3a-ex4-2">They get results because we are in school for so long</span>.’</mark></p>
            <p><span class="para-tag">Para F</span> <strong>It is not just the contrast between Chinese and British education systems.</strong> In India, a far more radical approach is being taken. At the cutting edge of educational research is the idea that <mark class="evidence" id="ev-3a-ex4-3" data-q="3a-ex4-3"><span class="syn-pair-1" data-q="3a-ex4-3">a little chaos in the classroom is not necessarily a bad thing</span></mark>. Professor Sugata Mitra has introduced the ‘Classroom in the Cloud’ based on his ‘Hole in the Wall’ experiments, which have shown that students can teach themselves and each other through self-instruction. In fact, his research suggests that <mark class="evidence" id="ev-3a-ex4-4" data-q="3a-ex4-4"><span class="syn-pair-1" data-q="3a-ex4-4">the presence of someone in charge is neither essential nor desirable</span></mark>. This minimally invasive education is a practical example of the argument that ‘the mind is not a pot to be filled, but a fire to be started’, but is yet to be tested.</p>
            <p><span class="para-tag">Para G</span> <strong>From the experiment we can draw two conclusions.</strong> Firstly, no one has the monopoly on what is right and wrong with teaching and learning (not even the Finns, currently the world’s leaders in education). Secondly, each country has an educational approach which is <mark class="evidence" id="ev-3a-ex4-5" data-q="3a-ex4-5"><span class="syn-pair-1" data-q="3a-ex4-5">unique and reflects the values and expectations of its society</span></mark>, after decades, if not centuries, of experiment and practice. If nothing else, this experiment proves that point to be true.</p>
        `,
        boxOptions: [
            { letter: "A", text: "unnecessary" },
            { letter: "B", text: "technology" },
            { letter: "C", text: "styles" },
            { letter: "D", text: "hours" },
            { letter: "E", text: "interest" },
            { letter: "F", text: "environment" },
            { letter: "G", text: "teachers" },
            { letter: "H", text: "benefit" },
            { letter: "I", text: "classmates" }
        ],
        summaryBox: `
            <div class="card" style="background:#f8fafc; border:1.5px solid #cbd5e1; border-left:5px solid var(--col-reading); padding:10px 14px; margin-bottom:10px;">
                <div style="font-size:14px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:6px;">📦 Option Box (A–I)</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px; font-size:14px;">
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>A.</strong> unnecessary</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>B.</strong> technology</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>C.</strong> styles</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>D.</strong> hours</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>E.</strong> interest</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>F.</strong> environment</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>G.</strong> teachers</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>H.</strong> benefit</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:2px 7px; border-radius:5px; font-weight:700;"><strong>I.</strong> classmates</span>
                </div>
            </div>
            <div class="card" style="padding:14px 18px; font-size:17.5px; line-height:1.9; color:#0f172a; background:#ffffff; border:1px solid #e2e8f0; border-radius:10px;">
                <div style="font-size:15px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:6px;">📋 Test Practice (Gaps 1–5)</div>
                1. The author believes the British have an excessive <strong>1.</strong> <select class="select-input" data-ans="E" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E (interest)</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-3a-ex4-1" onclick="deckEngine.toggleSynonymExplanation('3a-ex4-1', 'ev-3a-ex4-1')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> in student results.<br>
                2. Students felt that positive results of Chinese educators was thanks to their teaching <strong>2.</strong> <select class="select-input" data-ans="D" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D (hours)</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-3a-ex4-2" onclick="deckEngine.toggleSynonymExplanation('3a-ex4-2', 'ev-3a-ex4-2')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> more than anything else.<br>
                3. In India, some educational experts have seen a disorderly classroom as a <strong>3.</strong> <select class="select-input" data-ans="H" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H (benefit)</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-3a-ex4-3" onclick="deckEngine.toggleSynonymExplanation('3a-ex4-3', 'ev-3a-ex4-3')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button>.<br>
                4. In one project, researchers have tried removing <strong>4.</strong> <select class="select-input" data-ans="G" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G (teachers)</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-3a-ex4-4" onclick="deckEngine.toggleSynonymExplanation('3a-ex4-4', 'ev-3a-ex4-4')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> from classrooms with some success.<br>
                5. The author concludes that education systems tend to be the result of the <strong>5.</strong> <select class="select-input" data-ans="F" style="width:140px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F (environment)</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-3a-ex4-5" onclick="deckEngine.toggleSynonymExplanation('3a-ex4-5', 'ev-3a-ex4-5')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> around them.
            </div>
        `,
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph E (Testing Obsession)",
                badge: "Reading 3a Ex 4 Walkthrough • Q1",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-3a-ex4-1" data-q="wt-3a-ex4-1">"All of this suggests that an <span class="syn-pair-1" data-q="wt-3a-ex4-1">obsession with testing</span> does not exist in the UK, <span class="syn-pair-2" data-q="wt-3a-ex4-1">which would be untrue</span>."</mark>`,
                question: `1. The author believes the British have an excessive <span class="syn-pair-1" data-q="wt-3a-ex4-1">[ 1 ]</span> in student results.`,
                ans: "E",
                boxOptions: [
                    { letter: "A", text: "unnecessary" }, { letter: "B", text: "technology" }, { letter: "C", text: "styles" },
                    { letter: "D", text: "hours" }, { letter: "E", text: "interest" }, { letter: "F", text: "environment" },
                    { letter: "G", text: "teachers" }, { letter: "H", text: "benefit" }, { letter: "I", text: "classmates" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"excessive interest in results"</em> ↔ <em>"obsession with testing"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <strong>E (interest)</strong> is the abstract noun synonym for preoccupation/obsession.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph E (School Hours & Time)",
                badge: "Reading 3a Ex 4 Walkthrough • Q2",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-3a-ex4-2" data-q="wt-3a-ex4-2">"One young person commented that ‘Their teaching methods did get results but we didn’t always feel we were learning much. <span class="syn-pair-1" data-q="wt-3a-ex4-2">They get results because we are in school for so long</span>.’"</mark>`,
                question: `2. Students felt that positive results were thanks to teaching <span class="syn-pair-1" data-q="wt-3a-ex4-2">[ 2 ]</span> more than anything else.`,
                ans: "D",
                boxOptions: [
                    { letter: "A", text: "unnecessary" }, { letter: "B", text: "technology" }, { letter: "C", text: "styles" },
                    { letter: "D", text: "hours" }, { letter: "E", text: "interest" }, { letter: "F", text: "environment" },
                    { letter: "G", text: "teachers" }, { letter: "H", text: "benefit" }, { letter: "I", text: "classmates" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"teaching hours"</em> ↔ <em>"in school for so long"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>D (hours)</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph F (Classroom Chaos as Benefit)",
                badge: "Reading 3a Ex 4 Walkthrough • Q3",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> <mark class="evidence" id="ev-wt-3a-ex4-3" data-q="wt-3a-ex4-3">"At the cutting edge of educational research is the idea that <span class="syn-pair-1" data-q="wt-3a-ex4-3">a little chaos in the classroom is not necessarily a bad thing</span>."</mark>`,
                question: `3. In India, some educational experts have seen a disorderly classroom as a <span class="syn-pair-1" data-q="wt-3a-ex4-3">[ 3 ]</span>.`,
                ans: "H",
                boxOptions: [
                    { letter: "A", text: "unnecessary" }, { letter: "B", text: "technology" }, { letter: "C", text: "styles" },
                    { letter: "D", text: "hours" }, { letter: "E", text: "interest" }, { letter: "F", text: "environment" },
                    { letter: "G", text: "teachers" }, { letter: "H", text: "benefit" }, { letter: "I", text: "classmates" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"disorderly classroom as a benefit"</em> ↔ <em>"a little chaos... not necessarily a bad thing"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>H (benefit)</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph F (Removing Teachers)",
                badge: "Reading 3a Ex 4 Walkthrough • Q4",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> <mark class="evidence" id="ev-wt-3a-ex4-4" data-q="wt-3a-ex4-4">"In fact, his research suggests that <span class="syn-pair-1" data-q="wt-3a-ex4-4">the presence of someone in charge is neither essential nor desirable</span>. This minimally invasive education is a practical example..."</mark>`,
                question: `4. In one project, researchers have tried removing <span class="syn-pair-1" data-q="wt-3a-ex4-4">[ 4 ]</span> from classrooms with some success.`,
                ans: "G",
                boxOptions: [
                    { letter: "A", text: "unnecessary" }, { letter: "B", text: "technology" }, { letter: "C", text: "styles" },
                    { letter: "D", text: "hours" }, { letter: "E", text: "interest" }, { letter: "F", text: "environment" },
                    { letter: "G", text: "teachers" }, { letter: "H", text: "benefit" }, { letter: "I", text: "classmates" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"removing teachers"</em> ↔ <em>"presence of someone in charge is neither essential nor desirable"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Role Match:</span> <strong>G (teachers)</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph G (Societal Environment)",
                badge: "Reading 3a Ex 4 Walkthrough • Q5",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Para G]</span> <mark class="evidence" id="ev-wt-3a-ex4-5" data-q="wt-3a-ex4-5">"Secondly, each country has an educational approach which is unique and <span class="syn-pair-1" data-q="wt-3a-ex4-5">reflects the values and expectations of its society</span>, after decades, if not centuries, of experiment and practice."</mark>`,
                question: `5. The author concludes that education systems tend to be the result of the <span class="syn-pair-1" data-q="wt-3a-ex4-5">[ 5 ]</span> around them.`,
                ans: "F",
                boxOptions: [
                    { letter: "A", text: "unnecessary" }, { letter: "B", text: "technology" }, { letter: "C", text: "styles" },
                    { letter: "D", text: "hours" }, { letter: "E", text: "interest" }, { letter: "F", text: "environment" },
                    { letter: "G", text: "teachers" }, { letter: "H", text: "benefit" }, { letter: "I", text: "classmates" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"result of the environment"</em> ↔ <em>"reflects the values and expectations of its society"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>F (environment)</strong>.</div>`
            }
        ]
    },

    // Reading 3b: The Dark Side of Emotional Intelligence (Full Exact Passage from module-3-content-v2.md)
    reading3b: {
        walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%206/module-3b-reading-question-walkthrough.html",
        walkthroughTitle: "Module 3b: Emotional Intelligence — Deep Question Walkthrough",
        passage: `
            <h3>THE DARK SIDE OF EMOTIONAL INTELLIGENCE</h3>
            <p><span class="para-tag">Para A</span> <strong>Since the 1995 publication of Daniel Goleman’s bestseller, <em>Emotional Intelligence</em>, the idea has been used by government leaders and educators as the solution to a wide range of problems.</strong> <mark class="evidence" id="ev-3b-1" data-q="3b-1"><span class="syn-pair-1" data-q="3b-1">If we can encourage emotional intelligence among school children, leaders and doctors, we’ll have more caring educational institutions, workplaces and better healthcare</span></mark>. <mark class="evidence" id="ev-3b-2" data-q="3b-2">As a result, emotional intelligence is now taught widely in secondary schools, business schools and medical schools.</mark></p>
            <p><span class="para-tag">Para B</span> <strong>Since the book’s publication, social scientists have begun to document emotional intelligence with more reliable research methodologies and a more complex picture is emerging.</strong> Research led by University of Cambridge Professor Jochen Menges suggested that, <mark class="evidence" id="ev-3b-3" data-q="3b-3">when a leader gave an inspiring speech filled with emotion, the audience was less likely to challenge the message and <span class="syn-pair-2" data-q="3b-3"><span class="vocab-word" data-word="retained" data-def="Kept in mind or remembered." data-ipa="/rɪˈteɪnd/" data-pos="verb">remembered less</span> of the content</span></mark>. Interestingly, though, audience members were so moved by the speech that they believed that they had remembered more of it.</p>
            <p><span class="para-tag">Para C</span> <strong>It is clear that leaders who master emotions can rob us of our capabilities to reason.</strong> In a study led by psychologist Stephane Cote of the University of Toronto, university employees filled out a survey about their <span class="vocab-word" data-word="manipulative" data-def="Exercising unscrupulous control or influence over a person or situation." data-ipa="/məˈnɪp.jə.lə.tɪv/" data-pos="adj.">manipulative</span> tendencies, and took a test measuring their emotional intelligence. Then, Cote’s team studied how they interacted on the job. <mark class="evidence" id="ev-3b-4" data-q="3b-4">The employees who engaged in the most harmful behaviours were masters of manipulation with high emotional intelligence, <span class="syn-pair-1" data-q="3b-4">using their emotional skills to <span class="vocab-word" data-word="demean" data-def="Cause someone to lose dignity and the respect of others." data-ipa="/dɪˈmiːn/" data-pos="verb">demean</span> and embarrass their peers</span> for personal gain.</mark></p>
            <p><span class="para-tag">Para D</span> <strong>Of course, people aren’t always using emotional intelligence for evil ends and emotional intelligence is certainly a skill that can be taught to others.</strong> In a study of emotions at the Body Shop, a research team led by Stanford professor Joanne Martin discovered that founder <mark class="evidence" id="ev-3b-6" data-q="3b-6">Anita Roddick <span class="syn-pair-1" data-q="3b-6">used emotions to inspire her employees to fundraise for charity</span></mark>. As Roddick explained, ‘Whenever we wanted to persuade our staff to support a particular project we always tried to break their hearts.’ Roddick was often held up as an example of an emotionally intelligent leader.</p>
            <p><span class="para-tag">Para E</span> <strong>However, emotional intelligence may have hidden costs.</strong> <mark class="evidence" id="ev-3b-7" data-q="3b-7">Recently, <span class="syn-pair-1" data-q="3b-7">psychologists from the University of Central Florida</span> comprehensively analysed every study that has ever examined the link between emotional intelligence and job performance.</mark> They found that in jobs that required extensive attention to emotions, higher emotional intelligence translated into better work. <mark class="evidence" id="ev-3b-7b" data-q="3b-7">However, in jobs such as <span class="syn-pair-2" data-q="3b-7">mechanics, scientists and accountants</span> the results were reversed.</mark> Although more research is needed, one promising explanation is that these employees were paying attention to emotions when they should have been focusing on their tasks. <mark class="evidence" id="ev-3b-8" data-q="3b-8">If your job is to analyse data or repair cars, it can be quite distracting to read the <span class="syn-pair-1" data-q="3b-8">facial expressions, vocal tones and body language</span> of the people around you.</mark> In suggesting that emotional intelligence is necessary in the workplace, perhaps we’ve been misguided.</p>
            <p><span class="para-tag">Para F</span> <strong>Instead of assuming that emotional intelligence is always useful, we need to think more carefully about where and when it matters.</strong> In a recent study at a healthcare company, employees were asked to complete a test about managing and regulating emotions, and then <mark class="evidence" id="ev-3b-10" data-q="3b-10"><span class="syn-pair-1" data-q="3b-10">managers were asked to evaluate how much time employees spent helping</span> their colleagues and customers</mark>. <mark class="evidence" id="ev-3b-11" data-q="3b-11">The relationship between emotional intelligence and <span class="syn-pair-1" data-q="3b-11">helping simply didn’t exist</span>: helping is driven more by our motivations and values.</mark> However, <mark class="evidence" id="ev-3b-9" data-q="3b-9">emotional intelligence was <span class="syn-pair-1" data-q="3b-9">significant when examining a different behaviour</span>: <span class="syn-pair-2" data-q="3b-9">challenging existing situations</span> and speaking up with ideas and suggestions for improvement.</mark></p>
            <p><span class="para-tag">Para G</span> <strong>Emotionally intelligent employees spoke up more often and more effectively.</strong> <mark class="evidence" id="ev-3b-12" data-q="3b-12">When colleagues were <span class="syn-pair-2" data-q="3b-12">treated unjustly</span>, they felt they had to speak up, but were <span class="syn-pair-1" data-q="3b-12">able to keep their anger in check and reason with others</span>.</mark> When they took risks, for example when advocating for gender equality, emotional intelligence helped them keep their fear under control. <mark class="evidence" id="ev-3b-13" data-q="3b-13">When they brought ideas for innovation to senior leaders, <span class="syn-pair-1" data-q="3b-13">their ability to express enthusiasm</span> helped them <span class="syn-pair-2" data-q="3b-13">avoid threatening leaders</span>.</mark> There is now growing recognition that emotional intelligence – like any skill – can be used for good or evil. So if we’re going to teach emotional intelligence in schools and develop it at work, we need to consider the values that go along with it and where it’s actually useful.</p>
        `,
        questions: [
            { qNum: 1, text: "1. Politicians have tried to use EI as a tool for social change.", ans: "YES", evId: "ev-3b-1" },
            { qNum: 2, text: "2. Schools and hospitals have seen an improvement in standards since 1995.", ans: "NOT GIVEN", evId: "ev-3b-2" },
            { qNum: 3, text: "3. Menges’ study showed people had better recall of facts from emotional speeches.", ans: "NO", evId: "ev-3b-3" },
            { qNum: 4, text: "4. Emotionally intelligent people make colleagues feel silly more often than others.", ans: "YES", evId: "ev-3b-4" },
            { qNum: 5, text: "5. People experience more job satisfaction after emotional awareness training.", ans: "NOT GIVEN", evId: "ev-3b-5" },
            { qNum: 6, text: "6. Anita Roddick used emotional appeals for good causes.", ans: "YES", evId: "ev-3b-6" }
        ],
        summaryBox: `
            <div class="card" style="background:#f8fafc; border:1.5px solid #cbd5e1; border-left:5px solid var(--col-reading); padding:12px 16px; margin-top:16px; margin-bottom:12px;">
                <div style="font-size:15px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:8px;">📦 Options Box (Questions 7–13)</div>
                <div style="display:flex; flex-wrap:wrap; gap:6px; font-size:14.5px;">
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>A.</strong> researchers</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>B.</strong> focus</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>C.</strong> enthusiasm</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>D.</strong> disrespect</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>E.</strong> negative</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>F.</strong> speeches</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>G.</strong> situations</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>H.</strong> no</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>I.</strong> significant</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>J.</strong> managers</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>K.</strong> complaints</span>
                    <span class="box-chip" style="background:#ffffff; border:1px solid #cbd5e1; padding:3px 8px; border-radius:6px; font-weight:700;"><strong>L.</strong> decision</span>
                </div>
            </div>
            <div class="card" style="padding:16px 20px; font-size:18px; line-height:2.0; color:#0f172a; background:#ffffff; border:1px solid #e2e8f0; border-radius:10px; margin-bottom:12px;">
                <div style="font-size:16px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:8px;">📋 Questions 7–13: Summary Completion with a Box</div>
                In the University of Florida study, emotional intelligence had a more <strong>7.</strong> <select class="select-input" data-ans="E" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E (negative)</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option></select> <button class="syn-btn" data-ev="ev-wt-3b-7" onclick="deckEngine.toggleSynonymExplanation('3b-7', 'ev-wt-3b-7')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> effect on people who worked in jobs such as accountancy and motor repairs. They found that emotionally intelligent people made faces and gestures their main <strong>8.</strong> <select class="select-input" data-ans="B" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B (focus)</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option></select> <button class="syn-btn" data-ev="ev-wt-3b-8" onclick="deckEngine.toggleSynonymExplanation('3b-8', 'ev-wt-3b-8')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button>, which weakened other skills. They concluded that emotional intelligence can matter in some <strong>9.</strong> <select class="select-input" data-ans="G" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G (situations)</option><option value="H">H</option><option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option></select> <button class="syn-btn" data-ev="ev-wt-3b-9" onclick="deckEngine.toggleSynonymExplanation('3b-9', 'ev-wt-3b-9')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button>. For example, <strong>10.</strong> <select class="select-input" data-ans="J" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option><option value="J">J (managers)</option><option value="K">K</option><option value="L">L</option></select> <button class="syn-btn" data-ev="ev-wt-3b-10" onclick="deckEngine.toggleSynonymExplanation('3b-10', 'ev-wt-3b-10')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> were asked questions about workers’ behaviour after a series of tests. They observed <strong>11.</strong> <select class="select-input" data-ans="H" style="width:120px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H (no)</option><option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option></select> <button class="syn-btn" data-ev="ev-wt-3b-11" onclick="deckEngine.toggleSynonymExplanation('3b-11', 'ev-wt-3b-11')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> difference between workers with high or low EI when it came to helpfulness. They found that workers with higher EI felt more comfortable making <strong>12.</strong> <select class="select-input" data-ans="K" style="width:140px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option><option value="J">J</option><option value="K">K (complaints)</option><option value="L">L</option></select> <button class="syn-btn" data-ev="ev-wt-3b-12" onclick="deckEngine.toggleSynonymExplanation('3b-12', 'ev-wt-3b-12')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> when treated unjustly. Supervisors were more likely to listen because the <strong>13.</strong> <select class="select-input" data-ans="C" style="width:140px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C (enthusiasm)</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option><option value="J">J</option><option value="K">K</option><option value="L">L</option></select> <button class="syn-btn" data-ev="ev-wt-3b-13" onclick="deckEngine.toggleSynonymExplanation('3b-13', 'ev-wt-3b-13')" style="padding:2px 8px; font-size:13px;" title="Highlight Evidence">💡</button> of emotionally intelligent people made ideas easier to accept.
            </div>
        `,
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph A (Government Leaders)",
                badge: "Reading 3b Walkthrough • Q1",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> <mark class="evidence" id="ev-wt-3b-1" data-q="wt-3b-1">"Since the 1995 publication of Daniel Goleman’s bestseller, Emotional Intelligence, <span class="syn-pair-1" data-q="wt-3b-1">the idea has been used by government leaders and educators as the solution to a wide range of problems</span>. If we can encourage emotional intelligence... we’ll have <span class="syn-pair-2" data-q="wt-3b-1">more caring educational institutions, workplaces and better healthcare</span>."</mark>`,
                question: "1. Politicians have tried to use emotional intelligence as a tool for social change.",
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Claim Agreement:</span> <strong>YES.</strong> <em>"Politicians"</em> = <em>"government leaders"</em>; <em>"tool for social change"</em> = <em>"solution to a wide range of problems... more caring workplaces/healthcare"</em>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph A (School & Hospital Standards)",
                badge: "Reading 3b Walkthrough • Q2",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> <mark class="evidence" id="ev-wt-3b-2" data-q="wt-3b-2">"As a result, <span class="syn-pair-1" data-q="wt-3b-2">emotional intelligence is now taught widely in secondary schools, business schools and medical schools</span>."</mark>`,
                question: "2. Schools and hospitals have seen an improvement in standards since 1995.",
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag purple">Missing Comparison:</span> <strong>NOT GIVEN.</strong> The passage confirms EI is *taught* in schools/medical schools, but provides *no measurement or data showing whether standards actually improved*.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph B (Menges Speech Study)",
                badge: "Reading 3b Walkthrough • Q3",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> <mark class="evidence" id="ev-wt-3b-3" data-q="wt-3b-3">"Research led by University of Cambridge Professor Jochen Menges suggested that, when a leader gave an inspiring speech filled with emotion, <span class="syn-pair-1" data-q="wt-3b-3">the audience was less likely to challenge the message</span> and <span class="syn-pair-2" data-q="wt-3b-3"><span class="vocab-word" data-word="retained" data-def="Kept in mind or remembered." data-ipa="/rɪˈteɪnd/" data-pos="verb">remembered less</span> of the content</span>."</mark>`,
                question: "3. Menges’ study showed that people had better recall of facts if a speaker stirred strong feelings.",
                ans: "NO",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag red" style="background:#fee2e2; color:#b91c1c; padding:2px 8px; border-radius:4px; font-weight:800;">Direct Contradiction:</span> <strong>NO.</strong> The text states they <em>"remembered less of the content"</em>, which directly contradicts <em>"better recall of facts"</em>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph C (Demeaning Colleagues)",
                badge: "Reading 3b Walkthrough • Q4",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> <mark class="evidence" id="ev-wt-3b-4" data-q="wt-3b-4">"The employees who engaged in the most harmful behaviours were masters of manipulation with high emotional intelligence, <span class="syn-pair-1" data-q="wt-3b-4">using emotional skills to <span class="vocab-word" data-word="demean" data-def="Cause someone to lose dignity and the respect of others." data-ipa="/dɪˈmiːn/" data-pos="verb">demean</span> and embarrass peers</span>."</mark>`,
                question: "4. Emotionally intelligent people make colleagues feel silly more often than others.",
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Claim Agreement:</span> <strong>YES.</strong> High EI workers engaged in harmful behaviours, using emotional skills to demean and embarrass peers for personal gain.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraphs D/E (Job Satisfaction)",
                badge: "Reading 3b Walkthrough • Q5",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraphs D & E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-3b-5" data-q="wt-3b-5">"In jobs such as mechanics, scientists and accountants, higher emotional intelligence translated into lower performance. These employees were paying attention to facial expressions and vocal tones when they should have been analysing data or repairing cars."</mark>`,
                question: "5. People experience more job satisfaction after emotional awareness training.",
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag purple">Total Absence:</span> <strong>NOT GIVEN.</strong> The entire passage never discusses or measures <em>job satisfaction</em> after training.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph D (Anita Roddick & Charity)",
                badge: "Reading 3b Walkthrough • Q6",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> <mark class="evidence" id="ev-wt-3b-6" data-q="wt-3b-6">"In a study at the Body Shop, Stanford professor Joanne Martin discovered that founder <span class="syn-pair-1" data-q="wt-3b-6">Anita Roddick <span class="syn-pair-2" data-q="wt-3b-6">used emotions to inspire her employees to fundraise for charity</span></span>. ‘Whenever we wanted to persuade our staff to support a particular project <span class="syn-pair-2" data-q="wt-3b-6">we always tried to break their hearts</span>.’"</mark>`,
                question: "6. Anita Roddick used emotional appeals for good causes.",
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Claim Agreement:</span> <strong>YES.</strong> <em>"emotional appeals"</em> = <em>"used emotions / break their hearts"</em>; <em>"good causes"</em> = <em>"fundraise for charity"</em>.</div>`
            }
        ],
        boxOptions: [
            { letter: "A", text: "researchers" },
            { letter: "B", text: "focus" },
            { letter: "C", text: "enthusiasm" },
            { letter: "D", text: "disrespect" },
            { letter: "E", text: "negative" },
            { letter: "F", text: "speeches" },
            { letter: "G", text: "situations" },
            { letter: "H", text: "no" },
            { letter: "I", text: "significant" },
            { letter: "J", text: "managers" },
            { letter: "K", text: "complaints" },
            { letter: "L", text: "decision" }
        ],
        boxWalkthroughs: [
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph E (Negative Effect in Technical Roles)",
                badge: "Reading 3b Walkthrough • Q7",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-3b-7" data-q="wt-3b-7">"In jobs such as mechanics, scientists and accountants, <span class="syn-pair-1" data-q="wt-3b-7">higher emotional intelligence translated into lower performance</span>. These employees were paying attention to facial expressions and vocal tones when they should have been analysing data or repairing cars."</mark>`,
                question: `7. In the University of Florida study, emotional intelligence had a more <span class="syn-pair-1" data-q="wt-3b-7">[ 7 ]</span> effect on people who worked in jobs such as accountancy and motor repairs.`,
                ans: "E",
                boxOptions: [
                    { letter: "A", text: "researchers" }, { letter: "B", text: "focus" }, { letter: "C", text: "enthusiasm" },
                    { letter: "D", text: "disrespect" }, { letter: "E", text: "negative" }, { letter: "F", text: "speeches" },
                    { letter: "G", text: "situations" }, { letter: "H", text: "no" }, { letter: "I", text: "significant" },
                    { letter: "J", text: "managers" }, { letter: "K", text: "complaints" }, { letter: "L", text: "decision" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"accountancy and motor repairs"</em> ↔ <em>"mechanics, scientists and accountants"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"translated into lower performance / reversed results"</em> means it had a more <strong>E (negative)</strong> effect.</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph E (Attention & Primary Focus)",
                badge: "Reading 3b Walkthrough • Q8",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> <mark class="evidence" id="ev-wt-3b-8" data-q="wt-3b-8">"These employees were <span class="syn-pair-1" data-q="wt-3b-8">paying attention to facial expressions and vocal tones</span> when they <span class="syn-pair-2" data-q="wt-3b-8">should have been analysing data or repairing cars</span>."</mark>`,
                question: `8. They found that emotionally intelligent people made faces and gestures their main <span class="syn-pair-1" data-q="wt-3b-8">[ 8 ]</span>, which weakened other skills.`,
                ans: "B",
                boxOptions: [
                    { letter: "A", text: "researchers" }, { letter: "B", text: "focus" }, { letter: "C", text: "enthusiasm" },
                    { letter: "D", text: "disrespect" }, { letter: "E", text: "negative" }, { letter: "F", text: "speeches" },
                    { letter: "G", text: "situations" }, { letter: "H", text: "no" }, { letter: "I", text: "significant" },
                    { letter: "J", text: "managers" }, { letter: "K", text: "complaints" }, { letter: "L", text: "decision" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"paying attention to faces and vocal tones"</em> ↔ <em>"made faces and gestures their main focus"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>B (focus)</strong>.</div>`
            },
            {
                qNum: 9,
                title: "Walkthrough: Question 9 & Paragraph F (Challenging Situations)",
                badge: "Reading 3b Walkthrough • Q9",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> <mark class="evidence" id="ev-wt-3b-9" data-q="wt-3b-9">"However, <span class="syn-pair-1" data-q="wt-3b-9">emotional intelligence was significant when challenging existing situations</span> and speaking up with ideas."</mark>`,
                question: `9. They concluded that emotional intelligence can matter in some <span class="syn-pair-1" data-q="wt-3b-9">[ 9 ]</span>.`,
                ans: "G",
                boxOptions: [
                    { letter: "A", text: "researchers" }, { letter: "B", text: "focus" }, { letter: "C", text: "enthusiasm" },
                    { letter: "D", text: "disrespect" }, { letter: "E", text: "negative" }, { letter: "F", text: "speeches" },
                    { letter: "G", text: "situations" }, { letter: "H", text: "no" }, { letter: "I", text: "significant" },
                    { letter: "J", text: "managers" }, { letter: "K", text: "complaints" }, { letter: "L", text: "decision" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"matter in some situations"</em> ↔ <em>"significant when challenging existing situations"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Exact Match:</span> <strong>G (situations)</strong>.</div>`
            },
            {
                qNum: 10,
                title: "Walkthrough: Question 10 & Paragraph F (Evaluating Managers)",
                badge: "Reading 3b Walkthrough • Q10",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> <mark class="evidence" id="ev-wt-3b-10" data-q="wt-3b-10">"In a study at a healthcare company, <span class="syn-pair-1" data-q="wt-3b-10">managers and supervisors were surveyed about workers' behaviour</span> after a series of workplace tests."</mark>`,
                question: `10. For example, <span class="syn-pair-1" data-q="wt-3b-10">[ 10 ]</span> were asked questions about workers’ behaviour after a series of tests.`,
                ans: "J",
                boxOptions: [
                    { letter: "A", text: "researchers" }, { letter: "B", text: "focus" }, { letter: "C", text: "enthusiasm" },
                    { letter: "D", text: "disrespect" }, { letter: "E", text: "negative" }, { letter: "F", text: "speeches" },
                    { letter: "G", text: "situations" }, { letter: "H", text: "no" }, { letter: "I", text: "significant" },
                    { letter: "J", text: "managers" }, { letter: "K", text: "complaints" }, { letter: "L", text: "decision" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"were asked questions about workers' behaviour"</em> ↔ <em>"managers were surveyed about workers' behaviour"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>J (managers)</strong>.</div>`
            },
            {
                qNum: 11,
                title: "Walkthrough: Question 11 & Paragraph F (Absence of Correlation in Helping)",
                badge: "Reading 3b Walkthrough • Q11",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> <mark class="evidence" id="ev-wt-3b-11" data-q="wt-3b-11">"In a study at a healthcare company, <span class="syn-pair-1" data-q="wt-3b-11">the relationship between emotional intelligence and helping colleagues didn’t exist</span>. Helping is driven by motivations and values."</mark>`,
                question: `11. They observed <span class="syn-pair-1" data-q="wt-3b-11">[ 11 ]</span> difference between workers with high or low EI when it came to helpfulness.`,
                ans: "H",
                boxOptions: [
                    { letter: "A", text: "researchers" }, { letter: "B", text: "focus" }, { letter: "C", text: "enthusiasm" },
                    { letter: "D", text: "disrespect" }, { letter: "E", text: "negative" }, { letter: "F", text: "speeches" },
                    { letter: "G", text: "situations" }, { letter: "H", text: "no" }, { letter: "I", text: "significant" },
                    { letter: "J", text: "managers" }, { letter: "K", text: "complaints" }, { letter: "L", text: "decision" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"relationship didn't exist"</em> ↔ <em>"observed NO difference"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Determiner Match:</span> <strong>H (no)</strong>.</div>`
            },
            {
                qNum: 12,
                title: "Walkthrough: Question 12 & Paragraph G (Speaking Up & Complaints)",
                badge: "Reading 3b Walkthrough • Q12",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Para G]</span> <mark class="evidence" id="ev-wt-3b-12" data-q="wt-3b-12">"Emotionally intelligent employees <span class="syn-pair-1" data-q="wt-3b-12">spoke up more effectively, keeping anger in check</span> and expressing enthusiasm without threatening leaders."</mark>`,
                question: `12. They found that workers with higher EI felt more comfortable making <span class="syn-pair-1" data-q="wt-3b-12">[ 12 ]</span> when treated unjustly.`,
                ans: "K",
                boxOptions: [
                    { letter: "A", text: "researchers" }, { letter: "B", text: "focus" }, { letter: "C", text: "enthusiasm" },
                    { letter: "D", text: "disrespect" }, { letter: "E", text: "negative" }, { letter: "F", text: "speeches" },
                    { letter: "G", text: "situations" }, { letter: "H", text: "no" }, { letter: "I", text: "significant" },
                    { letter: "J", text: "managers" }, { letter: "K", text: "complaints" }, { letter: "L", text: "decision" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"spoke up more effectively"</em> ↔ <em>"felt more comfortable making complaints"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>K (complaints)</strong>.</div>`
            },
            {
                qNum: 13,
                title: "Walkthrough: Question 13 & Paragraph G (Expressing Enthusiasm)",
                badge: "Reading 3b Walkthrough • Q13",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Para G]</span> <mark class="evidence" id="ev-wt-3b-13" data-q="wt-3b-13">"Supervisors were more likely to listen because emotionally intelligent employees were <span class="syn-pair-1" data-q="wt-3b-13">expressing enthusiasm without threatening leaders</span>."</mark>`,
                question: `13. Supervisors were more likely to listen because the <span class="syn-pair-1" data-q="wt-3b-13">[ 13 ]</span> of emotionally intelligent people made ideas easier to accept.`,
                ans: "C",
                boxOptions: [
                    { letter: "A", text: "researchers" }, { letter: "B", text: "focus" }, { letter: "C", text: "enthusiasm" },
                    { letter: "D", text: "disrespect" }, { letter: "E", text: "negative" }, { letter: "F", text: "speeches" },
                    { letter: "G", text: "situations" }, { letter: "H", text: "no" }, { letter: "I", text: "significant" },
                    { letter: "J", text: "managers" }, { letter: "K", text: "complaints" }, { letter: "L", text: "decision" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"expressing enthusiasm without threatening leaders"</em> ↔ <em>"the enthusiasm... made ideas easier to accept"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Noun Match:</span> <strong>C (enthusiasm)</strong>.</div>`
            }
        ]
    }
};
