'use client';

import Image from 'next/image';
import { FadeIn, LineDraw, Parallax } from '@/components/ui/Motion';
import { QuoteBlock } from '@/components/ui/QuoteBlock';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const organic = [0.25, 0.4, 0.25, 1] as const;

/* ─── story image data ─── */
const STORY_IMAGES = {
  christin: {
    src: '/images/AAD55839-464A-46C6-80EE-B05190941FF9.JPG',
    alt: 'Christin, founder of Manna Bakery, smiling warmly',
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
};

/* ─── floating story image with parallax ─── */
function StoryImage({
  src,
  alt,
  side,
  aspectRatio = 'aspect-[3/4]',
  className = '',
}: {
  src: string;
  alt: string;
  side: 'left' | 'right';
  aspectRatio?: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : {}}
      transition={{ duration: 0.9, ease: organic }}
      className={`relative ${aspectRatio} rounded-2xl overflow-hidden shadow-xl ${className}`}
    >
      {/* Decorative offset border */}
      <div
        className={`absolute ${
          side === 'left' ? '-right-3 -bottom-3' : '-left-3 -bottom-3'
        } w-full h-full rounded-2xl border border-brand-cognac/20 -z-10`}
      />
      <motion.div
        style={{ y: imageY }}
        className="absolute -top-[80px] -bottom-[80px] left-0 right-0 will-change-transform"
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

/* ─── chapter component ─── */
function Chapter({
  children,
  image,
  imagePosition = 'right',
  imageAspect = 'aspect-[3/4]',
}: {
  children: React.ReactNode;
  image?: { src: string; alt: string };
  imagePosition?: 'left' | 'right';
  imageAspect?: string;
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
      <LineDraw className="h-px w-16 bg-brand-sage/40" />
      <div className="w-1.5 h-1.5 rounded-full bg-brand-cognac/50" />
      <LineDraw className="h-px w-16 bg-brand-sage/40" delay={0.2} />
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
    <section ref={ref} className="relative h-[50vh] md:h-[65vh] overflow-hidden">
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
      <div className="absolute inset-0 bg-gradient-to-t from-brand-walnut/80 via-brand-walnut/30 to-brand-walnut/10" />

      {/* Quote anchored to bottom */}
      <div className="absolute inset-0 flex items-end justify-center pb-10 md:pb-16 px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: organic }}
          className="text-center max-w-2xl"
        >
          <p className="font-accent text-2xl md:text-3xl lg:text-4xl italic text-white leading-relaxed mb-4">
            &ldquo;Jesus is worth it. He is worth every hard thing, every question, every goodbye. He is worth it all.&rdquo;
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
   OUR STORY PAGE
   ═══════════════════════════════════════════ */
export default function OurStoryPage() {
  return (
    <main className="bg-brand-warm-white min-h-screen">
      {/* ─── HERO ─── */}
      <section className="pt-32 md:pt-44 pb-16 md:pb-20 px-6 md:px-10">
        <div className="max-w-4xl mx-auto text-center">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[3px] uppercase text-brand-cognac mb-5">
              Our Story
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-brand-walnut leading-[1.1] mb-8">
              A journey of faith,
              <br />
              <span className="text-brand-cognac">flour, & finding home</span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="font-body text-lg md:text-xl text-brand-olive leading-relaxed max-w-2xl mx-auto">
              Before Manna was a bakery, it was a prayer. Before it was a business,
              it was a lifeline. This is the story of how broken bread became
              a bridge to something beautiful.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <LineDraw
              className="h-px w-24 bg-brand-cognac/40 mx-auto mt-12"
            />
          </FadeIn>
        </div>
      </section>

      {/* ─── CHAPTER 1: ROOTS ─── */}
      <section className="py-10 md:py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Chapter
            image={STORY_IMAGES.christin}
            imagePosition="right"
          >
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
                Chapter One
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
                Roots in Utah
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-5">
                Christin grew up in a devout Mormon household in Utah, where faith wasn&apos;t
                just a Sunday morning practice&mdash;it was the air she breathed. She strived
                to be the very best version of what her community expected: faithful,
                obedient, and certain that her church held the exclusive path to truth.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8]">
                Life had a clear map. Marriage, family, temple&mdash;each step was a
                rung on an eternal ladder. But as she would come to learn,
                God&apos;s plans don&apos;t always follow the maps we draw for ourselves.
              </p>
            </FadeIn>
          </Chapter>
        </div>
      </section>

      <Divider />

      {/* ─── CHAPTER 2: THE BREAKING ─── */}
      <section className="py-10 md:py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
                Chapter Two
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
                The breaking & the becoming
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-5">
                Christin&apos;s marriage was tested by her husband&apos;s battle with
                addiction&mdash;a struggle that brought their family to the edge of
                hopelessness. The teachings she had built her life upon began to crack
                under the weight of reality, and the &ldquo;eternal family potential&rdquo;
                she&apos;d been promised felt impossibly far away.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-6">
                At her absolute breaking point, grace arrived in the most unexpected
                form&mdash;through the story of Narnia. Listening to C.S. Lewis&apos;s
                beloved tale, something shifted deep within her. For the first time,
                Christin understood that salvation wasn&apos;t something she could earn
                through effort and obedience. It was a gift, already given.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <QuoteBlock
                quote="I spent my whole life trying to be good enough. And then I realized&mdash;I was never meant to be. That was the whole point of grace."
                attribution="Christin"
                variant="bordered"
              />
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── INTERLUDE QUOTE ─── */}
      <section className="py-16 md:py-24 bg-brand-soft-cream">
        <div className="max-w-3xl mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <p className="font-accent text-2xl md:text-3xl lg:text-[34px] italic text-brand-walnut leading-relaxed">
              &ldquo;When the world felt like it was falling apart, God whispered:
              <span className="text-brand-cognac"> I am still here. I am still providing.
              One day at a time.</span>&rdquo;
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── CHAPTER 3: ACROSS THE WORLD ─── */}
      <section className="py-16 md:py-20 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <Chapter
            image={STORY_IMAGES.journey}
            imagePosition="left"
            imageAspect="aspect-[4/5]"
          >
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
                Chapter Three
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
                Across the world, a new understanding
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-5">
                After moving to Texas with her family, Christin launched a baking
                business that quickly became something more than a livelihood&mdash;it became
                a language for love. But God wasn&apos;t done reshaping her story.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-5">
                Inspired by an unexpected connection on social media, Christin and
                her son traveled to Kenya on a mission trip that would change everything.
                There, among Kenyan Christians whose faith was raw and unfiltered, she
                encountered questions that shook her to the core. Their simple, piercing
                inquiries about her beliefs forced her to examine what she truly believed
                versus what she had been taught.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8]">
                The trip to Kenya planted a seed. The questions those believers asked
                didn&apos;t leave her&mdash;they grew roots, pushing through the carefully
                constructed walls of a lifetime of certainty.
              </p>
            </FadeIn>
          </Chapter>
        </div>
      </section>

      <Divider />

      {/* ─── CHAPTER 4: THROUGH THE VALLEY ─── */}
      <section className="py-10 md:py-16 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
                Chapter Four
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
                Through the valley
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-5">
                When Christin returned home from Kenya, life didn&apos;t offer a
                soft landing. Her husband was arrested and imprisoned due to his
                long-standing battle with addiction. The life she knew crumbled
                overnight, and she was left standing in the rubble with her children,
                wondering how to take the next breath.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-6">
                It was during this devastating season that Christin clung to a
                biblical image that would eventually name her life&apos;s work:
                <em> manna</em>&mdash;the bread God provided daily to wanderers in
                the wilderness. Not a month&apos;s supply. Not a year&apos;s worth of answers.
                Just enough for today. She learned to trust in provision that arrived
                one morning at a time.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="bg-brand-soft-cream rounded-2xl p-8 md:p-10 border-l-4 border-brand-cognac relative">
                <span className="font-display text-7xl text-brand-cognac/20 absolute top-3 left-6 leading-none">
                  &ldquo;
                </span>
                <p className="font-accent text-xl md:text-2xl italic text-brand-walnut leading-relaxed relative z-10">
                  Manna was never about abundance. It was about faithfulness&mdash;God&apos;s
                  and ours. Just enough bread for just this day.
                </p>
                <cite className="block mt-5 font-body text-sm font-medium text-brand-olive not-italic">
                  &mdash; Christin
                </cite>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 5: FINDING HOME ─── */}
      <section className="py-16 md:py-24 bg-brand-walnut overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Image — couple B&W on dark background */}
            <div className="lg:col-span-5 lg:order-1">
              <StoryImage
                src={STORY_IMAGES.couple.src}
                alt={STORY_IMAGES.couple.alt}
                side="left"
                aspectRatio="aspect-[3/4]"
              />
            </div>

            {/* Text */}
            <div className="lg:col-span-6 lg:order-2 lg:col-start-7">
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
                  Through months of studying the Bible on her own and deep conversations
                  with a Christian friend, Christin came to a realization that changed
                  everything: the teachings she had followed her whole life didn&apos;t
                  align with the message of grace she was discovering in Scripture. Salvation
                  wasn&apos;t a checklist. It wasn&apos;t earned. It was already finished.
                </p>
              </FadeIn>

              <FadeIn delay={0.25}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-5">
                  Leaving the Mormon church was one of the hardest decisions of her
                  life&mdash;it meant leaving a community, a culture, and an identity
                  she&apos;d known since birth. But on the other side of that door,
                  she found something she never expected: a church that met her with
                  open arms and no conditions. A community that showed her what grace
                  looked like in practice, not just in theory.
                </p>
              </FadeIn>

              <FadeIn delay={0.35}>
                <p className="font-body text-base md:text-[17px] text-white/85 leading-[1.8] mb-6">
                  Her children each responded to the transition in their own way, but
                  together they navigated the unfamiliar terrain of a new faith with
                  honesty and courage. And in this new church home, Christin found
                  a beautiful calling: baking bread for the sacrament&mdash;a living
                  symbol of daily provision, of broken things made whole.
                </p>
              </FadeIn>

              <FadeIn delay={0.45}>
                <LineDraw className="h-px w-16 bg-white/20 mb-8" />
              </FadeIn>

              <FadeIn delay={0.5}>
                <p className="font-accent text-xl md:text-2xl italic text-brand-cognac-light leading-relaxed">
                  &ldquo;God&apos;s love isn&apos;t something you unlock with good behavior.
                  It was there all along&mdash;waiting for me to stop running
                  and just receive it.&rdquo;
                </p>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CHAPTER 6: MANNA ─── */}
      <section className="py-16 md:py-24 px-6 md:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <FadeIn>
              <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-cognac mb-4">
                Today
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium text-brand-walnut leading-tight mb-8">
                Bread from Heaven
              </h2>
            </FadeIn>

            <FadeIn delay={0.15}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-5">
                Manna Bakery was born from every broken road, every tear-stained
                prayer, and every morning where provision arrived just in time.
                When Christin kneads dough today, she&apos;s not just making bread.
                She&apos;s living out the story that saved her&mdash;that God provides,
                that grace is real, and that the best things in life are meant
                to be shared.
              </p>
            </FadeIn>

            <FadeIn delay={0.25}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8] mb-5">
                Every loaf, every pastry, every cup of coffee at Manna is an
                invitation. An invitation to slow down. To gather. To break
                bread with the people who matter. The bakery is a sanctuary&mdash;not
                just because of the Jerusalem-inspired arches or the warm timber
                beams, but because of the spirit of welcome that fills the space.
              </p>
            </FadeIn>

            <FadeIn delay={0.35}>
              <p className="font-body text-base md:text-[17px] text-brand-charcoal leading-[1.8]">
                Christin marvels at God&apos;s unconditional love. She marvels at
                grace. And every single day, she shows up to do the only thing
                she knows to do&mdash;break bread and share it with whoever walks
                through the door.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── CLOSING PARALLAX IMAGE ─── */}
      <ClosingImage />

      {/* ─── CTA FOOTER ─── */}
      <section className="py-20 md:py-28 bg-brand-soft-cream">
        <div className="max-w-2xl mx-auto px-6 md:px-10 text-center">
          <FadeIn>
            <p className="font-accent text-lg md:text-xl italic text-brand-olive mb-3">
              Come as you are
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-medium text-brand-walnut leading-tight mb-6">
              Your table is waiting
            </h2>
            <p className="font-body text-base text-brand-olive leading-relaxed mb-8">
              Whether it&apos;s your first visit or your hundredth, there&apos;s
              always a seat for you at Manna. Come taste the bread that was born
              from a prayer.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/menu"
                className="inline-flex items-center justify-center px-7 py-3.5 bg-brand-walnut text-white font-body text-sm font-medium rounded-lg hover:bg-brand-walnut-medium transition-colors duration-300"
              >
                View our menu
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-7 py-3.5 border border-brand-walnut text-brand-walnut font-body text-sm font-medium rounded-lg hover:bg-brand-walnut hover:text-white transition-colors duration-300"
              >
                Visit us
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
