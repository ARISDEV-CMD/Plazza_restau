import React, { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'motion/react';

/* ------------------------------------------------------------------ */
/*  Barre de progression de lecture (dégradé braise)                    */
/* ------------------------------------------------------------------ */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 inset-x-0 h-[3px] z-[60] origin-left bg-gradient-to-r from-[#e8911a] via-[#fe5b58] to-[#b52529]"
      style={{ scaleX }}
    />
  );
};

/* ------------------------------------------------------------------ */
/*  Parallaxe douce (le plat « flotte » légèrement par rapport au fond) */
/* ------------------------------------------------------------------ */
interface ParallaxProps {
  children: React.ReactNode;
  distance?: number;
  className?: string;
}

export const Parallax: React.FC<ParallaxProps> = ({ children, distance = 60, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, distance]);
  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
};

/* ------------------------------------------------------------------ */
/*  Vapeur chaude qui monte d'un plat                                   */
/* ------------------------------------------------------------------ */
interface SteamProps {
  className?: string;
  wisps?: number;
}

export const Steam: React.FC<SteamProps> = ({ className = '', wisps = 6 }) => {
  const items = useMemo(
    () =>
      Array.from({ length: wisps }, (_, i) => ({
        left: 12 + (i * 76) / Math.max(wisps - 1, 1),
        delay: i * 0.85,
        duration: 5 + (i % 3) * 0.9,
        scale: 0.85 + (i % 4) * 0.12,
      })),
    [wisps]
  );
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      {items.map((w, i) => (
        <span
          key={i}
          className="steam-wisp"
          style={{
            left: `${w.left}%`,
            animationDelay: `${w.delay}s`,
            animationDuration: `${w.duration}s`,
            ['--steam-scale' as string]: w.scale,
          }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Braises / étincelles de grill qui s'élèvent                         */
/* ------------------------------------------------------------------ */
interface EmbersProps {
  count?: number;
  className?: string;
}

export const Embers: React.FC<EmbersProps> = ({ count = 16, className = '' }) => {
  const embers = useMemo(() => {
    const colors = ['#ffb86a', '#e8911a', '#fe5b58', '#ffdcbc'];
    return Array.from({ length: count }, (_, i) => {
      // pseudo-aléatoire déterministe pour éviter les sauts entre rendus
      const r = (n: number) => {
        const x = Math.sin((i + 1) * 9301 + n * 49297) * 233280;
        return x - Math.floor(x);
      };
      return {
        left: r(1) * 100,
        size: 3 + r(2) * 5,
        duration: 6 + r(3) * 6,
        delay: -r(4) * 10,
        dx: (r(5) - 0.5) * 90,
        rise: 160 + r(6) * 220,
        color: colors[i % colors.length],
      };
    });
  }, [count]);

  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: `${e.left}%`,
            width: e.size,
            height: e.size,
            background: e.color,
            boxShadow: `0 0 ${e.size * 2.5}px ${e.color}`,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
            ['--ember-dx' as string]: `${e.dx}px`,
            ['--ember-rise' as string]: `-${e.rise}px`,
          }}
        />
      ))}
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Cloche de service qui se soulève pour révéler le contenu            */
/* ------------------------------------------------------------------ */
interface ClocheRevealProps {
  size?: number;
  children?: React.ReactNode;
  delay?: number;
}

export const ClocheReveal: React.FC<ClocheRevealProps> = ({ size = 128, children, delay = 0.35 }) => {
  const reduce = useReducedMotion();
  const w = size;
  const h = size * 0.9;
  return (
    <div className="relative shrink-0" style={{ width: w, height: h }} aria-hidden={children ? undefined : true}>
      {/* Vapeur libérée quand la cloche se lève */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 w-[70%] h-[60%]"
        style={{ bottom: '38%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: delay + 0.5, duration: 0.8 }}
      >
        <Steam className="inset-0" wisps={4} />
      </motion.div>

      {/* Assiette */}
      <svg className="absolute bottom-0 left-0 w-full" viewBox="0 0 120 30" fill="none">
        <ellipse cx="60" cy="20" rx="56" ry="9" fill="#d9c3af" />
        <ellipse cx="60" cy="17" rx="56" ry="9" fill="#ffffff" stroke="#ebd5ce" strokeWidth="1.5" />
        <ellipse cx="60" cy="16" rx="38" ry="5.5" fill="#fff1ec" />
      </svg>

      {/* Contenu révélé (ex. coche de confirmation) */}
      <motion.div
        className="absolute left-1/2 flex items-center justify-center"
        style={{ bottom: '24%', x: '-50%' }}
        initial={reduce ? false : { scale: 0, opacity: 0, y: 8 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ delay: delay + 0.55, type: 'spring', stiffness: 260, damping: 15 }}
      >
        <div className="w-14 h-14 rounded-full bg-[#e8911a]/25 text-[#895200] flex items-center justify-center shadow-[0_6px_18px_rgba(232,145,26,0.35)]">
          {children}
        </div>
      </motion.div>

      {/* Cloche */}
      <motion.svg
        className="absolute left-0 w-full"
        style={{ bottom: '12%', transformOrigin: '12% 100%' }}
        viewBox="0 0 120 80"
        fill="none"
        initial={reduce ? { opacity: 0 } : { y: 0, x: 0, rotate: 0, opacity: 1 }}
        animate={
          reduce
            ? { opacity: 0 }
            : { y: -size * 0.62, x: size * 0.12, rotate: -16, opacity: [1, 1, 0] }
        }
        transition={{ delay, duration: 1.25, ease: [0.22, 1, 0.36, 1], times: [0, 0.75, 1] }}
      >
        <defs>
          <linearGradient id="cloche-metal" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff1ec" />
            <stop offset="0.45" stopColor="#e8911a" />
            <stop offset="1" stopColor="#895200" />
          </linearGradient>
        </defs>
        <path d="M8 66C8 34 30 14 60 14s52 20 52 52Z" fill="url(#cloche-metal)" />
        <path d="M22 60C24 40 38 26 56 22" stroke="#fff" strokeOpacity="0.55" strokeWidth="4" strokeLinecap="round" />
        <rect x="4" y="64" width="112" height="7" rx="3.5" fill="#573200" fillOpacity="0.85" />
        <circle cx="60" cy="9" r="6" fill="url(#cloche-metal)" />
      </motion.svg>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Écran d'accueil : la cloche se lève, puis le rideau monte           */
/* ------------------------------------------------------------------ */
interface SplashProps {
  title?: string;
  subtitle?: string;
}

const SPLASH_KEY = 'plazza-splash-seen';

export const Splash: React.FC<SplashProps> = ({ title = 'La Plazza', subtitle = 'Ndogbong · Douala' }) => {
  const reduce = useReducedMotion();
  const [show, setShow] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    try {
      return !sessionStorage.getItem(SPLASH_KEY);
    } catch {
      return false;
    }
  });

  // Met en pause les animations d'entrée de la page pendant le splash
  useLayoutEffect(() => {
    if (show) document.documentElement.setAttribute('data-splash', '1');
    return () => document.documentElement.removeAttribute('data-splash');
  }, [show]);

  useEffect(() => {
    if (!show) return;
    try {
      sessionStorage.setItem(SPLASH_KEY, '1');
    } catch {
      /* stockage indisponible : on ignore */
    }
    const t = window.setTimeout(() => setShow(false), 2300);
    return () => window.clearTimeout(t);
  }, [show]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="plazza-splash"
          role="presentation"
          onClick={() => setShow(false)}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-gradient-to-b from-[#fff8f6] via-[#fff1ec] to-[#ffe9e2] cursor-pointer"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] } }}
        >
          <ClocheReveal size={150} delay={0.45}>
            <span className="material-symbols-outlined text-[30px]">restaurant</span>
          </ClocheReveal>
          <div className="text-center">
            <motion.h1
              className="font-headline-lg text-3xl text-[#241915] font-bold"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="font-label-md text-sm text-[#895200] tracking-wide mt-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.45, duration: 0.7 }}
            >
              {subtitle}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ------------------------------------------------------------------ */
/*  Nombre qui « roule » vers sa nouvelle valeur (totaux du panier)     */
/* ------------------------------------------------------------------ */
interface AnimatedNumberProps {
  value: number;
  format: (n: number) => string;
  className?: string;
}

export const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ value, format, className }) => {
  const reduce = useReducedMotion();
  const mv = useMotionValue(value);
  const [text, setText] = useState(() => format(value));

  useEffect(() => {
    if (reduce) {
      setText(format(value));
      return;
    }
    const controls = animate(mv, value, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setText(format(v)),
    });
    return () => controls.stop();
  }, [value, reduce]); // eslint-disable-line react-hooks/exhaustive-deps

  return <span className={className}>{text}</span>;
};

/* ------------------------------------------------------------------ */
/*  Apparition au scroll pour un bloc isolé                             */
/* ------------------------------------------------------------------ */
interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}

export const Reveal: React.FC<RevealProps> = ({ children, delay = 0, y = 24, className }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -10% 0px' });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};
