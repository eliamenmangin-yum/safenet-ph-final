import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';
import DigitalSafetyQuiz from '../components/DigitalSafetyQuiz';

const ABOUT_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/702769f6d_generated_b243d5a4.png';

const rootCauses = [
  {
    number: '01',
    title: 'Poverty and Economic Vulnerability',
    text: 'The Philippines faces a convergence of poverty and digital access that creates uniquely dangerous conditions for children. In many low-income communities, internet connectivity has expanded rapidly without corresponding investments in digital safety education. Roche et al. (2023) specifically identified poverty and inadequate parental oversight as the most consistent predictors of online child exploitation in the Philippine context, underscoring that the problem is simultaneously technological, social, and economic in nature.',
  },
  {
    number: '02',
    title: 'Digital Literacy Deficit',
    text: 'A pervasive gap in digital literacy compounds the vulnerability of Filipino children. As documented by the Cybercrime Investigation and Coordinating Center (2023), the Philippines ranked second globally in OSAEC cases, with officials identifying digital illiteracy as a primary contributing factor — particularly among caregivers who lack the skills to monitor or guide children\'s online behavior. Schools, especially in rural and underserved areas, lack structured digital citizenship curricula that would equip students with the knowledge to identify and resist online threats.',
  },
  {
    number: '03',
    title: 'Platform Accessibility Without Safeguards',
    text: 'The proliferation of social media platforms, messaging applications, and online gaming environments has outpaced the implementation of robust child protection mechanisms. Filipino children often create accounts on platforms with minimum age requirements that are easily circumvented. End-to-end encryption, while protecting user privacy, simultaneously creates spaces where predatory behavior can occur without detection. The gap between platform accessibility and platform accountability remains one of the most pressing challenges in child online safety.',
  },
  {
    number: '04',
    title: 'Insufficient Enforcement and Reporting Infrastructure',
    text: 'Despite the existence of protective legislation, enforcement remains inconsistent. The Philippine Internet Crimes Against Children Center (PICACC) and the Department of Justice have made significant strides, yet the sheer volume of cases overwhelms available resources. Many incidents go unreported due to stigma, fear of retaliation, or a lack of awareness about reporting mechanisms. Communities in remote areas often have no access to law enforcement trained in handling technology-facilitated crimes against children.',
  },
];

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-[0.03] pointer-events-none">
          <span className="font-heading text-[20rem] font-bold text-foreground leading-none block -mt-20">
            OSAEC
          </span>
        </div>
        <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
          <div className="max-w-3xl">
            <ScrollReveal>
              <span className="inline-block font-body text-xs font-semibold tracking-[0.2em] uppercase text-accent mb-6">
                Understanding the Crisis
              </span>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8">
                The Digital Threat
                <br />
                to Filipino Children
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                The Philippines has been identified by international agencies as one of the leading
                sources of online sexual abuse and exploitation of children (OSAEC) globally. This
                section examines the systemic factors that have created this crisis and the urgent
                need for comprehensive intervention.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Background */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <img
                src={ABOUT_IMG}
                alt="A parent's hand resting near a child's hand on a laptop, depicting the need for guided digital supervision"
                className="w-full rounded-xl shadow-2xl shadow-primary/10"
              />
            </ScrollReveal>
            <div>
              <SectionHeading
                label="Background"
                title="A Nation at the Crossroads of Connectivity and Risk"
              />
              <ScrollReveal delay={0.1}>
                <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                  <p>
                    The Philippines stands as one of the most digitally connected nations in Southeast
                    Asia, with over 76 million internet users as of 2023. Filipino children and
                    adolescents represent a significant portion of this online population, with many
                    gaining access to the internet at increasingly younger ages. While digital
                    connectivity has opened unprecedented avenues for education, communication, and
                    personal development, it has simultaneously exposed the nation's youth to a
                    spectrum of online risks that Philippine society is inadequately prepared to
                    address.
                  </p>
                  <p>
                   According to the International Justice Mission (IJM), one out of every 100
                   children in the Philippines was a victim of online sexual exploitation in 2022
                   alone, with the majority of cases involving live-streamed abuse produced for
                   foreign demand.{' '}
                   <a
                     href="https://www.ijm.org/news/1-in-100-children-sexually-exploited-livestreams-new-abuse-images-videos-philippines-last-year-driven-by-foreign-demand"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-accent underline hover:opacity-80 text-sm"
                   >
                     International Justice Mission, 2023
                   </a>
                   . A landmark study by UNICEF, ECPAT International, and Interpol (2022) found
                   that approximately 20% of internet-using Filipino children aged 12–17 had
                   experienced online child sexual abuse and exploitation between 2020 and 2021 —
                   an estimated two million child victims.{' '}
                   <a
                     href="https://www.unicef.org/philippines/reports/disrupting-harm-philippines"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-accent underline hover:opacity-80 text-sm"
                   >
                     UNICEF, ECPAT & Interpol, 2022
                   </a>
                   .
                  </p>
                  <p>
                   The COVID-19 pandemic further amplified these risks. Justice and Care (2023)
                   reported that the Department of Justice of the Philippines recorded a threefold
                   increase in OSAEC cases following pandemic quarantine measures, as families
                   turned to the internet for education and livelihood while children were left
                   with greater unsupervised online access.{' '}
                   <a
                     href="https://justiceandcare.org/app/uploads/2023/10/Justice-and-Care-Issue-Brief_Online-Sexual-Exploitation-of-Children_Oct-2023.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-accent underline hover:opacity-80 text-sm"
                   >
                     Justice and Care, 2023
                   </a>
                   . UNICEF Philippines (2021) documented that children and young people are
                   increasingly among the most active users of digital platforms, creating a
                   critical mismatch between platform design and the safety requirements of minors.{' '}
                   <a
                     href="https://www.unicef.org/philippines/media/2706/file/UNIPH-2021-PhilippinesKidsOnline-FullReport.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="text-accent underline hover:opacity-80 text-sm"
                   >
                     UNICEF Philippines, 2021
                   </a>
                   .
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Root Causes */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Root Causes"
            title="Why Filipino Children Are Vulnerable Online"
            description="The vulnerability of Filipino children in the digital space is not the result of a single factor but rather the convergence of socioeconomic, educational, technological, and institutional deficiencies."
          />
          <div className="space-y-12 lg:space-y-16">
            {rootCauses.map((cause, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start">
                  <div className="lg:col-span-1">
                    <span className="font-heading text-5xl font-bold text-accent/20">
                      {cause.number}
                    </span>
                  </div>
                  <div className="lg:col-span-3">
                    <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground">
                      {cause.title}
                    </h3>
                  </div>
                  <div className="lg:col-span-8">
                    <p className="font-body text-base md:text-lg text-muted-foreground leading-relaxed">
                      {cause.text}
                    </p>
                  </div>
                </div>
                {i < rootCauses.length - 1 && (
                  <div className="h-px bg-border mt-12 lg:mt-16" />
                )}
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Digital Literacy Problem */}
      <section className="py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="The Core Problem"
            title="Digital Literacy: The Missing Shield"
          />
          <ScrollReveal>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                At the heart of children's vulnerability lies a fundamental deficit in digital
                literacy — not merely the technical ability to use devices and applications, but the
                critical understanding of how to navigate digital spaces safely, ethically, and
                with awareness of potential dangers. Digital literacy, as it relates to child
                protection, encompasses the ability to recognize manipulative behavior online,
                understand the permanence and traceability of digital content, manage personal data
                and privacy settings, and seek help when confronted with threatening situations.
              </p>
              <p>
                In the Philippine context, this deficit is pervasive across demographics. A U-Report
                poll conducted by UNICEF Philippines (2024) found that only 13.52% of young
                respondents were familiar with the MAKABATA Helpline 1383 — the official government
                channel for reporting child rights violations online — despite the helpline having
                been launched the previous year.{' '}
                <a
                  href="https://www.unicef.org/philippines/stories/young-people-philippines-speak-out-online-safety"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:opacity-80 text-sm"
                >
                  UNICEF Philippines, 2024
                </a>
                . Similarly, the Department of Information and Communications Technology conducted
                cybersecurity orientations that reached only approximately 500 school participants
                in the first quarter of 2024, a fraction of the millions of Filipino children who
                access the internet daily.{' '}
                <a
                  href="https://archive.opengovasia.com/2024/03/30/ensuring-digital-safety-for-children-in-the-philippines/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:opacity-80 text-sm"
                >
                  OpenGov Asia, 2024
                </a>
                .
              </p>
              <p>
                This triad of uninformed parents, uneducated children, and underprepared educators
                creates an ecosystem in which predators can operate with minimal resistance. The
                absence of a unified, accessible, and research-driven digital literacy platform —
                one that speaks to the Philippine context in language familiar to Filipino families —
                represents the critical gap that SafeNet PH seeks to address.{' '}
                <a
                  href="https://www.unicef.org/philippines/media/2706/file/UNIPH-2021-PhilippinesKidsOnline-FullReport.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent underline hover:opacity-80 text-sm"
                >
                  UNICEF Philippines, 2021
                </a>
                .
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-12 flex gap-4">
              <Link
                to="/case-studies"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90"
              >
                View Case Studies
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Quiz */}
      <DigitalSafetyQuiz />
    </div>
  );
}