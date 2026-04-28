"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { QuoteBlock } from "@/components/ui/QuoteBlock";
import { FadeIn } from "@/components/ui/Motion";
import { ScrollVine } from "@/components/ui/ScrollVine";

const organic = [0.25, 0.4, 0.25, 1] as const;

const STORY_IMAGES = [
  {
    src: "/images/323CA2F7-CC46-4EF4-B722-9394486AB6C2.jpeg",
    alt: "Christin and Chad sharing coffee at Manna Bakery",
    width: 1353,
    height: 1985,
  },
  {
    src: "/images/8311148C-C91B-4191-84C3-6D760FBD9AE6.jpeg",
    alt: "Christin and Chad smiling together",
    width: 1206,
    height: 1313,
  },
];

const SHUFFLE_MS = 5000;

export function Story() {
  const storyRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const [frontIndex, setFrontIndex] = useState(0);
  const [zFrontIndex, setZFrontIndex] = useState(0);
  const shufflingRef = useRef(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: storyScrollProgress } = useScroll({
    target: storyRef,
    offset: ["start 72%", "end 35%"],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const shuffle = useCallback(() => {
    if (shufflingRef.current) return;
    shufflingRef.current = true;

    const next = (frontIndex + 1) % STORY_IMAGES.length;

    setFrontIndex(next);

    setTimeout(() => {
      setZFrontIndex(next);
    }, 300);

    setTimeout(() => {
      shufflingRef.current = false;
    }, 700);
  }, [frontIndex]);

  useEffect(() => {
    const timer = setInterval(shuffle, SHUFFLE_MS);
    return () => clearInterval(timer);
  }, [shuffle]);

  // Scroll-triggered video playback
  useEffect(() => {
    const video = videoRef.current;
    const container = videoContainerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.4 },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={storyRef} className="relative isolate bg-brand-forest overflow-hidden">
      <ScrollVine progress={storyScrollProgress} className="z-0 opacity-90" />

      {/* ── Beat 1: Christin's Journey ── */}
      <div className="relative z-10 py-14 sm:py-20 md:py-28">
        <div className="max-w-4xl mx-auto px-5 sm:px-6 md:px-10">
          <FadeIn>
            <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4 text-center">
              Meet Christin
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <h2 className="font-display text-[26px] sm:text-3xl md:text-4xl font-medium text-white leading-tight mb-4 text-center">
              Before Manna, there was a journey
            </h2>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-2xl mx-auto text-center mb-10 sm:mb-14">
              Every loaf begins with a story. This is Christin&apos;s.
            </p>
          </FadeIn>

          {/* Video in arched container with gold glow */}
          <FadeIn delay={0.3}>
            <div ref={videoContainerRef} className="relative max-w-2xl mx-auto">
              {/* Gold glow behind the window */}
              <div className="absolute -inset-4 rounded-[2rem] bg-brand-gold/[0.10] blur-2xl pointer-events-none" />

              {/* Window-shaped video container — soft arch top, squared bottom */}
              <div className="relative rounded-t-[3rem] sm:rounded-t-[4rem] rounded-b-xl overflow-hidden shadow-2xl border border-brand-gold/20">
                <video
                  ref={videoRef}
                  muted
                  playsInline
                  controls
                  preload="metadata"
                  poster=""
                  className="w-full aspect-[16/10] object-cover"
                  src="/videos/ChristinsMannaStory1.mp4"
                />
              </div>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Subtle divider */}
      <div className="relative z-10 max-w-xs mx-auto flex items-center gap-4 px-5">
        <div className="flex-1 h-px bg-brand-gold/20" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-gold/40" />
        <div className="flex-1 h-px bg-brand-gold/20" />
      </div>

      {/* ── Beat 2: The Happy Ending — Chad & Building Manna Together ── */}
      <div className="relative z-10 py-14 sm:py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 md:px-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 md:gap-16 items-center">
            {/* Image card stack with disconnected frame + parallax */}
            <motion.div
              ref={containerRef}
              className="relative w-full max-w-[280px] sm:max-w-sm mx-auto md:max-w-none cursor-pointer"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.9, ease: organic }}
              onClick={shuffle}
            >
              {/* Decorative offset frame */}
              <div className="absolute inset-0 top-3 left-3 sm:top-5 sm:left-5 -right-3 -bottom-3 sm:-right-5 sm:-bottom-5 rounded-2xl border border-brand-gold/25" />

              {/* Card stack */}
              <div className="relative z-10 w-full aspect-[4/5]">
                {STORY_IMAGES.map((img, i) => {
                  const isFront = i === frontIndex;
                  const isOnTop = i === zFrontIndex;
                  return (
                    <motion.div
                      key={img.src}
                      style={{ zIndex: isOnTop ? 2 : 1 }}
                      animate={{
                        x: isFront ? 0 : 18,
                        y: isFront ? 0 : 14,
                        rotate: isFront ? 0 : 3,
                        scale: isFront ? 1 : 0.95,
                        boxShadow: isFront
                          ? "0 25px 50px -10px rgba(62,39,35,0.3)"
                          : "0 8px 24px -6px rgba(62,39,35,0.1)",
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 70,
                        damping: 16,
                        mass: 1.2,
                      }}
                      className="absolute inset-0 rounded-2xl overflow-hidden"
                    >
                      <motion.div
                        style={{ y: imageY }}
                        className="relative w-full h-[120%] -mt-[10%]"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt}
                          width={img.width}
                          height={img.height}
                          className="w-full h-full object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Content - the happy ending */}
            <div className="py-4">
              <FadeIn delay={0.1}>
                <p className="font-body text-[11px] font-semibold tracking-[2px] uppercase text-brand-gold mb-4">
                  Our Story
                </p>
              </FadeIn>

              <FadeIn delay={0.2}>
                <h2 className="font-display text-[26px] sm:text-3xl md:text-4xl font-medium text-white leading-tight mb-5 sm:mb-6">
                  Then came Chad,
                  <br />
                  and the dream grew
                </h2>
              </FadeIn>

              <FadeIn delay={0.3}>
                <p className="font-body text-base text-white/80 leading-relaxed mb-4">
                  Christin built Manna Bakery fueled by faith, grit, and a
                  belief that bread could be more than food. She opened the
                  doors, shaped the menu, and created a sanctuary from scratch.
                </p>
              </FadeIn>

              <FadeIn delay={0.4}>
                <p className="font-body text-base text-white/80 leading-relaxed mb-6">
                  Then Chad came along&mdash;and what started as one
                  woman&apos;s dream became a partnership. Together,
                  they&apos;ve grown Manna into something neither could have
                  built alone. Every detail intentional, every guest treated
                  like family.
                </p>
              </FadeIn>

              <FadeIn delay={0.5}>
                <QuoteBlock
                  quote="I have a resilient sense of hope &mdash; like a beach ball in a swimming pool. I felt like everything was somehow going to be okay, over and over again."
                  variant="bordered"
                />
              </FadeIn>

              <FadeIn delay={0.6}>
                <Link
                  href="/our-story"
                  className="inline-flex items-center gap-2 font-body text-sm font-medium text-brand-gold hover:text-brand-cognac-light transition-colors mt-6 group"
                >
                  Read our full story{" "}
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </FadeIn>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
