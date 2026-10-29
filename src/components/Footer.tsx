import React from 'react';
import { NavigationTab } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface FooterProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="w-full bg-[#b52529] text-white py-12 lg:py-16">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/15">
          {/* Col 1: Identity */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img
                alt="La Plazza Logo Blanc"
                className="h-8 w-auto object-contain brightness-0 invert"
                src={RESTAURANT_INFO.logoUrl}
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-headline-sm text-xl text-white font-bold">La Plazza</span>
            </div>
            <p className="font-script-accent text-lg text-[#ffdad7]">
              {RESTAURANT_INFO.tagline}
            </p>
            <p className="font-body-sm text-sm text-white/80 flex items-start gap-1.5 pt-1">
              <span className="material-symbols-outlined text-[18px] shrink-0 text-[#ffdad7]">
                location_on
              </span>
              <span>{RESTAURANT_INFO.fullAddress}</span>
            </p>
          </div>

          {/* Col 2: Horaires */}
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-sm uppercase tracking-wider text-[#ffdad7] font-bold">
              Horaires d'ouverture
            </span>
            <ul className="font-body-sm text-sm space-y-1.5 text-white/80">
              <li className="flex justify-between">
                <span className="font-medium">Mar – Ven:</span>
                <span>{RESTAURANT_INFO.hours.tueFri}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Samedi:</span>
                <span>{RESTAURANT_INFO.hours.sat}</span>
              </li>
              <li className="flex justify-between">
                <span className="font-medium">Dimanche:</span>
                <span>{RESTAURANT_INFO.hours.sun}</span>
              </li>
              <li className="flex justify-between text-[#ffdad7]">
                <span className="font-medium">Lundi:</span>
                <span className="font-bold">{RESTAURANT_INFO.hours.mon}</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Contacts */}
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-sm uppercase tracking-wider text-[#ffdad7] font-bold">
              Contact & Commandes
            </span>
            <div className="font-body-sm text-sm space-y-2 text-white/80">
              <a
                className="flex items-center gap-2 hover:text-[#ffdad7] transition-colors"
                href={`tel:${RESTAURANT_INFO.phones[0]}`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#ffdad7]">
                  phone_iphone
                </span>
                <span>{RESTAURANT_INFO.phones[0]}</span>
              </a>
              <a
                className="flex items-center gap-2 hover:text-[#ffdad7] transition-colors"
                href={`tel:${RESTAURANT_INFO.phones[1]}`}
              >
                <span className="material-symbols-outlined text-[16px] text-[#ffdad7]">call</span>
                <span>{RESTAURANT_INFO.phones[1]}</span>
              </a>
              <a
                className="flex items-center gap-2 hover:text-[#ffdad7] transition-colors"
                href={RESTAURANT_INFO.whatsappDirect}
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px] text-[#ffdad7]">forum</span>
                <span>WhatsApp Direct (+237 678 18 49 30)</span>
              </a>
            </div>
          </div>

          {/* Col 4: Paiements */}
          <div className="flex flex-col gap-3">
            <span className="font-label-md text-sm uppercase tracking-wider text-[#ffdad7] font-bold">
              Paiements Acceptés
            </span>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="px-2.5 py-1 rounded-full bg-white/10 font-label-sm text-xs text-white font-medium">
                Espèces
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 font-label-sm text-xs text-[#ffdcbc] font-bold">
                MTN MoMo
              </span>
              <span className="px-2.5 py-1 rounded-full bg-white/10 font-label-sm text-xs text-[#ffdad7] font-bold">
                Orange Money
              </span>
            </div>
            <p className="font-body-sm text-white/70 text-xs pt-2 leading-relaxed">
              L'abus d'alcool est dangereux pour la santé. À consommer avec modération. Vente interdite aux mineurs.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-white/75 font-body-sm text-sm">
          <p>© 2025-2026 La Plazza Ndogbong. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('accueil')}
              className="hover:text-[#ffdad7] transition-colors text-xs"
            >
              Accueil
            </button>
            <button
              onClick={() => onNavigate('menu')}
              className="hover:text-[#ffdad7] transition-colors text-xs"
            >
              Carte
            </button>
            <button
              onClick={() => onNavigate('reserver')}
              className="hover:text-[#ffdad7] transition-colors text-xs"
            >
              Réservations
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-[#ffdad7] transition-colors text-xs"
            >
              Plan d'accès
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
