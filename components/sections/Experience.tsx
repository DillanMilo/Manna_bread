'use client';

import { motion, useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { FadeIn } from '@/components/ui/Motion';
import { useMediaParallax } from '@/components/ui/useMediaParallax';

const CAROUSEL_IMAGES = [
  '/images/manna-interior-timber-beams.webp',
  '/images/manna-interior-marble-tables.webp',
  '/images/manna-server-coffee.webp',
];

const FEATURES = [
  {
    icon: '/images/manna-spider-plant-watercolor.png',
    title: 'Living Spaces',
    description: 'Abundant greenery and natural light create a calming, restorative atmosphere.',
  },
  {
    icon: '/images/manna-hammer-timber-watercolor.png',
    title: 'Reclaimed Beauty',
    description: 'Timber beams and handcrafted details tell a story in every corner.',
  },
  {
    icon: '/images/9C4D1F35-5217-4B71-A2E5-6546C81B58BD.png',
    title: 'Gather & Stay',
    description: 'Cozy seating, free wifi, and a welcoming vibe—come for the bread, stay for the community.',
  },
];

interface FeatureCardProps {
  icon: string;
  iconClassName?: string;
  title: string;
  description: string;
  index: number;
}

function FeatureCard({
  icon,
  iconClassName = '',
  title,
  description,
  index,
}: FeatureCardProps) {
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
        className="mb-4 sm:mb-5 flex justify-center"
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
        <Image
          src={icon}
          alt={title}
          width={80}
          height={80}
          className={`h-14 w-14 sm:h-16 sm:w-16 md:h-20 md:w-20 ${iconClassName}`}
        />
      </motion.div>
      <h3 className="font-display text-lg sm:text-xl font-medium mb-2 sm:mb-3">{title}</h3>
      <p className="font-body text-base sm:text-sm md:text-base text-white/70 leading-relaxed max-w-xs mx-auto">{description}</p>
    </motion.div>
  );
}

export function Experience() {
  const [currentImage, setCurrentImage] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const imageY = useMediaParallax(sectionRef, 22);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section ref={sectionRef} className="py-12 sm:py-16 md:py-20 lg:py-28 text-white relative overflow-hidden">
      {/* Smooth crossfade carousel background — all images rendered, opacity toggled */}
      {CAROUSEL_IMAGES.map((src, index) => (
        <motion.div
          key={src}
          style={{ y: imageY }}
          className="absolute -inset-y-[6%] left-0 right-0 will-change-transform"
          animate={{ opacity: index === currentImage ? 1 : 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      ))}

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 z-[1] bg-brand-forest/65" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <FadeIn>
          <SectionHeader
            label="More Than a Bakery"
            title="A space designed for connection"
            description="Manna's Jerusalem-inspired storefront is more than a quick stop - it is a sanctuary for community, creativity, and conversation."
            light
          />
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6 md:gap-8 lg:gap-12 mt-8 sm:mt-10 md:mt-12">
          {FEATURES.map((feature, index) => (
            <FeatureCard key={feature.title} {...feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
