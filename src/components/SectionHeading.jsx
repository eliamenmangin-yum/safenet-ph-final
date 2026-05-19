import ScrollReveal from './ScrollReveal';

/**
 * @param {{ label?: string, title: string, description?: string, align?: 'left' | 'center' }} props
 */
export default function SectionHeading({ label, title, description, align = 'left' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left';

  return (
    <ScrollReveal className={`max-w-3xl ${alignClass} mb-12`}>
      {label && (
        <span className="inline-block text-accent font-body text-xs font-bold tracking-widest uppercase mb-3 bg-accent/10 px-3 py-1 rounded-full">
          {label}
        </span>
      )}
      <h2 className="font-heading text-3xl md:text-4xl font-black text-foreground leading-tight mb-4">
        {title}
      </h2>
      {description && (
        <p className="font-body text-base text-muted-foreground leading-relaxed">
          {description}
        </p>
      )}
    </ScrollReveal>
  );
}