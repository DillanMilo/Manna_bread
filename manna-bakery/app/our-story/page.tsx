export default function OurStoryPage() {
  return (
    <main className="pt-32 md:pt-40 pb-20 md:pb-28 bg-brand-warm-white min-h-screen">
      <div className="max-w-3xl mx-auto px-6 md:px-10">
        <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
          Our Story
        </p>
        <h1 className="font-display text-4xl md:text-5xl font-medium text-brand-walnut leading-tight mb-8">
          Built on faith,<br />baked with love
        </h1>

        <div className="prose prose-lg">
          <p className="font-body text-brand-olive leading-relaxed">
            [ Full story content to come from Christin - her journey, the founding of Manna, the vision, etc. ]
          </p>
        </div>
      </div>
    </main>
  );
}
