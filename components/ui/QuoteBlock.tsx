interface QuoteBlockProps {
  quote: string;
  attribution?: string;
  variant?: 'default' | 'bordered';
}

export function QuoteBlock({ quote, attribution, variant = 'default' }: QuoteBlockProps) {
  if (variant === 'bordered') {
    return (
      <blockquote className="border-l-[3px] border-brand-gold pl-4 sm:pl-5 my-6">
        <p className="font-accent text-lg sm:text-xl md:text-2xl italic text-white leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
        {attribution && (
          <cite className="block mt-3 font-body text-sm font-medium text-white/60 not-italic">
            — {attribution}
          </cite>
        )}
      </blockquote>
    );
  }

  return (
    <div className="bg-brand-forest-mid/50 rounded-2xl p-5 sm:p-8 md:p-10 relative border-l-4 border-brand-gold">
      <span className="font-display text-5xl sm:text-7xl text-brand-gold/20 absolute top-2 left-4 sm:top-4 sm:left-6 leading-none">&ldquo;</span>
      <p className="font-accent text-xl sm:text-2xl md:text-[26px] italic text-white leading-relaxed relative z-10">
        {quote}
      </p>
      {attribution && (
        <cite className="block mt-3 sm:mt-5 font-body text-sm font-medium text-white/60 not-italic">
          — {attribution}
        </cite>
      )}
    </div>
  );
}
