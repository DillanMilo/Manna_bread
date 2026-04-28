"use client";

import { motion, MotionValue, useReducedMotion, useTransform } from "framer-motion";

type ScrollVineProps = {
  progress: MotionValue<number>;
  className?: string;
};

export function ScrollVine({ progress, className = "" }: ScrollVineProps) {
  const prefersReducedMotion = useReducedMotion();
  const draw = useTransform(progress, [0.08, 0.86], [0, 1]);
  const branchDraw = useTransform(progress, [0.2, 0.82], [0, 1]);
  const leafOpacity = useTransform(progress, [0.18, 0.32, 0.78, 0.9], [0, 0.55, 0.55, 0]);
  const drift = useTransform(progress, [0, 1], prefersReducedMotion ? [0, 0] : [18, -18]);

  const pathStyle = prefersReducedMotion ? { pathLength: 1 } : { pathLength: draw };
  const branchStyle = prefersReducedMotion ? { pathLength: 1 } : { pathLength: branchDraw };
  const leafStyle = prefersReducedMotion ? { opacity: 0.45 } : { opacity: leafOpacity };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.svg
        viewBox="0 0 390 1180"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full md:hidden"
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M255 22 C178 128 216 225 145 315 C80 398 126 490 205 545 C286 602 278 696 186 755 C101 810 120 914 202 980 C256 1024 252 1084 190 1156"
          className="stroke-brand-sage/10"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M255 22 C178 128 216 225 145 315 C80 398 126 490 205 545 C286 602 278 696 186 755 C101 810 120 914 202 980 C256 1024 252 1084 190 1156"
          style={pathStyle}
          className="stroke-brand-gold/35"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/25">
          <path
            d="M172 274 C139 258 116 235 100 198"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M196 542 C236 518 264 486 278 443"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M185 760 C153 742 130 714 118 678"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M207 986 C241 968 267 940 282 900"
            strokeWidth="1.4"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/35">
          <Leaf d="M100 198 C118 190 130 196 134 213 C116 218 105 213 100 198Z" />
          <Leaf d="M278 443 C260 434 253 421 260 405 C278 412 286 426 278 443Z" />
          <Leaf d="M118 678 C137 670 149 676 153 694 C134 699 123 693 118 678Z" />
          <Leaf d="M282 900 C263 894 253 880 258 863 C277 869 286 883 282 900Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 1440 1120"
        preserveAspectRatio="none"
        className="absolute inset-0 hidden h-full w-full md:block"
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M1095 34 C870 118 850 270 1018 336 C1185 402 1174 520 944 572 C711 625 555 714 650 824 C744 934 960 874 1018 1004 C1038 1050 1009 1081 950 1102"
          className="stroke-brand-sage/10"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M1095 34 C870 118 850 270 1018 336 C1185 402 1174 520 944 572 C711 625 555 714 650 824 C744 934 960 874 1018 1004 C1038 1050 1009 1081 950 1102"
          style={pathStyle}
          className="stroke-brand-gold/32"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/24">
          <path
            d="M952 222 C898 190 850 148 806 95"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M1082 388 C1134 358 1176 314 1210 256"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M874 590 C823 556 779 512 744 456"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M664 816 C612 802 560 770 508 720"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d="M984 954 C1044 928 1091 884 1126 820"
            strokeWidth="1.5"
            fill="none"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/34">
          <Leaf d="M806 95 C835 84 856 95 866 124 C837 132 817 122 806 95Z" />
          <Leaf d="M1210 256 C1182 246 1168 225 1176 198 C1206 207 1220 228 1210 256Z" />
          <Leaf d="M744 456 C775 448 796 461 802 491 C771 496 751 484 744 456Z" />
          <Leaf d="M508 720 C537 706 560 716 570 746 C539 756 518 746 508 720Z" />
          <Leaf d="M1126 820 C1095 813 1078 793 1083 764 C1114 770 1131 791 1126 820Z" />
        </motion.g>
      </motion.svg>
    </div>
  );
}

function VineTexture() {
  return (
    <defs>
      <filter id="pencil" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.9"
          numOctaves="2"
          seed="8"
        />
        <feDisplacementMap in="SourceGraphic" scale="0.55" />
      </filter>
    </defs>
  );
}

function Leaf({ d }: { d: string }) {
  return (
    <path
      d={d}
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
    />
  );
}
