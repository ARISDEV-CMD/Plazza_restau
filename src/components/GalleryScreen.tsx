import React, { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { NavigationTab } from '../types';
import { RESTAURANT_INFO } from '../data/menuData';

interface GalleryScreenProps {
  onNavigate: (tab: NavigationTab) => void;
}

export const GalleryScreen: React.FC<GalleryScreenProps> = ({ onNavigate }) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'plats' | 'ambiance' | 'cuisine'>('all');

  const galleryItems = [
    {
      id: 'g1',
      title: 'Poulet pané croustillant & Alloco',
      category: 'plats',
      image: RESTAURANT_INFO.heroImageUrl,
      desc: 'Morceaux de blanc et cuisse dorés, servis avec plantains caramélisés'
    },
    {
      id: 'g2',
      title: 'Mezzanine feutrée & climatisée',
      category: 'ambiance',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAe3AfS_8eWGvaiYTY3lC42HnteFDxnr3n8b0sUIg8RxM2k8u1OhMfHX1rGsC5p8AbkfmSFTerY44pM7-X5ze-If-GMJb9Xj-g7V9w8C0erj-8P9Basbs2_aq8KxC0uJoCwKILMvNcaxhM8A5Q8zFtAfnJM-Sy4fNsTfjLBu4SbHjzi2xrTwsEmMfr32sgLZrEvxNu2IYD6Gbr3f7NxFbfhcsVWyoMayktddAi-kjvc',
      desc: 'Cadre intime et calme pour déjeuners d’affaires et soirées feutrées'
    },
    {
      id: 'g3',
      title: 'Rez-de-chaussée vibrant',
      category: 'ambiance',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4B68zrn7nl2vY9Y9GTTQrL72gBD4398BWw3-vn_0MvbV8-3k__2FBQTJZybvzzUgCOI4elFrFWqH3N65-eorr3TbxhOiCM41agkeME86FK2pRU9IHYCKj7xHZm7wdp0WgcyeyNir_ok7V-aD2N-kHuS9X8NA9xYzoxywZHLelYhlX-sJK4p-lL5gzVYeP1PQhKGdllFI1oHKsXDZ76uzn0fTlI_X8Cl0MLwbvDevN',
      desc: 'Ambiance chaleureuse avec vue sur les préparations en salle'
    },
    {
      id: 'g4',
      title: 'Comptoir & Cuisine ouverte',
      category: 'cuisine',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfS1H4N08E3qVP-z_UUcjDb8TET4M0Kwv3HoxgNhd_ADXHMf6-IWHCmpAlPrxHl6PytRtcuCBix9tqDzoTwGae5fBCPVXWXs1-pKf5YLWEuyW9ahixHAjkYHwEz82fEg27CwHOBZ-fEzzoZ-wcysCEiCWzWG0TDKWwv6CcH4gyr0NH_hF2r1WQ5aZ8pGcdWXzbwn0yQW4KeyHYpsZ36e3EUyPB4wB8D71CY6Xte3zW',
      desc: 'Nos chefs préparent minute chaque commande avec rigueur et passion'
    },
    {
      id: 'g5',
      title: 'Poulet braisé entier au feu de bois',
      category: 'plats',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATVolxVchX84CYI00JLF2rUoJusfH_vXvhvD4_v8tn5Zp_RuqS-1JGD-CHtzUzKZeVATq_69jki1EtDwouxZ-y8xm6U5mJGqFH3E6vV33Bmf_ny46QfMXLNXpGI3YkQBXCrtKmJh5eQq3nUVzPELDOEapuVZxACP2aD1DIyb88XyY5jqZkQU8jCUO9eW-XAMrYitKJRrj10_NUebUbmLb5r0sT22HA3FisKZxBjYFi',
      desc: 'Marinade aux herbes aromatiques et piment écrasé traditionnel'
    },
    {
      id: 'g6',
      title: 'Jus de Baobab & Cocktails artisanaux',
      category: 'plats',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc',
      desc: 'Boissons fraîches pressées chaque jour sans aucun conservateur'
    }
  ];

  const filtered = activeFilter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeFilter);

  return (
    <div className="w-full pb-16 animate-in fade-in duration-300">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 pt-6 pb-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#fae3dc] inline-block mb-2">
            Visite Immersive
          </span>
          <h1 className="font-headline-lg text-3xl sm:text-4xl text-[#241915] font-bold">
            Galerie & Cadre de Vie
          </h1>
          <p className="font-body-md text-sm sm:text-base text-[#534435] mt-2">
            Découvrez en images la fraîcheur de nos assiettes et l'ambiance soignée de notre restaurant à Ndogbong.
          </p>

          {/* Filter pills */}
          <div className="flex items-center justify-center gap-2 mt-6 flex-wrap">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-4 py-1.5 rounded-full font-label-md text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                activeFilter === 'all' ? 'bg-[#e8911a] text-[#573200] shadow-sm' : 'bg-[#fff1ec] text-[#241915]'
              }`}
            >
              Tous les visuels
            </button>
            <button
              onClick={() => setActiveFilter('plats')}
              className={`px-4 py-1.5 rounded-full font-label-md text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                activeFilter === 'plats' ? 'bg-[#e8911a] text-[#573200] shadow-sm' : 'bg-[#fff1ec] text-[#241915]'
              }`}
            >
              Nos Plats & Boissons
            </button>
            <button
              onClick={() => setActiveFilter('ambiance')}
              className={`px-4 py-1.5 rounded-full font-label-md text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                activeFilter === 'ambiance' ? 'bg-[#e8911a] text-[#573200] shadow-sm' : 'bg-[#fff1ec] text-[#241915]'
              }`}
            >
              Ambiance & Salles
            </button>
            <button
              onClick={() => setActiveFilter('cuisine')}
              className={`px-4 py-1.5 rounded-full font-label-md text-xs font-bold transition-all duration-300 cursor-pointer active:scale-95 ${
                activeFilter === 'cuisine' ? 'bg-[#e8911a] text-[#573200] shadow-sm' : 'bg-[#fff1ec] text-[#241915]'
              }`}
            >
              Cuisine & Équipe
            </button>
          </div>
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              data-no-reveal
              layout
              initial={{ opacity: 0, y: 36, scale: 0.94 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '0px 0px -8% 0px' }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: 'spring', stiffness: 260, damping: 28, delay: (i % 3) * 0.07 }}
              whileHover={{ y: -6 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300 border border-[#ffe9e2] flex flex-col"
            >
              <div className="h-64 overflow-hidden relative bg-[#ffe9e2]">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-headline-sm text-base text-[#241915] font-bold">
                    {item.title}
                  </h3>
                  <p className="font-body-sm text-xs text-[#534435] mt-1">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-4 mt-3 border-t border-[#ffe9e2] flex items-center justify-between">
                  <span className="font-label-sm text-xs text-[#895200] font-bold uppercase tracking-wider">
                    Ndogbong · Douala
                  </span>
                  <button
                    onClick={() => onNavigate('menu')}
                    className="text-xs font-bold text-[#b52529] hover:underline flex items-center gap-1"
                  >
                    <span>Commander</span>
                    <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};
