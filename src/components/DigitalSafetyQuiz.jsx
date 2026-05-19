import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, ChevronRight, RotateCcw,
  Shield, AlertTriangle, BookOpen, GraduationCap, ChevronDown, ChevronUp
} from 'lucide-react';
import ScrollReveal from './ScrollReveal';

/**
 * @typedef {{ question: string, options: string[], correct: number, explanation: string }} QuizQuestion
 * @typedef {{ label: string, description: string, icon: any, color: string, activeColor: string, iconBg: string, iconColor: string, questions: QuizQuestion[] }} QuizSet
 */

/** @type {Record<string, QuizSet>} */
const QUIZ_SETS = {
  parents: {
    label: 'Parents & Guardians',
    description: '5 questions on recognizing grooming, Philippine child protection laws, and how to keep your family safe online.',
    icon: Shield,
    color: 'border-blue-200 bg-blue-50',
    activeColor: 'border-primary bg-primary/5',
    iconBg: 'bg-blue-100',
    iconColor: 'text-primary',
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
          'Online grooming is a manipulative process where a perpetrator builds emotional trust with a child over time — often posing as a peer — with the intent to exploit them sexually. Roche et al. (2023) identified grooming as the primary method used by perpetrators in Philippine OSAEC cases.',
      },
      {
        question: 'Which behavior is a warning sign that your child may be experiencing online grooming?',
        options: [
          'Spending more time reading books',
          'Suddenly switching screens or closing apps when you enter the room',
          'Asking to spend more time with the family offline',
          'Declining to use new apps or platforms',
        ],
        correct: 1,
        explanation:
          'Secretive behavior around devices — such as quickly hiding screens — is a documented behavioral warning sign. UNICEF Philippines (2021) lists this alongside unexplained gifts, withdrawal from family, and emotional changes as red flags parents should monitor.',
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
          'RA 11930 mandates that internet intermediaries — including social media platforms, messaging apps, and ISPs — actively detect, report, preserve, and remove OSAEC content. This shifts significant legal responsibility onto platform providers (Republic Act No. 11930, 2022).',
      },
      {
        question: 'Under the Data Privacy Act (RA 10173), who may file a complaint with the National Privacy Commission on behalf of a minor child?',
        options: [
          'Only adults aged 18 and above may file',
          'Parents or legal guardians may file on behalf of a child at any age',
          'Children must be at least 15 years old to be represented',
          'Only the child themselves may file the complaint',
        ],
        correct: 1,
        explanation:
          'Under the Data Privacy Act of 2012 (RA 10173), parents or legal guardians can file complaints with the National Privacy Commission on behalf of their children at any age. There is no minimum age restriction for representative complaints.',
      },
      {
        question: 'Which government hotline can Filipino families use to report online child rights violations?',
        options: [
          'MAKABATA Helpline 1383',
          'Dial 117',
          'NBI Cybercrime Division Hotline 166',
          'DSWD Social Welfare Hotline 931',
        ],
        correct: 0,
        explanation:
          'The MAKABATA Helpline 1383 is the official government channel for reporting child rights violations, including online exploitation. UNICEF Philippines (2024) found that only 13.52% of young Filipinos were aware of this helpline, highlighting the urgent need for broader awareness.',
      },
    ],
  },
  students: {
    label: 'Students (Ages 12–17)',
    description: '5 questions on identifying online risks, safe behavior, and what to do in dangerous situations.',
    icon: BookOpen,
    color: 'border-green-200 bg-green-50',
    activeColor: 'border-accent bg-accent/5',
    iconBg: 'bg-green-100',
    iconColor: 'text-accent',
    questions: [
      {
        question: 'Someone you met online asks to move your conversation from a public app to a private messaging app. What should you do?',
        options: [
          'Agree — private apps are more secure',
          'Share your number since they seem friendly',
          'Decline and tell a trusted adult about the request',
          'Block them immediately without telling anyone',
        ],
        correct: 2,
        explanation:
          'Asking to move to a private platform is a recognized grooming tactic used to isolate victims from public oversight. The correct response is to decline and immediately inform a trusted adult. Telling someone creates a record and keeps you protected (Roche et al., 2023).',
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
          'Your digital footprint includes every photo, post, comment, search, and message you create or share online. This information can be stored permanently and accessed by others — including potential predators. Awareness of your footprint is a core digital literacy skill (UNICEF Philippines, 2021).',
      },
      {
        question: 'An online contact asks you to send a photo of yourself "just for them." What should you do?',
        options: [
          'It is normal to share selfies with online friends',
          'Refuse, do not delete the conversation, and report it to a trusted adult',
          'Send a photo only if they have sent one first',
          'Ask your friends if the person seems trustworthy',
        ],
        correct: 1,
        explanation:
          'Soliciting images from minors is illegal under Republic Act No. 9775 (Anti-Child Pornography Act, 2009) and RA 11930 (2022). You should refuse, preserve the conversation as evidence, and report to a trusted adult or the PNP Anti-Cybercrime Group.',
      },
      {
        question: 'Which of the following best describes "sextortion"?',
        options: [
          'A type of online game with mature content ratings',
          'When someone threatens to share your private images unless you comply with their demands',
          'A parental control software for blocking adult websites',
          'A privacy setting on social media platforms',
        ],
        correct: 1,
        explanation:
          'Sextortion is a form of online blackmail where a perpetrator threatens to release private or sexual images of a victim unless they send money, more images, or perform sexual acts. RA 11930 (2022) specifically criminalizes this behavior. Victims should report immediately rather than comply.',
      },
      {
        question: 'A classmate shows you a sexual image of another student shared without their consent. What is the correct action?',
        options: [
          'Forward it to others to see if they recognize the person',
          'Save it in case it is needed as evidence later',
          'Do not share it; report to a school official or trusted adult immediately',
          'Ask the person in the image if they are aware it is circulating',
        ],
        correct: 2,
        explanation:
          'Forwarding or saving the image makes you legally liable under Philippine law. The correct action is to refuse to share it and report it to a responsible adult. You are protected from retaliation when reporting in good faith (Republic Act No. 9775, 2009; RA 11930, 2022).',
      },
    ],
  },
  educators: {
    label: 'Educators & School Staff',
    description: '5 questions on institutional responsibilities, curriculum integration, and responding to student disclosures.',
    icon: GraduationCap,
    color: 'border-purple-200 bg-purple-50',
    activeColor: 'border-purple-600 bg-purple-50',
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    questions: [
      {
        question: 'A student discloses to you that an adult online has been sending them gifts and asking for photos. What should your immediate response be?',
        options: [
          'Advise the student to block the person and monitor the situation yourself',
          'Ensure the student\'s safety, listen without judgment, and immediately report to school administration and proper authorities',
          'Investigate the situation independently before reporting',
          'Notify the student\'s parents and wait for them to take action',
        ],
        correct: 1,
        explanation:
          'Best practice in child safeguarding requires that educators listen without judgment, ensure the child\'s immediate safety, and follow mandatory reporting protocols. Investigating independently can compromise evidence and retraumatize the child. RA 7610 (1992) imposes mandatory reporting obligations on all adults aware of child abuse.',
      },
      {
        question: 'Which Republic Act imposes the broadest mandatory reporting obligation on all Filipino adults — including teachers — who are aware of child abuse?',
        options: [
          'Republic Act No. 10175 (Cybercrime Prevention Act)',
          'Republic Act No. 7610 (Special Protection of Children Act)',
          'Republic Act No. 10173 (Data Privacy Act)',
          'Republic Act No. 9775 (Anti-Child Pornography Act)',
        ],
        correct: 1,
        explanation:
          'Republic Act No. 7610 (1992), the Special Protection of Children Against Abuse, Exploitation and Discrimination Act, is the foundational law establishing mandatory reporting obligations for all Filipino adults who have knowledge of child abuse, including school personnel.',
      },
      {
        question: 'According to UNICEF Philippines (2024), approximately what percentage of young Filipino respondents were aware of the MAKABATA 1383 helpline?',
        options: [
          'About 60%',
          'About 35%',
          'About 13.5%',
          'About 80%',
        ],
        correct: 2,
        explanation:
          'A U-Report poll by UNICEF Philippines (2024) found that only 13.52% of young respondents were familiar with the MAKABATA Helpline 1383 — despite it being the official government channel for reporting child rights violations. This data underscores the critical role educators play in disseminating safety information.',
      },
      {
        question: 'What does the Department of Education\'s integration of digital citizenship education primarily aim to address?',
        options: [
          'Improving students\' typing speed and computer literacy',
          'Helping students safely navigate online spaces, recognize threats, and respond appropriately',
          'Ensuring all students have access to high-speed internet',
          'Teaching students how to build websites and code',
        ],
        correct: 1,
        explanation:
          'Digital citizenship education focuses on the safe, ethical, and responsible use of technology. It encompasses recognizing online threats, managing privacy, and responding to dangerous situations — precisely the skills identified as absent among vulnerable Filipino youth (UNICEF Philippines, 2021; OpenGov Asia, 2024).',
      },
      {
        question: 'Which of the following best describes the ACM Code of Ethics principle most relevant to an educator designing digital safety curricula?',
        options: [
          'Prioritize institutional efficiency over individual student concerns',
          'Avoid harm and take action to prevent foreseeable risks to vulnerable populations',
          'Disclose all student information to platform providers for safety monitoring',
          'Rely exclusively on government-mandated materials without supplementation',
        ],
        correct: 1,
        explanation:
          'The ACM Code of Ethics and Professional Conduct (Association for Computing Machinery, 2018) prioritizes avoiding harm and taking proactive measures to protect vulnerable individuals. For educators, this means designing curricula that actively addresses the documented risks facing Filipino children online.',
      },
    ],
  },
};

const SCORE_FEEDBACK = [
  {
    min: 0, max: 1,
    level: 'Needs Improvement',
    color: 'text-red-600',
    ringColor: '#dc2626',
    bg: 'bg-red-50 border-red-200',
    icon: AlertTriangle,
    message: 'There are significant gaps in your current knowledge of online safety. This is common — most Filipinos have not received formal digital safety education. We strongly encourage you to explore the Laws and Solutions sections of this platform to build a stronger foundation for protecting yourself and your family.',
  },
  {
    min: 2, max: 3,
    level: 'Developing Awareness',
    color: 'text-yellow-600',
    ringColor: '#d97706',
    bg: 'bg-yellow-50 border-yellow-200',
    icon: Shield,
    message: 'You have a foundational understanding of some online safety concepts, but there are important areas to strengthen. Review the questions you answered incorrectly and read the explanations. The Laws and Solutions sections offer deeper context on each topic covered here.',
  },
  {
    min: 4, max: 4,
    level: 'Strong Awareness',
    color: 'text-accent',
    ringColor: '#16a34a',
    bg: 'bg-accent/10 border-accent/20',
    icon: Shield,
    message: 'You demonstrate a strong understanding of online safety principles and are well-positioned to protect yourself and those around you. Stay updated on evolving threats — perpetrators constantly adapt their tactics — and consider sharing this platform with others in your community.',
  },
  {
    min: 5, max: 5,
    level: 'Digital Safety Champion',
    color: 'text-accent',
    ringColor: '#16a34a',
    bg: 'bg-accent/10 border-accent/20',
    icon: CheckCircle2,
    message: 'Excellent! You answered every question correctly and demonstrate comprehensive knowledge of online safety, digital literacy, and Philippine child protection law. You are equipped to be an advocate in your community. Consider sharing SafeNet PH with parents, teachers, and students who may benefit.',
  },
];

/** @param {number} score */
function getFeedback(score) {
  return SCORE_FEEDBACK.find((f) => score >= f.min && score <= f.max);
}

/**
 * @param {{ score: number, total: number, color: string }} props
 */
function ScoreRing({ score, total, color }) {
  const pct = score / total;
  const r = 52;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct);
  return (
    <div className="relative w-36 h-36 flex-shrink-0">
      <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
        <circle cx="60" cy="60" r={r} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
        <motion.circle
          cx="60" cy="60" r={r} fill="none"
          stroke={color} strokeWidth="10"
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <motion.span
          className="font-heading text-4xl font-black text-foreground"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
        >
          {score}
        </motion.span>
        <span className="font-body text-sm text-muted-foreground">/ {total}</span>
      </div>
    </div>
  );
}

/**
 * @param {{ question: any, userCorrect: boolean, userAnswerIdx: number }} props
 */
function QuestionReviewItem({ question, userCorrect, userAnswerIdx }) {
  const [open, setOpen] = useState(false);
  return (
    <div className={`rounded-xl border overflow-hidden transition-all ${userCorrect ? 'border-green-200 bg-green-50/50' : 'border-red-200 bg-red-50/50'}`}>
      <button
        className="w-full text-left flex items-start gap-3 p-4"
        onClick={() => setOpen(!open)}
      >
        {userCorrect
          ? <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
          : <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
        }
        <span className="font-body text-sm text-foreground leading-snug flex-1">{question.question}</span>
        {open ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" /> : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />}
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-3">
              {!userCorrect && (
                <div className="text-xs font-body">
                  <span className="text-red-600 font-semibold">Your answer: </span>
                  <span className="text-red-700">{question.options[userAnswerIdx]}</span>
                </div>
              )}
              <div className="text-xs font-body">
                <span className="text-green-700 font-semibold">Correct answer: </span>
                <span className="text-green-800">{question.options[question.correct]}</span>
              </div>
              <p className="font-body text-xs text-muted-foreground leading-relaxed border-t border-border/50 pt-3">
                {question.explanation}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DigitalSafetyQuiz() {
  // ✅ Fix: all useState calls explicitly typed
  const [mode, setMode] = useState(/** @type {string | null} */ (null));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(/** @type {number | null} */ (null));
  const [confirmed, setConfirmed] = useState(false);
  const [answers, setAnswers] = useState(/** @type {{ correct: boolean, idx: number }[]} */ ([]));
  const [done, setDone] = useState(false);

  const quiz = mode ? QUIZ_SETS[mode] : null;
  const question = quiz ? quiz.questions[current] : null;
  const score = answers.filter((a) => a.correct).length;

  /** @param {number} idx */
  const handleSelect = (idx) => {
    if (confirmed) return;
    setSelected(idx);
  };

  const handleConfirm = () => {
    if (selected === null || !question || !quiz) return;
    setConfirmed(true);
    const correct = selected === question.correct;
    const newAnswers = [...answers, { correct, idx: selected }];

    if (current + 1 === quiz.questions.length) {
      setTimeout(() => {
        setAnswers(newAnswers);
        setDone(true);
      }, 1400);
    } else {
      setTimeout(() => {
        setAnswers(newAnswers);
        setCurrent(current + 1);
        setSelected(null);
        setConfirmed(false);
      }, 1400);
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

  const handleRetry = () => {
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
          <span className="inline-block font-body text-xs font-bold tracking-widest uppercase text-accent mb-4 bg-accent/10 px-3 py-1 rounded-full">
            Interactive Assessment
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground leading-tight mb-3">
            Test Your Digital Safety Knowledge
          </h2>
          <p className="font-body text-base text-muted-foreground leading-relaxed mb-10">
            Choose a quiz for your role and receive instant, research-backed feedback on each answer. All explanations cite peer-reviewed studies and Philippine legislation.
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
              className="grid grid-cols-1 gap-4"
            >
              {Object.entries(QUIZ_SETS).map(([key, set], i) => (
                <motion.button
                  key={key}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => setMode(key)}
                  className={`group text-left border-2 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 ${set.color}`}
                >
                  <div className="flex items-start gap-5">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${set.iconBg}`}>
                      <set.icon className={`h-6 w-6 ${set.iconColor}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading text-lg font-bold text-foreground mb-1">
                          {set.label}
                        </h3>
                        <span className="font-body text-xs text-muted-foreground border border-border/60 px-2 py-0.5 rounded-full">
                          5 questions
                        </span>
                      </div>
                      <p className="font-body text-sm text-muted-foreground leading-relaxed">
                        {set.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {/* Quiz in progress */}
          {mode && !done && question && quiz && (
            <motion.div
              key={`q-${current}`}
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -28 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-3">
                <span className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground">
                  {quiz.label}
                </span>
                <span className="font-body text-xs font-bold text-muted-foreground bg-card border border-border px-3 py-1 rounded-full">
                  {current + 1} / {quiz.questions.length}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2 bg-border rounded-full mb-8 overflow-hidden">
                <motion.div
                  className="h-2 bg-accent rounded-full"
                  initial={{ width: `${(current / quiz.questions.length) * 100}%` }}
                  animate={{ width: `${((current + (confirmed ? 1 : 0)) / quiz.questions.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Question card */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 mb-5">
                <p className="font-heading text-lg lg:text-xl font-bold text-foreground leading-snug mb-7">
                  {question.question}
                </p>
                <div className="space-y-3">
                  {question.options.map((/** @type {string} */ opt, idx) => {
                    const isCorrect = idx === question.correct;
                    const isChosen = idx === selected;

                    let cls = 'w-full text-left px-5 py-4 rounded-xl border-2 font-body text-sm leading-relaxed transition-all duration-200 cursor-pointer ';
                    if (!confirmed) {
                      cls += isChosen
                        ? 'border-accent bg-accent/10 text-foreground font-medium'
                        : 'border-border bg-background hover:border-accent/50 hover:bg-muted/40 text-muted-foreground';
                    } else {
                      if (isCorrect) cls += 'border-green-400 bg-green-50 text-green-800 font-medium';
                      else if (isChosen) cls += 'border-red-400 bg-red-50 text-red-800';
                      else cls += 'border-border bg-background text-muted-foreground opacity-40';
                    }

                    return (
                      <button key={idx} onClick={() => handleSelect(idx)} className={cls}>
                        <span className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                            confirmed && isCorrect ? 'border-green-500 bg-green-100'
                            : confirmed && isChosen && !isCorrect ? 'border-red-400 bg-red-100'
                            : isChosen ? 'border-accent bg-accent/20'
                            : 'border-border'
                          }`}>
                            {confirmed && isCorrect && <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />}
                            {confirmed && isChosen && !isCorrect && <XCircle className="w-3.5 h-3.5 text-red-500" />}
                          </span>
                          {opt}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Inline explanation */}
                <AnimatePresence>
                  {confirmed && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginTop: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35 }}
                      className={`overflow-hidden rounded-xl border p-5 font-body text-sm leading-relaxed ${
                        selected === question.correct
                          ? 'bg-green-50 border-green-200 text-green-900'
                          : 'bg-red-50 border-red-200 text-red-900'
                      }`}
                    >
                      <p className="font-bold mb-1">
                        {selected === question.correct ? 'Correct!' : 'Incorrect'}
                      </p>
                      <p>{question.explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex items-center justify-between">
                <button
                  onClick={handleReset}
                  className="font-body text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                >
                  <RotateCcw className="h-3.5 w-3.5" /> Exit Quiz
                </button>
                <button
                  onClick={handleConfirm}
                  disabled={selected === null || confirmed}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-3 rounded-xl font-body font-bold text-sm transition-all hover:bg-accent/90 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  {confirmed ? 'Next question…' : 'Confirm Answer'}
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Results */}
          {done && feedback && quiz && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45 }}
            >
              {/* Score hero */}
              <div className={`rounded-2xl border-2 p-6 md:p-8 mb-6 ${feedback.bg}`}>
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <ScoreRing score={score} total={quiz.questions.length} color={feedback.ringColor} />
                  <div className="text-center sm:text-left">
                    <p className="font-body text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
                      Your Result — {quiz.label}
                    </p>
                    <h3 className={`font-heading text-2xl font-black mb-3 ${feedback.color}`}>
                      {feedback.level}
                    </h3>
                    <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-lg">
                      {feedback.message}
                    </p>
                  </div>
                </div>
              </div>

              {/* Per-question review */}
              <div className="mb-6">
                <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider mb-4">
                  Question Review
                </h4>
                <div className="space-y-3">
                  {quiz.questions.map((/** @type {QuizQuestion} */ q, i) => (
                    <QuestionReviewItem
                      key={i}
                      question={q}
                      userCorrect={answers[i]?.correct}
                      userAnswerIdx={answers[i]?.idx}
                    />
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <button
                  onClick={handleRetry}
                  className="inline-flex items-center gap-2 border-2 border-border bg-card text-foreground px-6 py-3 rounded-xl font-body font-bold text-sm transition-all hover:border-accent/40"
                >
                  <RotateCcw className="h-4 w-4" /> Retry This Quiz
                </button>
                <button
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl font-body font-bold text-sm transition-all hover:bg-accent/90"
                >
                  Take a Different Quiz
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}