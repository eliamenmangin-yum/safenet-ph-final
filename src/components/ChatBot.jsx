import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Shield, Loader2, ChevronLeft, Phone, Globe, BookOpen, Users, AlertTriangle, Scale, Lock, HelpCircle, Gamepad2, GraduationCap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const buildSystemPrompt = (mode, lang) => `You are SafeNet PH Bot — the AI safety assistant of SafeNet PH, an academic project of North Eastern Mindanao State University.

CURRENT USER MODE: ${mode || 'unknown'}
PREFERRED LANGUAGE: ${lang === 'FIL' ? 'Filipino/Tagalog' : 'English'}

LANGUAGE RULES: Match the user's language. Filipino/Tagalog ↔ Filipino reply. Taglish is fine.

CORE BEHAVIOR:
• Keep answers SHORT: 3–6 sentences max
• Use simple, clear words — no legal jargon
• Be warm, calm, non-judgmental, and supportive
• Give PRACTICAL steps
• Never scare the user

MODE-BASED RESPONSES:
PARENT → protective steps, monitoring advice, parental controls
CHILD → very simple language, age-appropriate safety tips
TEACHER → classroom ideas, DepEd-aligned lesson suggestions
EMERGENCY → immediately show hotlines, then calm steps

LAW EXPLAINER (simple terms only):
• RA 11930 — Anti-OSAEC Law (2022): Criminalizes online grooming, live-streaming of abuse, sextortion
• RA 10173 — Data Privacy Act: Protects personal info of Filipinos including children
• RA 9775 — Anti-Child Pornography Act: Criminalizes production/sharing of child abuse material
• RA 10175 — Cybercrime Prevention Act: Covers cybersex, online identity theft

EMERGENCY RULE: If user mentions abuse, exploitation, threats, blackmail, sharing of private photos, child in danger:
FIRST say: "Please seek help immediately:
• PNP Anti-Cybercrime Group: #777
• MAKABATA Helpline: 1383
• PICACC: https://picacc.gov.ph
• DSWD Hotline: 931-8101"

NEVER: invent statistics, give legal advice, write essays, diagnose.`;

const MODES = [
  { id: 'PARENT', label: 'Parent', labelFil: 'Magulang', icon: Users, color: 'text-blue-600' },
  { id: 'CHILD', label: 'Child', labelFil: 'Bata', icon: Shield, color: 'text-green-600' },
  { id: 'TEACHER', label: 'Teacher', labelFil: 'Guro', icon: GraduationCap, color: 'text-purple-600' },
  { id: 'EMERGENCY', label: 'Emergency', labelFil: 'Emergency', icon: AlertTriangle, color: 'text-red-600' },
];

const QUICK_ACTIONS = {
  PARENT: [
    { label: 'App Safety Checker', prompt: 'Check the safety of TikTok for my child' },
    { label: 'Privacy Settings', prompt: 'How do I set up privacy settings for my child on Facebook?' },
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
    { label: 'Call PNP-ACG #777', prompt: 'emergency_pnp' },
    { label: 'MAKABATA 1383', prompt: 'emergency_makabata' },
    { label: 'My child is in danger', prompt: 'My child is being sexually exploited online right now' },
    { label: 'I am being threatened', prompt: 'Someone is threatening to share my private photos online' },
  ],
};

const EMERGENCY_CONTACTS = [
  { name: 'PNP Anti-Cybercrime Group', number: '#777', type: 'call' },
  { name: 'MAKABATA Helpline', number: '1383', type: 'call' },
  { name: 'PICACC', number: 'https://picacc.gov.ph', type: 'web' },
  { name: 'DSWD Hotline', number: '931-8101', type: 'call' },
];
async function callAI(systemPrompt, history) {
  const messages = history.filter(m => m.content !== 'emergency_panel').map(m => ({
    role: m.role,
    content: m.content
  }));

  const response = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      messages,
      systemPrompt,
    }),
  });

  const data = await response.json();
  return data.reply || 'Sorry, I could not process that. Please try again.';
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [screen, setScreen] = useState('home');
  const [mode, setMode] = useState(null);
  const [lang, setLang] = useState('EN');
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, isLoading]);
  useEffect(() => { if (screen === 'chat') inputRef.current?.focus(); }, [screen]);

  const startChat = (selectedMode) => {
    setMode(selectedMode);
    if (selectedMode === 'EMERGENCY') {
      setMessages([{ role: 'assistant', content: 'emergency_panel', type: 'emergency' }]);
    } else {
      const greetings = {
        PARENT: { EN: "Hello! I'm here to help you protect your child online. Ask me about app safety, privacy settings, warning signs, or how to report incidents.", FIL: "Kamusta! Nandito ako para tulungan kang protektahan ang iyong anak online." },
        CHILD: { EN: "Hi there! 👋 I'm SafeNet Bot. I'm here to help you stay safe online. You can ask me anything — I won't judge you!", FIL: "Hello! 👋 Ako si SafeNet Bot. Nandito ako para tulungan kang manatiling ligtas online." },
        TEACHER: { EN: "Hello Teacher! I can help you with lesson ideas about online safety, DepEd-aligned activities, and how to handle student disclosures of online abuse.", FIL: "Hello Guro! Matutulungan kita sa mga lesson ideas tungkol sa online safety." },
      };
      setMessages([{ role: 'assistant', content: greetings[selectedMode][lang] }]);
    }
    setScreen('chat');
  };

  const sendMessage = async (text) => {
    if (text === 'emergency_pnp' || text === 'emergency_makabata') {
      setMessages(prev => [...prev, { role: 'assistant', content: 'emergency_panel', type: 'emergency' }]);
      return;
    }
    const userText = text || input.trim();
    if (!userText || isLoading) return;
    setInput('');
    const newMessages = [...messages.filter(m => m.type !== 'emergency'), { role: 'user', content: userText }];
    setMessages(newMessages);
    setIsLoading(true);
    try {
      const reply = await callAI(buildSystemPrompt(mode, lang), newMessages);
      setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

  const goHome = () => { setScreen('home'); setMode(null); setMessages([]); setInput(''); };

  const quickActions = mode ? QUICK_ACTIONS[mode] : [];

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
            <div className="flex items-center justify-between px-4 py-3 bg-primary flex-shrink-0">
              <div className="flex items-center gap-2.5">
                {screen === 'chat' && (
                  <button onClick={goHome} className="p-1 text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                )}
                <div className="h-7 w-7 rounded-full bg-accent/20 flex items-center justify-center">
                  <Shield className="h-3.5 w-3.5 text-accent" />
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-primary-foreground leading-none">SafeNet PH Bot</p>
                  <p className="font-body text-[10px] text-primary-foreground/50 leading-none mt-0.5">{mode ? `${mode} Mode` : 'Online Safety Assistant'}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setLang(l => l === 'EN' ? 'FIL' : 'EN')} className="px-2 py-1 text-[10px] font-body font-semibold rounded-md bg-primary-foreground/10 text-primary-foreground/70 hover:bg-primary-foreground/20 transition-colors">{lang}</button>
                <button onClick={() => setIsOpen(false)} className="p-1.5 text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/10 rounded-lg transition-colors"><X className="h-4 w-4" /></button>
              </div>
            </div>

            {screen === 'home' && (
              <div className="flex-1 overflow-y-auto px-4 py-5">
                <p className="font-heading text-base font-bold text-foreground mb-1">{lang === 'EN' ? 'Who are you?' : 'Sino ka?'}</p>
                <p className="font-body text-xs text-muted-foreground mb-5">{lang === 'EN' ? 'Select your mode for the best help.' : 'Piliin ang iyong mode.'}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {MODES.map((m) => (
                    <button key={m.id} onClick={() => startChat(m.id)}
                      className={`flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all hover:shadow-md ${m.id === 'EMERGENCY' ? 'border-red-200 bg-red-50 hover:border-red-400' : 'border-border bg-card hover:border-accent/40 hover:bg-accent/5'}`}>
                      <m.icon className={`h-6 w-6 ${m.color}`} />
                      <span className="font-body text-xs font-semibold text-foreground">{lang === 'EN' ? m.label : m.labelFil}</span>
                    </button>
                  ))}
                </div>
                <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">{lang === 'EN' ? 'Quick Access' : 'Mabilis na Access'}</p>
                <div className="space-y-2">
                  {[
                    { icon: Gamepad2, label: 'App Safety Checker', action: () => startChat('PARENT') },
                    { icon: Scale, label: lang === 'EN' ? 'Philippine Law Explainer' : 'Paliwanag ng Batas', action: () => startChat('PARENT') },
                    { icon: Lock, label: 'Privacy Settings Guide', action: () => startChat('PARENT') },
                    { icon: HelpCircle, label: lang === 'EN' ? 'Frequently Asked Questions' : 'Mga Madalas na Tanong', action: () => startChat('CHILD') },
                    { icon: BookOpen, label: lang === 'EN' ? 'Classroom Lesson Guide' : 'Gabay sa Leksyon', action: () => startChat('TEACHER') },
                  ].map((item, i) => (
                    <button key={i} onClick={item.action} className="w-full flex items-center gap-3 px-4 py-3 bg-muted/40 hover:bg-accent/5 rounded-xl transition-all text-left border border-transparent hover:border-accent/20">
                      <item.icon className="h-4 w-4 text-accent flex-shrink-0" />
                      <span className="font-body text-sm text-foreground">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {screen === 'chat' && (
              <>
                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
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
                            {lang === 'EN' ? 'If a child is in immediate danger, call the PNP right away. You can also type your situation below.' : 'Kung ang isang bata ay nasa agarang panganib, tumawag agad sa PNP.'}
                          </p>
                        </div>
                      ) : (
                        <div className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 font-body text-sm leading-relaxed ${msg.role === 'user' ? 'bg-accent text-accent-foreground rounded-br-sm' : 'bg-white border border-border text-foreground rounded-bl-sm shadow-sm'}`}>
                            {msg.content.split('\n').map((line, j) => <span key={j}>{line}{j < msg.content.split('\n').length - 1 && <br />}</span>)}
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
                  {messages.length === 1 && !isLoading && quickActions.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <p className="font-body text-[10px] text-muted-foreground uppercase tracking-wider px-1">{lang === 'EN' ? 'Quick questions:' : 'Mabilis na tanong:'}</p>
                      {quickActions.map((qa, i) => (
                        <button key={i} onClick={() => sendMessage(qa.prompt)} className="w-full text-left text-xs font-body text-accent bg-accent/5 border border-accent/20 rounded-xl px-3 py-2 hover:bg-accent/10 transition-colors">{qa.label}</button>
                      ))}
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
                <div className="px-4 pb-4 pt-2 border-t border-border/50 flex-shrink-0">
                  <div className="flex items-end gap-2 bg-white border border-border rounded-xl px-3 py-2 shadow-sm focus-within:border-accent/50 transition-colors">
                    <textarea ref={inputRef} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKeyDown}
                      placeholder={lang === 'EN' ? 'Ask about online safety...' : 'Magtanong tungkol sa online safety...'}
                      rows={1} className="flex-1 font-body text-sm text-foreground bg-transparent outline-none resize-none leading-relaxed placeholder:text-muted-foreground/60" style={{ maxHeight: '80px' }} />
                    <button onClick={() => sendMessage()} disabled={!input.trim() || isLoading} className="flex-shrink-0 h-7 w-7 rounded-lg bg-accent text-accent-foreground flex items-center justify-center transition-all disabled:opacity-40 hover:bg-accent/90">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  </div>
                  <p className="font-body text-[10px] text-muted-foreground/60 text-center mt-1.5">SafeNet PH — NEMSU Research Project</p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
