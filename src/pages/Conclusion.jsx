import { Link } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';

const CONCLUSION_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/f9730fc32_generated_a3c07ed1.png';

const recommendations = [
  {
    number: '01',
    title: 'Parents & Guardians',
    text: 'Learn to configure privacy settings and recognize grooming warning signs. Maintain open, ongoing conversations with your children about their online lives.',
    cite: { label: 'UNICEF Philippines, 2021', href: 'https://www.unicef.org/philippines/media/2706/file/UNIPH-2021-PhilippinesKidsOnline-FullReport.pdf' },
  },
  {
    number: '02',
    title: 'Educators & Schools',
    text: 'Embed digital citizenship into existing curricula at every grade level and establish clear protocols for responding to disclosures of online abuse.',
    cite: { label: 'OpenGov Asia, 2024', href: 'https://archive.opengovasia.com/2024/03/30/ensuring-digital-safety-for-children-in-the-philippines/' },
  },
  {
    number: '03',
    title: 'Policymakers & Government',
    text: 'Strengthen enforcement infrastructure, mandate digital safety education in DepEd curriculum, and fund community-level awareness in rural areas.',
    cite: { label: 'Safe Online, 2024', href: 'https://www.end-violence.org/safeonline' },
  },
  {
    number: '04',
    title: 'Technology Platforms',
    text: 'Implement robust age-gating, enhance automated detection of OSAEC content, and fully comply with RA 11930 and RA 10173 as they apply to minors.',
    cite: { label: 'RA 11930, 2022', href: 'https://lawphil.net/statutes/repacts/ra2022/ra_11930_2022.html' },
  },
  {
    number: '05',
    title: 'Communities',
    text: 'Break the culture of silence around online exploitation. Create safe spaces for reporting and challenge the stigma that delays intervention.',
    cite: { label: 'Justice and Care, 2023', href: 'https://justiceandcare.org/app/uploads/2023/10/Justice-and-Care-Issue-Brief_Online-Sexual-Exploitation-of-Children_Oct-2023.pdf' },
  },
];

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
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8">
          <ScrollReveal>
            <div className="space-y-5 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                Online child exploitation in the Philippines is not an isolated problem — it is a systemic crisis shaped by poverty, digital illiteracy, and insufficient enforcement. As of 2022, an estimated <strong className="text-foreground">1 in 100 Filipino children</strong> was a victim of online sexual exploitation.{' '}
                <a href="https://www.ijm.org/news/1-in-100-children-sexually-exploited-livestreams-new-abuse-images-videos-philippines-last-year-driven-by-foreign-demand" target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm hover:opacity-80">IJM, 2023</a>
              </p>
              <p>
                Strong laws exist — from <strong className="text-foreground">RA 7610</strong> to <strong className="text-foreground">RA 11930</strong> — but legislation alone cannot protect children whose families and educators are unaware of the threat.{' '}
                <a href="https://lawphil.net/statutes/repacts/ra2022/ra_11930_2022.html" target="_blank" rel="noopener noreferrer" className="text-accent underline text-sm hover:opacity-80">RA 11930, 2022</a>
              </p>
              <p>
                SafeNet PH addresses this gap — turning academic research into accessible, community-level knowledge so every Filipino family can become an active line of defense.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Recommendations */}
      <section className="py-20 lg:py-28 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Recommendations"
            title="The Path Forward"
            description="Key action points for each sector of Philippine society based on the research findings."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {recommendations.map((rec, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className="bg-card border border-border rounded-xl p-6 h-full">
                  <span className="font-heading text-3xl font-bold text-accent/20 block mb-2">{rec.number}</span>
                  <h3 className="font-heading text-base font-bold text-foreground mb-2">{rec.title}</h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed mb-3">{rec.text}</p>
                  <a
                    href={rec.cite.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-body text-xs text-accent underline hover:opacity-80"
                  >
                    {rec.cite.label} ↗
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Final Statement */}
      <section className="py-20 lg:py-28">
        <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <blockquote className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed italic mb-6">
              "The question is not whether we can protect Filipino children online. The question is whether we will."
            </blockquote>
            <p className="font-body text-sm text-muted-foreground mb-12">
              SafeNet PH — NEMSU IT Case Study, 2024 ·{' '}
              <a href="https://www.unicef.org/philippines/child-protection" target="_blank" rel="noopener noreferrer" className="text-accent underline hover:opacity-80">UNICEF Philippines Child Protection</a>
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <div className="p-8 lg:p-12 bg-primary rounded-2xl text-center">
              <Shield className="h-10 w-10 text-accent mx-auto mb-5" />
              <h3 className="font-heading text-2xl font-bold text-primary-foreground mb-3">
                Protect. Educate. Empower.
              </h3>
              <p className="font-body text-sm text-primary-foreground/70 leading-relaxed max-w-lg mx-auto mb-8">
                A research project of North Eastern Mindanao State University. For child safety concerns, contact the{' '}
                <a href="https://www.dswd.gov.ph/" target="_blank" rel="noopener noreferrer" className="underline text-primary-foreground/90">DSWD</a>{' '}
                or call the <strong className="text-primary-foreground">MAKABATA Helpline 1383</strong>.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-10 py-4 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90"
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