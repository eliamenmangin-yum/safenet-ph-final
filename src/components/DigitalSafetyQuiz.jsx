import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, ChevronRight, RotateCcw, Shield, AlertTriangle, BookOpen } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

const QUIZ_SETS = {
  parents: {
    label: 'For Parents & Guardians',
    icon: Shield,
    color: 'accent',
    questions: [
      {
        question: 'What is "online grooming"?',
        options: [
          'Helping your child set up a social media account',
          'A process where adults build trust with children online to eventually exploit them',
          'Teaching children how to use the internet safely',
          'Parental controls installed on a device',
        ],
        correct: 1,
        explanation:
          'Online grooming is a manipulative process where an offender builds emotional trust with a child over time — often posing as a peer — with the intent to exploit them sexually. Roche et al. (2023) identified grooming as the primary method used by perpetrators in Philippine OSAEC cases.',
      },
      {
        question: 'Which of the following is a warning sign that your child may be experiencing online grooming?',
        options: [
          'Spending more time reading books',
          'Suddenly switching screens or closing apps when you enter the room',
          'Asking to spend more time with family offline',
          'Declining to use new apps or platforms',
        ],
        correct: 1,
        explanation:
          'Secretive behavior around devices — such as quickly hiding screens — is a key behavioral warning sign. UNICEF Philippines (2021) lists this alongside unexplained gifts, withdrawal from family, and emotional changes as red flags parents should monitor.',
      },
      {
        question: 'Under Republic Act No. 11930 (Anti-OSAEC Act of 2022), who is legally required to report OSAEC content?',
        options: [
          'Only law enforcement agencies',
          'Only the parents of victims',
          'Internet intermediaries, social media platforms, and internet service providers',
          'Only teachers and school officials',
        ],
        correct: 2,
        explanation:
          'RA 11930 mandates that internet intermediaries — including social media platforms, messaging apps, and ISPs — actively detect, report, preserve, and remove OSAEC content. This shifts significant legal responsibility onto platform providers.',
      },
      {
        question: 'What is the minimum age required to file a complaint about a data privacy violation involving your child?',
        options: [
          'Only adults 18 and above can file complaints',
          'There is no minimum age; anyone can file on a child\'s behalf',
          'Children must be at least 15 years old',
          'Only the child themselves can file the complaint',
        ],
        correct: 1,
        explanation:
          'Under the Data Privacy Act of 2012 (RA 10173), parents or legal guardians can file complaints with the National Privacy Commission on behalf of their children at any age. There is no minimum age restriction for representative complaints.',
      },
      {
        question: 'Which government hotline can Filipino children and families use to report online child rights violations?',
        options: [
          'MAKABATA Helpline 1383',
          'Dial 117',
          'NBI Cybercrime Division Hotline 166',
          'DSWD Social Welfare Hotline 931',
        ],
        correct: 0,
        explanation:
          'The MAKABATA Helpline 1383 is the official government channel for reporting child rights violations, including online exploitation. UNICEF Philippines (2024) noted that only 13.52% of young Filipinos were aware of this helpline, highlighting the urgent need for awareness campaigns.',
      },
    ],
  },
  students: {
    label: 'For Students (Ages 12–17)',
    icon: BookOpen,
    color: 'accent',
    questions: [
      {
        question: 'Someone you met online asks to move your conversation from a public app to a private messaging app. What should you do?',
        options: [
          'Agree, because private apps are more secure',
          'Share your number since they seem friendly',
          'Decline and tell a trusted adult about the request',
          'Block them immediately without telling anyone',
        ],
        correct: 2,
        explanation:
          'Asking to move to a private platform is a common grooming tactic used to isolate victims from public oversight. The right response is to decline and immediately inform a trusted adult — a parent, teacher, or guardian. Telling someone creates a record and keeps you safe.',
      },
      {
        question: 'What does "digital footprint" mean?',
        options: [
          'The physical size of your phone',
          'The data and information you leave behind every time you use the internet',
          'The number of apps installed on your device',
          'Your internet download speed',
        ],
        correct: 1,
        explanation:
          'Your digital footprint includes every photo, post, comment, search, and message you create or share online. This information can be stored permanently and may be accessed by others — including potential predators. Being aware of your footprint is a key digital literacy skill.',
      },
      {
        question: 'An online contact asks you to send a photo of yourself "just for them." What is this called and what should you do?',
        options: [
          'This is normal — it\'s fine to share selfies with friends',
          'This could be an attempt to obtain Child Sexual Abuse Material (CSAM); report it immediately',
          'Send a photo only if they have sent one first',
          'Ask your friends if they think the person seems trustworthy',
        ],
        correct: 1,
        explanation:
          'Soliciting images from minors is illegal under Republic Act No. 9775 (Anti-Child Pornography Act) and RA 11930. Even if the person seems friendly, you should refuse, not delete the conversation, and report it to a trusted adult or directly to the PNP Anti-Cybercrime Group.',
      },
      {
        question: 'Which of the following best describes "sextortion"?',
        options: [
          'A type of online video game with mature content',
          'When someone threatens to share your private images unless you send money or more images',
          'A parental control software for blocking adult websites',
          'A privacy setting on social media platforms',
        ],
        correct: 1,
        explanation:
          'Sextortion is a form of online blackmail where a perpetrator threatens to release private or sexual images of a victim unless they comply with demands — for money, more images, or sexual acts. RA 11930 specifically criminalizes this behavior, and victims should report it immediately rather than comply.',
      },
      {
        question: 'If a classmate shows you a sexual image of another student that was shared without their consent, what should you do?',
        options: [
          'Forward it to see if others know who it is',
          'Save it in case it\'s needed as evidence later',
          'Do not share it, report it to a school official or trusted adult immediately, and encourage the classmate to do the same',
          'Ask the person in the image if they know it\'s circulating',
        ],
        correct: 2,
        explanation:
          'Non-consensual sharing of intimate images is illegal under Philippine law. Forwarding or saving the image makes you legally liable. The correct action is to refuse to share it, report it to a responsible adult, and support the victim. You are protected from retaliation when reporting in good faith.',
      },
    ],
  },
};

const SCORE_FEEDBACK = [
  {
    min: 0,
    max: 1,
    level: 'Needs Improvement',
    color: 'text-destructive',
    bg: 'bg-destructive/10 border-destructive/20',
    icon: AlertTriangle,
    message:
      'There are significant gaps in your current knowledge of online safety. This is completely normal — most Filipinos have not received formal digital safety education. We strongly encourage you to explore the resources on this platform, particularly the Laws and Solutions sections, to build a stronger foundation for protecting yourself and your family online.',
  },
  {
    min: 2,
    max: 3,
    level: 'Developing Awareness',
    color: 'text-yellow-600',
    bg: 'bg-yellow-50 border-yellow-200',
    icon: Shield,
    message:
      'You have a foundational understanding of some online safety concepts, but there are important areas where your knowledge can be strengthened. Review the questions you answered incorrectly and read the explanations carefully. Consider exploring our Digital Literacy Resource Library and the Laws section for a more comprehensive understanding.',
  },
  {
    min: 4,
    max: 4,
    level: 'Strong Awareness',
    color: 'text-accent',
    bg: 'bg-accent/10 border-accent/20',
    icon: Shield,
    message:
      'You demonstrate a strong understanding of online safety principles. You are well-positioned to protect yourself and your family in digital environments. Continue to stay updated on evolving threats — cybercriminals constantly adapt their tactics — and share what you know with others in your community.',
  },
  {
    min: 5,
    max: 5,
    level: 'Digital Safety Champion',
    color: 'text-accent',
    bg: 'bg-accent/10 border-accent/20',
    icon: CheckCircle2,
    message:
      'Excellent! You answered every question correctly and demonstrate comprehensive knowledge of online safety, digital literacy, and Philippine child protection law. You are equipped to be an advocate in your community. Consider sharing SafeNet PH with parents, teachers, and students who may benefit from this knowledge.',
  },
];

function getFeedback(score) {
  return SCORE_FEEDBACK.find((f) => score >= f.min && score <= f.max);
}

export default function DigitalSafetyQuiz() {
  const [mode, setMode] = useState(null); // 'parents' | 'students'
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [done, setDone] = useState(false);

  const quiz = mode ? QUIZ_SETS[mode] : null;
  const question = quiz ? quiz.questions[current] : null;
  const score = answers.filter(Boolean).length;

  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null) return;
    setConfirmed(true);
    const correct = selected === question.correct;
    const newAnswers = [...answers, correct];

    if (current + 1 === quiz.questions.length) {
      setTimeout(() => {
        setAnswers(newAnswers);
        setDone(true);
      }, 1200);
    } else {
      setTimeout(() => {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
        setConfirmed(false);
      }, 1200);
    }
  };

  const handleReset = () => {
    setMode(null);
    setCurrent(0);
    setSelected(null);
    setConfirmed(false);
    setAnswers([]);
    setDone(false);
  };

  const feedback = done ? getFeedback(score) : null;

  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <ScrollReveal>
          <span className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-4">
            Interactive Assessment
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground leading-tight mb-4">
            Assess Your Digital Safety
          </h2>
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
            Test your knowledge of online safety, grooming tactics, and Philippine child
            protection law. Choose a quiz suited to your role and receive instant, personalized
            feedback based on your answers.
          </p>
        </ScrollReveal>

        <AnimatePresence mode="wait">
          {/* Mode Selection */}
          {!mode && (
            <motion.div
              key="mode"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {Object.entries(QUIZ_SETS).map(([key, set]) => (
                <button
                  key={key}
                  onClick={() => setMode(key)}
                  className="group bg-card border border-border rounded-xl p-8 text-left transition-all duration-300 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
                >
                  <set.icon className="h-10 w-10 text-accent mb-5" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                    {set.label}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                    {key === 'parents'
                      ? '5 questions on recognizing grooming, Philippine laws, and how to protect your family online.'
                      : '5 questions on identifying risks, safe online behavior, and what to do in dangerous situations.'}
                  </p>
                  <span className="inline-flex items-center gap-1.5 font-body text-sm font-semibold text-accent">
                    Start Quiz <ChevronRight className="h-4 w-4" />
                  </span>
                </button>
              ))}
            </motion.div>
          )}

          {/* Quiz in progress */}
          {mode && !done && question && (
            <motion.div
              key={`q-${current}`}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.35 }}
            >
              {/* Progress */}
              <div className="flex items-center justify-between mb-6">
                <span className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  {quiz.label}
                </span>
                <span className="font-body text-xs text-muted-foreground">
                  {current + 1} / {quiz.questions.length}
                </span>
              </div>
              <div className="w-full h-1.5 bg-border rounded-full mb-8">
                <div
                  className="h-1.5 bg-accent rounded-full transition-all duration-500"
                  style={{ width: `${((current + (confirmed ? 1 : 0)) / quiz.questions.length) * 100}%` }}
                />
              </div>

              {/* Question */}
              <div className="bg-card border border-border rounded-xl p-8 mb-6">
                <p className="font-heading text-lg lg:text-xl font-bold text-foreground leading-snug mb-8">
                  {question.question}
                </p>
                <div className="space-y-3">
                  {question.options.map((opt, idx) => {
                    let cls =
                      'w-full text-left px-5 py-4 rounded-lg border font-body text-sm leading-relaxed transition-all duration-200 ';
                    if (!confirmed) {
                      cls +=
                        selected === idx
                          ? 'border-accent bg-accent/10 text-foreground'
                          : 'border-border bg-background hover:border-accent/40 hover:bg-muted/50 text-muted-foreground';
                    } else {
                      if (idx === question.correct) {
                        cls += 'border-green-400 bg-green-50 text-green-800';
                      } else if (idx === selected && selected !== question.correct) {
                        cls += 'border-destructive bg-destructive/10 text-destructive';
                      } else {
                        cls += 'border-border bg-background text-muted-foreground opacity-50';
                      }
                    }
                    return (
                      <button key={idx} onClick={() => handleSelect(idx)} className={cls}>
                        <span className="flex items-start gap-3">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5"
                            style={{
                              borderColor:
                                confirmed && idx === question.correct
                                  ? '#16a34a'
                                  : confirmed && idx === selected && selected !== question.correct
                                  ? 'hsl(var(--destructive))'
                                  : selected === idx
                                  ? 'hsl(var(--accent))'
                                  : 'hsl(var(--border))',
                            }}
                          >
                            {confirmed && idx === question.correct && (
                              <CheckCircle2 className="w-3 h-3 text-green-600" />
                            )}
                            {confirmed && idx === selected && selected !== question.correct && (
                              <XCircle className="w-3 h-3 text-destructive" />
                            )}
                          </span>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Explanation */}
                <AnimatePresence>
                  {confirmed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`mt-6 p-4 rounded-lg border text-sm font-body leading-relaxed ${
                        selected === question.correct
                          ? 'bg-green-50 border-green-200 text-green-800'
                          : 'bg-destructive/10 border-destructive/20 text-foreground'
                      }`}
                    >
                      <strong className="block mb-1">
                        {selected === question.correct ? '✓ Correct!' : '✗ Incorrect'}
                      </strong>
                      {question.explanation}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleReset}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Restart
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={selected === null || confirmed}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {confirmed ? 'Loading next…' : 'Confirm Answer'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {done && feedback && (
            <motion.div
              key="results"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              <div className={`rounded-xl border p-8 mb-8 ${feedback.bg}`}>
                <div className="flex items-start gap-4">
                  <feedback.icon className={`h-8 w-8 flex-shrink-0 mt-1 ${feedback.color}`} />
                  <div>
                    <p className="font-body text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-1">
                      Your Result
                    </p>
                    <h3 className={`font-heading text-2xl font-bold mb-1 ${feedback.color}`}>
                      {feedback.level}
                    </h3>
                    <p className="font-heading text-4xl font-bold text-foreground mb-4">
                      {score} / {quiz.questions.length}
                    </p>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed">
                      {feedback.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Per-question summary */}
              <div className="bg-card border border-border rounded-xl p-6 mb-8">
                <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider mb-5">
                  Question Summary
                </h4>
                <div className="space-y-3">
                  {quiz.questions.map((q, i) => (
                    <div key={i} className="flex items-start gap-3">
                      {answers[i] ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                      )}
                      <p className="font-body text-sm text-muted-foreground leading-snug">{q.question}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90"
                >
                  <RotateCcw className="h-4 w-4" /> Take Another Quiz
                </button>
                <button
                  onClick={() => { setCurrent(0); setSelected(null); setConfirmed(false); setAnswers([]); setDone(false); }}
                  className="inline-flex items-center gap-2 border border-border bg-card text-foreground px-8 py-3 rounded-lg font-body font-semibold text-sm transition-all hover:border-accent/40"
                >
                  Retry This Quiz
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}