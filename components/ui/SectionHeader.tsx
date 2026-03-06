interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  centered?: boolean;
  light?: boolean;
}

export function SectionHeader({ label, title, description, centered = true, light = false }: SectionHeaderProps) {
  return (
    <div className={`max-w-2xl ${centered ? 'mx-auto text-center' : ''} mb-8 md:mb-12`}>
      {label && (
        <p className={`font-body text-[11px] font-semibold tracking-[2px] uppercase mb-3 text-brand-gold`}>
          {label}
        </p>
      )}
      <h2 className={`font-display text-[28px] sm:text-4xl md:text-[42px] font-medium leading-tight mb-4 ${light ? 'text-white' : 'text-brand-walnut'}`}>
        {title}
      </h2>
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
