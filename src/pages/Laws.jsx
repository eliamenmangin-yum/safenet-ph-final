import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '../components/ScrollReveal';
import SectionHeading from '../components/SectionHeading';

const LAWS_IMG = 'https://media.base44.com/images/public/69d7ec9b174b8bf68d639157/e84d1d60d_generated_ee91875d.png';

const laws = [
  {
    id: 'ra7610',
    name: 'Republic Act No. 7610',
    title: 'Special Protection of Children Against Abuse, Exploitation and Discrimination Act (1992)',
    formal:
      'It is hereby declared to be the policy of the State to provide special protection to children from all forms of abuse, neglect, cruelty exploitation and discrimination and other conditions, prejudicial their development; provide sanctions for their commission and carry out a program for prevention and deterrence of and crisis intervention in situations of child abuse, exploitation and discrimination. The State shall intervene on behalf of the child when the parent, guardian, teacher or person having care or custody of the child fails or is unable to protect the child against abuse, exploitation and discrimination or when such acts against the child are committed by the said parent, guardian, teacher or person having care and custody of the same. The best interests of children shall be the paramount consideration in all actions concerning them, whether undertaken by public or private social welfare institutions, courts of law, administrative authorities, and legislative bodies, consistent with the principle of First Call for Children as enunciated in the United Nations Convention of the Rights of the Child.',
    source: 'https://lawphil.net/statutes/repacts/ra1992/ra_7610_1992.html',
    sourceLabel: 'Republic Act No. 7610 — LawPhil Project',
  },
  {
    id: 'ra9775',
    name: 'Republic Act No. 9775',
    title: 'Anti-Child Pornography Act of 2009',
    formal:
      'The State recognizes the vital role of the youth in nation building and shall promote and protect their physical, moral, spiritual, intellectual, emotional, psychological and social well-being. Towards this end, the State shall: (a) Guarantee the fundamental rights of every child from all forms of neglect, cruelty and other conditions prejudicial to his/her development; (b) Protect every child from all forms of exploitation and abuse including, but not limited to: (1) the use of a child in pornographic performances and materials; and (2) the inducement or coercion of a child to engage or be involved in pornography through whatever means; and (c) Comply with international treaties to which the Philippines is a signatory or a State party concerning the rights of children which include, but not limited to, the Convention on the Rights of the Child, the Optional Protocol to the Convention on the Rights of the Child on the Sale of Children, Child Prostitution and Child Pornography, the International Labor Organization (ILO) Convention No. 182 on the Elimination of the Worst Forms of Child Labor and the Convention Against Transnational Organized Crime.',
    source: 'https://lawphil.net/statutes/repacts/ra2009/ra_9775_2009.html',
    sourceLabel: 'Republic Act No. 9775 — LawPhil Project',
  },
  {
    id: 'ra10175',
    name: 'Republic Act No. 10175',
    title: 'Cybercrime Prevention Act of 2012',
    formal:
      'The State recognizes the vital role of information and communications industries such as content production, telecommunications, broadcasting electronic commerce, and data processing, in the nation\'s overall social and economic development. The State also recognizes the importance of providing an environment conducive to the development, acceleration, and rational application and exploitation of information and communications technology (ICT) to attain free, easy, and intelligible access to exchange and/or delivery of information; and the need to protect and safeguard the integrity of computer, computer and communications systems, networks, and databases, and the confidentiality, integrity, and availability of information and data stored therein, from all forms of misuse, abuse, and illegal access by making punishable under the law such conduct or conducts. In this light, the State shall adopt sufficient powers to effectively prevent and combat such offenses by facilitating their detection, investigation, and prosecution at both the domestic and international levels, and by providing arrangements for fast and reliable international cooperation.',
    source: 'https://lawphil.net/statutes/repacts/ra2012/ra_10175_2012.html',
    sourceLabel: 'Republic Act No. 10175 — LawPhil Project',
  },
  {
    id: 'ra10173',
    name: 'Republic Act No. 10173',
    title: 'Data Privacy Act of 2012',
    formal:
      'It is the policy of the State to protect the fundamental human right of privacy, of communication while ensuring free flow of information to promote innovation and growth. The State recognizes the vital role of information and communications technology in nation-building and its inherent obligation to ensure that personal information in information and communications systems in the government and in the private sector are secured and protected.',
    source: 'https://lawphil.net/statutes/repacts/ra2012/ra_10173_2012.html',
    sourceLabel: 'Republic Act No. 10173 — LawPhil Project',
  },
  {
    id: 'ra11930',
    name: 'Republic Act No. 11930',
    title: 'Anti-Online Sexual Abuse or Exploitation of Children (Anti-OSAEC) Act of 2022',
    formal:
      'It is the policy of the State to provide special protections to children from all forms of sexual violence, abuse and exploitation especially those committed with the use of information and communications technology (ICT), provide sanctions for their commission and carry out programs for the prevention, deterrence and intervention in all situations of online sexual abuse and exploitation of children in the digital and non-digital production, distribution or possession of child sexual abuse or exploitation material. The State shall guarantee the fundamental rights of every child from all forms of neglect, cruelty and other conditions prejudicial to their development, and shall protect every child from all forms of abuse or exploitation, whether committed with or without the use of ICT, including performances and materials through online or offline means, and the inducement or coercion of a child to engage or be involved in child sexual abuse or exploitation materials through whatever means.',
    source: 'https://lawphil.net/statutes/repacts/ra2022/ra_11930_2022.html',
    sourceLabel: 'Republic Act No. 11930 — LawPhil Project',
  },
];

export default function Laws() {
  // ✅ Fix: typed as string | null so setExpandedLaw accepts both law.id (string) and null
  const [expandedLaw, setExpandedLaw] = useState(/** @type {string | null} */ (null));

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
                  environments. Each law below displays its official Declaration of Policy, sourced
                  directly from the LawPhil Project — the Philippines' authoritative legal database.
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
            description="Each entry below quotes the official Declaration of Policy text taken verbatim from the LawPhil Project. Click the citation link to read the full law."
          />

          {/* Source disclaimer */}
          <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-xl px-5 py-4 mb-10">
            <span className="text-blue-500 text-lg flex-shrink-0 mt-0.5">ℹ️</span>
            <p className="font-body text-sm text-blue-800 leading-relaxed">
              <span className="font-bold">Source Notice:</span> All legislative descriptions below are quoted verbatim from the official text of each Republic Act as published on the{' '}
              <a href="https://lawphil.net" target="_blank" rel="noopener noreferrer" className="underline font-semibold hover:opacity-80">LawPhil Project (lawphil.net)</a>
              {' '}— the Philippines' official legal reference database maintained by the Arellano Law Foundation. These are not paraphrased or AI-generated summaries.
            </p>
          </div>

          <div className="space-y-6">
            {laws.map((law, i) => {
              const isExpanded = expandedLaw === law.id;
              return (
                <ScrollReveal key={law.id} delay={i * 0.08}>
                  <div className="bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/5">
                    <button
                      // ✅ Fix: toggle between law.id (string) and null — both valid for string | null
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
                        <div className="bg-muted/50 rounded-lg p-6">
                          <div className="flex items-center gap-2 mb-3">
                            <h4 className="font-heading text-sm font-bold text-foreground uppercase tracking-wider">
                              Official Declaration of Policy
                            </h4>
                            <span className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-body font-semibold">
                              Verbatim from LawPhil
                            </span>
                          </div>
                          <blockquote className="font-body text-base text-muted-foreground leading-relaxed mb-5 border-l-4 border-accent/30 pl-4 italic">
                            "{law.formal}"
                          </blockquote>
                          <a
                            href={law.source}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-accent font-body text-sm font-semibold underline hover:opacity-80"
                          >
                            📄 {law.sourceLabel}
                          </a>
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
    </div>
  );
}