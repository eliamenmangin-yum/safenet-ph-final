import { useState } from 'react';
import { Download, FileText, Image, CheckSquare, Users, GraduationCap, Filter } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import SectionHeading from './SectionHeading';

const TOOLKITS = [
  { id: 1, audience: 'Parents', type: 'Checklist', icon: CheckSquare, title: 'Setting Up Parental Controls', description: 'A step-by-step checklist covering parental control settings for iOS, Android, YouTube Kids, Facebook, TikTok, and Roblox.', pages: '4-page PDF', color: 'bg-blue-50 border-blue-200', iconColor: 'text-blue-600', badgeColor: 'bg-blue-100 text-blue-700' },
  { id: 2, audience: 'Parents', type: 'Infographic', icon: Image, title: 'Warning Signs of Online Grooming', description: 'A printable infographic that helps parents identify early behavioral and digital warning signs.', pages: '1-page Poster', color: 'bg-orange-50 border-orange-200', iconColor: 'text-orange-600', badgeColor: 'bg-orange-100 text-orange-700' },
  { id: 3, audience: 'Parents', type: 'Guide', icon: FileText, title: 'Family Online Safety Agreement', description: 'A fill-in-the-blank family contract that establishes shared screen time rules and safe browsing habits.', pages: '2-page PDF', color: 'bg-green-50 border-green-200', iconColor: 'text-green-600', badgeColor: 'bg-green-100 text-green-700' },
  { id: 4, audience: 'Teachers', type: 'Activity Pack', icon: GraduationCap, title: 'Digital Citizenship Classroom Activity Pack', description: 'DepEd-aligned lesson activities for Grades 4–6 covering digital footprints, online privacy, and cyberbullying response.', pages: '12-page PDF', color: 'bg-purple-50 border-purple-200', iconColor: 'text-purple-600', badgeColor: 'bg-purple-100 text-purple-700' },
  { id: 5, audience: 'Teachers', type: 'Infographic', icon: Image, title: 'OSAEC Awareness Classroom Poster', description: 'A classroom-ready poster summarizing OSAEC, its legal consequences under RA 11930, and how to report.', pages: '1-page Poster', color: 'bg-teal-50 border-teal-200', iconColor: 'text-teal-600', badgeColor: 'bg-teal-100 text-teal-700' },
  { id: 6, audience: 'Teachers', type: 'Guide', icon: FileText, title: 'Responding to Student Disclosures', description: 'A practical guide for educators on how to respond when a student discloses online abuse.', pages: '6-page PDF', color: 'bg-red-50 border-red-200', iconColor: 'text-red-600', badgeColor: 'bg-red-100 text-red-700' },
  { id: 7, audience: 'Parents', type: 'Checklist', icon: CheckSquare, title: 'App Safety Quick-Reference Card', description: 'A fridge-ready card rating 10 popular apps by risk level for children under 13 and under 17.', pages: '1-page Card', color: 'bg-yellow-50 border-yellow-200', iconColor: 'text-yellow-600', badgeColor: 'bg-yellow-100 text-yellow-700' },
  { id: 8, audience: 'Teachers', type: 'Activity Pack', icon: GraduationCap, title: 'Senior High School Digital Safety Module', description: 'A discussion-based module for Grades 11–12 covering sextortion, data privacy rights under RA 10173.', pages: '8-page PDF', color: 'bg-indigo-50 border-indigo-200', iconColor: 'text-indigo-600', badgeColor: 'bg-indigo-100 text-indigo-700' },
];

const FILTERS = ['All', 'Parents', 'Teachers'];
const TYPE_FILTERS = ['All Types', 'Checklist', 'Infographic', 'Guide', 'Activity Pack'];

async function generateContent(toolkit) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Create a detailed printable content outline for this SafeNet PH educational resource:
Title: ${toolkit.title}
Audience: ${toolkit.audience}
Type: ${toolkit.type}
Description: ${toolkit.description}

Generate the full text content as the actual printable document. Include all sections, checklists, tips, and instructions. Write in both English and Filipino where appropriate. Keep it practical and actionable.`
      }]
    })
  });
  const data = await response.json();
  return data.content?.[0]?.text || '';
}

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
      const result = await generateContent(toolkit);
      const content = `SAFENET PH — ${toolkit.title.toUpperCase()}\nFor: ${toolkit.audience} | Type: ${toolkit.type}\nNorth Eastern Mindanao State University — SafeNet PH Research Project\n${'─'.repeat(60)}\n\n${result}\n\n${'─'.repeat(60)}\nSafeNet PH | NEMSU Academic Research Project`;
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `SafeNetPH_${toolkit.title.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } finally {
      setDownloading(null);
    }
  };

  return (
    <section className="py-24 lg:py-32 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <SectionHeading label="Downloadable Toolkit" title="Take SafeNet PH Offline" description="Free printable resources for parents and teachers." />
        <ScrollReveal>
          <div className="flex flex-wrap gap-3 mb-10">
            <div className="flex items-center gap-2 mr-2"><Users className="h-4 w-4 text-muted-foreground" /><span className="font-body text-sm text-muted-foreground">Audience:</span></div>
            {FILTERS.map(f => (
              <button key={f} onClick={() => setAudienceFilter(f)} className={`px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all border ${audienceFilter === f ? 'bg-accent text-accent-foreground border-accent' : 'border-border text-muted-foreground hover:border-accent/40 hover:text-foreground'}`}>{f}</button>
            ))}
            <div className="flex items-center gap-2 ml-4 mr-2"><Filter className="h-4 w-4 text-muted-foreground" /><span className="font-body text-sm text-muted-foreground">Type:</span></div>
            {TYPE_FILTERS.map(f => (
              <button key={f} onClick={() => setTypeFilter(f)} className={`px-4 py-1.5 rounded-full font-body text-sm font-medium transition-all border ${typeFilter === f ? 'bg-primary text-primary-foreground border-primary' : 'border-border text-muted-foreground hover:border-primary/40 hover:text-foreground'}`}>{f}</button>
            ))}
          </div>
        </ScrollReveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filtered.map((toolkit, i) => (
            <ScrollReveal key={toolkit.id} delay={i * 0.05}>
              <div className={`flex flex-col h-full rounded-xl border-2 p-5 transition-all duration-300 hover:shadow-lg ${toolkit.color}`}>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`inline-block text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full ${toolkit.badgeColor}`}>{toolkit.audience}</span>
                  <span className="inline-block text-[10px] font-body font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-white/60 text-muted-foreground">{toolkit.type}</span>
                </div>
                <toolkit.icon className={`h-7 w-7 mb-3 flex-shrink-0 ${toolkit.iconColor}`} />
                <h3 className="font-heading text-base font-bold text-foreground mb-2 leading-snug">{toolkit.title}</h3>
                <p className="font-body text-xs text-muted-foreground leading-relaxed flex-1 mb-4">{toolkit.description}</p>
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-black/5">
                  <span className="font-body text-[10px] text-muted-foreground">{toolkit.pages}</span>
                  <button onClick={() => handleDownload(toolkit)} disabled={downloading === toolkit.id}
                    className="inline-flex items-center gap-1.5 bg-white border border-black/10 hover:bg-accent hover:text-accent-foreground hover:border-accent text-foreground px-3 py-1.5 rounded-lg font-body text-xs font-semibold transition-all disabled:opacity-60 shadow-sm">
                    {downloading === toolkit.id ? (<><span className="h-3 w-3 border-2 border-current border-t-transparent rounded-full animate-spin" />Generating…</>) : (<><Download className="h-3 w-3" />Download</>)}
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-16"><p className="font-body text-muted-foreground">No resources match the selected filters.</p></div>}
        <ScrollReveal><p className="font-body text-xs text-muted-foreground text-center mt-8">All resources are AI-generated for educational purposes as part of the SafeNet PH NEMSU Academic Research Project.</p></ScrollReveal>
      </div>
    </section>
  );
}
