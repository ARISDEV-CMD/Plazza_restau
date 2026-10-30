import React, { useState, useMemo, useRef } from 'react';
import { Utensils, Drumstick, Wheat, GlassWater, CupSoda, Beer, Wine, Martini, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { MenuItem, CartItem, MenuCategory, OrderMode, NavigationTab } from '../types';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/menuData';
import {
  formatFCFA,
  calculateSubtotal,
  calculateDeliveryFee,
  calculateTotal,
  buildWhatsAppOrderUrl
} from '../utils/orderCalculator';

interface MenuScreenProps {
  cartItems: CartItem[];
  onAddToCart: (item: MenuItem, quantity?: number, option?: any) => void;
  onUpdateCartItemQuantity: (cartItemId: string, delta: number) => void;
  onNavigate: (tab: NavigationTab) => void;
  orderMode: OrderMode;
  onSetOrderMode: (mode: OrderMode) => void;
}

export const MenuScreen: React.FC<MenuScreenProps> = ({
  cartItems,
  onAddToCart,
  onUpdateCartItemQuantity,
  onNavigate,
  orderMode,
  onSetOrderMode
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<'all' | 'new' | 'popular' | 'special'>('all');
  const [activeCategory, setActiveCategory] = useState<MenuCategory | 'all'>('all');
  const [showSubcategories, setShowSubcategories] = useState(false);
  const categoryScrollerRef = useRef<HTMLDivElement>(null);

  // Filtered items
  const filteredItems = useMemo(() => {
    return MENU_ITEMS.filter(item => {
      // Category filter
      if (activeCategory !== 'all' && item.category !== activeCategory) {
        return false;
      }
      // Tag filter
      if (selectedTag === 'new' && !item.isNew && item.tag !== 'Nouveau') return false;
      if (selectedTag === 'popular' && !item.isPopular && item.tag !== 'Populaire' && item.tag !== 'Signature') return false;
      if (selectedTag === 'special' && !item.isSpecial && item.tag !== 'Grand Format' && item.tag !== 'Aux braises de bois') return false;
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          item.name.toLowerCase().includes(q) ||
          item.description.toLowerCase().includes(q) ||
          item.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [activeCategory, selectedTag, searchQuery]);

  // Group items by category for section display
  const chickenItems = filteredItems.filter(i => i.category === 'poulet');
  const sidesItems = filteredItems.filter(i => i.category === 'accompagnements');
  const naturalDrinks = filteredItems.filter(i => i.category === 'naturelles');
  const sodaDrinks = filteredItems.filter(i => i.category === 'gazeuses');
  const alcoholBieres = filteredItems.filter(i => i.category === 'bieres');
  const alcoholVins = filteredItems.filter(i => i.category === 'vins');
  const alcoholWhiskies = filteredItems.filter(i => i.category === 'whiskies');

  // Cart calculations
  const subtotal = calculateSubtotal(cartItems);
  const deliveryFee = calculateDeliveryFee(orderMode, 1000);
  const total = calculateTotal(subtotal, deliveryFee, 0);

  // Helper to find item quantity currently in cart
  const getItemCartQuantity = (itemId: string) => {
    const existing = cartItems.find(c => c.item.id === itemId);
    return existing ? existing.quantity : 0;
  };

  const getItemCartId = (itemId: string) => {
    const existing = cartItems.find(c => c.item.id === itemId);
    return existing ? existing.id : null;
  };

  return (
    <div className="flex flex-col w-full pb-16 animate-in fade-in duration-300">
      {/* Top Decorative Ambient Glow */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[700px] h-[260px] bg-[#e8911a]/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Title & Brand Header */}
        <section className="menu-heading-photo max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 sm:pt-8 pb-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#fae3dc] mb-2 shadow-sm border border-[#ffe9e2]">
            <span className="material-symbols-outlined text-[#895200] text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              restaurant_menu
            </span>
            <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wider">
              Carte Gastronomique Douala
            </span>
          </div>

          <div className="relative inline-block mx-auto mb-2">
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl text-[#241915] tracking-tight font-bold">
              Notre menu gourmand
            </h1>
            <svg className="w-48 h-3 mx-auto mt-1 text-[#b52529]" fill="currentColor" viewBox="0 0 200 12">
              <path d="M2,8 C40,2 140,1 198,7 C145,11 60,11 2,8 Z"></path>
            </svg>
          </div>

          <p className="font-body-lg text-sm sm:text-base text-[#534435] max-w-2xl mx-auto mt-2">
            Commandez vos spécialités préparées minute à Ndogbong. À emporter ou en livraison rapide à Douala.
          </p>
        </section>

        {/* Sticky Navigation, Search & Quick Filters */}
        <div className="sticky top-20 z-40 bg-[#fff8f6]/95 backdrop-blur-md shadow-sm py-2.5 border-b border-[#ffe9e2]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-6 flex flex-col gap-3">
            {/* Search bar & Filter summary */}
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div className="relative w-full sm:flex-1">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#534435] text-[20px]">
                  search
                </span>
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-full bg-white text-[#241915] placeholder:text-[#867463] font-body-sm text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] transition-all"
                  placeholder="Rechercher un plat, un accompagnement, une boisson..."
                  type="text"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-symbols-outlined text-[18px]">close</span>
                  </button>
                )}
              </div>
            </div>

            {/* Main category navigation with manual horizontal controls */}
            <div className="relative flex w-full items-center gap-2">
              <button
                type="button"
                aria-label="Défiler les catégories vers la gauche"
                onClick={() => categoryScrollerRef.current?.scrollBy({ left: -260, behavior: 'smooth' })}
                className="shrink-0 w-9 h-9 rounded-full bg-white border border-[#f1dfd5] text-[#895200] shadow-sm hover:bg-[#fff1ec] flex items-center justify-center"
              >
                <ChevronLeft size={19} />
              </button>

              <div
                ref={categoryScrollerRef}
                className="flex-1 min-w-0 flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1"
                style={{ scrollbarWidth: 'none' }}
              >
                {[
                  { id: 'all', label: 'Tous', Icon: Utensils },
                  { id: 'poulet', label: 'Poulet (7)', Icon: Drumstick },
                  { id: 'accompagnements', label: 'Accompagnements (4)', Icon: Wheat },
                  { id: 'naturelles', label: 'Boissons naturelles (7)', Icon: GlassWater },
                  { id: 'gazeuses', label: 'Sodas & Gazeuses (3)', Icon: CupSoda },
                  { id: 'bieres', label: 'Bières [18+] (3)', Icon: Beer },
                  { id: 'vins', label: 'Vins [18+] (3)', Icon: Wine },
                  { id: 'whiskies', label: 'Whiskies [18+] (4)', Icon: Martini }
                ].map(cat => {
                  const isActive = activeCategory === cat.id;
                  return (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id as any)}
                      aria-pressed={isActive}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-md text-xs sm:text-sm whitespace-nowrap transition-all duration-200 cursor-pointer border ${
                        isActive
                          ? 'bg-[#e8911a] text-[#573200] border-[#e8911a] font-bold shadow-sm'
                          : 'bg-white/90 text-[#534435] border-[#f1dfd5] hover:bg-[#fff1ec] hover:border-[#e8911a]/50 hover:text-[#241915]'
                      }`}
                    >
                      <cat.Icon size={17} strokeWidth={1.9} aria-hidden="true" />
                      <span>{cat.label}</span>
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                aria-label="Défiler les catégories vers la droite"
                onClick={() => categoryScrollerRef.current?.scrollBy({ left: 260, behavior: 'smooth' })}
                className="shrink-0 w-9 h-9 rounded-full bg-white border border-[#f1dfd5] text-[#895200] shadow-sm hover:bg-[#fff1ec] flex items-center justify-center"
              >
                <ChevronRight size={19} />
              </button>
            </div>

            {/* Expandable secondary filters, displayed below the main categories */}
            <div className="w-full border-t border-[#ffe9e2] pt-2">
              <button
                type="button"
                onClick={() => setShowSubcategories(value => !value)}
                aria-expanded={showSubcategories}
                className="flex items-center gap-2 mx-auto px-4 py-2 rounded-full text-xs font-bold text-[#895200] bg-white border border-[#f1dfd5] shadow-sm hover:bg-[#fae3dc] transition-colors"
              >
                <span>{showSubcategories ? 'Masquer les filtres' : 'Plus de filtres'}</span>
                <ChevronDown size={15} className={`transition-transform duration-200 ${showSubcategories ? 'rotate-180' : ''}`} />
              </button>

              <div
                className={`grid transition-all duration-300 ease-out ${showSubcategories ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'}`}
                aria-hidden={!showSubcategories}
              >
                <div className="overflow-hidden">
                  <div className="flex items-center justify-center flex-wrap gap-2 pb-1">
                    {[
                      { id: 'all', label: 'Tout afficher' },
                      { id: 'popular', label: 'Populaires' },
                      { id: 'special', label: 'Formule spéciale' }
                    ].map(tag => (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => setSelectedTag(tag.id as 'all' | 'popular' | 'special')}
                        aria-pressed={selectedTag === tag.id}
                        className={`px-3.5 py-1.5 rounded-full font-label-sm text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                          selectedTag === tag.id
                            ? 'bg-[#e8911a] text-[#573200] border-[#e8911a] shadow-sm'
                            : 'bg-white text-[#534435] border-[#f1dfd5] hover:bg-[#fff1ec]'
                        }`}
                      >
                        {tag.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout (70% Menu Catalog / 30% Sticky Cart) */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 py-6 sm:py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: MENU CATALOG (~70%) */}
          <div className="lg:col-span-8 flex flex-col gap-10">
            {/* SECTION A: POULET */}
            {chickenItems.length > 0 && (
              <section className="flex flex-col gap-4" id="poulet">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#ffe9e2]">
                  <div>
                    <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffdcbc] text-[#2c1700] font-label-sm text-xs font-semibold mb-1">
                      Recette signature de la maison
                    </div>
                    <h2 className="font-headline-lg text-2xl text-[#241915] font-bold">
                      Poulet doré, croustillant & braisé
                    </h2>
                  </div>
                  <p className="font-label-sm text-xs text-[#534435] font-medium">
                    Volaille fraîche locale marinée aux épices du Cameroun
                  </p>
                </div>

                {/* Chicken Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {chickenItems.map(item => {
                    const inCartQty = getItemCartQuantity(item.id);
                    const cartId = getItemCartId(item.id);
                    const isBraise = item.id === 'poulet-braise-entier';

                    if (isBraise) {
                      return (
                        <div
                          key={item.id}
                          className="sm:col-span-2 bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-center gap-4 border border-[#ffe9e2]"
                        >
                          <div className="w-full sm:w-44 h-36 rounded-lg overflow-hidden shrink-0 bg-[#ffe9e2]">
                            <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                          </div>
                          <div className="flex flex-col flex-1 w-full justify-between">
                            <div>
                              <div className="flex items-center justify-between">
                                <h3 className="font-headline-md text-xl text-[#241915] font-bold">{item.name}</h3>
                                <span className="px-2.5 py-1 rounded-full bg-[#ffdad7] text-[#410004] font-label-sm text-xs font-bold">
                                  Aux braises de bois
                                </span>
                              </div>
                              <p className="font-body-sm text-xs sm:text-sm text-[#534435] mt-1">
                                {item.description}
                              </p>
                            </div>
                            <div className="flex items-center justify-between mt-4 pt-2 border-t border-[#ffe9e2]">
                              <span className="font-headline-sm text-lg text-[#b52529] font-bold">
                                {formatFCFA(item.price)}
                              </span>
                              {inCartQty > 0 ? (
                                <div className="flex items-center gap-2 bg-[#fae3dc] px-3 py-1.5 rounded-full">
                                  <button
                                    onClick={() => cartId && onUpdateCartItemQuantity(cartId, -1)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#241915] font-bold text-xs"
                                    type="button"
                                  >
                                    -
                                  </button>
                                  <span className="font-label-sm text-xs font-bold px-1 text-[#895200]">
                                    {inCartQty} au panier
                                  </span>
                                  <button
                                    onClick={() => cartId && onUpdateCartItemQuantity(cartId, 1)}
                                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#241915] font-bold text-xs"
                                    type="button"
                                  >
                                    +
                                  </button>
                                </div>
                              ) : (
                                <button
                                  onClick={() => onAddToCart(item)}
                                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-xs sm:text-sm font-bold shadow-sm hover:bg-[#895200] hover:text-white transition-colors cursor-pointer"
                                  type="button"
                                >
                                  <span className="material-symbols-outlined text-[18px]">add_shopping_cart</span>
                                  <span>Ajouter à la commande</span>
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    return (
                      <div
                        key={item.id}
                        className={`rounded-xl p-4 transition-all flex flex-col justify-between border ${
                          inCartQty > 0
                            ? 'bg-gradient-to-br from-white to-[#fff1ec] border-[#e8911a] shadow-md'
                            : 'bg-white border-[#ffe9e2] shadow-sm hover:shadow-md'
                        }`}
                      >
                        <div>
                          {inCartQty > 0 && (
                            <div className="flex justify-end mb-1">
                              <span className="px-2 py-0.5 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-[11px] font-bold flex items-center gap-1 shadow-xs">
                                <span className="material-symbols-outlined text-[12px]">check</span>
                                <span>Ajouté x{inCartQty}</span>
                              </span>
                            </div>
                          )}
                          <div className="flex gap-3">
                            <div className="w-24 h-24 rounded-lg overflow-hidden shrink-0 bg-[#ffe9e2]">
                              <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <h3 className="font-headline-sm text-base text-[#241915] font-bold leading-snug">
                                {item.name}
                              </h3>
                              <p className="font-body-sm text-xs text-[#534435] mt-1 line-clamp-2">
                                {item.description}
                              </p>
                              <span className="font-price-tag text-sm sm:text-base text-[#b52529] font-bold mt-2">
                                {formatFCFA(item.price)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 flex items-center justify-between border-t border-[#ffe9e2]">
                          {inCartQty > 0 ? (
                            <>
                              <span className="font-label-sm text-xs text-[#534435]">Dans votre commande</span>
                              <div className="flex items-center gap-2 bg-[#fae3dc] px-2.5 py-1 rounded-full">
                                <button
                                  onClick={() => cartId && onUpdateCartItemQuantity(cartId, -1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#241915] font-bold text-xs hover:bg-[#fff1ec]"
                                  type="button"
                                >
                                  -
                                </button>
                                <span className="font-label-md text-sm font-bold px-1 text-[#895200]">
                                  {inCartQty}
                                </span>
                                <button
                                  onClick={() => cartId && onUpdateCartItemQuantity(cartId, 1)}
                                  className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#241915] font-bold text-xs hover:bg-[#fff1ec]"
                                  type="button"
                                >
                                  +
                                </button>
                              </div>
                            </>
                          ) : (
                            <div className="w-full flex justify-end">
                              <button
                                onClick={() => onAddToCart(item)}
                                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-xs font-bold shadow-sm hover:bg-[#895200] hover:text-white transition-colors cursor-pointer"
                                type="button"
                              >
                                <span className="material-symbols-outlined text-[16px]">add</span>
                                <span>Ajouter</span>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* SECTION B: ACCOMPAGNEMENTS */}
            {sidesItems.length > 0 && (
              <section className="flex flex-col gap-4" id="accompagnements">
                <div className="flex items-center justify-between pb-2 border-b border-[#ffe9e2]">
                  <div>
                    <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wider">
                      Garnitures du terroir
                    </span>
                    <h2 className="font-headline-lg text-2xl text-[#241915] font-bold">
                      Accompagnements chauds
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#fae3dc] text-[#241915] font-label-md text-xs font-bold">
                    Dès 500 FCFA
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {sidesItems.map(item => {
                    const inCartQty = getItemCartQuantity(item.id);
                    const cartId = getItemCartId(item.id);

                    return (
                      <div
                        key={item.id}
                        className="bg-white rounded-xl p-3.5 shadow-sm flex items-center justify-between gap-3 border border-[#ffe9e2]"
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden shrink-0 bg-[#ffe9e2]">
                          <img className="w-full h-full object-cover" alt={item.name} src={item.image} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-headline-sm text-sm sm:text-base text-[#241915] font-bold truncate">
                            {item.name}
                          </h4>
                          <p className="font-body-sm text-xs text-[#534435] truncate">{item.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-price-tag text-xs sm:text-sm text-[#b52529] font-bold">
                              {formatFCFA(item.price)}
                            </span>
                            {inCartQty > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-[#e8911a]/20 text-[#241915] font-label-sm text-[10px] font-bold">
                                x{inCartQty} au panier
                              </span>
                            )}
                          </div>
                        </div>

                        {inCartQty > 0 ? (
                          <div className="flex items-center gap-1 bg-[#fae3dc] px-2 py-1 rounded-full shrink-0">
                            <button
                              onClick={() => cartId && onUpdateCartItemQuantity(cartId, -1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#241915] font-bold text-xs"
                              type="button"
                            >
                              -
                            </button>
                            <span className="font-label-sm text-xs font-bold px-1 text-[#895200]">
                              {inCartQty}
                            </span>
                            <button
                              onClick={() => cartId && onUpdateCartItemQuantity(cartId, 1)}
                              className="w-6 h-6 flex items-center justify-center rounded-full bg-white text-[#241915] font-bold text-xs"
                              type="button"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => onAddToCart(item)}
                            className="w-9 h-9 rounded-full bg-[#fae3dc] text-[#241915] hover:bg-[#e8911a] hover:text-white transition-colors flex items-center justify-center shrink-0 cursor-pointer"
                            type="button"
                          >
                            <span className="material-symbols-outlined text-[20px]">add</span>
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* SECTION C: BOISSONS NATURELLES */}
            {naturalDrinks.length > 0 && (
              <section className="flex flex-col gap-4" id="naturelles">
                <div className="pb-2 border-b border-[#ffe9e2]">
                  <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wider">
                    Fraîcheur & Vitalité
                  </span>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h2 className="font-headline-lg text-2xl text-[#241915] font-bold">
                      Boissons naturelles faites maison
                    </h2>
                    <span className="font-label-sm text-xs px-2.5 py-1 rounded-full bg-[#fae3dc] text-[#534435]">
                      100% fruits locaux sans conservateur
                    </span>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4 border border-[#ffe9e2]">
                  {naturalDrinks.map(drink => {
                    const inCartQty = getItemCartQuantity(drink.id);
                    const cartId = getItemCartId(drink.id);

                    return (
                      <div
                        key={drink.id}
                        className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 rounded-xl transition-colors ${
                          inCartQty > 0 ? 'bg-[#fff1ec]' : 'hover:bg-[#fff8f6]'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <span className="material-symbols-outlined text-[#895200] text-[20px] shrink-0">
                            eco
                          </span>
                          <div className="flex flex-col min-w-0">
                            <span className="font-body-md text-sm sm:text-base font-semibold text-[#241915]">
                              {drink.name}
                            </span>
                            <span className="font-body-sm text-xs text-[#534435] truncate">
                              {drink.description}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-0 border-[#ffe9e2]">
                          <span className="font-price-tag text-sm sm:text-base text-[#b52529] font-bold">
                            {formatFCFA(drink.price)}
                          </span>

                          {inCartQty > 0 ? (
                            <div className="flex items-center gap-1 bg-[#fae3dc] px-2 py-1 rounded-full">
                              <button
                                onClick={() => cartId && onUpdateCartItemQuantity(cartId, -1)}
                                className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-xs font-bold"
                              >
                                -
                              </button>
                              <span className="font-label-sm text-xs font-bold px-1 text-[#895200]">
                                {inCartQty}
                              </span>
                              <button
                                onClick={() => cartId && onUpdateCartItemQuantity(cartId, 1)}
                                className="w-5 h-5 flex items-center justify-center rounded-full bg-white text-xs font-bold"
                              >
                                +
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => onAddToCart(drink)}
                              className="px-3.5 py-1.5 rounded-full bg-[#fae3dc] text-[#241915] hover:bg-[#e8911a] hover:text-white font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                              type="button"
                            >
                              Ajouter
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            )}

            {/* SECTION D: SODAS & GAZEUSES */}
            {sodaDrinks.length > 0 && (
              <section className="flex flex-col gap-4" id="gazeuses">
                <div className="border-b border-[#ffe9e2] pb-2">
                  <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wider">
                    Rafraîchissements
                  </span>
                  <h2 className="font-headline-lg text-2xl text-[#241915] font-bold">
                    Boissons gazeuses & Sodas
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {sodaDrinks.map(soda => (
                    <div
                      key={soda.id}
                      className="bg-white rounded-xl p-4 shadow-sm flex flex-col justify-between border border-[#ffe9e2]"
                    >
                      <div>
                        <span className="font-label-sm text-xs text-[#534435] font-medium">Bouteille fraîche</span>
                        <h4 className="font-headline-sm text-base text-[#241915] mt-1 font-bold">{soda.name}</h4>
                        <p className="font-body-sm text-xs text-[#534435] mt-1">{soda.description}</p>
                      </div>
                      <div className="flex items-center justify-between mt-4 pt-2 border-t border-[#ffe9e2]">
                        <span className="font-price-tag text-sm text-[#b52529] font-bold">
                          {formatFCFA(soda.price)}
                        </span>
                        <button
                          onClick={() => onAddToCart(soda)}
                          className="w-8 h-8 rounded-full bg-[#fae3dc] hover:bg-[#e8911a] hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">add</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* SECTION E: ALCOOL & SPIRITUEUX [18+] */}
            {(alcoholBieres.length > 0 || alcoholVins.length > 0 || alcoholWhiskies.length > 0) && (
              <section className="flex flex-col gap-4" id="alcool">
                <div className="flex items-center justify-between border-b border-[#ffe9e2] pb-2">
                  <div>
                    <span className="font-label-sm text-xs text-[#b52529] font-bold uppercase tracking-wider">
                      Cave & Bar
                    </span>
                    <h2 className="font-headline-lg text-2xl text-[#241915] font-bold">
                      Bières, Vins fins & Whiskies
                    </h2>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#b52529] text-white font-label-sm text-xs font-bold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">no_adult_content</span>
                    <span>18+ Réservé aux majeurs</span>
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Bières */}
                  {alcoholBieres.length > 0 && (
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-[#ffe9e2]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🍺</span>
                        <h3 className="font-headline-sm text-base font-bold text-[#241915]">
                          Bières fraîches du Cameroun & Importées
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {alcoholBieres.map(b => (
                          <div key={b.id} className="bg-[#fff1ec] p-3 rounded-lg flex flex-col justify-between">
                            <span className="font-body-sm text-xs text-[#241915] font-medium">{b.name}</span>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#ffe9e2]">
                              <span className="font-price-tag text-xs font-bold text-[#b52529]">{formatFCFA(b.price)}</span>
                              <button
                                onClick={() => onAddToCart(b)}
                                className="px-2.5 py-1 rounded-full bg-white text-[#241915] hover:bg-[#e8911a] hover:text-white font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                                type="button"
                              >
                                + Ajouter
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Vins */}
                  {alcoholVins.length > 0 && (
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-[#ffe9e2]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🍷</span>
                        <h3 className="font-headline-sm text-base font-bold text-[#241915]">
                          Vins de Sélection (Bouteille)
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {alcoholVins.map(v => (
                          <div key={v.id} className="bg-[#fff1ec] p-3 rounded-lg flex flex-col justify-between">
                            <span className="font-body-sm text-xs text-[#241915] font-medium">{v.name}</span>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#ffe9e2]">
                              <span className="font-price-tag text-xs font-bold text-[#b52529]">{formatFCFA(v.price)}</span>
                              <button
                                onClick={() => onAddToCart(v)}
                                className="px-2.5 py-1 rounded-full bg-white text-[#241915] hover:bg-[#e8911a] hover:text-white font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                                type="button"
                              >
                                + Ajouter
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Whiskies */}
                  {alcoholWhiskies.length > 0 && (
                    <div className="bg-white rounded-xl p-5 shadow-sm border border-[#ffe9e2]">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xl">🥃</span>
                        <h3 className="font-headline-sm text-base font-bold text-[#241915]">
                          Whiskies & Spiritueux Prestigieux (Bouteille)
                        </h3>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {alcoholWhiskies.map(w => (
                          <div key={w.id} className="bg-[#fff1ec] p-3 rounded-lg flex flex-col justify-between">
                            <span className="font-body-sm text-xs text-[#241915] font-medium">{w.name}</span>
                            <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#ffe9e2]">
                              <span className="font-price-tag text-xs font-bold text-[#b52529]">{formatFCFA(w.price)}</span>
                              <button
                                onClick={() => onAddToCart(w)}
                                className="px-2 py-1 rounded-full bg-white text-[#241915] hover:bg-[#e8911a] hover:text-white font-label-sm text-xs font-semibold transition-colors cursor-pointer"
                                type="button"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="bg-[#fae3dc]/60 rounded-xl p-4 flex items-center gap-3 border border-[#ffe9e2]">
                  <span className="material-symbols-outlined text-[#b52529] text-[24px] shrink-0">warning</span>
                  <p className="font-body-sm text-xs text-[#534435] leading-relaxed">
                    <strong>Avertissement légal :</strong> L'abus d'alcool est dangereux pour la santé. Vente strictement interdite aux moins de 18 ans. À consommer avec modération.
                  </p>
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN: STICKY CART (~30% Desktop) */}
          <aside className="lg:col-span-4 sticky top-28">
            <div className="bg-white rounded-2xl p-5 shadow-lg flex flex-col gap-4 border border-[#ffe9e2]">
              {/* Cart Header */}
              <div className="flex items-center justify-between pb-3 bg-[#fff1ec] -mx-5 -mt-5 p-5 rounded-t-2xl border-b border-[#ffe9e2]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#895200] text-[24px]">shopping_bag</span>
                  <h2 className="font-headline-md text-lg sm:text-xl text-[#241915] font-bold">Mon Panier</h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-xs font-bold">
                  {cartItems.reduce((acc, c) => acc + c.quantity, 0)} articles
                </span>
              </div>

              {/* Order Mode Toggle */}
              <div className="grid grid-cols-2 p-1 rounded-full bg-[#fff1ec] gap-1 border border-[#ffe9e2]">
                <button
                  onClick={() => onSetOrderMode('delivery')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-full font-label-sm text-xs font-bold transition-all cursor-pointer ${
                    orderMode === 'delivery'
                      ? 'bg-[#e8911a] text-[#573200] shadow-sm'
                      : 'text-[#534435] hover:text-[#241915]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">moped</span>
                  <span>Livraison</span>
                </button>
                <button
                  onClick={() => onSetOrderMode('takeaway')}
                  className={`flex items-center justify-center gap-1.5 py-2 rounded-full font-label-sm text-xs font-semibold transition-all cursor-pointer ${
                    orderMode === 'takeaway'
                      ? 'bg-[#e8911a] text-[#573200] shadow-sm'
                      : 'text-[#534435] hover:text-[#241915]'
                  }`}
                  type="button"
                >
                  <span className="material-symbols-outlined text-[16px]">storefront</span>
                  <span>À emporter</span>
                </button>
              </div>

              {/* Cart Item List */}
              {cartItems.length === 0 ? (
                <div className="py-8 text-center text-[#534435]">
                  <span className="material-symbols-outlined text-[36px] text-[#867463] mb-2 block">
                    remove_shopping_cart
                  </span>
                  <p className="font-body-md text-sm">Votre panier est vide.</p>
                  <p className="font-body-sm text-xs text-[#867463] mt-1">
                    Choisissez parmi nos spécialités ci-contre.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col divide-y divide-[#ffe9e2] max-h-[360px] overflow-y-auto pr-1">
                  {cartItems.map(cItem => (
                    <div key={cItem.id} className="py-3 flex items-center justify-between gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-[#ffe9e2]">
                        <img className="w-full h-full object-cover" alt={cItem.item.name} src={cItem.item.image} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-body-md text-sm font-bold text-[#241915] truncate">
                          {cItem.item.name}
                        </h4>
                        <div className="flex items-center gap-1.5">
                          <span className="font-label-sm text-xs text-[#534435]">
                            {cItem.unitPrice} x {cItem.quantity} =
                          </span>
                          <span className="font-label-sm text-xs text-[#b52529] font-bold">
                            {formatFCFA(cItem.unitPrice * cItem.quantity)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 bg-[#fff1ec] px-2 py-1 rounded-full shrink-0">
                        <button
                          onClick={() => onUpdateCartItemQuantity(cItem.id, -1)}
                          className="w-5 h-5 flex items-center justify-center rounded-full bg-white font-bold text-xs hover:bg-[#fae3dc]"
                          type="button"
                          aria-label="Diminuer"
                        >
                          -
                        </button>
                        <span className="font-label-sm text-xs font-bold px-1">{cItem.quantity}</span>
                        <button
                          onClick={() => onUpdateCartItemQuantity(cItem.id, 1)}
                          className="w-5 h-5 flex items-center justify-center rounded-full bg-white font-bold text-xs hover:bg-[#fae3dc]"
                          type="button"
                          aria-label="Augmenter"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Calculation Breakdown */}
              <div className="bg-[#fff1ec] p-4 rounded-xl space-y-2 border border-[#ffe9e2]">
                <div className="flex justify-between font-body-sm text-xs text-[#534435]">
                  <span>Sous-total articles</span>
                  <span className="font-semibold text-[#241915]">{formatFCFA(subtotal)}</span>
                </div>
                <div className="flex justify-between font-body-sm text-xs text-[#534435]">
                  <span className="flex items-center gap-1">
                    <span>{orderMode === 'delivery' ? 'Livraison (Ndogbong)' : 'Frais de retrait'}</span>
                    <span className="material-symbols-outlined text-[14px] text-[#895200]">info</span>
                  </span>
                  <span className="font-semibold text-[#241915]">{formatFCFA(deliveryFee)}</span>
                </div>
                <div className="pt-2 flex justify-between items-baseline border-t border-[#ffe9e2]">
                  <span className="font-headline-sm text-sm font-bold text-[#241915]">Total net</span>
                  <span className="font-headline-lg text-xl sm:text-2xl text-[#b52529] font-bold tracking-tight">
                    {formatFCFA(total)}
                  </span>
                </div>
              </div>

              {/* Preparation & Delivery ETA Note */}
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#fae3dc] text-[#241915]">
                <span className="material-symbols-outlined text-[#895200] text-[18px]">timelapse</span>
                <span className="font-label-sm text-xs font-medium">
                  Préparé minute en 25–35 min · Ndogbong, Douala
                </span>
              </div>

              {/* Call To Action Buttons */}
              <div className="flex flex-col gap-2 pt-1">
                <button
                  disabled={cartItems.length === 0}
                  onClick={() => onNavigate('commander')}
                  className={`w-full py-3.5 px-6 rounded-full font-label-md text-sm font-bold shadow-md active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    cartItems.length > 0
                      ? 'bg-[#e8911a] text-[#573200] hover:bg-[#895200] hover:text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                  type="button"
                >
                  <span>Commander en ligne ({formatFCFA(total)})</span>
                  <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                </button>

                <a
                  href={buildWhatsAppOrderUrl({
                    phone: RESTAURANT_INFO.phonePrimary,
                    orderId: 'MENU',
                    customerName: 'Client La Plazza',
                    customerPhone: 'Douala',
                    mode: orderMode,
                    items: cartItems,
                    total: total,
                    paymentMethod: 'Paiement à convenir'
                  })}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-6 rounded-full bg-white text-[#b52529] font-label-md text-sm font-bold hover:bg-[#b52529] hover:text-white active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-sm border border-[#b52529]/30"
                >
                  <span className="material-symbols-outlined text-[20px] text-[#25D366]">chat</span>
                  <span>Commander via WhatsApp</span>
                </a>
              </div>

              {/* Reassurance Badges */}
              <div className="pt-1 text-center">
                <p className="font-label-sm text-[11px] text-[#534435] font-medium">
                  Paiement sécurisé à la livraison ou au comptoir
                </p>
                <div className="flex items-center justify-center gap-2 mt-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#ffe9e2] font-label-sm text-[10px] font-bold text-[#241915]">
                    Espèces
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ffe9e2] font-label-sm text-[10px] font-bold text-[#895200]">
                    MTN MoMo
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[#ffe9e2] font-label-sm text-[10px] font-bold text-[#b52529]">
                    Orange Money
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
