import React, { useState } from 'react';
import { ClocheReveal } from './motion/effects';
import { CartItem, OrderMode, PaymentMethod, DeliveryTiming, NavigationTab } from '../types';
import { DISTRICT_LIST, RESTAURANT_INFO } from '../data/menuData';
import {
  formatFCFA,
  calculateSubtotal,
  calculateDeliveryFee,
  calculateDiscount,
  calculateTotal,
  generateOrderReference,
  buildWhatsAppOrderUrl
} from '../utils/orderCalculator';

interface CheckoutScreenProps {
  cartItems: CartItem[];
  onNavigate: (tab: NavigationTab) => void;
  orderMode: OrderMode;
  onSetOrderMode: (mode: OrderMode) => void;
  onClearCart?: () => void;
}

export const CheckoutScreen: React.FC<CheckoutScreenProps> = ({
  cartItems,
  onNavigate,
  orderMode,
  onSetOrderMode,
  onClearCart
}) => {
  // Form state
  const [fullName, setFullName] = useState('Jean-Pierre Tchuente');
  const [phone, setPhone] = useState('678 18 49 30');
  const [selectedDistrictId, setSelectedDistrictId] = useState('ndogbong');
  const [address, setAddress] = useState("Fin goudron Ndogbong, face pharmacie de l'Espoir, barrière noire");
  const [timing, setTiming] = useState<DeliveryTiming>('asap');
  const [scheduledTime, setScheduledTime] = useState('19:30');
  const [kitchenNote, setKitchenNote] = useState('Piment à part svp, sauce bien relevée');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cod');
  const [isAgeConfirmed, setIsAgeConfirmed] = useState(true);

  // Promo code state
  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState('');
  const [promoMessage, setPromoMessage] = useState<string | null>(null);

  // Submission state
  const [orderSubmitted, setOrderSubmitted] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState('');

  // Calculations
  const selectedDistrict = DISTRICT_LIST.find(d => d.id === selectedDistrictId) || DISTRICT_LIST[0];
  const subtotal = calculateSubtotal(cartItems);
  const deliveryFee = calculateDeliveryFee(orderMode, selectedDistrict.fee);
  const discount = calculateDiscount(subtotal, appliedPromo);
  const total = calculateTotal(subtotal, deliveryFee, discount);

  const handleApplyPromo = () => {
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) {
      setAppliedPromo('');
      setPromoMessage(null);
      return;
    }
    const testDiscount = calculateDiscount(subtotal, code);
    if (testDiscount > 0) {
      setAppliedPromo(code);
      setPromoMessage(`Code appliqué ! Réduction de ${formatFCFA(testDiscount)}`);
    } else {
      setPromoMessage('Code promo invalide ou non éligible pour cette commande.');
    }
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgeConfirmed) {
      alert('Veuillez confirmer les conditions de vente pour continuer.');
      return;
    }
    if (cartItems.length === 0) {
      alert('Votre panier est vide. Veuillez ajouter des plats depuis le menu.');
      onNavigate('menu');
      return;
    }

    const orderId = generateOrderReference();
    setConfirmedOrderId(orderId);
    setOrderSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // WhatsApp link for instant checkout
  const paymentMethodLabel = 
    paymentMethod === 'cod' ? 'Paiement à la livraison / au retrait' :
    paymentMethod === 'momo' ? 'MTN Mobile Money' : 'Orange Money';

  const whatsappUrl = buildWhatsAppOrderUrl({
    phone: RESTAURANT_INFO.phonePrimary,
    orderId: confirmedOrderId || 'COMMANDE',
    customerName: fullName,
    customerPhone: phone,
    mode: orderMode,
    items: cartItems,
    districtName: selectedDistrict.name,
    address: address,
    total: total,
    paymentMethod: paymentMethodLabel,
    note: kitchenNote
  });

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300">
      <div className="relative w-full max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* Top Navigation / Breadcrumb */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => onNavigate('menu')}
            className="inline-flex items-center gap-2 text-[#534435] hover:text-[#895200] transition-colors font-label-md text-sm group w-fit cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] transition-transform group-hover:-translate-x-1">
              arrow_back
            </span>
            <span>Retourner au menu</span>
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fae3dc] text-[#534435] font-label-sm text-xs w-fit">
            <span className="inline-block w-2 h-2 rounded-full bg-[#e8911a] animate-pulse"></span>
            <span>Commandes ouvertes · Cuisine active à Ndogbong</span>
          </div>
        </div>

        {/* Page Title & Header */}
        <div className="mb-8 sm:mb-10">
          <p className="font-script-accent text-lg text-[#895200] mb-1">
            {RESTAURANT_INFO.tagline}
          </p>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#241915] tracking-tight font-bold">
            {orderSubmitted ? 'Commande confirmée !' : 'Finaliser votre commande'}
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#534435] mt-1">
            {orderSubmitted
              ? `Votre commande #${confirmedOrderId} a été transmise à notre cuisine à Ndogbong.`
              : 'Préparation fraîche et savoureuse, livrée rapidement chez vous à Douala ou prête à emporter.'}
          </p>
        </div>

        {/* Stepper Navigation (4 Steps) */}
        <div className="w-full bg-white rounded-2xl shadow-sm p-4 sm:p-6 mb-8 sm:mb-10 relative overflow-hidden border border-[#ffe9e2]">
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 items-center">
            {/* Step 1: Panier (Done) */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#fae3dc] text-[#895200] flex items-center justify-center font-label-md shrink-0">
                <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[11px] text-[#534435] uppercase tracking-wider font-semibold">
                  Étape 1
                </span>
                <span className="font-label-md text-sm text-[#241915] truncate font-medium">Panier validé</span>
              </div>
            </div>

            {/* Step 2: Informations & Livraison */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md text-sm font-bold shrink-0 ${
                orderSubmitted
                  ? 'bg-[#fae3dc] text-[#895200]'
                  : 'bg-[#e8911a] text-[#573200] shadow-md shadow-[#e8911a]/30 ring-4 ring-[#e8911a]/20'
              }`}>
                {orderSubmitted ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  <span>2</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`font-label-sm text-[11px] uppercase tracking-wider font-bold ${
                  orderSubmitted ? 'text-[#534435]' : 'text-[#b52529]'
                }`}>
                  {orderSubmitted ? 'Complété' : 'Actif'}
                </span>
                <span className="font-headline-sm text-sm sm:text-base text-[#241915] truncate font-bold">
                  Livraison & Infos
                </span>
              </div>
            </div>

            {/* Step 3: Règlement */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md text-sm font-bold shrink-0 ${
                orderSubmitted
                  ? 'bg-[#fae3dc] text-[#895200]'
                  : 'bg-[#ffe9e2] text-[#534435]'
              }`}>
                {orderSubmitted ? (
                  <span className="material-symbols-outlined text-[20px]">check</span>
                ) : (
                  <span>3</span>
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-sm text-[11px] text-[#534435] uppercase tracking-wider">
                  Étape 3
                </span>
                <span className="font-label-md text-sm text-[#241915] truncate font-medium">Règlement</span>
              </div>
            </div>

            {/* Step 4: Confirmation */}
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-label-md text-sm shrink-0 ${
                orderSubmitted
                  ? 'bg-[#e8911a] text-[#573200] shadow-md ring-4 ring-[#e8911a]/20 font-bold'
                  : 'bg-[#ffe9e2] text-[#867463]'
              }`}>
                <span className="material-symbols-outlined text-[18px]">verified</span>
              </div>
              <div className="flex flex-col min-w-0">
                <span className={`font-label-sm text-[11px] uppercase tracking-wider font-bold ${
                  orderSubmitted ? 'text-[#b52529]' : 'text-[#867463]'
                }`}>
                  {orderSubmitted ? 'Actif' : 'Étape 4'}
                </span>
                <span className="font-label-md text-sm text-[#241915] truncate font-bold">Confirmation</span>
              </div>
            </div>
          </div>
        </div>

        {/* ORDER CONFIRMATION VIEW (When user clicks Confirmer et commander) */}
        {orderSubmitted ? (
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-10 border border-[#ffe9e2] max-w-3xl mx-auto flex flex-col items-center text-center gap-6 confirm-pop">
            <ClocheReveal size={150}>
              <span className="material-symbols-outlined text-[34px]">check_circle</span>
            </ClocheReveal>

            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-[#ffdad7] text-[#410004] font-label-sm text-xs font-bold uppercase tracking-wider mb-2">
                Commande Reçue
              </span>
              <h2 className="font-headline-lg text-2xl sm:text-3xl text-[#241915] font-bold">
                Merci {fullName} ! Votre commande #{confirmedOrderId} est enregistrée.
              </h2>
              <p className="font-body-md text-sm sm:text-base text-[#534435] mt-2 max-w-xl mx-auto">
                Notre gérant et notre chef à Ndogbong préparent vos plats. Vous serez immédiatement appelé au{' '}
                <strong className="text-[#241915]">+237 {phone}</strong> pour confirmer l'expédition.
              </p>
            </div>

            {/* Order details summary card */}
            <div className="w-full bg-[#fff1ec] rounded-xl p-5 text-left border border-[#ffe9e2] space-y-3">
              <div className="flex justify-between items-center border-b border-[#ffe9e2] pb-2">
                <span className="font-label-md text-xs font-bold text-[#895200]">Référence</span>
                <span className="font-price-tag text-base font-bold text-[#241915]">#{confirmedOrderId}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#534435]">
                <span>Mode de service :</span>
                <span className="font-bold text-[#241915]">
                  {orderMode === 'delivery' ? 'Livraison express à domicile' :
                   orderMode === 'takeaway' ? 'À emporter à Ndogbong' : 'Sur place à table'}
                </span>
              </div>
              {orderMode === 'delivery' && (
                <div className="flex justify-between items-center text-xs text-[#534435]">
                  <span>Lieu de livraison :</span>
                  <span className="font-bold text-[#241915] text-right truncate max-w-[200px]">
                    {selectedDistrict.name}
                  </span>
                </div>
              )}
              <div className="flex justify-between items-center text-xs text-[#534435]">
                <span>Mode de règlement :</span>
                <span className="font-bold text-[#241915]">{paymentMethodLabel}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-[#534435]">
                <span>Délai estimé :</span>
                <span className="font-bold text-[#895200]">25 à 35 minutes</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-[#ffe9e2]">
                <span className="font-label-md text-sm font-bold text-[#241915]">Montant total :</span>
                <span className="font-price-tag text-lg font-bold text-[#b52529]">{formatFCFA(total)}</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:flex-1 py-4 px-6 rounded-full bg-[#25D366] text-white font-label-md text-sm font-bold hover:brightness-105 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md"
              >
                <span className="material-symbols-outlined text-[20px]">chat</span>
                <span>Envoyer le récapitulatif sur WhatsApp</span>
              </a>

              <button
                onClick={() => {
                  setOrderSubmitted(false);
                  if (onClearCart) onClearCart();
                  onNavigate('accueil');
                }}
                className="w-full sm:w-auto py-4 px-6 rounded-full bg-[#fae3dc] text-[#241915] font-label-md text-sm font-bold hover:bg-[#f4ded7] transition-all cursor-pointer"
              >
                Retour à l'accueil
              </button>
            </div>
          </div>
        ) : (
          /* MAIN 2-COLUMN GRID (Desktop ~65% / ~35%) */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT COLUMN: DETAILS & FORM (~65%) */}
            <div className="lg:col-span-8 flex flex-col gap-8">
              {/* SECTION A: Mode de commande */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-7 border border-[#ffe9e2]">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-full bg-[#fae3dc] text-[#895200] flex items-center justify-center">
                      <span className="material-symbols-outlined text-[20px]">room_service</span>
                    </span>
                    <h2 className="font-headline-sm text-lg text-[#241915] font-bold">
                      Mode de dégustation
                    </h2>
                  </div>
                  <span className="font-label-sm text-xs text-[#895200] font-medium">Recommandé</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-1.5 bg-[#fff1ec] rounded-xl border border-[#ffe9e2]">
                  {/* Option 1: Livraison */}
                  <label
                    onClick={() => onSetOrderMode('delivery')}
                    className={`cursor-pointer relative flex flex-col items-center justify-center text-center p-3.5 rounded-lg transition-all ${
                      orderMode === 'delivery'
                        ? 'bg-white text-[#241915] shadow-sm'
                        : 'bg-transparent text-[#534435] hover:bg-white/60'
                    }`}
                  >
                    <input
                      checked={orderMode === 'delivery'}
                      onChange={() => onSetOrderMode('delivery')}
                      className="sr-only"
                      name="order_mode"
                      type="radio"
                      value="delivery"
                    />
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-xs ${
                      orderMode === 'delivery' ? 'bg-[#e8911a] text-[#573200]' : 'bg-[#ffe9e2] text-[#534435]'
                    }`}>
                      <span className="material-symbols-outlined text-[22px]">two_wheeler</span>
                    </span>
                    <span className="font-label-md text-sm font-bold text-[#241915]">Livraison express</span>
                    <span className="font-label-sm text-xs text-[#534435] mt-0.5">Domicile ou bureau</span>
                    {orderMode === 'delivery' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#895200]"></span>
                    )}
                  </label>

                  {/* Option 2: À emporter */}
                  <label
                    onClick={() => onSetOrderMode('takeaway')}
                    className={`cursor-pointer relative flex flex-col items-center justify-center text-center p-3.5 rounded-lg transition-all ${
                      orderMode === 'takeaway'
                        ? 'bg-white text-[#241915] shadow-sm'
                        : 'bg-transparent text-[#534435] hover:bg-white/60'
                    }`}
                  >
                    <input
                      checked={orderMode === 'takeaway'}
                      onChange={() => onSetOrderMode('takeaway')}
                      className="sr-only"
                      name="order_mode"
                      type="radio"
                      value="takeaway"
                    />
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-xs ${
                      orderMode === 'takeaway' ? 'bg-[#e8911a] text-[#573200]' : 'bg-[#ffe9e2] text-[#534435]'
                    }`}>
                      <span className="material-symbols-outlined text-[22px]">shopping_basket</span>
                    </span>
                    <span className="font-label-md text-sm font-semibold text-[#241915]">À emporter</span>
                    <span className="font-label-sm text-xs text-[#534435] mt-0.5">Retrait à Ndogbong</span>
                    {orderMode === 'takeaway' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#895200]"></span>
                    )}
                  </label>

                  {/* Option 3: Sur place */}
                  <label
                    onClick={() => onSetOrderMode('dine_in')}
                    className={`cursor-pointer relative flex flex-col items-center justify-center text-center p-3.5 rounded-lg transition-all ${
                      orderMode === 'dine_in'
                        ? 'bg-white text-[#241915] shadow-sm'
                        : 'bg-transparent text-[#534435] hover:bg-white/60'
                    }`}
                  >
                    <input
                      checked={orderMode === 'dine_in'}
                      onChange={() => onSetOrderMode('dine_in')}
                      className="sr-only"
                      name="order_mode"
                      type="radio"
                      value="dine_in"
                    />
                    <span className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 shadow-xs ${
                      orderMode === 'dine_in' ? 'bg-[#e8911a] text-[#573200]' : 'bg-[#ffe9e2] text-[#534435]'
                    }`}>
                      <span className="material-symbols-outlined text-[22px]">restaurant</span>
                    </span>
                    <span className="font-label-md text-sm font-semibold text-[#241915]">Sur place</span>
                    <span className="font-label-sm text-xs text-[#534435] mt-0.5">À table en salle</span>
                    {orderMode === 'dine_in' && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#895200]"></span>
                    )}
                  </label>
                </div>
              </div>

              {/* SECTION B: Coordonnées & Livraison Form */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-[#ffe9e2]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ffe9e2]">
                  <span className="w-9 h-9 rounded-full bg-[#e8911a] text-[#573200] flex items-center justify-center font-bold text-sm">
                    1
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg text-[#241915] font-bold">
                      Vos coordonnées de livraison
                    </h2>
                    <p className="font-body-sm text-xs text-[#534435]">
                      Précisez vos repères pour une livraison sans encombre à Douala.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmitOrder} className="space-y-6">
                  {/* Nom & Téléphone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-label-md text-xs sm:text-sm text-[#241915] mb-2 font-medium">
                        Nom complet <span className="text-[#b52529]">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#867463] text-[20px]">
                          person
                        </span>
                        <input
                          required
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#fff1ec] text-[#241915] placeholder:text-[#867463] rounded-xl pl-11 pr-4 py-3 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] transition-all"
                          placeholder="Ex: Jean-Pierre Tchuente"
                          type="text"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-label-md text-xs sm:text-sm text-[#241915] mb-2 font-medium">
                        Téléphone de contact (WhatsApp / Appel) <span className="text-[#b52529]">*</span>
                      </label>
                      <div className="flex rounded-xl bg-[#fff1ec] overflow-hidden focus-within:ring-2 focus-within:ring-[#e8911a] border border-[#ffe9e2] transition-all">
                        <div className="flex items-center gap-1.5 px-3.5 bg-[#ffe9e2] text-[#241915] font-label-md text-xs select-none shrink-0">
                          <span className="w-4 h-3 bg-[#b52529] rounded-[1px] inline-block"></span>
                          <span className="font-bold">+237</span>
                        </div>
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          className="w-full bg-transparent text-[#241915] placeholder:text-[#867463] px-4 py-3 font-body-md text-sm focus:outline-none"
                          placeholder="6XX XX XX XX"
                          type="tel"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Quartier selection */}
                  {orderMode === 'delivery' && (
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-label-md text-xs sm:text-sm text-[#241915] font-medium">
                          Quartier de livraison à Douala <span className="text-[#b52529]">*</span>
                        </label>
                        <span className="font-label-sm text-xs text-[#895200] font-medium">
                          Frais calculés automatiquement
                        </span>
                      </div>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#867463] text-[20px]">
                          location_on
                        </span>
                        <select
                          value={selectedDistrictId}
                          onChange={(e) => setSelectedDistrictId(e.target.value)}
                          className="w-full bg-[#fff1ec] text-[#241915] rounded-xl pl-11 pr-10 py-3.5 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] appearance-none cursor-pointer"
                        >
                          {DISTRICT_LIST.map(d => (
                            <option key={d.id} value={d.id}>
                              {d.name} — {formatFCFA(d.fee)}
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-3.5 top-1/2 -translate-y-1/2 text-[#867463] pointer-events-none text-[20px]">
                          expand_more
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Adresse précise & Repère visuel */}
                  {orderMode === 'delivery' && (
                    <div>
                      <label className="block font-label-md text-xs sm:text-sm text-[#241915] mb-2 font-medium">
                        Adresse précise & Repère visuel bien connu <span className="text-[#b52529]">*</span>
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-[#867463] text-[20px]">
                          explore
                        </span>
                        <textarea
                          required
                          value={address}
                          onChange={(e) => setAddress(e.target.value)}
                          className="w-full bg-[#fff1ec] text-[#241915] placeholder:text-[#867463] rounded-xl pl-11 pr-4 py-3 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] transition-all"
                          placeholder="ex: Fin goudron Ndogbong, face pharmacie de l'Espoir, barrière noire"
                          rows={2}
                        />
                      </div>
                      <p className="font-label-sm text-xs text-[#534435] mt-1.5 flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px] text-[#895200]">info</span>
                        <span>Un repère précis évite les appels répétés du coursier durant le trajet.</span>
                      </p>
                    </div>
                  )}

                  {/* Delivery Timing */}
                  <div>
                    <label className="block font-label-md text-xs sm:text-sm text-[#241915] mb-2.5 font-medium">
                      Heure de préparation / livraison souhaitée
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <label
                        onClick={() => setTiming('asap')}
                        className={`cursor-pointer flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          timing === 'asap'
                            ? 'bg-[#ffe9e2] border-[#e8911a] text-[#573200]'
                            : 'bg-[#fff1ec] border-[#ffe9e2] text-[#241915]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[20px] text-[#895200]">schedule</span>
                          <div>
                            <p className="font-label-md text-xs sm:text-sm font-bold">Dès que possible</p>
                            <p className="font-label-sm text-xs text-[#534435]">Estimation : 25 – 35 min</p>
                          </div>
                        </div>
                        <input
                          checked={timing === 'asap'}
                          onChange={() => setTiming('asap')}
                          className="h-4 w-4 accent-[#e8911a]"
                          name="timing"
                          type="radio"
                          value="asap"
                        />
                      </label>

                      <label
                        onClick={() => setTiming('scheduled')}
                        className={`cursor-pointer flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                          timing === 'scheduled'
                            ? 'bg-[#ffe9e2] border-[#e8911a] text-[#573200]'
                            : 'bg-[#fff1ec] border-[#ffe9e2] text-[#241915]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span className="material-symbols-outlined text-[20px] text-[#867463]">calendar_today</span>
                          <div>
                            <p className="font-label-md text-xs sm:text-sm font-bold">Programmer une heure</p>
                            <p className="font-label-sm text-xs text-[#534435]">Plus tard dans la journée</p>
                          </div>
                        </div>
                        <input
                          checked={timing === 'scheduled'}
                          onChange={() => setTiming('scheduled')}
                          className="h-4 w-4 accent-[#e8911a]"
                          name="timing"
                          type="radio"
                          value="scheduled"
                        />
                      </label>
                    </div>

                    {timing === 'scheduled' && (
                      <div className="mt-3">
                        <input
                          type="time"
                          value={scheduledTime}
                          onChange={(e) => setScheduledTime(e.target.value)}
                          className="px-4 py-2 rounded-xl bg-[#fff1ec] border border-[#ffe9e2] text-sm text-[#241915] font-semibold"
                        />
                      </div>
                    )}
                  </div>

                  {/* Kitchen / Courier Instructions */}
                  <div>
                    <label className="block font-label-md text-xs sm:text-sm text-[#241915] mb-2 font-medium">
                      Note spéciale pour la cuisine ou le livreur (Optionnel)
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3.5 top-3.5 text-[#867463] text-[20px]">
                        edit_note
                      </span>
                      <textarea
                        value={kitchenNote}
                        onChange={(e) => setKitchenNote(e.target.value)}
                        className="w-full bg-[#fff1ec] text-[#241915] placeholder:text-[#867463] rounded-xl pl-11 pr-4 py-3 font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] transition-all"
                        placeholder="ex: Piment à part svp, sauce bien relevée, prévoir la monnaie sur 10 000 FCFA"
                        rows={2}
                      />
                    </div>
                  </div>
                </form>
              </div>

              {/* SECTION C: Mode de règlement */}
              <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-[#ffe9e2]">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-[#ffe9e2]">
                  <span className="w-9 h-9 rounded-full bg-[#e8911a] text-[#573200] flex items-center justify-center font-bold text-sm">
                    2
                  </span>
                  <div>
                    <h2 className="font-headline-sm text-lg text-[#241915] font-bold">
                      Mode de règlement sécurisé
                    </h2>
                    <p className="font-body-sm text-xs text-[#534435]">
                      Paiement sans contrainte par Mobile Money ou directement à la livraison.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  {/* Option 1: Cash/MoMo on delivery */}
                  <label
                    onClick={() => setPaymentMethod('cod')}
                    className={`group cursor-pointer block p-4 sm:p-5 rounded-2xl transition-all border ${
                      paymentMethod === 'cod'
                        ? 'bg-[#ffe9e2] border-[#e8911a] shadow-xs'
                        : 'bg-[#fff1ec] border-[#ffe9e2] hover:bg-[#fae3dc]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <span className="w-12 h-12 rounded-xl bg-white text-[#895200] flex items-center justify-center shrink-0 shadow-xs border border-[#ffe9e2]">
                          <span className="material-symbols-outlined text-[26px]">payments</span>
                        </span>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-sm sm:text-base text-[#241915] font-bold">
                              Paiement à la livraison / au retrait
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-[#e8911a]/20 text-[#573200] font-label-sm text-[10px] font-semibold">
                              Populaire
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-[#534435] mt-1">
                            Réglez en espèces au coursier ou transférez par MoMo directement à la réception de votre plat chaud.
                          </p>
                        </div>
                      </div>
                      <input
                        checked={paymentMethod === 'cod'}
                        onChange={() => setPaymentMethod('cod')}
                        className="accent-[#895200] h-5 w-5 mt-1 shrink-0 cursor-pointer"
                        name="payment_method"
                        type="radio"
                        value="cod"
                      />
                    </div>
                  </label>

                  {/* Option 2: MTN MoMo */}
                  <label
                    onClick={() => setPaymentMethod('momo')}
                    className={`group cursor-pointer block p-4 sm:p-5 rounded-2xl transition-all border ${
                      paymentMethod === 'momo'
                        ? 'bg-[#ffe9e2] border-[#e8911a] shadow-xs'
                        : 'bg-[#fff1ec] border-[#ffe9e2] hover:bg-[#fae3dc]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ffcc00] text-[#1f1410] flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          MoMo
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-sm sm:text-base text-[#241915] font-bold">
                              MTN Mobile Money Cameroun
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white text-[#534435] font-label-sm text-[10px]">
                              0 FCFA de frais
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-[#534435] mt-1">
                            Paiement instantané. Vous recevrez une demande d'autorisation directe sur votre téléphone (*126#).
                          </p>
                        </div>
                      </div>
                      <input
                        checked={paymentMethod === 'momo'}
                        onChange={() => setPaymentMethod('momo')}
                        className="accent-[#895200] h-5 w-5 mt-1 shrink-0 cursor-pointer"
                        name="payment_method"
                        type="radio"
                        value="momo"
                      />
                    </div>
                  </label>

                  {/* Option 3: Orange Money */}
                  <label
                    onClick={() => setPaymentMethod('om')}
                    className={`group cursor-pointer block p-4 sm:p-5 rounded-2xl transition-all border ${
                      paymentMethod === 'om'
                        ? 'bg-[#ffe9e2] border-[#e8911a] shadow-xs'
                        : 'bg-[#fff1ec] border-[#ffe9e2] hover:bg-[#fae3dc]'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-[#ff6600] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
                          OM
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-headline-sm text-sm sm:text-base text-[#241915] font-bold">
                              Orange Money Cameroun
                            </span>
                            <span className="px-2 py-0.5 rounded-full bg-white text-[#534435] font-label-sm text-[10px]">
                              USSD #150#
                            </span>
                          </div>
                          <p className="font-body-sm text-xs text-[#534435] mt-1">
                            Générez votre code de paiement sécurisé via le #150# pour valider la commande immédiatement.
                          </p>
                        </div>
                      </div>
                      <input
                        checked={paymentMethod === 'om'}
                        onChange={() => setPaymentMethod('om')}
                        className="accent-[#895200] h-5 w-5 mt-1 shrink-0 cursor-pointer"
                        name="payment_method"
                        type="radio"
                        value="om"
                      />
                    </div>
                  </label>
                </div>

                {/* Mandatory Confirmation checkbox */}
                <div className="mt-6 pt-5 border-t border-[#ffe9e2]">
                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <input
                      checked={isAgeConfirmed}
                      onChange={(e) => setIsAgeConfirmed(e.target.checked)}
                      className="accent-[#895200] h-4.5 w-4.5 rounded mt-0.5 cursor-pointer shrink-0"
                      type="checkbox"
                    />
                    <span className="font-body-sm text-xs sm:text-sm text-[#534435] leading-relaxed">
                      Je confirme avoir <span className="font-semibold text-[#241915]">18 ans ou plus</span> et j'accepte sans réserve les{' '}
                      <span className="text-[#895200] underline font-medium">conditions générales de vente</span> et de livraison de La Plazza Douala.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: STICKY ORDER SUMMARY (~35%) */}
            <div className="lg:col-span-4 sticky top-24 space-y-6">
              <div className="bg-white rounded-2xl shadow-md p-6 sm:p-7 relative overflow-hidden border border-[#ffe9e2]">
                {/* Header */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#ffe9e2]">
                  <div className="flex items-center gap-2.5">
                    <span className="material-symbols-outlined text-[#b52529] text-[22px]">receipt_long</span>
                    <h3 className="font-headline-sm text-base sm:text-lg text-[#241915] font-bold">
                      Détail de la commande
                    </h3>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-[#ffdad7] text-[#410004] font-label-sm text-xs font-bold">
                    {cartItems.reduce((acc, c) => acc + c.quantity, 0)} articles
                  </span>
                </div>

                {/* Items List */}
                <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-1">
                  {cartItems.map(cItem => (
                    <div key={cItem.id} className="flex items-center gap-3.5">
                      <img
                        className="w-14 h-14 rounded-xl object-cover shrink-0 bg-[#ffe9e2] border border-[#ffe9e2]"
                        alt={cItem.item.name}
                        src={cItem.item.image}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-label-md text-xs sm:text-sm text-[#241915] font-semibold truncate leading-snug">
                            {cItem.item.name}
                          </h4>
                          <span className="font-price-tag text-xs sm:text-sm text-[#b52529] font-bold shrink-0">
                            {formatFCFA(cItem.unitPrice * cItem.quantity)}
                          </span>
                        </div>
                        <p className="font-label-sm text-xs text-[#534435] mt-0.5">
                          Quantité : {cItem.quantity}
                          {cItem.selectedOption ? ` · ${cItem.selectedOption.label}` : ''}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Promo Code Input */}
                <div className="mb-4">
                  <div className="p-1.5 rounded-xl bg-[#fff1ec] flex items-center gap-2 border border-[#ffe9e2]">
                    <span className="material-symbols-outlined text-[#867463] ml-2 text-[20px]">local_offer</span>
                    <input
                      value={promoCodeInput}
                      onChange={(e) => setPromoCodeInput(e.target.value)}
                      className="w-full bg-transparent text-[#241915] placeholder:text-[#867463] font-label-sm text-xs uppercase tracking-wider focus:outline-none py-1"
                      placeholder="Code promo (ex: PLAZZA10)"
                      type="text"
                    />
                    <button
                      onClick={handleApplyPromo}
                      className="px-3.5 py-1.5 rounded-lg bg-[#fae3dc] text-[#241915] font-label-sm text-xs font-bold hover:bg-[#e8911a] hover:text-white transition-colors shrink-0 cursor-pointer"
                      type="button"
                    >
                      Appliquer
                    </button>
                  </div>
                  {promoMessage && (
                    <p className={`text-xs mt-1 px-1 ${appliedPromo ? 'text-green-700' : 'text-[#b52529]'}`}>
                      {promoMessage}
                    </p>
                  )}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2.5 pt-4 pb-5 border-t border-[#ffe9e2] text-[#534435] font-body-sm text-xs sm:text-sm">
                  <div className="flex items-center justify-between">
                    <span>Sous-total articles</span>
                    <span className="font-medium text-[#241915]">{formatFCFA(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span>{orderMode === 'delivery' ? `Livraison (${selectedDistrict.name.split(' ')[0]})` : 'Frais de retrait'}</span>
                      <span className="material-symbols-outlined text-[14px] text-[#867463]">near_me</span>
                    </span>
                    <span className="font-medium text-[#241915]">
                      {deliveryFee > 0 ? `+ ${formatFCFA(deliveryFee)}` : '0 FCFA'}
                    </span>
                  </div>
                  {discount > 0 && (
                    <div className="flex items-center justify-between text-[#b52529] font-bold">
                      <span>Remise promo ({appliedPromo})</span>
                      <span>- {formatFCFA(discount)}</span>
                    </div>
                  )}
                </div>

                {/* Total Net Payable */}
                <div className="p-4 rounded-xl bg-[#fff1ec] mb-6 border border-[#ffe9e2]">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="font-label-sm text-xs text-[#534435] uppercase tracking-wider block font-semibold">
                        Total net à payer
                      </span>
                      <span className="font-label-sm text-[11px] text-[#867463]">
                        TVA et emballages inclus
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="font-display-mobile text-2xl sm:text-3xl text-[#b52529] font-bold tracking-tight leading-none block">
                        {total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}
                      </span>
                      <span className="font-label-md text-xs text-[#b52529] font-bold">FCFA</span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-3">
                  <button
                    onClick={handleSubmitOrder}
                    className="w-full py-4 px-6 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-sm font-bold tracking-wide shadow-md shadow-[#e8911a]/30 hover:bg-[#895200] hover:text-white transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
                    type="button"
                  >
                    <span>Confirmer et commander</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-[#573200]/15 font-bold">
                      {formatFCFA(total)}
                    </span>
                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                  </button>

                  <a
                    className="w-full py-3 px-6 rounded-full bg-white text-[#b52529] border border-[#b52529]/30 shadow-sm hover:bg-[#fff1ec] transition-all active:scale-[0.98] flex items-center justify-center gap-2 font-label-md text-sm font-bold"
                    href={whatsappUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    <span className="material-symbols-outlined text-[20px] text-[#25D366]">chat</span>
                    <span>Commander via WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-[#fff1ec] rounded-2xl p-5 space-y-4 border border-[#ffe9e2]">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#895200]/10 text-[#895200] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">phone_in_talk</span>
                  </span>
                  <p className="font-body-sm text-xs text-[#534435] leading-snug">
                    <span className="font-semibold text-[#241915]">Appel de confirmation :</span> Vous serez immédiatement contacté par notre gérant pour valider la mise en cuisson.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#895200]/10 text-[#895200] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">skillet</span>
                  </span>
                  <p className="font-body-sm text-xs text-[#534435] leading-snug">
                    <span className="font-semibold text-[#241915]">Fraîcheur garantie :</span> Préparation minute avec nos volailles fraîches locales et épices camerounaises.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-[#895200]/10 text-[#895200] flex items-center justify-center shrink-0 mt-0.5">
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </span>
                  <p className="font-body-sm text-xs text-[#534435] leading-snug">
                    <span className="font-semibold text-[#241915]">Paiement 100% sécurisé :</span> Vous ne payez qu'après réception et contrôle de votre repas chaud.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
