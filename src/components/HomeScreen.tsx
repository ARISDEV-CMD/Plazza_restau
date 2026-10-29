import React from 'react';
import { MenuItem, NavigationTab } from '../types';
import { RESTAURANT_INFO, MENU_ITEMS } from '../data/menuData';
import { formatFCFA } from '../utils/orderCalculator';

interface HomeScreenProps {
  onNavigate: (tab: NavigationTab) => void;
  onAddToCart: (item: MenuItem, quantity?: number) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onNavigate,
  onAddToCart
}) => {
  // Signature featured items for Screen 1
  const signatureItems = [
    MENU_ITEMS.find(m => m.id === 'poulet-pane-1')!,
    MENU_ITEMS.find(m => m.id === 'poulet-frit-demi')!,
    MENU_ITEMS.find(m => m.id === 'poulet-braise-entier')!,
    MENU_ITEMS.find(m => m.id === 'jus-baobab')!
  ].filter(Boolean);

  const drinksItems = MENU_ITEMS.filter(m => m.category === 'naturelles').slice(1, 6);

  return (
    <div className="flex flex-col w-full animate-in fade-in duration-300">
      {/* 1. HERO SECTION */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-[#fff8f6] via-[#fff1ec] to-[#ffe9e2] py-12 lg:py-20">
        {/* Subtle food photography backdrop with a warm readability overlay */}
        <div className="hero-food-backdrop" aria-hidden="true" />
        <div className="hero-food-wash" aria-hidden="true" />
        {/* Decorative circular watermark ring */}
        <div className="pointer-events-none absolute -top-24 -right-24 h-[580px] w-[580px] rounded-full opacity-20">
          <svg className="h-full w-full text-[#e8911a]" fill="none" stroke="currentColor" viewBox="0 0 500 500">
            <circle cx="250" cy="250" r="230" strokeDasharray="8 8" strokeWidth="1.5"></circle>
            <circle cx="250" cy="250" r="190" strokeWidth="3"></circle>
            <circle cx="250" cy="250" r="140" strokeDasharray="4 6" strokeWidth="1.5"></circle>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Colonne Gauche */}
            <div className="lg:col-span-7 flex flex-col items-start gap-6 z-10">
              {/* Google Review Pill */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white shadow-sm border border-[#ffe9e2]">
                <div className="flex items-center text-[#e8911a]">
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>star_half</span>
                </div>
                <span className="font-label-md text-sm text-[#241915] font-bold">{RESTAURANT_INFO.rating}</span>
                <span className="font-label-sm text-xs text-[#534435]">· {RESTAURANT_INFO.reviewsCount}</span>
              </div>

              {/* Main Heading */}
              <div className="space-y-2">
                <h1 className="font-headline-lg text-3xl sm:text-4xl lg:text-[44px] lg:leading-[52px] text-[#241915] tracking-tight font-bold">
                  Choisissez le{' '}
                  <span className="relative inline-block font-script-accent text-[#e8911a] text-4xl lg:text-[50px] leading-tight px-1 font-semibold">
                    meilleur goût
                    <svg
                      className="absolute -bottom-2 left-0 w-full h-3 text-[#b52529]"
                      fill="none"
                      preserveAspectRatio="none"
                      viewBox="0 0 200 12"
                    >
                      <path
                        d="M2 9C50 3 150 1 198 8"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeWidth="4"
                      ></path>
                    </svg>
                  </span>{' '}
                  à Douala
                </h1>
                <p className="font-body-lg text-base sm:text-lg text-[#534435] max-w-xl pt-2 leading-relaxed">
                  Poulet pané croustillant, frit doré et braisé aux aromates du terroir, accompagnements frais et jus pressés maison. Sur place dans notre cadre apaisant à Ndogbong, à emporter ou en livraison express.
                </p>
              </div>

              {/* CTAs Row */}
              <div className="flex flex-wrap items-center gap-4 pt-2 w-full sm:w-auto">
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-sm font-bold shadow-md hover:bg-[#895200] hover:text-white active:scale-[0.98] transition-all cursor-pointer"
                >
                  <span>Commander maintenant</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
                <button
                  onClick={() => onNavigate('menu')}
                  className="inline-flex items-center justify-center px-6 py-3.5 rounded-full bg-[#fae3dc] text-[#241915] font-label-md text-sm font-bold hover:bg-[#f4ded7] transition-all cursor-pointer"
                >
                  <span>Découvrir le menu</span>
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('acces-ndogbong');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onNavigate('contact');
                  }}
                  className="inline-flex items-center gap-1.5 text-[#b52529] font-label-md text-sm font-bold hover:underline ml-1 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">near_me</span>
                  <span>Ndogbong fin goudron</span>
                </button>
              </div>

              {/* Trust Micro Badges */}
              <div className="flex flex-wrap items-center gap-6 pt-2">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#895200] text-[20px]">verified</span>
                  <span className="font-label-sm text-xs text-[#534435] font-medium">Volaille fraîche du jour</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#895200] text-[20px]">local_shipping</span>
                  <span className="font-label-sm text-xs text-[#534435] font-medium">Livraison Ndogbong & Douala</span>
                </div>
              </div>
            </div>

            {/* Colonne Droite: Photo Hero avec Ring Visuel */}
            <div className="lg:col-span-5 relative flex justify-center items-center">
              {/* Concentric Ring Backdrop */}
              <div className="absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] rounded-full bg-[#f4ded7] animate-pulse opacity-60"></div>
              <div className="absolute h-[300px] w-[300px] sm:h-[380px] sm:w-[380px] rounded-full bg-[#e8911a]/15"></div>

              {/* Circular Hero Plate */}
              <div className="hero-food-float relative w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] rounded-full overflow-hidden shadow-2xl bg-[#fff1ec] flex items-center justify-center p-2 border-4 border-white">
                <img
                  className="w-full h-full object-cover rounded-full transition-transform duration-700 hover:scale-105"
                  alt="Plat de poulet pané doré et alloco La Plazza"
                  src="https://commons.wikimedia.org/wiki/Special:Redirect/file/Broasted_Chicken_and_Rice%2C.jpg"
                />
              </div>

              {/* Badge Flottant Prix */}
              <div className="absolute -bottom-2 left-2 sm:left-6 px-4 sm:px-5 py-3 rounded-2xl bg-white shadow-xl flex items-center gap-3 border border-[#ffe9e2]">
                <div className="w-10 h-10 rounded-full bg-[#e8911a]/20 flex items-center justify-center text-[#e8911a] font-bold">
                  <span className="material-symbols-outlined text-[20px]">restaurant</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-label-sm text-xs text-[#534435]">Poulet pané signature</span>
                  <span className="font-price-tag text-sm sm:text-base text-[#b52529] font-bold">Dès 1 500 FCFA</span>
                </div>
              </div>

              {/* Pastille Fait Maison */}
              <div className="absolute top-2 right-2 sm:right-4 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#b52529] text-white shadow-lg flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#ffdad7]">favorite</span>
                <span className="font-label-sm text-xs font-bold tracking-tight">100% Fait maison</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BANDEAU D'INFOS CLÉS (INFO STRIP) */}
      <section className="relative -mt-6 z-20 max-w-[1200px] mx-auto px-4 sm:px-6 w-full">
        <div className="w-full rounded-2xl bg-white shadow-lg p-6 lg:p-8 border border-[#ffe9e2]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
            {/* Col 1 : Statut Horaires */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#fff1ec] flex items-center justify-center text-[#895200] shrink-0">
                <span className="material-symbols-outlined text-[26px]">schedule</span>
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8911a] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#895200]"></span>
                  </span>
                  <span className="font-label-md text-sm font-bold text-[#241915]">Ouvert aujourd'hui</span>
                </div>
                <p className="font-body-sm text-xs text-[#534435]">
                  10 h 00 – 22 h 00 · Ndogbong fin goudron
                </p>
              </div>
            </div>

            {/* Col 2 : Services */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#fff1ec] flex items-center justify-center text-[#895200] shrink-0">
                <span className="material-symbols-outlined text-[26px]">takeout_dining</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-sm font-bold text-[#241915]">Service flexible</span>
                <p className="font-body-sm text-xs text-[#534435]">
                  Sur place · À emporter · Livraison Ndogbong
                </p>
              </div>
            </div>

            {/* Col 3 : Paiements locaux */}
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#fff1ec] flex items-center justify-center text-[#895200] shrink-0">
                <span className="material-symbols-outlined text-[26px]">account_balance_wallet</span>
              </div>
              <div className="flex flex-col">
                <span className="font-label-md text-sm font-bold text-[#241915]">Paiements simples & sécurisés</span>
                <div className="flex items-center gap-2 pt-1">
                  <span className="px-2 py-0.5 rounded bg-[#ffe9e2] font-label-sm text-[11px] font-bold text-[#241915]">
                    Espèces
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ffe9e2] font-label-sm text-[11px] font-bold text-[#895200]">
                    MTN MoMo
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ffe9e2] font-label-sm text-[11px] font-bold text-[#b52529]">
                    Orange Money
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. SECTION "NOS INCONTOURNABLES" */}
      <section className="w-full py-16 lg:py-24 bg-[#fff8f6]" id="menu-signature">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center gap-2 mb-12">
            <span className="font-label-md text-xs text-[#895200] font-bold uppercase tracking-wider">
              Carte Gourmande
            </span>
            <div className="relative inline-block">
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#241915] font-bold">
                Nos incontournables
              </h2>
              <svg className="w-full h-3 text-[#b52529] mt-1" fill="none" preserveAspectRatio="none" viewBox="0 0 160 10">
                <path d="M4 7C45 2 115 2 156 6" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
            </div>
            <p className="font-body-md text-sm sm:text-base text-[#534435] max-w-xl">
              Les recettes signature de La Plazza les plus commandées par nos clients au quotidien à Ndogbong.
            </p>
          </div>

          {/* Grid 4 Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {signatureItems.map(item => (
              <div
                key={item.id}
                className="group flex flex-col rounded-2xl bg-white shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-[#ffe9e2]"
              >
                <div className="relative h-48 w-full overflow-hidden bg-[#ffe9e2]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    alt={item.name}
                    src={item.image}
                  />
                  {item.tag && (
                    <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-[11px] font-bold shadow-sm">
                      {item.tag}
                    </span>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div>
                    <h3 className="font-headline-sm text-lg text-[#241915] font-bold">{item.name}</h3>
                    <p className="font-body-sm text-xs sm:text-sm text-[#534435] pt-1 line-clamp-2">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2 border-t border-[#ffe9e2]">
                    <span className="font-price-tag text-base text-[#b52529] font-bold">
                      {formatFCFA(item.price)}
                    </span>
                    <button
                      onClick={() => onAddToCart(item)}
                      className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-xs font-bold hover:bg-[#895200] hover:text-white active:scale-95 transition-all cursor-pointer"
                      type="button"
                    >
                      <span>Ajouter</span>
                      <span className="material-symbols-outlined text-[16px]">add</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button
              onClick={() => onNavigate('menu')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#fff1ec] text-[#895200] hover:bg-[#ffe9e2] font-label-md text-sm font-bold transition-colors cursor-pointer"
            >
              <span>Consulter l'ensemble de notre carte</span>
              <span className="material-symbols-outlined text-[18px]">restaurant_menu</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. SECTION "COMPOSEZ VOTRE ASSIETTE" */}
      <section className="w-full py-16 lg:py-24 bg-[#fff1ec]" id="composez">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center gap-2 mb-14">
            <span className="font-label-md text-xs text-[#b52529] font-bold uppercase tracking-wider">
              Formule Personnalisée
            </span>
            <div className="relative inline-block">
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#241915] font-bold">
                Composez votre assiette
              </h2>
              <svg className="w-full h-3 text-[#e8911a] mt-1" fill="none" preserveAspectRatio="none" viewBox="0 0 160 10">
                <path d="M2 8C50 2 120 3 158 7" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
            </div>
            <p className="font-body-md text-sm sm:text-base text-[#534435] max-w-xl">
              Votre repas sur-mesure préparé à la minute selon vos envies et vos préférences.
            </p>
          </div>

          {/* 3 Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="flex flex-col items-start p-8 rounded-2xl bg-white shadow-md relative border border-[#ffe9e2]">
              <div className="w-12 h-12 rounded-full bg-[#e8911a] text-[#573200] font-headline-sm text-lg font-bold flex items-center justify-center mb-6">
                1
              </div>
              <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wide">
                Étape essentielle
              </span>
              <h3 className="font-headline-sm text-lg text-[#241915] font-bold mt-1">
                Choisissez votre poulet
              </h3>
              <p className="font-body-md text-sm text-[#534435] pt-2 leading-relaxed">
                Pané extra croustillant aux épices douces, frit doré et fondant, ou braisé artisanalement au feu de bois avec notre marinade secrète.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Pané</span>
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Frit</span>
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Braisé</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start p-8 rounded-2xl bg-white shadow-md relative border border-[#ffe9e2]">
              <div className="w-12 h-12 rounded-full bg-[#e8911a] text-[#573200] font-headline-sm text-lg font-bold flex items-center justify-center mb-6">
                2
              </div>
              <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wide">
                Accompagnements chauds
              </span>
              <h3 className="font-headline-sm text-lg text-[#241915] font-bold mt-1">
                Ajoutez vos garnitures
              </h3>
              <p className="font-body-md text-sm text-[#534435] pt-2 leading-relaxed">
                Plantains alloco fondants et caramélisés, frites fraîches de pommes de terre croustillantes, bâtons de miondo traditionnels ou riz parfumé.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ffdad7] text-[#410004] font-label-sm text-xs font-bold">Dès 500 FCFA</span>
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Alloco</span>
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Miondo</span>
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Frites</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start p-8 rounded-2xl bg-white shadow-md relative border border-[#ffe9e2]">
              <div className="w-12 h-12 rounded-full bg-[#e8911a] text-[#573200] font-headline-sm text-lg font-bold flex items-center justify-center mb-6">
                3
              </div>
              <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wide">
                Touche finale
              </span>
              <h3 className="font-headline-sm text-lg text-[#241915] font-bold mt-1">
                Terminez par une boisson
              </h3>
              <p className="font-body-md text-sm text-[#534435] pt-2 leading-relaxed">
                Jus naturels pressés à Douala (Bissap, Baobab velouté, Ananas-gingembre vivifiant) ou sodas très frais pour équilibrer chaque bouchée.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Bissap</span>
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Baobab</span>
                <span className="px-3 py-1 rounded-full bg-[#ffe9e2] text-[#241915] font-label-sm text-xs font-medium">Sodas frais</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SECTION "BOISSONS LOCALES NATURELLES" */}
      <section className="w-full py-16 lg:py-24 bg-[#fff8f6]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <span className="font-label-md text-xs text-[#b52529] font-bold uppercase tracking-wider">
                Fraîcheur & Terroir
              </span>
              <div className="relative inline-block mt-1">
                <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#241915] font-bold">
                  Boissons locales & rafraîchissements
                </h2>
                <svg className="w-full h-3 text-[#b52529] mt-1" fill="none" preserveAspectRatio="none" viewBox="0 0 200 10">
                  <path d="M2 7C60 2 140 2 198 7" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
                </svg>
              </div>
              <p className="font-body-md text-sm text-[#534435] pt-2 max-w-xl">
                Préparées chaque matin sans conservateurs avec les fruits et feuilles récoltés localement.
              </p>
            </div>
            <div className="shrink-0">
              <span className="px-4 py-2 rounded-full bg-[#ffe9e2] font-label-sm text-xs font-bold text-[#241915]">
                Format individuel & carafes 1L
              </span>
            </div>
          </div>

          {/* 5 Cards Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {drinksItems.map((drink, idx) => {
              const icons = ['local_bar', 'water_drop', 'energy_savings_leaf', 'coffee', 'wine_bar'];
              return (
                <div
                  key={drink.id}
                  className="flex flex-col rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow p-5 justify-between border border-[#ffe9e2]"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#ffe9e2] flex items-center justify-center text-[#895200] mb-4">
                    <span className="material-symbols-outlined text-[26px]">
                      {icons[idx % icons.length]}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-headline-sm text-base text-[#241915] font-bold">{drink.name}</h3>
                    <p className="font-body-sm text-xs text-[#534435] pt-1">
                      {drink.description}
                    </p>
                  </div>
                  <div className="pt-5 flex items-center justify-between border-t border-[#ffe9e2]/50 mt-4">
                    <span className="font-price-tag text-sm text-[#b52529] font-bold block">
                      Dès {formatFCFA(drink.price)}
                    </span>
                    <button
                      onClick={() => onAddToCart(drink)}
                      className="p-1.5 rounded-full bg-[#fff1ec] text-[#895200] hover:bg-[#e8911a] hover:text-white transition-colors"
                      title="Ajouter au panier"
                    >
                      <span className="material-symbols-outlined text-[18px]">add</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. SECTION "UN LIEU POUR SE RETROUVER" */}
      <section className="w-full py-16 lg:py-24 bg-[#fff1ec]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-12">
            <div className="lg:col-span-8 flex flex-col gap-3">
              <span className="font-label-md text-xs text-[#895200] font-bold uppercase tracking-wider">
                Atmosphère Ndogbong
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#241915] font-bold">
                Un lieu chaleureux pour se retrouver
              </h2>
              <p className="font-body-md text-sm sm:text-base text-[#534435] max-w-2xl leading-relaxed">
                Niché au cœur de Ndogbong, La Plazza propose deux atmosphères distinctes : un rez-de-chaussée vibrant et animé pour les repas conviviaux sur le pouce, et une mezzanine feutrée, climatisée et intimiste pour vos déjeuners d'affaires ou soirées détendues.
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end">
              <span className="px-3.5 py-1.5 rounded-full bg-white text-[#241915] font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-[#ffe9e2]">
                <span className="material-symbols-outlined text-[16px] text-[#895200]">group</span> Entre amis
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white text-[#241915] font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-[#ffe9e2]">
                <span className="material-symbols-outlined text-[16px] text-[#895200]">favorite</span> En couple
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white text-[#241915] font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-[#ffe9e2]">
                <span className="material-symbols-outlined text-[16px] text-[#895200]">family_restroom</span> En famille
              </span>
              <span className="px-3.5 py-1.5 rounded-full bg-white text-[#241915] font-label-sm text-xs font-semibold flex items-center gap-1.5 shadow-sm border border-[#ffe9e2]">
                <span className="material-symbols-outlined text-[16px] text-[#895200]">business_center</span> Rendez-vous pro
              </span>
            </div>
          </div>

          {/* 3 Photos Ambiance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              onClick={() => onNavigate('galerie')}
              className="h-80 rounded-2xl overflow-hidden shadow-md group relative cursor-pointer"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Rez-de-chaussée animé La Plazza"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA4B68zrn7nl2vY9Y9GTTQrL72gBD4398BWw3-vn_0MvbV8-3k__2FBQTJZybvzzUgCOI4elFrFWqH3N65-eorr3TbxhOiCM41agkeME86FK2pRU9IHYCKj7xHZm7wdp0WgcyeyNir_ok7V-aD2N-kHuS9X8NA9xYzoxywZHLelYhlX-sJK4p-lL5gzVYeP1PQhKGdllFI1oHKsXDZ76uzn0fTlI_X8Cl0MLwbvDevN"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241915]/80 via-transparent to-transparent flex items-end p-5">
                <span className="font-label-md text-base text-white font-bold">
                  Rez-de-chaussée animé
                </span>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('reserver')}
              className="h-80 rounded-2xl overflow-hidden shadow-md group relative cursor-pointer"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Mezzanine climatisée & privée"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe3AfS_8eWGvaiYTY3lC42HnteFDxnr3n8b0sUIg8RxM2k8u1OhMfHX1rGsC5p8AbkfmSFTerY44pM7-X5ze-If-GMJb9Xj-g7V9w8C0erj-8P9Basbs2_aq8KxC0uJoCwKILMvNcaxhM8A5Q8zFtAfnJM-Sy4fNsTfjLBu4SbHjzi2xrTwsEmMfr32sgLZrEvxNu2IYD6Gbr3f7NxFbfhcsVWyoMayktddAi-kjvc"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241915]/80 via-transparent to-transparent flex items-end p-5">
                <span className="font-label-md text-base text-white font-bold">
                  Mezzanine climatisée & privée
                </span>
              </div>
            </div>

            <div 
              onClick={() => onNavigate('galerie')}
              className="h-80 rounded-2xl overflow-hidden shadow-md group relative cursor-pointer"
            >
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                alt="Comptoir et cuisine ouverte"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCfS1H4N08E3qVP-z_UUcjDb8TET4M0Kwv3HoxgNhd_ADXHMf6-IWHCmpAlPrxHl6PytRtcuCBix9tqDzoTwGae5fBCPVXWXs1-pKf5YLWEuyW9ahixHAjkYHwEz82fEg27CwHOBZ-fEzzoZ-wcysCEiCWzWG0TDKWwv6CcH4gyr0NH_hF2r1WQ5aZ8pGcdWXzbwn0yQW4KeyHYpsZ36e3EUyPB4wB8D71CY6Xte3zW"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#241915]/80 via-transparent to-transparent flex items-end p-5">
                <span className="font-label-md text-base text-white font-bold">
                  Comptoir & cuisine ouverte
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BANDEAU CTA BOURGOGNE (RÉSERVATION) */}
      <section className="w-full bg-[#b52529] text-white py-16 relative overflow-hidden">
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-96 opacity-15">
          <svg className="h-full w-full" fill="none" stroke="currentColor" viewBox="0 0 300 300">
            <circle cx="200" cy="150" r="140" strokeWidth="2"></circle>
            <circle cx="200" cy="150" r="100" strokeDasharray="6 6" strokeWidth="1"></circle>
            <circle cx="200" cy="150" r="60" strokeWidth="2"></circle>
          </svg>
        </div>

        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="max-w-2xl flex flex-col gap-2">
              <span className="font-label-md text-xs text-[#ffdad7] uppercase tracking-wider font-bold">
                Réservation Immédiate
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl lg:text-4xl text-white font-bold">
                Une table pour ce soir ou pour le week-end ?
              </h2>
              <p className="font-body-md text-sm sm:text-base text-white/85 leading-relaxed">
                Réservez votre place au rez-de-chaussée ou sur la mezzanine en quelques secondes, sans frais d'avance. Accueil personnalisé garanti pour vos groupes et événements.
              </p>
            </div>
            <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={() => onNavigate('reserver')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-sm font-bold shadow-lg hover:bg-[#895200] hover:text-white active:scale-[0.98] transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-[20px]">table_restaurant</span>
                <span>Réserver une table</span>
              </button>
              <a
                className="inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-white/15 text-white font-label-md text-sm font-bold hover:bg-white/25 transition-all"
                href={RESTAURANT_INFO.whatsappDirect}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>WhatsApp direct</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. BLOC LOCALISATION & ACCÈS (NDOGBONG) */}
      <section className="w-full py-16 lg:py-24 bg-[#fff8f6]" id="acces-ndogbong">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center gap-2 mb-12">
            <span className="font-label-md text-xs text-[#895200] font-bold uppercase tracking-wider">
              Plan & Accès
            </span>
            <div className="relative inline-block">
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#241915] font-bold">
                Nous trouver & Horaires
              </h2>
              <svg className="w-full h-3 text-[#b52529] mt-1" fill="none" preserveAspectRatio="none" viewBox="0 0 160 10">
                <path d="M4 7C45 2 115 2 156 6" stroke="currentColor" strokeLinecap="round" strokeWidth="3"></path>
              </svg>
            </div>
            <p className="font-body-md text-sm sm:text-base text-[#534435] max-w-xl">
              Facilement accessible à Ndogbong (fin goudron), avec stationnement et sécurité assurée.
            </p>
          </div>

          {/* Split Layout 2 Colonnes */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Gauche : Carte Placeholder */}
            <div className="lg:col-span-6 flex flex-col rounded-2xl overflow-hidden shadow-md bg-white border border-[#ffe9e2]">
              <div
                className="w-full h-72 sm:h-80 bg-cover bg-center"
                style={{ backgroundImage: `url('${RESTAURANT_INFO.mapImageUrl}')` }}
              ></div>
              <div className="p-6 flex flex-col gap-3">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#895200] text-[24px] shrink-0 mt-0.5">location_on</span>
                  <div className="flex flex-col">
                    <span className="font-headline-sm text-lg text-[#241915] font-bold">
                      {RESTAURANT_INFO.name} Ndogbong
                    </span>
                    <p className="font-body-sm text-sm text-[#534435]">
                      {RESTAURANT_INFO.fullAddress}
                    </p>
                    <p className="font-body-sm text-xs text-[#534435] pt-1">
                      Repère : {RESTAURANT_INFO.landmark}
                    </p>
                  </div>
                </div>
                <div className="pt-3">
                  <a
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fae3dc] text-[#241915] font-label-md text-sm font-bold hover:bg-[#f4ded7] transition-all"
                    href={RESTAURANT_INFO.googleMapsUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[18px]">directions</span>
                    <span>Itinéraire Google Maps</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Droite : Horaires & Contacts */}
            <div className="lg:col-span-6 flex flex-col justify-between rounded-2xl bg-white shadow-md p-6 sm:p-8 border border-[#ffe9e2]">
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-[#ffe9e2]">
                  <span className="font-headline-sm text-lg text-[#241915] font-bold">
                    Horaires de service
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffe9e2] text-[#895200] font-label-sm text-xs font-bold">
                    <span className="h-2 w-2 rounded-full bg-[#895200]"></span>
                    Service continu
                  </span>
                </div>

                <div className="divide-y divide-[#ffe9e2]/60 py-4 font-body-sm text-sm">
                  <div className="py-2.5 flex justify-between text-[#241915]">
                    <span className="font-medium">Mardi à Vendredi :</span>
                    <span className="font-bold">{RESTAURANT_INFO.hours.tueFri}</span>
                  </div>
                  <div className="py-2.5 flex justify-between text-[#241915]">
                    <span className="font-medium">Samedi :</span>
                    <span className="font-bold">{RESTAURANT_INFO.hours.sat}</span>
                  </div>
                  <div className="py-2.5 flex justify-between text-[#241915]">
                    <span className="font-medium">Dimanche :</span>
                    <span className="font-bold">{RESTAURANT_INFO.hours.sun}</span>
                  </div>
                  <div className="py-2.5 flex justify-between text-[#b52529]">
                    <span className="font-medium">Lundi :</span>
                    <span className="font-bold">{RESTAURANT_INFO.hours.mon}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-[#ffe9e2] flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`tel:${RESTAURANT_INFO.phonePrimary}`}
                  className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-xs sm:text-sm font-bold shadow-sm hover:bg-[#895200] hover:text-white transition-all"
                >
                  <span className="material-symbols-outlined text-[18px]">call</span>
                  <span>{RESTAURANT_INFO.phonePrimary}</span>
                </a>
                <button
                  onClick={() => onNavigate('reserver')}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#fae3dc] text-[#241915] font-label-md text-xs sm:text-sm font-bold hover:bg-[#f4ded7] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">calendar_today</span>
                  <span>Réserver</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
