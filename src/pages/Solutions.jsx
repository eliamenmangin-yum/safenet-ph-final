import { Link } from 'react-router-dom';
import { ArrowRight, Globe, MessageCircle, BookOpen, Users, Shield, BarChart3, Brain, FileText, UserCheck, GraduationCap } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';
import DownloadableToolkit from '../components/DownloadableToolkit';

const SOLUTIONS_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/535194805_generated_21718800.png';

const features = [
  {
    icon: Globe,
    title: 'Research-Based Web Platform',
    description:
      'A centralized, publicly accessible repository of verified information on OSAEC, digital literacy, and child online safety — contextualized for the Philippine setting. The platform presents academic research in accessible language, ensuring that parents, educators, and students can engage with the material regardless of their educational background.',
  },
  {
    icon: MessageCircle,
    title: 'AI-Powered Safety Chatbot',
    description:
      'An intelligent conversational agent trained on verified data from Philippine law enforcement reports, child protection agencies, and academic research. The chatbot provides immediate, contextual responses to questions about online safety, reporting procedures, legal protections, and digital literacy — available 24/7 in both English and Filipino.',
  },
  {
    icon: BookOpen,
    title: 'Digital Literacy Resource Library',
    description:
      'A curated collection of educational materials designed for three distinct audiences: parents and guardians, classroom educators, and children aged 8 to 17. Resources include scenario-based learning modules, infographics on identifying online threats, and step-by-step guides for configuring privacy settings on popular platforms.',
  },
  {
    icon: Users,
    title: 'Community Engagement Framework',
    description:
      'SafeNet PH is designed not as a static information repository but as a living platform that facilitates community-level engagement. The framework includes tools for educators to integrate digital safety content into their curricula and mechanisms for parents to share experiences and strategies for protecting their children online.',
  },
  {
    icon: Shield,
    title: 'Incident Reporting Guidance',
    description:
      'Clear, step-by-step guidance on how to report OSAEC incidents to the appropriate Philippine authorities, including the Philippine National Police (PNP), the National Bureau of Investigation (NBI), the Department of Social Welfare and Development (DSWD), and the National Telecommunications Commission (NTC). The platform demystifies the reporting process to reduce barriers to action.',
  },
  {
    icon: BarChart3,
    title: 'Data-Driven Advocacy',
    description:
      'The platform aggregates and visualizes publicly available data on OSAEC trends, digital literacy rates, and enforcement outcomes. By making this data accessible and comprehensible, SafeNet PH equips advocates, researchers, and policymakers with the evidence base necessary to drive systemic change.',
  },
];

export default function Solutions() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <span className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6">
                  The SafeNet PH Response
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8">
                  Bridging the
                  <br />
                  Awareness Gap
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-xl">
                  SafeNet PH is an integrated digital platform comprising a research-based web blog
                  and an AI-powered chatbot, designed to address the critical deficit in online safety
                  awareness among Filipino children, parents, and educators. The platform translates
                  academic research into actionable knowledge, making child protection accessible to
                  every Filipino household.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3}>
              <img
                src={SOLUTIONS_IMG}
                alt="A Filipino teacher guiding students working on computers in a bright classroom, representing digital literacy education"
                className="w-full rounded-xl shadow-2xl shadow-primary/10"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Platform Components"
            title="How SafeNet PH Works"
            description="The SafeNet PH platform is built on six integrated components, each designed to address a specific dimension of the online safety awareness gap."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-card border border-border rounded-xl p-8 h-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/5 hover:border-accent/20">
                  <feature.icon className="h-10 w-10 text-accent mb-6" />
                  <h3 className="font-heading text-lg font-bold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Chatbot Highlight */}
      <section className="py-24 lg:py-32">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Core Innovation"
            title="The SafeNet PH AI Chatbot"
            description="An intelligent conversational agent available 24/7 in English and Filipino — built on verified Philippine law, academic research, and child protection data."
          />

          {/* What it is */}
          <ScrollReveal>
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Brain className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2">What It Is</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    Unlike static FAQs, the SafeNet PH chatbot engages users in real dialogue — adapting responses to the specific concern and knowledge level of each user. It is grounded in Philippine legislative texts, DOJ and PNP reports, UNICEF and IJM publications, and peer-reviewed research on online child exploitation.{' '}
                    <a href="https://www.unicef.org/philippines/reports/disrupting-harm-philippines" target="_blank" rel="noopener noreferrer" className="text-accent underline text-xs hover:opacity-80">UNICEF, ECPAT & Interpol, 2022</a>
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Who it serves */}
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                {
                  icon: Shield,
                  role: 'Parents & Guardians',
                  color: 'bg-blue-50 border-blue-100',
                  iconBg: 'bg-blue-100',
                  iconColor: 'text-primary',
                  points: [
                    'Configure privacy settings on social media',
                    'Recognize warning signs of online grooming',
                    'Step-by-step reporting guidance',
                  ],
                },
                {
                  icon: GraduationCap,
                  role: 'Educators',
                  color: 'bg-purple-50 border-purple-100',
                  iconBg: 'bg-purple-100',
                  iconColor: 'text-purple-600',
                  points: [
                    'Integrate digital safety into curricula',
                    'Understand mandatory reporting obligations',
                    'Access classroom-ready resources',
                  ],
                },
                {
                  icon: UserCheck,
                  role: 'Children & Teens',
                  color: 'bg-accent/5 border-accent/10',
                  iconBg: 'bg-accent/10',
                  iconColor: 'text-accent',
                  points: [
                    'Age-appropriate language and guidance',
                    'Identify inappropriate online behavior',
                    'Know how and where to seek help',
                  ],
                },
              ].map((card, i) => (
                <div key={i} className={`rounded-2xl border p-5 ${card.color}`}>
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${card.iconBg}`}>
                    <card.icon className={`h-4 w-4 ${card.iconColor}`} />
                  </div>
                  <h4 className="font-heading text-sm font-bold text-foreground mb-3">{card.role}</h4>
                  <ul className="space-y-1.5">
                    {card.points.map((pt, j) => (
                      <li key={j} className="font-body text-xs text-muted-foreground flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/40 mt-1.5 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Knowledge base */}
          <ScrollReveal delay={0.2}>
            <div className="bg-accent/5 border border-accent/10 rounded-2xl p-6 md:p-8 mb-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FileText className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2">Verified Knowledge Base</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">
                    Every response is evidence-based, drawn from authoritative Philippine and international sources — not assumptions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { label: 'RA 11930 (2022)', href: 'https://lawphil.net/statutes/repacts/ra2022/ra_11930_2022.html' },
                      { label: 'RA 9775 (2009)', href: 'https://lawphil.net/statutes/repacts/ra2009/ra_9775_2009.html' },
                      { label: 'UNICEF Philippines', href: 'https://www.unicef.org/philippines/child-protection' },
                      { label: 'IJM Philippines', href: 'https://www.ijm.org/philippines' },
                      { label: 'PNP Anti-Cybercrime Group', href: 'https://acg.pnp.gov.ph/' },
                    ].map((src, i) => (
                      <a
                        key={i}
                        href={src.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block font-body text-xs font-semibold text-accent bg-accent/10 hover:bg-accent/20 px-3 py-1 rounded-full transition-colors"
                      >
                        {src.label} ↗
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Core conviction */}
          <ScrollReveal delay={0.3}>
            <blockquote className="border-l-4 border-accent pl-6 py-2">
              <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed italic">
                "Technology — the very medium through which children face risk — can also be the medium through which they are empowered to protect themselves."
              </p>
              <cite className="block font-body text-xs text-muted-foreground mt-3 not-italic">
                SafeNet PH Platform Rationale, NEMSU IT Case Study, 2024 ·{' '}
                <a href="https://archive.opengovasia.com/2024/03/30/ensuring-digital-safety-for-children-in-the-philippines/" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">OpenGov Asia, 2024</a>
              </cite>
            </blockquote>
          </ScrollReveal>
        </div>
      </section>

      {/* Downloadable Toolkit */}
      <DownloadableToolkit />

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-primary">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <span className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6">
              Next Step
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight mb-6">
              The research is clear. The solution is here.
            </h2>
            <p className="font-body text-lg text-primary-foreground/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              SafeNet PH transforms academic findings into accessible tools for every Filipino
              family. Read our conclusion and join the movement to protect the next generation.
            </p>
            <Link
              to="/conclusion"
              className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
            >
              Read the Conclusion
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}