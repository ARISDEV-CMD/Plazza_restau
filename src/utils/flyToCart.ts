/**
 * Animation « le plat vole vers le panier ».
 * Aucun changement nécessaire sur les boutons « Ajouter » : on mémorise
 * simplement le dernier bouton cliqué, puis on lance le vol quand l'article
 * est effectivement ajouté au panier.
 */
let lastRect: DOMRect | null = null;
let lastAt = 0;

export const CART_HIT_EVENT = 'plazza:cart-hit';

export function trackClickOrigin(): () => void {
  const handler = (e: PointerEvent) => {
    const target = e.target as Element | null;
    const btn = target?.closest?.('button');
    if (btn) {
      lastRect = btn.getBoundingClientRect();
      lastAt = performance.now();
    }
  };
  document.addEventListener('pointerdown', handler, true);
  return () => document.removeEventListener('pointerdown', handler, true);
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

function notifyHit() {
  window.dispatchEvent(new CustomEvent(CART_HIT_EVENT));
}

export function flyToCart(imageUrl?: string): void {
  if (typeof window === 'undefined') return;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-cart-target]'));
  // On prend la cible réellement visible (le bouton mobile et desktop peuvent coexister)
  const target = targets.find((t) => t.getBoundingClientRect().width > 0);

  if (reduce || !target || !lastRect || performance.now() - lastAt > 1500) {
    notifyHit();
    return;
  }

  const size = 58;
  const s = lastRect;
  const t = target.getBoundingClientRect();

  const x0 = s.left + s.width / 2 - size / 2;
  const y0 = s.top + s.height / 2 - size / 2;
  const x1 = t.left + t.width / 2 - size / 2;
  const y1 = t.top + t.height / 2 - size / 2;
  // Point de contrôle : l'assiette monte avant de retomber dans le sac
  const cx = (x0 + x1) / 2;
  const cy = Math.min(y0, y1) - 140;

  const el = document.createElement('div');
  el.setAttribute('aria-hidden', 'true');
  Object.assign(el.style, {
    position: 'fixed',
    left: '0px',
    top: '0px',
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: '9999px',
    border: '3px solid #ffffff',
    boxShadow: '0 12px 28px rgba(87, 50, 0, 0.35)',
    background: imageUrl
      ? `#ffe9e2 url("${imageUrl}") center / cover no-repeat`
      : 'radial-gradient(circle at 35% 30%, #ffdcbc, #e8911a)',
    zIndex: '9999',
    pointerEvents: 'none',
    willChange: 'transform, opacity',
  } as Partial<CSSStyleDeclaration>);
  document.body.appendChild(el);

  const steps = 18;
  const frames: Keyframe[] = [];
  for (let i = 0; i <= steps; i++) {
    const p = i / steps;
    const u = easeInOut(p);
    const x = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * cx + u * u * x1;
    const y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * cy + u * u * y1;
    const scale = 1 - 0.72 * u;
    frames.push({
      offset: p,
      transform: `translate(${x}px, ${y}px) scale(${scale}) rotate(${u * 300}deg)`,
      opacity: p > 0.92 ? 1 - (p - 0.92) / 0.08 : 1,
    });
  }

  const anim = el.animate(frames, { duration: 820, easing: 'linear', fill: 'forwards' });
  const done = () => {
    el.remove();
    notifyHit();
  };
  anim.onfinish = done;
  anim.oncancel = () => el.remove();
}
