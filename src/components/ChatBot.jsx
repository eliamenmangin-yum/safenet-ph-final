import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Shield, Loader2, ChevronLeft, Phone, Globe, BookOpen, Users, AlertTriangle, Scale, Lock, HelpCircle, Gamepad2, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Session ID (unique per browser tab) ─────────────────────────────────────
const SESSION_ID = (() => {
  const key = 'safebot_session_id';
  const existing = sessionStorage.getItem(key);
  if (existing) return existing;
  const id = Math.random().toString(36).slice(2);
  sessionStorage.setItem(key, id);
  return id;
})();

// ─── localStorage helpers for per-mode chat history ──────────────────────────
const STORAGE_KEY = (mode) => `safebot_history_${mode}`;

function loadHistory(mode) {
  try {
    const raw = localStorage.getItem(STORAGE_KEY(mode));
    if (!raw) return [];
    return JSON.parse(raw);
  } catch { return []; }
}

function saveHistory(mode, messages) {
  try {
    localStorage.setItem(STORAGE_KEY(mode), JSON.stringify(messages.slice(-40)));
  } catch { /* fail silently */ }
}

// ─── Suggestion chips per mode (trilingual) ───────────────────────────────────
const MODE_SUGGESTIONS = {
  PARENT: {
    EN:  ['Signs my child is being groomed online', 'How to set parental controls on Android', 'My child received a suspicious message', 'How to talk to my child about online safety'],
    FIL: ['Paano malalaman kung ginugrumo ang anak ko?', 'Paano mag-set ng parental controls sa Android?', 'Natanggap ng anak ko ang kahina-hinalang mensahe', 'Paano makikipag-usap sa anak tungkol sa online safety?'],
    BIS: ['Unsaon nako paghibalo kung gi-groom ang akong anak online?', 'Unsaon mag-set ug parental controls sa Android?', 'Nakadawat ug suspicious na mensahe ang akong anak', 'Unsaon makigsulti sa akong anak bahin sa online safety?'],
  },
  CHILD: {
    EN:  ['What is online grooming?', 'Is it safe to share my school name online?', 'Someone is bullying me in a game chat', 'I got a message saying I won a prize'],
    FIL: ['Ano ang online grooming?', 'Pwede bang ibahagi ang pangalan ng aking paaralan?', 'May nambubully sa akin sa game chat', 'May nag-message na nanalo raw ako ng premyo'],
    BIS: ['Unsa ang online grooming?', 'Pwede ba nako isulti ang ngalan sa akong eskwelahan online?', 'May nag-bully nako sa game chat', 'May nag-message nako nga nanalo ko ug premyo'],
  },
  TEACHER: {
    EN:  ['How to teach online safety to Grade 5', 'Activities about cyberbullying for class', 'DepEd-aligned lesson plan for internet safety', 'How to explain phishing to children'],
    FIL: ['Paano ituturo ang online safety sa Grade 5?', 'Mga aktibidad tungkol sa cyberbullying para sa klase', 'Lesson plan tungkol sa internet safety na aligned sa DepEd', 'Paano ipaliwanag ang phishing sa mga bata?'],
    BIS: ['Unsaon pagtudlo ug online safety sa Grade 5?', 'Mga aktibidad bahin sa cyberbullying para sa klase', 'Lesson plan para sa internet safety aligned sa DepEd', 'Unsaon pagpasabot sa phishing sa mga bata?'],
  },
  EMERGENCY: {
    EN:  ['Someone is threatening me online right now', 'I shared personal info with a stranger', 'I need help reporting something urgent'],
    FIL: ['May nagbabanta sa akin online ngayon', 'Nagbigay na ako ng personal na impormasyon sa isang estranyo', 'Kailangan ko ng tulong para mag-report'],
    BIS: ['Adunay nagpadala ug threatening mensahe nako karon', 'Gihatagan nako ug personal na impormasyon ang usa ka estranyo', 'Kailangan nako ug tabang para mag-report'],
  },
};

const MODES = [
  { id: 'PARENT',    label: 'Parent',    labelFil: 'Magulang',  labelBis: 'Ginikanan',   icon: Users,         color: 'text-blue-600'   },
  { id: 'CHILD',     label: 'Child',     labelFil: 'Bata',      labelBis: 'Bata',        icon: Shield,        color: 'text-green-600'  },
  { id: 'TEACHER',   label: 'Teacher',   labelFil: 'Guro',      labelBis: 'Magtutudlo',  icon: GraduationCap, color: 'text-purple-600' },
  { id: 'EMERGENCY', label: 'Emergency', labelFil: 'Emergency', labelBis: 'Emergency',   icon: AlertTriangle, color: 'text-red-600'    },
];

const QUICK_ACTIONS = {
  PARENT: [
    { label: 'App Safety Checker', prompt: 'Which apps are safe for children?' },
    { label: 'Privacy Settings', prompt: 'How do I set up privacy settings to protect my child?' },
    { label: 'Signs of Grooming', prompt: 'What are the warning signs of online grooming?' },
    { label: 'Report an Incident', prompt: 'How do I report online exploitation of my child?' },
  ],
  CHILD: [
    { label: 'Stranger Danger Online', prompt: 'What do I do if a stranger messages me online?' },
    { label: 'Cyberbullying Help', prompt: 'Someone is bullying me online, what should I do?' },
    { label: 'Photo Safety', prompt: 'Is it safe to share my photo online?' },
    { label: 'Uncomfortable Messages', prompt: 'Someone is sending me uncomfortable messages online' },
  ],
  TEACHER: [
    { label: 'Lesson Ideas', prompt: 'Give me a lesson plan idea about online safety for Grade 5' },
    { label: 'Classroom Activity', prompt: 'What activity can I do in class about cyberbullying?' },
    { label: 'Student Disclosure', prompt: 'A student told me they are being threatened online, what do I do?' },
    { label: 'Parent Seminar Tips', prompt: 'How can I educate parents about OSAEC in a seminar?' },
  ],
  EMERGENCY: [
    { label: 'My child is in danger', prompt: 'My child is being sexually exploited online right now' },
    { label: 'I am being threatened', prompt: 'Someone is threatening to share my private photos online' },
  ],
};

const EMERGENCY_CONTACTS = [
  { name: 'PNP Anti-Cybercrime Group', number: '#0998-598-8102', type: 'call' },
  { name: 'MAKABATA Helpline', number: '1383', type: 'call' },
  { name: 'PICACC', number: 'https://picacc.gov.ph', type: 'web' },
  { name: 'DSWD Hotline', number: '0931-755-3702', type: 'call' },
];

const GREETINGS = {
  PARENT: {
    EN:  "Hello! I'm <strong>SafeNet PH Bot</strong> in Parent Mode.<br/><br/>I'm here to help you understand online risks, recognize warning signs, and protect your child. What would you like to know?",
    FIL: "Magandang araw po! Ako si <strong>SafeNet PH Bot</strong>.<br/><br/>Narito ako para tulungan kayong protektahan ang inyong anak online. Ano ang gusto ninyong malaman?",
    BIS: "Maayong adlaw! Ako si <strong>SafeNet PH Bot</strong>.<br/><br/>Naa ko diri para tabangan kamo og protektahan ang inyong anak online. Unsa ang gusto ninyong mahibal-an?",
  },
  CHILD: {
    EN:  "Hello! I'm <strong>SafeNet PH Bot</strong> 👋<br/><br/>I'm here to help you stay safe online. You can ask me anything — I won't judge you!",
    FIL: "Kamusta! Ako si <strong>SafeNet PH Bot</strong> 👋<br/><br/>Narito ako para tulungan kang manatiling ligtas online. Magtanong ka lang!",
    BIS: "Kumusta! Ako si <strong>SafeNet PH Bot</strong> 👋<br/><br/>Naa ko diri para tabangan ka nga luwas ka online. Mangutana lang ka — dili ko maghukom!",
  },
  TEACHER: {
    EN:  "Good day, Teacher! I'm <strong>SafeNet PH Bot</strong> in Teacher Mode.<br/><br/>I can help you plan online safety lessons and classroom discussions. What do you need today?",
    FIL: "Magandang araw po, Guro! Ako si <strong>SafeNet PH Bot</strong>.<br/><br/>Makakatulong ako sa pagplanong mga aralin tungkol sa online safety. Ano ang kailangan ninyo?",
    BIS: "Maayong adlaw, Teacher! Ako si <strong>SafeNet PH Bot</strong>.<br/><br/>Makatabang ko nimo sa pagplano ug mga leksyon bahin sa online safety. Unsa ang imong kailangan karon?",
  },
  EMERGENCY: {
    EN:  "⚠️ <strong>Emergency Mode.</strong><br/><br/>If you are in immediate physical danger, please call <strong>911</strong> first.<br/><br/>For online safety emergencies:<br/>📞 PNP-ACG: <strong>#0998-598-8102</strong><br/>📞 MAKABATA: <strong>1383</strong><br/>📞 DSWD: <strong>0931-755-3702</strong><br/><br/>Describe your situation below — you are not alone.",
    FIL: "⚠️ <strong>Emergency Mode.</strong><br/><br/>Kung nasa agarang panganib ka, tumawag sa <strong>911</strong>.<br/><br/>Para sa online safety:<br/>📞 PNP-ACG: <strong>#0998-598-8102</strong><br/>📞 MAKABATA: <strong>1383</strong><br/>📞 DSWD: <strong>0931-755-3702</strong><br/><br/>Sabihin mo sa akin ang iyong sitwasyon. Nandito lang ako.",
    BIS: "⚠️ <strong>Emergency Mode.</strong><br/><br/>Kung naa ka sa agarang peligro, tawag dayon sa <strong>911</strong>.<br/><br/>Para sa online safety:<br/>📞 PNP-ACG: <strong>#0998-598-8102</strong><br/>📞 MAKABATA: <strong>1383</strong><br/>📞 DSWD: <strong>0931-755-3702</strong><br/><br/>Sultihi ko ang imong sitwasyon. Naa ko diri, dili ka nag-inusara.",
  },
};

// ─── API call — sends mode/lang/sessionId to backend ─────────────────────────
async function callAI(messages, mode, lang, sessionId) {
  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages: messages.map(m => ({ role: m.role, content: m.content })),
      mode: mode.toLowerCase(),
      lang: lang === 'FIL' ? 'fil' : lang === 'BIS' ? 'bis' : 'en',
      sessionId,
    }),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err?.error ?? `Server error ${response.status}`);
  }
  const data = await response.json();
  return data.reply || 'Sorry, I could not process that. Please try again.';
}

// ─── Emergency number highlighter ────────────────────────────────────────────
const EMERGENCY_NUMBER_RE = /(#?0998[-\s]?598[-\s]?8102|1383|0931[-\s]?755[-\s]?3702|911)/g;

function highlightNumbers(html) {
  return html.replace(
    EMERGENCY_NUMBER_RE,
    `<span style="display:inline-flex;align-items:center;gap:4px;background:#fef2f2;border:1px solid #fca5a5;color:#c0392b;font-weight:700;border-radius:999px;padding:1px 8px;font-size:12px;white-space:nowrap;">📞 $1</span>`
  );
}

// ─── Render HTML messages safely ──────────────────────────────────────────────
function MessageContent({ content }) {
  if (/<[a-z][\s\S]*>/i.test(content)) {
    return <div dangerouslySetInnerHTML={{ __html: highlightNumbers(content) }} />;
  }

  const html = content
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+?)\*/g, '<em>$1</em>')
    .split('\n')
    .map(line => line || '<br/>')
    .join('<br/>');

  return <div dangerouslySetInnerHTML={{ __html: highlightNumbers(html) }} />;
}

export default function ChatBot() {
  const [isOpen, setIsOpen]       = useState(false);
  const [screen, setScreen]       = useState('home');
  const [mode, setMode]           = useState(null);
  const [lang, setLang]           = useState('EN');
  const [messages, setMessages]   = useState([]);
  const [input, setInput]         = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chips, setChips]         = useState([]);
  const [showChips, setShowChips] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef       = useRef(null);

  // ─── Trilingual text helper ───────────────────────────────────────────────
  const t = (en, fil, bis) => lang === 'EN' ? en : lang === 'FIL' ? fil : bis;

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);
  useEffect(() => { if (screen === 'chat') inputRef.current?.focus(); }, [screen]);

  useEffect(() => {
    if (screen === 'chat' && mode && messages.length > 0) {
      saveHistory(mode, messages);
    }
  }, [messages, mode, screen]);

  // One-time migration: clear old chat histories
  useEffect(() => {
    const MIGRATION_KEY = 'safebot_v2_migrated';
    if (!localStorage.getItem(MIGRATION_KEY)) {
      MODES.forEach(m => { localStorage.removeItem(STORAGE_KEY(m.id)); });
      localStorage.setItem(MIGRATION_KEY, 'true');
      console.log('✅ SafeNet Bot: Old chat histories cleared');
    }
  }, []);

  const sendToApi = useCallback(async (history, activeMode, activeLang) => {
    setIsLoading(true);
    try {
      const reply = await callAI(history, activeMode, activeLang, SESSION_ID);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch (err) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `<span style="color:#c0392b">⚠️ Could not reach SafeNet Bot. Please try again.<br/><small style="opacity:.7">${err.message}</small></span>`,
      }]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const startChat = useCallback((selectedMode, autoPrompt) => {
    const savedHistory = loadHistory(selectedMode);
    const hasHistory = savedHistory.length > 0 && !autoPrompt;

    setMode(selectedMode);
    setInput('');
    setScreen('chat');

    if (hasHistory) {
      setMessages(savedHistory);
      setShowChips(false);
      setChips([]);
    } else {
      const greeting = { role: 'assistant', content: GREETINGS[selectedMode][lang] };
      const suggestions = MODE_SUGGESTIONS[selectedMode]?.[lang] ?? [];
      setChips(suggestions.slice(0, 2));
      setShowChips(true);

      if (autoPrompt) {
        const userMsg = { role: 'user', content: autoPrompt };
        const history = [greeting, userMsg];
        setMessages(history);
        setShowChips(false);
        sendToApi(history, selectedMode, lang);
      } else {
        setMessages([greeting]);
      }
    }
  }, [lang, sendToApi]);

  const goHome = () => {
    setScreen('home');
    setMode(null);
    setMessages([]);
    setInput('');
    setChips([]);
    setShowChips(false);
    setIsLoading(false);
  };

  // ─── Cycle through EN → FIL → BIS → EN ───────────────────────────────────
  const toggleLang = () => {
    const next = lang === 'EN' ? 'FIL' : lang === 'FIL' ? 'BIS' : 'EN';
    setLang(next);
    if (screen === 'chat' && mode) {
      setChips((MODE_SUGGESTIONS[mode]?.[next] ?? []).slice(0, 2));
      if (messages.length <= 1) {
        setMessages([{ role: 'assistant', content: GREETINGS[mode][next] }]);
        setShowChips(true);
      }
    }
  };

  const sendMessage = useCallback(async (text) => {
    const userText = (text ?? input).trim();
    if (!userText || isLoading) return;

    setShowChips(false);
    setInput('');

    const userMsg = { role: 'user', content: userText };
    const nextHistory = [...messages, userMsg];
    setMessages(nextHistory);
    await sendToApi(nextHistory, mode, lang);
  }, [input, isLoading, messages, mode, lang, sendToApi]);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const quickActions = mode ? (QUICK_ACTIONS[mode] ?? []) : [];

  return (
    <>
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-accent text-accent-foreground px-5 py-3.5 rounded-full shadow-xl shadow-accent/30 hover:bg-accent/90 transition-colors"
          >
            <Shield className="h-4 w-4" />
            <span className="font-body text-sm font-semibold">SafeNet Bot</span>
            <MessageCircle className="h-4 w-4" />
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 40, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[92vw] max-w-sm flex flex-col rounded-2xl overflow-hidden shadow-2xl shadow-primary/30 border border-border/50 bg-background"
            style={{ height: '620px' }}
          >

            {/* ── Header ── */}
            <div className="flex items-center justify-between px-4 py-3 bg-primary flex-shrink-0">

              {/* Left Side */}
              <div className="flex items-center gap-2.5">
                {screen === 'chat' && (
                  <button
                    onClick={goHome}
                    className="p-1 text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}

                <div className="h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-accent" />
                </div>

                <div>
                  <p className="font-heading text-sm font-bold text-primary-foreground leading-none">
                    SafeNet PH Bot
                  </p>
                  <p className="font-body text-[10px] text-primary-foreground/50 leading-none mt-0.5">
                    {mode ? `${mode} Mode` : t('Online Safety Assistant', 'Online Safety Assistant', 'Online Safety Assistant')}
                  </p>
                </div>
              </div>

              {/* Right Side */}
              <div className="flex items-center gap-1.5">

                {/* Language Button — cycles EN → FIL → BIS */}
                <button
                  onClick={toggleLang}
                  className="px-2 py-1 text-[10px] font-body font-semibold rounded-md bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 transition-colors"
                >
                  {lang}
                </button>

                {/* Trash Button */}
                {screen === 'chat' && (
                  <button
                    onClick={() => {
                      if (confirm(t(
                        'Clear this conversation history?',
                        'Burahin ang kasaysayan ng usapan?',
                        'Tangtanga ang kasaysayan sa hustonay?'
                      ))) {
                        localStorage.removeItem(STORAGE_KEY(mode));
                        setMessages([{ role: 'assistant', content: GREETINGS[mode][lang] }]);
                        setShowChips(true);
                        setChips((MODE_SUGGESTIONS[mode]?.[lang] ?? []).slice(0, 2));
                      }
                    }}
                    className="p-1.5 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
                    title={t('Clear chat', 'Burahin', 'Tangtanga')}
                  >
                    🗑️
                  </button>
                )}

                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* ── Home Screen ── */}
            {screen === 'home' && (
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <p className="font-heading text-base font-bold text-foreground mb-1">
                  {t('Who are you?', 'Sino ka?', 'Kinsa ka?')}
                </p>
                <p className="font-body text-xs text-muted-foreground mb-5">
                  {t('Select your mode for the best help.', 'Piliin ang iyong mode.', 'Pilia ang imong mode.')}
                </p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {MODES.map((m) => (
                    <button key={m.id} onClick={() => startChat(m.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all hover:shadow-md ${m.id === 'EMERGENCY' ? 'border-red-200 bg-red-50 hover:border-red-400' : 'border-border bg-card hover:border-accent/40 hover:bg-accent/5'}`}>
                      <m.icon className={`h-6 w-6 ${m.color}`} />
                      <span className="font-body text-xs font-semibold text-foreground">
                        {lang === 'EN' ? m.label : lang === 'FIL' ? m.labelFil : m.labelBis}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  {t('Quick Access', 'Mabilis na Access', 'Dali nga Access')}
                </p>
                <div className="space-y-2">
                  {[
                    { icon: Gamepad2,   label: 'App Safety Checker',          labelFil: 'App Safety Checker',        labelBis: 'App Safety Checker',         mode: 'PARENT',  prompt: 'Which apps are safe for children?' },
                    { icon: Scale,      label: 'Philippine Law Explainer',     labelFil: 'Paliwanag ng Batas',        labelBis: 'Paliwanag sa Balaod',         mode: 'PARENT',  prompt: 'Explain Philippine online safety laws for children.' },
                    { icon: Lock,       label: 'Privacy Settings Guide',       labelFil: 'Gabay sa Privacy Settings', labelBis: 'Giya sa Privacy Settings',    mode: 'PARENT',  prompt: 'How do I set up privacy settings to protect my child?' },
                    { icon: HelpCircle, label: 'Frequently Asked Questions',   labelFil: 'Mga Madalas na Tanong',     labelBis: 'Mga Kanunay nga Pangutana',   mode: 'CHILD',   prompt: 'What are the most common online safety questions?' },
                    { icon: BookOpen,   label: 'Classroom Lesson Guide',       labelFil: 'Gabay sa Leksyon',          labelBis: 'Giya sa Leksyon sa Klase',    mode: 'TEACHER', prompt: 'Give me a classroom lesson guide for online safety.' },
                  ].map((item, i) => (
                    <button key={i} onClick={() => startChat(item.mode, item.prompt)} className="w-full flex items-center gap-3 px-4 py-3 bg-muted/40 hover:bg-accent/5 rounded-xl transition-all text-left border border-transparent hover:border-accent/20">
                      <item.icon className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">
                        {lang === 'EN' ? item.label : lang === 'FIL' ? item.labelFil : item.labelBis}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* ── Chat Screen ── */}
            {screen === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">

                  {showChips && chips.length > 0 && messages.length <= 1 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider px-1">
                        {t('💡 Try asking:', '💡 Subukan itanong:', '💡 Sulayi pangutana:')}
                      </p>
                      {chips.map((chip, i) => (
                        <button key={i} onClick={() => { setShowChips(false); sendMessage(chip); }}
                          className="w-full text-left text-xs font-body text-accent bg-accent/5 border border-accent/20 rounded-xl px-3 py-2 hover:bg-accent/10 transition-colors">
                          {chip}
                        </button>
                      ))}
                    </div>
                  )}

                  {messages.map((msg, i) => (
                    <div key={i}>
                      {msg.type === 'emergency' ? (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                          <div className="flex items-center gap-2 mb-3">
                            <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                            <p className="font-heading text-sm font-bold text-red-700">Emergency Contacts</p>
                          </div>
                          <div className="space-y-2">
                            {EMERGENCY_CONTACTS.map((c, j) => (
                              <div key={j} className="flex items-center justify-between bg-white rounded-lg px-3 py-2 border border-red-100">
                                <span className="font-body text-xs text-foreground font-medium">{c.name}</span>
                                {c.type === 'web'
                                  ? <a href={c.number} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-accent text-xs font-semibold"><Globe className="h-3 w-3" /> Visit</a>
                                  : <a href={`tel:${c.number}`} className="flex items-center gap-1 text-red-600 text-xs font-semibold"><Phone className="h-3 w-3" /> {c.number}</a>}
                              </div>
                            ))}
                          </div>
                          <p className="font-body text-xs text-red-600 mt-3 leading-relaxed">
                            {t(
                              'If a child is in immediate danger, call the PNP right away. You can also type your situation below.',
                              'Kung ang isang bata ay nasa agarang panganib, tumawag agad sa PNP.',
                              'Kung ang bata naa sa agarang peligro, tawag dayon sa PNP.'
                            )}
                          </p>
                        </div>
                      ) : (
                        <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${msg.role === 'user' ? 'bg-accent text-accent-foreground rounded-br-sm' : 'bg-white border border-border text-foreground rounded-bl-sm shadow-sm'}`}>
                            <MessageContent content={msg.content} />
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-white border border-border rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
                        <Loader2 className="h-4 w-4 text-accent animate-spin" />
                      </div>
                    </div>
                  )}

                  {messages.length === 1 && !isLoading && !showChips && quickActions.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider px-1">
                        {t('Quick questions:', 'Mabilis na tanong:', 'Dali nga mga pangutana:')}
                      </p>
                      {quickActions.map((qa, i) => (
                        <button key={i} onClick={() => sendMessage(qa.prompt)} className="w-full text-left text-xs font-body text-accent bg-accent/5 border border-accent/20 rounded-xl px-3 py-2 hover:bg-accent/10 transition-colors">{qa.label}</button>
                      ))}
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* ── Input Footer ── */}
                <div className="px-4 pb-4 pt-2 border-t border-border/50 flex-shrink-0">
                  <div className="flex items-end gap-2 bg-white border border-border rounded-xl px-3 py-2 shadow-sm focus-within:border-accent/50 transition-colors">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder={t(
                        'Ask about online safety...',
                        'Magtanong tungkol sa online safety...',
                        'Mangutana bahin sa online safety...'
                      )}
                      rows={1}
                      className="flex-1 font-body text-sm text-foreground bg-transparent outline-none resize-none leading-relaxed placeholder:text-muted-foreground/60"
                      style={{ maxHeight: '80px' }}
                    />
                    <button
                      onClick={() => sendMessage()}
                      disabled={!input.trim() || isLoading}
                      className="flex-shrink-0 h-7 w-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center transition-all disabled:opacity-40 hover:bg-accent/90"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-body text-[10px] text-muted-foreground/60 text-center mt-1.5">
                    🔒 {t('Your conversation is private', 'Pribado ang iyong usapan', 'Pribado ang imong hustonay')} • Emergency: <a href="tel:911" className="text-red-500 font-semibold">911</a> | <a href="tel:1383" className="text-red-500 font-semibold">1383</a>
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}