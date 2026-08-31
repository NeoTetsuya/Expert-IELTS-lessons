/**
 * =========================================================================
 * Expert IELTS 5 — Module 4: Well-being Master Lesson Dataset
 * Single Source of Truth for Curriculum Data, Passages, Exercises & Walkthroughs
 * =========================================================================
 */

window.module4Data = {
    meta: {
        id: "module-04",
        level: "Expert 5",
        band: "Band 5.0 – 6.0",
        moduleNum: "04",
        title: "Well-being",
        subtitle: "IELTS Academic Preparation Masterclass",
        slidesCount: 30,
        tags: [
            { text: "Reading 4a/4b", bg: "var(--col-reading)" },
            { text: "Grammar: Past Simple & Continuous", bg: "var(--col-grammar)" },
            { text: "Vocabulary: Nature & Health", bg: "var(--col-vocab)" },
            { text: "Writing: Task 2 Introductions & Topic Sentences", bg: "var(--col-writing)" },
            { text: "Mastery Review", bg: "var(--col-review)" }
        ],
        roadmap: [
            { num: "4a", title: "Health & Fitness Trackers", desc: "Understanding sentence connections, past tenses matrix, and Task 2 introduction writing & paraphrasing." },
            { num: "4b", title: "Remedies from Nature", desc: "Natural world vocabulary, matching sentence endings test strategy, topic sentences, and Task 2 advantages vs disadvantages essay." },
            { num: "Review", title: "Module 4 Mastery Check", desc: "Core examination checklist across sentence endings, past tenses, and Task 2 essay structure." }
        ]
    },

    // Reading 4a: Monitoring Fitness (Full Exact Passage from m4 content.md)
    reading4a: {
        passage: `
            <h3>MONITORING FITNESS</h3>
            <p class="reading-lead"><em>Do fitness apps really work? Are they helpful? Or do they drown out the conversation people should be having with their bodies?</em></p>
            <p><span class="para-tag">Para 1</span> Technology has become an important aspect of life for people who want to get and stay fit. They use apps on their smartphone or other devices, for example, to count the number of steps they take every day, to measure their heart rate, to record their sleep patterns and to work out how many calories they consume.</p>
            <p><span class="para-tag">Para 2</span> <mark class="evidence" id="ev-4a-1" data-q="4a-1"><span class="syn-pair-1" data-q="4a-1">Sports scientists recognise that deciding to use a fitness tracker or app is good</span> because it means <span class="syn-pair-2" data-q="4a-1">a person is curious about health and keen to improve their habits</span></mark>. If the attractive design of a device or app encourages an interest in keeping fit, its impact is clearly positive. After all, many people have reported that fitness devices have motivated them to get off the sofa and go for a walk after dinner. Unfortunately, however, many of those after-dinner walkers have added that <mark class="evidence" id="ev-4a-2" data-q="4a-2"><span class="syn-pair-1" data-q="4a-2">when their devices broke and they no longer knew how many steps they had taken</span>, <span class="syn-pair-2" data-q="4a-2">there seemed little point in heading out for that walk</span></mark>. Consequently, sports scientists agree that people need to be aware of the fact that apps alone are not enough.</p>
            <p><span class="para-tag">Para 3</span> One of the problems with fitness trackers is that they usually measure very limited pieces of information — steps taken, movements when asleep or heart rate, for example — and this does not give a clear overall picture of a person's health. They may record that someone worked out for two hours on a rowing machine, but not that they then spent the rest of the day eating pizza and watching DVDs. In other words, <mark class="evidence" id="ev-4a-3" data-q="4a-3"><span class="syn-pair-1" data-q="4a-3">fitness apps can help people to deceive themselves</span> about <span class="syn-pair-2" data-q="4a-3">how healthy their lifestyle is</span></mark>.</p>
            <p><span class="para-tag">Para 4</span> <mark class="evidence" id="ev-4a-4" data-q="4a-4"><span class="syn-pair-1" data-q="4a-4">What sports psychologists recommend users of electronic fitness devices to do</span> is <span class="syn-pair-2" data-q="4a-4">raise their awareness of how their body looks</span></mark>. No one actually needs an app to tell them that they have had a bad night's sleep; the bags under their eyes can do that just as well. And <mark class="evidence" id="ev-4a-5" data-q="4a-5"><span class="syn-pair-1" data-q="4a-5">if people want to lose weight</span>, they may find it <span class="syn-pair-2" data-q="4a-5">more effective to take a regular look at themselves in the mirror</span></mark> rather than try to motivate themselves to diet by checking everything they eat against a calorie counting app. Unfortunately, tracking the calories is also ineffective because the body metabolises calories from sugar differently than those from fat.</p>
            <p><span class="para-tag">Para 5</span> Keeping a fitness diary is also useful. In it, people should record what they ate and what their mood was two or three hours later. Tracking calories in a food app after eating a large tub of ice cream is not going to solve anyone's problems. Reflecting on how bad they felt after eating it will. Keeping a fitness diary helps people to eat well and exercise not for the sake of meeting the app's artificial targets, but because exercise makes everyone feel, look and be better.</p>
        `,
        boxOptions: [
            { letter: "A", text: "they can give an unrealistic impression of a person's level of fitness." },
            { letter: "B", text: "people become very attached to their electronic devices." },
            { letter: "C", text: "anyone interested in becoming fitter should pay more attention to their appearance." },
            { letter: "D", text: "it shows that the user wishes to develop better fitness practices." },
            { letter: "E", text: "someone wants to lose weight." },
            { letter: "F", text: "they lose the motivation to be active." },
            { letter: "G", text: "they won't help you achieve your goals." }
        ],
        summaryBox: `
            <div class="card" style="background:#ffffff; border:1.5px solid #cbd5e1; border-left:6px solid var(--col-reading); padding:18px 22px; margin-bottom:14px; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div style="font-size:17px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em; color:var(--col-reading); margin-bottom:12px;">📦 Sentence Endings (A–G)</div>
                <div style="display:flex; flex-direction:column; gap:10px; font-size:18px; line-height:1.6; color:#0f172a;">
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">A.</strong> they can give an unrealistic impression of a person's level of fitness.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">B.</strong> people become very attached to their electronic devices.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">C.</strong> anyone interested in becoming fitter should pay more attention to their appearance.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">D.</strong> it shows that the user wishes to develop better fitness practices.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">E.</strong> someone wants to lose weight.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">F.</strong> they lose the motivation to be active.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">G.</strong> they won't help you achieve your goals.</div>
                </div>
            </div>
            <div class="card" style="padding:18px 22px; font-size:18.5px; line-height:2.1; color:#0f172a; background:#ffffff; border:1px solid #cbd5e1; border-radius:10px;">
                <div style="font-size:16.5px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:10px;">📋 Questions 1–5: Complete the Sentences</div>
                1. Sports scientists approve of the decision to use fitness apps because <strong>1.</strong> <select class="select-input" data-ans="D" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option></select> <button class="syn-btn" data-ev="ev-4a-1" onclick="deckEngine.toggleSynonymExplanation('4a-1', 'ev-4a-1')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                2. People have reported that when their fitness apps stop working <strong>2.</strong> <select class="select-input" data-ans="F" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option></select> <button class="syn-btn" data-ev="ev-4a-2" onclick="deckEngine.toggleSynonymExplanation('4a-2', 'ev-4a-2')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                3. It is not sensible to rely too much on fitness apps because <strong>3.</strong> <select class="select-input" data-ans="A" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option></select> <button class="syn-btn" data-ev="ev-4a-3" onclick="deckEngine.toggleSynonymExplanation('4a-3', 'ev-4a-3')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                4. Sports psychologists recommend that <strong>4.</strong> <select class="select-input" data-ans="C" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option></select> <button class="syn-btn" data-ev="ev-4a-4" onclick="deckEngine.toggleSynonymExplanation('4a-4', 'ev-4a-4')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                5. Writing a fitness diary is helpful when <strong>5.</strong> <select class="select-input" data-ans="E" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option></select> <button class="syn-btn" data-ev="ev-4a-5" onclick="deckEngine.toggleSynonymExplanation('4a-5', 'ev-4a-5')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button>
            </div>
        `,
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 2 (Decision to Use Apps)",
                badge: "Reading 4a Walkthrough • Q1",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Para 2]</span> <mark class="evidence" id="ev-wt-4a-1" data-q="wt-4a-1">"<span class="syn-pair-1" data-q="wt-4a-1">Sports scientists recognise that deciding to use a fitness tracker or app is good</span> because it means <span class="syn-pair-2" data-q="wt-4a-1">a person is curious about health and keen to improve their habits</span>."</mark>`,
                question: `1. Sports scientists approve of the decision to use fitness apps because <span class="syn-pair-2" data-q="wt-4a-1">[ 1 ]</span>.`,
                ans: "D",
                boxOptions: [
                    { letter: "A", text: "they can give an unrealistic impression..." }, { letter: "B", text: "people become very attached..." },
                    { letter: "C", text: "anyone interested should pay more attention..." }, { letter: "D", text: "it shows that the user wishes to develop better fitness practices." },
                    { letter: "E", text: "someone wants to lose weight." }, { letter: "F", text: "they lose the motivation to be active." },
                    { letter: "G", text: "they won't help you achieve your goals." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"approve of the decision"</em> ↔ <em>"recognise that deciding to use... is good"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"keen to improve their habits"</em> = <strong>D (wishes to develop better fitness practices)</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 2 (Broken Devices & Motivation)",
                badge: "Reading 4a Walkthrough • Q2",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Para 2]</span> <mark class="evidence" id="ev-wt-4a-2" data-q="wt-4a-2">"...many of those after-dinner walkers have added that <span class="syn-pair-1" data-q="wt-4a-2">when their devices broke and they no longer knew how many steps they had taken</span>, <span class="syn-pair-2" data-q="wt-4a-2">there seemed little point in heading out for that walk</span>."</mark>`,
                question: `2. People have reported that when their fitness apps stop working <span class="syn-pair-2" data-q="wt-4a-2">[ 2 ]</span>.`,
                ans: "F",
                boxOptions: [
                    { letter: "A", text: "they can give an unrealistic impression..." }, { letter: "B", text: "people become very attached..." },
                    { letter: "C", text: "anyone interested should pay more attention..." }, { letter: "D", text: "it shows that the user wishes to develop better..." },
                    { letter: "E", text: "someone wants to lose weight." }, { letter: "F", text: "they lose the motivation to be active." },
                    { letter: "G", text: "they won't help you achieve your goals." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"when their fitness apps stop working"</em> ↔ <em>"when their devices broke"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Consequence Key:</span> <em>"little point in heading out for that walk"</em> = <strong>F (they lose the motivation to be active)</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 3 (Unrealistic Picture of Health)",
                badge: "Reading 4a Walkthrough • Q3",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Para 3]</span> <mark class="evidence" id="ev-wt-4a-3" data-q="wt-4a-3">"They may record that someone worked out for two hours... but not that they then spent the rest of the day eating pizza... <span class="syn-pair-1" data-q="wt-4a-3">fitness apps can help people to deceive themselves</span> about <span class="syn-pair-2" data-q="wt-4a-3">how healthy their lifestyle is</span>."</mark>`,
                question: `3. It is not sensible to rely too much on fitness apps because <span class="syn-pair-1" data-q="wt-4a-3">[ 3 ]</span>.`,
                ans: "A",
                boxOptions: [
                    { letter: "A", text: "they can give an unrealistic impression of a person's level of fitness." }, { letter: "B", text: "people become very attached..." },
                    { letter: "C", text: "anyone interested should pay more attention..." }, { letter: "D", text: "it shows that the user wishes..." },
                    { letter: "E", text: "someone wants to lose weight." }, { letter: "F", text: "they lose the motivation to be active." },
                    { letter: "G", text: "they won't help you achieve your goals." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"not sensible to rely too much"</em> ↔ <em>"deceive themselves"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"deceive themselves about how healthy their lifestyle is"</em> = <strong>A (give an unrealistic impression of a person's level of fitness)</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 4 (Psychologist Recommendation)",
                badge: "Reading 4a Walkthrough • Q4",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Para 4]</span> <mark class="evidence" id="ev-wt-4a-4" data-q="wt-4a-4">"<span class="syn-pair-1" data-q="wt-4a-4">What sports psychologists recommend users of electronic fitness devices to do</span> is <span class="syn-pair-2" data-q="wt-4a-4">raise their awareness of how their body looks</span>."</mark>`,
                question: `4. Sports psychologists recommend that <span class="syn-pair-2" data-q="wt-4a-4">[ 4 ]</span>.`,
                ans: "C",
                boxOptions: [
                    { letter: "A", text: "they can give an unrealistic impression..." }, { letter: "B", text: "people become very attached..." },
                    { letter: "C", text: "anyone interested in becoming fitter should pay more attention to their appearance." }, { letter: "D", text: "it shows that the user..." },
                    { letter: "E", text: "someone wants to lose weight." }, { letter: "F", text: "they lose the motivation..." },
                    { letter: "G", text: "they won't help you achieve your goals." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"sports psychologists recommend"</em> matches verbatim.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"raise awareness of how their body looks"</em> = <strong>C (pay more attention to their appearance)</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph 4 (Losing Weight & Diary)",
                badge: "Reading 4a Walkthrough • Q5",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4 & 5)",
                excerpt: `<span class="para-tag">[Para 4]</span> <mark class="evidence" id="ev-wt-4a-5" data-q="wt-4a-5">"And <span class="syn-pair-1" data-q="wt-4a-5">if people want to lose weight</span>, they may find it <span class="syn-pair-2" data-q="wt-4a-5">more effective to take a regular look at themselves in the mirror... Keeping a fitness diary helps people to eat well</span>..."</mark>`,
                question: `5. Writing a fitness diary is helpful when <span class="syn-pair-1" data-q="wt-4a-5">[ 5 ]</span>.`,
                ans: "E",
                boxOptions: [
                    { letter: "A", text: "they can give an unrealistic impression..." }, { letter: "B", text: "people become very attached..." },
                    { letter: "C", text: "anyone interested should pay more attention..." }, { letter: "D", text: "it shows that the user..." },
                    { letter: "E", text: "someone wants to lose weight." }, { letter: "F", text: "they lose the motivation..." },
                    { letter: "G", text: "they won't help you achieve your goals." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"writing a fitness diary is helpful"</em> ↔ <em>"keeping a fitness diary helps"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Condition Key:</span> Context connects with <strong>E (someone wants to lose weight)</strong>.</div>`
            }
        ]
    },

    // Reading 4b: Remedies from Nature (Full Exact Passage from m4 content.md)
    reading4b: {
        passage: `
            <h3>REMEDIES FROM NATURE</h3>
            <p class="reading-lead"><em>In all the discussions about saving the world's biodiversity from extinction, people often forget one point: the world's species provide people with a large number of life-saving medicines.</em></p>
            <p><span class="para-tag">Para 1</span> Animal and plant species have given people important medicines such as quinine and aspirin, as well as many cancer and HIV-fighting drugs. <mark class="evidence" id="ev-4b-1" data-q="4b-1"><span class="syn-pair-1" data-q="4b-1">People have used plants and animals as sources of medicine for thousands of years</span>. For example, <span class="syn-pair-2" data-q="4b-1">medicinal plants that people used over 60,000 years ago were found</span> in an Iraqi cave site</mark>. A fur strap found on the arm of a 5,000 year-old Ice Man from the Alps contained a type of fungus which is able to kill bacteria.</p>
            <p><span class="para-tag">Para 2</span> <mark class="evidence" id="ev-4b-2" data-q="4b-2"><span class="syn-pair-1" data-q="4b-2">Most people are amazed to discover that our dependence on nature for health has not reduced</span>. Over the past quarter century, <span class="syn-pair-2" data-q="4b-2">more than half of all the products that drug companies have developed actually use, or copy, substances from the natural world</span></mark>. Moreover, the World Health Organization estimates that in many developing countries, 80 percent of the population relies on traditional medicines from natural sources.</p>
            <p><span class="para-tag">Para 3</span> <mark class="evidence" id="ev-4b-3" data-q="4b-3">However, <span class="syn-pair-1" data-q="4b-3">scientists generally believe that researchers have fully examined less than one percent of all species</span> in order to discover their possible uses in medical treatments. <span class="syn-pair-2" data-q="4b-3">They believe that nature still holds many valuable cures for research to discover</span></mark>. In particular, they point to the importance of tropical rainforests as a potential source of new medicines. Although rainforests cover only six percent of the earth's land surface, they contain over half of its biodiversity.</p>
            <p><span class="para-tag">Para 4</span> Unfortunately, the ecosystems that provide some of the world's most important drugs, such as rainforests and coral reefs, are also the ecosystems that are most at risk today. There are concerns that warming temperatures mean that few coral reefs will remain by the end of the century. Meanwhile, <mark class="evidence" id="ev-4b-4" data-q="4b-4"><span class="syn-pair-1" data-q="4b-4">agriculture and various major development projects are making the world's rainforests vanish</span> at an alarming rate... <span class="syn-pair-2" data-q="4b-4">The inevitable result is that many species with important medicinal powers will become extinct</span></mark>.</p>
            <p><span class="para-tag">Para 5</span> Another problem is that most of nature's medicines do not come from big and beautiful mammals, such as tigers and elephants. <mark class="evidence" id="ev-4b-5" data-q="4b-5">Instead, <span class="syn-pair-1" data-q="4b-5">they come from the least popular of the world's ecosystems: plants, fungi and invertebrates</span>. Some particularly valuable species are <span class="syn-pair-2" data-q="4b-5">often either poisonous or so small that we cannot see them without a microscope</span>. This makes campaigning for their preservation much more difficult</mark>.</p>
            <p><span class="para-tag">Para 6</span> <mark class="evidence" id="ev-4b-6" data-q="4b-6">An additional problem is the fact that <span class="syn-pair-1" data-q="4b-6">medical schools teach their students very little about the discovery of new treatments</span>. Few young doctors, for example, <span class="syn-pair-2" data-q="4b-6">know that the blood pressure medicine captopril... comes from the poison of a Brazilian snake</span></mark>. Antibiotics, most of which come from nature, are a miracle drug but doctors use far too many of them. This is partly because they do not realise the dangers involved or how closely connected these drugs are with the natural world.</p>
            <p><span class="para-tag">Para 7</span> Nature and medicine are closely connected. We must protect nature. If we don't, we not only risk losing many plant and animal species but we are also risking our own health.</p>
        `,
        boxOptions: [
            { letter: "A", text: "many potential cures will disappear forever." },
            { letter: "B", text: "some of the most medically valuable species do not seem very attractive." },
            { letter: "C", text: "natural medicines can be more effective than modern drugs." },
            { letter: "D", text: "medical students learn more about the development of treatments." },
            { letter: "E", text: "people discovered how powerful natural substances can be." },
            { letter: "F", text: "researching new treatments takes considerable time." },
            { letter: "G", text: "many possible medicines from the natural world are still unknown." },
            { letter: "H", text: "medical knowledge is not growing quickly enough to fight new diseases." },
            { letter: "I", text: "modern medicine still makes so much use of nature." }
        ],
        summaryBox: `
            <div class="card" style="background:#ffffff; border:1.5px solid #cbd5e1; border-left:6px solid var(--col-reading); padding:18px 22px; margin-bottom:14px; box-shadow:0 2px 8px rgba(0,0,0,0.03);">
                <div style="font-size:17px; font-weight:800; text-transform:uppercase; letter-spacing:0.04em; color:var(--col-reading); margin-bottom:12px;">📦 Sentence Endings (A–I)</div>
                <div style="display:flex; flex-direction:column; gap:9px; font-size:17.5px; line-height:1.55; color:#0f172a;">
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">A.</strong> many potential cures will disappear forever.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">B.</strong> some of the most medically valuable species do not seem very attractive.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">C.</strong> natural medicines can be more effective than modern drugs.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">D.</strong> medical students learn more about the development of treatments.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">E.</strong> people discovered how powerful natural substances can be.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">F.</strong> researching new treatments takes considerable time.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">G.</strong> many possible medicines from the natural world are still unknown.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">H.</strong> medical knowledge is not growing quickly enough to fight new diseases.</div>
                    <div><strong style="color:var(--col-reading); font-family:var(--font-mono); width:28px; display:inline-block;">I.</strong> modern medicine still makes so much use of nature.</div>
                </div>
            </div>
            <div class="card" style="padding:18px 22px; font-size:18px; line-height:2.1; color:#0f172a; background:#ffffff; border:1px solid #cbd5e1; border-radius:10px;">
                <div style="font-size:16.5px; font-weight:800; text-transform:uppercase; color:var(--col-reading); margin-bottom:10px;">📋 Questions 1–6: Match Sentence Endings</div>
                1. It is many thousands of years since <strong>1.</strong> <select class="select-input" data-ans="E" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-4b-1" onclick="deckEngine.toggleSynonymExplanation('4b-1', 'ev-4b-1')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                2. People are often very surprised to learn that <strong>2.</strong> <select class="select-input" data-ans="I" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-4b-2" onclick="deckEngine.toggleSynonymExplanation('4b-2', 'ev-4b-2')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                3. Scientists estimate that <strong>3.</strong> <select class="select-input" data-ans="G" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-4b-3" onclick="deckEngine.toggleSynonymExplanation('4b-3', 'ev-4b-3')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                4. Destroying different ecosystems means that <strong>4.</strong> <select class="select-input" data-ans="A" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-4b-4" onclick="deckEngine.toggleSynonymExplanation('4b-4', 'ev-4b-4')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                5. What is making the problem worse is the fact that <strong>5.</strong> <select class="select-input" data-ans="B" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-4b-5" onclick="deckEngine.toggleSynonymExplanation('4b-5', 'ev-4b-5')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button><br>
                6. The writer thinks the situation will improve if <strong>6.</strong> <select class="select-input" data-ans="D" style="width:130px; font-weight:700;"><option value="">--</option><option value="A">A</option><option value="B">B</option><option value="C">C</option><option value="D">D</option><option value="E">E</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="I">I</option></select> <button class="syn-btn" data-ev="ev-4b-6" onclick="deckEngine.toggleSynonymExplanation('4b-6', 'ev-4b-6')" style="padding:3px 10px; font-size:14px;" title="Highlight Evidence">💡</button>
            </div>
        `,
        walkthroughs: [
            {
                qNum: 1,
                title: "Walkthrough: Question 1 & Paragraph 1 (Ancient Origins of Medicine)",
                badge: "Reading 4b Walkthrough • Q1",
                para: "Para 1",
                header: "📖 Passage Excerpt (Paragraph 1)",
                excerpt: `<span class="para-tag">[Para 1]</span> <mark class="evidence" id="ev-wt-4b-1" data-q="wt-4b-1">"<span class="syn-pair-1" data-q="wt-4b-1">People have used plants and animals as sources of medicine for thousands of years</span>. For example, <span class="syn-pair-2" data-q="wt-4b-1">medicinal plants that people used over 60,000 years ago were found</span> in an Iraqi cave site."</mark>`,
                question: `1. It is many thousands of years since <span class="syn-pair-1" data-q="wt-4b-1">[ 1 ]</span>.`,
                ans: "E",
                boxOptions: [
                    { letter: "A", text: "many potential cures will disappear forever." }, { letter: "B", text: "some of the most medically valuable species..." },
                    { letter: "C", text: "natural medicines can be more effective..." }, { letter: "D", text: "medical students learn more..." },
                    { letter: "E", text: "people discovered how powerful natural substances can be." }, { letter: "F", text: "researching new treatments takes..." },
                    { letter: "G", text: "many possible medicines from nature are still unknown." }, { letter: "H", text: "medical knowledge is not growing..." },
                    { letter: "I", text: "modern medicine still makes so much use of nature." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"thousands of years since"</em> ↔ <em>"used over 60,000 years ago"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"sources of medicine"</em> = <strong>E (discovered how powerful natural substances can be)</strong>.</div>`
            },
            {
                qNum: 2,
                title: "Walkthrough: Question 2 & Paragraph 2 (Surprising Natural Dependence)",
                badge: "Reading 4b Walkthrough • Q2",
                para: "Para 2",
                header: "📖 Passage Excerpt (Paragraph 2)",
                excerpt: `<span class="para-tag">[Para 2]</span> <mark class="evidence" id="ev-wt-4b-2" data-q="wt-4b-2">"<span class="syn-pair-1" data-q="wt-4b-2">Most people are amazed to discover that our dependence on nature for health has not reduced</span>. Over the past quarter century, <span class="syn-pair-2" data-q="wt-4b-2">more than half of all the products that drug companies have developed actually use, or copy, substances from the natural world</span>."</mark>`,
                question: `2. People are often very surprised to learn that <span class="syn-pair-1" data-q="wt-4b-2">[ 2 ]</span>.`,
                ans: "I",
                boxOptions: [
                    { letter: "A", text: "many potential cures will disappear..." }, { letter: "B", text: "some of the most medically valuable species..." },
                    { letter: "C", text: "natural medicines can be more effective..." }, { letter: "D", text: "medical students learn more..." },
                    { letter: "E", text: "people discovered how powerful..." }, { letter: "F", text: "researching new treatments takes..." },
                    { letter: "G", text: "many possible medicines from nature are still unknown." }, { letter: "H", text: "medical knowledge is not growing..." },
                    { letter: "I", text: "modern medicine still makes so much use of nature." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"very surprised to learn"</em> ↔ <em>"amazed to discover"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"more than half of all products use substances from natural world"</em> = <strong>I (modern medicine still makes so much use of nature)</strong>.</div>`
            },
            {
                qNum: 3,
                title: "Walkthrough: Question 3 & Paragraph 3 (Undiscovered Species)",
                badge: "Reading 4b Walkthrough • Q3",
                para: "Para 3",
                header: "📖 Passage Excerpt (Paragraph 3)",
                excerpt: `<span class="para-tag">[Para 3]</span> <mark class="evidence" id="ev-wt-4b-3" data-q="wt-4b-3">"<span class="syn-pair-1" data-q="wt-4b-3">scientists generally believe that researchers have fully examined less than one percent of all species</span>... <span class="syn-pair-2" data-q="wt-4b-3">They believe that nature still holds many valuable cures for research to discover</span>."</mark>`,
                question: `3. Scientists estimate that <span class="syn-pair-2" data-q="wt-4b-3">[ 3 ]</span>.`,
                ans: "G",
                boxOptions: [
                    { letter: "A", text: "many potential cures will disappear..." }, { letter: "B", text: "some of the most medically valuable species..." },
                    { letter: "C", text: "natural medicines can be more effective..." }, { letter: "D", text: "medical students learn more..." },
                    { letter: "E", text: "people discovered how powerful..." }, { letter: "F", text: "researching new treatments takes..." },
                    { letter: "G", text: "many possible medicines from the natural world are still unknown." }, { letter: "H", text: "medical knowledge is not growing..." },
                    { letter: "I", text: "modern medicine still makes so much use of nature." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"scientists estimate that"</em> ↔ <em>"scientists generally believe"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"examined less than one percent / still holds cures to discover"</em> = <strong>G (many possible medicines from the natural world are still unknown)</strong>.</div>`
            },
            {
                qNum: 4,
                title: "Walkthrough: Question 4 & Paragraph 4 (Ecosystem Destruction & Extinction)",
                badge: "Reading 4b Walkthrough • Q4",
                para: "Para 4",
                header: "📖 Passage Excerpt (Paragraph 4)",
                excerpt: `<span class="para-tag">[Para 4]</span> <mark class="evidence" id="ev-wt-4b-4" data-q="wt-4b-4">"...<span class="syn-pair-1" data-q="wt-4b-4">agriculture and various major development projects are making the world's rainforests vanish</span>... <span class="syn-pair-2" data-q="wt-4b-4">The inevitable result is that many species with important medicinal powers will become extinct</span>."</mark>`,
                question: `4. Destroying different ecosystems means that <span class="syn-pair-2" data-q="wt-4b-4">[ 4 ]</span>.`,
                ans: "A",
                boxOptions: [
                    { letter: "A", text: "many potential cures will disappear forever." }, { letter: "B", text: "some of the most medically valuable species..." },
                    { letter: "C", text: "natural medicines can be more effective..." }, { letter: "D", text: "medical students learn more..." },
                    { letter: "E", text: "people discovered how powerful..." }, { letter: "F", text: "researching new treatments takes..." },
                    { letter: "G", text: "many possible medicines from the natural world are still unknown." }, { letter: "H", text: "medical knowledge is not growing..." },
                    { letter: "I", text: "modern medicine still makes so much use of nature." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"Destroying different ecosystems"</em> ↔ <em>"rainforests vanish / become extinct"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <em>"species with medicinal powers become extinct"</em> = <strong>A (many potential cures will disappear forever)</strong>.</div>`
            },
            {
                qNum: 5,
                title: "Walkthrough: Question 5 & Paragraph 5 (Unpopular / Unattractive Species)",
                badge: "Reading 4b Walkthrough • Q5",
                para: "Para 5",
                header: "📖 Passage Excerpt (Paragraph 5)",
                excerpt: `<span class="para-tag">[Para 5]</span> <mark class="evidence" id="ev-wt-4b-5" data-q="wt-4b-5">"Instead, <span class="syn-pair-1" data-q="wt-4b-5">they come from the least popular of the world's ecosystems: plants, fungi and invertebrates</span>. Some particularly valuable species are <span class="syn-pair-2" data-q="wt-4b-5">often either poisonous or so small that we cannot see them without a microscope</span>."</mark>`,
                question: `5. What is making the problem worse is the fact that <span class="syn-pair-1" data-q="wt-4b-5">[ 5 ]</span>.`,
                ans: "B",
                boxOptions: [
                    { letter: "A", text: "many potential cures will disappear..." }, { letter: "B", text: "some of the most medically valuable species do not seem very attractive." },
                    { letter: "C", text: "natural medicines can be more effective..." }, { letter: "D", text: "medical students learn more..." },
                    { letter: "E", text: "people discovered how powerful..." }, { letter: "F", text: "researching new treatments takes..." },
                    { letter: "G", text: "many possible medicines from nature are still unknown." }, { letter: "H", text: "medical knowledge is not growing..." },
                    { letter: "I", text: "modern medicine still makes so much use of nature." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"least popular ecosystems / poisonous or so small"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Paraphrase Key:</span> <strong>B (some of the most medically valuable species do not seem very attractive)</strong>.</div>`
            },
            {
                qNum: 6,
                title: "Walkthrough: Question 6 & Paragraph 6 (Medical School Education)",
                badge: "Reading 4b Walkthrough • Q6",
                para: "Para 6",
                header: "📖 Passage Excerpt (Paragraph 6)",
                excerpt: `<span class="para-tag">[Para 6]</span> <mark class="evidence" id="ev-wt-4b-6" data-q="wt-4b-6">"<span class="syn-pair-1" data-q="wt-4b-6">An additional problem is the fact that medical schools teach their students very little about the discovery of new treatments</span>. Few young doctors, for example, <span class="syn-pair-2" data-q="wt-4b-6">know that the blood pressure medicine captopril... comes from the poison of a Brazilian snake</span>."</mark>`,
                question: `6. The writer thinks the situation will improve if <span class="syn-pair-1" data-q="wt-4b-6">[ 6 ]</span>.`,
                ans: "D",
                boxOptions: [
                    { letter: "A", text: "many potential cures will disappear..." }, { letter: "B", text: "some of the most medically valuable species..." },
                    { letter: "C", text: "natural medicines can be more effective..." }, { letter: "D", text: "medical students learn more about the development of treatments." },
                    { letter: "E", text: "people discovered how powerful..." }, { letter: "F", text: "researching new treatments takes..." },
                    { letter: "G", text: "many possible medicines from nature are still unknown." }, { letter: "H", text: "medical knowledge is not growing..." },
                    { letter: "I", text: "modern medicine still makes so much use of nature." }
                ],
                explanation: `<div class="syn-key-box" style="margin-top:0;"><span class="syn-tag green">Anchor Match:</span> <em>"medical schools teach their students very little"</em>.</div><div class="syn-key-box"><span class="syn-tag purple">Solution Key:</span> The situation improves if <strong>D (medical students learn more about the development of treatments)</strong>.</div>`
            }
        ]
    }
};

window.moduleData = window.module4Data;

