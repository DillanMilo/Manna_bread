'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';

const FEATURES = [
  {
    icon: '🌿',
    title: 'Living Spaces',
    description: 'Abundant greenery and natural light create a calming, restorative atmosphere.',
  },
  {
    icon: '🪵',
    title: 'Reclaimed Beauty',
    description: 'Timber beams and handcrafted details tell a story in every corner.',
  },
  {
    icon: '☕',
    title: 'Gather & Stay',
    description: 'Cozy seating, free wifi, and a welcoming vibe—come for the bread, stay for the community.',
  },
];

function FeatureCard({ icon, title, description, index }: { icon: string; title: string; description: string; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <motion.div
      ref={ref}
      className="text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2, ease: [0.25, 0.4, 0.25, 1] }}
    >
      <motion.div
        className="text-4xl mb-5"
        initial={{ scale: 0, rotate: -20 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          duration: 0.5,
          delay: index * 0.2 + 0.2,
          type: "spring",
          stiffness: 200,
          damping: 12
        }}
      >
        {icon}
      </motion.div>
      <h3 className="font-display text-xl font-medium mb-3">{title}</h3>
      <p className="font-body text-sm text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function Experience() {
  return (
    <section className="py-20 md:py-28 bg-brand-walnut text-white relative overflow-hidden">
      <motion.div
        className="absolute inset-0 opacity-10 bg-cover bg-center"
        style={{ backgroundImage: 'url(/images/placeholder/interior-texture.jpg)' }}
        initial={{ scale: 1.1 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        viewport={{ once: true }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-10">
        <FadeIn>
          <SectionHeader
            label="More Than a Bakery"
            title="A space designed for connection"
            description="Our Jerusalem-inspired storefront isn't just a place to grab coffee—it's a sanctuary for community, creativity, and conversation."
            light
          />
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mt-12">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
