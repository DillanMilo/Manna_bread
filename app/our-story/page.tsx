'use client';

import Image from 'next/image';
import { FadeIn, LineDraw } from '@/components/ui/Motion';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useCallback, useEffect, useRef, useState } from 'react';
import { PageVine } from '@/components/ui/ScrollVine';
import { useMediaParallax } from '@/components/ui/useMediaParallax';

const organic = [0.25, 0.4, 0.25, 1] as const;

/* ─── story image data ─── */
const STORY_IMAGES = {
  christin: {
    src: '/images/christin-desert-portrait.jpeg',
    alt: 'Christin, founder of Manna Bakery, smiling outdoors in the desert',
  },
  couple: {
    src: '/images/IMG_6873.PNG',
    alt: 'Christin and her husband in a loving embrace',
  },
  journey: {
    src: '/images/IMG_2383.jpg',
    alt: 'Christin gazing toward the horizon at golden hour',
  },
  community: {
    src: '/images/IMG_9181.jpeg',
    alt: 'Christin surrounded by the Manna Bakery community',
  },
  familyYounger: {
    src: '/images/christin-family-younger.jpeg',
    alt: 'Christin with her six children when they were younger',
  },
  familyGrown: {
    src: '/images/christin-family-grown.jpeg',
    alt: 'Christin with her six children, now grown',
  },
};

const CHAD_STORY_IMAGES = [
  {
    src: '/images/323CA2F7-CC46-4EF4-B722-9394486AB6C2.jpeg',
    alt: 'Christin and Chad sharing coffee at Manna Bakery',
  },
  {
    src: '/images/8311148C-C91B-4191-84C3-6D760FBD9AE6.jpeg',
    alt: 'Christin and Chad smiling together',
  },
  STORY_IMAGES.couple,
] as const;

const KENYA_STORY_IMAGES = [
  {
    src: '/images/christin-kenya-gift.webp',
    alt: 'Christin sharing a handmade bag with a woman in Kenya',
  },
  {
    src: '/images/christin-kenya-community.webp',
    alt: 'Christin and her son gathered with friends in Kenya',
  },
  {
    src: '/images/christin-kenya-family.webp',
    alt: 'Christin gathered with a family and community in Kenya',
  },
  {
    src: '/images/christin-kenya-yard.webp',
    alt: 'Christin walking through a family home in Kenya',
  },
] as const;

const NEW_LOCATION_IMAGES = [
  {
    src: '/images/manna-front-entry.webp',
    alt: 'The arched front entry at Manna Bakery in Tomball',
  },
  {
    src: '/images/manna-interior-timber-beams.webp',
    alt: 'Manna Bakery interior with reclaimed timber beams and greenery',
  },
  {
    src: '/images/manna-arched-alcove.webp',
    alt: 'A softly lit arched alcove inside Manna Bakery',
  },
] as const;

function ChadPhotoDeck() {
  const deckRef = useRef<HTMLButtonElement>(null);
  const zIndexTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shufflingRef = useRef(false);
  const [frontIndex, setFrontIndex] = useState(0);
  const [zFrontIndex, setZFrontIndex] = useState(0);
  const imageY = useMediaParallax(deckRef, 18);

  const shuffle = useCallback(() => {
    if (shufflingRef.current) {
      return;
    }

    shufflingRef.current = true;
    setFrontIndex((currentIndex) => {
      const nextIndex = (currentIndex + 1) % CHAD_STORY_IMAGES.length;

      if (zIndexTimerRef.current) {
        clearTimeout(zIndexTimerRef.current);
      }
      zIndexTimerRef.current = setTimeout(() => {
        setZFrontIndex(nextIndex);
      }, 300);

      return nextIndex;
    });

    if (lockTimerRef.current) {
      clearTimeout(lockTimerRef.current);
    }
    lockTimerRef.current = setTimeout(() => {
      shufflingRef.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const interval = setInterval(shuffle, 5000);

    return () => {
      clearInterval(interval);
      shufflingRef.current = false;
      if (zIndexTimerRef.current) {
        clearTimeout(zIndexTimerRef.current);
      }
      if (lockTimerRef.current) {
        clearTimeout(lockTimerRef.current);
      }
    };
  }, [shuffle]);

  return (
    <motion.button
      ref={deckRef}
      type="button"
      onClick={shuffle}
      aria-label="Show another photo of Christin and Chad"
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, ease: organic }}
      className="relative mx-auto block w-full max-w-[280px] cursor-pointer border-0 bg-transparent p-0 text-left sm:max-w-sm md:max-w-none"
    >
      <span className="absolute inset-0 -bottom-3 -right-3 left-3 top-3 rounded-2xl border border-brand-gold/25 sm:-bottom-5 sm:-right-5 sm:left-5 sm:top-5" />

      <span className="relative z-10 block aspect-[4/5] w-full">
        {CHAD_STORY_IMAGES.map((image, index) => {
          const isFront = index === frontIndex;
          const isOnTop = index === zFrontIndex;
          const stackDepth =
            (index - frontIndex + CHAD_STORY_IMAGES.length) %
            CHAD_STORY_IMAGES.length;

          return (
            <motion.span
              key={image.src}
              style={{
                zIndex: isOnTop
                  ? CHAD_STORY_IMAGES.length
                  : CHAD_STORY_IMAGES.length - stackDepth,
              }}
              animate={{
                x: isFront ? 0 : stackDepth === 1 ? 18 : -10,
                y: isFront ? 0 : stackDepth === 1 ? 14 : 24,
                rotate: isFront ? 0 : stackDepth === 1 ? 3 : -2.5,
                scale: isFront ? 1 : stackDepth === 1 ? 0.95 : 0.91,
                boxShadow: isFront
                  ? '0 25px 50px -10px rgba(62,39,35,0.3)'
                  : '0 8px 24px -6px rgba(62,39,35,0.1)',
              }}
              transition={{
                type: 'spring',
                stiffness: 70,
                damping: 16,
                mass: 1.2,
              }}
              className="absolute inset-0 overflow-hidden rounded-2xl"
            >
              <span className="relative block h-full w-full overflow-hidden">
                <motion.span
                  style={{ y: imageY }}
                  className="absolute -inset-y-[5%] left-0 right-0 will-change-transform"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </motion.span>
              </span>
            </motion.span>
          );
        })}
      </span>
    </motion.button>
  );
}

function KenyaPhotoCollage() {
  const layouts = [
    {
      className:
        'left-[1%] top-[13%] z-30 w-[38%] sm:left-[3%] sm:top-[12%] sm:w-[29%] md:w-[25%]',
      aspect: 'aspect-[9/16]',
      rotate: -5,
    },
    {
      className:
        'right-[0%] top-[1%] z-10 w-[68%] sm:right-[12%] sm:w-[55%] md:right-[17%] md:w-[48%]',
      aspect: 'aspect-video',
      rotate: 4,
    },
    {
      className:
        'right-[1%] top-[39%] z-20 w-[66%] sm:right-[0%] sm:top-[35%] sm:w-[50%] md:right-[1%] md:top-[34%] md:w-[42%]',
      aspect: 'aspect-video',
      rotate: 6,
    },
    {
      className:
        'bottom-[1%] left-[14%] z-40 w-[67%] sm:left-[26%] sm:w-[53%] md:left-[29%] md:w-[43%]',
      aspect: 'aspect-video',
      rotate: -3,
    },
  ] as const;

  return (
    <div
      className="relative mx-auto h-[390px] w-full max-w-[360px] sm:h-[430px] sm:max-w-[620px] md:h-[500px] md:max-w-[860px]"
      aria-label="Photographs from Christin's time in Kenya"
    >
      {KENYA_STORY_IMAGES.map((image, index) => {
        const layout = layouts[index];

        return (
          <motion.figure
            key={image.src}
            initial={{ opacity: 0, y: 28, rotate: layout.rotate * 0.35 }}
            whileInView={{ opacity: 1, y: 0, rotate: layout.rotate }}
            whileHover={{ y: -8, scale: 1.025, zIndex: 50 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              duration: 0.75,
              delay: index * 0.12,
              ease: organic,
            }}
            className={`absolute ${layout.aspect} ${layout.className} overflow-hidden rounded-xl border border-brand-gold/35 bg-brand-forest shadow-2xl will-change-transform`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={
                index === 0
                  ? '(max-width: 640px) 38vw, 220px'
                  : '(max-width: 640px) 68vw, 420px'
              }
            />
          </motion.figure>
        );
      })}
    </div>
  );
}

/* ─── floating story image with parallax ─── */
function StoryImage({
  src,
  alt,
  side,
  aspectRatio = 'aspect-[3/4]',
  parallaxStrength = 40,
  className = '',
}: {
  src: string;
  alt: string;
  side: 'left' | 'right';
  aspectRatio?: string;
  parallaxStrength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [parallaxStrength, -parallaxStrength]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: organic }}
      className={`relative ${aspectRatio} w-full max-w-[320px] sm:max-w-none mx-auto rounded-2xl overflow-hidden shadow-xl ${className}`}
    >
      {/* Decorative offset border */}
      <div
        className={`hidden sm:block absolute ${
          side === 'left' ? '-right-3 -bottom-3' : '-left-3 -bottom-3'
        } w-full h-full rounded-2xl border border-brand-gold/20 -z-10`}
      />
      <motion.div
        style={{ y: imageY }}
        className="absolute -top-[90px] sm:-top-[120px] -bottom-[90px] sm:-bottom-[120px] left-0 right-0 will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 45vw"
        />
      </motion.div>
    </motion.div>
  );
}

/* ─── family timeline photo with reveal + parallax ─── */
function FamilyPhoto({
  image,
  label,
  delay,
  offset = false,
}: {
  image: { src: string; alt: string };
  label: string;
  delay: number;
  offset?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [8, -8]);

  return (
    <motion.figure
      ref={ref}
      initial={{
        opacity: 0,
        y: 54,
        rotate: offset ? 1.5 : -1.5,
        clipPath: 'inset(10% 8% 10% 8% round 24px)',
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              y: 0,
              rotate: offset ? 0.75 : -0.75,
              clipPath: 'inset(0% 0% 0% 0% round 24px)',
            }
          : {}
      }
      transition={{ duration: 1, delay, ease: organic }}
      className={`relative ${offset ? 'md:mt-14' : ''}`}
    >
      <div className="absolute -inset-5 rounded-[2rem] bg-brand-gold/[0.11] blur-3xl" />
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.9, delay: delay + 0.22, ease: organic }}
        className={`absolute inset-0 rounded-2xl border border-brand-gold/40 ${
          offset ? '-translate-x-3 translate-y-3' : 'translate-x-3 translate-y-3'
        }`}
      />

      <div className="relative aspect-[7/5] overflow-hidden rounded-2xl border border-white/10 bg-brand-forest-mid shadow-2xl">
        <motion.div
          style={{ y: imageY, scale: 1.035 }}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/70 via-transparent to-transparent" />
        <figcaption className="absolute bottom-0 left-0 px-5 py-4 font-body text-[10px] font-semibold uppercase tracking-[2px] text-brand-gold">
          {label}
        </figcaption>
      </div>
    </motion.figure>
  );
}

/* ─── chapter component ─── */
function Chapter({
  children,
  image,
  imagePosition = 'right',
  imageAspect = 'aspect-[3/4]',
  imageParallaxStrength = 40,
}: {
  children: React.ReactNode;
  image?: { src: string; alt: string };
  imagePosition?: 'left' | 'right';
  imageAspect?: string;
  imageParallaxStrength?: number;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
      {/* Text column */}
      <div
        className={`lg:col-span-6 ${
          imagePosition === 'left' ? 'lg:order-2' : 'lg:order-1'
        }`}
      >
        {children}
      </div>

      {/* Image column */}
      {image && (
        <div
          className={`lg:col-span-5 ${
            imagePosition === 'left'
              ? 'lg:order-1 lg:col-start-1'
              : 'lg:order-2 lg:col-start-8'
          }`}
        >
          <StoryImage
            src={image.src}
            alt={image.alt}
            side={imagePosition === 'left' ? 'left' : 'right'}
            aspectRatio={imageAspect}
            parallaxStrength={imageParallaxStrength}
          />
        </div>
      )}
    </div>
  );
}

/* ─── section divider ─── */
function Divider() {
  return (
    <div className="flex items-center justify-center gap-4 py-16 md:py-20">
      <LineDraw className="h-px w-16 bg-brand-gold/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/50" />
      <LineDraw className="h-px w-16 bg-brand-gold/40" delay={0.2} />
    </div>
  );
}

/* ─── closing parallax section ─── */
function ClosingImage() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [120, -120]);

  return (
    <section ref={ref} className="relative h-[40vh] sm:h-[50vh] md:h-[65vh] overflow-hidden">
      <motion.div
        style={{ y: imageY }}
        className="absolute -top-[120px] -bottom-[120px] left-0 right-0 will-change-transform"
      >
        <Image
          src={STORY_IMAGES.community.src}
          alt={STORY_IMAGES.community.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/85 via-brand-forest/35 to-brand-forest/10" />

      {/* Quote anchored to bottom */}
      <div className="absolute inset-0 flex items-end justify-center pb-10 md:pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: organic }}
          className="text-center max-w-2xl"
        >
          <p className="font-accent text-2xl md:text-3xl lg:text-4xl italic text-white leading-relaxed mb-4">
            &ldquo;I felt like I had stepped from a dark long winter. And on this day I felt like the spring was coming and some hope was coming back into my heart.&rdquo;
          </p>
          <p className="font-body text-sm text-white/60 tracking-[2px] uppercase">
            &mdash; Christin, Founder
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   MANNA'S STORY PAGE
   ═══════════════════════════════════════════ */
export default function OurStoryPage() {
  const pageRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: pageRef,
    offset: ['start start', 'end end'],
  });

  return (
    <main ref={pageRef} className="relative isolate bg-brand-forest min-h-screen overflow-hidden">
      <PageVine variant="story" progress={scrollYProgress} className="z-0 opacity-85" />
      <div className="relative z-10">
      {/* ─── HERO ─── */}
      <section className="pt-24 sm:pt-32 md:pt-44 pb-12 sm:pb-16 md:pb-20 px-5 sm:px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[3px] uppercase text-brand-gold mb-5">
              Manna&apos;s Story
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-medium text-white leading-[1.15] mb-6 sm:mb-8">
              A journey of faith,
              <br />
              <span className="text-brand-gold">flour, & finding home</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-lg md:text-xl text-white/70 leading-relaxed max-w-2xl mx-auto">
              Before Manna was a bakery, it was a prayer. Before it was a business,
              it was a lifeline. This is the story of how broken bread became
              a bridge to something beautiful.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <LineDraw
              className="h-px w-24 bg-brand-gold/40 mx-auto mt-12"
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── CHAPTER 1: ROOTS ─── */}
      <section className="py-10 md:py-16 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Chapter
            image={STORY_IMAGES.christin}
            imagePosition="right"
            imageParallaxStrength={72}
          >
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Chapter One
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                Roots in Utah
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                Christin grew up in Utah with a deep faith and a belief that every
                blessing from God was tied to her obedience. Faith wasn&apos;t simply
                a Sunday practice&mdash;it shaped the way she understood family,
                purpose, and the path set before her.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8]">
                Life seemed to have a clear map: marriage, family, service, and the
                steady work of doing everything right. But as she would come to
                learn, God&apos;s plans do not always follow the maps people draw for
                themselves.
              </p>
            </FadeIn>
          </Chapter>
        </div>
      </section>

      <Divider />

      {/* ─── CHAPTER 2: THE BREAKING ─── */}
      <section className="py-10 md:py-16 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Chapter Two
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                The breaking & the becoming
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                Christin&apos;s marriage was tested by the addiction battle faced
                by her husband (ex)&mdash;a struggle that brought their family to
                the edge of hopelessness. The certainty she had built her life upon
                began to crack under the weight of reality, and the future she had
                worked so hard to protect felt impossibly far away.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-6">
                At her absolute breaking point, grace arrived in the most unexpected
                form&mdash;through the story of Narnia. Listening to C.S. Lewis&apos;s
                beloved tale, something shifted deep within her. For the first time,
                Christin understood salvation as grace&mdash;not a reward for effort
                or perfect obedience, but a gift already given.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <QuoteBlock
                quote="It actually - I wouldn't describe it as courage. I would describe it more as surrender. It was more of a letting go."
                attribution="Christin"
                variant="bordered"
              />
            </FadeIn>
          </div>

        </div>
      </section>

      {/* ─── INTERLUDE QUOTE ─── */}
      <section className="py-16 md:py-24 bg-brand-forest-mid">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-10 text-center">
          <FadeIn>
            <p className="font-accent text-2xl md:text-3xl lg:text-[34px] italic text-white leading-relaxed">
              &ldquo;One day at a time we can just trust God with what we need for today
              and not worry about tomorrow because he&apos;s enough for us day by day by day.
              <span className="text-brand-gold"> Just trust me today. I&apos;m enough. I&apos;m enough for today. I&apos;m enough for you.</span>&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── CHAPTER 3: ACROSS THE WORLD ─── */}
      <section id="kenya" className="scroll-mt-24 py-16 md:py-20 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Chapter Three
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                From the porch to Kenya
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                After moving to Texas with her family, Christin started Curly Chef
                Porch Bakes, a small bakery run from her porch. Baking became both
                a livelihood and a language for love&mdash;an early foundation for
                the work that would one day become Manna.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                Through an unexpected connection on social media, Christin traveled
                to Kenya more than once. There, she encountered Christians whose
                faith was lived openly and wholeheartedly. Their questions and
                example challenged long-held assumptions and invited her to examine
                what she truly believed.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8]">
                Kenya became another part of the pattern Christin could only see
                clearly in hindsight: the right people, the right questions, and
                a deeper understanding arriving one step at a time.
              </p>
            </FadeIn>
          </div>

          <div className="mt-10 sm:mt-12 md:mt-14">
            <KenyaPhotoCollage />
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── CHAPTER 4: THROUGH THE VALLEY ─── */}
      <section className="py-10 md:py-16 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Chapter Four
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                Through the valley
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                When Christin returned home from Kenya, life didn&apos;t offer a
                soft landing. Her husband (ex) was arrested and imprisoned due to his
                long-standing battle with addiction. The life she knew crumbled
                overnight. Divorce, court, and wave after wave of change followed.
                Christin became a single mom to six children, learning how to take
                the next breath while keeping a family moving forward.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                In the book of Exodus, Moses led the Israelites through the
                wilderness, where God met their hunger with
                <em> manna</em>&mdash;bread from heaven provided day by day. They
                gathered what they needed, learning to trust that provision would
                come again.
              </p>
            </FadeIn>

            <FadeIn delay={0.32}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-6">
                In the middle of her own upheaval, Christin clung to that image,
                which would eventually name her life&apos;s work. Not a month&apos;s
                supply. Not a year&apos;s worth of answers. Just enough for today.
                She learned to trust in provision that arrived one morning at a time.
              </p>
            </FadeIn>

            <FadeIn delay={0.4}>
              <div className="bg-brand-forest-mid/50 rounded-2xl p-5 sm:p-8 md:p-10 border-l-4 border-brand-gold relative">
                <span className="font-display text-5xl sm:text-7xl text-brand-gold/20 absolute top-2 left-4 sm:top-3 sm:left-6 leading-none">
                  &ldquo;
                </span>
                <p className="font-accent text-xl md:text-2xl italic text-white leading-relaxed relative z-10">
                  The Manna from Heaven, just one day at a time, one piece of bread at a time.&rdquo;
                </p>
                <cite className="block mt-5 font-body text-sm font-medium text-white/60 not-italic">
                  &mdash; Christin
                </cite>
              </div>
            </FadeIn>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-9 md:mt-20 md:grid-cols-2 md:gap-7">
            <FamilyPhoto
              image={STORY_IMAGES.familyYounger}
              label="The early years"
              delay={0.08}
            />
            <FamilyPhoto
              image={STORY_IMAGES.familyGrown}
              label="Years later"
              delay={0.24}
              offset
            />
          </div>

          <motion.div
            initial={{
              opacity: 0,
              scale: 0.94,
              clipPath: 'inset(18% 14% 18% 14% round 32px)',
            }}
            whileInView={{
              opacity: 1,
              scale: 1,
              clipPath: 'inset(0% 0% 0% 0% round 32px)',
            }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.95, delay: 0.12, ease: organic }}
            className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-[2rem] border border-brand-gold/30 bg-brand-forest-mid/60 px-6 py-9 text-center shadow-xl sm:px-10 md:mt-20 md:py-11"
          >
            <div className="absolute -top-12 left-1/2 h-28 w-64 -translate-x-1/2 rounded-full bg-brand-gold/[0.12] blur-3xl" />
            <p className="relative mb-4 font-body text-[10px] font-semibold uppercase tracking-[3px] text-brand-gold">
              Before the Bakery
            </p>
            <p className="relative font-accent text-xl italic leading-relaxed text-white sm:text-2xl md:text-[28px]">
              The bakery would come later. First came six children, a home to
              rebuild, and enough grace for one day at a time.
            </p>
            <div className="relative mx-auto mt-7 flex max-w-48 items-center gap-3">
              <LineDraw className="h-px flex-1 bg-brand-gold/35" />
              <span className="h-1.5 w-1.5 rounded-full bg-brand-gold/60" />
              <LineDraw className="h-px flex-1 bg-brand-gold/35" delay={0.2} />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── CHAPTER 5: FINDING HOME ─── */}
      <section className="py-16 md:py-24 bg-brand-forest-mid overflow-hidden">
        <div className="max-w-3xl mx-auto px-5 sm:px-6 md:px-10">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac-light mb-4">
              Chapter Five
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
              Finding home
            </h2>
          </FadeIn>

          <FadeIn delay={0.15}>
            <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
              Through months of studying the Bible and long conversations with a
              trusted Christian friend, Christin began to understand grace in a new
              way. The faith of her childhood had taught her to connect God&apos;s
              blessings to her obedience. Now she was discovering a love offered
              freely, without striving.
            </p>
          </FadeIn>

          <FadeIn delay={0.25}>
            <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
              Following that conviction meant stepping beyond familiar traditions,
              community, and an identity she had known since birth. It was tender
              and costly, but a new church community met Christin and her children
              with open arms and showed them what grace could look like in practice.
            </p>
          </FadeIn>

          <FadeIn delay={0.35}>
            <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-6">
              Christin&apos;s children each moved through the transition in their
              own way. Together, the family learned to make room for honest questions
              and new beginnings. In that church home, Christin began baking bread
              for communion&mdash;a living symbol of daily provision and broken
              things made whole.
            </p>
          </FadeIn>

          <FadeIn delay={0.45}>
            <LineDraw className="h-px w-16 bg-brand-gold/30 mb-8" />
          </FadeIn>

          <FadeIn delay={0.5}>
            <p className="font-accent text-xl md:text-2xl italic text-brand-cognac-light leading-relaxed">
              &ldquo;It&apos;s been really humbling as I realize how much he&apos;s gone out of his way&mdash;just
              for me to know him and to know his love. The whole point is just Jesus.
              And him reaching me, rather than me having to strive for him&mdash;that was what the gospel is all about. So simple.&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      <Divider />

      {/* ─── CHAPTER 6: CHAD & THE DREAM ─── */}
      <section className="py-10 md:py-16 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-16">
            <ChadPhotoDeck />

            <div className="py-4">
              <FadeIn>
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                  Chapter Six
                </p>
                <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
                  Then came Chad, and the dream grew
                </h2>
              </FadeIn>

              <FadeIn delay={0.15}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                  Christin built the first chapters of Manna with faith, grit, and
                  the conviction that bread could become a language for love. Then
                  Chad entered the story, and a dream carried by one determined woman
                  became a partnership. In 2026, Christin and Chad married, and the
                  partnership at the heart of Manna became part of their shared life.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-6">
                  Together, Christin and Chad shaped the next home for Manna&mdash;the
                  arches, timber, greenery, generous tables, and quiet corners that
                  make the bakery feel set apart. What they built carries both of
                  their fingerprints and welcomes every guest like family.
                </p>
              </FadeIn>

              <FadeIn delay={0.35}>
                <QuoteBlock
                  quote="I have a resilient sense of hope - like a beach ball in a swimming pool. I felt like everything was somehow going to be okay, over and over again."
                  attribution="Christin"
                  variant="bordered"
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* ─── CHAPTER 7: MANNA ─── */}
      <section className="py-16 md:py-24 px-5 sm:px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                Chapter Seven
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-white leading-tight mb-8">
                The Manna you know now
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                For nearly five years, Manna&apos;s North Point location held the
                beginnings&mdash;the regulars, recipes, and everyday moments that
                proved a bakery could become part of a community&apos;s rhythm. That
                first home still matters to the guests who gathered there.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                The Tomball location gave that story room to grow. This is where the
                Manna people know now came into view: Jerusalem-inspired arches,
                reclaimed timber, living green, and tables designed for lingering.
                It is not only Christin&apos;s story. It is Manna&apos;s story, shaped
                by family, community, and each person who walks through the door.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8]">
                Every loaf, every pastry, and every cup of coffee is an invitation
                to slow down, gather, and break bread with the people who matter.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.25}>
            <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-16 sm:gap-5 md:grid-cols-12">
              {NEW_LOCATION_IMAGES.map((image, index) => (
                <div
                  key={image.src}
                  className={`relative overflow-hidden rounded-2xl border border-brand-gold/15 shadow-xl ${
                    index === 0
                      ? 'col-span-2 aspect-[16/10] md:col-span-5 md:row-span-2 md:aspect-auto md:min-h-[520px]'
                      : 'col-span-1 aspect-[4/5] md:col-span-7 md:aspect-[16/7]'
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes={
                      index === 0
                        ? '(max-width: 768px) 100vw, 42vw'
                        : '(max-width: 768px) 50vw, 58vw'
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-forest/25 via-transparent to-transparent" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── CLOSING PARALLAX IMAGE ─── */}
      <ClosingImage />

      {/* ─── STORY CLOSING SCRIPTURE ─── */}
      <section
        aria-labelledby="story-closing-scripture"
        className="relative isolate overflow-hidden border-y border-brand-gold/20 bg-brand-walnut px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-32"
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_22%,rgba(201,168,76,0.2),transparent_40%)]"
        />
        <div
          aria-hidden="true"
          className="absolute left-1/2 top-9 h-[86%] w-[min(82vw,760px)] -translate-x-1/2 rounded-t-[999px] border border-b-0 border-brand-gold/20 sm:top-12"
        />
        <div
          aria-hidden="true"
          className="absolute bottom-0 left-1/2 h-px w-[70%] -translate-x-1/2 bg-gradient-to-r from-transparent via-brand-gold/45 to-transparent"
        />

        <motion.div
          initial={{
            opacity: 0,
            y: 36,
            clipPath: 'inset(14% 10% 14% 10% round 36px)',
          }}
          whileInView={{
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0% round 36px)',
          }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 1, ease: organic }}
          className="relative z-10 mx-auto max-w-5xl text-center"
        >
          <p className="mb-6 font-body text-[10px] font-semibold uppercase tracking-[3px] text-brand-gold sm:text-[11px]">
            An invitation
          </p>
          <h2
            id="story-closing-scripture"
            className="font-accent text-4xl italic leading-[1.15] text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            &ldquo;Taste and see that the Lord is good.&rdquo;
          </h2>
          <div className="mx-auto my-7 flex max-w-56 items-center gap-4 sm:my-9">
            <LineDraw className="h-px flex-1 bg-brand-gold/40" />
            <span className="h-2 w-2 rotate-45 border border-brand-gold/70" />
            <LineDraw className="h-px flex-1 bg-brand-gold/40" delay={0.2} />
          </div>
          <p className="font-body text-xs font-medium uppercase tracking-[2.5px] text-white/65 sm:text-sm">
            Psalm 34:8
          </p>
        </motion.div>
      </section>

      {/* ─── CTA FOOTER ─── */}
      <section className="py-14 sm:py-20 md:py-28 bg-brand-forest-mid">
        <div className="max-w-2xl mx-auto px-5 sm:px-6 md:px-10 text-center">
          <FadeIn>
            <p className="font-accent text-lg md:text-xl italic text-brand-gold mb-3">
              Come as you are
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-white leading-tight mb-6">
              Your table is waiting
            </h2>
            <p className="font-body text-base text-white/70 leading-relaxed mb-8">
              There&apos;s always a seat for you at Manna. Come taste the bread that was born from a prayer.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 min-h-[44px] w-full sm:w-auto bg-brand-gold text-brand-forest font-body text-sm font-medium rounded-lg hover:bg-brand-cognac-light transition-colors duration-300"
              >
                Plan a visit
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 min-h-[44px] w-full sm:w-auto border border-white/30 text-white font-body text-sm font-medium rounded-lg hover:bg-white/10 transition-colors duration-300"
              >
                Visit us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
      </div>
    </main>
  );
}
