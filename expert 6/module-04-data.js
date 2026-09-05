/**
 * =========================================================================
 * Expert IELTS 6 — Module 4: Science & Beyond Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Essays
 * =========================================================================
 */

window.module4Data = window.module04Data = {
    meta: {
        id: "module-04",
        level: "Expert 6",
        band: "Band 6.0 – 7.0",
        moduleNum: "04",
        title: "Science & Beyond",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 56,
        tags: [
            { text: "Reading 4a/4b", bg: "var(--col-reading)" },
            { text: "Grammar: Probability Matrix", bg: "var(--col-grammar)" },
            { text: "Writing: Academic Paragraph", bg: "var(--col-writing)" },
            { text: "Writing: Task 2 Space Exploration", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "4a", title: "Scientific Awards & Probability Matrix", desc: "Text referencing, Ig Nobel physiological research, Matching Features, future & present probability, and academic paragraph architecture." },
            { num: "4b", title: "The Science of Interstellar & Space Exploration Essay", desc: "Astrophysics reading, time dilation, black holes, Matching Features, Sentence Completion, and Task 2 Discuss Both Views." },
            { num: "Review", title: "Module 4 Mastery Check", desc: "Core examination checklist across scientific referencing, probability hedging, and academic essay cohesion." }
        ]
    },

    // Reading 4a Passage 1: Full Verbatim Text from Textbook p. 56
    reading4aPassage1: {
        title: "RECOGNISING SCIENTIFIC ACHIEVEMENT",
        passage: `
            <h3>RECOGNISING SCIENTIFIC ACHIEVEMENT</h3>
            <p><span class="para-tag">[Para 1]</span> There are countless awards and prizes in science. Many institutes offer their own national awards, and then there are international prizes too. Probably the most famous of all of <mark class="ref-highlight" id="ref-these">these</mark> are the annual Nobel Prizes. <mark class="evidence" id="ev-4a-s1" data-q="4a-s1">Established in <mark class="ref-highlight" id="ref-his">his</mark> will, the awards were the creation of Swedish chemist Alfred Nobel.</mark> <mark class="evidence" id="ev-4a-fields" data-q="4a-fields"><mark class="ref-highlight" id="ref-they">They</mark> have recognised significant achievements in disciplines including chemistry, physics and medicine since 1895.</mark> Each prize can be given to more than one scientist, although <mark class="ref-highlight" id="ref-one">one</mark> cannot be offered to teams of more than three. <mark class="evidence" id="ev-4a-dinner" data-q="4a-dinner">Winners attend a formal dinner</mark> and receive a gold medal, a diploma and a sum of money, <mark class="ref-highlight" id="ref-which">which</mark> could be as much as $1 million.</p>
            <p><span class="para-tag">[Para 2]</span> <mark class="evidence" id="ev-4a-bohr" data-q="5c-1">The UNESCO Niels Bohr Medal was first given 100 years after the birth of quantum physicist Niels Bohr to commemorate his contribution to science. Unlike the Nobel Prize, it is not an annual award. The medal has been given out a dozen times since 1985 to people whose research in physics has or could make a significant impact on the world.</mark> In 2010, three different researchers were given the medal for their outstanding work.</p>
            <p><span class="para-tag">[Para 3]</span> <mark class="evidence" id="ev-4a-copley" data-q="5c-2">The world's oldest surviving prize for science is the UK's Royal Society's Copley Medal. It is not only for physicists. It is given each year to any researchers who have made a significant achievement in an area of science. It was first given in 1731, 170 years before the first Nobel Prize was won.</mark> Today it consists of a silver medal and £5000 but the original prize was the interest on £100 donated by wealthy landowner Sir Godfrey Copley.</p>
            <p><span class="para-tag">[Para 4]</span> <mark class="evidence" id="ev-4a-ignobel" data-q="5c-3">Finally, the Ig Nobel prizes aim to recognise research which first makes us smile and then makes us think. While their research may not change the world, the researchers' unusual experiments offer an insight into how something — often small and sometimes unimportant — works. Every year the prizes are given out at a humorous award ceremony.</mark> Only Sir Andre Geim has won both the Ig Nobel Prize and Nobel Prize. <mark class="evidence" id="ev-4a-geim-frog" data-q="5c-4">He won <mark class="ref-highlight" id="ref-former">the former</mark> for his research into using magnets to raise a frog into the air.</mark> He won <mark class="ref-highlight" id="ref-latter">the latter</mark> with his later work on the discovery of graphene, a form of carbon.</p>
        `
    },

    // Reading 4a Passage 2: Full Verbatim Text from Textbook p. 57
    reading4aPassage2: {
        title: "Scientists awarded Ig Nobel prizes for unusual research",
        passage: `
            <h3>SCIENTISTS AWARDED IG NOBEL PRIZES FOR UNUSUAL RESEARCH</h3>
            <p><span class="para-tag">[Para 1]</span> A scientist who let bees sting him repeatedly on twenty-five different places on his body has been awarded the Ig Nobel Prize for physiology. The prize, which is now in its twenty-fifth year, is given for research that first makes you laugh, and then makes you think. <mark class="evidence" id="ev-tp-4" data-q="tp-4">Michael Smith, of Cornell University, was stung several times a day in different places on his body to find out which parts are the most sensitive. After weeks of research he found that many bee and wasp stings were uncomfortable, and the worst places to be stung were the upper lip and nostril, with the latter being the most painful.</mark></p>
            <p><span class="para-tag">[Para 2]</span> A second researcher who won the physiology prize was <mark class="evidence" id="ev-tp-3" data-q="tp-3">Dr Justin Schmidt, a researcher from the Southwestern Biological Institute. He created the Schmidt Sting Pain Index which rates pain caused by bees, wasps and ants. Schmidt believes he's been stung more than a thousand times by 150 different species. While a honey bee only provides a level-two sting, a bullet ant causes the most pain at level four.</mark></p>
            <p><span class="para-tag">[Para 3]</span> A third prize, given to scientists at Oxford University, did not involve animals. <mark class="evidence" id="ev-tp-1" data-q="tp-1">The scientists learnt that doctors can diagnose appendicitis — a serious medical condition — by the levels of pain the patient feels when travelling over speed bumps. Dr Helen Ashdown of the University of Oxford said: 'It may sound odd, but asking patients whether their pain worsened going over speed bumps on their way to hospital could help doctors in a diagnosis.' Once doctors have used this method to determine what the problem is, they can give the patient the correct medical treatment more quickly.</mark></p>
            <p><span class="para-tag">[Para 4]</span> Finally, perhaps the most unusual prize of the night was the Biology Prize. <mark class="evidence" id="ev-tp-2" data-q="tp-2">It went to scientists from the University of Chile who attached a weighted stick to the back end of a chicken. The stick, which shared similar characteristics to a tail, resulted in the bird walking in a similar manner to a dinosaur.</mark></p>
        `
    },

    // Reading 4a Walkthrough Collection: Socratic Deconstruction for Questions 1-4
    reading4a: {
        walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%206/module-4a-reading-question-walkthrough.html",
        walkthroughTitle: "Module 4a: Ig Nobel Science — Deep Question Walkthrough",
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 3 (Medical Diagnosis via Speed Bumps)",
                badge: "Reading 4a Walkthrough • Q1",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Para 3]</span> <mark class="evidence" id="ev-wt-4a-1" data-q="wt-4a-1">"The scientists learnt that <span class="syn-pair-1" data-q="wt-4a-1">doctors can diagnose appendicitis — a serious medical condition</span> — by the levels of pain the patient feels when travelling over speed bumps. Dr Helen Ashdown of the <span class="syn-pair-2" data-q="wt-4a-1"><span class="vocab-word" data-word="diagnosis" data-def="The identification of an illness from symptoms." data-ipa="/ˌdaɪ.əɡˈnəʊ.sɪs/" data-pos="noun">University of Oxford</span></span> said: 'It may sound odd, but asking patients whether their pain worsened going over speed bumps on their way to hospital could help doctors in a diagnosis.' Once doctors have used this method to determine what the problem is, they can give the patient the correct medical treatment more quickly."</mark>`,
                question: "1. May allow medical practitioners to identify an illness:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "Michael Smith (Cornell University)" },
                    { letter: "B", text: "Justin Schmidt (Southwestern Biological Institute)" },
                    { letter: "C", text: "University of Oxford" },
                    { letter: "D", text: "University of Chile" }
                ],
                ans: "C",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"allow medical practitioners to identify an illness"</em> ↔ <em>"help doctors in a diagnosis of appendicitis"</em>.</div><div class="syn-key-box"><span class="syn-tag blue">Distractor Trap:</span> Smith and Schmidt tested sting discomfort, but neither developed a clinical diagnosis technique! Target institution: <strong>C — University of Oxford</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 4 (Altered Chicken Locomotion)",
                badge: "Reading 4a Walkthrough • Q2",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Para 4]</span> <mark class="evidence" id="ev-wt-4a-2" data-q="wt-4a-2">"Finally, perhaps the most unusual prize of the night was the Biology Prize. It went to scientists from the <span class="syn-pair-2" data-q="wt-4a-2"><span class="vocab-word" data-word="locomotion" data-def="Movement or the ability to move." data-ipa="/ˌləʊ.kəˈməʊ.ʃən/" data-pos="noun">University of Chile</span></span> who <span class="syn-pair-1" data-q="wt-4a-2">attached a weighted stick to the back end of a chicken</span>. The stick, which shared similar characteristics to a tail, resulted in the bird <span class="syn-pair-1" data-q="wt-4a-2">walking in a similar manner to a dinosaur</span>."</mark>`,
                question: "2. Caused an animal to move differently:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "Michael Smith (Cornell University)" },
                    { letter: "B", text: "Justin Schmidt (Southwestern Biological Institute)" },
                    { letter: "C", text: "University of Oxford" },
                    { letter: "D", text: "University of Chile" }
                ],
                ans: "D",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"caused an animal to move differently"</em> ↔ <em>"resulted in the bird walking in a similar manner to a dinosaur"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Distractor Trap:</span> Stings did not change how any animals moved or walked! Target institution: <strong>D — University of Chile</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 2 (Schmidt Sting Pain Index)",
                badge: "Reading 4a Walkthrough • Q3",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Para 2]</span> <mark class="evidence" id="ev-wt-4a-3" data-q="wt-4a-3">"A second researcher who won the physiology prize was <span class="syn-pair-2" data-q="wt-4a-3"><span class="vocab-word" data-word="species" data-def="A group of living organisms." data-ipa="/ˈspiː.ʃiːz/" data-pos="noun">Dr Justin Schmidt</span></span>, a researcher from the Southwestern Biological Institute. He created the Schmidt Sting Pain Index which <span class="syn-pair-1" data-q="wt-4a-3">rates pain caused by bees, wasps and ants</span>. Schmidt believes he's been <span class="syn-pair-1" data-q="wt-4a-3">stung more than a thousand times by 150 different species</span>. While a honey bee only provides a level-two sting, a bullet ant causes the most pain at level four."</mark>`,
                question: "3. Involved being hurt by many different insect types:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "Michael Smith (Cornell University)" },
                    { letter: "B", text: "Justin Schmidt (Southwestern Biological Institute)" },
                    { letter: "C", text: "University of Oxford" },
                    { letter: "D", text: "University of Chile" }
                ],
                ans: "B",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"involved being hurt by many different insect types"</em> ↔ <em>"stung more than a thousand times by 150 different species"</em>.</div><div class="syn-key-box"><span class="syn-tag orange">Critical Distractor:</span> Michael Smith also endured stings, but his study tested 25 body locations, not 150 insect species! Target scientist: <strong>B — Justin Schmidt</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 1 (Pain Linked to Body Location)",
                badge: "Reading 4a Walkthrough • Q4",
                para: "Para 1",
                header: "📖 Passage Excerpt (Paragraph 1)",
                excerpt: `<span class="para-tag">[Para 1]</span> <mark class="evidence" id="ev-wt-4a-4" data-q="wt-4a-4">"<span class="syn-pair-2" data-q="wt-4a-4"><span class="vocab-word" data-word="anatomical" data-def="Relating to bodily structure." data-ipa="/ˌæn.əˈtɒm.ɪ.kəl/" data-pos="adj">Michael Smith</span></span>, of Cornell University, was <span class="syn-pair-1" data-q="wt-4a-4">stung several times a day in different places on his body to find out which parts are the most sensitive</span>. After weeks of research he found that many bee and wasp stings were uncomfortable, and <span class="syn-pair-1" data-q="wt-4a-4">the worst places to be stung were the upper lip and nostril, with the latter being the most painful</span>."</mark>`,
                question: "4. Linked pain levels to location of the pain:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "Michael Smith (Cornell University)" },
                    { letter: "B", text: "Justin Schmidt (Southwestern Biological Institute)" },
                    { letter: "C", text: "University of Oxford" },
                    { letter: "D", text: "University of Chile" }
                ],
                ans: "A",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"location of the pain"</em> ↔ <em>"different places on his body... upper lip and nostril"</em>.</div><div class="syn-key-box"><span class="syn-tag green">Direct Evidence:</span> Michael Smith systematically tested 25 anatomical locations to evaluate sensitivity rankings. Target scientist: <strong>A — Michael Smith</strong>.</div>`
            }
        ]
    },

    // Reading 4b Passage: Full Verbatim Text from Textbook p. 67
    reading4bPassage: {
        title: "The science of INTERSTELLAR: fact or fiction?",
        passage: `
            <h3>THE SCIENCE OF INTERSTELLAR: FACT OR FICTION?</h3>
            <p><span class="para-tag">[Para 1]</span> The film <em>Interstellar</em> is an enjoyable space adventure which sees Matthew McConaughey do a number of incredible things in space in order to save humanity. Director Christopher Nolan wanted to get details right and got advice from <mark class="evidence" id="ev-sc-7" data-q="sc-7">well-known astrophysicist Professor Kip Thorne</mark>. So is the film more science fact than science fiction? Well, not exactly. As Thorne himself says: 'Some of the science is known to be true, some is an educated guess, and some is speculation.' In his new book <em>The Science of Interstellar</em> he describes how much of the film is accurate.</p>
            <p><span class="para-tag">[Para 2]</span> One of the main themes in <em>Interstellar</em> is that characters can age at different speeds depending on where they are in the universe. When two characters travel to a distant planet, they age by only a few hours, but return to find their shipmate is 26 years older. <mark class="evidence" id="ev-mf-1" data-q="mf-1">Could that be true? Well yes, we have evidence of this.</mark> <mark class="evidence" id="ev-mf-6" data-q="mf-6">On Earth the effect is small, adding just a few microseconds a day to the time of space. However, it means that <mark class="evidence" id="ev-sc-8" data-q="sc-8">time is moving ever so slightly more quickly on the 10th floor compared to a basement</mark>.</mark> As a result, GPS satellites circling the Earth need to be changed as they are moving through time slightly more quickly than a person with a Sat Nav on Earth, although only by forty microseconds a day.</p>
            <p><span class="para-tag">[Para 3]</span> The main idea behind <em>Interstellar</em> is that the Earth is dying. Mankind needs to find a new home before the last crop — corn — is entirely used up, or is killed by the same disease that killed all the other crops. <mark class="evidence" id="ev-sc-9" data-q="sc-9">It is true that most people today do not grow their own food and depend on a global system of production.</mark> <mark class="evidence" id="ev-mf-2" data-q="mf-2">It is quite possible that the system could fail but this would be only at a local level. In addition, <mark class="evidence" id="ev-sc-10" data-q="sc-10">deadly diseases usually only attack one group of plants, not multiple groups</mark>, and diseases which affect more than one plant species are generally not that deadly.</mark> Also, the film doesn't talk about the fact that humans eat a lot of other things, like animals and fish.</p>
            <p><span class="para-tag">[Para 4]</span> In <em>Interstellar</em>, the crew travelled large distances in space by jumping through a wormhole. A wormhole is a connection between two areas of space. Essentially, it's a kind of tunnel that allows you to travel quickly from one part of space to another. <mark class="evidence" id="ev-sc-11" data-q="sc-11">The term wormhole originally comes from a wormhole in an apple</mark> and it is the same kind of idea in space. An ant can reach the other side of an apple much faster if it goes through a hole in the centre. <mark class="evidence" id="ev-mf-4" data-q="mf-4">Wormholes can exist in theory but nobody knows how they could stay open long enough for someone to travel through them.</mark> Therefore they will probably never exist naturally in the universe. In <em>Interstellar</em>, the main character believes the wormhole was put there by an advanced group of people. However there is little chance that humans will find a way to control space and time in this way.</p>
            <p><span class="para-tag">[Para 5]</span> Finally, the crew of <em>Interstellar</em>'s Endurance spaceship faced a problem when trying to get to a planet because it is under the control of a huge black hole. A black hole is an area of space that sucks everything around it inside. It's so strong that nothing can escape once it is inside the black hole. To stop the black hole pulling it in, the spaceship needed to travel at super-high speed. In the film, the main character solves this problem by travelling around the black hole and using that speed to get to the planet. <mark class="evidence" id="ev-mf-5" data-q="mf-5">This is not as strange as it sounds as something like this has been done in real life. It did not involve a black hole, but it did involve a space mission travelling around Earth and Mars to get enough speed to chase a comet.</mark> <mark class="evidence" id="ev-mf-3" data-q="mf-3">However, to escape a black hole, you would need a huge amount of speed. You also need to slow down again quickly to land on the planet, <mark class="evidence" id="ev-sc-12" data-q="sc-12">and the ship would almost certainly fall apart</mark>.</mark></p>
        `
    },

    // Reading 4b Walkthrough Collection: Matching Features (Q1-6) & Sentence Completion (Q7-12)
    reading4b: {
        walkthroughUrl: "../reading%20explanations%20-%20walkthrough/expert%206/module-4a-reading-question-walkthrough.html",
        walkthroughTitle: "Module 4b: The Science of Interstellar — Deep Question Walkthrough",
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 2 (Time Dilation & Aging)",
                badge: "Reading 4b Walkthrough • Q1",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Para 2]</span> "When two characters travel to a distant planet, they age by only a few hours, but return to find their shipmate is 26 years older. <mark class="evidence" id="ev-wt-4b-1" data-q="wt-4b-1"><span class="syn-pair-1" data-q="wt-4b-1">Could that be true? Well yes, we have evidence of this.</span> On Earth the effect is small, adding just a few microseconds a day...</mark>"`,
                question: "1. The science has proved to be true:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "A: Travelling through a worm hole" },
                    { letter: "B", text: "B: Avoiding a black hole" },
                    { letter: "C", text: "C: All food crops on Earth dying" },
                    { letter: "D", text: "D: People ageing at different speeds" }
                ],
                ans: "D",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"The science has proved to be true"</em> ↔ <em>"Could that be true? Well yes, we have evidence of this."</em></div><div class="syn-key-box"><span class="syn-tag blue">Direct Association:</span> Relates to time dilation affecting how fast people age: <strong>D — People ageing at different speeds</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 3 (Crop Disease Scale)",
                badge: "Reading 4b Walkthrough • Q2",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Para 3]</span> "Mankind needs to find a new home before the last crop — corn — is entirely used up, or is killed by the same disease that killed all the other crops... <mark class="evidence" id="ev-wt-4b-2" data-q="wt-4b-2"><span class="syn-pair-1" data-q="wt-4b-2">It is quite possible that the system could fail but this would be only at a local level. In addition, deadly diseases usually only attack one group of plants, not multiple groups</span></mark>..."`,
                question: "2. This is unlikely to happen on a large scale:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "A: Travelling through a worm hole" },
                    { letter: "B", text: "B: Avoiding a black hole" },
                    { letter: "C", text: "C: All food crops on Earth dying" },
                    { letter: "D", text: "D: People ageing at different speeds" }
                ],
                ans: "C",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"unlikely to happen on a large scale"</em> ↔ <em>"only at a local level... diseases usually only attack one group of plants"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Direct Association:</span> Refers to agricultural catastrophe: <strong>C — All food crops on Earth dying</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 5 (Method Not Sufficient)",
                badge: "Reading 4b Walkthrough • Q3",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Para 5]</span> "In the film, the main character solves this problem by travelling around the black hole and using that speed to get to the planet... <mark class="evidence" id="ev-wt-4b-3" data-q="wt-4b-3"><span class="syn-pair-1" data-q="wt-4b-3">However, to escape a black hole, you would need a huge amount of speed. You also need to slow down again quickly to land on the planet, and the ship would almost certainly fall apart.</span></mark>"`,
                question: "3. The method used in the film was not sufficient:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "A: Travelling through a worm hole" },
                    { letter: "B", text: "B: Avoiding a black hole" },
                    { letter: "C", text: "C: All food crops on Earth dying" },
                    { letter: "D", text: "D: People ageing at different speeds" }
                ],
                ans: "B",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"method used... was not sufficient"</em> ↔ <em>"you would need a huge amount of speed... and the ship would almost certainly fall apart"</em>.</div><div class="syn-key-box"><span class="syn-tag orange">Direct Association:</span> The sling-shot maneuver around the singularity: <strong>B — Avoiding a black hole</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 4 (Wormhole Practicality)",
                badge: "Reading 4b Walkthrough • Q4",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Para 4]</span> "A wormhole is a connection between two areas of space. Essentially, it's a kind of tunnel that allows you to travel quickly from one part of space to another... <mark class="evidence" id="ev-wt-4b-4" data-q="wt-4b-4"><span class="syn-pair-1" data-q="wt-4b-4">Wormholes can exist in theory but nobody knows how they could stay open long enough for someone to travel through them.</span></mark>"`,
                question: "4. Scientists are unclear about how this could work in practice:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "A: Travelling through a worm hole" },
                    { letter: "B", text: "B: Avoiding a black hole" },
                    { letter: "C", text: "C: All food crops on Earth dying" },
                    { letter: "D", text: "D: People ageing at different speeds" }
                ],
                ans: "A",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"unclear about how this could work in practice"</em> ↔ <em>"exist in theory but nobody knows how they could stay open long enough"</em>.</div><div class="syn-key-box"><span class="syn-tag blue">Direct Association:</span> Interstellar hyperspace transit: <strong>A — Travelling through a worm hole</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph 5 (Gravity Assist Precedent)",
                badge: "Reading 4b Walkthrough • Q5",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Para 5]</span> "<mark class="evidence" id="ev-wt-4b-5" data-q="wt-4b-5"><span class="syn-pair-1" data-q="wt-4b-5">This is not as strange as it sounds as something like this has been done in real life. It did not involve a black hole, but it did involve a space mission travelling around Earth and Mars to get enough speed to chase a comet.</span></mark>"`,
                question: "5. Something similar worked in reality:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "A: Travelling through a worm hole" },
                    { letter: "B", text: "B: Avoiding a black hole" },
                    { letter: "C", text: "C: All food crops on Earth dying" },
                    { letter: "D", text: "D: People ageing at different speeds" }
                ],
                ans: "B",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"Something similar worked in reality"</em> ↔ <em>"something like this has been done in real life... space mission travelling around Earth and Mars"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Direct Association:</span> The planetary gravitational slingshot: <strong>B — Avoiding a black hole</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph 2 (Micro-level Terrestrial Effect)",
                badge: "Reading 4b Walkthrough • Q6",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Para 2]</span> "<mark class="evidence" id="ev-wt-4b-6" data-q="wt-4b-6"><span class="syn-pair-1" data-q="wt-4b-6">On Earth the effect is small, adding just a few microseconds a day to the time of space. However, it means that time is moving ever so slightly more quickly on the 10th floor compared to a basement.</span></mark>"`,
                question: "6. It affects us on Earth but in a very small way:",
                type: "multiple-choice",
                options: [
                    { letter: "A", text: "A: Travelling through a worm hole" },
                    { letter: "B", text: "B: Avoiding a black hole" },
                    { letter: "C", text: "C: All food crops on Earth dying" },
                    { letter: "D", text: "D: People ageing at different speeds" }
                ],
                ans: "D",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"affects us on Earth but in a very small way"</em> ↔ <em>"On Earth the effect is small, adding just a few microseconds a day"</em>.</div><div class="syn-key-box"><span class="syn-tag green">Direct Association:</span> Terrestrial gravitational time dilation: <strong>D — People ageing at different speeds</strong>.</div>`
            }
        ],

        // Sentence Completion Walkthroughs (Questions 7-12)
        completionWalkthroughs: [
            {
                qNum: 7,
                title: "Walkthrough: Question 7 & Paragraph 1 (Astrophysicist Kip Thorne)",
                badge: "Reading 4b Walkthrough • Q7",
                para: "Para 1",
                header: "📖 Passage Excerpt (Paragraph 1)",
                excerpt: `<span class="para-tag">[Para 1]</span> "Director Christopher Nolan wanted to get details right and got advice from <mark class="evidence" id="ev-wt-sc-7" data-q="wt-sc-7"><span class="syn-pair-1" data-q="wt-sc-7">well-known <span class="vocab-word" data-word="astrophysicist" data-def="An expert in the branch of astronomy concerned with the physical nature of stars and other celestial bodies." data-ipa="/ˌæs.trəʊˈfɪz.ɪ.sɪst/" data-pos="noun">astrophysicist</span> Professor Kip Thorne</span></mark>."`,
                question: "7. To ensure the science was correct, the film-maker asked a famous [ 7 ] for help:",
                type: "sentence-completion",
                ans: "astrophysicist",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"asked a famous [ 7 ] for help"</em> ↔ <em>"got advice from well-known astrophysicist Professor Kip Thorne"</em>.</div><div class="syn-key-box"><span class="syn-tag blue">Exact Match:</span> <strong>astrophysicist</strong> (ONE WORD ONLY).</div>`
            },
            {
                qNum: 8,
                title: "Walkthrough: Question 8 & Paragraph 2 (Time Flow on Higher Floors)",
                badge: "Reading 4b Walkthrough • Q8",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Para 2]</span> "However, it means that <mark class="evidence" id="ev-wt-sc-8" data-q="wt-sc-8"><span class="syn-pair-1" data-q="wt-sc-8"><span class="vocab-word" data-word="time" data-def="The indefinite continued progress of existence and events in the past, present, and future." data-ipa="/taɪm/" data-pos="noun">time</span> is moving ever so slightly more quickly on the 10th floor compared to a basement</span></mark>."`,
                question: "8. [ 8 ] is a little faster for people on the top of tall buildings:",
                type: "sentence-completion",
                ans: "time|Time",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"[ 8 ] is a little faster for people on the top of tall buildings"</em> ↔ <em>"time is moving ever so slightly more quickly on the 10th floor"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Exact Match:</span> <strong>time</strong> (or <strong>Time</strong>).</div>`
            },
            {
                qNum: 9,
                title: "Walkthrough: Question 9 & Paragraph 3 (Growing Food Privately)",
                badge: "Reading 4b Walkthrough • Q9",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Para 3]</span> "It is true that <mark class="evidence" id="ev-wt-sc-9" data-q="wt-sc-9"><span class="syn-pair-1" data-q="wt-sc-9">most people today do not <span class="vocab-word" data-word="grow" data-def="Cultivate plants." data-ipa="/ɡrəʊ/" data-pos="verb">grow their own</span> food</span> and depend on a global system of production</mark>."`,
                question: "9. These days, few people [ 9 ] food:",
                type: "sentence-completion",
                ans: "grow their own",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"few people [ 9 ] food"</em> ↔ <em>"most people today do not grow their own food"</em>.</div><div class="syn-key-box"><span class="syn-tag orange">Grammar Match:</span> Fits grammatical slot after modal/auxiliary: <strong>grow their own</strong>.</div>`
            },
            {
                qNum: 10,
                title: "Walkthrough: Question 10 & Paragraph 3 (Attacking Multiple Crop Types)",
                badge: "Reading 4b Walkthrough • Q10",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Para 3]</span> "In addition, <mark class="evidence" id="ev-wt-sc-10" data-q="wt-sc-10"><span class="syn-pair-1" data-q="wt-sc-10">deadly diseases usually only attack one group of plants, not <span class="vocab-word" data-word="multiple" data-def="Having or involving several parts, elements, or members." data-ipa="/ˈmʌl.tɪ.pəl/" data-pos="adj">multiple</span> groups</span></mark>, and diseases which affect more than one plant species are generally not that deadly."`,
                question: "10. Dangerous diseases are unlikely to attack [ 10 ] crop varieties:",
                type: "sentence-completion",
                ans: "multiple",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"unlikely to attack [ 10 ] crop varieties"</em> ↔ <em>"deadly diseases usually only attack one group of plants, not multiple groups"</em>.</div><div class="syn-key-box"><span class="syn-tag blue">Exact Match:</span> <strong>multiple</strong> (ONE WORD ONLY).</div>`
            },
            {
                qNum: 11,
                title: "Walkthrough: Question 11 & Paragraph 4 (Fruit Origin of the Term)",
                badge: "Reading 4b Walkthrough • Q11",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Para 4]</span> "<mark class="evidence" id="ev-wt-sc-11" data-q="wt-sc-11"><span class="syn-pair-1" data-q="wt-sc-11">The term <span class="vocab-word" data-word="wormhole" data-def="A hypothetical connection between widely separated regions of space-time." data-ipa="/ˈwɜːm.həʊl/" data-pos="noun">wormhole</span> originally comes from a wormhole in an apple</span></mark> and it is the same kind of idea in space. An ant can reach the other side of an apple much faster if it goes through a hole in the centre."`,
                question: "11. An insect's journey through a piece of fruit gave the [ 11 ] its name:",
                type: "sentence-completion",
                ans: "wormhole",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"journey through a piece of fruit gave the [ 11 ] its name"</em> ↔ <em>"The term wormhole originally comes from a wormhole in an apple"</em>.</div><div class="syn-key-box"><span class="syn-tag green">Exact Match:</span> <strong>wormhole</strong> (ONE WORD ONLY).</div>`
            },
            {
                qNum: 12,
                title: "Walkthrough: Question 12 & Paragraph 5 (Structural Destruction)",
                badge: "Reading 4b Walkthrough • Q12",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Para 5]</span> "However, to escape a black hole, you would need a huge amount of speed. You also need to slow down again quickly to land on the planet, <mark class="evidence" id="ev-wt-sc-12" data-q="wt-sc-12"><span class="syn-pair-1" data-q="wt-sc-12">and the ship would almost certainly <span class="vocab-word" data-word="fall apart" data-def="Break into pieces." data-ipa="/fɔːl əˈpɑːt/" data-pos="verb">fall apart</span></span></mark>."`,
                question: "12. If a space craft went fast enough to avoid a black hole, it would most likely [ 12 ]:",
                type: "sentence-completion",
                ans: "fall apart",
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Paraphrase:</span> <em>"most likely [ 12 ]"</em> ↔ <em>"would almost certainly fall apart"</em>.</div><div class="syn-key-box"><span class="syn-tag red">Exact Match:</span> <strong>fall apart</strong> (TWO WORDS).</div>`
            }
        ]
    }
};
