/**
 * Reading Grounder & Vocabulary Explainer Engine (ReadingGrounder)
 * Handles:
 * 1. Interactive Vocabulary Popovers (Definitions, IPA, Audio Pronunciation, and Dual-Pane Highlighting).
 * 2. Automatic dictionary lookup for reading question keywords and passage evidence.
 * 3. Automatic synonym badge rendering from data-syn attributes.
 * 4. Evidence hover focus synchronization.
 */

class ReadingGrounder {
    static init() {
        this.renderSynonymBadges();
        this.bindEvidenceHover();
        this.bindVocabExplainer();
        this.autoTagVocabWords();
        this.injectVocabStyles();

        document.addEventListener('slidechange', () => this.autoTagVocabWords());
        window.addEventListener('hashchange', () => this.autoTagVocabWords());
    }

    /**
     * Built-in IELTS Academic Dictionary for Reading Questions & Target Passage Excerpts
     */
    static get dictionary() {
        return {
            // Module 2 & General Academic
            'sharing experiences': {
                word: 'sharing experiences',
                pos: 'phrase',
                ipa: '/ˈʃeə.rɪŋ ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Communicating and recounting personal events to others in social interactions.',
                colloc: 'Paraphrases: "extraordinary experiences" / "tell others"'
            },
            'satisfaction': {
                word: 'satisfaction',
                pos: 'noun',
                ipa: '/ˌsæt.ɪsˈfæk.ʃən/',
                def: 'A pleasant feeling of fulfillment or pleasure.',
                colloc: 'gain / derive satisfaction from'
            },
            'immediate and long-term': {
                word: 'immediate & long-term',
                pos: 'phrase',
                ipa: '/ɪˈmiː.di.ət ænd lɒŋ tɜːm/',
                def: 'Happening in the present moment as well as extending far into the future.',
                colloc: 'Paraphrases: "in the moment" vs. "in the long run"'
            },
            'extraordinary': {
                word: 'extraordinary',
                pos: 'adj.',
                ipa: '/ɪkˈstrɔː.dɪn.ər.i/',
                def: 'Very unusual, special, or remarkable; far beyond ordinary.',
                colloc: 'extraordinary experience / achievement'
            },
            'pleasurable': {
                word: 'pleasurable',
                pos: 'adj.',
                ipa: '/ˈpleʒ.ər.ə.bəl/',
                def: 'Giving a feeling of happy satisfaction or enjoyable sensation.',
                colloc: 'pleasurable in the moment'
            },
            'reminisce': {
                word: 'reminisce',
                pos: 'verb',
                ipa: '/ˌrem.ɪˈnɪs/',
                def: 'To talk, write, or think about enjoyable past experiences.',
                colloc: 'reminisce about the past / fond memories'
            },
            'social communication': {
                word: 'social communication',
                pos: 'noun',
                ipa: '/ˈsəʊ.ʃəl kəˌmjuː.nɪˈkeɪ.ʃən/',
                def: 'The exchange of ideas and information between people in social settings.',
                colloc: 'Paraphrases: "social interaction"'
            },
            'in common': {
                word: 'in common',
                pos: 'idiom / phrase',
                ipa: '/ɪn ˈkɒm.ən/',
                def: 'Shared equally between two or more parties; possessing shared traits.',
                colloc: 'have things in common ↔ grounded in similarities'
            },
            'grounded in': {
                word: 'grounded in',
                pos: 'verb / adj.',
                ipa: '/ˈɡraʊn.dɪd ɪn/',
                def: 'Firmly based on, rooted in, or determined by foundational factors.',
                colloc: 'grounded in similarities / evidence'
            },
            'unusual experiences': {
                word: 'unusual experiences',
                pos: 'noun phrase',
                ipa: '/ʌnˈjuː.ʒu.əl ɪkˈspɪə.ri.ən.sɪz/',
                def: 'Novel, rare, or out-of-the-ordinary events in life.',
                colloc: 'Paraphrases: "extraordinary experiences"'
            },
            'mistakenly thought': {
                word: 'mistakenly thought',
                pos: 'verb phrase',
                ipa: '/mɪˈsteɪ.kən.li θɔːt/',
                def: 'Held an incorrect or inaccurate belief before research evidence.',
                colloc: 'believed ↔ mistakenly thought'
            },
            'participants': {
                word: 'participants',
                pos: 'noun',
                ipa: '/pɑːˈtɪs.ɪ.pənts/',
                def: 'People who take part in a scientific experiment, study, or survey.',
                colloc: 'study participants / sample size'
            },
            'reflected': {
                word: 'reflected',
                pos: 'verb',
                ipa: '/rɪˈflek.tɪd/',
                def: 'Accurately mirrored, reproduced, or represented real-world dynamics.',
                colloc: 'reflected what happens in the real world'
            },
            'criteria': {
                word: 'criteria',
                pos: 'noun (pl.)',
                ipa: '/kraɪˈtɪə.ri.ə/',
                def: 'Standards or principles by which something is judged or decided.',
                colloc: 'different criteria ↔ appearance vs. competence'
            },
            'tailor-made': {
                word: 'tailor-made',
                pos: 'adj.',
                ipa: '/ˈteɪ.lə meɪd/',
                def: 'Made specifically for a particular individual or purpose.',
                colloc: 'specially designed clothes ↔ tailor-made suit'
            },
            'competent': {
                word: 'competent',
                pos: 'adj.',
                ipa: '/ˈkɒm.pɪ.tənt/',
                def: 'Having the necessary ability, knowledge, or skill to do something successfully.',
                colloc: 'highly competent / professional'
            },
            'snap judgement': {
                word: 'snap judgement',
                pos: 'noun',
                ipa: '/snæp ˈdʒʌdʒ.mənt/',
                def: 'A decision or opinion made instantly without deliberation.',
                colloc: 'almost immediately ↔ snap judgement / in one second'
            },
            'enclothed cognition': {
                word: 'enclothed cognition',
                pos: 'noun',
                ipa: '/ɪnˈkləʊðd kɒɡˈnɪʃ.ən/',
                def: 'The systematic influence of clothing on wearers\' psychological processes and cognitive focus.',
                colloc: 'theory of enclothed cognition'
            },
            'impressing others': {
                word: 'impressing others',
                pos: 'phrase',
                ipa: '/ɪmˈpres.ɪŋ ˈʌð.əz/',
                def: 'Gaining admiration or attention from peers through luxury or display.',
                colloc: 'other people notice them ↔ impressing others'
            },
            'belonging': {
                word: 'belonging',
                pos: 'noun',
                ipa: '/bɪˈlɒŋ.ɪŋ/',
                def: 'A sense of being accepted, connected, and part of a social group.',
                colloc: 'signal group belonging ↔ dress in a similar way'
            },

            // Module 4: Health, Trackers & Remedies from Nature
            'consume': {
                word: 'consume',
                pos: 'verb',
                ipa: '/kənˈsjuːm/',
                def: 'To eat, drink, or use up a resource.',
                colloc: 'consume calories / energy'
            },
            'impact': {
                word: 'impact',
                pos: 'noun',
                ipa: '/ˈɪm.pækt/',
                def: 'A powerful effect or influence that something has on a situation.',
                colloc: 'positive impact / environmental impact'
            },
            'motivated': {
                word: 'motivated',
                pos: 'adj.',
                ipa: '/ˈməʊ.tɪ.veɪ.tɪd/',
                def: 'Very enthusiastic and determined to achieve something.',
                colloc: 'motivated to exercise / stay active'
            },
            'consequently': {
                word: 'consequently',
                pos: 'adv.',
                ipa: '/ˈkɒn.sɪ.kwənt.li/',
                def: 'As a result or effect of an earlier action or circumstance.',
                colloc: 'consequently agree / conclude'
            },
            'deceive': {
                word: 'deceive',
                pos: 'verb',
                ipa: '/dɪˈsiːv/',
                def: 'To persuade someone that something false is the truth.',
                colloc: 'deceive themselves / mislead'
            },
            'psychologists': {
                word: 'psychologists',
                pos: 'noun',
                ipa: '/saɪˈkɒl.ə.dʒɪsts/',
                def: 'Specialists who study the human mind, emotions, and behavior.',
                colloc: 'sports psychologists / researchers'
            },
            'metabolises': {
                word: 'metabolises',
                pos: 'verb',
                ipa: '/məˈtæb.əl.aɪz.ɪz/',
                def: 'Chemically processes and breaks down food substances for energy.',
                colloc: 'metabolises calories from sugar'
            },
            'artificial': {
                word: 'artificial',
                pos: 'adj.',
                ipa: '/ˌɑː.tɪˈfɪʃ.əl/',
                def: 'Made or produced by human beings rather than occurring naturally.',
                colloc: 'artificial targets / artificial food'
            },
            'biodiversity': {
                word: 'biodiversity',
                pos: 'noun',
                ipa: '/ˌbaɪ.əʊ.daɪˈvɜː.sə.ti/',
                def: 'The variety of plant and animal life in a particular habitat or the world.',
                colloc: 'rich biodiversity / preserve biodiversity'
            },
            'extinction': {
                word: 'extinction',
                pos: 'noun',
                ipa: '/ɪkˈstɪŋk.ʃən/',
                def: 'The state or situation when a species no longer exists.',
                colloc: 'threatened with extinction / mass extinction'
            },
            'dependence': {
                word: 'dependence',
                pos: 'noun',
                ipa: '/dɪˈpen.dəns/',
                def: 'The state of relying on or needing someone or something.',
                colloc: 'dependence on nature / heavy dependence'
            },
            'substances': {
                word: 'substances',
                pos: 'noun',
                ipa: '/ˈsʌb.stəns.ɪz/',
                def: 'Particular kinds of matter with uniform properties and chemical structure.',
                colloc: 'natural substances / chemical substances'
            },
            'ecosystems': {
                word: 'ecosystems',
                pos: 'noun',
                ipa: '/ˈiː.kəʊˌsɪs.təmz/',
                def: 'Biological communities of interacting organisms and their physical environment.',
                colloc: 'fragile ecosystems / marine ecosystems'
            },
            'inevitable': {
                word: 'inevitable',
                pos: 'adj.',
                ipa: '/ɪnˈev.ɪ.tə.bəl/',
                def: 'Certain to happen; unavoidable.',
                colloc: 'inevitable result / inevitable outcome'
            },
            'invertebrates': {
                word: 'invertebrates',
                pos: 'noun',
                ipa: '/ɪnˈvɜː.tɪ.brəts/',
                def: 'Animals without a backbone, such as insects, spiders, and molluscs.',
                colloc: 'marine invertebrates / small invertebrates'
            },
            'poisonous': {
                word: 'poisonous',
                pos: 'adj.',
                ipa: '/ˈpɔɪ.zən.əs/',
                def: 'Causing illness or death if touched or swallowed; toxic.',
                colloc: 'poisonous snake / poisonous plants'
            },
            'preservation': {
                word: 'preservation',
                pos: 'noun',
                ipa: '/ˌprez.əˈveɪ.ʃən/',
                def: 'The act of keeping something safe from harm, loss, or decay.',
                colloc: 'environmental preservation / habitat preservation'
            },

            // Module 5: Transport, Environment & Visual Pollution
            'journey': {
                word: 'journey',
                pos: 'noun',
                ipa: '/ˈdʒɜː.ni/',
                def: 'An act of travelling from one place to another.',
                colloc: 'long-distance journey / arduous journey'
            },
            'landscapes': {
                word: 'landscapes',
                pos: 'noun',
                ipa: '/ˈlænd.skeɪps/',
                def: 'All the visible features of an area of countryside or land.',
                colloc: 'varied landscapes / dramatic landscapes'
            },
            'environment': {
                word: 'environment',
                pos: 'noun',
                ipa: '/ɪnˈvaɪ.rən.mənt/',
                def: 'The surroundings or conditions in which a person, animal, or plant lives.',
                colloc: 'natural environment / physical environment'
            },
            'impressed': {
                word: 'impressed',
                pos: 'adj.',
                ipa: '/ɪmˈprest/',
                def: 'Feeling admiration and respect for someone or something.',
                colloc: 'impressed him most / deeply impressed'
            },
            'visibility': {
                word: 'visibility',
                pos: 'noun',
                ipa: '/ˌvɪz.əˈbɪl.ə.ti/',
                def: 'The distance one can clearly see as determined by light and weather.',
                colloc: 'limited visibility / reduced visibility'
            },
            'industry': {
                word: 'industry',
                pos: 'noun',
                ipa: '/ˈɪn.də.stri/',
                def: 'Economic activity concerned with the processing of raw materials and manufacture.',
                colloc: 'transport and industry / manufacturing industry'
            },
            'subjective': {
                word: 'subjective',
                pos: 'adj.',
                ipa: '/səbˈdʒek.tɪv/',
                def: 'Based on or influenced by personal feelings, tastes, or opinions rather than facts.',
                colloc: 'subjective types / subjective viewpoint'
            },
            'consequence': {
                word: 'consequence',
                pos: 'noun',
                ipa: '/ˈkɒn.sɪ.kwəns/',
                def: 'A result or effect of an action or condition.',
                colloc: 'negative consequence / direct consequence'
            },
            'drought': {
                word: 'drought',
                pos: 'noun',
                ipa: '/draʊt/',
                def: 'A prolonged period of abnormally low rainfall, leading to a shortage of water.',
                colloc: 'severe drought / prolonged drought'
            },
            'blizzard': {
                word: 'blizzard',
                pos: 'noun',
                ipa: '/ˈblɪz.əd/',
                def: 'A severe snowstorm with high winds and low visibility.',
                colloc: 'winter blizzard / violent blizzard'
            },
            'hurricane': {
                word: 'hurricane',
                pos: 'noun',
                ipa: '/ˈhʌr.ɪ.kən/',
                def: 'A storm with a violent wind, in particular a tropical cyclone in the Caribbean.',
                colloc: 'tropical hurricane / Category 5 hurricane'
            },
            'toxic waste': {
                word: 'toxic waste',
                pos: 'noun phrase',
                ipa: '/ˈtɒk.sɪk weɪst/',
                def: 'Hazardous chemical byproduct from industry that harms living organisms.',
                colloc: 'dispose of toxic waste'
            },
            'global warming': {
                word: 'global warming',
                pos: 'noun phrase',
                ipa: '/ˈɡləʊ.bəl ˈwɔː.mɪŋ/',
                def: 'A gradual increase in the overall temperature of the earth\'s atmosphere.',
                colloc: 'combat global warming'
            },
            'greenhouse effect': {
                word: 'greenhouse effect',
                pos: 'noun phrase',
                ipa: '/ˈɡriːn.haʊs ɪˌfekt/',
                def: 'The trapping of the sun\'s warmth in a planet\'s lower atmosphere by greenhouse gases.',
                colloc: 'contribute to the greenhouse effect'
            },

            // Module 6: Food, Innovation & Marketing
            'distinguish': {
                word: 'distinguish',
                pos: 'verb',
                ipa: '/dɪˈstɪŋ.ɡwɪʃ/',
                def: 'To recognize or treat someone or something as different; tell apart.',
                colloc: 'distinguish from meat / distinguish between'
            },
            'nutrients': {
                word: 'nutrients',
                pos: 'noun',
                ipa: '/ˈnjuː.tri.ənts/',
                def: 'Substances that provide nourishment essential for the maintenance of life and growth.',
                colloc: 'essential nutrients / absorb nutrients'
            },
            'shortages': {
                word: 'shortages',
                pos: 'noun',
                ipa: '/ˈʃɔː.tɪ.dʒɪz/',
                def: 'States or situations in which something needed cannot be obtained in sufficient amounts.',
                colloc: 'food shortages / water shortages'
            },
            'consumers': {
                word: 'consumers',
                pos: 'noun',
                ipa: '/kənˈsjuː.məz/',
                def: 'Persons who purchase goods and services for personal use.',
                colloc: 'everyday consumers / consumer rights'
            },
            'marketing': {
                word: 'marketing',
                pos: 'noun',
                ipa: '/ˈmɑː.kɪ.tɪŋ/',
                def: 'The activity or business of promoting and selling products or services.',
                colloc: 'word-of-mouth marketing / digital marketing'
            },
            'advantages': {
                word: 'advantages',
                pos: 'noun',
                ipa: '/ədˈvɑːn.tɪ.dʒɪz/',
                def: 'Conditions or circumstances that put someone in a favorable or superior position.',
                colloc: 'main advantages / clear advantages'
            },
            'disadvantages': {
                word: 'disadvantages',
                pos: 'noun',
                ipa: '/ˌdɪs.ədˈvɑːn.tɪ.dʒɪz/',
                def: 'Unfavorable circumstances or conditions that reduce the chances of success.',
                colloc: 'drawbacks and disadvantages'
            },

            // Module 7 & Expert 6: Science, Culture & Psychology
            'triumph': {
                word: 'triumph',
                pos: 'verb / noun',
                ipa: '/ˈtraɪ.əmf/',
                def: 'To achieve a great victory, success, or outcome.',
                colloc: 'triumph in mathematics / celebrate triumph'
            },
            'control group': {
                word: 'control group',
                pos: 'noun phrase',
                ipa: '/kənˈtrəʊl ɡruːp/',
                def: 'A benchmark group in an experiment that does not receive the test treatment.',
                colloc: 'scientific control group'
            },
            'analysis': {
                word: 'analysis',
                pos: 'noun',
                ipa: '/əˈnæl.ə.sɪs/',
                def: 'Detailed examination of the elements or structure of something.',
                colloc: 'statistical analysis / data analysis'
            },
            'discipline': {
                word: 'discipline',
                pos: 'noun',
                ipa: '/ˈdɪs.ə.plɪn/',
                def: 'The practice of training people to obey rules or a code of behavior.',
                colloc: 'classroom discipline / strict discipline'
            },
            'admitted': {
                word: 'admitted',
                pos: 'verb',
                ipa: '/ədˈmɪt.ɪd/',
                def: 'Confessed or acknowledged the truth of something reluctantly.',
                colloc: 'admitted that they behaved worse'
            },
            'free-thinking': {
                word: 'free-thinking',
                pos: 'noun / adj.',
                ipa: '/ˈfriːˌθɪŋ.kɪŋ/',
                def: 'Forming one\'s own opinions independently without dogma or rigid convention.',
                colloc: 'opportunity for free-thinking'
            },
            'obsession': {
                word: 'obsession',
                pos: 'noun',
                ipa: '/əbˈseʃ.ən/',
                def: 'An idea or thought that continually preoccupies or intrudes on a person\'s mind.',
                colloc: 'obsession with testing / examinations'
            },
            'manipulative': {
                word: 'manipulative',
                pos: 'adj.',
                ipa: '/məˈnɪp.jə.lə.tɪv/',
                def: 'Exercising unscrupulous control or influence over a person or situation.',
                colloc: 'manipulative tendencies / behavior'
            },
            'demean': {
                word: 'demean',
                pos: 'verb',
                ipa: '/dɪˈmiːn/',
                def: 'Cause someone to lose dignity and the respect of others.',
                colloc: 'demean and embarrass peers'
            },
            'retained': {
                word: 'retained',
                pos: 'verb',
                ipa: '/rɪˈteɪnd/',
                def: 'Kept in mind or remembered over time.',
                colloc: 'retained less content / information'
            },
            'psychological obesity': {
                word: 'psychological obesity',
                pos: 'noun phrase',
                ipa: '/ˌsaɪ.kəˈlɒdʒ.ɪ.kəl əʊˈbiː.sə.ti/',
                def: 'A state of mental overload from consuming sensational, unwholesome digital information.',
                colloc: 'concept of psychological obesity'
            },

            // Extended Module 4 Vocabulary: Health, Biology & Natural World
            'aspect': {
                word: 'aspect',
                pos: 'noun',
                ipa: '/ˈæs.pekt/',
                def: 'A particular part, feature, or characteristic of a situation or topic.',
                colloc: 'important aspect / positive aspect'
            },
            'measure': {
                word: 'measure',
                pos: 'verb',
                ipa: '/ˈmeʒ.ər/',
                def: 'To ascertain the size, amount, or degree of something using instruments.',
                colloc: 'measure heart rate / measure progress'
            },
            'curious': {
                word: 'curious',
                pos: 'adj.',
                ipa: '/ˈkjʊə.ri.əs/',
                def: 'Eager to know or learn something new.',
                colloc: 'curious about health / stay curious'
            },
            'aware': {
                word: 'aware',
                pos: 'adj.',
                ipa: '/əˈweə/',
                def: 'Having knowledge or perception of a situation or fact.',
                colloc: 'aware of the fact / raise awareness'
            },
            'awareness': {
                word: 'awareness',
                pos: 'noun',
                ipa: '/əˈweə.nəs/',
                def: 'Knowledge or perception of a situation, issue, or reality.',
                colloc: 'raise awareness / public awareness'
            },
            'lifestyle': {
                word: 'lifestyle',
                pos: 'noun',
                ipa: '/ˈlaɪf.staɪl/',
                def: 'The way in which a person or group lives and behaves daily.',
                colloc: 'healthy lifestyle / sedentary lifestyle'
            },
            'effective': {
                word: 'effective',
                pos: 'adj.',
                ipa: '/ɪˈfek.tɪv/',
                def: 'Successful in producing a desired, intended, or decisive result.',
                colloc: 'more effective / highly effective'
            },
            'ineffective': {
                word: 'ineffective',
                pos: 'adj.',
                ipa: '/ˌɪn.ɪˈfek.tɪv/',
                def: 'Not producing any significant or desired outcome.',
                colloc: 'ineffective method / proved ineffective'
            },
            'reflecting': {
                word: 'reflecting',
                pos: 'verb / noun',
                ipa: '/rɪˈflek.tɪŋ/',
                def: 'Thinking deeply or carefully about past actions and experiences.',
                colloc: 'reflecting on feelings / personal reflection'
            },
            'life-saving': {
                word: 'life-saving',
                pos: 'adj.',
                ipa: '/ˈlaɪfˌseɪ.vɪŋ/',
                def: 'Capable of preventing someone from dying or curing critical illness.',
                colloc: 'life-saving medicines / life-saving treatment'
            },
            'quinine': {
                word: 'quinine',
                pos: 'noun',
                ipa: '/ˈkwɪn.iːn/',
                def: 'A bitter medication derived from cinchona bark used to treat malaria.',
                colloc: 'natural quinine / malaria treatment'
            },
            'aspirin': {
                word: 'aspirin',
                pos: 'noun',
                ipa: '/ˈæs.prɪn/',
                def: 'A common synthetic drug used to relieve pain, fever, and inflammation, originally from willow bark.',
                colloc: 'take aspirin / daily aspirin'
            },
            'medicinal': {
                word: 'medicinal',
                pos: 'adj.',
                ipa: '/məˈdɪs.ɪ.nəl/',
                def: 'Having healing or curative medical properties.',
                colloc: 'medicinal plants / medicinal powers'
            },
            'fungus': {
                word: 'fungus',
                pos: 'noun',
                ipa: '/ˈfʌŋ.ɡəs/',
                def: 'A spore-producing organism (e.g. mushrooms, molds, yeasts) without leaves or flowers.',
                colloc: 'type of fungus / kill bacteria'
            },
            'bacteria': {
                word: 'bacteria',
                pos: 'noun (pl.)',
                ipa: '/bækˈtɪə.ri.ə/',
                def: 'Microscopic single-celled organisms that can cause disease or aid biological processes.',
                colloc: 'kill bacteria / harmful bacteria'
            },
            'potential': {
                word: 'potential',
                pos: 'adj. / noun',
                ipa: '/pəˈten.ʃəl/',
                def: 'Having or showing the capacity to develop into something in the future.',
                colloc: 'potential cures / potential source'
            },
            'coral reefs': {
                word: 'coral reefs',
                pos: 'noun phrase',
                ipa: '/ˈkɒr.əl riːfs/',
                def: 'Underwater marine ecosystems characterized by reef-building corals.',
                colloc: 'fragile coral reefs / warming temperatures'
            },
            'vanish': {
                word: 'vanish',
                pos: 'verb',
                ipa: '/ˈvæn.ɪʃ/',
                def: 'To disappear suddenly and completely from sight or existence.',
                colloc: 'vanish at an alarming rate'
            },
            'alarming': {
                word: 'alarming',
                pos: 'adj.',
                ipa: '/əˈlɑː.mɪŋ/',
                def: 'Worrying, disturbing, or causing acute concern.',
                colloc: 'alarming rate / alarming loss'
            },
            'mammals': {
                word: 'mammals',
                pos: 'noun',
                ipa: '/ˈmæm.əlz/',
                def: 'Warm-blooded vertebrate animals distinguished by the possession of fur and milk secretion.',
                colloc: 'large mammals / marine mammals'
            },
            'captopril': {
                word: 'captopril',
                pos: 'noun',
                ipa: '/ˈkæp.tə.prɪl/',
                def: 'A groundbreaking blood pressure drug derived from the venom of the Brazilian pit viper snake.',
                colloc: 'blood pressure medicine captopril'
            },
            'antibiotics': {
                word: 'antibiotics',
                pos: 'noun',
                ipa: '/ˌæn.ti.baɪˈɒt.ɪks/',
                def: 'Medicines that inhibit the growth of or destroy microorganisms and bacterial infections.',
                colloc: 'overuse of antibiotics / miracle drug'
            },
            'miracle': {
                word: 'miracle',
                pos: 'noun',
                ipa: '/ˈmɪr.ə.kəl/',
                def: 'An extraordinary, welcome, and remarkable event or achievement.',
                colloc: 'miracle drug / miraculous recovery'
            },
            'species': {
                word: 'species',
                pos: 'noun',
                ipa: '/ˈspiː.ʃiːz/',
                def: 'A group of living organisms consisting of similar individuals capable of exchanging genes.',
                colloc: 'endangered species / plant and animal species'
            },
            'habitat': {
                word: 'habitat',
                pos: 'noun',
                ipa: '/ˈhæb.ɪ.tæt/',
                def: 'The natural home or environment of an animal, plant, or organism.',
                colloc: 'natural habitat / habitat destruction'
            },
            'life cycle': {
                word: 'life cycle',
                pos: 'noun phrase',
                ipa: '/ˈlaɪf ˌsaɪ.kəl/',
                def: 'The series of changes in the life of an organism including reproduction.',
                colloc: 'life cycle of animals'
            },

            // Extended Module 5 Vocabulary: Transport & Environment
            'delays': {
                word: 'delays',
                pos: 'noun',
                ipa: '/dɪˈleɪz/',
                def: 'Periods of time by which something is late or postponed.',
                colloc: 'long delays at border crossings'
            },
            'grassland': {
                word: 'grassland',
                pos: 'noun',
                ipa: '/ˈɡrɑːs.lænd/',
                def: 'A large, open area of country covered with grass, especially used for grazing.',
                colloc: 'miles of grassland'
            },
            'holidaymakers': {
                word: 'holidaymakers',
                pos: 'noun',
                ipa: '/ˈhɒl.ə.deɪˌmeɪ.kəz/',
                def: 'People on vacation or holiday travelling away from home.',
                colloc: 'exciting for holidaymakers'
            },
            'desert': {
                word: 'desert',
                pos: 'noun',
                ipa: '/ˈdez.ət/',
                def: 'A dry, barren area of land, especially one covered with sand, with little vegetation.',
                colloc: 'enormous desert / arid climate'
            },
            'cultures': {
                word: 'cultures',
                pos: 'noun',
                ipa: '/ˈkʌl.tʃəz/',
                def: 'The ideas, customs, and social behavior of particular nations or groups of people.',
                colloc: 'people and cultures / diverse cultures'
            },
            'relief': {
                word: 'relief',
                pos: 'noun',
                ipa: '/rɪˈliːf/',
                def: 'A feeling of reassurance and relaxation following release from anxiety or distress.',
                colloc: 'main emotion is relief / sigh of relief'
            },
            'visual pollution': {
                word: 'visual pollution',
                pos: 'noun phrase',
                ipa: '/ˈvɪʒ.u.əl pəˈluː.ʃən/',
                def: 'Aesthetic degradation of visual landscapes caused by man-made clutter and billboards.',
                colloc: 'problem of visual pollution'
            },
            'haze': {
                word: 'haze',
                pos: 'noun',
                ipa: '/heɪz/',
                def: 'A slight obscuration of the lower atmosphere, typically caused by fine suspended particles.',
                colloc: 'brown haze / dense haze'
            },
            'wind turbines': {
                word: 'wind turbines',
                pos: 'noun phrase',
                ipa: '/wɪnd ˈtɜː.baɪnz/',
                def: 'Tall structures with blades that rotate in the wind to generate clean electricity.',
                colloc: 'wind turbines and power lines'
            },
            'billboards': {
                word: 'billboards',
                pos: 'noun',
                ipa: '/ˈbɪl.bɔːdz/',
                def: 'Large outdoor advertising boards alongside highways or high-traffic roads.',
                colloc: 'advertising billboards / roadside billboards'
            },
            'graffiti': {
                word: 'graffiti',
                pos: 'noun',
                ipa: '/ɡrəˈfiː.ti/',
                def: 'Writing or drawings scribbled, scratched, or sprayed illicitly on a wall or surface.',
                colloc: 'spray-painted graffiti'
            },
            'depressed': {
                word: 'depressed',
                pos: 'adj.',
                ipa: '/dɪˈprest/',
                def: 'In a state of general unhappiness or despondency; suffering from depression.',
                colloc: 'sad or depressed / feeling low'
            },
            'stress levels': {
                word: 'stress levels',
                pos: 'noun phrase',
                ipa: '/stres ˈlev.əlz/',
                def: 'The degree of mental or emotional strain experienced by an individual.',
                colloc: 'affects stress levels / reduce stress'
            },
            'unique character': {
                word: 'unique character',
                pos: 'noun phrase',
                ipa: '/juːˈniːk ˈkær.ək.tər/',
                def: 'Distinctive, one-of-a-kind quality or atmosphere belonging to a place.',
                colloc: 'preserve unique character'
            },
            'identical': {
                word: 'identical',
                pos: 'adj.',
                ipa: '/aɪˈden.tɪ.kəl/',
                def: 'Similar in every detail; exactly alike.',
                colloc: 'identical restaurants / look identical'
            },

            // Extended Module 6 & 7 Vocabulary
            'population': {
                word: 'population',
                pos: 'noun',
                ipa: '/ˌpɒp.jəˈleɪ.ʃən/',
                def: 'All the inhabitants of a particular town, area, or country.',
                colloc: 'world population / feed a population'
            },
            'laboratory': {
                word: 'laboratory',
                pos: 'noun',
                ipa: '/ləˈbɒr.ə.tri/',
                def: 'A room or building equipped for scientific experiments, research, or testing.',
                colloc: 'work in a laboratory / lab environment'
            },
            'proteins': {
                word: 'proteins',
                pos: 'noun',
                ipa: '/ˈprəʊ.tiːnz/',
                def: 'Essential nutrients composed of amino acids required for body structure and tissue repair.',
                colloc: 'plant proteins / protein sources'
            },
            'genuine': {
                word: 'genuine',
                pos: 'adj.',
                ipa: '/ˈdʒen.ju.ɪn/',
                def: 'Truly what something is said to be; authentic and real.',
                colloc: 'genuine meat products / genuine article'
            },
            'institutions': {
                word: 'institutions',
                pos: 'noun',
                ipa: '/ˌɪn.stɪˈtjuː.ʃənz/',
                def: 'Organizations founded for religious, educational, professional, or social purposes.',
                colloc: 'health institutions / educational institutions'
            },
            'persuasive': {
                word: 'persuasive',
                pos: 'adj.',
                ipa: '/pəˈsweɪ.sɪv/',
                def: 'Good at convincing someone to do or believe something through reasoning.',
                colloc: 'persuasive marketing / persuasive arguments'
            },
            'proportion': {
                word: 'proportion',
                pos: 'noun',
                ipa: '/prəˈpɔː.ʃən/',
                def: 'A part, share, or number considered in comparative relation to a whole.',
                colloc: 'large proportion / percentage share'
            },
            'masterpiece': {
                word: 'masterpiece',
                pos: 'noun',
                ipa: '/ˈmɑː.stə.piːs/',
                def: 'A work of outstanding artistry, skill, or workmanship.',
                colloc: 'artistic masterpiece / museum masterpiece'
            },
            'contemporary': {
                word: 'contemporary',
                pos: 'adj.',
                ipa: '/kənˈtem.pər.ər.i/',
                def: 'Living or occurring at the present time; modern and current.',
                colloc: 'contemporary art / contemporary society'
            },
            'conservation': {
                word: 'conservation',
                pos: 'noun',
                ipa: '/ˌkɒn.səˈveɪ.ʃən/',
                def: 'Preservation, protection, or restoration of the natural environment and historical heritage.',
                colloc: 'wildlife conservation / conservation project'
            }
        };
    }

    /**
     * Interactive Vocabulary Highlighting, Pronunciation, and Short Definitions
     */
    static bindVocabExplainer() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('.vocab-word, .vocab-term, .syn-pair-1, .syn-pair-2, .syn-pair-3, [data-def]');
            
            // If clicking inside the popover itself (e.g. replay audio or close), don't close
            if (e.target.closest('#vocabPopover')) return;

            if (target) {
                // If it's a synonym span or vocab word, look up its definition
                const text = target.textContent.trim().toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, "").trim();
                const matchedDict = this.lookupDict(text, target);

                if (matchedDict || target.dataset.def || target.classList.contains('vocab-word')) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.showVocabPopover(target, matchedDict);
                }
            } else {
                this.hideVocabPopover();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.hideVocabPopover();
            }
        });
    }

    static lookupDict(rawText, el) {
        if (!rawText) return null;
        const dict = this.dictionary;

        // Exact match
        if (dict[rawText]) return dict[rawText];

        // Partial or substring match
        for (const [key, val] of Object.entries(dict)) {
            if (rawText.includes(key) || key.includes(rawText)) {
                return val;
            }
        }

        // Check data attributes on element
        if (el.dataset.word && dict[el.dataset.word.toLowerCase()]) {
            return dict[el.dataset.word.toLowerCase()];
        }

        return null;
    }

    static async showVocabPopover(el, dictData = null) {
        // Remove previous active glows across slide
        document.querySelectorAll('.vocab-word.active-vocab, .vocab-term.active-vocab').forEach(v => {
            v.classList.remove('active-vocab');
        });

        // Activate the clicked element softly with dashed/solid underline and soft tint
        el.classList.add('active-vocab');

        const rawText = el.dataset.word || (dictData ? dictData.word : el.textContent.trim().replace(/[.,/#!$%^&*;:{}=\-_`~()"]/g, ""));
        const cleanWord = rawText.trim();
        let pos = el.dataset.pos || (dictData ? dictData.pos : '');
        let ipa = el.dataset.ipa || (dictData ? dictData.ipa : '');
        let def = el.dataset.def || (dictData ? dictData.def : '');
        let colloc = el.dataset.colloc || (dictData ? dictData.colloc : '');

        // Auto-play speech pronunciation
        this.speakWord(cleanWord);

        // Get or create popover element
        let popover = document.getElementById('vocabPopover');
        if (!popover) {
            popover = document.createElement('div');
            popover.id = 'vocabPopover';
            popover.className = 'vocab-popover';
            document.body.appendChild(popover);
        }

        const positionPopover = () => {
            popover.style.display = 'block';
            const rect = el.getBoundingClientRect();
            const popRect = popover.getBoundingClientRect();

            let top = rect.bottom + 8;
            let left = rect.left + (rect.width / 2) - (popRect.width / 2);

            // Prevent overflowing viewport
            if (top + popRect.height > window.innerHeight - 20) {
                top = Math.max(10, rect.top - popRect.height - 8);
            }
            if (left < 10) left = 10;
            if (left + popRect.width > window.innerWidth - 10) {
                left = window.innerWidth - popRect.width - 10;
            }

            popover.style.top = `${top}px`;
            popover.style.left = `${left}px`;
        };

        const renderPopover = (wordTitle, partOfSpeech, phonetic, definition, collocation) => {
            popover.innerHTML = `
                <div class="vp-header">
                    <div class="vp-title-group">
                        <span class="vp-word">${wordTitle}</span>
                        <div style="display: flex; gap: 6px; align-items: center; margin-top: 2px;">
                            ${partOfSpeech ? `<span class="vp-pos">${partOfSpeech}</span>` : ''}
                            ${phonetic ? `<span class="vp-ipa">${phonetic}</span>` : ''}
                        </div>
                    </div>
                    <div class="vp-actions">
                        <button class="vp-audio-btn" title="Listen to pronunciation" onclick="ReadingGrounder.speakWord('${wordTitle.replace(/'/g, "\\'")}')">🔊 Listen</button>
                        <button class="vp-close-btn" title="Close" onclick="ReadingGrounder.hideVocabPopover()">✕</button>
                    </div>
                </div>
                <div class="vp-body">
                    <div class="vp-def">${definition}</div>
                    ${collocation ? `<div class="vp-colloc"><strong>Target Linkage:</strong> <em>${collocation}</em></div>` : ''}
                </div>
            `;
            positionPopover();
        };

        // If local definition exists, render immediately
        if (def && def !== 'Key academic term targeted in the reading passage & questions.') {
            renderPopover(cleanWord, pos || 'IELTS VOCABULARY', ipa, def, colloc);
            return;
        }

        // Check local cache
        const cacheKey = `ielts_dict_${cleanWord.toLowerCase()}`;
        try {
            const cached = localStorage.getItem(cacheKey);
            if (cached) {
                const parsed = JSON.parse(cached);
                renderPopover(cleanWord, parsed.pos || 'IELTS VOCABULARY', parsed.ipa || ipa, parsed.def, parsed.colloc || colloc);
                return;
            }
        } catch (e) {}

        // Render placeholder while fetching
        renderPopover(cleanWord, pos || 'LOOKING UP...', ipa, '<div style="color: #64748b; font-style: italic;">Fetching definition &amp; phonetics...</div>', colloc);

        // Fetch live from Free Dictionary API
        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(cleanWord.toLowerCase())}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data) && data.length > 0) {
                    const first = data[0];
                    const phoneticText = first.phonetic || (first.phonetics?.find(p => p.text)?.text) || ipa;
                    const meaning = first.meanings?.[0];
                    const partOfSpeech = meaning?.partOfSpeech || pos || 'noun';
                    const definitionText = meaning?.definitions?.[0]?.definition || 'Academic reading term.';
                    const exampleText = meaning?.definitions?.[0]?.example ? `Example: "${meaning.definitions[0].example}"` : colloc;

                    try {
                        localStorage.setItem(cacheKey, JSON.stringify({
                            pos: partOfSpeech,
                            ipa: phoneticText,
                            def: definitionText,
                            colloc: exampleText
                        }));
                    } catch (err) {}

                    if (popover && el.classList.contains('active-vocab')) {
                        renderPopover(cleanWord, partOfSpeech.toUpperCase(), phoneticText, definitionText, exampleText);
                    }
                    return;
                }
            }
        } catch (fetchErr) {
            console.warn('Online dictionary lookup unavailable:', fetchErr);
        }

        renderPopover(cleanWord, pos || 'IELTS ACADEMIC TERM', ipa, def || 'Key academic vocabulary term in the passage.', colloc);
    }

    static hideVocabPopover() {
        const popover = document.getElementById('vocabPopover');
        if (popover) {
            popover.style.display = 'none';
        }
        document.querySelectorAll('.active-vocab, .active-syn, .q-card-active').forEach(v => {
            v.classList.remove('active-vocab', 'active-syn', 'q-card-active');
        });
    }

    static speakWord(text) {
        if (!('speechSynthesis' in window) || !text) return;
        window.speechSynthesis.cancel();

        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-GB';
        utterance.rate = 0.9;

        const preferredVoice = this.getPreferredVoice();
        if (preferredVoice) utterance.voice = preferredVoice;

        window.speechSynthesis.speak(utterance);
    }

    static getPreferredVoice() {
        const voices = window.speechSynthesis.getVoices();
        if (!voices || voices.length === 0) return null;

        // 1. Prioritize Google UK English Female
        const googleUkFemale = voices.find(v => 
            v.name.includes('Google') && 
            (v.name.includes('UK English Female') || (v.lang.replace('_', '-').startsWith('en-GB') && v.name.toLowerCase().includes('female')))
        );
        if (googleUkFemale) return googleUkFemale;

        // 2. Any Google UK English voice
        const googleUk = voices.find(v => v.name.includes('Google') && (v.lang === 'en-GB' || v.lang === 'en_GB'));
        if (googleUk) return googleUk;

        // 3. Natural British Female voices (e.g. Microsoft Libby, Hazel, Sonia, Serena)
        const britishFemale = voices.find(v => 
            (v.lang === 'en-GB' || v.lang === 'en_GB') && 
            (v.name.toLowerCase().includes('female') || v.name.includes('Natural') || v.name.includes('Libby') || v.name.includes('Hazel') || v.name.includes('Sonia') || v.name.includes('Serena'))
        );
        if (britishFemale) return britishFemale;

        // 4. Any en-GB voice
        return voices.find(v => v.lang === 'en-GB' || v.lang === 'en_GB') || null;
    }

    static injectVocabStyles() {
        if (document.getElementById('readingGrounderStyles')) return;
        const style = document.createElement('style');
        style.id = 'readingGrounderStyles';
        style.textContent = `
            .vocab-word, .vocab-term {
                border-bottom: 2px dashed #059669;
                color: #065f46;
                font-weight: 600;
                cursor: pointer;
                border-radius: 3px;
                padding: 1px 3px;
                transition: all 0.2s ease;
                display: inline;
            }
            .vocab-word:hover, .vocab-term:hover {
                background: #d1fae5;
                color: #047857;
            }
            .vocab-word.active-vocab, .vocab-term.active-vocab {
                background: #a7f3d0 !important;
                color: #064e3b !important;
                box-shadow: 0 0 0 2px #10b981;
            }

            /* Floating Vocab Popover Card */
            .vocab-popover {
                position: fixed;
                z-index: 10000;
                display: none;
                width: 330px;
                max-width: 90vw;
                background: #ffffff;
                border: 2px solid #10b981;
                border-radius: 12px;
                padding: 14px 16px;
                box-shadow: 0 12px 28px -5px rgba(0, 0, 0, 0.22), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
                font-family: var(--font-body, 'DM Sans', sans-serif);
                animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
            }

            .vp-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                border-bottom: 1px solid #e2e8f0;
                padding-bottom: 8px;
                margin-bottom: 8px;
                gap: 8px;
            }

            .vp-title-group {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }

            .vp-word {
                font-size: 17.5px;
                font-weight: 800;
                color: #0f172a;
                font-family: var(--font-display, sans-serif);
            }

            .vp-pos {
                font-size: 11.5px;
                font-weight: 700;
                color: #059669;
                text-transform: uppercase;
                background: #ecfdf5;
                padding: 1px 6px;
                border-radius: 4px;
                width: max-content;
            }

            .vp-ipa {
                font-size: 12.5px;
                color: #64748b;
                font-family: 'JetBrains Mono', monospace;
            }

            .vp-actions {
                display: flex;
                align-items: center;
                gap: 6px;
            }

            .vp-audio-btn {
                background: #ecfdf5;
                border: 1px solid #a7f3d0;
                color: #059669;
                font-size: 12px;
                font-weight: 700;
                padding: 4px 8px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.2s;
            }

            .vp-audio-btn:hover {
                background: #10b981;
                color: #ffffff;
            }

            .vp-close-btn {
                background: transparent;
                border: none;
                color: #94a3b8;
                font-size: 16px;
                font-weight: 700;
                cursor: pointer;
                padding: 2px 6px;
                line-height: 1;
                border-radius: 4px;
            }

            .vp-close-btn:hover {
                color: #ef4444;
                background: #fee2e2;
            }

            .vp-body {
                font-size: 14px;
                line-height: 1.5;
                color: #334155;
            }

            .vp-def {
                margin-bottom: 6px;
                font-weight: 500;
            }

            .vp-colloc {
                font-size: 12.5px;
                color: #475569;
                background: #f8fafc;
                padding: 6px 8px;
                border-radius: 6px;
                border-left: 3px solid #059669;
            }

            @keyframes popoverFadeIn {
                from { opacity: 0; transform: translateY(-4px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    /**
     * Renders concise data-syn attributes into styled synonym cards
     */
    static renderSynonymBadges() {
        document.querySelectorAll('[data-syn]').forEach(container => {
            const raw = container.dataset.syn;
            if (!raw) return;

            const pairs = raw.split('|').map(p => p.trim());
            const fragment = document.createDocumentFragment();

            pairs.forEach(pair => {
                const parts = pair.split(':');
                if (parts.length >= 2) {
                    const color = parts[0].trim().toLowerCase();
                    const text = parts.slice(1).join(':').trim();

                    const box = document.createElement('div');
                    box.className = 'syn-key-box';

                    const tag = document.createElement('span');
                    tag.className = `syn-tag ${color}`;
                    tag.textContent = color.charAt(0).toUpperCase() + color.slice(1) + ':';

                    const label = document.createElement('span');
                    label.innerHTML = text.replace(/'([^']+)'/g, '<em>"$1"</em>');

                    box.appendChild(tag);
                    box.appendChild(label);
                    fragment.appendChild(box);
                }
            });

            container.appendChild(fragment);
        });
    }

    /**
     * Automatically scans reading passages for key vocabulary words and collocations,
     * adding the subtle dashed underline and distinct color so users can hover/click to inspect.
     */
    static autoTagVocabWords() {
        const dict = this.dictionary;
        const dictKeys = Object.keys(dict).sort((a, b) => b.length - a.length);
        if (dictKeys.length === 0) return;

        const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

        const containers = document.querySelectorAll('.reading-pane, [data-slot="passage"], .passage-box, .reading-passage, .passage-content, .two-col > div');
        containers.forEach(container => {
            const seenWords = new Set();

            // Pre-seed seenWords with any existing .vocab-word elements
            container.querySelectorAll('.vocab-word, .vocab-term').forEach(v => {
                const w = (v.dataset.word || v.textContent).trim().toLowerCase();
                if (w) seenWords.add(w);
            });

            const walker = document.createTreeWalker(
                container,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        const parent = node.parentElement;
                        if (!parent) return NodeFilter.FILTER_REJECT;
                        const tag = parent.tagName.toLowerCase();
                        if (['script', 'style', 'button', 'select', 'textarea', 'input', 'kbd'].includes(tag)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        if (parent.closest('.vocab-word, .vocab-term, .vocab-popover, #presentationToolsHUD')) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return NodeFilter.FILTER_ACCEPT;
                    }
                }
            );

            const textNodes = [];
            while (walker.nextNode()) {
                textNodes.push(walker.currentNode);
            }

            textNodes.forEach(node => {
                const text = node.nodeValue;
                if (!text || text.trim().length < 3) return;

                for (const phrase of dictKeys) {
                    const lowerPhrase = phrase.toLowerCase();
                    if (seenWords.has(lowerPhrase)) continue;

                    const regex = new RegExp(`\\b(${escapeRegex(phrase)})\\b`, 'i');
                    if (regex.test(node.nodeValue)) {
                        seenWords.add(lowerPhrase);
                        const span = document.createElement('span');
                        span.innerHTML = node.nodeValue.replace(regex, (match) => {
                            const entry = dict[lowerPhrase];
                            const ipa = entry?.ipa || '';
                            const pos = entry?.pos || '';
                            const def = entry?.def || '';
                            const colloc = entry?.colloc || '';
                            return `<span class="vocab-word" data-word="${match}" data-ipa="${ipa}" data-pos="${pos}" data-def="${def}" data-colloc="${colloc}">${match}</span>`;
                        });
                        if (node.parentNode) {
                            node.parentNode.replaceChild(span, node);
                        }
                        break;
                    }
                }
            });
        });
    }

    /**
     * Highlights corresponding evidence when hovering over question cards
     */
    static bindEvidenceHover() {
        document.querySelectorAll('.q-card[data-q], [data-evidence-target]').forEach(card => {
            const qKey = card.dataset.q;
            if (!qKey) return;

            card.addEventListener('mouseenter', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.add('hover-focus'));
            });
            card.addEventListener('mouseleave', () => {
                document.querySelectorAll(`mark.evidence[id*="${qKey}"]`).forEach(m => m.classList.remove('hover-focus'));
            });
        });
    }
}

// Auto-run on DOM Ready
window.addEventListener('DOMContentLoaded', () => {
    ReadingGrounder.init();
});
