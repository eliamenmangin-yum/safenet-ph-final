import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronDown } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';

const LAWS_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/e84d1d60d_generated_ee91875d.png';

const laws = [
  {
    id: 'ra7610',
    name: 'Republic Act No. 7610',
    title: 'Special Protection of Children Against Abuse, Exploitation and Discrimination Act (1992)',
    formal:
      'This Act provides for stronger deterrence and special protection against child abuse, exploitation, and discrimination, providing penalties for their commission and for other purposes. It covers children who are "gravely threatened or endangered by circumstances which affect or will affect their survival and normal development," and establishes comprehensive protections across physical, emotional, and sexual abuse contexts.',
    simplified:
      'This is the foundational law that protects all Filipino children from any form of abuse, exploitation, and discrimination. In simple terms, it makes it a serious crime for anyone — whether a stranger, a relative, or even a parent — to abuse or exploit a child in any way. If someone hurts a child, forces them to do something inappropriate, or uses them for profit, they can face severe legal penalties including imprisonment. This law established the principle that the State has a special obligation to protect children, and it remains the bedrock upon which all subsequent child protection legislation has been built.',
  },
  {
    id: 'ra9775',
    name: 'Republic Act No. 9775',
    title: 'Anti-Child Pornography Act of 2009',
    formal:
      'This Act defines and criminalizes child pornography, prescribing penalties for the production, distribution, possession, and access of child sexual abuse materials. It establishes the duty of internet service providers (ISPs) to report and preserve evidence of child pornography, and mandates the installation of filtering software to block child sexual abuse materials. The law also recognizes technology-facilitated sexual exploitation as a distinct criminal act.',
    simplified:
      'This law specifically targets the creation, sharing, and possession of sexual images or videos involving children. If anyone takes, distributes, downloads, or even views such materials, they can face imprisonment of up to life and substantial fines. What makes this law particularly relevant today is that it also holds internet service providers (ISPs) accountable — they are required by law to report any child sexual abuse material they discover on their networks and to help law enforcement by preserving digital evidence. For parents, this means that the creation or distribution of any sexual content involving your child is a serious criminal offense, and there are legal tools available to pursue perpetrators.',
  },
  {
    id: 'ra10175',
    name: 'Republic Act No. 10175',
    title: 'Cybercrime Prevention Act of 2012',
    formal:
      'This Act defines cybercrime offenses, prescribes penalties, and provides for the prevention, investigation, suppression, and imposition of penalties for cybercrime. Relevant provisions include the criminalization of cybersex, child pornography committed through a computer system, unsolicited commercial communications, and computer-related identity theft. The law grants law enforcement the authority to collect real-time traffic data, conduct searches and seizures of computer data, and preserve computer data for investigative purposes.',
    simplified:
      'The Cybercrime Prevention Act is the Philippines\' primary law against crimes committed using computers and the internet. For children and families, this is important because it criminalizes online sexual exploitation (cybersex), the use of technology to distribute child sexual abuse materials, and online identity theft — including the creation of fake accounts to impersonate or deceive minors. When offenses under existing laws like RA 9775 are committed through the internet, this law imposes higher penalties. Practically, this means that if someone uses social media, messaging apps, or any digital platform to sexually exploit, harass, or deceive a child, they face enhanced criminal penalties. Law enforcement also has the authority to collect digital evidence and trace perpetrators across networks.',
  },
  {
    id: 'ra10173',
    name: 'Republic Act No. 10173',
    title: 'Data Privacy Act of 2012',
    formal:
      'This Act protects individual personal information in information and communications systems in the government and the private sector. It creates the National Privacy Commission (NPC) to administer and implement the provisions of the Act, monitor and ensure compliance, and provide assistance to data subjects. The Act establishes the rights of data subjects, the obligations of personal information controllers and processors, and the grounds for lawful processing of personal information, including sensitive personal information.',
    simplified:
      'The Data Privacy Act protects the personal information of all Filipinos, including children. When applications, websites, or companies collect personal data — such as names, school information, photographs, or location data — they must handle that information responsibly and securely. For parents and students, this means that any app or website your child uses is legally required to protect their personal data. If a company mishandles, sells, or exposes your child\'s information without proper consent, you can file a complaint with the National Privacy Commission. This law is particularly important in the context of educational applications that collect student data during remote learning. Parental consent is required before any entity collects personal information from children, and violations can result in imprisonment and fines.',
  },
  {
    id: 'ra11930',
    name: 'Republic Act No. 11930',
    title: 'Anti-Online Sexual Abuse or Exploitation of Children (Anti-OSAEC) Act of 2022',
    formal:
      'This Act institutionalizes stronger mechanisms for the prevention, detection, investigation, and prosecution of online sexual abuse or exploitation of children. It expands the definition of OSAEC to include grooming, live-streaming of sexual abuse, sexting involving minors, and the production or distribution of child sexual exploitation materials. The Act establishes the Inter-Agency Council Against Online Sexual Abuse or Exploitation of Children and mandates internet intermediaries to adopt mechanisms for reporting, preserving, blocking, and removing OSAEC content.',
    simplified:
      'This is the most comprehensive and recent Philippine law directly addressing online child exploitation. Signed in 2022, it was specifically designed to respond to the modern landscape of digital abuse. In clear terms, this law makes it a crime to groom a child online (the process of building trust with a child in order to exploit them), to livestream sexual abuse of a child, to engage in sexting with a minor, and to produce or share any sexual exploitation material involving children. The law also created a special inter-agency council that coordinates the government\'s response to OSAEC cases. Importantly, it requires social media platforms, messaging apps, and internet providers to actively detect, report, and remove OSAEC content. For families, RA 11930 represents the strongest legal tool currently available for protecting children in the digital environment.',
  },
];

export default function Laws() {
  const [expandedLaw, setExpandedLaw] = useState(null);

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
                  Legislative Architecture
                </span>
              </ScrollReveal>
              <ScrollReveal delay={0.1}>
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-8">
                  Laws & Policy
                </h1>
              </ScrollReveal>
              <ScrollReveal delay={0.2}>
                <p className="font-body text-lg text-muted-foreground leading-relaxed max-w-xl">
                  The Philippines has enacted a series of legislative measures that form a
                  comprehensive legal framework for protecting children in both physical and digital
                  environments. This section presents each law alongside a simplified explanation to
                  ensure that parents, educators, and students understand the protections available
                  to them.
                </p>
              </ScrollReveal>
            </div>
            <ScrollReveal delay={0.3}>
              <img
                src={LAWS_IMG}
                alt="Philippine legal documents on a desk with warm morning light, symbolizing the legislative framework for child protection"
                className="w-full rounded-xl shadow-2xl shadow-primary/10"
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Laws List */}
      <section className="py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="The Legal Shield"
            title="Philippine Laws Protecting Children Online"
            description="Each law below is presented in two formats: the formal legislative description and the SafeNet PH translation — a simplified explanation designed for parents, students, and educators."
          />

          <div className="space-y-6">
            {laws.map((law, i) => {
              const isExpanded = expandedLaw === law.id;
              return (
                <ScrollReveal key={law.id} delay={i * 0.08}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
                    <button
                      onClick={() => setExpandedLaw(isExpanded ? null : law.id)}
                      className="w-full text-left px-8 py-6 flex items-start justify-between gap-4"
                    >
                      <div>
                        <span className="font-body text-xs font-semibold tracking-[0.15em] uppercase text-accent block mb-2">
                          {law.name}
                        </span>
                        <h3 className="font-heading text-lg lg:text-xl font-bold text-foreground">
                          {law.title}
                        </h3>
                      </div>
                      <ChevronDown
                        className={`h-5 w-5 text-muted-foreground flex-shrink-0 mt-1 transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </button>

                    {isExpanded && (
                      <div className="px-8 pb-8">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                          <div className="bg-muted/50 rounded-lg p-6">
                            <h4 className="font-heading text-sm font-bold text-foreground mb-3 uppercase tracking-wider">
                              Formal Description
                            </h4>
                            <p className="font-body text-base text-muted-foreground leading-relaxed">
                              {law.formal}
                            </p>
                          </div>
                          <div className="bg-accent/5 border border-accent/10 rounded-lg p-6">
                            <h4 className="font-heading text-sm font-bold text-accent mb-3 uppercase tracking-wider">
                              SafeNet PH Translation
                            </h4>
                            <p className="font-body text-base text-foreground/80 leading-relaxed">
                              {law.simplified}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Summary */}
      <section className="py-24 lg:py-32 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 lg:px-8">
          <SectionHeading
            label="Assessment"
            title="Strong Laws, Weak Implementation"
          />
          <ScrollReveal>
            <div className="space-y-6 font-body text-base md:text-lg text-muted-foreground leading-relaxed">
              <p>
                The Philippine legislative framework for child online protection is, on paper, among
                the most comprehensive in Southeast Asia. From the foundational protections of
                Republic Act No. 7610 (1992) to the technology-specific provisions of Republic Act
                No. 11930 (2022), the country has established a legal architecture that addresses
                the full spectrum of online threats to children. The platform also operates in
                compliance with Republic Act No. 10173 (2012), the Data Privacy Act, and aligns
                with the ACM Code of Ethics and Professional Conduct (Association for Computing
                Machinery, 2018) and IEEE 2089-2021 (IEEE Standards Association, 2021).
              </p>
              <p>
                However, the effectiveness of any legal framework is ultimately measured not by its
                existence but by its implementation. UNICEF Philippines (2024) identified the
                awareness-to-action pathway as critically absent in current public health and safety
                interventions. Safe Online (2024) further notes that the Philippines' Multi-Year
                Strategic Action Plan on OSAEC (2024–2028) requires sustained community-level
                outreach to achieve its targets — a gap that platforms like SafeNet PH directly
                address.
              </p>
              <p>
                SafeNet PH was conceived in recognition of this gap. While legislative reform remains
                the domain of policymakers, the democratization of legal knowledge — ensuring that
                every Filipino parent, teacher, and child understands the protections available to
                them — is a task that technology and education can address. An informed citizenry is
                the most effective complement to a robust legal framework.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <div className="mt-12">
              <Link
                to="/solutions"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 rounded-lg font-body font-semibold text-sm transition-all hover:bg-accent/90"
              >
                See How SafeNet PH Bridges This Gap
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}