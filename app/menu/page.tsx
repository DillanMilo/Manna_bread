import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { TOAST } from '@/lib/constants';

export default function MenuPage() {
  return (
    <main className="pt-32 md:pt-40 pb-20 md:pb-28 bg-brand-warm-white min-h-screen">
      <div className="max-w-4xl mx-auto px-6 md:px-10 text-center">
        <SectionHeader
          label="Our Menu"
          title="Baked fresh daily"
          description="From artisan breads to handcrafted pastries, every item is made with intention."
        />

        <div className="bg-brand-soft-cream rounded-2xl p-12 mb-8">
          <p className="font-body text-brand-olive mb-6">
            [ Toast Menu Embed or Custom Menu Display ]
          </p>
          <Button href={TOAST.menu} external variant="primary">
            View Full Menu on Toast
          </Button>
        </div>
      </div>
    </main>
  );
}
