/**
 * =========================================================================
 * Expert IELTS 6 — Module 2: Feelings & Expression Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Charts
 * =========================================================================
 */

window.module2Data = {
    meta: {
        id: "module-02",
        level: "Expert 6",
        band: "Band 6.0 – 7.0",
        moduleNum: "02",
        title: "Feelings & Expression",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 48,
        tags: [
            { text: "Reading 2a/2b", bg: "var(--col-reading)" },
            { text: "Grammar: Relative Clauses & Intensifiers", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Feelings & Parts of Speech", bg: "var(--col-vocab)" },
            { text: "Writing: Task 2 Opinion Essays & Spelling", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "2a", title: "Sharing Epic Moments & Relative Clauses", desc: "YES/NO/NOT GIVEN strategy, defining relative clauses, and family vs. colleagues essay structure." },
            { num: "2b", title: "Clothes & Identity: We Are What We Wear", desc: "Matching Information, extreme adjectives with intensifiers, spelling rules, and appearance essay." },
            { num: "Review", title: "Module 2 Mastery Check", desc: "Self-assessment checklist across all core reading, grammar, vocabulary, and writing skills." }
        ]
    },

    // Reading 2a: Trying to Share Our 'Epic' Moments May Leave Us Feeling Left Out
    reading2a: {
        passage: `
            <h3>TRYING TO SHARE OUR 'EPIC' MOMENTS MAY LEAVE US FEELING LEFT OUT</h3>
            <p><span class="para-tag">Para A</span> <strong>We love to reminisce and tell others about our extraordinary experiences</strong> – that time we climbed Mount Kilimanjaro, got to taste that rare food or ran into a celebrity on the street – but new research suggests this may not be such a wise idea. In fact, the findings, published in the latest edition of a psychology journal, suggest that sharing these extraordinary experiences are not as beneficial as we might think and can actually come at a social cost.</p>
            <p><span class="para-tag">Para B</span> <mark class="evidence" id="ev-2a-1" data-q="2a-1"><span class="syn-pair-1" data-q="2a-1">"Extraordinary experiences are pleasurable in the moment but can leave us socially worse off in the long run,"</span></mark> says psychological scientist and study author Gus Cooney of Harvard University.</p>
            <p><span class="para-tag">Para C</span> "The participants in our study mistakenly thought that having an extraordinary experience would make them the star of the conversation. But they were wrong, because to be extraordinary is to be different than other people, and</p>
            <p><span class="para-tag">Para D</span> <mark class="evidence" id="ev-2a-2" data-q="2a-2"><span class="syn-pair-1" data-q="2a-2">social interaction is grounded in similarities</span></mark>."</p>
            <p><span class="para-tag">Para E</span> Cooney, who conducted the research with co-authors Daniel T. Gilbert of Harvard University and Timothy D. Wilson of the University of Virginia, was interested in exploring the negative consequences of extraordinary experiences based on his own observations with others. He had noticed that we are keen to tell our friends about new or rare experiences, but most successful conversations are about ordinary topics. He therefore wondered "if there might be times when extraordinary experiences have more costs than benefits, and whether people know what those times are."</p>
            <p><span class="para-tag">Para F</span> To find out if he was right, Cooney, Gilbert and Wilson invited sixty-eight participants to their laboratory in groups of four. In each group, one participant was asked to watch a highly rated video of a street magician performing for a crowd, while the other three participants were asked to watch a lower-rated animated video. Participants were told about each video’s rating. After watching the videos, the participants sat around a table and had a five-minute unstructured conversation about them.</p>
            <p><span class="para-tag">Para G</span> The findings were not what participants expected. It seems we should be more careful when choosing and sharing our experiences, because the participants who watched the higher-rated video, the "extraordinary experiencers", reported feeling worse after the group discussion than those who watched the lower-rated video. Even though, before the experiment, all participants thought that the "extraordinary experiencer" would talk more during the post-video discussion, that person actually spoke less and felt excluded from the conversation as a result.</p>
            
            <h3 style="margin-top:24px;">CRITICAL RESPONSE: "FEELING GOOD"</h3>
            <p><span class="para-tag">Crit 1</span> There are two main reasons why you might not agree with Cooney, Gilbert and Wilson’s research conclusions, and <mark class="evidence" id="ev-2a-q1" data-q="2a-q1"><span class="syn-pair-1" data-q="2a-q1">these do not include the fact that sixty-eight people is not a very high number to include in a study</span></mark>.</p>
            <p><span class="para-tag">Crit 2</span> Firstly, <mark class="evidence" id="ev-2a-q2" data-q="2a-q2"><span class="syn-pair-1" data-q="2a-q2">the video of a street magician is not the same as an incredible life experience</span></mark>. The research uses cost-benefit analysis, i.e. the benefit of watching the video minus the cost of not being included socially. But it is unlikely that a street performer, even an amazing one, produces results similar to the feeling of an extraordinary experience. So, when the cost of not being included is taken away from the benefit of watching the video, of course the result will be more negative.</p>
            <p><span class="para-tag">Crit 3</span> Secondly, one wonders why the researchers assume that people who do extraordinary things only spend time with boring people who have no bucket list themselves? In reality, if you explore the Costa Rican rainforest, maybe your friend goes sailing, gets an amazing professional qualification, or watches his child graduate from college. All of these can be considered great topics of conversation. <mark class="evidence" id="ev-2a-q3" data-q="2a-q3"><span class="syn-pair-1" data-q="2a-q3">Of course people will always have lots of everyday experiences to talk about too</span></mark>. After all, when you return from an inspiring trip, you still have to do the laundry and call your parents.</p>
        `,
        questions: [
            { qNum: 1, text: "1. There were too few participants for effective research.", ans: "NO", evId: "ev-2a-q1" },
            { qNum: 2, text: "2. The study reflected what happens in the real world.", ans: "NO", evId: "ev-2a-q2" },
            { qNum: 3, text: "3. We have all experienced situations we can share with friends.", ans: "YES", evId: "ev-2a-q3" },
            { qNum: 4, text: "4. People who go on exciting trips are generally wealthier than those who do not.", ans: "NOT GIVEN", evId: "ev-2a-q3" },
            { qNum: 5, text: "5. To avoid loneliness, people should choose friends who share their interests.", ans: "NO", evId: "ev-2a-q3" },
            { qNum: 6, text: "6. People who do ordinary things are happier than those who do extraordinary things.", ans: "NOT GIVEN", evId: "ev-2a-q3" }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Critical Response (Participant Number)",
                badge: "Reading 2a Walkthrough • Q1",
                para: "Critical Response Para 1",
                header: "📖 Passage Excerpt (Critical Response)",
                excerpt: `<span class="para-tag">[Crit 1]</span> "There are two main reasons why you might not agree with Cooney, Gilbert and Wilson’s research conclusions, and <mark class="evidence" id="ev-wt-2a-1" data-q="wt-2a-1"><span class="syn-pair-1" data-q="wt-2a-1">these do not include the fact that sixty-eight people is not a very high number to include in a study</span></mark>."`,
                question: `1. There were too few participants for effective research: <select class="select-input" data-ans="NO"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NO",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Match:</span> The critic explicitly states that disagreement does <em>not</em> include sample size, contradicting the claim &rarr; <strong>NO</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Critical Response (Real-World Validity)",
                badge: "Reading 2a Walkthrough • Q2",
                para: "Critical Response Para 2",
                header: "📖 Passage Excerpt (Critical Response)",
                excerpt: `<span class="para-tag">[Crit 2]</span> "Firstly, <mark class="evidence" id="ev-wt-2a-2" data-q="wt-2a-2"><span class="syn-pair-1" data-q="wt-2a-2">the video of a street magician is not the same as an incredible life experience</span></mark>... But it is unlikely that a street performer... produces results similar to extraordinary experience."`,
                question: `2. The study reflected what happens in the real world: <select class="select-input" data-ans="NO"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NO",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Match:</span> Watching a magician video in a lab is <em>not equivalent</em> to real-world life moments &rarr; <strong>NO</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Critical Response (Sharing Everyday Experiences)",
                badge: "Reading 2a Walkthrough • Q3",
                para: "Critical Response Para 3",
                header: "📖 Passage Excerpt (Critical Response)",
                excerpt: `<span class="para-tag">[Crit 3]</span> "<mark class="evidence" id="ev-wt-2a-3" data-q="wt-2a-3"><span class="syn-pair-1" data-q="wt-2a-3">Of course people will always have lots of everyday experiences to talk about too.</span> After all, when you return from an inspiring trip, you still have to do the laundry and call your parents.</mark>"`,
                question: `3. We have all experienced situations we can share with friends: <select class="select-input" data-ans="YES"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "YES",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Match:</span> <em>"people will always have lots of everyday experiences to talk about"</em> confirms the statement &rarr; <strong>YES</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Critical Response (Wealth of Travelers)",
                badge: "Reading 2a Walkthrough • Q4",
                para: "Critical Response Para 3",
                header: "📖 Passage Excerpt (Critical Response)",
                excerpt: `<span class="para-tag">[Crit 3]</span> "In reality, if you explore the Costa Rican rainforest, maybe your friend goes sailing, gets an amazing professional qualification, or watches his child graduate from college."`,
                question: `4. People who go on exciting trips are generally wealthier than those who do not: <select class="select-input" data-ans="NOT GIVEN"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box"><span class="syn-tag purple">Absence of Comparison:</span> The text lists activities (rainforest, sailing, graduation) but contains zero comparisons regarding personal wealth &rarr; <strong>NOT GIVEN</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Ambitions vs. Interests",
                badge: "Reading 2a Walkthrough • Q5",
                para: "Critical Response Para 3",
                header: "📖 Passage Excerpt (Critical Response)",
                excerpt: `<span class="para-tag">[Crit 3]</span> "...if you want to do fantastic things and not be lonely, you should choose friends who have <mark class="evidence" id="ev-wt-2a-5" data-q="wt-2a-5"><span class="syn-pair-1" data-q="wt-2a-5">similar ambitions</span></mark>."`,
                question: `5. To avoid loneliness, people should choose friends who share their interests: <select class="select-input" data-ans="NO"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NO",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Lexical Trap:</span> The text specifies choosing friends with similar <em>ambitions</em> (future goals), whereas the question claims general <em>interests</em> (hobbies) &rarr; <strong>NO</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Happiness of Ordinary vs. Extraordinary",
                badge: "Reading 2a Walkthrough • Q6",
                para: "General Text Analysis",
                header: "📖 Passage Excerpt",
                excerpt: `<span class="para-tag">[General]</span> "The research focuses on post-conversation mood dynamics and social costs, but nowhere compares absolute life happiness between ordinary and extraordinary individuals."`,
                question: `6. People who do ordinary things are happier than those who do extraordinary things: <select class="select-input" data-ans="NOT GIVEN"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box"><span class="syn-tag purple">Absence of Data:</span> No overall life satisfaction or happiness ranking is presented &rarr; <strong>NOT GIVEN</strong>.</div>`
            }
        ]
    },

    // Reading 2b: Clothes and Identity: We Are What We Wear
    reading2b: {
        passage: `
            <h3>CLOTHES AND IDENTITY: WE ARE WHAT WE WEAR</h3>
            <p><span class="para-tag">Para A</span> <strong>We all communicate through fashion.</strong> Our clothes, accessories, hairstyles and make-up are all things we use to promote ourselves to others. Fashion is about meanings and symbols that give us immediate visual communication. <mark class="evidence" id="ev-2b-7" data-q="2b-7"><span class="syn-pair-1" data-q="2b-7">But I would suggest it is also about decision-making, performance and fitting into society</span></mark>.</p>
            <p><span class="para-tag">Para B</span> <strong>It is certainly true that fashion is linked to how we view each other.</strong> <mark class="evidence" id="ev-2b-5" data-q="2b-5"><span class="syn-pair-1" data-q="2b-5">We make decisions based on a person’s appearance within a second</span></mark>. Clothing style gives information about a person’s character, sociability and intelligence. <mark class="evidence" id="ev-2b-8" data-q="2b-8">Attractive people generate a <span class="syn-pair-1" data-q="2b-8">"halo effect", which makes us believe everything connected with that person is positive</span></mark>. Consequently, we often think attractive people are more intelligent, healthy and sociable compared with unattractive people. In a recent study supported by a tailoring company, participants were shown images of a man for three seconds. <mark class="evidence" id="ev-2b-4" data-q="2b-4"><span class="syn-pair-2" data-q="2b-4">The first image showed him in a suit made especially for him... People thought the man in the first image was more confident, successful and a higher earner</span></mark> than in the second where he wore a suit from a high-street shop.</p>
            <p><span class="para-tag">Para C</span> <strong>Researchers have also looked at the difference between wanting what we have and having what we want, and they made an interesting discovery.</strong> They found that we get more pleasure from buying objects than we do from owning the objects themselves. We enjoy shopping because it allows us to compare ourselves with others. <mark class="evidence" id="ev-2b-1" data-q="2b-1"><span class="syn-pair-1" data-q="2b-1">Our new Prada shoes may be lovely, but our pleasure in them depends on impressing others</span></mark>. <mark class="evidence" id="ev-2b-9" data-q="2b-9">You’d think that buyer’s guilt would stop us shopping but it doesn’t. In fact, psychologists found that <span class="syn-pair-2" data-q="2b-9">feeling guilty often pushes us to shop more</span></mark>. And when we can’t find what we want, we are motivated to try even harder because our brains release dopamine.</p>
            <p><span class="para-tag">Para D</span> <strong>The shopping experience is not always the same for both genders, however.</strong> <mark class="evidence" id="ev-2b-3" data-q="2b-3"><span class="syn-pair-1" data-q="2b-3">From a young age, women are judged on their appearance, and men on skills and abilities</span></mark>. Fashion can be used to change appearance, self-identity and boost confidence by showing some qualities and hiding others. It is therefore not surprising that shopping is more popular among women. It is beginning to change but in a 2013 paper, researchers found 80 percent of men hate shopping with their partner, and 45 percent try not to go at all costs. Half of couples fight when they shop together, as men claim they get bored, hungry or thirsty. <mark class="evidence" id="ev-2b-10" data-q="2b-10"><span class="syn-pair-2" data-q="2b-10">If we compare this to the past when men hunted alone, fast, and women spent time selecting berries with each other, we can see shopping is the same</span></mark>.</p>
            <p><span class="para-tag">Para E</span> <strong>Clothes and accessories are not only connected with our identity; they also affect how we feel and perform.</strong> When we give meaning to the clothes we wear, we can improve our cognitive abilities, which can influence our social interactions. <mark class="evidence" id="ev-2b-6" data-q="2b-6"><span class="syn-pair-1" data-q="2b-6">Researchers found that simply wearing a lab coat increased performance on attention-related tasks</span></mark>. And, more interestingly, when it was described as a doctor’s coat as opposed to a painter’s, sustained attention increased even more. Psychologists call this effect "enclothed cognition".</p>
            <p><span class="para-tag">Para F</span> <strong>Finally, fashion can allow us to fit into a group or stand out as different.</strong> Groups have a "uniform" that identifies membership (e.g., punk, City worker). Our desire to be part of the group will influence the way we dress, and following the latest trends can give us membership of the "fashionable" group. This is a problem for fashion, as people think it is about looking different. But once an item becomes fashionable, it is no longer different. Uniforms are frequently adopted by fashion and other industry leaders. <mark class="evidence" id="ev-2b-2" data-q="2b-2">For example, <span class="syn-pair-1" data-q="2b-2">fashion magazine editor Anna Wintour only wears printed sleeveless dresses</span>, and famous model Kate Moss is addicted to skinny jeans and ankle boots</mark>. Wearing the same clothes every day means you do not have to worry about what to wear and people immediately recognise you.</p>
        `,
        questions: [
            { qNum: 1, text: "1. People purchase things so they can feel good when other people notice them.", ans: "C", evId: "ev-2b-1" },
            { qNum: 2, text: "2. Some people in the fashion business choose the same type of clothes regularly.", ans: "F", evId: "ev-2b-2" },
            { qNum: 3, text: "3. People form opinions about males and females using different criteria.", ans: "D", evId: "ev-2b-3" },
            { qNum: 4, text: "4. A person wearing specially designed clothes made a more positive impression.", ans: "B", evId: "ev-2b-4" },
            { qNum: 5, text: "5. We use looks to make a judgement about someone’s personality almost immediately.", ans: "B", evId: "ev-2b-5" },
            { qNum: 6, text: "6. The clothes we wear can help us focus better.", ans: "E", evId: "ev-2b-6" }
        ],
        completionQuestions: [
            { qNum: 7, text: "7. The clothes we wear do more than send messages to people.", ans: "YES", evId: "ev-2b-7" },
            { qNum: 8, text: "8. We assume that good-looking people have better personal qualities.", ans: "YES", evId: "ev-2b-8" },
            { qNum: 9, text: "9. When we regret buying something, we stop shopping.", ans: "NO", evId: "ev-2b-9" },
            { qNum: 10, text: "10. The way men and women look for things has changed over the years.", ans: "NO", evId: "ev-2b-10" },
            { qNum: 11, text: "11. Medical workers like to be recognised in their uniforms.", ans: "NOT GIVEN", evId: "ev-2b-6" },
            { qNum: 12, text: "12. Most people choose to wear fashion so they can look like others.", ans: "NO", evId: "ev-2b-2" }
        ],
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph C (Impressing Others)",
                badge: "Reading 2b Walkthrough • Q1",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> "We enjoy shopping because it allows us to compare ourselves with others. <mark class="evidence" id="ev-wt-2b-1" data-q="wt-2b-1"><span class="syn-pair-1" data-q="wt-2b-1">Our new Prada shoes may be lovely, but our pleasure in them depends on impressing others</span></mark>."`,
                question: `1. People purchase things so they can feel good when other people notice them: <select class="select-input" data-ans="C"><option value="">Select paragraph...</option><option value="A">Paragraph A</option><option value="B">Paragraph B</option><option value="C">Paragraph C</option><option value="D">Paragraph D</option><option value="E">Paragraph E</option><option value="F">Paragraph F</option></select>`,
                ans: "C",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"pleasure in them depends on impressing others"</em> &rarr; <strong>Paragraph C</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph F (Industry Leaders Wearing Uniforms)",
                badge: "Reading 2b Walkthrough • Q2",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> "Uniforms are frequently adopted by fashion and other industry leaders. <mark class="evidence" id="ev-wt-2b-2" data-q="wt-2b-2">For example, <span class="syn-pair-1" data-q="wt-2b-2">fashion magazine editor Anna Wintour only wears printed sleeveless dresses</span>, and famous model Kate Moss is addicted to skinny jeans and ankle boots.</mark>"`,
                question: `2. Some people in the fashion business choose the same type of clothes regularly: <select class="select-input" data-ans="F"><option value="">Select paragraph...</option><option value="A">Paragraph A</option><option value="B">Paragraph B</option><option value="C">Paragraph C</option><option value="D">Paragraph D</option><option value="E">Paragraph E</option><option value="F">Paragraph F</option></select>`,
                ans: "F",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"Anna Wintour only wears printed sleeveless dresses / Kate Moss"</em> &rarr; <strong>Paragraph F</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph D (Criteria for Men vs Women)",
                badge: "Reading 2b Walkthrough • Q3",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> "<mark class="evidence" id="ev-wt-2b-3" data-q="wt-2b-3"><span class="syn-pair-1" data-q="wt-2b-3">From a young age, women are judged on their appearance, and men on skills and abilities</span></mark>."`,
                question: `3. People form opinions about males and females using different criteria: <select class="select-input" data-ans="D"><option value="">Select paragraph...</option><option value="A">Paragraph A</option><option value="B">Paragraph B</option><option value="C">Paragraph C</option><option value="D">Paragraph D</option><option value="E">Paragraph E</option><option value="F">Paragraph F</option></select>`,
                ans: "D",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"women on appearance, men on skills and abilities"</em> &rarr; <strong>Paragraph D</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph B (Bespoke Suit Experiment)",
                badge: "Reading 2b Walkthrough • Q4",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> "<mark class="evidence" id="ev-wt-2b-4" data-q="wt-2b-4"><span class="syn-pair-1" data-q="wt-2b-4">The first image showed him in a suit made especially for him... People thought the man in the first image was more confident, successful and a higher earner</span></mark>..."`,
                question: `4. A person wearing specially designed clothes made a more positive impression: <select class="select-input" data-ans="B"><option value="">Select paragraph...</option><option value="A">Paragraph A</option><option value="B">Paragraph B</option><option value="C">Paragraph C</option><option value="D">Paragraph D</option><option value="E">Paragraph E</option><option value="F">Paragraph F</option></select>`,
                ans: "B",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"suit made especially for him &rarr; confident, successful, higher earner"</em> &rarr; <strong>Paragraph B</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph B (Judgements Within a Second)",
                badge: "Reading 2b Walkthrough • Q5",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> "<mark class="evidence" id="ev-wt-2b-5" data-q="wt-2b-5"><span class="syn-pair-1" data-q="wt-2b-5">We make decisions based on a person’s appearance within a second.</span> Clothing style gives information about a person’s character, sociability and intelligence.</mark>"`,
                question: `5. We use looks to make a judgement about someone’s personality almost immediately: <select class="select-input" data-ans="B"><option value="">Select paragraph...</option><option value="A">Paragraph A</option><option value="B">Paragraph B</option><option value="C">Paragraph C</option><option value="D">Paragraph D</option><option value="E">Paragraph E</option><option value="F">Paragraph F</option></select>`,
                ans: "B",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"decisions based on appearance within a second"</em> &rarr; <strong>Paragraph B</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph E (Enclothed Cognition)",
                badge: "Reading 2b Walkthrough • Q6",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> "<mark class="evidence" id="ev-wt-2b-6" data-q="wt-2b-6"><span class="syn-pair-1" data-q="wt-2b-6">Researchers found that simply wearing a lab coat increased performance on attention-related tasks.</span></mark> And... when it was described as a doctor’s coat... sustained attention increased even more."`,
                question: `6. The clothes we wear can help us focus better: <select class="select-input" data-ans="E"><option value="">Select paragraph...</option><option value="A">Paragraph A</option><option value="B">Paragraph B</option><option value="C">Paragraph C</option><option value="D">Paragraph D</option><option value="E">Paragraph E</option><option value="F">Paragraph F</option></select>`,
                ans: "E",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"increased performance on attention-related tasks / sustained attention"</em> &rarr; <strong>Paragraph E</strong>.</div>`
            },
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph A (More than Sending Messages)",
                badge: "Reading 2b Walkthrough • Q7",
                para: "Para A",
                header: "📖 Passage Excerpt (Paragraph A)",
                excerpt: `<span class="para-tag">[Para A]</span> "Fashion is about meanings and symbols that give us immediate visual communication. <mark class="evidence" id="ev-wt-2b-7" data-q="wt-2b-7"><span class="syn-pair-1" data-q="wt-2b-7">But I would suggest it is also about decision-making, performance and fitting into society</span></mark>."`,
                question: `7. The clothes we wear do more than send messages to people: <select class="select-input" data-ans="YES"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "YES",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Match:</span> <em>"also about decision-making, performance and fitting into society"</em> confirms it does more than just visual communication &rarr; <strong>YES</strong>.</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph B (Halo Effect & Better Qualities)",
                badge: "Reading 2b Walkthrough • Q8",
                para: "Para B",
                header: "📖 Passage Excerpt (Paragraph B)",
                excerpt: `<span class="para-tag">[Para B]</span> "<mark class="evidence" id="ev-wt-2b-8" data-q="wt-2b-8">Attractive people generate a <span class="syn-pair-1" data-q="wt-2b-8">"halo effect", which makes us believe everything connected with that person is positive</span>. Consequently, we often think attractive people are more intelligent, healthy and sociable...</mark>"`,
                question: `8. We assume that good-looking people have better personal qualities: <select class="select-input" data-ans="YES"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "YES",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Anchor Match:</span> The "halo effect" leads us to assume good-looking people are more intelligent, healthy, and sociable &rarr; <strong>YES</strong>.</div>`
            },
            {
                qNum: 9,
                title: "Walkthrough: Question 9 & Paragraph C (Buyer's Guilt & Shopping)",
                badge: "Reading 2b Walkthrough • Q9",
                para: "Para C",
                header: "📖 Passage Excerpt (Paragraph C)",
                excerpt: `<span class="para-tag">[Para C]</span> "<mark class="evidence" id="ev-wt-2b-9" data-q="wt-2b-9">You’d think that buyer’s guilt would stop us shopping but it doesn’t. In fact, psychologists found that <span class="syn-pair-1" data-q="wt-2b-9">feeling guilty often pushes us to shop more</span></mark>."`,
                question: `9. When we regret buying something, we stop shopping: <select class="select-input" data-ans="NO"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NO",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Contradiction:</span> Buyer's guilt does <em>not</em> stop us; it actually pushes us to shop <em>more</em> &rarr; <strong>NO</strong>.</div>`
            },
            {
                qNum: 10,
                title: "Walkthrough: Question 10 & Paragraph D (Men vs Women Shopping Habits Over Time)",
                badge: "Reading 2b Walkthrough • Q10",
                para: "Para D",
                header: "📖 Passage Excerpt (Paragraph D)",
                excerpt: `<span class="para-tag">[Para D]</span> "<mark class="evidence" id="ev-wt-2b-10" data-q="wt-2b-10"><span class="syn-pair-1" data-q="wt-2b-10">If we compare this to the past when men hunted alone, fast, and women spent time with each other selecting berries... we can see shopping is the same</span></mark>."`,
                question: `10. The way men and women look for things has changed over the years: <select class="select-input" data-ans="NO"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NO",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Contradiction:</span> The author explicitly concludes that looking for things is <em>"the same"</em> as evolutionary foraging habits &rarr; <strong>NO</strong>.</div>`
            },
            {
                qNum: 11,
                title: "Walkthrough: Question 11 & Paragraph E (Medical Workers' Preferences)",
                badge: "Reading 2b Walkthrough • Q11",
                para: "Para E",
                header: "📖 Passage Excerpt (Paragraph E)",
                excerpt: `<span class="para-tag">[Para E]</span> "<mark class="evidence" id="ev-wt-2b-11" data-q="wt-2b-11">Researchers found that simply wearing a lab coat increased performance on attention-related tasks. And... when it was described as a doctor’s coat as opposed to a painter’s, sustained attention increased even more.</mark>"`,
                question: `11. Medical workers like to be recognised in their uniforms: <select class="select-input" data-ans="NOT GIVEN"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NOT GIVEN",
                explanation: `<div class="syn-key-box"><span class="syn-tag purple">Absence of Opinion:</span> The text studies the cognitive impact of wearing a doctor's coat, but does not state whether actual medical workers <em>like</em> being recognised &rarr; <strong>NOT GIVEN</strong>.</div>`
            },
            {
                qNum: 12,
                title: "Walkthrough: Question 12 & Paragraph F (Looking Like Others vs Standing Out)",
                badge: "Reading 2b Walkthrough • Q12",
                para: "Para F",
                header: "📖 Passage Excerpt (Paragraph F)",
                excerpt: `<span class="para-tag">[Para F]</span> "<mark class="evidence" id="ev-wt-2b-12" data-q="wt-2b-12">Finally, fashion can allow us to <span class="syn-pair-1" data-q="wt-2b-12">fit into a group or stand out as different</span>... This is a problem for fashion, as people think it is about looking different.</mark>"`,
                question: `12. Most people choose to wear fashion so they can look like others: <select class="select-input" data-ans="NO"><option value="">Select...</option><option value="YES">YES</option><option value="NO">NO</option><option value="NOT GIVEN">NOT GIVEN</option></select>`,
                ans: "NO",
                explanation: `<div class="syn-key-box"><span class="syn-tag green">Contradiction:</span> The author notes fashion serves dual conflicting purposes (fitting in vs. standing out as different), and people think it is about looking different &rarr; <strong>NO</strong>.</div>`
            }
        ]
    }
};
