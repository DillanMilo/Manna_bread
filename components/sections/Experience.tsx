'use client';

import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/Motion';

const CAROUSEL_IMAGES = [
  '/images/IMG_4684.jpeg',
  '/images/IMG_4194.jpeg',
  '/images/E6996286-81AF-47BA-B193-7083C573C618.PNG',
];

const FEATURES = [
  {
    icon: '/images/21EC4EE8-374D-42F1-96C4-5D40C388690F.png',
    title: 'Living Spaces',
    description: 'Abundant greenery and natural light create a calming, restorative atmosphere.',
  },
  {
    icon: '/images/8A6B8ED0-5C73-4831-9F5B-4D78AB5DC0BB.png',
    title: 'Reclaimed Beauty',
    description: 'Timber beams and handcrafted details tell a story in every corner.',
  },
  {
    icon: '/images/9C4D1F35-5217-4B71-A2E5-6546C81B58BD.png',
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
        className="mb-5 flex justify-center"
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
        <Image src={icon} alt={title} width={80} height={80} />
      </motion.div>
      <h3 className="font-display text-xl font-medium mb-3">{title}</h3>
      <p className="font-body text-sm text-white/70 leading-relaxed">{description}</p>
    </motion.div>
  );
}

export function Experience() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-20 md:py-28 text-white relative overflow-hidden">
      {/* Smooth crossfade carousel background */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Image
            src={CAROUSEL_IMAGES[currentImage]}
            alt=""
            fill
            className="object-cover"
            priority={currentImage === 0}
          />
        </motion.div>
      </AnimatePresence>

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-brand-charcoal/60" />

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
