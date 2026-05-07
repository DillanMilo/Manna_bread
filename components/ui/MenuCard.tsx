'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';
import { useRef } from 'react';

interface MenuCardProps {
  title: string;
  description: string;
  price: string;
  image: string;
}

export function MenuCard({ title, description, price, image }: MenuCardProps) {
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  });
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ['0%', '0%'] : ['-4%', '4%'],
  );
  const y = useSpring(rawY, { stiffness: 120, damping: 28, mass: 0.25 });

  return (
    <div className="bg-brand-forest/80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-white/10 w-full max-w-[340px] sm:max-w-none mx-auto">
      <div ref={imageRef} className="h-44 sm:h-44 md:h-48 relative overflow-hidden">
        <motion.div
          style={{ y }}
          className="absolute -inset-y-[5%] left-0 right-0 will-change-transform"
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
      <div className="p-4 sm:p-5 md:p-6">
        <h3 className="font-display text-lg md:text-xl text-white mb-1.5 sm:mb-2">{title}</h3>
        <p className="font-body text-sm text-white/70 leading-relaxed mb-2.5 sm:mb-3">{description}</p>
        <span className="font-accent text-xl font-semibold text-brand-cognac">{price}</span>
      </div>
    </div>
  );
}
