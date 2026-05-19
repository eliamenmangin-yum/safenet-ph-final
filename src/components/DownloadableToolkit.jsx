import { useState } from 'react';
import { Download, FileText, Image, CheckSquare, Users, GraduationCap, Filter } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

// ✅ Import all the actual resource files
import osaecPoster from '../assets/osaec-poster.png';
import onlineGroomingPoster from '../assets/online-gromming.png';
import stayAppPoster from '../assets/stay-app.png';
import digitalCitizenshipPDF from '../assets/Digital_Citizenship.pdf';
import digitalSafetyBlueprintPDF from '../assets/Digital_Safety_Blueprint.pdf';
import onlineAbuseFieldGuidePDF from '../assets/Online_Abuse_Field_Guide.pdf';
import safeNetDigitalBlueprintPDF from '../assets/SafeNet_Digital_Safety_Blueprint.pdf';
import safeNetPHDigitalBlueprintPDF from '../assets/SafeNet_PH_Digital_Blueprint.pdf';

const TOOLKITS = [
  {
    id: 1,
    audience: 'Parents',
    type: 'Checklist',
    icon: CheckSquare,
    title: 'Setting Up Parental Controls',
    description: 'A step-by-step checklist covering parental control settings for iOS, Android, YouTube Kids, Facebook, TikTok, and Roblox.',
    pages: '4-page PDF',
    color: 'bg-blue-50 border-blue-200',
    iconColor: 'text-blue-600',
    badgeColor: 'bg-blue-100 text-blue-700',
    file: digitalSafetyBlueprintPDF,
    filename: 'SafeNetPH_Parental_Controls_Checklist.pdf',
  },
  {
    id: 2,
    audience: 'Parents',
    type: 'Infographic',
    icon: Image,
    title: 'Warning Signs of Online Grooming',
    description: 'A printable infographic that helps parents identify early behavioral and digital warning signs that a child may be targeted by an online predator.',
    pages: '1-page Poster',
    color: 'bg-orange-50 border-orange-200',
    iconColor: 'text-orange-600',
    badgeColor: 'bg-orange-100 text-orange-700',
    file: onlineGroomingPoster,
    filename: 'SafeNetPH_Online_Grooming_Warning_Signs.png',
  },
  {
    id: 3,
    audience: 'Parents',
    type: 'Guide',
    icon: FileText,
    title: 'Family Online Safety Agreement',
    description: 'A fill-in-the-blank family contract that establishes shared screen time rules, safe browsing habits, and emergency reporting procedures for the household.',
    pages: '2-page PDF',
    color: 'bg-green-50 border-green-200',
    iconColor: 'text-green-600',
    badgeColor: 'bg-green-100 text-green-700',
    file: safeNetDigitalBlueprintPDF,
    filename: 'SafeNetPH_Family_Safety_Agreement.pdf',
  },
  {
    id: 4,
    audience: 'Teachers',
    type: 'Activity Pack',
    icon: GraduationCap,
    title: 'Digital Citizenship Classroom Activity Pack',
    description: 'DepEd-aligned lesson activities for Grades 4–6 covering digital footprints, online privacy, cyberbullying response, and responsible social media use.',
    pages: '12-page PDF',
    color: 'bg-purple-50 border-purple-200',
    iconColor: 'text-purple-600',
    badgeColor: 'bg-purple-100 text-purple-700',
    file: digitalCitizenshipPDF,
    filename: 'SafeNetPH_Digital_Citizenship_Activity_Pack.pdf',
  },
  {
    id: 5,
    audience: 'Teachers',
    type: 'Infographic',
    icon: Image,
    title: 'OSAEC Awareness Classroom Poster',
    description: 'A classroom-ready poster summarizing what OSAEC is, its legal consequences under RA 11930, and how students can safely report suspicious activity.',
    pages: '1-page Poster',
    color: 'bg-teal-50 border-teal-200',
    iconColor: 'text-teal-600',
    badgeColor: 'bg-teal-100 text-teal-700',
    file: osaecPoster,
    filename: 'SafeNetPH_OSAEC_Awareness_Classroom_Poster.png',
  },
  {
    id: 6,
    audience: 'Teachers',
    type: 'Guide',
    icon: FileText,
    title: 'Responding to Student Disclosures',
    description: 'A practical guide for educators on how to respond when a student discloses online abuse — including documentation steps, referral procedures, and trauma-informed communication.',
    pages: '6-page PDF',
    color: 'bg-red-50 border-red-200',
    iconColor: 'text-red-600',
    badgeColor: 'bg-red-100 text-red-700',
    file: onlineAbuseFieldGuidePDF,
    filename: 'SafeNetPH_Responding_to_Student_Disclosures.pdf',
  },
  {
    id: 7,
    audience: 'Parents',
    type: 'Checklist',
    icon: CheckSquare,
    title: 'App Safety Quick-Reference Card',
    description: 'A fridge-ready card rating 10 popular apps (TikTok, Roblox, Discord, etc.) by risk level for children under 13 and under 17, with the top privacy setting for each.',
    pages: '1-page Card',
    color: 'bg-yellow-50 border-yellow-200',
    iconColor: 'text-yellow-600',
    badgeColor: 'bg-yellow-100 text-yellow-700',
    file: stayAppPoster,
    filename: 'SafeNetPH_App_Safety_Quick_Reference.png',
  },
  {
    id: 8,
    audience: 'Teachers',
    type: 'Activity Pack',
    icon: GraduationCap,
    title: 'Senior High School Digital Safety Module',
    description: 'A discussion-based module for Grades 11–12 covering sextortion, data privacy rights under RA 10173, reporting mechanisms, and peer-to-peer safety advocacy.',
    pages: '8-page PDF',
    color: 'bg-indigo-50 border-indigo-200',
    iconColor: 'text-indigo-600',
    badgeColor: 'bg-indigo-100 text-indigo-700',
    file: safeNetPHDigitalBlueprintPDF,
    filename: 'SafeNetPH_Senior_High_School_Module.pdf',
  },
];

const FILTERS = ['All', 'Parents', 'Teachers'];
const TYPE_FILTERS = ['All Types', 'Checklist', 'Infographic', 'Guide', 'Activity Pack'];

export default function DownloadableToolkit() {
  const [audienceFilter, setAudienceFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All Types');
  const [downloading, setDownloading] = useState(null);

  const filtered = TOOLKITS.filter(t => {
    const audMatch = audienceFilter === 'All' || t.audience === audienceFilter;
    const typeMatch = typeFilter === 'All Types' || t.type === typeFilter;
    return audMatch && typeMatch;
  });

  const handleDownload = async (toolkit) => {
    setDownloading(toolkit.id);
    try {
      // ✅ Download the actual file directly
      const a = document.createElement('a');
      a.href = toolkit.file;
      a.download = toolkit.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading
          label="Downloadable Toolkit"
          title="Take SafeNet PH Offline"
          description="Free printable resources for parents and teachers — checklists, infographics, activity packs, and guides you can use at home or in the classroom."
        />

        {/* Filters */}
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 mr-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="font-body text-sm text-muted-foreground">Audience:</span>
            </div>
            {FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setAudienceFilter(f)}
                className={`px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all border ${
                  audienceFilter === f
                    ? 'bg-accent text-accent-foreground border-accent'
                    : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
            <div className="flex items-center gap-2 ml-4 mr-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="font-body text-sm text-muted-foreground">Type:</span>
            </div>
            {TYPE_FILTERS.map(f => (
              <button
                key={f}
                onClick={() => setTypeFilter(f)}
                className={`px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all border ${
                  typeFilter === f
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((toolkit, i) => (
            <ScrollReveal key={toolkit.id} delay={i * 0.05}>
              <div className={`flex flex-col h-full rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg ${toolkit.color}`}>
                {/* Badges */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-block text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${toolkit.badgeColor}`}>
                    {toolkit.audience}
                  </span>
                  <span className="inline-block text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/60 text-muted-foreground">
                    {toolkit.type}
                  </span>
                </div>

                {/* Icon + Title */}
                <toolkit.icon className={`h-7 w-7 mb-3 flex-shrink-0 ${toolkit.iconColor}`} />
                <h3 className="font-heading text-base font-bold text-foreground mb-2 leading-snug">
                  {toolkit.title}
                </h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1 mb-4">
                  {toolkit.description}
                </p>

                {/* Footer */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5">
                  <span className="font-body text-[10px] text-muted-foreground">{toolkit.pages}</span>
                  <button
                    onClick={() => handleDownload(toolkit)}
                    disabled={downloading === toolkit.id}
                    className="inline-flex items-center gap-1.5 bg-white border border-black/10 hover:bg-accent hover:text-accent-foreground hover:border-accent text-foreground px-3 py-1.5 rounded-lg font-body text-xs font-semibold transition-all disabled:opacity-60 shadow-sm"
                  >
                    {downloading === toolkit.id ? (
                      <>
                        <span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        Downloading…
                      </>
                    ) : (
                      <>
                        <Download className="h-3 w-3" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="font-body text-muted-foreground">No resources match the selected filters.</p>
          </div>
        )}

        <ScrollReveal>
          <p className="font-body text-xs text-muted-foreground text-center mt-8">
            All resources are AI-generated by NotebookLM for educational purposes as part of the SafeNet PH NEMSU Academic Research Project. Not intended as legal advice.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}