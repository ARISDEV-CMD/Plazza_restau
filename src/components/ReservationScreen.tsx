import React, { useState } from 'react';
import { ClocheReveal } from './motion/effects';
import { NavigationTab, ReservationData } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface ReservationScreenProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const ReservationScreen: React.FC<ReservationScreenProps> = ({ onNavigate }) => {
  // Tomorrow's date by default
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const defaultDateStr = tomorrow.toISOString().split('T')[0];

  const [date, setDate] = useState(defaultDateStr);
  const [time, setTime] = useState('19:30');
  const [guests, setGuests] = useState(2);
  const [space, setSpace] = useState<'rdc' | 'mezzanine' | 'terrasse'>('mezzanine');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequest, setSpecialRequest] = useState('');

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleGuestsDelta = (delta: number) => {
    setGuests(prev => Math.min(24, Math.max(1, prev + delta)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const data: ReservationData = {
      date,
      time,
      guests,
      space,
      fullName: fullName || 'Jean-Paul Eboa',
      phone: phone || '678 18 49 30',
      email,
      specialRequest
    };
    setConfirmedReservation(data);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const spaceNameLabel = 
    space === 'mezzanine' ? 'Mezzanine feutrée (Climatisée)' :
    space === 'rdc' ? 'Rez-de-chaussée animé' : 'Terrasse couverte';

  const reservationWhatsAppText = `*RÉSERVATION DE TABLE - LA PLAZZA NDOGBONG*
---------------------------------------
👤 *Nom :* ${fullName || 'Client'}
📞 *Téléphone :* +237 ${phone || '678 18 49 30'}
📅 *Date :* ${date} à ${time}
👥 *Nombre de personnes :* ${guests} convives
🏛️ *Espace souhaité :* ${spaceNameLabel}
${specialRequest ? `📝 *Demande spécifique :* ${specialRequest}\n` : ''}
Merci de me confirmer la disponibilité !`;

  const reservationWhatsAppUrl = `https://wa.me/237678184930?text=${encodeURIComponent(reservationWhatsAppText)}`;

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300">
      <div className="relative w-full max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Top Breadcrumb & Status Pill */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <button
            onClick={() => onNavigate('accueil')}
            className="inline-flex items-center gap-1.5 font-label-md text-sm text-[#534435] hover:text-[#895200] transition-colors group cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px] group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            <span>Retour à l'accueil</span>
          </button>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#fae3dc] shadow-sm border border-[#ffe9e2]">
            <span className="w-2 h-2 rounded-full bg-[#e8911a] animate-pulse"></span>
            <span className="font-label-sm text-xs text-[#241915] font-semibold">
              Réservation instantanée & sans frais d'avance
            </span>
          </div>
        </div>

        {/* Editorial Header Block */}
        <div className="mb-10 max-w-3xl">
          <div className="inline-block mb-1">
            <span className="font-script-accent text-lg text-[#b52529] tracking-wide">
              un moment chaleureux
            </span>
            <div className="h-1 w-24 bg-[#b52529] rounded-full -mt-1 opacity-70"></div>
          </div>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#241915] tracking-tight mt-1 mb-2 font-bold">
            Réserver votre table
          </h1>
          <p className="font-body-lg text-sm sm:text-base text-[#534435] leading-relaxed">
            Que ce soit pour un déjeuner d'affaires au calme, un dîner convivial en famille ou un tête-à-tête gourmand à Ndogbong.
          </p>
        </div>

        {/* Main Grid: Left (Form 60%) / Right (Ambiance & Details 40%) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT COLUMN: INTERACTIVE FORM */}
          <section className="lg:col-span-7 flex flex-col gap-6">
            {isSubmitted && confirmedReservation ? (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#ffe9e2] flex flex-col items-center text-center gap-5 confirm-pop">
                <ClocheReveal size={132}>
                  <span className="material-symbols-outlined text-[34px]">check_circle</span>
                </ClocheReveal>
                <div>
                  <h3 className="font-headline-sm text-2xl font-bold text-[#241915]">
                    Demande enregistrée avec succès !
                  </h3>
                  <p className="font-body-md text-sm text-[#534435] mt-1 max-w-md mx-auto">
                    Merci {confirmedReservation.fullName}. Notre équipe à Ndogbong prépare votre table pour le{' '}
                    <strong>{confirmedReservation.date}</strong> à <strong>{confirmedReservation.time}</strong> ({confirmedReservation.guests} convives).
                  </p>
                </div>

                <div className="w-full bg-[#fff1ec] p-4 rounded-xl text-left border border-[#ffe9e2] text-xs space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#534435]">Espace réservé :</span>
                    <span className="font-bold text-[#241915]">{spaceNameLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#534435]">Téléphone / WhatsApp :</span>
                    <span className="font-bold text-[#241915]">+237 {confirmedReservation.phone}</span>
                  </div>
                  {confirmedReservation.specialRequest && (
                    <div className="flex justify-between">
                      <span className="text-[#534435]">Demande spécifique :</span>
                      <span className="font-bold text-[#241915]">{confirmedReservation.specialRequest}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full">
                  <a
                    href={reservationWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3 px-5 rounded-full bg-[#25D366] text-white font-label-md text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Confirmer via WhatsApp</span>
                  </a>
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setConfirmedReservation(null);
                    }}
                    className="w-full sm:w-auto py-3 px-5 rounded-full bg-[#fae3dc] text-[#241915] font-label-md text-xs sm:text-sm font-bold hover:bg-[#f4ded7]"
                  >
                    Nouvelle réservation
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ffe9e2] flex flex-col gap-8"
              >
                {/* ÉTAPE 1 : Date & Heure */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-xs flex items-center justify-center font-bold">
                        1
                      </span>
                      <h2 className="font-headline-sm text-lg text-[#241915] font-bold">
                        Date & Heure souhaitées
                      </h2>
                    </div>
                    <span className="font-label-sm text-xs text-[#895200] font-medium flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px]">schedule</span> Service continu
                    </span>
                  </div>

                  {/* Warning notice */}
                  <div className="flex items-center gap-2.5 p-3 rounded-lg bg-[#fff1ec] text-[#534435] border border-[#ffe9e2]">
                    <span className="material-symbols-outlined text-[20px] text-[#b52529] shrink-0">
                      event_busy
                    </span>
                    <p className="font-label-sm text-xs">
                      <strong className="text-[#241915]">Attention :</strong> La Plazza est fermée le lundi. Réservations ouvertes du mardi au dimanche.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-xs font-semibold text-[#241915] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-[#895200]">calendar_today</span>
                        Date du repas
                      </label>
                      <input
                        required
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#fff1ec] text-[#241915] font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] transition-all"
                        type="date"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-xs font-semibold text-[#241915] flex items-center gap-1.5">
                        <span className="material-symbols-outlined text-[18px] text-[#895200]">alarm</span>
                        Créneau horaire
                      </label>
                      <select
                        required
                        value={time}
                        onChange={(e) => setTime(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#fff1ec] text-[#241915] font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] transition-all"
                      >
                        <optgroup label="Déjeuner (Midi)">
                          <option value="12:00">12 h 00</option>
                          <option value="12:30">12 h 30</option>
                          <option value="13:00">13 h 00</option>
                          <option value="13:30">13 h 30</option>
                          <option value="14:00">14 h 00</option>
                        </optgroup>
                        <optgroup label="Dîner (Soirée)">
                          <option value="19:00">19 h 00</option>
                          <option value="19:30">19 h 30</option>
                          <option value="20:00">20 h 00</option>
                          <option value="20:30">20 h 30</option>
                          <option value="21:00">21 h 00</option>
                          <option value="21:30">21 h 30</option>
                        </optgroup>
                      </select>
                    </div>
                  </div>

                  {/* Quick Slots */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="font-label-sm text-xs text-[#534435]">Créneaux fréquents :</span>
                    {['12:30', '13:00', '19:30', '20:30'].map(slot => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setTime(slot)}
                        className={`px-2.5 py-1 rounded-full font-label-sm text-xs transition-colors cursor-pointer ${
                          time === slot
                            ? 'bg-[#e8911a] text-[#573200] font-bold'
                            : 'bg-[#fff1ec] text-[#241915] hover:bg-[#fae3dc]'
                        }`}
                      >
                        {slot.replace(':', 'h')}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full bg-[#ffe9e2]"></div>

                {/* ÉTAPE 2 : Nombre de convives */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-xs flex items-center justify-center font-bold">
                      2
                    </span>
                    <h2 className="font-headline-sm text-lg text-[#241915] font-bold">
                      Nombre de convives
                    </h2>
                  </div>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-xl bg-[#fff1ec] border border-[#ffe9e2]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#895200] shadow-sm">
                        <span className="material-symbols-outlined text-[24px]">group</span>
                      </div>
                      <div>
                        <p className="font-label-md text-sm text-[#241915] font-bold">Taille de la tablée</p>
                        <p className="font-label-sm text-xs text-[#534435]">Adultes & enfants inclus</p>
                      </div>
                    </div>

                    {/* Stepper Widget */}
                    <div className="flex items-center justify-center gap-3 bg-white px-4 py-2 rounded-full shadow-sm border border-[#ffe9e2]">
                      <button
                        type="button"
                        onClick={() => handleGuestsDelta(-1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#241915] hover:bg-[#fae3dc] transition-colors active:scale-95"
                        aria-label="Diminuer"
                      >
                        <span className="material-symbols-outlined text-[20px]">remove</span>
                      </button>
                      <span className="font-price-tag text-base font-bold text-[#241915] w-8 text-center select-none">
                        {guests}
                      </span>
                      <button
                        type="button"
                        onClick={() => handleGuestsDelta(1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-[#241915] hover:bg-[#fae3dc] transition-colors active:scale-95"
                        aria-label="Augmenter"
                      >
                        <span className="material-symbols-outlined text-[20px]">add</span>
                      </button>
                    </div>
                  </div>

                  {/* Quick Chips */}
                  <div className="flex flex-wrap items-center gap-2">
                    {[2, 4, 6, 8].map(count => (
                      <button
                        key={count}
                        type="button"
                        onClick={() => setGuests(count)}
                        className={`px-3.5 py-1.5 rounded-full font-label-md text-xs font-semibold transition-all cursor-pointer ${
                          guests === count
                            ? 'bg-[#e8911a] text-[#573200] shadow-sm'
                            : 'bg-[#fff1ec] text-[#241915] hover:bg-[#fae3dc]'
                        }`}
                      >
                        {count === 8 ? 'Groupe 8+' : `${count} personnes`}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="h-px w-full bg-[#ffe9e2]"></div>

                {/* ÉTAPE 3 : Choix de l'espace */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-xs flex items-center justify-center font-bold">
                      3
                    </span>
                    <h2 className="font-headline-sm text-lg text-[#241915] font-bold">
                      Choix de l'espace
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Option 1: RDC */}
                    <button
                      type="button"
                      onClick={() => setSpace('rdc')}
                      className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 group cursor-pointer ${
                        space === 'rdc'
                          ? 'bg-[#fae3dc] border-[#e8911a] shadow-sm'
                          : 'bg-[#fff1ec] border-[#ffe9e2] hover:bg-[#fae3dc]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#895200]">
                          <span className="material-symbols-outlined text-[18px]">storefront</span>
                        </div>
                        {space === 'rdc' && (
                          <span className="material-symbols-outlined text-[18px] text-[#895200]">check_circle</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-sm text-[#241915] font-bold">RDC animé</h3>
                        <p className="font-label-sm text-xs text-[#534435] mt-1">
                          Convivial, vue sur comptoir & vitrine grillades.
                        </p>
                      </div>
                    </button>

                    {/* Option 2: Mezzanine (Selected by default) */}
                    <button
                      type="button"
                      onClick={() => setSpace('mezzanine')}
                      className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 group cursor-pointer ${
                        space === 'mezzanine'
                          ? 'bg-[#fae3dc] border-[#b52529] shadow-sm'
                          : 'bg-[#fff1ec] border-[#ffe9e2] hover:bg-[#fae3dc]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#b52529]">
                          <span className="material-symbols-outlined text-[18px]">ac_unit</span>
                        </div>
                        {space === 'mezzanine' && (
                          <span className="material-symbols-outlined text-[18px] text-[#b52529]">check_circle</span>
                        )}
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1 text-[#b52529] font-label-sm text-[10px] uppercase font-bold tracking-wider">
                          Favori
                        </div>
                        <h3 className="font-headline-sm text-sm text-[#241915] font-bold">Mezzanine feutrée</h3>
                        <p className="font-label-sm text-xs text-[#534435] mt-1">
                          Climatisée, cadre intime, calme pour affaires ou tête-à-tête.
                        </p>
                      </div>
                    </button>

                    {/* Option 3: Terrasse */}
                    <button
                      type="button"
                      onClick={() => setSpace('terrasse')}
                      className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between gap-3 group cursor-pointer ${
                        space === 'terrasse'
                          ? 'bg-[#fae3dc] border-[#e8911a] shadow-sm'
                          : 'bg-[#fff1ec] border-[#ffe9e2] hover:bg-[#fae3dc]/50'
                      }`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#735a32]">
                          <span className="material-symbols-outlined text-[18px]">deck</span>
                        </div>
                        {space === 'terrasse' && (
                          <span className="material-symbols-outlined text-[18px] text-[#895200]">check_circle</span>
                        )}
                      </div>
                      <div>
                        <h3 className="font-headline-sm text-sm text-[#241915] font-bold">Terrasse couverte</h3>
                        <p className="font-label-sm text-xs text-[#534435] mt-1">
                          Douce brise, ambiance plein air abritée des averses.
                        </p>
                      </div>
                    </button>
                  </div>
                </div>

                <div className="h-px w-full bg-[#ffe9e2]"></div>

                {/* ÉTAPE 4 : Coordonnées de contact */}
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-xs flex items-center justify-center font-bold">
                      4
                    </span>
                    <h2 className="font-headline-sm text-lg text-[#241915] font-bold">
                      Vos coordonnées
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-xs font-semibold text-[#241915]">
                        Nom & prénom complets *
                      </label>
                      <input
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Ex : Jean-Paul Eboa"
                        className="w-full px-4 py-3 rounded-xl bg-[#fff1ec] text-[#241915] font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2]"
                        type="text"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="font-label-md text-xs font-semibold text-[#241915] flex items-center justify-between">
                        <span>Téléphone / WhatsApp *</span>
                        <span className="font-label-sm text-xs text-[#534435]">Douala (+237)</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="absolute left-3.5 font-label-md text-xs text-[#534435] font-bold select-none">
                          +237
                        </span>
                        <input
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="678 18 49 30"
                          className="w-full pl-16 pr-4 py-3 rounded-xl bg-[#fff1ec] text-[#241915] font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2]"
                          type="tel"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs font-semibold text-[#241915] flex items-center justify-between">
                      <span>Adresse e-mail</span>
                      <span className="font-label-sm text-xs text-[#534435]">Facultatif</span>
                    </label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nom@exemple.cm"
                      className="w-full px-4 py-3 rounded-xl bg-[#fff1ec] text-[#241915] font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2]"
                      type="email"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="font-label-md text-xs font-semibold text-[#241915]">
                      Occasion ou demande spécifique
                    </label>
                    <textarea
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="Ex : Anniversaire surprise, placement table calme, chaise haute bébé, commande de gâteau..."
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl bg-[#fff1ec] text-[#241915] font-body-md text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] resize-none"
                    />
                  </div>
                </div>

                {/* Actions & Reassurance */}
                <div className="flex flex-col gap-4 pt-2">
                  <button
                    className="w-full py-4 px-8 rounded-full bg-[#e8911a] text-[#573200] font-headline-sm text-sm sm:text-base font-bold shadow-[0_4px_16px_rgba(232,145,26,0.30)] hover:bg-[#895200] hover:text-white active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
                    type="submit"
                  >
                    <span>Envoyer ma demande de réservation</span>
                    <span className="material-symbols-outlined text-[22px]">arrow_forward</span>
                  </button>

                  <div className="flex flex-col items-center gap-3 text-center">
                    <p className="font-body-sm text-xs text-[#534435] flex items-center justify-center gap-1.5">
                      <span className="material-symbols-outlined text-[18px] text-[#895200]">verified</span>
                      <span>Confirmation rapide sous 15 minutes par WhatsApp ou appel direct. Aucune avance bancaire requise.</span>
                    </p>

                    <a
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-full bg-[#fff1ec] hover:bg-[#fae3dc] text-[#241915] font-label-md text-xs sm:text-sm font-bold transition-all border border-[#ffe9e2]"
                      href={RESTAURANT_INFO.whatsappDirect}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                        <span className="material-symbols-outlined text-[14px]">chat</span>
                      </span>
                      <span>Réserver directement par WhatsApp ({RESTAURANT_INFO.phonePrimary})</span>
                    </a>
                  </div>
                </div>
              </form>
            )}
          </section>

          {/* RIGHT COLUMN : AMBIANCE, HORAIRES & GROUPES */}
          <aside className="lg:col-span-5 flex flex-col gap-6">
            {/* CARTE 1 : Visuels immersifs des espaces */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-[#ffe9e2] flex flex-col">
              <div className="relative w-full h-56 overflow-hidden">
                <img
                  className="w-full h-full object-cover"
                  alt="Intérieur raffiné restaurant La Plazza Douala"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAe3AfS_8eWGvaiYTY3lC42HnteFDxnr3n8b0sUIg8RxM2k8u1OhMfHX1rGsC5p8AbkfmSFTerY44pM7-X5ze-If-GMJb9Xj-g7V9w8C0erj-8P9Basbs2_aq8KxC0uJoCwKILMvNcaxhM8A5Q8zFtAfnJM-Sy4fNsTfjLBu4SbHjzi2xrTwsEmMfr32sgLZrEvxNu2IYD6Gbr3f7NxFbfhcsVWyoMayktddAi-kjvc"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#241915]/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <span className="font-headline-sm text-base font-bold">Espaces & Cadre de vie</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#e8911a] text-[#573200] font-label-sm text-xs font-bold">
                    Ndogbong
                  </span>
                </div>
              </div>

              <div className="p-5 flex flex-col gap-4">
                <p className="font-body-sm text-xs text-[#534435] leading-relaxed">
                  Pensé pour vos retrouvailles au cœur de Ndogbong. Profitez d'un confort moderne sans compromis sur l'hospitalité camerounaise.
                </p>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#fff1ec] border border-[#ffe9e2]">
                    <span className="material-symbols-outlined text-[20px] text-[#b52529] shrink-0">mode_fan</span>
                    <span className="font-label-md text-xs text-[#241915] font-medium">Climatisation continue & tempérée</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#fff1ec] border border-[#ffe9e2]">
                    <span className="material-symbols-outlined text-[20px] text-[#895200] shrink-0">wifi</span>
                    <span className="font-label-md text-xs text-[#241915] font-medium">Wi-Fi haut débit gratuit pour convives</span>
                  </div>
                  <div className="flex items-center gap-3 p-2 rounded-lg bg-[#fff1ec] border border-[#ffe9e2]">
                    <span className="material-symbols-outlined text-[20px] text-[#735a32] shrink-0">local_parking</span>
                    <span className="font-label-md text-xs text-[#241915] font-medium">Parking sécurisé avec vigile (Fin goudron)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARTE 2 : Tableau des horaires */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-[#ffe9e2] flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[22px] text-[#895200]">calendar_month</span>
                  <h2 className="font-headline-sm text-base text-[#241915] font-bold">Horaires d'ouverture</h2>
                </div>
                <span className="font-label-sm text-[11px] text-[#534435] font-medium">Heure locale Douala</span>
              </div>

              <div className="flex flex-col divide-y divide-[#ffe9e2] font-body-sm text-xs">
                <div className="py-2.5 flex items-center justify-between text-[#241915]">
                  <span className="font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#b52529]"></span>
                    <span>Lundi</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-[#ffdad7] text-[#410004] font-label-sm text-[10px] font-bold">
                    Fermé
                  </span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-[#241915]">
                  <span className="font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#895200]"></span>
                    <span>Mardi – Vendredi</span>
                  </span>
                  <span className="font-semibold text-[#241915]">{RESTAURANT_INFO.hours.tueFri}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-[#241915]">
                  <span className="font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#e8911a]"></span>
                    <span>Samedi</span>
                  </span>
                  <span className="font-semibold text-[#241915]">{RESTAURANT_INFO.hours.sat}</span>
                </div>
                <div className="py-2.5 flex items-center justify-between text-[#241915]">
                  <span className="font-medium flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#e8911a]"></span>
                    <span>Dimanche</span>
                  </span>
                  <span className="font-semibold text-[#241915]">{RESTAURANT_INFO.hours.sun}</span>
                </div>
              </div>
            </div>

            {/* CARTE 3 : Groupes & Événements Privés */}
            <div className="relative overflow-hidden bg-[#b52529] text-white rounded-2xl p-5 sm:p-6 shadow-md flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[24px] text-[#ffdad7]">celebration</span>
                <h2 className="font-headline-sm text-base text-white font-bold">
                  Événements & Groupes (&gt; 10 pers)
                </h2>
              </div>
              <p className="font-body-sm text-xs text-white/90 leading-relaxed">
                Anniversaires surprises, soutenances, réunions corporate ou célébrations familiales. Nous concevons pour vous des formules personnalisées autour de nos poulets braisés entiers et jus locaux.
              </p>

              <div className="p-3 rounded-lg bg-white/10 flex flex-col gap-1.5 text-xs">
                <div className="flex items-center justify-between text-[#ffdad7] font-label-md font-bold">
                  <span>Ligne directe événements</span>
                  <span>Douala</span>
                </div>
                <div className="flex flex-col gap-1 font-body-sm text-white">
                  <a className="hover:text-[#ffdad7] transition-colors flex items-center gap-2" href={`tel:${RESTAURANT_INFO.phones[0]}`}>
                    <span className="material-symbols-outlined text-[16px]">phone</span>
                    <span>{RESTAURANT_INFO.phones[0]}</span>
                  </a>
                  <a className="hover:text-[#ffdad7] transition-colors flex items-center gap-2" href={`tel:${RESTAURANT_INFO.phones[1]}`}>
                    <span className="material-symbols-outlined text-[16px]">phone</span>
                    <span>{RESTAURANT_INFO.phones[1]}</span>
                  </a>
                </div>
              </div>

              <a
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#ffdad7] text-[#410004] font-label-md text-xs font-bold hover:bg-white transition-all shadow-sm"
                href={`https://wa.me/237678184930?text=${encodeURIComponent('Bonjour, je souhaite organiser un événement de groupe à La Plazza Ndogbong.')}`}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span>Devis & Menu spécial groupe</span>
                <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
              </a>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};
