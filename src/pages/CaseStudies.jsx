import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';

const CASE_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/81752d14d_generated_f5cba921.png';

const caseStudies = [
  {
    id: 1,
    label: 'Case File 001',
    title: 'The Online Grooming of "Maria"',
    age: '13 years old, Visayas Region',
    summary:
      'A 13-year-old was systematically groomed through a popular social media platform by an adult posing as a teenage boy.',
    narrative:
      'Maria (not her real name) was a Grade 7 student from a rural municipality in the Visayas. Like many of her classmates, she had created a social media account at the age of 11, despite the platform\'s minimum age requirement of 13. Her parents, both agricultural workers with limited formal education, were unaware of her online activities and did not have the digital literacy to monitor her usage.\n\nOver the course of six months, an individual operating under a fabricated identity — a "16-year-old boy" from Manila — initiated contact with Maria through the platform\'s messaging function. The grooming followed a well-documented pattern: initial flattery and emotional support, gradual escalation to personal and intimate topics, requests for photographs, and eventual threats of exposure to coerce continued compliance.\n\nMaria did not report the situation to her parents or teachers. She later disclosed that she was unaware that what was happening constituted abuse. The concept of "online grooming" was entirely unfamiliar to her, as was the understanding that digital images, once shared, could be distributed indefinitely. The case was ultimately reported when a teacher noticed behavioral changes and referred her to the school guidance counselor.\n\nThis case exemplifies the critical absence of digital safety education. Had Maria — or her parents — possessed basic knowledge of online grooming indicators, the exploitation could have been identified and interrupted at a much earlier stage.',
    lessons: [
      'Children below the minimum age requirement frequently bypass platform safeguards.',
      'Digital literacy programs must begin before children access social media.',
      'Parents in underserved communities require culturally appropriate digital safety training.',
      'Educators serve as a critical secondary line of detection and intervention.',
    ],
  },
  {
    id: 2,
    label: 'Case File 002',
    title: 'Live-Streaming Exploitation in a Household',
    age: 'Multiple minors, Luzon Region',
    summary:
      'An organized operation within a household produced live-stream OSAEC content directed by foreign buyers through encrypted messaging applications.',
    narrative:
      'In a densely populated urban community in Luzon, a household headed by a relative of the victims operated a live-streaming exploitation ring targeting children aged 5 to 12. The operation was directed remotely by individuals located abroad who communicated instructions through encrypted messaging applications and compensated the household through digital payment platforms.\n\nThe exploitation persisted for approximately two years before law enforcement intervention. The household presented an outward appearance of normalcy, and neighbors reported no suspicion of illicit activity. The children continued to attend school intermittently, though their academic performance deteriorated significantly.\n\nThe case was identified through international cooperation between the Philippine National Police\'s Women and Children Protection Center (WCPC) and the Australian Federal Police, triggered by financial transaction monitoring and digital forensic evidence. The operation resulted in the rescue of seven children and the arrest of three adults.\n\nThis case underscores the sophistication with which OSAEC operations can embed themselves within communities and families. It also highlights the role of technology — both as an enabler of exploitation and as a tool for detection and prosecution. The encrypted nature of the communication channels used by perpetrators represents an ongoing challenge for law enforcement agencies worldwide.',
    lessons: [
      'OSAEC can be facilitated by family members and trusted adults.',
      'Economic incentives from foreign perpetrators drive domestic exploitation.',
      'Community awareness programs are essential for identifying signs of exploitation.',
      'International law enforcement cooperation is critical for case resolution.',
    ],
  },
  {
    id: 3,
    label: 'Case File 003',
    title: 'Cyberbullying and Sextortion of a Teenage Student',
    age: '15 years old, Mindanao Region',
    summary:
      'A high school student was subjected to sextortion after sharing personal images with a peer, leading to severe psychological distress.',
    narrative:
      'Daniel (not his real name), a 15-year-old Grade 10 student from Mindanao, shared intimate photographs with a classmate he believed to be in a romantic relationship with. When the relationship ended, the images were shared among a wider peer group through a private messaging chain. Daniel subsequently received threats from unknown individuals demanding payment in exchange for not distributing the images further.\n\nThe sextortion resulted in severe psychological distress, social withdrawal, and a significant decline in academic performance. Daniel did not report the situation for several weeks due to shame and the fear that he would be blamed for having shared the images. When he eventually confided in a cousin, the family struggled to navigate the reporting process, encountering jurisdictional ambiguity and a lack of dedicated support services for male victims of online sexual exploitation.\n\nDaniel\'s case illuminates several systemic deficiencies. First, the widespread assumption that OSAEC and sextortion affect only female victims creates barriers to reporting and support for male adolescents. Second, the absence of school-based digital citizenship programs left Daniel without the framework to understand that sharing intimate images carries irreversible consequences. Third, the fragmented reporting and support infrastructure delayed intervention and compounded the psychological harm sustained.',
    lessons: [
      'Sextortion affects both male and female adolescents.',
      'Peer-to-peer exploitation requires targeted educational interventions.',
      'Reporting mechanisms must be accessible, non-judgmental, and gender-inclusive.',
      'Schools must integrate digital citizenship into standard curricula.',
    ],
  },
  {
    id: 4,
    label: 'Case File 004',
    title: 'Data Harvesting Through an Educational Application',
    age: 'Multiple students, National',
    summary:
      'A purportedly educational mobile application collected sensitive personal data from Filipino minors without adequate parental consent mechanisms.',
    narrative:
      'During the height of remote learning in the Philippines, a mobile application marketed as a "study companion" for Grade 4 to Grade 6 students gained rapid adoption across public and private schools. The application offered free access to quizzes, educational games, and study materials aligned with the Philippine K-12 curriculum. Teachers recommended the application to parents as a supplementary learning tool, and adoption exceeded 200,000 downloads within three months.\n\nA subsequent investigation by digital rights advocates revealed that the application collected extensive personal data from its minor users, including full names, school names, geolocation data, device identifiers, and photographs uploaded as profile images. The application\'s privacy policy, written in dense legal language and accessible only in English, contained provisions for sharing user data with unspecified "marketing partners." No meaningful parental consent mechanism existed; the application required only a single checkbox confirmation that the user was "13 or older."\n\nThe data collected was found to have been transmitted to servers located outside the Philippines, raising questions about jurisdictional enforcement of data protection standards. The National Privacy Commission (NPC) subsequently issued a compliance order, but the incident exposed the vulnerability of Filipino minors to data harvesting practices that exploit the gap between digital adoption and data privacy awareness.\n\nThis case demonstrates that the protection of children online extends beyond direct exploitation to encompass the broader domain of data privacy and the commodification of personal information.',
    lessons: [
      'Educational applications require rigorous data privacy scrutiny.',
      'Parental consent mechanisms for minors must be meaningful and verifiable.',
      'Data privacy literacy must be integrated into digital safety education.',
      'The National Privacy Commission\'s mandate must extend to proactive enforcement.',
    ],
  },
];

export default function CaseStudies() {
  // ✅ Fix: typed as number | null so setActiveCase accepts both cs.id (number) and null
  const [activeCase, setActiveCase] = useState(/** @type {number | null} */ (null));

  const active = caseStudies.find((c) => c.id === activeCase);

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
                  Documented Patterns
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8">
                  Case Studies
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-xl">
                  The following case studies are constructed from documented patterns of online
                  sexual abuse and exploitation of children (OSAEC) in the Philippines. All names,
                  locations, and identifying details have been anonymized to protect the identities
                  of real individuals.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3}>
              <img
                src={CASE_IMG}
                alt="Digital devices showing the complexity of online child safety challenges in the Philippines"
                className="w-full rounded-xl shadow-2xl shadow-primary/10"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Case Files"
            title="Patterns of Exploitation"
            description="Four representative case studies illustrating the range of online threats faced by Filipino children across different regions and contexts."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((cs, i) => (
              <ScrollReveal key={cs.id} delay={i * 0.1}>
                <button
                  // ✅ Fix: cast cs.id to satisfy the number | null state setter
                  onClick={() => setActiveCase(/** @type {number} */ (cs.id))}
                  className="w-full text-left group bg-card border border-border rounded-xl p-8 transition-all duration-500 hover:shadow-xl hover:shadow-accent/5"
                >
                  <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-accent mb-3 block">
                    {cs.label}
                  </span>
                  <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-2">
                    {cs.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground mb-4">{cs.age}</p>
                  <p className="font-body text-base text-muted-foreground leading-relaxed mb-6">
                    {cs.summary}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-accent font-body text-sm font-semibold group-hover:gap-3 transition-all">
                    Read Full Case <ArrowRight className="h-4 w-4" />
                  </span>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case Detail Modal */}
      {active && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-foreground/60 backdrop-blur-sm p-4 lg:p-8">
          <div className="relative bg-background rounded-2xl shadow-2xl max-w-3xl w-full my-8">
            <div className="sticky top-0 bg-background/95 backdrop-blur-sm rounded-t-2xl border-b border-border px-8 py-6 flex items-center justify-between z-10">
              <div>
                <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-accent block mb-1">
                  {active.label}
                </span>
                <h2 className="font-heading text-2xl font-bold text-foreground">{active.title}</h2>
              </div>
              <button
                onClick={() => setActiveCase(null)}
                className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="px-8 py-8">
              <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-200 rounded-lg px-4 py-2.5 mb-6">
                <span className="text-yellow-500 text-sm">⚠️</span>
                <p className="font-body text-xs text-yellow-800">This case file is <strong>AI-generated</strong> for educational purposes. It does not represent a real individual or actual case record.</p>
              </div>
              <p className="font-body text-sm text-muted-foreground mb-8">{active.age}</p>
              <div className="space-y-6 font-body text-base text-muted-foreground leading-relaxed">
                {active.narrative.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="mt-10 pt-8 border-t border-border">
                <h4 className="font-heading text-lg font-bold text-foreground mb-4">Key Lessons</h4>
                <ul className="space-y-3">
                  {active.lessons.map((lesson, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="font-heading text-accent font-bold text-sm mt-0.5">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="font-body text-base text-muted-foreground">{lesson}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-8">
                <Link
                  to="/laws"
                  onClick={() => setActiveCase(null)}
                  className="inline-flex items-center gap-2 text-accent font-body text-sm font-semibold hover:gap-3 transition-all"
                >
                  Explore Legal Protections <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <ScrollReveal>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-6">
              These stories demand action.
            </h2>
            <p className="font-body text-lg text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
              Behind every statistic is a child whose safety was compromised. Understanding these
              patterns is the first step toward building the protective infrastructure that Filipino
              children deserve.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/laws"
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90"
              >
                View Legal Framework
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm transition-all hover:bg-muted"
              >
                Explore Solutions
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}