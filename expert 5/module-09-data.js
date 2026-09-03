/**
 * =========================================================================
 * Expert IELTS 5 — Module 9: Media Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Walkthroughs
 * Aligned verbatim with official curriculum in md files/e5/m9 content.md
 * =========================================================================
 */

window.module9Data = {
    meta: {
        id: "module-09",
        level: "Expert 5",
        band: "Band 5.0 – 6.0",
        moduleNum: "09",
        title: "Media — The News & Technology",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 39,
        tags: [
            { text: "Reading 9a/9b", bg: "var(--col-reading)" },
            { text: "Grammar: Past Simple vs Present Perfect", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Technology & Media", bg: "var(--col-vocab)" },
            { text: "Writing: Task 1 Contrast & Similarities", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "9a", title: "The News & Information Habits", desc: "Pew Center Survey Matching Features (Q1–8), Past Simple vs Present Perfect, and Task 1 Pie Charts Model." },
            { num: "9b", title: "Technology & Brain Health", desc: "Technology Lexicon & Word Formation, 'Brain Health and Technology' Matching Features & Sentence Completion, and Task 1 Bar Charts." },
            { num: "Review", title: "Module 9 Competency Checklist", desc: "Synthesis of data comparison, verb tenses, and academic summary writing." }
        ]
    },

    // Reading 9a: Changing habits in accessing the news
    reading9a: {
        title: "Changing habits in accessing the news",
        passage: `
            <p><span class="para-tag">[Paragraph 1]</span>
                There are many different ways to get the news nowadays. Some people buy a daily newspaper, others watch television or listen to the radio and still others choose to get their news online. Many, of course, make regular use of more than one source.
            </p>

            <p><span class="para-tag">[Paragraph 2]</span>
                The Pew Research Center in the US recently conducted a survey with 3,612 adults nationwide. Researchers wanted to find out how they currently learn about the news. They ended up classifying the people they interviewed into four groups: <strong>Traditionalists</strong>, <strong>Net-newsers</strong>, <strong>Integrators</strong> and the <strong>Disengaged</strong>.
            </p>

            <p><span class="para-tag">[Paragraph 3]</span>
                The researchers called the largest group <strong>Traditionalists</strong>. As the name suggests, they prefer to access the news in a traditional way, typically by watching television. They do this a great deal in the morning, in the afternoon and in the evening.
                <mark class="evidence" id="ev-9a-6">They explain that they understand the news better when they <span class="syn-pair-1" data-q="9a-6">see pictures rather than just reading or listening to a news story</span>.</mark>
                Their level of education is relatively low, with over 60 percent of this group having no more than a high school education. This group tends to be middle-aged or older, and is less well-paid than people who access the news in other ways. They say they like to get information about the weather but do not find stories about science or technology interesting.
                <mark class="evidence" id="ev-9a-3">Most people in this group <span class="syn-pair-1" data-q="9a-3">have a computer at home but they almost never use it to find out about the news</span>.</mark>
                Although they are still a large group — 46 percent of the population — their numbers have been going down for ten years now.
            </p>

            <p><span class="para-tag">[Paragraph 4]</span>
                <strong>Net-newsers</strong>, on the other hand, choose to get the majority of their news from the internet. Sometimes they read online news articles or blogs and sometimes they watch video clips of news stories. Their online access to the news is highest during the day. They use technology in other aspects of their lives too and like to follow stories relating to science.
                <mark class="evidence" id="ev-9a-8"><span class="syn-pair-1" data-q="9a-8">The smallest of the four groups</span>, they are also the youngest, with a typical age of 35.</mark>
                They are better educated than other groups; eight in ten of them have at least attended college.
                <mark class="evidence" id="ev-9a-2"><span class="syn-pair-1" data-q="9a-2">Nearly 60 percent of the group are men</span> and they also tend to be relatively well-off.</mark>
                Although the internet is by far the main source of news for Net-newsers, they do occasionally use other sources too. They are, for example, at least as likely as Integrators and Traditionalists to read serious news magazines.
            </p>

            <p><span class="para-tag">[Paragraph 5]</span>
                The third group is the <strong>Integrators</strong>. They are well-informed people who say they are interested in what is going on in the world and who love following news stories.
                <mark class="evidence" id="ev-9a-1">They are just as keen on getting information about <span class="syn-pair-1" data-q="9a-1">the weather and traffic as they are about politics and international events</span>.</mark>
                Television is their main source of news but they also make daily use of the internet. They are middle-aged, with an average age of 47.
                <mark class="evidence" id="ev-9a-7">A typical Integrator has a good education; <span class="syn-pair-1" data-q="9a-7">over half of them have a college degree, which is higher than the percentage for any of the other groups</span>.</mark>
                Around half of the members of this group are men and half are women, and they have higher average incomes than the other three groups.
            </p>

            <p><span class="para-tag">[Paragraph 6]</span>
                Finally, there are the <strong>Disengaged</strong>. This group are generally not interested in what is happening in the world and so they consume very little news. They may sometimes look at local news, especially if it relates to crime, but only around 20 percent of them follow the news regularly. They have low levels of education and income, and only about a third of them have a computer at home.
                <mark class="evidence" id="ev-9a-5">Those who have jobs tend to be in <span class="syn-pair-1" data-q="9a-5">low-paid, manual occupations</span>.</mark>
                <mark class="evidence" id="ev-9a-4">Women make up <span class="syn-pair-1" data-q="9a-4">around two-thirds of this group</span>, so this is where you can find the greatest number of women.</mark>
            </p>
        `,
        questions: [
            {
                num: 1,
                text: "They are just as interested in finding out about the weather as they are in the news.",
                ans: "C",
                evId: "ev-9a-1",
                explanation: "Paragraph 5: Integrators are 'just as keen on getting information about the weather and traffic as they are about politics and international events'."
            },
            {
                num: 2,
                text: "Men make up the majority of this group.",
                ans: "B",
                evId: "ev-9a-2",
                explanation: "Paragraph 4: Net-newsers have 'Nearly 60 percent of the group are men'."
            },
            {
                num: 3,
                text: "Although they have the equipment to access the news online, they rarely do so.",
                ans: "A",
                evId: "ev-9a-3",
                explanation: "Paragraph 3: Traditionalists 'have a computer at home but they almost never use it to find out about the news'."
            },
            {
                num: 4,
                text: "This is the group with the highest proportion of women.",
                ans: "D",
                evId: "ev-9a-4",
                explanation: "Paragraph 6: The Disengaged are 'around two-thirds' women, representing 'the greatest number of women'."
            },
            {
                num: 5,
                text: "The people in this group with jobs are likely to be paid less than those in other groups.",
                ans: "D",
                evId: "ev-9a-5",
                explanation: "Paragraph 6: Employed members among the Disengaged 'tend to be in low-paid, manual occupations'."
            },
            {
                num: 6,
                text: "They find it easier to understand stories that have images with them.",
                ans: "A",
                evId: "ev-9a-6",
                explanation: "Paragraph 3: Traditionalists 'understand the news better when they see pictures rather than just reading or listening'."
            },
            {
                num: 7,
                text: "This group has the highest percentage of people who have been to college.",
                ans: "C",
                evId: "ev-9a-7",
                explanation: "Paragraph 5: Integrators have 'over half of them have a college degree, which is higher than the percentage for any of the other groups'."
            },
            {
                num: 8,
                text: "There are fewer people in this group than in any of the other three.",
                ans: "B",
                evId: "ev-9a-8",
                explanation: "Paragraph 4: Net-newsers are explicitly described as 'The smallest of the four groups'."
            }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 5 (Weather & Traffic Interest)",
                badge: "Reading 9a Walkthrough • Q1",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Paragraph 5]</span> The third group is the Integrators... <mark class="evidence" id="ev-wt-9a-1" data-q="wt-9a-1">They are <span class="syn-pair-2" data-q="wt-9a-1">just as keen on getting information about the weather and traffic as they are about politics and international events</span>.</mark> Television is their main source of news...`,
                question: `1. They are <span class="syn-pair-2" data-q="wt-9a-1">just as interested in finding out about the weather</span> as they are in the news. <span class="syn-pair-1" data-q="wt-9a-1">[ 1 ]</span>`,
                ans: "C",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"just as interested in weather as news"</em> ↔ <em>"just as keen on getting information about weather and traffic as politics"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>C (Integrators)</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 4 (Male Demographic Dominance)",
                badge: "Reading 9a Walkthrough • Q2",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Paragraph 4]</span> Net-newsers, on the other hand, choose to get the majority of their news from the internet... <mark class="evidence" id="ev-wt-9a-2" data-q="wt-9a-2"><span class="syn-pair-2" data-q="wt-9a-2">Nearly 60 percent of the group are men</span> and they also tend to be relatively well-off.</mark>`,
                question: `2. <span class="syn-pair-2" data-q="wt-9a-2">Men make up the majority</span> of this group. <span class="syn-pair-1" data-q="wt-9a-2">[ 2 ]</span>`,
                ans: "B",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"Men make up the majority"</em> ↔ <em>"Nearly 60 percent of the group are men"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>B (Net-newsers)</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 3 (Unused Digital Hardware)",
                badge: "Reading 9a Walkthrough • Q3",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> ...They say they like to get information about the weather but do not find stories about science or technology interesting. <mark class="evidence" id="ev-wt-9a-3" data-q="wt-9a-3">Most people in this group <span class="syn-pair-2" data-q="wt-9a-3">have a computer at home but they almost never use it to find out about the news</span>.</mark>`,
                question: `3. Although they have the <span class="syn-pair-2" data-q="wt-9a-3">equipment to access news online, they rarely do so</span>. <span class="syn-pair-1" data-q="wt-9a-3">[ 3 ]</span>`,
                ans: "A",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"equipment to access online... rarely do so"</em> ↔ <em>"have computer at home but almost never use it for news"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>A (Traditionalists)</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 6 (Female Demographic Peak)",
                badge: "Reading 9a Walkthrough • Q4",
                para: "Para 6",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Paragraph 6]</span> ...Those who have jobs tend to be in low-paid, manual occupations. <mark class="evidence" id="ev-wt-9a-4" data-q="wt-9a-4">Women make up <span class="syn-pair-2" data-q="wt-9a-4">around two-thirds of this group, so this is where you can find the greatest number of women</span>.</mark>`,
                question: `4. This is the group with the <span class="syn-pair-2" data-q="wt-9a-4">highest proportion of women</span>. <span class="syn-pair-1" data-q="wt-9a-4">[ 4 ]</span>`,
                ans: "D",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"highest proportion of women"</em> ↔ <em>"two-thirds... greatest number of women"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>D (The Disengaged)</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph 6 (Low-Income Occupations)",
                badge: "Reading 9a Walkthrough • Q5",
                para: "Para 6",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Paragraph 6]</span> ...They have low levels of education and income, and only about a third of them have a computer at home. <mark class="evidence" id="ev-wt-9a-5" data-q="wt-9a-5">Those who have jobs tend to be in <span class="syn-pair-2" data-q="wt-9a-5">low-paid, manual occupations</span>.</mark>`,
                question: `5. The people in this group with jobs are likely to be <span class="syn-pair-2" data-q="wt-9a-5">paid less than those in other groups</span>. <span class="syn-pair-1" data-q="wt-9a-5">[ 5 ]</span>`,
                ans: "D",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"paid less than those in other groups"</em> ↔ <em>"low-paid, manual occupations"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>D (The Disengaged)</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph 3 (Visual Story Comprehension)",
                badge: "Reading 9a Walkthrough • Q6",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> ...As the name suggests, they prefer to access the news in a traditional way, typically by watching television... <mark class="evidence" id="ev-wt-9a-6" data-q="wt-9a-6">They explain that they <span class="syn-pair-2" data-q="wt-9a-6">understand the news better when they see pictures rather than just reading or listening</span> to a news story.</mark>`,
                question: `6. They find it <span class="syn-pair-2" data-q="wt-9a-6">easier to understand stories that have images</span> with them. <span class="syn-pair-1" data-q="wt-9a-6">[ 6 ]</span>`,
                ans: "A",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"easier to understand stories with images"</em> ↔ <em>"understand the news better when they see pictures"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>A (Traditionalists)</strong>.</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph 5 (Higher Education Attainment)",
                badge: "Reading 9a Walkthrough • Q7",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Paragraph 5]</span> ...A typical Integrator has a good education; <mark class="evidence" id="ev-wt-9a-7" data-q="wt-9a-7"><span class="syn-pair-2" data-q="wt-9a-7">over half of them have a college degree, which is higher than the percentage for any of the other groups</span>.</mark>`,
                question: `7. This group has the <span class="syn-pair-2" data-q="wt-9a-7">highest percentage of people who have been to college</span>. <span class="syn-pair-1" data-q="wt-9a-7">[ 7 ]</span>`,
                ans: "C",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"highest percentage who have been to college"</em> ↔ <em>"higher than the percentage for any other groups"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>C (Integrators)</strong>.</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph 4 (Smallest Population Segment)",
                badge: "Reading 9a Walkthrough • Q8",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Paragraph 4]</span> ...Their online access to the news is highest during the day. They use technology in other aspects of their lives too... <mark class="evidence" id="ev-wt-9a-8" data-q="wt-9a-8"><span class="syn-pair-2" data-q="wt-9a-8">The smallest of the four groups</span>, they are also the youngest, with a typical age of 35.</mark>`,
                question: `8. There are <span class="syn-pair-2" data-q="wt-9a-8">fewer people in this group than in any of the other three</span>. <span class="syn-pair-1" data-q="wt-9a-8">[ 8 ]</span>`,
                ans: "B",
                options: [
                    { letter: "A", text: "Traditionalists" },
                    { letter: "B", text: "Net-newsers" },
                    { letter: "C", text: "Integrators" },
                    { letter: "D", text: "The Disengaged" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"fewer people than in any other three"</em> ↔ <em>"The smallest of the four groups"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Group = <strong>B (Net-newsers)</strong>.</div>`
            }
        ]
    },

    // Reading 9b: Brain Health and Technology
    reading9b: {
        title: "Brain health and technology",
        passage: `
            <p><span class="para-tag">[Paragraph 1]</span>
                Technology has brought great benefits to society. Devices such as smartphones, tablets and laptops are now an essential part of daily life. However, scientists have raised concerns regarding the effects of prolonged digital exposure on human cognitive function and neurological health.
            </p>

            <p><span class="para-tag">[Paragraph 2]</span>
                Search engines have altered how human beings store and retrieve knowledge. Because factual information is available instantaneously at the touch of a button, individuals increasingly rely on external servers rather than their own internal memory banks. Studies show that when subjects expect to have future access to online search tools, their recall of specific facts drops sharply. Interestingly, while this creates an illusion of extensive knowledge, individuals frequently confuse internet search availability with actual personal understanding.
            </p>

            <p><span class="para-tag">[Paragraph 3]</span>
                Satellite navigation (satnav) systems represent another clear instance of technological outsourcing. Before the widespread adoption of GPS devices, drivers had to construct detailed spatial mental maps of road networks and rely on landmarks. Neurological scans indicate that regular reliance on automated route instructions significantly reduces activity in the hippocampus — the brain structure critical for spatial orientation and navigational memory.
            </p>

            <p><span class="para-tag">[Paragraph 4]</span>
                Conversely, certain digital interactions provide measurable cognitive enhancements. Interactive video games, especially strategic and action-oriented titles, require rapid spatial tracking, problem solving, and hand-eye coordination. In senior citizen focus groups, regular gameplay demonstrated significant improvements in visual attention span, executive processing speed, and mental flexibility.
            </p>

            <p><span class="para-tag">[Paragraph 5]</span>
                Smartphones, however, present distinct neurological risks when overused. Emitting high levels of artificial blue light, handheld screens inhibit the nocturnal production of melatonin, the hormone regulating biological sleep cycles. Medical surveys show that nocturnal smartphone browsing among teenagers causes widespread sleep deprivation, which negatively impacts concentration, memory consolidation, and emotional regulation the following day.
            </p>

            <p><span class="para-tag">[Paragraph 6]</span>
                Finally, social networking platforms offer mixed outcomes. While heavy engagement with digital messaging does not replace deep face-to-face interaction, studies indicate that adolescents who actively maintain broad online networks often exhibit enhanced social skills and empathetic awareness, although the long-term cognitive benefits remain limited compared to physical socialization.
            </p>
        `,
        questions: [
            {
                num: 1,
                text: "have had an effect on the sleep patterns of young people",
                ans: "A",
                evId: "ev-9b-1",
                explanation: "Paragraph 5 explains that nocturnal smartphone usage inhibits melatonin, causing widespread sleep deprivation among teenagers."
            },
            {
                num: 2,
                text: "help older people to improve certain mental abilities",
                ans: "D",
                evId: "ev-9b-2",
                explanation: "Paragraph 4 highlights that senior citizen gameplay in video games leads to significant improvements in visual attention span and executive speed."
            },
            {
                num: 3,
                text: "may mean that people lose an ability that humans have always had",
                ans: "B",
                evId: "ev-9b-3",
                explanation: "Paragraph 3 notes that satnav systems reduce spatial navigation and hippocampal orientation abilities that humans historically developed."
            },
            {
                num: 4,
                text: "can give people false confidence about their knowledge",
                ans: "C",
                evId: "ev-9b-4",
                explanation: "Paragraph 2 notes that search engines create an illusion of extensive knowledge, confusing internet availability with personal understanding."
            },
            {
                num: 5,
                text: "have a limited positive effect on users' brain development",
                ans: "E",
                evId: "ev-9b-5",
                explanation: "Paragraph 6 observes that while social networks slightly enhance online social skills, their long-term cognitive benefits remain limited."
            },
            {
                num: 6,
                text: "Using search engines means that people do not rely on their [ memory ] to find information.",
                ans: "memory",
                evId: "ev-9b-6",
                explanation: "Paragraph 2: 'individuals increasingly rely on external servers rather than their own internal memory banks'."
            },
            {
                num: 7,
                text: "Regular use of satnav systems can affect the area of the brain responsible for [ orientation ].",
                ans: "orientation",
                evId: "ev-9b-7",
                explanation: "Paragraph 3: 'reduces activity in the hippocampus — the brain structure critical for spatial orientation'."
            },
            {
                num: 8,
                text: "Video games can help older people make improvements to their [ attention span ].",
                ans: "attention span",
                evId: "ev-9b-8",
                explanation: "Paragraph 4: 'senior citizen focus groups... demonstrated significant improvements in visual attention span'."
            },
            {
                num: 9,
                text: "Spending too much time looking at a smartphone can result in [ sleep deprivation ].",
                ans: "sleep deprivation",
                evId: "ev-9b-9",
                explanation: "Paragraph 5: 'nocturnal smartphone browsing among teenagers causes widespread sleep deprivation'."
            },
            {
                num: 10,
                text: "Heavy users of social networks can make improvements to their [ social skills ].",
                ans: "social skills",
                evId: "ev-9b-10",
                explanation: "Paragraph 6: 'adolescents who actively maintain broad online networks often exhibit enhanced social skills'."
            }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 5 (Sleep Pattern Disruption)",
                badge: "Reading 9b Walkthrough • Q1",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Paragraph 5]</span> <mark class="evidence" id="ev-wt-9b-1" data-q="wt-9b-1"><span class="syn-pair-1" data-q="wt-9b-1">Smartphones</span>, however, present distinct neurological risks when overused... <span class="syn-pair-2" data-q="wt-9b-1">nocturnal smartphone browsing among teenagers causes widespread sleep deprivation</span>, which negatively impacts concentration...</mark>`,
                question: `1. <span class="syn-pair-2" data-q="wt-9b-1">have had an effect on the sleep patterns of young people</span> <span class="syn-pair-1" data-q="wt-9b-1">[ 1 ]</span>`,
                ans: "A",
                options: [
                    { letter: "A", text: "Smartphones" },
                    { letter: "B", text: "Satellite navigation (satnav) systems" },
                    { letter: "C", text: "Search engines" },
                    { letter: "D", text: "Video games" },
                    { letter: "E", text: "Social networking sites" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"sleep patterns of young people"</em> ↔ <em>"nocturnal browsing among teenagers causes sleep deprivation"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Device = <strong>A (Smartphones)</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 4 (Mental Agility in Seniors)",
                badge: "Reading 9b Walkthrough • Q2",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Paragraph 4]</span> ...<mark class="evidence" id="ev-wt-9b-2" data-q="wt-9b-2">Interactive <span class="syn-pair-1" data-q="wt-9b-2">video games</span>... In <span class="syn-pair-2" data-q="wt-9b-2">senior citizen focus groups, regular gameplay demonstrated significant improvements</span> in visual attention span, executive processing speed...</mark>`,
                question: `2. <span class="syn-pair-2" data-q="wt-9b-2">help older people to improve certain mental abilities</span> <span class="syn-pair-1" data-q="wt-9b-2">[ 2 ]</span>`,
                ans: "D",
                options: [
                    { letter: "A", text: "Smartphones" },
                    { letter: "B", text: "Satellite navigation (satnav) systems" },
                    { letter: "C", text: "Search engines" },
                    { letter: "D", text: "Video games" },
                    { letter: "E", text: "Social networking sites" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"older people"</em> ↔ <em>"senior citizen focus groups"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"improve mental abilities"</em> = <strong>D (Video games)</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 3 (Erosion of Spatial Navigation)",
                badge: "Reading 9b Walkthrough • Q3",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> <mark class="evidence" id="ev-wt-9b-3" data-q="wt-9b-3"><span class="syn-pair-1" data-q="wt-9b-3">Satellite navigation (satnav) systems</span>... regular reliance on automated route instructions <span class="syn-pair-2" data-q="wt-9b-3">significantly reduces activity in the hippocampus — the brain structure critical for spatial orientation</span> and navigational memory.</mark>`,
                question: `3. <span class="syn-pair-2" data-q="wt-9b-3">may mean that people lose an ability that humans have always had</span> <span class="syn-pair-1" data-q="wt-9b-3">[ 3 ]</span>`,
                ans: "B",
                options: [
                    { letter: "A", text: "Smartphones" },
                    { letter: "B", text: "Satellite navigation (satnav) systems" },
                    { letter: "C", text: "Search engines" },
                    { letter: "D", text: "Video games" },
                    { letter: "E", text: "Social networking sites" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"lose an ability humans have always had"</em> ↔ <em>"reduces activity in hippocampus... spatial orientation"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Technology = <strong>B (Satellite navigation systems)</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 2 (Search Illusion & False Confidence)",
                badge: "Reading 9b Walkthrough • Q4",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Paragraph 2]</span> <mark class="evidence" id="ev-wt-9b-4" data-q="wt-9b-4"><span class="syn-pair-1" data-q="wt-9b-4">Search engines</span> have altered how human beings store and retrieve knowledge... while this <span class="syn-pair-2" data-q="wt-9b-4">creates an illusion of extensive knowledge, individuals frequently confuse internet search availability with actual personal understanding</span>.</mark>`,
                question: `4. <span class="syn-pair-2" data-q="wt-9b-4">can give people false confidence about their knowledge</span> <span class="syn-pair-1" data-q="wt-9b-4">[ 4 ]</span>`,
                ans: "C",
                options: [
                    { letter: "A", text: "Smartphones" },
                    { letter: "B", text: "Satellite navigation (satnav) systems" },
                    { letter: "C", text: "Search engines" },
                    { letter: "D", text: "Video games" },
                    { letter: "E", text: "Social networking sites" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"false confidence about knowledge"</em> ↔ <em>"illusion of extensive knowledge / confuse internet availability with understanding"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Tool = <strong>C (Search engines)</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph 6 (Limited Social Networking Impact)",
                badge: "Reading 9b Walkthrough • Q5",
                para: "Para 6",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Paragraph 6]</span> <mark class="evidence" id="ev-wt-9b-5" data-q="wt-9b-5">Finally, <span class="syn-pair-1" data-q="wt-9b-5">social networking platforms</span> offer mixed outcomes... <span class="syn-pair-2" data-q="wt-9b-5">the long-term cognitive benefits remain limited compared to physical socialization</span>.</mark>`,
                question: `5. <span class="syn-pair-2" data-q="wt-9b-5">have a limited positive effect on users' brain development</span> <span class="syn-pair-1" data-q="wt-9b-5">[ 5 ]</span>`,
                ans: "E",
                options: [
                    { letter: "A", text: "Smartphones" },
                    { letter: "B", text: "Satellite navigation (satnav) systems" },
                    { letter: "C", text: "Search engines" },
                    { letter: "D", text: "Video games" },
                    { letter: "E", text: "Social networking sites" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"limited positive effect on brain development"</em> ↔ <em>"long-term cognitive benefits remain limited"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Platform = <strong>E (Social networking sites)</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph 2 (Internal Memory Outsourcing)",
                badge: "Reading 9b Walkthrough • Q6",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Paragraph 2]</span> ...Because factual information is available instantaneously at the touch of a button, <mark class="evidence" id="ev-wt-9b-6" data-q="wt-9b-6">individuals increasingly <span class="syn-pair-1" data-q="wt-9b-6">rely on external servers rather than their own internal</span> <span class="syn-pair-2" data-q="wt-9b-6">memory</span> banks.</mark>`,
                question: `6. Using search engines means that people <span class="syn-pair-1" data-q="wt-9b-6">do not rely on their</span> <span class="syn-pair-2" data-q="wt-9b-6">[ _______ ]</span> to find information. (NO MORE THAN TWO WORDS)`,
                ans: "memory",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"do not rely on their"</em> ↔ <em>"rather than their own internal"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target noun = <strong>memory</strong> (or <em>memory banks</em>).</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph 3 (Hippocampal Orientation)",
                badge: "Reading 9b Walkthrough • Q7",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> ...reduces activity in the hippocampus — <mark class="evidence" id="ev-wt-9b-7" data-q="wt-9b-7"><span class="syn-pair-1" data-q="wt-9b-7">the brain structure critical for spatial</span> <span class="syn-pair-2" data-q="wt-9b-7">orientation</span> and navigational memory.</mark>`,
                question: `7. Regular use of satnav systems can affect the area of the brain <span class="syn-pair-1" data-q="wt-9b-7">responsible for</span> <span class="syn-pair-2" data-q="wt-9b-7">[ _______ ]</span>. (NO MORE THAN TWO WORDS)`,
                ans: "orientation",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"area of the brain responsible for"</em> ↔ <em>"the brain structure critical for spatial"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target noun = <strong>orientation</strong> (or <em>spatial orientation</em>).</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph 4 (Seniors Attention Span)",
                badge: "Reading 9b Walkthrough • Q8",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Paragraph 4]</span> In senior citizen focus groups, <mark class="evidence" id="ev-wt-9b-8" data-q="wt-9b-8">regular gameplay <span class="syn-pair-1" data-q="wt-9b-8">demonstrated significant improvements in visual</span> <span class="syn-pair-2" data-q="wt-9b-8">attention span</span>, executive processing speed...</mark>`,
                question: `8. Video games can help older people <span class="syn-pair-1" data-q="wt-9b-8">make improvements to their</span> <span class="syn-pair-2" data-q="wt-9b-8">[ _______ ]</span>. (NO MORE THAN TWO WORDS)`,
                ans: "attention span",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"make improvements to their"</em> ↔ <em>"demonstrated significant improvements in visual"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target noun phrase = <strong>attention span</strong> (or <em>visual attention span</em>).</div>`
            },
            {
                qNum: 9,
                title: "Walkthrough: Question 9 & Paragraph 5 (Screen Induced Sleep Deprivation)",
                badge: "Reading 9b Walkthrough • Q9",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Paragraph 5]</span> Medical surveys show that <mark class="evidence" id="ev-wt-9b-9" data-q="wt-9b-9"><span class="syn-pair-1" data-q="wt-9b-9">nocturnal smartphone browsing among teenagers causes widespread</span> <span class="syn-pair-2" data-q="wt-9b-9">sleep deprivation</span>, which negatively impacts concentration...</mark>`,
                question: `9. Spending too much time looking at a smartphone can <span class="syn-pair-1" data-q="wt-9b-9">result in</span> <span class="syn-pair-2" data-q="wt-9b-9">[ _______ ]</span>. (NO MORE THAN TWO WORDS)`,
                ans: "sleep deprivation",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"can result in"</em> ↔ <em>"causes widespread"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target health condition = <strong>sleep deprivation</strong>.</div>`
            },
            {
                qNum: 10,
                title: "Walkthrough: Question 10 & Paragraph 6 (Digital Network Social Skills)",
                badge: "Reading 9b Walkthrough • Q10",
                para: "Para 6",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Paragraph 6]</span> ...studies indicate that <mark class="evidence" id="ev-wt-9b-10" data-q="wt-9b-10">adolescents who actively maintain broad online networks <span class="syn-pair-1" data-q="wt-9b-10">often exhibit enhanced</span> <span class="syn-pair-2" data-q="wt-9b-10">social skills</span> and empathetic awareness...</mark>`,
                question: `10. Heavy users of social networks can <span class="syn-pair-1" data-q="wt-9b-10">make improvements to their</span> <span class="syn-pair-2" data-q="wt-9b-10">[ _______ ]</span>. (NO MORE THAN TWO WORDS)`,
                ans: "social skills",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"make improvements to their"</em> ↔ <em>"often exhibit enhanced"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target capability = <strong>social skills</strong>.</div>`
            }
        ]
    },

    // Academic Lexicon & Collocations Hub Bank
    vocabulary: {
        title: "Module 9: Academic Lexicon & Collocations Hub",
        badge: "Vocabulary 9 • Academic Lexicon",
        subtitle: "Click on any academic term to inspect pronunciation, definitions, and high-scoring IELTS collocations.",
        words: [
            {
                word: "broadcast",
                ipa: "/ˈbrɔːd.kɑːst/",
                pos: "verb",
                cefr: "B2",
                def: "To transmit a programme or some information by radio or television, or via internet streaming.",
                colloc: "broadcast live • broadcast nationwide • digital broadcast",
                example: "Traditional media networks broadcast breaking news bulletins throughout the day to millions of viewers.",
                context: "Section 9a: 'Accessing the news: Television broadcasts and radio transmissions.'"
            },
            {
                word: "nationwide",
                ipa: "/ˌneɪ.ʃənˈwaɪd/",
                pos: "adj.",
                cefr: "B2",
                def: "Extending or reaching throughout an entire nation.",
                colloc: "nationwide survey • nationwide campaign • nationwide broadcast",
                example: "The research team conducted a nationwide survey of more than three thousand households.",
                context: "Passage 9a: 'The Pew Research Center conducted a survey with 3,612 adults nationwide.'"
            },
            {
                word: "subscription",
                ipa: "/səbˈskrɪp.ʃən/",
                pos: "noun",
                cefr: "B2",
                def: "An arrangement to receive something, typically a publication or digital service, regularly by paying in advance.",
                colloc: "online subscription • monthly subscription • cancel a subscription",
                example: "Print newspapers have suffered massive declines in paid subscriptions as online media expanded.",
                context: "Section 9a Writing: 'Newspaper circulation and digital media subscriptions.'"
            },
            {
                word: "fluctuate",
                ipa: "/ˈflʌk.tʃu.eɪt/",
                pos: "verb",
                cefr: "C1",
                def: "To rise and fall irregularly in number or amount.",
                colloc: "fluctuate wildly • fluctuate considerably • tend to fluctuate",
                example: "Online readership figures fluctuate considerably depending on breaking news developments.",
                context: "Section 9a Task 1: 'Fluctuating trends in news access methods between 1995 and 2015.'"
            },
            {
                word: "disengaged",
                ipa: "/ˌdɪs.ɪŋˈɡeɪdʒd/",
                pos: "adj.",
                cefr: "C1",
                def: "Emotionally detached, uninvolved, or indifferent to one's surroundings or civic issues.",
                colloc: "politically disengaged • disengaged youth • socially disengaged",
                example: "A worrying percentage of younger citizens feel completely disengaged from contemporary current affairs.",
                context: "Passage 9a: 'They ended up classifying the people into four groups: Traditionalists, Net-newsers, Integrators and the Disengaged.'"
            },
            {
                word: "circulation",
                ipa: "/ˌsɜː.kjəˈleɪ.ʃən/",
                pos: "noun",
                cefr: "B2",
                def: "The number of copies of a newspaper or magazine that are sold each day or week.",
                colloc: "daily circulation • circulation figures • wide circulation",
                example: "National broadsheets have seen their physical circulation plummet by more than forty percent.",
                context: "Section 9a Writing: 'Trends in newspaper circulation and online readership.'"
            },
            {
                word: "orientation",
                ipa: "/ˌɔː.ri.enˈteɪ.ʃən/",
                pos: "noun",
                cefr: "C1",
                def: "The determination of the relative position of something or someone (especially oneself).",
                colloc: "spatial orientation • sense of orientation • geographical orientation",
                example: "Relying perpetually on satellite navigation damages human spatial orientation and mental mapping.",
                context: "Passage 9b: '...the hippocampus — the brain structure critical for spatial orientation.'"
            },
            {
                word: "deprivation",
                ipa: "/ˌdep.rɪˈveɪ.ʃən/",
                pos: "noun",
                cefr: "C1",
                def: "The damaging lack of material benefits or essential physical needs considered to be basic necessities in a society.",
                colloc: "sleep deprivation • severe deprivation • emotional deprivation",
                example: "Chronic sleep deprivation among adolescents causes severe cognitive impairment and irritability.",
                context: "Passage 9b: '...nocturnal smartphone browsing causes widespread sleep deprivation.'"
            },
            {
                word: "connectivity",
                ipa: "/ˌkɒn.ekˈtɪv.ə.ti/",
                pos: "noun",
                cefr: "B2",
                def: "The state or degree of being connected or interconnected, especially via digital networks.",
                colloc: "high-speed connectivity • digital connectivity • wireless connectivity",
                example: "Ubiquitous digital connectivity ensures that citizens can access global reports instantaneously.",
                context: "Passage 9b: 'Constant digital connectivity alters how the human brain processes information.'"
            },
            {
                word: "portable",
                ipa: "/ˈpɔː.tə.bəl/",
                pos: "adj.",
                cefr: "B2",
                def: "Able to be easily carried or moved, especially because of being a lighter and smaller version than usual.",
                colloc: "portable device • portable technology • portable computer",
                example: "The transition towards compact, portable devices has made news consumption continuous throughout the day.",
                context: "Section 9b: 'Portable media devices and handheld technological tools.'"
            },
            {
                word: "attention span",
                ipa: "/əˈten.ʃən ˌspæn/",
                pos: "noun",
                cefr: "B2",
                def: "The length of time for which a person is able to concentrate mentally on a particular activity and avoid distraction.",
                colloc: "short attention span • visual attention span • improve attention span",
                example: "Educators warn that micro-video clips are drastically reducing student attention spans in classrooms.",
                context: "Passage 9b: '...demonstrated significant improvements in visual attention span.'"
            },
            {
                word: "retrieve",
                ipa: "/rɪˈtriːv/",
                pos: "verb",
                cefr: "C1",
                def: "To find or extract stored information from a computer memory or database.",
                colloc: "retrieve data • retrieve information • retrieve memory",
                example: "Users no longer commit phone numbers to memory because search tools retrieve details in milliseconds.",
                context: "Passage 9b: 'Search engines have altered how human beings store and retrieve knowledge.'"
            }
        ]
    }
};

// Global aliases for declarative data-binding
window.reading9a = window.module9Data.reading9a;
window.reading9b = window.module9Data.reading9b;
window.vocabulary = window.module9Data.vocabulary;
window.moduleData = window.module9Data;
