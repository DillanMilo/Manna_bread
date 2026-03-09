import Image from 'next/image';

interface MenuCardProps {
  title: string;
  description: string;
  price: string;
  image?: string;
}

export function MenuCard({ title, description, price, image }: MenuCardProps) {
  return (
    <div className="bg-brand-forest/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-white/10">
      <div className="h-36 sm:h-44 md:h-48 relative bg-gradient-to-br from-brand-forest-mid to-brand-forest">
        {image ? (
          <Image src={image} alt={title} fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center text-white/70 text-xs font-body tracking-wide">
            [ Product Photo ]
          </div>
        )}
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-display text-lg md:text-xl text-white mb-2">{title}</h3>
        <p className="font-body text-sm text-white/70 leading-relaxed mb-3">{description}</p>
        <span className="font-accent text-xl font-semibold text-brand-cognac">{price}</span>
      </div>
    </div>
  );
}
