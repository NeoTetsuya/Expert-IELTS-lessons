/**
 * =========================================================================
 * Expert IELTS 5 — Module 10: Communicating Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Walkthroughs
 * Aligned verbatim with official curriculum in md files/e5/m10 content.md
 * =========================================================================
 */

window.module10Data = {
    meta: {
        id: "module-10",
        level: "Expert 5",
        band: "Band 5.0 – 6.0",
        moduleNum: "10",
        title: "Communicating — Being Understood & Understanding Others",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 36,
        tags: [
            { text: "Reading 10a/10b", bg: "var(--col-reading)" },
            { text: "Grammar: Relative Clauses & Modals", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Intercultural Communication & Attitudes", bg: "var(--col-vocab)" },
            { text: "Writing: Task 2 Conclusions & Certainty", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "10a", title: "Being Understood", desc: "Geoffrey Tumlin Yes/No/Not Given (Q1–7), Defining Relative Clauses, and Writing Task 2 Effective Conclusions." },
            { num: "10b", title: "Understanding Others", desc: "Intercultural Vocabulary & Attitudes, Business Diversity Reading (Short Answer Q1–5 & Y/N/NG Q6–10), and Traditions in a Global Community Task 2 Model." },
            { num: "Review", title: "Module 10 Competency Checklist", desc: "Synthesis of opinion argumentation, relative clauses, cross-cultural vocabulary, and modal verbs." }
        ]
    },

    // Reading 10a: THIS WEEK: Considering modern communication
    reading10a: {
        title: "THIS WEEK: Considering modern communication",
        passage: `
            <p><span class="para-tag">[Paragraph 1]</span>
                Advertisements for the latest smartphones, tablets, laptops and other gadgets say that they will make communication faster and more efficient. Naturally enough, because new technology can do so many things so easily, people have come to depend on it. But this has some unfortunate consequences.
            </p>

            <p><span class="para-tag">[Paragraph 2]</span>
                Geoffrey Tumlin is the author of a book on the theme of communications in our contemporary world. His basic argument — that people today give too much importance to gadgets rather than each other — will surprise many people but it is strong and clear. He says the result of such dependency is that people feel dissatisfied with their experience of using these gadgets to communicate.
            </p>

            <p><span class="para-tag">[Paragraph 3]</span>
                Electronic devices have certainly made the sending and receiving of messages much simpler than it was in the past, but there is more to communication than just hitting the 'Send' button or clicking to open a message.
                <mark class="evidence" id="ev-10a-1"><span class="syn-pair-1" data-q="10a-1">Real communication does not happen until the other person understands the message</span>, and <span class="syn-pair-2" data-q="10a-1">people forget about this important stage in far too many cases</span>.</mark>
                Tumlin says that adding an extra step — considering whether or not the message is understood — can make a person a much more effective communicator. His argument is that most people are focusing only on efficiency when they approach the majority of their exchanges.
                <mark class="evidence" id="ev-10a-3"><span class="syn-pair-1" data-q="10a-3">They want to clear their inboxes and respond to new text or voice messages as soon as they come in.</span></mark>
                <mark class="evidence" id="ev-10a-2">Similarly, <span class="syn-pair-1" data-q="10a-2">they are in the habit of getting face-to-face conversations over as quickly as possible</span> so they can move on to the next thing.</mark>
                They feel that they have so many communication tasks to deal with every day that they spend as little time on each one as they can and are satisfied just by crossing one more job off their to-do list.
            </p>

            <p><span class="para-tag">[Paragraph 4]</span>
                However, meaningful and effective communication is possible only when the speaker or writer think about their goals.
                <mark class="evidence" id="ev-10a-4">'In contrast with average communicators, <span class="syn-pair-1" data-q="10a-4">great communicators think carefully about what they would like to achieve rather than about what they would like to say</span>,' Tumlin says.</mark>
                He makes the point that it can be very difficult for people to stop themselves from saying something, especially when they are feeling angry or upset.
                <mark class="evidence" id="ev-10a-5">By making it so easy for everyone to share their thoughts and feelings, <span class="syn-pair-1" data-q="10a-5">technology has encouraged them to do so</span>. But these same emotional messages, unfortunately, are also the ones that <span class="syn-pair-2" data-q="10a-5">stop them from achieving their communication goals</span>.</mark>
            </p>

            <p><span class="para-tag">[Paragraph 5]</span>
                <mark class="evidence" id="ev-10a-6"><span class="syn-pair-1" data-q="10a-6">One of the greatest problems with the digital age</span> is that <span class="syn-pair-2" data-q="10a-6">sending a message to lots of people is just as easy as sending a message to one person</span>.</mark>
                Tumlin points out that in the past, an angry memo would take hours to type and photocopy before distribution, providing essential time to calm down and reconsider. Today, an impulsive email can be broadcast instantly to hundreds of colleagues with disastrous personal consequences.
            </p>

            <p><span class="para-tag">[Paragraph 6]</span>
                <mark class="evidence" id="ev-10a-7">Tumlin's advice is simple: <span class="syn-pair-1" data-q="10a-7">always pause and review a message before pressing send</span>. Taking even twenty seconds to ask whether a text is polite, accurate and necessary <span class="syn-pair-2" data-q="10a-7">prevents irreversible misunderstandings</span>.</mark>
            </p>
        `,
        questions: [
            {
                num: 1,
                text: "People often do not consider whether the messages they send have been understood.",
                ans: "YES",
                evId: "ev-10a-1",
                explanation: "Paragraph 3: 'Real communication does not happen until the other person understands the message, and people forget about this important stage in far too many cases.'"
            },
            {
                num: 2,
                text: "Many people consider that face-to-face communication is preferable to electronic messaging.",
                ans: "NOT GIVEN",
                evId: "ev-10a-2",
                explanation: "Paragraph 3 mentions people rush face-to-face conversations, but makes no claim about whether they prefer them to electronic messages."
            },
            {
                num: 3,
                text: "It is a good idea to deal with emails and messages as soon as they arrive.",
                ans: "NO",
                evId: "ev-10a-3",
                explanation: "Paragraph 3: Tumlin argues that rushing to clear inboxes immediately focuses merely on superficial efficiency rather than genuine communication."
            },
            {
                num: 4,
                text: "Highly effective communicators consider what they want to communicate rather than the result they want.",
                ans: "NO",
                evId: "ev-10a-4",
                explanation: "Paragraph 4: Tumlin states the opposite — 'great communicators think carefully about what they would like to achieve rather than about what they would like to say'."
            },
            {
                num: 5,
                text: "Technology has made it easier for people to hold back when they feel angry.",
                ans: "NO",
                evId: "ev-10a-5",
                explanation: "Paragraph 4: Technology encourages sharing impulsive emotional reactions, making it harder (not easier) for people to stop themselves."
            },
            {
                num: 6,
                text: "Sending messages to large numbers of people can cause significant problems.",
                ans: "YES",
                evId: "ev-10a-6",
                explanation: "Paragraph 5: 'One of the greatest problems with the digital age is that sending a message to lots of people is just as easy as sending a message to one person.'"
            },
            {
                num: 7,
                text: "People should review their messages before sending them.",
                ans: "YES",
                evId: "ev-10a-7",
                explanation: "Paragraph 6: Tumlin's advice is simple: 'always pause and review a message before pressing send... prevents irreversible misunderstandings'."
            }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 3 (Overlooked Comprehension Stage)",
                badge: "Reading 10a Walkthrough • Q1",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> ...<mark class="evidence" id="ev-wt-10a-1" data-q="wt-10a-1"><span class="syn-pair-1" data-q="wt-10a-1">Real communication does not happen until the other person understands the message</span>, and <span class="syn-pair-2" data-q="wt-10a-1">people forget about this important stage in far too many cases</span>.</mark>`,
                question: `1. <span class="syn-pair-2" data-q="wt-10a-1">People often do not consider whether</span> the messages they send have been <span class="syn-pair-1" data-q="wt-10a-1">understood</span>. <span class="syn-pair-1" data-q="wt-10a-1">[ 1 ]</span>`,
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"messages they send have been understood"</em> ↔ <em>"Real communication does not happen until other person understands"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"People often do not consider"</em> ↔ <em>"people forget about this important stage in far too many cases"</em> = <strong>YES</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 3 (Face-to-Face vs Digital Preference)",
                badge: "Reading 10a Walkthrough • Q2",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> ...Similarly, <mark class="evidence" id="ev-wt-10a-2" data-q="wt-10a-2"><span class="syn-pair-1" data-q="wt-10a-2">they are in the habit of getting face-to-face conversations over as quickly as possible</span> so they can move on to the next thing.</mark> They feel that they have so many communication tasks to deal with...`,
                question: `2. Many people consider that <span class="syn-pair-1" data-q="wt-10a-2">face-to-face communication is preferable to electronic messaging</span>. <span class="syn-pair-2" data-q="wt-10a-2">[ 2 ]</span>`,
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"face-to-face communication"</em> is mentioned.</div><div class="syn-key-box"><span class="syn-tag blue">Distractor Note:</span> The text says people rush face-to-face chats to move on, but never compares whether they <em>prefer</em> face-to-face over electronic messaging = <strong>NOT GIVEN</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 3 (Instant Inbox Triage Myth)",
                badge: "Reading 10a Walkthrough • Q3",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> ...His argument is that <mark class="evidence" id="ev-wt-10a-3" data-q="wt-10a-3"><span class="syn-pair-1" data-q="wt-10a-3">most people are focusing only on efficiency</span> when they approach the majority of their exchanges. <span class="syn-pair-2" data-q="wt-10a-3">They want to clear their inboxes and respond to new text or voice messages as soon as they come in</span>.</mark>`,
                question: `3. It is a <span class="syn-pair-1" data-q="wt-10a-3">good idea to deal with emails and messages as soon as they arrive</span>. <span class="syn-pair-2" data-q="wt-10a-3">[ 3 ]</span>`,
                ans: "NO",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"deal with emails as soon as they arrive"</em> ↔ <em>"clear inboxes and respond... as soon as they come in"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Tumlin critiques this as a superficial efficiency trap that destroys effective communication = <strong>NO</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 4 (Aims vs Content Focus)",
                badge: "Reading 10a Walkthrough • Q4",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Paragraph 4]</span> ...<mark class="evidence" id="ev-wt-10a-4" data-q="wt-10a-4">'In contrast with average communicators, <span class="syn-pair-1" data-q="wt-10a-4">great communicators think carefully about what they would like to achieve</span> rather than <span class="syn-pair-2" data-q="wt-10a-4">about what they would like to say</span>,' Tumlin says.</mark>`,
                question: `4. Highly effective communicators consider <span class="syn-pair-2" data-q="wt-10a-4">what they want to communicate</span> rather than <span class="syn-pair-1" data-q="wt-10a-4">the result they want</span>. <span class="syn-pair-1" data-q="wt-10a-4">[ 4 ]</span>`,
                ans: "NO",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"Highly effective communicators"</em> ↔ <em>"great communicators"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> The question inverts the truth: they focus on what they want to <em>achieve</em> (the result), NOT what they want to say = <strong>NO</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph 4 (Emotional Restraint & Tech)",
                badge: "Reading 10a Walkthrough • Q5",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Paragraph 4]</span> ...it can be very difficult for people to stop themselves from saying something, especially when they are feeling angry or upset. <mark class="evidence" id="ev-wt-10a-5" data-q="wt-10a-5">By making it so easy for everyone to share their thoughts and feelings, <span class="syn-pair-1" data-q="wt-10a-5">technology has encouraged them to do so</span>.</mark>`,
                question: `5. Technology has made it <span class="syn-pair-1" data-q="wt-10a-5">easier for people to hold back</span> when they <span class="syn-pair-2" data-q="wt-10a-5">feel angry</span>. <span class="syn-pair-2" data-q="wt-10a-5">[ 5 ]</span>`,
                ans: "NO",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"hold back when they feel angry"</em> ↔ <em>"stop themselves from saying something when feeling angry"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Technology makes impulsive sharing easier, meaning it is <em>harder</em> (not easier) to hold back = <strong>NO</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph 5 (Mass Messaging Hazards)",
                badge: "Reading 10a Walkthrough • Q6",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Paragraph 5]</span> <mark class="evidence" id="ev-wt-10a-6" data-q="wt-10a-6"><span class="syn-pair-1" data-q="wt-10a-6">One of the greatest problems with the digital age</span> is that <span class="syn-pair-2" data-q="wt-10a-6">sending a message to lots of people is just as easy as sending a message to one person</span>.</mark>`,
                question: `6. <span class="syn-pair-2" data-q="wt-10a-6">Sending messages to large numbers of people</span> can <span class="syn-pair-1" data-q="wt-10a-6">cause significant problems</span>. <span class="syn-pair-1" data-q="wt-10a-6">[ 6 ]</span>`,
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"cause significant problems"</em> ↔ <em>"One of the greatest problems"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"Sending messages to large numbers"</em> ↔ <em>"sending a message to lots of people"</em> = <strong>YES</strong>.</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph 6 (Pre-Send Review Advice)",
                badge: "Reading 10a Walkthrough • Q7",
                para: "Para 6",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Paragraph 6]</span> <mark class="evidence" id="ev-wt-10a-7" data-q="wt-10a-7">Tumlin's advice is simple: <span class="syn-pair-1" data-q="wt-10a-7">always pause and review a message before pressing send</span>. Taking even twenty seconds... <span class="syn-pair-2" data-q="wt-10a-7">prevents irreversible misunderstandings</span>.</mark>`,
                question: `7. People <span class="syn-pair-1" data-q="wt-10a-7">should review their messages before sending them</span>. <span class="syn-pair-2" data-q="wt-10a-7">[ 7 ]</span>`,
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"should review messages before sending"</em> ↔ <em>"always pause and review a message before pressing send"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Tumlin explicitly advocates this action = <strong>YES</strong>.</div>`
            }
        ]
    },

    // Reading 10b: Cultural diversity in business today
    reading10b: {
        title: "Cultural diversity in business today",
        passage: `
            <p><span class="para-tag">[Paragraph 1]</span>
                As commerce becomes increasingly international, the modern corporate landscape is undergoing a profound transformation. In order to compete effectively in globalised markets, the vast majority of commercial enterprises will inevitably need to become <mark class="evidence" id="ev-10b-1"><span class="syn-pair-1" data-q="10b-1">more culturally diverse</span></mark>. Homogeneous workforces are rapidly discovering that monocultural perspectives restrict innovation.
            </p>

            <p><span class="para-tag">[Paragraph 2]</span>
                Historically, corporate internationalism was dominated by expatriate executives dispatched abroad by Western <mark class="evidence" id="ev-10b-2"><span class="syn-pair-1" data-q="10b-2">multinational companies</span></mark>. Today, however, talent mobility operates bidirectionally across continents. Professionals from emerging economies now contribute vital cross-cultural expertise within global headquarters.
            </p>

            <p><span class="para-tag">[Paragraph 3]</span>
                Organizational psychologists note several quantifiable advantages stemming from multicultural teams. When colleagues approach challenges from diverse philosophical backgrounds, they generate <mark class="evidence" id="ev-10b-3"><span class="syn-pair-1" data-q="10b-3">more creative solutions</span></mark> and avoid the perils of collective groupthink.
            </p>

            <p><span class="para-tag">[Paragraph 4]</span>
                Furthermore, hiring personnel representative of target demographics provides invaluable commercial assets. A company seeking expansion in overseas territories relies heavily on the <mark class="evidence" id="ev-10b-4"><span class="syn-pair-1" data-q="10b-4">local market knowledge</span></mark> that native employees inherently possess, preventing embarrassing marketing blunders.
            </p>

            <p><span class="para-tag">[Paragraph 5]</span>
                Economic data underscores this demographic shift. Commercial activity across <mark class="evidence" id="ev-10b-5"><span class="syn-pair-1" data-q="10b-5">emerging markets</span></mark> has accelerated dramatically, demanding bilingual and multiculturally agile teams capable of navigating nuanced local business etiquette.
            </p>

            <p><span class="para-tag">[Paragraph 6]</span>
                Nevertheless, multicultural integration is not without friction. <mark class="evidence" id="ev-10b-7"><span class="syn-pair-1" data-q="10b-7">Cultural differences can occasionally generate misunderstandings</span></mark> regarding communication hierarchy, indirect feedback, and meeting protocols. While some commentators propose compulsory language classes for all international staff, the text does not suggest such universal mandates.
            </p>

            <p><span class="para-tag">[Paragraph 7]</span>
                Crucially, diversity alone does not ensure success. As research indicates, <mark class="evidence" id="ev-10b-8"><span class="syn-pair-1" data-q="10b-8">good leadership is essential to ensure a diverse team works effectively together</span></mark>. Without skilled managerial facilitation, diverse groups can fracture into uncooperative cultural enclaves rather than outperforming homogeneous teams.
            </p>

            <p><span class="para-tag">[Paragraph 8]</span>
                Ultimately, businesses that foster an inclusive, culturally literate environment secure an enduring strategic edge. <mark class="evidence" id="ev-10b-10"><span class="syn-pair-1" data-q="10b-10">Embracing diversity affords organisations a long-term competitive advantage</span></mark> in an interconnected global community.
            </p>
        `,
        questions: [
            {
                num: 1,
                text: "According to the writer, what will most businesses need to become?",
                ans: "more culturally diverse",
                evId: "ev-10b-1",
                explanation: "Paragraph 1 states that most commercial enterprises will inevitably need to become 'more culturally diverse'."
            },
            {
                num: 2,
                text: "What is the background of the people the writer refers to as 'expatriates'?",
                ans: "multinational companies",
                evId: "ev-10b-2",
                explanation: "Paragraph 2 refers to expatriate executives sent abroad by Western 'multinational companies'."
            },
            {
                num: 3,
                text: "What is one positive consequence of employing people from diverse backgrounds?",
                ans: "more creative solutions",
                evId: "ev-10b-3",
                explanation: "Paragraph 3 notes that multicultural teams generate 'more creative solutions'."
            },
            {
                num: 4,
                text: "What kind of knowledge does a diverse workforce bring to a business?",
                ans: "local market knowledge",
                evId: "ev-10b-4",
                explanation: "Paragraph 4 highlights that native employees provide invaluable 'local market knowledge'."
            },
            {
                num: 5,
                text: "Which geographical area does the writer give as an example of rapid economic growth?",
                ans: "emerging markets",
                evId: "ev-10b-5",
                explanation: "Paragraph 5 points to commercial acceleration across 'emerging markets'."
            },
            {
                num: 6,
                text: "Companies should offer language training to all foreign employees.",
                ans: "NOT GIVEN",
                evId: "ev-10b-6",
                explanation: "Paragraph 6 mentions language classes, but does not state that companies should offer them to all foreign staff."
            },
            {
                num: 7,
                text: "Cultural differences can sometimes create misunderstandings among colleagues.",
                ans: "YES",
                evId: "ev-10b-7",
                explanation: "Paragraph 6 explicitly confirms that cultural differences can occasionally generate misunderstandings."
            },
            {
                num: 8,
                text: "Good leadership is essential to ensure a diverse team works effectively together.",
                ans: "YES",
                evId: "ev-10b-8",
                explanation: "Paragraph 7 notes that good leadership is essential for diverse team collaboration."
            },
            {
                num: 9,
                text: "Diverse teams always perform better than teams where members share the same background.",
                ans: "NO",
                evId: "ev-10b-9",
                explanation: "Paragraph 7 explains that without leadership, diverse groups can fracture; diversity does not guarantee superior performance."
            },
            {
                num: 10,
                text: "Embracing diversity gives organizations a long-term competitive advantage.",
                ans: "YES",
                evId: "ev-10b-10",
                explanation: "Paragraph 8 concludes that embracing diversity affords organizations an enduring competitive edge."
            }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 1 (Future Commercial Imperative)",
                badge: "Reading 10b Walkthrough • Q1",
                para: "Para 1",
                header: "📖 Passage Excerpt (Paragraph 1)",
                excerpt: `<span class="para-tag">[Paragraph 1]</span> ...In order to compete effectively in globalised markets, <mark class="evidence" id="ev-wt-10b-1" data-q="wt-10b-1"><span class="syn-pair-1" data-q="wt-10b-1">the vast majority of commercial enterprises will inevitably need to become</span> <span class="syn-pair-2" data-q="wt-10b-1">more culturally diverse</span>.</mark>`,
                question: `1. According to the writer, <span class="syn-pair-1" data-q="wt-10b-1">what will most businesses need to become</span>? <span class="syn-pair-2" data-q="wt-10b-1">[ _______ ]</span> (NO MORE THAN THREE WORDS)`,
                ans: "more culturally diverse",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"most businesses need to become"</em> ↔ <em>"vast majority of commercial enterprises will inevitably need to become"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target attribute = <strong>more culturally diverse</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 2 (Expatriate Corporate Background)",
                badge: "Reading 10b Walkthrough • Q2",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Paragraph 2]</span> Historically, <mark class="evidence" id="ev-wt-10b-2" data-q="wt-10b-2"><span class="syn-pair-1" data-q="wt-10b-2">corporate internationalism was dominated by expatriate executives dispatched abroad by Western</span> <span class="syn-pair-2" data-q="wt-10b-2">multinational companies</span>.</mark>`,
                question: `2. What is the <span class="syn-pair-1" data-q="wt-10b-2">background of the people referred to as 'expatriates'</span>? <span class="syn-pair-2" data-q="wt-10b-2">[ _______ ]</span> (NO MORE THAN THREE WORDS)`,
                ans: "multinational companies",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"people referred to as 'expatriates'"</em> ↔ <em>"expatriate executives dispatched abroad"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Corporate entity = <strong>multinational companies</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 3 (Creative Cognitive Output)",
                badge: "Reading 10b Walkthrough • Q3",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Paragraph 3]</span> ...When colleagues approach challenges from diverse philosophical backgrounds, <mark class="evidence" id="ev-wt-10b-3" data-q="wt-10b-3"><span class="syn-pair-1" data-q="wt-10b-3">they generate</span> <span class="syn-pair-2" data-q="wt-10b-3">more creative solutions</span> and avoid the perils of collective groupthink.</mark>`,
                question: `3. What is <span class="syn-pair-1" data-q="wt-10b-3">one positive consequence of employing people from diverse backgrounds</span>? <span class="syn-pair-2" data-q="wt-10b-3">[ _______ ]</span> (NO MORE THAN THREE WORDS)`,
                ans: "more creative solutions",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"positive consequence of diverse backgrounds"</em> ↔ <em>"When colleagues approach challenges from diverse backgrounds"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Direct benefit = <strong>more creative solutions</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 4 (Demographic Commercial Knowledge)",
                badge: "Reading 10b Walkthrough • Q4",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Paragraph 4]</span> ...A company seeking expansion in overseas territories <mark class="evidence" id="ev-wt-10b-4" data-q="wt-10b-4"><span class="syn-pair-1" data-q="wt-10b-4">relies heavily on the</span> <span class="syn-pair-2" data-q="wt-10b-4">local market knowledge</span> that native employees inherently possess...</mark>`,
                question: `4. What <span class="syn-pair-1" data-q="wt-10b-4">kind of knowledge does a diverse workforce bring</span> to a business? <span class="syn-pair-2" data-q="wt-10b-4">[ _______ ]</span> (NO MORE THAN THREE WORDS)`,
                ans: "local market knowledge",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"knowledge a diverse workforce brings"</em> ↔ <em>"knowledge native employees inherently possess"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Commercial asset = <strong>local market knowledge</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph 5 (Commercial Acceleration Regions)",
                badge: "Reading 10b Walkthrough • Q5",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Paragraph 5]</span> Economic data underscores this demographic shift. <mark class="evidence" id="ev-wt-10b-5" data-q="wt-10b-5"><span class="syn-pair-1" data-q="wt-10b-5">Commercial activity across</span> <span class="syn-pair-2" data-q="wt-10b-5">emerging markets</span> has accelerated dramatically...</mark>`,
                question: `5. Which <span class="syn-pair-1" data-q="wt-10b-5">geographical area is given as an example of rapid economic growth</span>? <span class="syn-pair-2" data-q="wt-10b-5">[ _______ ]</span> (NO MORE THAN THREE WORDS)`,
                ans: "emerging markets",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"example of rapid economic growth"</em> ↔ <em>"Commercial activity has accelerated dramatically"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target region = <strong>emerging markets</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph 6 (Language Training Policy)",
                badge: "Reading 10b Walkthrough • Q6",
                para: "Para 6",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Paragraph 6]</span> ...<mark class="evidence" id="ev-wt-10b-6" data-q="wt-10b-6"><span class="syn-pair-1" data-q="wt-10b-6">While some commentators propose compulsory language classes for all international staff</span>, the text <span class="syn-pair-2" data-q="wt-10b-6">does not suggest such universal mandates</span>.</mark>`,
                question: `6. Companies <span class="syn-pair-1" data-q="wt-10b-6">should offer language training to all foreign employees</span>. <span class="syn-pair-2" data-q="wt-10b-6">[ 6 ]</span>`,
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"language training to all foreign employees"</em> is mentioned as a proposal by commentators.</div><div class="syn-key-box"><span class="syn-tag blue">Distractor Note:</span> The writer does not express an opinion on whether companies <em>should</em> mandate this = <strong>NOT GIVEN</strong>.</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph 6 (Interpersonal Friction Risks)",
                badge: "Reading 10b Walkthrough • Q7",
                para: "Para 7",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Paragraph 6]</span> <mark class="evidence" id="ev-wt-10b-7" data-q="wt-10b-7"><span class="syn-pair-1" data-q="wt-10b-7">Cultural differences can occasionally generate misunderstandings</span> regarding communication hierarchy, indirect feedback, and meeting protocols.</mark>`,
                question: `7. <span class="syn-pair-1" data-q="wt-10b-7">Cultural differences can sometimes create misunderstandings</span> among colleagues. <span class="syn-pair-2" data-q="wt-10b-7">[ 7 ]</span>`,
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"Cultural differences can sometimes create misunderstandings"</em> ↔ <em>"Cultural differences can occasionally generate misunderstandings"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Direct claim match = <strong>YES</strong>.</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph 7 (Managerial Facilitation Role)",
                badge: "Reading 10b Walkthrough • Q8",
                para: "Para 7",
                header: "📖 Passage Excerpt (Paragraph 7)",
                excerpt: `<span class="para-tag">[Paragraph 7]</span> ...As research indicates, <mark class="evidence" id="ev-wt-10b-8" data-q="wt-10b-8"><span class="syn-pair-1" data-q="wt-10b-8">good leadership is essential to ensure a diverse team works effectively together</span>.</mark>`,
                question: `8. <span class="syn-pair-1" data-q="wt-10b-8">Good leadership is essential</span> to ensure a diverse team <span class="syn-pair-2" data-q="wt-10b-8">works effectively together</span>. <span class="syn-pair-2" data-q="wt-10b-8">[ 8 ]</span>`,
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"Good leadership is essential"</em> ↔ <em>"good leadership is essential"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Verbatim match with passage claim = <strong>YES</strong>.</div>`
            },
            {
                qNum: 9,
                title: "Walkthrough: Question 9 & Paragraph 7 (Automatic Performance Guarantee)",
                badge: "Reading 10b Walkthrough • Q9",
                para: "Para 9",
                header: "📖 Passage Excerpt (Paragraph 7)",
                excerpt: `<span class="para-tag">[Paragraph 7]</span> ...<mark class="evidence" id="ev-wt-10b-9" data-q="wt-10b-9">Without skilled managerial facilitation, <span class="syn-pair-1" data-q="wt-10b-9">diverse groups can fracture into uncooperative cultural enclaves</span> rather than <span class="syn-pair-2" data-q="wt-10b-9">outperforming homogeneous teams</span>.</mark>`,
                question: `9. Diverse teams <span class="syn-pair-2" data-q="wt-10b-9">always perform better</span> than teams where <span class="syn-pair-1" data-q="wt-10b-9">members share the same background</span>. <span class="syn-pair-1" data-q="wt-10b-9">[ 9 ]</span>`,
                ans: "NO",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"teams where members share the same background"</em> ↔ <em>"homogeneous teams"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> The word <em>always</em> contradicts the text: without leadership, diverse teams can fracture and fail = <strong>NO</strong>.</div>`
            },
            {
                qNum: 10,
                title: "Walkthrough: Question 10 & Paragraph 8 (Strategic Competitive Advantage)",
                badge: "Reading 10b Walkthrough • Q10",
                para: "Para 8",
                header: "📖 Passage Excerpt (Paragraph 8)",
                excerpt: `<span class="para-tag">[Paragraph 8]</span> <mark class="evidence" id="ev-wt-10b-10" data-q="wt-10b-10"><span class="syn-pair-1" data-q="wt-10b-10">Embracing diversity affords organisations</span> a <span class="syn-pair-2" data-q="wt-10b-10">long-term competitive advantage</span> in an interconnected global community.</mark>`,
                question: `10. <span class="syn-pair-1" data-q="wt-10b-10">Embracing diversity gives organizations</span> a <span class="syn-pair-2" data-q="wt-10b-10">long-term competitive advantage</span>. <span class="syn-pair-2" data-q="wt-10b-10">[ 10 ]</span>`,
                ans: "YES",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"Embracing diversity gives organizations"</em> ↔ <em>"Embracing diversity affords organisations"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"long-term competitive advantage"</em> is a direct match = <strong>YES</strong>.</div>`
            }
        ]
    },

    // Academic Lexicon & Collocations Hub Bank
    vocabulary: {
        title: "Module 10: Academic Lexicon & Collocations Hub",
        badge: "Vocabulary 10 • Academic Lexicon",
        subtitle: "Click on any academic term to inspect pronunciation, definitions, and high-scoring IELTS collocations.",
        words: [
            {
                word: "contemporary",
                ipa: "/kənˈtem.pər.ər.i/",
                pos: "adj.",
                cefr: "B2",
                def: "Belonging to or occurring in the present; modern.",
                colloc: "contemporary world • contemporary society • contemporary communication",
                example: "Navigating interpersonal relationships in the contemporary digital era presents unique psychological hurdles.",
                context: "Passage 10a: 'Geoffrey Tumlin is the author of a book on communications in our contemporary world.'"
            },
            {
                word: "dependency",
                ipa: "/dɪˈpen.dən.si/",
                pos: "noun",
                cefr: "B2",
                def: "The state of relying on or being controlled by someone or something else.",
                colloc: "technological dependency • heavy dependency • reduce dependency",
                example: "An unhealthy dependency on messaging apps often prevents authentic emotional dialogue.",
                context: "Passage 10a: 'He says the result of such dependency is that people feel dissatisfied.'"
            },
            {
                word: "multicultural",
                ipa: "/ˌmʌl.tiˈkʌl.tʃər.əl/",
                pos: "adj.",
                cefr: "B2",
                def: "Relating to or constituting several cultural or ethnic groups within a society.",
                colloc: "multicultural workforce • multicultural society • multicultural team",
                example: "Leading a multicultural workforce requires acute sensitivity to divergent conversational norms.",
                context: "Section 10b: 'Cultural diversity in business: Managing multicultural teams.'"
            },
            {
                word: "etiquette",
                ipa: "/ˈet.ɪ.ket/",
                pos: "noun",
                cefr: "C1",
                def: "The customary code of polite behavior in society or among members of a particular profession or group.",
                colloc: "business etiquette • social etiquette • diplomatic etiquette",
                example: "Failing to comprehend local business etiquette can scupper high-value trade agreements.",
                context: "Section 10b Vocabulary: 'Intercultural communication etiquette and greeting customs.'"
            },
            {
                word: "nuance",
                ipa: "/ˈnjuː.ɑːns/",
                pos: "noun",
                cefr: "C1",
                def: "A subtle difference in or shade of meaning, expression, or sound.",
                colloc: "subtle nuance • cultural nuance • understand nuances",
                example: "Translating idioms without grasping cultural nuances leads to humorous or offensive misinterpretations.",
                context: "Section 10b Review: 'Navigating cultural nuances in cross-border negotiations.'"
            },
            {
                word: "non-verbal",
                ipa: "/ˌnɒnˈvɜː.bəl/",
                pos: "adj.",
                cefr: "B2",
                def: "Not involving or using words or speech, especially relating to gestures, posture, or facial expressions.",
                colloc: "non-verbal communication • non-verbal cues • non-verbal signals",
                example: "Body language and non-verbal cues often transmit more emotional meaning than spoken vocabulary.",
                context: "Section 10b: 'Understanding others: Non-verbal communication and gestures.'"
            },
            {
                word: "interpretation",
                ipa: "/ɪnˌtɜː.prɪˈteɪ.ʃən/",
                pos: "noun",
                cefr: "B2",
                def: "The action of explaining the meaning of something, or understanding something in a particular way.",
                colloc: "open to interpretation • different interpretation • literal interpretation",
                example: "A simple hand gesture may be polite in one territory but open to offensive interpretation in another.",
                context: "Section 10b: 'Cultural interpretations of gestures and eye contact.'"
            },
            {
                word: "globalization",
                ipa: "/ˌɡləʊ.bəl.aɪˈzeɪ.ʃən/",
                pos: "noun",
                cefr: "B2",
                def: "The process by which businesses or other organizations develop international influence or operate on an international scale.",
                colloc: "rapid globalization • economic globalization • impact of globalization",
                example: "Rapid globalization has compelled multinational corporations to diversify their management echelons.",
                context: "Writing 10b Model: 'Traditional customs versus globalization in modern communities.'"
            },
            {
                word: "impulsive",
                ipa: "/ɪmˈpʌl.sɪv/",
                pos: "adj.",
                cefr: "C1",
                def: "Acting or done quickly and without thinking about the results or consequences.",
                colloc: "impulsive decision • impulsive reaction • impulsive behavior",
                example: "Firing off an impulsive email while angry can irreparably damage professional standing.",
                context: "Passage 10a: 'Today, an impulsive email can be broadcast instantly to hundreds of colleagues.'"
            },
            {
                word: "restraint",
                ipa: "/rɪˈstreɪnt/",
                pos: "noun",
                cefr: "C1",
                def: "Unemotional, self-controlled, or moderate behavior; self-discipline.",
                colloc: "exercise restraint • show restraint • emotional restraint",
                example: "Effective negotiators demonstrate remarkable emotional restraint during heated discussions.",
                context: "Passage 10a: 'Showing restraint before hitting send prevents communication disasters.'"
            },
            {
                word: "consensus",
                ipa: "/kənˈsen.səs/",
                pos: "noun",
                cefr: "C1",
                def: "A general agreement among a group of people.",
                colloc: "reach a consensus • broad consensus • general consensus",
                example: "Building a team consensus requires active listening and respectful compromise from all parties.",
                context: "Section 10b: 'Reaching a consensus across diverse business viewpoints.'"
            },
            {
                word: "empathy",
                ipa: "/ˈem.pə.θi/",
                pos: "noun",
                cefr: "B2",
                def: "The ability to understand and share the feelings of another person.",
                colloc: "show empathy • deep empathy • lack of empathy",
                example: "Demonstrating genuine empathy allows international team leaders to resolve cultural friction.",
                context: "Section 10b: 'Intercultural communication: Cultivating empathy and understanding.'"
            }
        ]
    }
};

// Global aliases for declarative data-binding
window.reading10a = window.module10Data.reading10a;
window.reading10b = window.module10Data.reading10b;
window.vocabulary = window.module10Data.vocabulary;
window.moduleData = window.module10Data;
