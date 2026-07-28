"use client";

import { useScroll } from "framer-motion";
import { useRef, useEffect } from "react";
import { FadeIn } from "@/components/ui/Motion";
import { ScrollVine } from "@/components/ui/ScrollVine";

export function Story() {
  const storyRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: storyScrollProgress } = useScroll({
    target: storyRef,
    offset: ["start 72%", "end 35%"],
  });

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
            <p className="font-body text-base sm:text-lg text-white/70 leading-relaxed max-w-3xl mx-auto text-center mb-10 sm:mb-14">
              Manna began long before its doors opened. In this short film,
              Christin shares the faith, family, and hard-won hope that shaped
              the bakery &mdash; and the welcome she hopes every guest feels
              when they walk through its doors.
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
                  data-analytics-video="Christin's Manna Story"
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
    </section>
  );
}
