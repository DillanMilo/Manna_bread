'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface MenuCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export function MenuCard({ title, description, price, image }: MenuCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);

  return (
    <div className="bg-brand-forest/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-white/10">
      <div ref={ref} className="h-36 sm:h-44 md:h-48 relative overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -top-[12%] -bottom-[12%] left-0 right-0 will-change-transform"
        >
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </motion.div>
      </div>
      <div className="p-5 md:p-6">
        <h3 className="font-display text-lg md:text-xl text-white mb-2">{title}</h3>
        <p className="font-body text-sm text-white/70 leading-relaxed mb-3">{description}</p>
        <span className="font-accent text-xl font-semibold text-brand-cognac">{price}</span>
      </div>
    </div>
  );
}
