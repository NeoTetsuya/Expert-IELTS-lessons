/**
 * =========================================================================
 * Expert IELTS 5 — Module 8: Activity Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Walkthroughs
 * Aligned with official curriculum in md files/e5/m8 content.md
 * =========================================================================
 */

window.module8Data = {
    meta: {
        id: "module-08",
        level: "Expert 5",
        band: "Band 5.0 – 6.0",
        moduleNum: "08",
        title: "Activity — Sport & Work and Play",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 40,
        tags: [
            { text: "Reading 8a/8b", bg: "var(--col-reading)" },
            { text: "Grammar: Present Perfect & Articles", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Sport & Business", bg: "var(--col-vocab)" },
            { text: "Writing: Task 2 Problem-Solution", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "8a", title: "Sport & Sports Psychology", desc: "MCQ 'Mind Games', Present Perfect (for/since), Sport Collocations, and Problem-Solution essay on youth inactivity." },
            { num: "8b", title: "Work, Play & Fitness Industry", desc: "Academic Summary, Articles (a/an/the/zero), Business Collocations, 'Personal Training in the UK' Notes & MCQ, and Task 2 Models." },
            { num: "Review", title: "Module 8 Competency Checklist", desc: "Core examination checklist across MCQ, Present Perfect, Articles, and Problem-Solution essay structure." }
        ]
    },

    // Reading 8a: Mind Games (Sports Psychology)
    reading8a: {
        title: "Mind games: How footballers use sports psychology",
        passage: `
            <p><span class="para-tag">[Paragraph A]</span>
                <mark class="evidence" id="ev-8a-1">Footballers are not always famous for their intelligence off the pitch, but their mental skills in the middle of a competition are usually extraordinary. Most people find it hard to imagine successfully doing even something simple while 40,000 spectators watch. Yet every weekend, <span class="syn-pair-1" data-q="8a-1">Premier League players</span> <span class="syn-pair-2" data-q="8a-1">perform brilliantly</span> in packed stadiums under extreme pressure.</mark>
            </p>

            <p><span class="para-tag">[Paragraph B]</span>
                For some players, the qualities of confidence and being calm are completely natural. But for the majority,
                <mark class="evidence" id="ev-8a-2"><span class="syn-pair-1" data-q="8a-2">mental skills involve ways of thinking and behaving which they have to learn and practise</span> in the same way they learn physical or technical skills.</mark>
                That's why most Premier League clubs now work with sports psychologists, who teach the teams a range of <span class="syn-pair-2" data-q="8a-2">mental techniques</span>, including positive self-talk and anger management, as well as how to re-focus quickly as the game changes. The television cameras and fans cannot see these skills, but they do see the effect they have.
            </p>

            <p><span class="para-tag">[Paragraph C]</span>
                Premier League footballers learn a number of special tricks, and those methods can help people in other professions too. Bradley Busch is a sports psychologist who has also worked with, for example, businessmen, teachers and students. 'Being confident, dealing with anger and being focused are just as important on football pitches as they are in the office or the classroom,' he says. 'And we now know that the key to a successful performance is the front area of the brain.'
                <mark class="evidence" id="ev-8a-3">He explains that this area is very important for using information to think about what might happen next and for making decisions. <span class="syn-pair-1" data-q="8a-3">If this part of the brain gets too much information or stress, then this affects the ability to decide quickly what to do next.</span></mark>
            </p>

            <p><span class="para-tag">[Paragraph D]</span>
                <mark class="evidence" id="ev-8a-4">Psychologists have shown that talking to oneself in a positive way can have a very powerful effect. Research proves that a person's <span class="syn-pair-1" data-q="8a-4">internal conversations affect the chemistry in the brain</span>. <span class="syn-pair-2" data-q="8a-4">Negative comments cause stress which, in turn, reduces the ability of the brain to work at its best.</span></mark>
                In training, players practise taking a negative thought and changing it into a positive one. A difficult problem becomes an exciting challenge, for example. According to a study published by the Journal of Sport Behaviour in 2010, this self-talk really does make a difference.
                <mark class="evidence" id="ev-8a-5">Many footballers also try to remember key words to control their behaviour. For example, a player who gets angry quickly might say 'Ice!' to remind them to stay in control. <span class="syn-pair-1" data-q="8a-5">The brain finds it much easier to deal with one strong image than many complex processes.</span> It only takes a second to get out of control, so <span class="syn-pair-2" data-q="8a-5">speed is important</span>.</mark>
            </p>

            <p><span class="para-tag">[Paragraph E]</span>
                Sportspeople can even make good use of body language to help themselves get into a positive frame of mind and increase their confidence. 'We tell players to keep their eyes up, for example, because if they have their head and shoulders down, their brain chemistry changes for the worse. Holding their head up keeps their brain active,' says Busch. There is research evidence for this here, too. Studies by Harvard Business School showed that standing up straight can reduce levels of stress and increase confidence by a significant amount.
            </p>

            <p><span class="para-tag">[Paragraph F]</span>
                <mark class="evidence" id="ev-8a-6">Psychological research suggests that when things go wrong, <span class="syn-pair-1" data-q="8a-6">players should focus on three things only</span>. They have to be things that they can control. <span class="syn-pair-2" data-q="8a-6">A striker can't control goals but he can control his movement, his energy and the quality of his strikes.</span></mark>
                It is a matter of using the brain in the right way. Focusing on simple objectives can also help a player to identify and take more opportunities. 'There is so much information out there that the brain ignores what it does not need and focuses instead on what it understands to be important,' explains Busch.
            </p>

            <p><span class="para-tag">[Paragraph G]</span>
                <mark class="evidence" id="ev-8a-7"><span class="syn-pair-1" data-q="8a-7">The knowledge that sports psychologists use so effectively with players is also useful for people who want to achieve more in their studies or their working lives.</span> They, too, can benefit from what Busch recommends for his sports clients.</mark>
            </p>
        `,
        questions: [
            {
                num: 1,
                text: "What is the main point about footballers in the first paragraph?",
                options: [
                    { letter: "A", text: "They respond best when people are watching them" },
                    { letter: "B", text: "They are able to cope with a difficult situation" },
                    { letter: "C", text: "They do something that is actually very simple" },
                    { letter: "D", text: "People don't think they are very clever" }
                ],
                ans: "B",
                evId: "ev-8a-1",
                explanation: "Paragraph A states players perform brilliantly under extreme pressure with 40,000 spectators watching, matching 'able to cope with a difficult situation'."
            },
            {
                num: 2,
                text: "In the second paragraph, the writer mentions sports psychology as something which",
                options: [
                    { letter: "A", text: "is used by all football clubs" },
                    { letter: "B", text: "needs to be taught to players" },
                    { letter: "C", text: "can help build team spirit" },
                    { letter: "D", text: "is more technical than people realise" }
                ],
                ans: "B",
                evId: "ev-8a-2",
                explanation: "Paragraph B notes that players 'have to learn and practise' mental skills in the same way as physical skills, so it 'needs to be taught'."
            },
            {
                num: 3,
                text: "Busch mentions an area of the brain in order to",
                options: [
                    { letter: "A", text: "contrast it with other brain functions" },
                    { letter: "B", text: "describe how things can go wrong" },
                    { letter: "C", text: "give details about what he has studied" },
                    { letter: "D", text: "show its significance for business and sport" }
                ],
                ans: "B",
                evId: "ev-8a-3",
                explanation: "Paragraph C explains that if this part of the brain gets too much information or stress, then this affects the ability to decide quickly, illustrating how things can go wrong."
            },
            {
                num: 4,
                text: "According to the writer, 'self-talk' can help players to",
                options: [
                    { letter: "A", text: "forget what people say" },
                    { letter: "B", text: "respond to unhelpful comments" },
                    { letter: "C", text: "perform to the same level as other players" },
                    { letter: "D", text: "stop stress from affecting their behaviour" }
                ],
                ans: "D",
                evId: "ev-8a-4",
                explanation: "Paragraph D shows positive self-talk prevents negative comments that cause stress and degrade brain performance."
            },
            {
                num: 5,
                text: "The writer uses the example of a player thinking of 'ice' to show that",
                options: [
                    { letter: "A", text: "footballers must be careful what they do on the pitch" },
                    { letter: "B", text: "anyone can use this easy technique to help themselves" },
                    { letter: "C", text: "it is best to think of something the brain can respond to quickly" },
                    { letter: "D", text: "words are more powerful than actions" }
                ],
                ans: "C",
                evId: "ev-8a-5",
                explanation: "The brain processes one strong image much faster than complex instructions, which is crucial when seconds count."
            },
            {
                num: 6,
                text: "Busch talks about a football striker to illustrate that",
                options: [
                    { letter: "A", text: "players need to take opportunities at the right time" },
                    { letter: "B", text: "sport psychology is not as simple as it appears" },
                    { letter: "C", text: "players should not concentrate on too many things" },
                    { letter: "D", text: "self-control is important in sport" }
                ],
                ans: "C",
                evId: "ev-8a-6",
                explanation: "Paragraph F explains players must limit their focus to only three controllable factors rather than too many variables."
            },
            {
                num: 7,
                text: "What point is the writer trying to make in the passage?",
                options: [
                    { letter: "A", text: "how skills highlighted by sports psychology are relevant for everyone" },
                    { letter: "B", text: "how sportspeople pay too little attention to psychological knowledge" },
                    { letter: "C", text: "how many useful aspects of sports psychology there are" },
                    { letter: "D", text: "how difficult it is to overcome psychological limits in sport" }
                ],
                ans: "A",
                evId: "ev-8a-7",
                explanation: "Paragraphs C & G reinforce that sports psychology techniques benefit students, teachers, and business professionals alike."
            }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph A (Pressure in Competition)",
                badge: "Reading 8a Walkthrough • Q1",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Paragraph A]</span> Footballers are not always famous for their intelligence off the pitch, but their mental skills in the middle of a competition are usually extraordinary. <mark class="evidence" id="ev-wt-8a-1" data-q="wt-8a-1">Most people find it hard to imagine successfully doing even something simple while 40,000 spectators watch. Yet every weekend, <span class="syn-pair-1" data-q="wt-8a-1">Premier League players</span> <span class="syn-pair-2" data-q="wt-8a-1">perform brilliantly in packed stadiums under extreme pressure</span>.</mark>`,
                question: `1. What is the main point the writer wants to make about <span class="syn-pair-1" data-q="wt-8a-1">footballers</span> in the first paragraph? <span class="syn-pair-2" data-q="wt-8a-1">[ 1 ]</span>`,
                ans: "B",
                options: [
                    { letter: "A", text: "They respond best when people are watching them" },
                    { letter: "B", text: "They are able to cope with a difficult situation" },
                    { letter: "C", text: "They do something that is actually very simple" },
                    { letter: "D", text: "People don't think they are very clever" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"footballers"</em> ↔ <em>"Premier League players"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"perform brilliantly... under extreme pressure"</em> = <strong>B (They are able to cope with a difficult situation)</strong>.</div><div class="syn-key-box"><span class="syn-tag blue">Distractor Note:</span> 40,000 spectators are an obstacle making performance harder, not something they 'respond best' to (Option A).</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph B (Learning Mental Skills)",
                badge: "Reading 8a Walkthrough • Q2",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Paragraph B]</span> ...for the majority, <mark class="evidence" id="ev-wt-8a-2" data-q="wt-8a-2"><span class="syn-pair-1" data-q="wt-8a-2">mental skills</span> involve ways of thinking and behaving which they <span class="syn-pair-2" data-q="wt-8a-2">have to learn and practise</span> in the same way they learn physical or technical skills. That's why most Premier League clubs now work with <span class="syn-pair-1" data-q="wt-8a-2">sports psychologists</span>, who <span class="syn-pair-2" data-q="wt-8a-2">teach the teams a range of mental techniques</span>...</mark>`,
                question: `2. In the second paragraph, the writer mentions <span class="syn-pair-1" data-q="wt-8a-2">sports psychology</span> as something which <span class="syn-pair-2" data-q="wt-8a-2">[ 2 ]</span>.`,
                ans: "B",
                options: [
                    { letter: "A", text: "is used by all football clubs" },
                    { letter: "B", text: "needs to be taught to players" },
                    { letter: "C", text: "can help build team spirit" },
                    { letter: "D", text: "is more technical than people realise" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"sports psychology"</em> ↔ <em>"sports psychologists / mental skills"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"have to learn and practise / teach the teams"</em> = <strong>B (needs to be taught to players)</strong>.</div><div class="syn-key-box"><span class="syn-tag blue">Distractor Note:</span> The text says 'most' clubs work with psychologists, not 'all' (Option A).</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph C (Front Area of the Brain)",
                badge: "Reading 8a Walkthrough • Q3",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Paragraph C]</span> ...'And we now know that the key to a successful performance is the <span class="syn-pair-1" data-q="wt-8a-3">front area of the brain</span>.' He explains that this area is very important for using information to think about what might happen next and for making decisions. <mark class="evidence" id="ev-wt-8a-3" data-q="wt-8a-3">If this part of the brain <span class="syn-pair-2" data-q="wt-8a-3">gets too much information or stress, then this affects the ability to decide quickly</span> what to do next.</mark>`,
                question: `3. Busch mentions an <span class="syn-pair-1" data-q="wt-8a-3">area of the brain</span> in order to <span class="syn-pair-2" data-q="wt-8a-3">[ 3 ]</span>.`,
                ans: "B",
                options: [
                    { letter: "A", text: "contrast it with other brain functions" },
                    { letter: "B", text: "describe how things can go wrong" },
                    { letter: "C", text: "give details about what he has studied" },
                    { letter: "D", text: "show its significance for business and sport" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"area of the brain"</em> ↔ <em>"front area of the brain / this part of the brain"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"gets too much information or stress... affects ability to decide"</em> = <strong>B (describe how things can go wrong)</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph D (Power of Positive Self-Talk)",
                badge: "Reading 8a Walkthrough • Q4",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Paragraph D]</span> Psychologists have shown that talking to oneself in a positive way can have a very powerful effect... <mark class="evidence" id="ev-wt-8a-4" data-q="wt-8a-4"><span class="syn-pair-1" data-q="wt-8a-4">Negative comments cause stress</span> which, in turn, reduces the ability of the brain to work at its best... <span class="syn-pair-2" data-q="wt-8a-4">positive and motivating self-talk at half-time, improved the performance</span> of some players...</mark>`,
                question: `4. According to the writer, <span class="syn-pair-2" data-q="wt-8a-4">'self-talk' can help players to</span> <span class="syn-pair-1" data-q="wt-8a-4">[ 4 ]</span>.`,
                ans: "D",
                options: [
                    { letter: "A", text: "forget what people say" },
                    { letter: "B", text: "respond to unhelpful comments" },
                    { letter: "C", text: "perform to the same level as other players" },
                    { letter: "D", text: "stop stress from affecting their behaviour" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"stop stress from affecting behaviour"</em> ↔ <em>"Negative comments cause stress... reduces ability"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"positive self-talk improved performance"</em> counteracts stress = <strong>D (stop stress from affecting their behaviour)</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph D (Mental Speed & 'Ice' Cue)",
                badge: "Reading 8a Walkthrough • Q5",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Paragraph D]</span> ...For example, <mark class="evidence" id="ev-wt-8a-5" data-q="wt-8a-5">a player who gets angry quickly might say <span class="syn-pair-1" data-q="wt-8a-5">'Ice!'</span> to remind them to stay in control. <span class="syn-pair-2" data-q="wt-8a-5">The brain finds it much easier to deal with one strong image</span> than many complex processes. It only takes a second to get out of control, so <span class="syn-pair-2" data-q="wt-8a-5">speed is important</span>.</mark>`,
                question: `5. The writer uses the example of a player <span class="syn-pair-1" data-q="wt-8a-5">thinking of 'ice'</span> to show that <span class="syn-pair-2" data-q="wt-8a-5">[ 5 ]</span>.`,
                ans: "C",
                options: [
                    { letter: "A", text: "footballers must be careful what they do on the pitch" },
                    { letter: "B", text: "anyone can use this easy technique to help themselves" },
                    { letter: "C", text: "it is best to think of something the brain can respond to quickly" },
                    { letter: "D", text: "words are more powerful than actions" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"thinking of 'ice'"</em> ↔ <em>"might say 'Ice!' to remind them to stay in control"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"deal with one strong image... speed is important"</em> = <strong>C (it is best to think of something the brain can respond to quickly)</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph F (Striker Controllable Factors)",
                badge: "Reading 8a Walkthrough • Q6",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Paragraph F]</span> ...Busch suggests that <mark class="evidence" id="ev-wt-8a-6" data-q="wt-8a-6"><span class="syn-pair-2" data-q="wt-8a-6">players should focus on three things only</span>. They have to be things that they can control. <span class="syn-pair-1" data-q="wt-8a-6">A striker</span> can't control goals but he can control his movement, his energy and the quality of his strikes.</mark>`,
                question: `6. Busch talks about a <span class="syn-pair-1" data-q="wt-8a-6">football striker</span> to illustrate that <span class="syn-pair-2" data-q="wt-8a-6">[ 6 ]</span>.`,
                ans: "C",
                options: [
                    { letter: "A", text: "players need to take opportunities at the right time" },
                    { letter: "B", text: "sport psychology is not as simple as it appears" },
                    { letter: "C", text: "players should not concentrate on too many things" },
                    { letter: "D", text: "self-control is important in sport" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"football striker"</em> ↔ <em>"A striker can't control goals but can control his movement..."</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"focus on three things only"</em> = <strong>C (players should not concentrate on too many things)</strong>.</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph G (Universal Applicability)",
                badge: "Reading 8a Walkthrough • Q7",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Paragraph G]</span> In fact, the tricks and techniques that Premier League footballers use are <mark class="evidence" id="ev-wt-8a-7" data-q="wt-8a-7"><span class="syn-pair-2" data-q="wt-8a-7">useful for people who want to achieve more in their studies or their working lives</span>. <span class="syn-pair-1" data-q="wt-8a-7">They, too, can benefit from what Busch recommends</span>...</mark>`,
                question: `7. What <span class="syn-pair-1" data-q="wt-8a-7">point is the writer trying to make</span> in the passage? <span class="syn-pair-2" data-q="wt-8a-7">[ 7 ]</span>`,
                ans: "A",
                options: [
                    { letter: "A", text: "how skills highlighted by sports psychology are relevant for everyone" },
                    { letter: "B", text: "how sportspeople pay too little attention to psychological knowledge" },
                    { letter: "C", text: "how many useful aspects of sports psychology there are" },
                    { letter: "D", text: "how difficult it is to overcome psychological limits in sport" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"point the writer is making"</em> ↔ <em>"tricks and techniques... useful for people"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"studies or working lives / They, too, can benefit"</em> = <strong>A (how skills highlighted by sports psychology are relevant for everyone)</strong>.</div>`
            }
        ]
    },

    // Reading 8b: Personal Training in the UK
    reading8b: {
        title: "Personal training in the UK",
        passage: `
            <p><span class="para-tag">[Paragraph A]</span>
                Studies have shown that average weights for British men, women and children have increased considerably over the last 20 years. Recent research predicts that half the UK population will be seriously overweight by the year 2050. Reports of this type often lead to a sudden rush of people deciding to join a gym or buy an exercise bike to use at home.
                <mark class="evidence" id="ev-8b-1"><span class="syn-pair-1" data-q="8b-1">The fitness industry</span> has become very big business and is now <span class="syn-pair-2" data-q="8b-1">worth approximately £3.92 billion</span>.</mark>
                One aspect of this that is growing particularly fast at the moment is the personal training business.
            </p>

            <p><span class="para-tag">[Paragraph B]</span>
                Once only the rich – successful film stars and professional footballers, for example – used personal trainers but now they provide their services for bank clerks, teachers and builders as well.
                <mark class="evidence" id="ev-8b-2"><span class="syn-pair-1" data-q="8b-2">One major leisure company</span> has identified personal training – either for individuals or for small groups of friends – as <span class="syn-pair-2" data-q="8b-2">a key area of future growth</span>.</mark>
                The company understands that people prefer a more tailored and personal programme over a one-size-fits-all approach.
            </p>

            <p><span class="para-tag">[Paragraph C]</span>
                The main reason for this preference is the clients' belief that personalised training will be matched to their individual fitness needs and so will help them achieve the great results they want. But there is another reason as well.
                <mark class="evidence" id="ev-8b-3">Many people feel uncomfortable working out in a gym where everyone else seems so much more athletic. People like this feel much <span class="syn-pair-1" data-q="8b-3">happier exercising in privacy at home</span>.</mark>
                Of course, they could do this without a personal trainer but
                <mark class="evidence" id="ev-8b-4">most people find it <span class="syn-pair-1" data-q="8b-4">motivating to have someone else give them</span> <span class="syn-pair-2" data-q="8b-4">encouragement</span>.</mark>
            </p>

            <p><span class="para-tag">[Paragraph D]</span>
                For all these reasons, then, it is a good time to set up a personal training business and there are only a few requirements for anyone wishing to do so. Firstly, they must get a general qualification in personal training. This can cost them from £300 to several thousand, depending on their previous knowledge.
                <mark class="evidence" id="ev-8b-5">They must also <span class="syn-pair-1" data-q="8b-5">take out insurance</span></mark>
                and they will
                <mark class="evidence" id="ev-8b-6">need transport and <span class="syn-pair-1" data-q="8b-6">access to fitness equipment</span>.</mark>
                They should also identify a specialism to offer their clients.
            </p>

            <p><span class="para-tag">[Paragraph E]</span>
                <mark class="evidence" id="ev-8b-7"><span class="syn-pair-1" data-q="8b-7">Fitness training offers a flexible career</span> as trainers can work on a full-time or a part-time basis.</mark>
                It is possible to fit in training around an existing job so that trainers can see if the business is going to be right for them before they give up a regular salary. Most fitness trainers work on a <span class="syn-pair-2" data-q="8b-7">freelance basis</span>, advertising for their own clients. This is popular because trainers can choose their own hours and can set their own charges.
            </p>

            <p><span class="para-tag">[Paragraph F]</span>
                It can be a satisfying career choice. Nick Wood, a freelance personal trainer in London, says,
                <mark class="evidence" id="ev-8b-8">'For me, nothing is better than helping someone towards their dream. They might want to lose weight, gain muscle or get better after an injury – <span class="syn-pair-1" data-q="8b-8">I just love seeing them reach their goal</span>. This is a big motivator for me.'</mark>
                <mark class="evidence" id="ev-8b-9">Wood says anyone setting up as a trainer should <span class="syn-pair-1" data-q="8b-9">start by teaching keep-fit classes locally</span>. 'I put a lot of energy into every single one I do and, trust me, <span class="syn-pair-2" data-q="8b-9">if people think you are a good motivator in a studio</span>, then it is only a matter of time before they want your advice.'</mark>
            </p>

            <p><span class="para-tag">[Paragraph G]</span>
                <mark class="evidence" id="ev-8b-10">Personal training, then, is not only an interesting career choice, but also an <span class="syn-pair-1" data-q="8b-10">important way of stopping predictions of serious weight problems</span> in the UK from coming true. Both the <span class="syn-pair-2" data-q="8b-10">trainers and the country could benefit</span>.</mark>
            </p>
        `,
        questions: [
            {
                num: 1,
                text: "[ 1 ] in UK valued at just under £4 billion",
                ans: "fitness industry",
                evId: "ev-8b-1",
                explanation: "Paragraph A: 'The fitness industry has become very big business and is now worth approximately £3.92 billion' (just under £4bn)."
            },
            {
                num: 2,
                text: "one major leisure company sees personal training as a key area for [ 2 ]",
                ans: "future growth",
                evId: "ev-8b-2",
                explanation: "Paragraph B states one major leisure company identified personal training as 'a key area of future growth'."
            },
            {
                num: 3,
                text: "clients prefer to work out in [ 3 ] at home rather than at a gym",
                ans: "privacy",
                evId: "ev-8b-3",
                explanation: "Paragraph C notes uncomfortable gym goers feel much happier 'exercising in privacy at home'."
            },
            {
                num: 4,
                text: "a trainer provides clients with [ 4 ]",
                ans: "encouragement",
                evId: "ev-8b-4",
                explanation: "Paragraph C explains people find it motivating to have someone give them 'encouragement'."
            },
            {
                num: 5,
                text: "must take out [ 5 ]",
                ans: "insurance",
                evId: "ev-8b-5",
                explanation: "Paragraph D specifies trainers 'must also take out insurance'."
            },
            {
                num: 6,
                text: "need transport and access to [ 6 ]",
                ans: "equipment",
                evId: "ev-8b-6",
                explanation: "Paragraph D mentions needing transport and access to 'fitness equipment'."
            },
            {
                num: 7,
                text: "What does the writer say about personal training as a career?",
                options: [
                    { letter: "A", text: "It is sensible to work for an agency" },
                    { letter: "B", text: "It provides people with flexibility" },
                    { letter: "C", text: "It requires regular advertising" },
                    { letter: "D", text: "It can be difficult to make enough money" }
                ],
                ans: "B",
                evId: "ev-8b-7",
                explanation: "Paragraph E explains 'Fitness training offers a flexible career' with full-time, part-time, and freelance options."
            },
            {
                num: 8,
                text: "What gives Nick Wood the most satisfaction in his job?",
                options: [
                    { letter: "A", text: "helping clients recover from an injury" },
                    { letter: "B", text: "encouraging people to do their best" },
                    { letter: "C", text: "finding new ways to motivate people" },
                    { letter: "D", text: "watching his customers achieve their aims" }
                ],
                ans: "D",
                evId: "ev-8b-8",
                explanation: "Wood says: 'nothing is better than helping someone towards their dream... I just love seeing them reach their goal' (Option D)."
            },
            {
                num: 9,
                text: "The key advice Nick Wood gives people who want to start a training business is",
                options: [
                    { letter: "A", text: "to become known by teaching groups well" },
                    { letter: "B", text: "to make sure they keep fit themselves" },
                    { letter: "C", text: "to advertise in local gyms and sports clubs" },
                    { letter: "D", text: "to make good use of social media" }
                ],
                ans: "A",
                evId: "ev-8b-9",
                explanation: "Wood advises anyone setting up to 'start by teaching keep-fit classes locally... if people think you are a good motivator in a studio' (Option A)."
            },
            {
                num: 10,
                text: "What is the writer's conclusion about personal training?",
                options: [
                    { letter: "A", text: "It is likely to grow in popularity for a long time" },
                    { letter: "B", text: "It helps both trainer and clients to keep fit" },
                    { letter: "C", text: "It may be good for both the trainer and society" },
                    { letter: "D", text: "It will prevent many health problems in the future" }
                ],
                ans: "C",
                evId: "ev-8b-10",
                explanation: "Paragraph G concludes it is 'not only an interesting career choice [good for trainer], but also an important way of stopping predictions of serious weight problems [good for society]' (Option C)."
            }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph A (UK Fitness Industry Valuation)",
                badge: "Reading 8b Walkthrough • Q1",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Paragraph A]</span> ...Reports of this type often lead to a sudden rush of people deciding to join a gym or buy an exercise bike to use at home. <mark class="evidence" id="ev-wt-8b-1" data-q="wt-8b-1"><span class="syn-pair-1" data-q="wt-8b-1">The fitness industry</span> has become very big business and is now <span class="syn-pair-2" data-q="wt-8b-1">worth approximately £3.92 billion</span>.</mark>`,
                question: `1. <span class="syn-pair-1" data-q="wt-8b-1">[ _______ ]</span> in UK valued at <span class="syn-pair-2" data-q="wt-8b-1">just under £4 billion</span> (NO MORE THAN TWO WORDS)`,
                ans: "fitness industry",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"valued at just under £4 billion"</em> ↔ <em>"worth approximately £3.92 billion"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target subject = <strong>fitness industry</strong> (or <em>The fitness industry</em>).</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph B (Leisure Sector Projection)",
                badge: "Reading 8b Walkthrough • Q2",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Paragraph B]</span> ...<mark class="evidence" id="ev-wt-8b-2" data-q="wt-8b-2"><span class="syn-pair-1" data-q="wt-8b-2">One major leisure company</span> has identified personal training – either for individuals or for small groups of friends – as a key area of <span class="syn-pair-2" data-q="wt-8b-2">future growth</span>.</mark>`,
                question: `2. One major leisure company sees personal training as a <span class="syn-pair-1" data-q="wt-8b-2">key area for</span> <span class="syn-pair-2" data-q="wt-8b-2">[ _______ ]</span>.`,
                ans: "future growth",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"sees personal training as a key area for"</em> ↔ <em>"identified personal training... as a key area of"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Target noun phrase = <strong>future growth</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph C (Domestic Workout Privacy)",
                badge: "Reading 8b Walkthrough • Q3",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Paragraph C]</span> Many people feel uncomfortable working out in a gym where everyone else seems so much more athletic. <mark class="evidence" id="ev-wt-8b-3" data-q="wt-8b-3">People like this feel much <span class="syn-pair-1" data-q="wt-8b-3">happier exercising</span> in <span class="syn-pair-2" data-q="wt-8b-3">privacy</span> <span class="syn-pair-1" data-q="wt-8b-3">at home</span>.</mark>`,
                question: `3. Clients prefer to work out in <span class="syn-pair-2" data-q="wt-8b-3">[ _______ ]</span> <span class="syn-pair-1" data-q="wt-8b-3">at home rather than at a gym</span>.`,
                ans: "privacy",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"prefer to work out at home rather than gym"</em> ↔ <em>"feel much happier exercising at home"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Missing condition noun = <strong>privacy</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph C (Client Motivation Factor)",
                badge: "Reading 8b Walkthrough • Q4",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Paragraph C]</span> Of course, they could do this without a personal trainer but <mark class="evidence" id="ev-wt-8b-4" data-q="wt-8b-4">most people find it <span class="syn-pair-1" data-q="wt-8b-4">motivating to have someone else give them</span> <span class="syn-pair-2" data-q="wt-8b-4">encouragement</span>.</mark>`,
                question: `4. A trainer provides clients with <span class="syn-pair-2" data-q="wt-8b-4">[ _______ ]</span>.`,
                ans: "encouragement",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"trainer provides clients with"</em> ↔ <em>"have someone else give them"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Direct object noun = <strong>encouragement</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph D (Professional Requirements: Cover)",
                badge: "Reading 8b Walkthrough • Q5",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Paragraph D]</span> ...Firstly, they must get a general qualification in personal training. <mark class="evidence" id="ev-wt-8b-5" data-q="wt-8b-5">They <span class="syn-pair-1" data-q="wt-8b-5">must also take out</span> <span class="syn-pair-2" data-q="wt-8b-5">insurance</span></mark> and they will need transport...`,
                question: `5. Requirements: must <span class="syn-pair-1" data-q="wt-8b-5">take out</span> <span class="syn-pair-2" data-q="wt-8b-5">[ _______ ]</span>.`,
                ans: "insurance",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"take out"</em> ↔ <em>"take out"</em> (verbatim collocation).</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Required policy = <strong>insurance</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph D (Fitness Tools Access)",
                badge: "Reading 8b Walkthrough • Q6",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Paragraph D]</span> ...and they will <mark class="evidence" id="ev-wt-8b-6" data-q="wt-8b-6"><span class="syn-pair-1" data-q="wt-8b-6">need transport and access to</span> fitness <span class="syn-pair-2" data-q="wt-8b-6">equipment</span>.</mark> They should also identify a specialism...`,
                question: `6. Need transport and <span class="syn-pair-1" data-q="wt-8b-6">access to</span> <span class="syn-pair-2" data-q="wt-8b-6">[ _______ ]</span>.`,
                ans: "equipment",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"need transport and access to"</em> ↔ <em>"need transport and access to"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> Missing noun = <strong>equipment</strong> (or <em>fitness equipment</em>).</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph E (Career Flexibility)",
                badge: "Reading 8b Walkthrough • Q7",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Paragraph E]</span> <mark class="evidence" id="ev-wt-8b-7" data-q="wt-8b-7"><span class="syn-pair-1" data-q="wt-8b-7">Fitness training offers a flexible career</span> as <span class="syn-pair-2" data-q="wt-8b-7">trainers can work on a full-time or a part-time basis</span>.</mark> It is possible to fit in training around an existing job... Most fitness trainers work on a freelance basis...`,
                question: `7. What does the writer say about <span class="syn-pair-1" data-q="wt-8b-7">personal training as a career</span>? <span class="syn-pair-2" data-q="wt-8b-7">[ 7 ]</span>`,
                ans: "B",
                options: [
                    { letter: "A", text: "It is sensible to work for an agency" },
                    { letter: "B", text: "It provides people with flexibility" },
                    { letter: "C", text: "It requires regular advertising" },
                    { letter: "D", text: "It can be difficult to make enough money" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"personal training as a career"</em> ↔ <em>"Fitness training offers a flexible career"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"work full-time or part-time / fit around job"</em> = <strong>B (It provides people with flexibility)</strong>.</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph F (Nick Wood's Motivation)",
                badge: "Reading 8b Walkthrough • Q8",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Paragraph F]</span> Nick Wood, a freelance personal trainer in London, says, <mark class="evidence" id="ev-wt-8b-8" data-q="wt-8b-8">'For me, <span class="syn-pair-1" data-q="wt-8b-8">nothing is better than helping someone towards their dream</span>... <span class="syn-pair-2" data-q="wt-8b-8">I just love seeing them reach their goal</span>. This is a big motivator for me.'</mark>`,
                question: `8. What gives Nick Wood the <span class="syn-pair-1" data-q="wt-8b-8">most satisfaction in his job</span>? <span class="syn-pair-2" data-q="wt-8b-8">[ 8 ]</span>`,
                ans: "D",
                options: [
                    { letter: "A", text: "helping clients recover from an injury" },
                    { letter: "B", text: "encouraging people to do their best" },
                    { letter: "C", text: "finding new ways to motivate people" },
                    { letter: "D", text: "watching his customers achieve their aims" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"most satisfaction in his job"</em> ↔ <em>"nothing is better / big motivator for me"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"seeing them reach their goal"</em> = <strong>D (watching his customers achieve their aims)</strong>.</div>`
            },
            {
                qNum: 9,
                title: "Walkthrough: Question 9 & Paragraph F (Starting Advice)",
                badge: "Reading 8b Walkthrough • Q9",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Paragraph F]</span> ...<mark class="evidence" id="ev-wt-8b-9" data-q="wt-8b-9">Wood says anyone setting up as a trainer should <span class="syn-pair-1" data-q="wt-8b-9">start by teaching keep-fit classes locally</span>. 'I put a lot of energy into every single one I do and, trust me, <span class="syn-pair-2" data-q="wt-8b-9">if people think you are a good motivator in a studio</span>, then it is only a matter of time before they want your advice.'</mark>`,
                question: `9. The <span class="syn-pair-1" data-q="wt-8b-9">key advice Nick Wood gives</span> people who want to start a training business is <span class="syn-pair-2" data-q="wt-8b-9">[ 9 ]</span>.`,
                ans: "A",
                options: [
                    { letter: "A", text: "to become known by teaching groups well" },
                    { letter: "B", text: "to make sure they keep fit themselves" },
                    { letter: "C", text: "to advertise in local gyms and sports clubs" },
                    { letter: "D", text: "to make good use of social media" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"key advice... to start a training business"</em> ↔ <em>"anyone setting up as a trainer should start by"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"teaching keep-fit classes locally... good motivator in a studio"</em> = <strong>A (to become known by teaching groups well)</strong>.</div>`
            },
            {
                qNum: 10,
                title: "Walkthrough: Question 10 & Paragraph G (Societal and Personal Impact)",
                badge: "Reading 8b Walkthrough • Q10",
                para: "Para G",
                header: "📖 Passage Excerpt (Paragraph G)",
                excerpt: `<span class="para-tag">[Paragraph G]</span> <mark class="evidence" id="ev-wt-8b-10" data-q="wt-8b-10">Personal training, then, is not only an <span class="syn-pair-1" data-q="wt-8b-10">interesting career choice</span>, but also an <span class="syn-pair-2" data-q="wt-8b-10">important way of stopping predictions of serious weight problems</span> in the UK from coming true. <span class="syn-pair-2" data-q="wt-8b-10">Both the trainers and the country could benefit</span>.</mark>`,
                question: `10. What is the writer's <span class="syn-pair-1" data-q="wt-8b-10">conclusion about personal training</span>? <span class="syn-pair-2" data-q="wt-8b-10">[ 10 ]</span>`,
                ans: "C",
                options: [
                    { letter: "A", text: "It is likely to grow in popularity for a long time" },
                    { letter: "B", text: "It helps both trainer and clients to keep fit" },
                    { letter: "C", text: "It may be good for both the trainer and society" },
                    { letter: "D", text: "It will prevent many health problems in the future" }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"writer's conclusion about personal training"</em> ↔ <em>"Personal training, then... Both the trainers and country could benefit"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"trainers and the country [society] could benefit"</em> = <strong>C (It may be good for both the trainer and society)</strong>.</div>`
            }
        ]
    },

    // Academic Lexicon & Collocations Hub Bank
    vocabulary: {
        title: "Module 8: Academic Lexicon & Collocations Hub",
        badge: "Vocabulary 8 • Academic Lexicon",
        subtitle: "Click on any academic term to inspect pronunciation, definitions, and high-scoring IELTS collocations.",
        words: [
            {
                word: "psychology",
                ipa: "/saɪˈkɒl.ə.dʒi/",
                pos: "noun",
                cefr: "B2",
                def: "The scientific study of the human mind and its functions, especially affecting behaviour in a given context.",
                colloc: "sports psychology • psychological technique • psychological barrier",
                example: "Elite athletes employ sports psychology to maintain intense focus during high-stakes finals.",
                context: "Passage 8a: 'Mind games: How footballers use sports psychology.'"
            },
            {
                word: "extraordinary",
                ipa: "/ɪkˈstrɔː.dɪn.ər.i/",
                pos: "adj.",
                cefr: "B2",
                def: "Very unusual, exceptional, or remarkable.",
                colloc: "extraordinary skill • extraordinary performance • extraordinary achievement",
                example: "Top-tier competitors display extraordinary composure when taking decisive penalties.",
                context: "Passage 8a: '...their mental skills in the middle of a competition are usually extraordinary.'"
            },
            {
                word: "self-discipline",
                ipa: "/ˌselfˈdɪs.ə.plɪn/",
                pos: "noun",
                cefr: "B2",
                def: "The ability to control one's feelings and overcome one's weaknesses; the ability to pursue what one thinks is right despite temptations to abandon it.",
                colloc: "strict self-discipline • require self-discipline • demonstrate self-discipline",
                example: "Achieving a personal best demands exceptional self-discipline and relentless morning training.",
                context: "Section 8b: 'It takes a lot of self-discipline to get up at 5 a.m. every morning to train.'"
            },
            {
                word: "peer pressure",
                ipa: "/ˈpɪə ˌpreʃ.ər/",
                pos: "noun",
                cefr: "B2",
                def: "Influence from members of one's peer group to conform to their behaviors, attitudes, or values.",
                colloc: "succumb to peer pressure • negative peer pressure • resist peer pressure",
                example: "Many promising adolescent athletes drop out of organized sports due to negative peer pressure.",
                context: "Section 8b: 'Some teenagers stop doing sport because of peer pressure from their classmates.'"
            },
            {
                word: "stamina",
                ipa: "/ˈstæm.ɪ.nə/",
                pos: "noun",
                cefr: "C1",
                def: "The ability to sustain prolonged physical or mental effort.",
                colloc: "build stamina • physical stamina • require tremendous stamina",
                example: "Long-distance marathon runners must develop immense cardiovascular stamina.",
                context: "Module 8 Review: 'Physical stamina, mental resilience and sporting endurance.'"
            },
            {
                word: "endurance",
                ipa: "/ɪnˈdjʊə.rəns/",
                pos: "noun",
                cefr: "C1",
                def: "The capacity of something to last or to withstand wear and tear, hardship, or stress.",
                colloc: "endurance sport • test of endurance • remarkable endurance",
                example: "Cycling across mountain passes serves as the ultimate test of human muscular endurance.",
                context: "Section 8b: 'Long-distance marathons and tests of physical endurance.'"
            },
            {
                word: "sponsor",
                ipa: "/ˈspɒn.sər/",
                pos: "verb",
                cefr: "B2",
                def: "To provide funds for an activity, person, or event, usually in return for commercial advertising.",
                colloc: "sponsor an event • corporate sponsor • official sponsor",
                example: "Multinational corporations eagerly sponsor global sporting tournaments to boost brand visibility.",
                context: "Section 8b: 'It's wrong that fast food companies sponsor big sporting events.'"
            },
            {
                word: "corporate",
                ipa: "/ˈkɔː.pər.ət/",
                pos: "adj.",
                cefr: "B2",
                def: "Relating to a large company or group, especially in business.",
                colloc: "corporate investment • corporate sponsorship • corporate finance",
                example: "Corporate sponsorship deals have transformed professional football into a multi-billion pound industry.",
                context: "Section 8b: 'Sports and business: Corporate investment in modern athletics.'"
            },
            {
                word: "opponent",
                ipa: "/əˈpəʊ.nənt/",
                pos: "noun",
                cefr: "B2",
                def: "Someone who competes against or fights another in a contest, game, or argument.",
                colloc: "beat an opponent • formidable opponent • outplay an opponent",
                example: "Even against a formidable opponent, maintaining positive self-talk prevents costly blunders.",
                context: "Section 8b Collocations: 'He played well but he couldn't beat his opponent.'"
            },
            {
                word: "tournament",
                ipa: "/ˈtʊə.nə.mənt/",
                pos: "noun",
                cefr: "B2",
                def: "A series of contests between a number of competitors, who compete for an overall championship prize.",
                colloc: "knockout tournament • annual tournament • participate in a tournament",
                example: "Only the finest clubs in Europe qualify for the knockout stages of this prestigious tournament.",
                context: "Section 8b Collocations: 'win or lose a championship, match, race, or tournament.'"
            },
            {
                word: "tailored",
                ipa: "/ˈteɪ.ləd/",
                pos: "adj.",
                cefr: "C1",
                def: "Made, adapted, or suited for a particular person, purpose, or situation.",
                colloc: "tailored programme • tailored advice • tailored approach",
                example: "Personal trainers provide tailored workout regimes that address each client's specific vulnerabilities.",
                context: "Passage 8b: '...people prefer a more tailored and personal programme over a one-size-fits-all approach.'"
            },
            {
                word: "freelance",
                ipa: "/ˈfriː.lɑːns/",
                pos: "adj.",
                cefr: "B2",
                def: "Working for different companies at different times rather than being permanently employed by one company.",
                colloc: "freelance basis • freelance trainer • freelance journalist",
                example: "Operating on a freelance basis allows personal trainers to set their own hours and competitive rates.",
                context: "Passage 8b: 'Most fitness trainers work on a freelance basis, advertising for their own clients.'"
            }
        ]
    }
};

// Global aliases for declarative data-binding
window.reading8a = window.module8Data.reading8a;
window.reading8b = window.module8Data.reading8b;
window.vocabulary = window.module8Data.vocabulary;
window.moduleData = window.module8Data;
