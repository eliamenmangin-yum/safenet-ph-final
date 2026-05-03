import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';
import References from '../components/References';

const CONCLUSION_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/f9730fc32_generated_a3c07ed1.png';

export default function Conclusion() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={CONCLUSION_IMG}
            alt="Silhouettes of Filipino children at dawn, symbolizing hope and a protected future"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-primary/60 to-primary/80" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 py-32 lg:py-40 text-center">
          <ScrollReveal>
            <span className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6 border border-accent/30 px-4 py-1.5 rounded-full">
              Conclusion
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-[1.1] mb-8">
              A Call to Collective
              <br />
              <span className="text-accent">Digital Responsibility</span>
            </h1>
          </ScrollReveal>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Conclusion Body */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The evidence assembled throughout this research leads to an inescapable conclusion:
                the online safety of Filipino children is a crisis that demands immediate,
                coordinated, and sustained action from every sector of Philippine society. The
                statistics are not abstract — behind every reported case of OSAEC, every instance of
                sextortion, every data privacy violation affecting a minor, there is a child whose
                trust, dignity, and developmental trajectory have been compromised.
              </p>
              <p>
                The Philippines has not been passive in the face of this challenge. The legislative
                framework — from the foundational RA 7610 to the landmark RA 11930 — represents a
                genuine commitment to protecting children in both physical and digital environments.
                Law enforcement agencies, particularly the Philippine National Police's Women and
                Children Protection Center and the Philippine Internet Crimes Against Children Center
                (PICACC), have demonstrated increasing capacity and determination. International
                partnerships have strengthened the country's ability to pursue perpetrators across
                borders.
              </p>
              <p>
                Yet legislation without awareness is insufficient. Enforcement without education
                addresses symptoms rather than causes. The most sophisticated legal framework in the
                world cannot protect a child whose parent does not recognize the signs of online
                grooming, whose teacher cannot articulate the principles of digital citizenship, and
                who has never been taught that certain online interactions constitute abuse.
              </p>
              <p>
                This is the gap that SafeNet PH exists to fill. As an academic IT case study
                developed at North Eastern Mindanao State University, the project demonstrates that
                information technology — the very infrastructure that has enabled the exploitation of
                children — can be redirected as an instrument of protection and empowerment. The
                SafeNet PH web platform and AI chatbot represent a model for how research-based
                knowledge can be made accessible, contextual, and immediately useful to the
                communities that need it most.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Recommendations"
            title="The Path Forward"
            description="Based on the findings of this research, SafeNet PH advances the following recommendations for strengthening the protection of Filipino children in the digital environment."
          />
          <div className="space-y-10">
            {[
              {
                number: '01',
                title: 'For Parents and Guardians',
                text: 'Invest time in understanding the digital platforms and applications your children use. Learn to configure privacy settings, recognize the warning signs of online grooming and exploitation, and establish open lines of communication with your children about their online experiences. Digital safety is not a one-time conversation but an ongoing dialogue that evolves as children grow and their digital engagement deepens. Resources such as SafeNet PH provide accessible, research-based guidance to support this process.',
              },
              {
                number: '02',
                title: 'For Educators and Schools',
                text: 'Integrate digital citizenship and online safety education into existing curricula at every grade level. Digital literacy should not be treated as a standalone subject but as a cross-cutting competency woven into language, social studies, and technology classes. Schools must also establish clear protocols for responding to disclosures of online abuse and ensure that guidance counselors and administrators are equipped to handle such cases with sensitivity and urgency.',
              },
              {
                number: '03',
                title: 'For Policymakers and Government Agencies',
                text: 'Strengthen the enforcement infrastructure for existing child protection legislation, with particular attention to digital forensics capacity, inter-agency coordination, and the training of law enforcement personnel in technology-facilitated crimes. Additionally, mandate the inclusion of digital safety education in the Department of Education curriculum and allocate resources for community-level awareness programs, particularly in underserved and rural areas where the digital literacy gap is most acute.',
              },
              {
                number: '04',
                title: 'For Technology Platforms',
                text: 'Implement robust and verifiable age-gating mechanisms, enhance automated detection of grooming behavior and OSAEC content, and comply fully with Philippine data protection regulations as they apply to minors. The technology sector bears a particular responsibility to ensure that the platforms it designs and operates do not become vectors for the exploitation of children.',
              },
              {
                number: '05',
                title: 'For Communities',
                text: 'Break the culture of silence that surrounds online child exploitation. Community leaders, religious institutions, and local organizations must create safe spaces for reporting and discussion. The stigma associated with OSAEC victimhood inhibits reporting and delays intervention. A community that understands, acknowledges, and acts upon the threat of online child exploitation is a community that protects its children.',
              },
            ].map((rec, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-1">
                    <span className="font-heading text-4xl font-bold text-accent/20">
                      {rec.number}
                    </span>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="font-heading text-lg lg:text-xl font-bold text-foreground">
                      {rec.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                      {rec.text}
                    </p>
                  </div>
                </div>
                {i < 4 && <div className="h-px bg-border mt-10" />}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* References */}
      <References />

      {/* Final Statement */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Final Statement"
            title="The Digital Future Belongs to Them"
          />
          <ScrollReveal>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The digital future of the Philippines will be shaped not by the technology itself
                but by the choices that adults make today about how to prepare children for it.
                Every child who learns to recognize online manipulation, every parent who
                understands how to monitor digital activity with respect and awareness, every
                educator who integrates safety into their teaching, and every community that
                refuses to look away from exploitation — each of these represents a step toward a
                safer digital Philippines.
              </p>
              <p>
                SafeNet PH is one contribution to that larger project. It is not the final answer
                but a beginning — a demonstration that the tools of technology can serve the
                interests of protection as powerfully as they have served the interests of
                connection. The research is clear, the tools are available, and the responsibility
                is shared. The question is not whether we can protect Filipino children online. The
                question is whether we will.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="mt-16 p-8 lg:p-12 bg-primary rounded-2xl text-center">
              <Shield className="h-12 w-12 text-accent mx-auto mb-6" />
              <h3 className="font-heading text-2xl lg:text-3xl font-bold text-primary-foreground mb-4">
                Protect. Educate. Empower.
              </h3>
              <p className="font-body text-base text-primary-foreground/70 leading-relaxed max-w-xl mx-auto mb-8">
                SafeNet PH is a research project of North Eastern Mindanao State University.
                For more information about children's online safety in the Philippines, contact
                your local Department of Social Welfare and Development (DSWD) office or the
                Philippine National Police Women and Children Protection Center.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/20"
              >
                Return to Home
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}