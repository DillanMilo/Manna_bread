"use client";

import { useRef } from "react";
import {
  motion,
  MotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

type ScrollVineProps = {
  progress: MotionValue<number>;
  className?: string;
};

type VineAccentProps = {
  variant?: "left" | "right" | "low";
  className?: string;
};

type PageVineProps = {
  variant: "story" | "menu" | "catering" | "rentals";
  progress?: MotionValue<number>;
  className?: string;
};

export function ScrollVine({ progress, className = "" }: ScrollVineProps) {
  const prefersReducedMotion = useReducedMotion();
  const draw = useTransform(progress, [0.02, 0.58], [0, 1]);
  const branchDraw = useTransform(progress, [0.08, 0.54], [0, 1]);
  const leafOpacity = useTransform(progress, [0.06, 0.2, 0.62, 0.74], [0, 0.55, 0.55, 0]);
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

export function VineAccent({ variant = "right", className = "" }: VineAccentProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 30%"],
  });

  const draw = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const leafOpacity = useTransform(
    scrollYProgress,
    [0.04, 0.16, 0.56, 0.72],
    [0, 0.38, 0.38, 0],
  );
  const drift = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [14, -14],
  );

  const pathStyle = prefersReducedMotion ? { pathLength: 1 } : { pathLength: draw };
  const leafStyle = prefersReducedMotion ? { opacity: 0.3 } : { opacity: leafOpacity };
  const isLeft = variant === "left";
  const isLow = variant === "low";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
    >
      <motion.svg
        viewBox="0 0 390 720"
        preserveAspectRatio="none"
        className={`absolute top-0 h-full w-[92%] sm:w-[72%] md:hidden ${
          isLeft ? "-left-24" : "-right-24"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <motion.path
          d={
            isLeft
              ? "M92 20 C178 112 142 202 226 284 C304 360 258 450 174 510 C112 554 122 636 214 700"
              : "M298 20 C212 112 248 202 164 284 C86 360 132 450 216 510 C278 554 268 636 176 700"
          }
          style={pathStyle}
          className="stroke-brand-gold/28"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/24">
          <Leaf d={isLeft ? "M220 280 C242 272 258 280 264 302 C241 308 226 300 220 280Z" : "M170 280 C148 272 132 280 126 302 C149 308 164 300 170 280Z"} />
          <Leaf d={isLeft ? "M172 510 C150 500 142 482 152 462 C174 472 182 490 172 510Z" : "M218 510 C240 500 248 482 238 462 C216 472 208 490 218 510Z"} />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 900 620"
        preserveAspectRatio="none"
        className={`absolute hidden h-full w-[62%] md:block ${
          isLow ? "bottom-[-18%]" : "top-0"
        } ${isLeft ? "-left-[10%]" : "-right-[10%]"}`}
        style={{ y: drift }}
      >
        <VineTexture />
        <motion.path
          d={
            isLeft
              ? "M120 34 C278 86 316 198 214 270 C118 338 176 446 338 482 C470 512 512 560 474 604"
              : "M780 34 C622 86 584 198 686 270 C782 338 724 446 562 482 C430 512 388 560 426 604"
          }
          style={pathStyle}
          className="stroke-brand-gold/26"
          strokeWidth="1.8"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/22">
          <Leaf d={isLeft ? "M224 266 C252 252 274 262 284 292 C254 302 234 292 224 266Z" : "M676 266 C648 252 626 262 616 292 C646 302 666 292 676 266Z"} />
          <Leaf d={isLeft ? "M342 480 C316 466 306 442 320 416 C346 430 356 454 342 480Z" : "M558 480 C584 466 594 442 580 416 C554 430 544 454 558 480Z"} />
        </motion.g>
      </motion.svg>
    </div>
  );
}

export function PageVine({ variant, progress, className = "" }: PageVineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 82%", "end 24%"],
  });
  const pageProgress = progress ?? scrollYProgress;

  const draw = useTransform(pageProgress, [0, 0.42], [0, 1]);
  const branchDraw = useTransform(pageProgress, [0.03, 0.38], [0, 1]);
  const leafOpacity = useTransform(
    pageProgress,
    [0.02, 0.1, 0.44, 0.58],
    [0, 0.32, 0.32, 0],
  );
  const drift = useTransform(
    pageProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [46, -46],
  );

  const pathStyle = prefersReducedMotion ? { pathLength: 1 } : { pathLength: draw };
  const branchStyle = prefersReducedMotion ? { pathLength: 1 } : { pathLength: branchDraw };
  const leafStyle = prefersReducedMotion ? { opacity: 0.24 } : { opacity: leafOpacity };
  const isStory = variant === "story";
  const isMenu = variant === "menu";
  const isCatering = variant === "catering";
  const isRentals = variant === "rentals";

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${
        isStory || isMenu || isCatering || isRentals ? "" : "hidden"
      } ${className}`}
    >
      <motion.svg
        viewBox="0 0 390 3100"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full md:hidden ${
          isStory ? "" : "hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M274 34 C160 205 218 386 118 548 C42 672 86 804 204 914 C304 1008 306 1148 178 1242 C62 1328 96 1498 228 1612 C332 1702 316 1858 162 1958 C54 2028 78 2198 204 2328 C318 2446 304 2606 176 2710 C86 2784 96 2922 214 3068"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M274 34 C160 205 218 386 118 548 C42 672 86 804 204 914 C304 1008 306 1148 178 1242 C62 1328 96 1498 228 1612 C332 1702 316 1858 162 1958 C54 2028 78 2198 204 2328 C318 2446 304 2606 176 2710 C86 2784 96 2922 214 3068"
          style={pathStyle}
          className="stroke-brand-gold/44"
          strokeWidth="2.1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/20">
          <path d="M138 512 C112 472 86 434 48 402" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M204 916 C242 884 278 846 308 790" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M176 1242 C132 1216 98 1174 74 1118" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M228 1612 C264 1578 296 1530 318 1468" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M162 1958 C124 1930 94 1886 72 1828" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M204 2328 C242 2298 274 2252 296 2190" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/28">
          <Leaf d="M48 402 C68 390 84 396 92 416 C70 424 56 418 48 402Z" />
          <Leaf d="M308 790 C286 782 276 766 284 746 C306 754 316 770 308 790Z" />
          <Leaf d="M74 1118 C96 1108 112 1116 118 1138 C96 1144 82 1138 74 1118Z" />
          <Leaf d="M318 1468 C296 1460 286 1442 294 1422 C316 1430 326 1448 318 1468Z" />
          <Leaf d="M72 1828 C94 1818 110 1826 116 1848 C94 1854 80 1848 72 1828Z" />
          <Leaf d="M296 2190 C274 2182 264 2164 272 2144 C294 2152 304 2170 296 2190Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 1440 3000"
        preserveAspectRatio="none"
        className={`absolute inset-0 hidden h-full w-full md:block ${
          isStory ? "md:block" : "md:hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M1190 40 C890 196 836 402 1050 560 C1280 730 1120 922 780 1008 C430 1096 340 1302 604 1460 C888 1630 1088 1784 836 1970 C606 2140 344 2268 560 2460 C736 2616 1014 2598 1068 2800 C1092 2890 1036 2948 920 2980"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M1190 40 C890 196 836 402 1050 560 C1280 730 1120 922 780 1008 C430 1096 340 1302 604 1460 C888 1630 1088 1784 836 1970 C606 2140 344 2268 560 2460 C736 2616 1014 2598 1068 2800 C1092 2890 1036 2948 920 2980"
          style={pathStyle}
          className="stroke-brand-gold/42"
          strokeWidth="2.1"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/18">
          <path d="M994 510 C920 462 858 396 806 312" strokeWidth="1.25" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M1024 1018 C1116 956 1186 878 1236 786" strokeWidth="1.25" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M590 1450 C504 1408 432 1340 374 1244" strokeWidth="1.25" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M852 1960 C944 1912 1016 1834 1068 1728" strokeWidth="1.25" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M556 2454 C462 2418 384 2352 322 2256" strokeWidth="1.25" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M1068 2798 C1144 2758 1204 2688 1248 2588" strokeWidth="1.25" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/25">
          <Leaf d="M806 312 C838 300 862 314 872 346 C838 354 816 342 806 312Z" />
          <Leaf d="M1236 786 C1204 776 1188 752 1198 722 C1230 730 1246 756 1236 786Z" />
          <Leaf d="M374 1244 C408 1234 430 1248 438 1282 C404 1288 382 1276 374 1244Z" />
          <Leaf d="M1068 1728 C1036 1718 1020 1694 1030 1664 C1062 1672 1078 1698 1068 1728Z" />
          <Leaf d="M322 2256 C356 2246 378 2260 386 2294 C352 2300 330 2288 322 2256Z" />
          <Leaf d="M1248 2588 C1216 2578 1200 2554 1210 2524 C1242 2532 1258 2558 1248 2588Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 390 1500"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full md:hidden ${
          isMenu ? "" : "hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M315 36 C226 154 272 280 176 384 C84 484 112 606 238 690 C328 750 304 872 190 948 C82 1020 102 1140 226 1228 C302 1282 294 1380 174 1460"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M315 36 C226 154 272 280 176 384 C84 484 112 606 238 690 C328 750 304 872 190 948 C82 1020 102 1140 226 1228 C302 1282 294 1380 174 1460"
          style={pathStyle}
          className="stroke-brand-gold/36"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/20">
          <path d="M184 376 C144 344 112 304 88 252" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M236 690 C274 662 304 622 326 568" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M190 948 C152 920 122 878 100 824" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M226 1228 C260 1204 288 1164 308 1112" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/28">
          <Leaf d="M88 252 C108 242 124 250 130 272 C108 278 94 272 88 252Z" />
          <Leaf d="M326 568 C304 560 294 542 302 522 C324 530 334 548 326 568Z" />
          <Leaf d="M100 824 C122 814 138 822 144 844 C122 850 108 844 100 824Z" />
          <Leaf d="M308 1112 C286 1104 276 1086 284 1066 C306 1074 316 1092 308 1112Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 1440 1500"
        preserveAspectRatio="none"
        className={`absolute inset-0 hidden h-full w-full md:block ${
          isMenu ? "md:block" : "md:hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M1230 36 C976 126 920 296 1118 406 C1304 510 1214 688 900 752 C596 814 520 982 754 1092 C946 1182 1088 1298 950 1448"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M1230 36 C976 126 920 296 1118 406 C1304 510 1214 688 900 752 C596 814 520 982 754 1092 C946 1182 1088 1298 950 1448"
          style={pathStyle}
          className="stroke-brand-gold/34"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/18">
          <path d="M1076 386 C1008 344 954 286 914 210" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M1120 728 C1194 686 1252 624 1294 544" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M744 1088 C666 1056 600 1000 546 918" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M948 1442 C1012 1408 1064 1352 1104 1272" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/26">
          <Leaf d="M914 210 C942 200 964 212 972 240 C942 246 922 236 914 210Z" />
          <Leaf d="M1294 544 C1266 536 1252 514 1260 488 C1288 496 1302 518 1294 544Z" />
          <Leaf d="M546 918 C576 908 596 922 602 950 C572 956 552 944 546 918Z" />
          <Leaf d="M1104 1272 C1076 1264 1062 1242 1070 1216 C1098 1224 1112 1246 1104 1272Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 390 2200"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full md:hidden ${
          isCatering ? "" : "hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M82 40 C178 146 140 278 260 386 C354 470 314 606 172 702 C62 778 92 930 250 1028 C348 1088 324 1230 170 1328 C58 1400 90 1550 232 1652 C334 1726 314 1900 150 2150"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M82 40 C178 146 140 278 260 386 C354 470 314 606 172 702 C62 778 92 930 250 1028 C348 1088 324 1230 170 1328 C58 1400 90 1550 232 1652 C334 1726 314 1900 150 2150"
          style={pathStyle}
          className="stroke-brand-gold/38"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/20">
          <path d="M250 378 C288 344 316 300 334 244" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M172 702 C130 674 98 632 76 574" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M250 1028 C288 1000 318 956 338 900" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M170 1328 C130 1298 98 1254 76 1198" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M232 1652 C270 1624 300 1580 320 1524" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/28">
          <Leaf d="M334 244 C312 236 302 218 310 198 C332 206 342 224 334 244Z" />
          <Leaf d="M76 574 C98 564 114 572 120 594 C98 600 84 594 76 574Z" />
          <Leaf d="M338 900 C316 892 306 874 314 854 C336 862 346 880 338 900Z" />
          <Leaf d="M76 1198 C98 1188 114 1196 120 1218 C98 1224 84 1218 76 1198Z" />
          <Leaf d="M320 1524 C298 1516 288 1498 296 1478 C318 1486 328 1504 320 1524Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 1440 2200"
        preserveAspectRatio="none"
        className={`absolute inset-0 hidden h-full w-full md:block ${
          isCatering ? "md:block" : "md:hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M180 40 C486 140 528 354 330 500 C132 646 260 850 620 914 C1000 982 1130 1160 864 1318 C608 1470 436 1640 680 1810 C880 1950 1110 1968 1230 2150"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M180 40 C486 140 528 354 330 500 C132 646 260 850 620 914 C1000 982 1130 1160 864 1318 C608 1470 436 1640 680 1810 C880 1950 1110 1968 1230 2150"
          style={pathStyle}
          className="stroke-brand-gold/36"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/18">
          <path d="M342 492 C270 448 214 388 174 306" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M618 912 C700 862 764 794 810 706" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M870 1310 C950 1264 1014 1198 1060 1110" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M674 1806 C594 1772 526 1714 470 1628" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M1230 2150 C1164 2118 1110 2062 1068 1982" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/26">
          <Leaf d="M174 306 C204 296 224 310 230 338 C200 344 180 332 174 306Z" />
          <Leaf d="M810 706 C780 698 766 676 774 650 C804 658 818 680 810 706Z" />
          <Leaf d="M1060 1110 C1030 1102 1016 1080 1024 1054 C1054 1062 1068 1084 1060 1110Z" />
          <Leaf d="M470 1628 C500 1618 520 1632 526 1660 C496 1666 476 1654 470 1628Z" />
          <Leaf d="M1068 1982 C1098 1972 1118 1986 1124 2014 C1094 2020 1074 2008 1068 1982Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 390 2100"
        preserveAspectRatio="none"
        className={`absolute inset-0 h-full w-full md:hidden ${
          isRentals ? "" : "hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M304 32 C200 146 240 294 126 410 C38 500 78 640 224 744 C344 830 332 984 184 1080 C62 1160 86 1318 238 1428 C340 1502 316 1664 166 1772 C72 1840 90 1986 250 2060"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M304 32 C200 146 240 294 126 410 C38 500 78 640 224 744 C344 830 332 984 184 1080 C62 1160 86 1318 238 1428 C340 1502 316 1664 166 1772 C72 1840 90 1986 250 2060"
          style={pathStyle}
          className="stroke-brand-gold/38"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/20">
          <path d="M128 408 C96 366 72 318 56 260" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M224 744 C266 714 300 668 324 608" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M184 1080 C144 1050 112 1004 90 944" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M238 1428 C278 1396 310 1350 332 1290" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M166 1772 C128 1744 98 1700 78 1642" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/28">
          <Leaf d="M56 260 C78 250 94 258 100 280 C78 286 64 280 56 260Z" />
          <Leaf d="M324 608 C302 600 292 582 300 562 C322 570 332 588 324 608Z" />
          <Leaf d="M90 944 C112 934 128 942 134 964 C112 970 98 964 90 944Z" />
          <Leaf d="M332 1290 C310 1282 300 1264 308 1244 C330 1252 340 1270 332 1290Z" />
          <Leaf d="M78 1642 C100 1632 116 1640 122 1662 C100 1668 86 1662 78 1642Z" />
        </motion.g>
      </motion.svg>

      <motion.svg
        viewBox="0 0 1440 2100"
        preserveAspectRatio="none"
        className={`absolute inset-0 hidden h-full w-full md:block ${
          isRentals ? "md:block" : "md:hidden"
        }`}
        style={{ y: drift }}
      >
        <VineTexture />
        <path
          d="M1180 32 C930 124 862 300 1050 450 C1260 618 1128 810 820 900 C522 988 380 1166 596 1326 C814 1488 1070 1490 1112 1680 C1148 1844 1000 1978 748 2068"
          className="stroke-brand-sage/12"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
        <motion.path
          d="M1180 32 C930 124 862 300 1050 450 C1260 618 1128 810 820 900 C522 988 380 1166 596 1326 C814 1488 1070 1490 1112 1680 C1148 1844 1000 1978 748 2068"
          style={pathStyle}
          className="stroke-brand-gold/36"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          filter="url(#pencil)"
        />
        <motion.g style={branchStyle} className="stroke-brand-sage-light/18">
          <path d="M1038 440 C958 392 896 326 852 236" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M828 898 C910 848 974 778 1020 686" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M598 1326 C514 1290 444 1230 386 1138" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M1112 1680 C1192 1642 1256 1578 1304 1488" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d="M748 2068 C832 2038 902 1984 958 1900" strokeWidth="1.2" fill="none" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </motion.g>
        <motion.g style={leafStyle} className="fill-none stroke-brand-sage-light/26">
          <Leaf d="M852 236 C882 226 902 240 908 268 C878 274 858 262 852 236Z" />
          <Leaf d="M1020 686 C990 678 976 656 984 630 C1014 638 1028 660 1020 686Z" />
          <Leaf d="M386 1138 C416 1128 436 1142 442 1170 C412 1176 392 1164 386 1138Z" />
          <Leaf d="M1304 1488 C1274 1480 1260 1458 1268 1432 C1298 1440 1312 1462 1304 1488Z" />
          <Leaf d="M958 1900 C928 1892 914 1870 922 1844 C952 1852 966 1874 958 1900Z" />
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
