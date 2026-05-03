import { Link } from 'react-router-dom';
import { ArrowRight, Globe, MessageCircle, BookOpen, Users, Shield, BarChart3 } from 'lucide-react';
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

      {/* Problem-Solution Bridge */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="The Gap"
            title="From Research to Reach"
          />
          <ScrollReveal>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The preceding sections of this research have established two fundamental realities.
                First, Filipino children face an escalating spectrum of online threats — from sexual
                exploitation and grooming to data privacy violations — driven by a convergence of
                socioeconomic vulnerability, platform accessibility, and enforcement limitations.
                Second, the existing knowledge and educational infrastructure is insufficient to
                equip families and communities with the awareness needed to protect children in
                digital environments.
              </p>
              <p>
                SafeNet PH was developed in response to this specific gap. The platform recognizes
                that while legislative reform and law enforcement capacity are essential components
                of child protection, they operate primarily in the reactive domain — addressing abuse
                after it has occurred. Prevention, by contrast, requires a proactive approach:
                education, awareness, and the democratization of knowledge. This is the space that
                SafeNet PH occupies.
              </p>
              <p>
                Conceived as an academic IT case study at North Eastern Mindanao State University,
                SafeNet PH applies information technology as an instrument of social advocacy. The
                platform is not a substitute for institutional action but rather a complement — a
                tool that empowers individuals and communities to become active participants in the
                protection of children, informed by research and supported by technology.
              </p>
            </div>
          </ScrollReveal>
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
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Core Innovation"
            title="The SafeNet PH AI Chatbot"
          />
          <ScrollReveal>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The centerpiece of SafeNet PH's technological intervention is its AI-powered chatbot
                — an intelligent conversational agent designed to serve as an always-available resource
                for questions about children's online safety. Unlike static information repositories,
                the chatbot engages users in dialogue, adapting its responses to the specific
                concerns and knowledge level of each user.
              </p>
              <p>
                The chatbot's knowledge base is constructed from verified sources: Philippine
                legislative texts, reports from the Department of Justice and the Philippine National
                Police, publications from international organizations including UNICEF, IJM, and
                ECPAT, and peer-reviewed academic research on online child exploitation. This
                ensures that every response is grounded in evidence rather than assumption.
              </p>
              <p>
                For parents, the chatbot can explain how to configure privacy settings on specific
                social media platforms, describe the warning signs of online grooming, and provide
                step-by-step guidance on reporting suspected exploitation. For educators, it offers
                suggestions for integrating digital safety concepts into classroom instruction. For
                children and adolescents, it communicates in age-appropriate language, helping young
                users understand what constitutes inappropriate online behavior and how to seek help.
              </p>
              <p>
                The chatbot represents the conviction at the heart of SafeNet PH: that the most
                effective protection is an informed population, and that technology — the very medium
                through which children face risk — can also serve as the medium through which they
                are empowered to protect themselves.
              </p>
            </div>
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