import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface NavbarProps {
  currentTab: NavigationTab;
  onNavigate: (tab: NavigationTab) => void;
  cartCount: number;
  onOpenCart?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onNavigate,
  cartCount,
  onOpenCart
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (tab: NavigationTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-[#fff8f6]/95 backdrop-blur-md shadow-[0_4px_16px_rgba(31,20,16,0.06)] border-b border-[#ffe9e2]">
      <div className="h-20 max-w-[1200px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4">
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
            className="h-9 w-auto object-contain transition-transform group-hover:scale-105"
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
          <button
            onClick={() => handleNavClick('accueil')}
            className={`transition-colors font-label-md text-sm ${
              currentTab === 'accueil'
                ? 'text-[#895200] font-bold border-b-2 border-[#895200] pb-1'
                : 'text-[#534435] hover:text-[#241915]'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`transition-colors font-label-md text-sm ${
              currentTab === 'menu'
                ? 'text-[#895200] font-bold border-b-2 border-[#895200] pb-1'
                : 'text-[#534435] hover:text-[#241915]'
            }`}
          >
            Menu
          </button>
          <button
            onClick={() => handleNavClick('reserver')}
            className={`transition-colors font-label-md text-sm ${
              currentTab === 'reserver'
                ? 'text-[#895200] font-bold border-b-2 border-[#895200] pb-1'
                : 'text-[#534435] hover:text-[#241915]'
            }`}
          >
            Réserver
          </button>
          <button
            onClick={() => handleNavClick('galerie')}
            className={`transition-colors font-label-md text-sm ${
              currentTab === 'galerie'
                ? 'text-[#895200] font-bold border-b-2 border-[#895200] pb-1'
                : 'text-[#534435] hover:text-[#241915]'
            }`}
          >
            Galerie
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`transition-colors font-label-md text-sm ${
              currentTab === 'contact'
                ? 'text-[#895200] font-bold border-b-2 border-[#895200] pb-1'
                : 'text-[#534435] hover:text-[#241915]'
            }`}
          >
            Contact
          </button>
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
            className="relative p-2 rounded-full text-[#241915] hover:bg-[#fae3dc] transition-colors flex items-center justify-center cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[24px]">shopping_bag</span>
            <span className="absolute top-1 right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-[10px] leading-none font-bold">
              {cartCount}
            </span>
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
            type="button"
          >
            <span className="material-symbols-outlined text-[26px]">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#fff8f6] border-b border-[#ffe9e2] px-6 py-4 shadow-xl flex flex-col gap-3 animate-in fade-in slide-in-from-top-4 duration-200">
          <button
            onClick={() => handleNavClick('accueil')}
            className={`text-left py-2 px-3 rounded-lg font-label-md text-base ${
              currentTab === 'accueil' ? 'bg-[#ffe9e2] text-[#895200] font-bold' : 'text-[#241915]'
            }`}
          >
            Accueil
          </button>
          <button
            onClick={() => handleNavClick('menu')}
            className={`text-left py-2 px-3 rounded-lg font-label-md text-base ${
              currentTab === 'menu' ? 'bg-[#ffe9e2] text-[#895200] font-bold' : 'text-[#241915]'
            }`}
          >
            Menu & Commande
          </button>
          <button
            onClick={() => handleNavClick('commander')}
            className={`text-left py-2 px-3 rounded-lg font-label-md text-base ${
              currentTab === 'commander' ? 'bg-[#ffe9e2] text-[#895200] font-bold' : 'text-[#241915]'
            }`}
          >
            Finaliser la commande ({cartCount} articles)
          </button>
          <button
            onClick={() => handleNavClick('reserver')}
            className={`text-left py-2 px-3 rounded-lg font-label-md text-base ${
              currentTab === 'reserver' ? 'bg-[#ffe9e2] text-[#895200] font-bold' : 'text-[#241915]'
            }`}
          >
            Réserver une table
          </button>
          <button
            onClick={() => handleNavClick('galerie')}
            className={`text-left py-2 px-3 rounded-lg font-label-md text-base ${
              currentTab === 'galerie' ? 'bg-[#ffe9e2] text-[#895200] font-bold' : 'text-[#241915]'
            }`}
          >
            Galerie & Cadre
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className={`text-left py-2 px-3 rounded-lg font-label-md text-base ${
              currentTab === 'contact' ? 'bg-[#ffe9e2] text-[#895200] font-bold' : 'text-[#241915]'
            }`}
          >
            Contact & Localisation
          </button>

          <div className="pt-3 border-t border-[#ffe9e2] flex items-center justify-between">
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
          </div>
        </div>
      )}
    </header>
  );
};
