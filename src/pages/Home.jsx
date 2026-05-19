import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, BookOpen, Scale, MessageCircle, Bot } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import StatCounter from '../components/StatCounter';

const HERO_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/f58335347_generated_808c3967.png';

// Sources: IJM (2023); UNICEF, ECPAT International, & Interpol (2022); CICC (2023); UNICEF Philippines (2024)
const stats = [
  {
    value: 2,
    suffix: 'M+',
    label: 'Filipino child victims of online sexual exploitation (2020–2021)',
    citation: 'UNICEF, ECPAT & Interpol, 2022',
    href: 'https://www.unicef.org/philippines/reports/disrupting-harm-philippines',
  },
  {
    value: 279000,
    suffix: '+',
    label: 'OSAEC cases reported to global authorities from the Philippines (2022)',
    citation: 'CICC, 2023',
    href: 'https://cicc.gov.ph/',
  },
  {
    value: 13,
    suffix: '%',
    label: 'Of youth respondents aware of the MAKABATA 1383 helpline',
    citation: 'UNICEF Philippines, 2024',
    href: 'https://www.unicef.org/philippines/stories/young-people-philippines-speak-out-online-safety',
  },
  {
    value: 3,
    suffix: 'x',
    label: 'Increase in OSAEC cases recorded during the COVID-19 pandemic',
    citation: 'Justice and Care, 2023',
    href: 'https://justiceandcare.org/app/uploads/2023/10/Justice-and-Care-Issue-Brief_Online-Sexual-Exploitation-of-Children_Oct-2023.pdf',
  },
];

const pillars = [
  {
    icon: ShieldCheck,
    color: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title: 'Child Protection',
    description:
      'Understand the landscape of online sexual abuse and exploitation of children (OSAEC) in the Philippines and the systemic vulnerabilities that expose minors to harm.',
    link: '/about',
  },
  {
    icon: BookOpen,
    color: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title: 'Digital Literacy',
    description:
      'Research-backed resources to help parents, educators, and children build the knowledge needed to navigate digital spaces safely.',
    link: '/solutions',
  },
  {
    icon: Scale,
    color: 'bg-primary/5 border-primary/20',
    iconBg: 'bg-primary/10',
    iconColor: 'text-primary',
    title: 'Legal Framework',
    description:
      'Philippine laws from RA 7610 to RA 11930 that form the legislative framework protecting children in the digital environment.',
    link: '/laws',
  },
];

export default function Home() {
  return (
    <div className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary/10 via-blue-50 to-green-50">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-20 left-10 w-56 h-56 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-32 lg:py-40 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-black text-foreground leading-tight mb-6">
                Protecting Filipino
                <br />
                <span className="text-primary">Children</span> in the
                <br />
                <span className="text-accent">Digital Age</span>
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-lg">
                SafeNet PH is an academic research platform helping parents, teachers, and students
                understand and prevent online sexual abuse and exploitation of children (OSAEC) in
                the Philippines.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.3}>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/about"
                  className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-2xl font-body font-bold text-sm transition-all hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/25 hover:-translate-y-0.5"
                >
                  Explore the Research
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/solutions"
                  className="inline-flex items-center justify-center gap-2 border-2 border-primary/30 text-primary bg-white px-8 py-4 rounded-2xl font-body font-bold text-sm transition-all hover:border-primary hover:shadow-lg hover:-translate-y-0.5"
                >
                  Meet SafeBot
                  <MessageCircle className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={0.2}>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl scale-95" />
              <img
                src={HERO_IMG}
                alt="Filipino child safely using technology at home"
                className="relative w-full rounded-3xl shadow-2xl shadow-primary/20 border-4 border-white"
              />
              {/* Floating badge — SafeBot */}
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-border flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <Bot className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-body text-xs text-muted-foreground">AI Assistant</p>
                  <p className="font-heading text-sm font-bold text-foreground">SafeBot is ready</p>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-accent animate-pulse ml-1" />
              </div>
              {/* Floating stat badge */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl px-4 py-3 border border-border">
                <p className="font-body text-xs text-muted-foreground">Est. child victims</p>
                <p className="font-heading text-lg font-black text-primary">2M+ (2020–21)</p>
                <p className="font-body text-[10px] text-muted-foreground/70">UNICEF et al., 2022</p>
              </div>
            </div>
          </ScrollReveal>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Statistics */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-12">
            <span className="inline-block font-body text-xs font-bold tracking-widest uppercase text-accent mb-3 bg-accent/10 px-3 py-1 rounded-full">
              By the Numbers
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mt-2">
              The Scale of the Crisis
            </h2>
            <p className="font-body text-base text-muted-foreground mt-3 max-w-xl">
              The following figures are drawn from peer-reviewed research and reports by international
              child protection agencies operating in the Philippine context.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {stats.map((stat, i) => (
              <StatCounter key={i} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <ScrollReveal className="mb-12">
            <span className="inline-block font-body text-xs font-bold tracking-widest uppercase text-accent mb-3 bg-accent/10 px-3 py-1 rounded-full">
              Research Framework
            </span>
            <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground mt-2">
              Three Pillars of Protection
            </h2>
            <p className="font-body text-base text-muted-foreground mt-3 max-w-xl">
              SafeNet PH examines child protection, digital literacy, and legal policy to build a
              comprehensive understanding of online safety in the Philippines.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pillars.map((pillar, i) => (
              <ScrollReveal key={i} delay={i * 0.12}>
                <Link
                  to={pillar.link}
                  className={`group block ${pillar.color} border-2 rounded-3xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5`}
                >
                  <div className={`w-12 h-12 ${pillar.iconBg} rounded-2xl flex items-center justify-center mb-5`}>
                    <pillar.icon className={`h-6 w-6 ${pillar.iconColor}`} />
                  </div>
                  <h3 className="font-heading text-xl font-black text-foreground mb-3">
                    {pillar.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-5">
                    {pillar.description}
                  </p>
                  <span className={`inline-flex items-center gap-1.5 font-body text-sm font-bold ${pillar.iconColor} group-hover:gap-3 transition-all`}>
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* SafeBot CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary to-primary/80 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <ScrollReveal>
            <div className="w-20 h-20 rounded-3xl bg-white/20 flex items-center justify-center mx-auto mb-6 shadow-xl">
              <Bot className="h-10 w-10 text-white" />
            </div>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight mb-4">
              Meet SafeBot
            </h2>
            <p className="font-body text-lg text-white/75 leading-relaxed mb-8 max-w-xl mx-auto">
              Our AI assistant is available 24/7 to answer your questions about online safety,
              Philippine laws, and how to protect your family.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center gap-2 bg-accent text-white px-10 py-4 rounded-2xl font-body font-bold text-sm transition-all hover:bg-accent/90 hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle className="h-4 w-4" />
                Chat with SafeBot
              </Link>
              <Link
                to="/conclusion"
                className="inline-flex items-center justify-center gap-2 bg-white/15 border border-white/30 text-white px-10 py-4 rounded-2xl font-body font-bold text-sm transition-all hover:bg-white/20 hover:-translate-y-0.5"
              >
                Read Our Conclusion
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}