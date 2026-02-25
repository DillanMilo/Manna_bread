interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  variant?: 'default' | 'bordered';
}

export function QuoteBlock({ quote, attribution, variant = 'default' }: QuoteBlockProps) {
  if (variant === 'bordered') {
    return (
      <blockquote className="border-l-[3px] border-brand-cognac pl-5 my-6">
        <p className="font-accent text-xl md:text-2xl italic text-brand-walnut leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        {attribution && (
          <cite className="block mt-3 font-body text-sm font-medium text-brand-olive not-italic">
            — {attribution}
          </cite>
        )}
      </blockquote>
    );
  }

  return (
    <div className="bg-gradient-to-br from-brand-soft-cream to-brand-cognac/10 rounded-2xl p-8 md:p-10 relative border-l-4 border-brand-cognac">
      <span className="font-display text-7xl text-brand-cognac/30 absolute top-4 left-6 leading-none">&ldquo;</span>
      <p className="font-accent text-2xl md:text-[26px] italic text-brand-walnut leading-relaxed relative z-10">
        {quote}
      </p>
      {attribution && (
        <cite className="block mt-5 font-body text-sm font-medium text-brand-olive not-italic">
          — {attribution}
        </cite>
      )}
    </div>
  );
}
