import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

const LEGAL_REFS = [
  {
    id: 'acm2018',
    citation: 'Association for Computing Machinery. (2018). ACM code of ethics and professional conduct. https://www.acm.org/code-of-ethics',
  },
  {
    id: 'ra10173',
    citation: 'Republic Act No. 10173. (2012). Data Privacy Act of 2012. Republic of the Philippines. https://www.privacy.gov.ph/data-privacy-act/',
  },
  {
    id: 'ra11930',
    citation: 'Republic Act No. 11930. (2022). Anti-Online Sexual Abuse or Exploitation of Children and Anti-Child Sexual Abuse or Exploitation Materials Act. Republic of the Philippines. https://elibrary.judiciary.gov.ph/thebookshelf/showdocs/2/95572',
  },
];

const RRL_REFS = [
  {
    id: 'cicc2023',
    citation: 'Cybercrime Investigation and Coordinating Center. (2023). Philippines ranked 2nd in online sexual abuse and exploitation of children. Department of Information and Communications Technology. https://news.abs-cbn.com/spotlight/09/19/23/ph-world-no-2-in-online-sexual-abuse-exploitation-of-children-cicc',
  },
  {
    id: 'galagan2024',
    citation: 'Galagan, L., & Boytcheva, S. (2024). The uses of chatbots in the context of children and teenagers bullying: A systematic literature review. Cogent Education, 11(1), Article 2312032. https://doi.org/10.1080/2331186X.2024.2312032',
  },
  {
    id: 'ieee2021',
    citation: 'IEEE Standards Association. (2021). IEEE 2089-2021: Standard for an age appropriate digital services framework based on the 5Rights principles for children. IEEE. https://standards.ieee.org/ieee/2089/7699/',
  },
  {
    id: 'ijm2023',
    citation: 'International Justice Mission. (2023). 1 in 100 children sexually exploited in livestreams, new abuse images and videos in the Philippines last year, driven by foreign demand. https://www.ijm.org/news/1-in-100-children-sexually-exploited-livestreams-new-abuse-images-videos-philippines-last-year-driven-by-foreign-demand',
  },
  {
    id: 'justicecare2023',
    citation: 'Justice and Care. (2023). Online sexual exploitation of children: Issue brief. https://justiceandcare.org/app/uploads/2023/10/Justice-and-Care-Issue-Brief_Online-Sexual-Exploitation-of-Children_Oct-2023.pdf',
  },
  {
    id: 'opengov2024',
    citation: 'OpenGov Asia. (2024, March 30). Ensuring digital safety for children in the Philippines. https://archive.opengovasia.com/2024/03/30/ensuring-digital-safety-for-children-in-the-philippines/',
  },
  {
    id: 'roche2023',
    citation: 'Roche, S., Herdy, R., Ang, A., & Cooney, A. (2023). Online sexual exploitation of children in the Philippines: A scoping review. Children and Youth Services Review, 148, Article 106861. https://doi.org/10.1016/j.childyouth.2023.106861',
  },
  {
    id: 'safeonline2024',
    citation: 'Safe Online. (2024). Safe Online report 2024. End Violence Against Children. https://safeonline.global/safe-online-report-2024/',
  },
  {
    id: 'unicef2022',
    citation: 'UNICEF, ECPAT International, & Interpol. (2022). Disrupting harm in the Philippines: Evidence on online child sexual exploitation and abuse. Global Partnership to End Violence Against Children. https://www.unicef.org/philippines/reports/disrupting-harm-philippines',
  },
  {
    id: 'unicef2021',
    citation: 'UNICEF Philippines. (2021). Philippines kids online: The online experiences of children in the Philippines – Opportunities, risks and harms. https://www.unicef.org/philippines/media/2706/file/UNIPH-2021-PhilippinesKidsOnline-FullReport.pdf',
  },
  {
    id: 'unicef2024',
    citation: 'UNICEF Philippines. (2024). Young people in the Philippines speak out on online safety. https://www.unicef.org/philippines/stories/young-people-philippines-speak-out-online-safety',
  },
];

function RefEntry({ citation }) {
  // Split at the URL (http) to render it as a link
  const urlMatch = citation.match(/(https?:\/\/\S+)/);
  if (!urlMatch) {
    return <p className="font-body text-sm text-muted-foreground leading-relaxed">{citation}</p>;
  }
  const urlIndex = citation.indexOf(urlMatch[0]);
  const before = citation.slice(0, urlIndex);
  const url = urlMatch[0];
  return (
    <p className="font-body text-sm text-muted-foreground leading-relaxed">
      {before}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent hover:underline break-all"
      >
        {url}
      </a>
    </p>
  );
}

export default function References() {
  return (
    <section className="py-24 lg:py-32 bg-muted/30">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="APA 7th Edition"
          title="References"
        />

        {/* Legal & Ethical */}
        <ScrollReveal>
          <h3 className="font-heading text-lg font-bold text-foreground mb-6">
            Legal and Ethical Framework References
          </h3>
          <div className="space-y-5 mb-12">
            {LEGAL_REFS.map((ref) => (
              <div key={ref.id} className="pl-8 -indent-8">
                <RefEntry citation={ref.citation} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* RRL */}
        <ScrollReveal delay={0.1}>
          <h3 className="font-heading text-lg font-bold text-foreground mb-6">
            Related Review of Literature (RRL) References (2021–2026)
          </h3>
          <div className="space-y-5">
            {RRL_REFS.map((ref) => (
              <div key={ref.id} className="pl-8 -indent-8">
                <RefEntry citation={ref.citation} />
              </div>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <p className="font-body text-xs text-muted-foreground mt-10 border-t border-border pt-6">
            Santos, C. T., & Mangin, E. A. (2026). <em>SafeNet PH: A web-based information platform and AI chatbot for children's online safety and data protection in the Philippines</em> [Academic case study, CS 323]. College of Information Technology Education, North Eastern Mindanao State University.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}