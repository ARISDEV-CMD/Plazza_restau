import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useAnimationControls } from 'motion/react';
import { NavigationTab } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';
import { CART_HIT_EVENT } from '../utils/flyToCart';

interface NavbarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  cartCount: number;
  onOpenCart?: () => void;
}

const DESKTOP_LINKS: { tab: NavigationTab; label: string }[] = [
  { tab: 'accueil', label: 'Accueil' },
  { tab: 'menu', label: 'Menu' },
  { tab: 'reserver', label: 'Réserver' },
  { tab: 'galerie', label: 'Galerie' },
  { tab: 'contact', label: 'Contact' },
];

const MOBILE_LINKS: { tab: NavigationTab; label: (count: number) => string }[] = [
  { tab: 'accueil', label: () => 'Accueil' },
  { tab: 'menu', label: () => 'Menu & Commande' },
  { tab: 'commander', label: (count) => `Finaliser la commande (${count} articles)` },
  { tab: 'reserver', label: () => 'Réserver une table' },
  { tab: 'galerie', label: () => 'Galerie & Cadre' },
  { tab: 'contact', label: () => 'Contact & Localisation' },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const bagControls = useAnimationControls();

  // L'en-tête se compacte légèrement quand on descend dans la page
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Le sac « reçoit » le plat qui vient d'être lancé depuis le menu
  useEffect(() => {
    const bump = () => {
      bagControls.start({
        scale: [1, 1.28, 0.92, 1.06, 1],
        rotate: [0, -14, 10, -4, 0],
        transition: { duration: 0.6, ease: 'easeOut' },
      });
    };
    window.addEventListener(CART_HIT_EVENT, bump);
    return () => window.removeEventListener(CART_HIT_EVENT, bump);
  }, [bagControls]);

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      className="fixed top-0 inset-x-0 z-50 bg-[#fff8f6]/95 backdrop-blur-md border-b border-[#ffe9e2]"
      initial={{ y: -90, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        boxShadow: scrolled
          ? '0 8px 28px rgba(31,20,16,0.12)'
          : '0 4px 16px rgba(31,20,16,0.06)',
      }}
      transition={{ type: 'spring', stiffness: 220, damping: 26 }}
    >
      <div
        className={`max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 transition-[height] duration-300 ease-out ${
          scrolled ? 'h-[68px]' : 'h-20'
        }`}
      >
        {/* Brand Logo & Name */}
        <div
          onClick={() => handleNavClick('accueil')}
          className="flex items-center gap-3 shrink-0 cursor-pointer group"
          role="button"
          tabIndex={0}
          aria-label="La Plazza Accueil"
          onKeyDown={(e) => { if (e.key === 'Enter') handleNavClick('accueil'); }}
        >
          <img
            alt="Logo La Plazza"
            className="h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
            src={RESTAURANT_INFO.logoUrl}
            onError={(e) => {
              (e.target as HTMLElement).style.display = 'none';
            }}
          />
          <div className="flex flex-col">
            <span className="font-headline-sm text-[20px] text-[#241915] font-bold leading-tight group-hover:text-[#895200] transition-colors">
              La Plazza
            </span>
            <span className="font-label-sm text-[11px] text-[#534435]">
              Ndogbong · Douala
            </span>
          </div>

          <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#fff1ec] border border-[#ffe9e2]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8911a] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#895200]"></span>
            </span>
            <span className="font-label-sm text-[11px] text-[#534435] font-medium">
              Ouvert · jusqu'à 22 h
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-6" aria-label="Navigation principale">
          {DESKTOP_LINKS.map(({ tab, label }) => {
            const active = currentTab === tab;
            return (
              <button
                key={tab}
                onClick={() => handleNavClick(tab)}
                className={`relative pb-1 font-label-md text-sm transition-colors ${
                  active ? 'text-[#895200] font-bold' : 'text-[#534435] hover:text-[#241915]'
                }`}
              >
                {label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-0 right-0 -bottom-0.5 h-[2px] rounded-full bg-[#895200]"
                    transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Action Controls & Mobile Menu Toggle */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <a
            className="hidden xl:flex items-center gap-1.5 text-[#241915] font-label-md text-sm hover:text-[#895200] transition-colors"
            href={`tel:${RESTAURANT_INFO.phonePrimary}`}
          >
            <span className="material-symbols-outlined text-[18px] text-[#895200]">call</span>
            <span>{RESTAURANT_INFO.phonePrimary}</span>
          </a>

          {/* Cart Icon Button */}
          <button
            aria-label={`Panier (${cartCount} articles)`}
            onClick={onOpenCart || (() => handleNavClick('commander'))}
            data-cart-target
            className="relative p-2 rounded-full text-[#241915] hover:bg-[#fae3dc] transition-colors flex items-center justify-center cursor-pointer"
            type="button"
          >
            <motion.span
              className="material-symbols-outlined text-[24px] block"
              animate={bagControls}
              style={{ transformOrigin: '50% 20%' }}
            >
              shopping_bag
            </motion.span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={cartCount}
                className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-[10px] leading-none font-bold"
                initial={{ scale: 0.3, y: -8, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.3, y: 8, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 520, damping: 20 }}
              >
                {cartCount}
              </motion.span>
            </AnimatePresence>
          </button>

          {/* Commander CTA button */}
          <button
            onClick={() => handleNavClick(currentTab === 'menu' ? 'commander' : 'menu')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-sm font-bold shadow-[0_2px_8px_rgba(232,145,26,0.25)] hover:bg-[#895200] hover:text-white active:scale-[0.98] transition-all cursor-pointer"
          >
            Commander
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-[#241915] hover:bg-[#fae3dc] transition-colors flex items-center justify-center"
            aria-label="Menu de navigation"
            aria-expanded={mobileMenuOpen}
            type="button"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? 'close' : 'menu'}
                className="material-symbols-outlined text-[26px] block"
                initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                transition={{ duration: 0.16 }}
              >
                {mobileMenuOpen ? 'close' : 'menu'}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence initial={false}>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            className="lg:hidden overflow-hidden bg-[#fff8f6] border-b border-[#ffe9e2] shadow-xl"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.div
              className="px-6 py-4 flex flex-col gap-3"
              initial="hidden"
              animate="shown"
              variants={{ hidden: {}, shown: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } } }}
            >
              {MOBILE_LINKS.map(({ tab, label }) => (
                <motion.button
                  key={tab}
                  variants={{ hidden: { opacity: 0, x: -18 }, shown: { opacity: 1, x: 0 } }}
                  onClick={() => handleNavClick(tab)}
                  className={`text-left py-2 px-3 rounded-lg font-label-md text-base ${
                    currentTab === tab ? 'bg-[#ffe9e2] text-[#895200] font-bold' : 'text-[#241915]'
                  }`}
                >
                  {label(cartCount)}
                </motion.button>
              ))}

              <motion.div
                variants={{ hidden: { opacity: 0 }, shown: { opacity: 1 } }}
                className="pt-3 border-t border-[#ffe9e2] flex items-center justify-between"
              >
                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`}
                  className="flex items-center gap-1.5 text-xs text-[#895200] font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">call</span>
                  <span>{RESTAURANT_INFO.phonePrimary}</span>
                </a>
                <a
                  href={RESTAURANT_INFO.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs text-[#25D366] font-bold"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  <span>WhatsApp Direct</span>
                </a>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
