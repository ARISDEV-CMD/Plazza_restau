import React, { useState } from 'react';
import { NavigationTab } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface ContactScreenProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({ onNavigate }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#fae3dc] inline-block mb-2">
            Nous Trouver & Nous Joindre
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#241915] font-bold">
            Contact & Localisation
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#534435] mt-2">
            Une question, une commande spéciale ou besoin d’itinéraires ? Toute notre équipe à Ndogbong est à votre entière disposition.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Coordinates & Map */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ffe9e2] space-y-6">
              <div className="flex items-start gap-4">
                <span className="w-12 h-12 rounded-xl bg-[#fff1ec] text-[#895200] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">location_on</span>
                </span>
                <div>
                  <h3 className="font-headline-sm text-lg text-[#241915] font-bold">Adresse du restaurant</h3>
                  <p className="font-body-md text-sm text-[#534435] mt-1">{RESTAURANT_INFO.fullAddress}</p>
                  <p className="font-body-sm text-xs text-[#895200] font-semibold mt-1">
                    Repère : {RESTAURANT_INFO.landmark}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-[#ffe9e2] pt-6">
                <span className="w-12 h-12 rounded-xl bg-[#fff1ec] text-[#895200] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">phone</span>
                </span>
                <div>
                  <h3 className="font-headline-sm text-lg text-[#241915] font-bold">Lignes téléphoniques directes</h3>
                  <div className="flex flex-col gap-1 mt-1 text-sm text-[#534435]">
                    <a href={`tel:${RESTAURANT_INFO.phones[0]}`} className="hover:text-[#895200] font-semibold">
                      {RESTAURANT_INFO.phones[0]} (Commandes & WhatsApp)
                    </a>
                    <a href={`tel:${RESTAURANT_INFO.phones[1]}`} className="hover:text-[#895200] font-semibold">
                      {RESTAURANT_INFO.phones[1]} (Service & Réservations)
                    </a>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-[#ffe9e2] pt-6">
                <span className="w-12 h-12 rounded-xl bg-[#fff1ec] text-[#895200] flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[28px]">schedule</span>
                </span>
                <div>
                  <h3 className="font-headline-sm text-lg text-[#241915] font-bold">Horaires d'ouverture</h3>
                  <ul className="mt-1 text-xs text-[#534435] space-y-1">
                    <li><strong>Mardi – Vendredi :</strong> {RESTAURANT_INFO.hours.tueFri}</li>
                    <li><strong>Samedi :</strong> {RESTAURANT_INFO.hours.sat}</li>
                    <li><strong>Dimanche :</strong> {RESTAURANT_INFO.hours.sun}</li>
                    <li className="text-[#b52529]"><strong>Lundi :</strong> {RESTAURANT_INFO.hours.mon}</li>
                  </ul>
                </div>
              </div>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#fae3dc] text-[#241915] font-label-md text-xs font-bold hover:bg-[#f4ded7]"
                >
                  <span className="material-symbols-outlined text-[18px]">directions</span>
                  <span>Ouvrir dans Google Maps</span>
                </a>
                <a
                  href={RESTAURANT_INFO.whatsappDirect}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#25D366] text-white font-label-md text-xs font-bold shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px]">chat</span>
                  <span>Discuter sur WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Map visual */}
            <div className="rounded-2xl overflow-hidden shadow-sm border border-[#ffe9e2]">
              <img
                src={RESTAURANT_INFO.mapImageUrl}
                alt="Plan d'accès La Plazza Ndogbong"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Right Column: Contact form */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#ffe9e2]">
            <h3 className="font-headline-sm text-xl text-[#241915] font-bold mb-1">
              Envoyez-nous un message
            </h3>
            <p className="font-body-sm text-xs text-[#534435] mb-6">
              Remplissez ce formulaire et notre équipe vous recontacte dans les plus brefs délais.
            </p>

            {sent ? (
              <div className="p-6 rounded-xl bg-[#fff1ec] text-center border border-[#ffe9e2] space-y-3">
                <span className="material-symbols-outlined text-[36px] text-[#895200]">check_circle</span>
                <h4 className="font-headline-sm text-base font-bold text-[#241915]">Message envoyé avec succès !</h4>
                <p className="font-body-sm text-xs text-[#534435]">
                  Merci {name}. Nous avons bien reçu votre demande et nous vous répondrons rapidement.
                </p>
                <button
                  onClick={() => { setSent(false); setMessage(''); }}
                  className="px-4 py-2 rounded-full bg-[#fae3dc] text-xs font-bold"
                >
                  Envoyer un autre message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block font-label-md text-xs text-[#241915] mb-1 font-semibold">
                    Votre nom *
                  </label>
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Samuel Eto'o"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fff1ec] text-[#241915] text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2]"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block font-label-md text-xs text-[#241915] mb-1 font-semibold">
                    Votre e-mail ou téléphone *
                  </label>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="nom@exemple.cm ou 6XX XX XX XX"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fff1ec] text-[#241915] text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2]"
                    type="text"
                  />
                </div>

                <div>
                  <label className="block font-label-md text-xs text-[#241915] mb-1 font-semibold">
                    Votre message *
                  </label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Posez votre question ou détaillez votre demande..."
                    rows={4}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#fff1ec] text-[#241915] text-sm focus:outline-none focus:ring-2 focus:ring-[#e8911a] border border-[#ffe9e2] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-sm font-bold shadow-sm hover:bg-[#895200] hover:text-white transition-all cursor-pointer"
                >
                  Envoyer le message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
