interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
  headingLevel?: 'h1' | 'h2';
}

export function SectionHeader({
  label,
  title,
  description,
  centered = true,
  light = false,
  headingLevel = 'h2',
}: SectionHeaderProps) {
  const Heading = headingLevel;

  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} mb-8 md:mb-12`}>
      {label && (
        <p className={`font-body text-[11px] font-semibold tracking-[2px] uppercase mb-3 text-brand-gold`}>
          {label}
        </p>
      )}
      <Heading className={`font-display text-2xl sm:text-3xl md:text-4xl lg:text-[42px] font-medium leading-tight mb-4 ${light ? 'text-white' : 'text-brand-walnut'}`}>
        {title}
      </Heading>
      <div className={`flex ${centered ? 'justify-center' : ''} mb-4`}>
        <div className="w-12 h-[2px] bg-brand-gold/60 rounded-full" />
      </div>
      {description && (
        <p className={`font-body text-base leading-relaxed ${light ? 'text-white/80' : 'text-brand-olive'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
