import { useEffect } from 'react';

/**
 * Apparition progressive au scroll, façon « service en salle » :
 * les cartes d'une grille arrivent l'une après l'autre.
 *
 * L'état est porté par un attribut `data-reveal` (jamais par className) pour ne
 * pas entrer en conflit avec React. L'attribut est retiré une fois l'animation
 * terminée, ce qui rend à chaque élément ses survols et transitions d'origine.
 */
const CANDIDATES = [
  'main .grid > *',
  'footer .grid > *',
  'main h2',
  'main [data-reveal-me]',
].join(',');

const SKIP = '[data-no-reveal], .hero-stagger, .plate-serve, [role="dialog"]';

const STAGGER_MS = 80;
const MAX_STAGGER_MS = 560;
const TRANSITION_MS = 900;

export function useScrollReveal(): void {
  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const seen = new WeakSet<Element>();

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        // Décalage par parent : les cartes d'une même rangée arrivent en cascade
        const perParent = new Map<Element | null, number>();
        visible.forEach((entry) => {
          const el = entry.target as HTMLElement;
          io.unobserve(el);
          const parent = el.parentElement;
          const idx = perParent.get(parent) ?? 0;
          perParent.set(parent, idx + 1);
          const delay = Math.min(idx * STAGGER_MS, MAX_STAGGER_MS);
          el.style.setProperty('--reveal-delay', `${delay}ms`);
          el.setAttribute('data-reveal', 'shown');
          window.setTimeout(() => {
            el.removeAttribute('data-reveal');
            el.style.removeProperty('--reveal-delay');
          }, delay + TRANSITION_MS);
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }
    );

    const scan = () => {
      document.querySelectorAll<HTMLElement>(CANDIDATES).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        if (el.closest(SKIP)) return;
        el.setAttribute('data-reveal', 'hidden');
        io.observe(el);
      });
    };

    scan();
    const root = document.getElementById('root') ?? document.body;
    const mo = new MutationObserver(scan);
    mo.observe(root, { childList: true, subtree: true });

    return () => {
      mo.disconnect();
      io.disconnect();
    };
  }, []);
}
