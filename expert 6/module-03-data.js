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
        slidesCount: 37,
        tags: [
            { text: "Reading 3a/3b", bg: "var(--col-reading)" },
            { text: "Grammar: Comparatives & Verb Patterns", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Education & Business", bg: "var(--col-vocab)" },
            { text: "Writing: Task 1 Charts & Tables", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "3a", title: "Chinese Schooling Experiment & Comparatives Matrix", desc: "Summary completion strategy, academic prepositions, and undergraduate degree costs bar chart." },
            { num: "3b", title: "Emotional Intelligence & Verb Patterns (-ing / to)", desc: "YES/NO/NOT GIVEN deconstruction, business collocations, and fast-food pay rates table." },
            { num: "Mastery", title: "Lifetime Education Earnings & Exam Checklist", desc: "Lexical cloze synthesis, lifetime income comparative data analytics, and Band 7.0 mastery checklist." }
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

    // Reading 3a: A Chinese Approach to Learning
    reading3a: {
        wordBank: ["admitted", "behaved", "control group", "denied", "educated", "experiences", "imagination", "success", "instructors", "time"],
        passage: `
            <h3>A CHINESE APPROACH TO LEARNING</h3>
            <p><span class="para-tag">Para A</span> The reasons behind the experiment were obvious. <mark class="evidence" id="ev-3a-1" data-q="3a-1"><span class="syn-pair-1" data-q="3a-1">Chinese students regularly come near the top in international comparison tests</span></mark> of students around the planet. They <mark class="evidence" id="ev-3a-1b" data-q="3a-1"><span class="syn-pair-1" data-q="3a-1"><span class="vocab-word" data-word="triumph" data-def="To achieve a great victory, success, or outcome." data-ipa="/ˈtraɪ.əmf/" data-pos="verb">triumph</span> in Maths, Reading and Science</span></mark>, while in the UK, young people have been getting lower marks in recent years. Many in Britain have been wondering if it is time to adopt Chinese methods of education here.</p>
            <p><span class="para-tag">Para B</span> In the experiment, five teachers were brought from China and put in a UK school. They taught a group of 50 students maths, reading, science and modern languages. The students in the study group, and <mark class="evidence" id="ev-3a-2" data-q="3a-2">another <span class="syn-pair-1" data-q="3a-2"><span class="vocab-word" data-word="control group" data-def="A benchmark group in an experiment that does not receive the test treatment." data-ipa="/kənˈtrəʊl ɡruːp/" data-pos="noun">control group</span></span> who received regular lessons</mark>, were tested at the end of the period and an <span class="vocab-word" data-word="analysis" data-def="Detailed examination of the elements or structure of something." data-ipa="/əˈnæl.ə.sɪs/" data-pos="noun">analysis</span> of the results was carried out. In addition, both teachers and students who participated in the experiment were given <mark class="evidence" id="ev-3a-3" data-q="3a-3"><span class="syn-pair-1" data-q="3a-3">interviews with one of the researchers on how they felt</span> about what happened</mark>.</p>
            <p><span class="para-tag">Para C</span> The biggest difference between the two cultures was the lack of <span class="vocab-word" data-word="discipline" data-def="The practice of training people to obey rules or a code of behavior." data-ipa="/ˈdɪs.ə.plɪn/" data-pos="noun">discipline</span> in British schools. One Chinese teacher pointed out, <mark class="evidence" id="ev-3a-4" data-q="3a-4">‘In China we don’t need classroom management skills because <span class="syn-pair-2" data-q="3a-4">everyone is disciplined by nature, by families, by society</span>.’</mark> Interestingly, students <mark class="evidence" id="ev-3a-5" data-q="3a-5"><span class="syn-pair-2" data-q="3a-5"><span class="vocab-word" data-word="admitted" data-def="Confessed or acknowledged the truth of something reluctantly." data-ipa="/ədˈmɪt.ɪd/" data-pos="verb">admitted</span> that they found themselves behaving worse during the experiment</span> than they normally would</mark> for their British teachers. Many pointed to the fact that the unfamiliarity of the teacher made them feel less comfortable than they normally would.</p>
            <p><span class="para-tag">Para D</span> Another key issue was that of the role of creativity in a classroom where discipline is king. While it was obvious that British students would benefit from settling down, it was also clear that the UK education system does encourage students to think outside of the box. <mark class="evidence" id="ev-3a-6" data-q="3a-6">The Chinese teachers were uncomfortable with any attempt to ask questions, as it would stop the flow of the lesson they had planned in which there was <span class="syn-pair-1" data-q="3a-6">no opportunity for free-thinking</span>.</mark></p>
            <p><span class="para-tag">Para E</span> All of this suggests that an <span class="vocab-word" data-word="obsession" data-def="An idea or thought that continually preoccupies or intrudes on a person's mind." data-ipa="/əbˈseʃ.ən/" data-pos="noun">obsession</span> with testing does not exist in the UK, which would be untrue. The message that test results are all that matters may not be getting through. One young person commented: ‘Their teaching methods did get results but we didn’t always feel we were learning much. They get results because we are in school for so long.’</p>
            <p><span class="para-tag">Para F</span> In India, Professor Sugata Mitra has introduced the ‘Classroom in the Cloud’ based on ‘Hole in the Wall’ experiments, showing students can teach themselves through self-instruction without someone in charge. In these experiments, chaos is not necessarily a bad thing.</p>
            <p><span class="para-tag">Para G</span> Firstly, no one has the monopoly on what is right and wrong with teaching. Secondly, each country has an educational approach which is unique and reflects the values and expectations of its society.</p>
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

    // Reading 3b: The Dark Side of Emotional Intelligence
    reading3b: {
        passage: `
            <h3>THE DARK SIDE OF EMOTIONAL INTELLIGENCE</h3>
            <p><span class="para-tag">Para A</span> Since the 1995 publication of Daniel Goleman’s bestseller, Emotional Intelligence, <mark class="evidence" id="ev-3b-1" data-q="3b-1"><span class="syn-pair-1" data-q="3b-1">the idea has been used by government leaders and educators as the solution to a wide range of problems</span></mark>. If we can encourage emotional intelligence, we’ll have better workplaces. <mark class="evidence" id="ev-3b-2" data-q="3b-2">As a result, emotional intelligence is now taught widely in secondary schools, business schools and medical schools.</mark></p>
            <p><span class="para-tag">Para B</span> Research led by University of Cambridge Professor Jochen Menges suggested that, <mark class="evidence" id="ev-3b-3" data-q="3b-3">when a leader gave an inspiring speech filled with emotion, the audience was less likely to challenge the message and <span class="syn-pair-2" data-q="3b-3"><span class="vocab-word" data-word="retained" data-def="Kept in mind or remembered." data-ipa="/rɪˈteɪnd/" data-pos="verb">remembered less</span> of the content</span></mark>. Interestingly, though, audience members were so moved that they believed that they had remembered more.</p>
            <p><span class="para-tag">Para C</span> In a study led by psychologist Stephane Cote of the University of Toronto, university employees filled out a survey about <span class="vocab-word" data-word="manipulative" data-def="Exercising unscrupulous control or influence over a person or situation." data-ipa="/məˈnɪp.jə.lə.tɪv/" data-pos="adj.">manipulative</span> tendencies. <mark class="evidence" id="ev-3b-4" data-q="3b-4">The employees who engaged in the most harmful behaviours were masters of manipulation with high emotional intelligence, <span class="syn-pair-1" data-q="3b-4">using emotional skills to <span class="vocab-word" data-word="demean" data-def="Cause someone to lose dignity and the respect of others." data-ipa="/dɪˈmiːn/" data-pos="verb">demean</span> and embarrass peers</span>.</mark></p>
            <p><span class="para-tag">Para D</span> In a study at the Body Shop, Stanford professor Joanne Martin discovered that founder <mark class="evidence" id="ev-3b-6" data-q="3b-6">Anita Roddick <span class="syn-pair-1" data-q="3b-6">used emotions to inspire her employees to fundraise for charity</span></mark>. ‘Whenever we wanted to persuade our staff to support a particular project we always tried to break their hearts.’</p>
            <p><span class="para-tag">Para E</span> In jobs such as mechanics, scientists and accountants, higher emotional intelligence translated into lower performance. These employees were paying attention to facial expressions and vocal tones when they should have been analysing data or repairing cars.</p>
            <p><span class="para-tag">Para F</span> In a study at a healthcare company, the relationship between emotional intelligence and helping colleagues didn’t exist. Helping is driven by motivations and values. However, emotional intelligence was significant when challenging existing situations and speaking up with ideas.</p>
            <p><span class="para-tag">Para G</span> Emotionally intelligent employees spoke up more effectively, keeping anger in check and expressing <span class="vocab-word" data-word="enthusiasm" data-def="Intense and eager enjoyment, interest, or approval." data-ipa="/ɪnˈθjuː.zi.æz.əm/" data-pos="noun">enthusiasm</span> without threatening leaders.</p>
        `,
        questions: [
            { qNum: 1, text: "1. Politicians have tried to use EI as a tool for social change.", ans: "YES", evId: "ev-3b-1" },
            { qNum: 2, text: "2. Schools and hospitals have seen an improvement in standards since 1995.", ans: "NOT GIVEN", evId: "ev-3b-2" },
            { qNum: 3, text: "3. Menges’ study showed people had better recall of facts from emotional speeches.", ans: "NO", evId: "ev-3b-3" },
            { qNum: 4, text: "4. Emotionally intelligent people make colleagues feel silly more often than others.", ans: "NOT GIVEN", evId: "ev-3b-4" },
            { qNum: 5, text: "5. People experience more job satisfaction after emotional awareness training.", ans: "NOT GIVEN", evId: "ev-3b-5" },
            { qNum: 6, text: "6. Anita Roddick used emotional appeals for good causes.", ans: "YES", evId: "ev-3b-6" }
        ],
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
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag purple">Unsubstantiated Frequency:</span> <strong>NOT GIVEN.</strong> High EI workers demean/embarrass colleagues (feel silly), but there is no comparative frequency ("more often than others").</div>`
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
        ]
    }
};
