import { MenuItem, DistrictDelivery } from '../types';

export const RESTAURANT_INFO = {
  name: 'La Plazza',
  tagline: 'Choisissez le meilleur goût',
  neighborhood: 'Ndogbong · Douala',
  fullAddress: 'Fin goudron, axe principal Ndogbong, Douala, Cameroun',
  landmark: 'À 2 minutes du carrefour fin goudron, face aux résidences calmes',
  phones: ['+237 678 18 49 30', '+237 656 92 74 70'],
  phonePrimary: '+237 678 18 49 30',
  whatsappDirect: 'https://wa.me/237678184930',
  googleMapsUrl: 'https://maps.google.com/?q=Ndogbong+Douala',
  rating: '4,7/5',
  reviewsCount: '280+ avis Google vérifiés',
  hours: {
    tueFri: '10 h 00 – 22 h 00',
    sat: '10 h 00 – 23 h 00',
    sun: '12 h 00 – 23 h 00',
    mon: 'Fermé'
  },
  logoUrl: '/assets/aistudio/capture_logo_1d74d6e4.PNG',
  heroImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW8O-sWnmBQby4RInFRg9UYTJKsJfmxjNojATr1FNqzZZAUM11dTOOOLf-zbB7eQZItQENAcgYBIuMyPSYUEkrDu1nDh0T531YVjjdiVrtlBb4ZXEbo2jeP4kjV2wimjDN5wCPXHSbDD-SCOLHaG21i8krBFNq3yL-6BYmOxfQ1kJUV96_c1AcQjGtZ0L1DYgio2y9EhHH92GlTz9yYY8SOW3ba1k9Y3eKUpmhgmPq',
  mapImageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCf6Hr5wAgZiHC9nr0AS4WkSnoJ1UgJjpVp1UTMNovrtxPbQI7slW3ymlS9qU2-WIBRa_aN-MAj7Ydm0k-yZAeUvUHxXpdcUywQNBf8gocOtFV0yAQjefaXgiZA0Hs3PDFkVEpgYcdEJeyrPq-uKp7KVFfOXkS4Fo7Sw8vDGwmuFQKkq9AbE48_vLx8vKwXeaaCEC_ZY8_KWoHrECFX19l5-PJCNdCY5yUT5JkEZgtM'
};

export const DISTRICT_LIST: DistrictDelivery[] = [
  { id: 'ndogbong', name: 'Ndogbong (fin goudron - Proximité immédiate)', fee: 1000 },
  { id: 'bepanda', name: 'Bépanda', fee: 1500 },
  { id: 'deido', name: 'Deido', fee: 1500 },
  { id: 'akwa', name: 'Akwa (Centre commercial)', fee: 2000 },
  { id: 'bonanjo', name: 'Bonanjo (Zone administrative)', fee: 2000 },
  { id: 'bonamoussadi', name: 'Bonamoussadi', fee: 2000 },
  { id: 'makepe', name: 'Kotto / Makepe', fee: 2500 },
  { id: 'logpom', name: 'Logpom', fee: 2000 },
  { id: 'yassa', name: 'Yassa / Nyalla', fee: 3000 }
];

export const MENU_ITEMS: MenuItem[] = [
  // POULET
  {
    id: 'poulet-pane-1',
    name: 'Poulet pané (1 pièce)',
    description: 'Morceau généreux mariné aux épices secrètes du terroir, panure dorée extra-croustillante et chair fondante.',
    price: 1500,
    category: 'poulet',
    tag: 'Signature',
    isPopular: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBi311ntqWTwVn0t0-XNCt4W1DJo6_UqIV8ijW6KiGS93m4Mwvhv4nb63Szw3uOdtsNQoXxT1vFivCFfu-q2lxKicUDN2O_gN-fV1sJVApSWcQ-QmrYAkxDydNBWZ7NPmVo3TFhVGoEnr5mEzttMXcvzdqQovJlSLMVqu0e3izaUWiCwdyJbt0uq7MSWtAZVgQ0nj9edR_TQIky4WW8PQoGGMyBFULza65fC4-rjUyt'
  },
  {
    id: 'poulet-pane-quart',
    name: '¼ Poulet pané',
    description: 'Cuisse ou blanc pané croustillant, servi avec notre sauce piquante maison et citron vert frais.',
    price: 3000,
    category: 'poulet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDdLisQZxzyxrCqiixNYxrfFg8Z5q76hTZUFVLU2hhrpAMGtvTrVPl1P_ZTNoFZo5YqIuF1DvFXDKut9OCmj_bYzr233TxbwthV3S1JLnECbMoWlHaHTZ811x7YxDz4teXtBFUOHWHaIkT4Gqffdfcvw6at6PZmuCAHipR1v-IbG5y9Xm8hEpsKbsR31G4Dt_zIzvcGUo0zJCaobEFe-iGXAAHOi8Ipa5CZLFiMZjLj'
  },
  {
    id: 'poulet-pane-demi',
    name: '½ Poulet pané',
    description: 'Deux beaux morceaux généreux dorés minute croustillants, marinés aux herbes locales.',
    price: 5500,
    category: 'poulet',
    tag: 'Populaire',
    isPopular: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCMHCxArozjj_0sZ29FTeO4smAaWBrs9Aow-8bUbBfs7z_vzg5Z1dYA0SLeOe1C9vwlIERTwtyT7somnfg2hoO3W4ZKW_M4EdvGmRv7VMWYxKZ49JzvRTOB7nNXDlZP07Ehy3JZz_e9ZKL7yUB19W5mtqt3hNpDPBiVzgvlA7C_HhD1QRAqhjCiLEkLAGytFUQXYOwyI13Y9Koqmamju93ZUzsvik1m_pCoWuS1l1Qh'
  },
  {
    id: 'poulet-pane-entier',
    name: 'Poulet pané entier',
    description: 'Le grand festin familial croustillant, découpé en 8 morceaux savoureux avec sauces assorties.',
    price: 10000,
    category: 'poulet',
    tag: 'Grand Format',
    isSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAA_aV5Cpm4MIh7IFtxN4e2-Eod04oDdfIys06NSzUtOykfP0ItEqjp6GDfnAHoPcOWsFEdEOh6_fsP833lh-zwt1IIHmmICyastR0L5nNh709i8x5T9FC4lWfxZt_jNVSoY8bC7-TNSV9ANI-uffptFK9rpI8qaDm6Z3z7jK3PQFQsYBk1RVlJMBy8SuDqlLufa2wVcSPxmrfSqaWjwnBq45GCsrU-s3S8pRJowDxB'
  },
  {
    id: 'poulet-frit-quart',
    name: '¼ Poulet frit',
    description: 'Frit à l’ancienne, peau dorée assaisonnée au poivre noir de Penja et ail doux.',
    price: 2500,
    category: 'poulet',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCiilHMuA8XCqLcPNjpT_tSOCRS1fUkWmBWn6CWx3C9Wf3SqZKi76yVEXnSfQsnWdx3K_NrOom_1GDv6SA2HSoA3d4fURcx11g1YxR29vj-0oV_G5Mrg2MwYzwQ3csVDrAyywTSfWt0hXDSFdqnXmyaTQO8iqHg4IzpPVYywSr4-i5tiKxiKvzEuIkLvZjuLaNhfQYLH4SwUCaV6nC1NPofytvqr4fRxZtIr0fTHR7S'
  },
  {
    id: 'poulet-frit-demi',
    name: '½ Poulet frit',
    description: 'Tendre et juteux à cœur, mariné 24h avec nos condiments secrets de grand-mère.',
    price: 5000,
    category: 'poulet',
    tag: 'Populaire',
    isPopular: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBvq6a4jANVrocVMF-ik7uHmYt5oFsAS1DT4TBWRIK4uu452wlEIooIs0TuVpfo5iDz4wUr5rS1H2-QJLI_VH8AX3h2yRX9zJTr1dXMYrLGehtx4bRGsM6VTPwdlY-MqqBU0h7BjMxq4qJu7AcByF7A-y7MLZW_NFdv5rzDCmccbJ4_C6thAB1R6zCR6KQknkyqFFnbMMQDmZ26ooOOdAoNvlAsCA9cav9fTV3t6Mvl'
  },
  {
    id: 'poulet-braise-entier',
    name: 'Poulet braisé entier',
    description: 'Braisé lentement sur braises vives de bois, enrobé de marinade verte aux aromates et piment de Ndogbong.',
    price: 10000,
    category: 'poulet',
    tag: 'Aux braises de bois',
    isSpecial: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuATVolxVchX84CYI00JLF2rUoJusfH_vXvhvD4_v8tn5Zp_RuqS-1JGD-CHtzUzKZeVATq_69jki1EtDwouxZ-y8xm6U5mJGqFH3E6vV33Bmf_ny46QfMXLNXpGI3YkQBXCrtKmJh5eQq3nUVzPELDOEapuVZxACP2aD1DIyb88XyY5jqZkQU8jCUO9eW-XAMrYitKJRrj10_NUebUbmLb5r0sT22HA3FisKZxBjYFi'
  },

  // ACCOMPAGNEMENTS
  {
    id: 'alloco',
    name: 'Alloco plantains mûrs',
    description: 'Plantains mûrs caramélisés dorés minute dans une huile propre, fondants et naturellement sucrés.',
    price: 500,
    category: 'accompagnements',
    tag: 'Incontournable',
    isPopular: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlHyQqX2PMH54CixJQrfngQcPv_Ko2ShThNVaSam5bWbRscYhdcFZVfg9UATOIw8LzYylOM_1wE5_7nPy8FVGppGPjj-dXVlI9G2j_-alciycxpdlUoLgsd8C4ZwpSW63pGvm7V4ZFAmcvYMkPTLjaXCzSQPRnpZeCQnuFxawWH2vaM2V9B0AmWkZ-fJi5dFYyel_J9RIuiW8oGpn3llic6q94uTXpe9v9HYwZqrAy'
  },
  {
    id: 'frites-pommes',
    name: 'Frites de pommes de terre',
    description: 'Pommes de terre fraîches sélectionnées, coupées main et frites croustillantes à souhait.',
    price: 500,
    category: 'accompagnements',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCdRpbrD-H1MP1dC3bRwJHyqvWyGULoEcsgBWi0PC3sn-54k2Etg6-7S_f5-JYOKVvEA8Z6hrqQGcMASA-LCJB3tpj_2qLFZo2uU0FZYEZmm4swA11RRdp88mg_AGYjukbatzyiNuHKV1-s-Zn2CjdC_2owKr8txdZDcwoqa9JZBdT9mgI2gPvUPjzZyjBEQQ0ilnHDpPMJwZ-LfGnstIJlMG7Q_t4NR8gvPGQ6Ke2c'
  },
  {
    id: 'miondo',
    name: 'Miondo traditionnels',
    description: 'Bâtons de manioc fermenté cuits à la vapeur dans leurs feuilles, texture souple et parfum authentique.',
    price: 500,
    category: 'accompagnements',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAalXZ_y5gQYPCNUS4FC2Jk4f4TQer5A2X61a-fPT4aCOxyHGnpwbMJ9mHDFKcRGKymD2VjlXRf-qQab5Xi1GhOOR7Rx7hJOGzAQCh52aaud-R5JXTzLa1ZR3b8r3mNHst189BSxTcwTv7mztaHTGNKse-oUl6JdCJDxOFjmP8GtiTrsTVVgMhVYuA5rwHUcbJwPKXOOOrIdZ1GfC7Kxwazhd0zMc97e0aPZBUmxVHm'
  },
  {
    id: 'riz-parfume',
    name: 'Riz parfumé au jasmin',
    description: 'Riz blanc étuvé parfumé aux herbes douces du jardin, léger et digeste.',
    price: 500,
    category: 'accompagnements',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAudXKe8YCSjDd6d8YLHBPs0eK328VYO7Y9Fa09grN45CqPB7KsMVbgHJE51mbgXbENpJYd8_Vn-0CH3jF7VePbOXNmEfDov3G8QU7BXwbEQ4Hg43TSO2thBUhQym5buTbPE8Arn_1w3qNg_wweQoXSQDLU1thUgNmJc8cPV7if0ZoVORGEeKrNCs_7V9hXFriGbXMcyR2D0d6PBpOkifC9acN965x9wUgLqgUNrEod'
  },

  // BOISSONS NATURELLES
  {
    id: 'eau-minerale',
    name: 'Eau minérale Supermont / Tangui (1,5 L)',
    description: 'Eau minérale naturelle pure embouteillée au Cameroun, bien fraîche.',
    price: 800,
    category: 'naturelles',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'jus-bissap',
    name: 'Jus d’oseille (Bissap mentholé)',
    description: 'Infusion fraîche de fleurs d’hibiscus parfumée à la menthe douce du jardin.',
    price: 500,
    category: 'naturelles',
    tag: 'Artisanal',
    options: [
      { label: 'Petit 33cl', price: 500 },
      { label: 'Grand 1L', price: 1000 }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'jus-baobab',
    name: 'Jus de baobab velouté (Bouye)',
    description: 'Boisson artisanale onctueuse, fraîche et délicatement acidulée, riche en énergie et vitamines.',
    price: 1000,
    category: 'naturelles',
    tag: 'Coup de cœur',
    isPopular: true,
    options: [
      { label: 'Bouteille 33cl', price: 1000 },
      { label: 'Carafe 1L', price: 2000 }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB_YQbvhgeTl3x_H84HPDYLRwuhHdVLoCGiFzGucgPT5GSatCsTEQoCZWAGPKPVOQGf6yPdZhdUnpQBNAQkprSu8PGxwONVqCt8AAM-zyga4n5XDW2lcQo4BUcomHolyAXDKBW7xHvRWKPA8DQgGFz9pvftZB508QQCXrynnXaNarKX_XGBHrT3b2YwI1hZ06y93JCCkHnLuuTI5rb_lw0KbUzz5GNz9OU5ut6I-Tnx'
  },
  {
    id: 'jus-ananas-gingembre',
    name: 'Jus d’ananas & gingembre pressé',
    description: 'Équilibre tonifiant fruité et vivifiant, pur jus pressé à froid sans additif.',
    price: 1000,
    category: 'naturelles',
    options: [
      { label: 'Verre 33cl', price: 1000 },
      { label: 'Carafe 1L', price: 2000 }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'menthe-au-lait',
    name: 'Menthe au lait onctueuse',
    description: 'Douceur lactée onctueuse mariée à la fraîcheur intense de la menthe camerounaise.',
    price: 1000,
    category: 'naturelles',
    options: [
      { label: 'Petit', price: 1000 },
      { label: 'Grand 1L', price: 2000 }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'chocolat-au-lait',
    name: 'Chocolat au lait parfumé',
    description: 'Recette gourmande cacao riche avec lait entier frais et vanille bourbon.',
    price: 1500,
    category: 'naturelles',
    options: [
      { label: 'Petit', price: 1500 },
      { label: 'Grand 1L', price: 4500 }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'cocktail-betterave',
    name: 'Cocktail revitalisant betterave & agrumes',
    description: 'Cure revitalisante avec jus de betterave douce, orange pressée et pulpe naturelle.',
    price: 1500,
    category: 'naturelles',
    options: [
      { label: 'Petit', price: 1500 },
      { label: 'Grand 1L', price: 3000 }
    ],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },

  // SODAS ET GAZEUSES
  {
    id: 'sodas-fruites',
    name: 'Grenadine, Ananas, Pamplemousse (33cl)',
    description: 'Sodas gazeux fruités servis très frais.',
    price: 800,
    category: 'gazeuses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'malta-special',
    name: 'Malta Vanille / Spécial Pamplemousse',
    description: 'Boissons maltées gourmandes et rafraîchissantes.',
    price: 1000,
    category: 'gazeuses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'classiques-frais',
    name: 'Djino, Coca-Cola, Vimto, Orangina',
    description: 'Les grands classiques gazeux givrés avec rondelle de citron.',
    price: 1000,
    category: 'gazeuses',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },

  // BIÈRES [18+]
  {
    id: 'bieres-cameroun',
    name: '33 Export, Castel, Booster Cidre, Origin, Kadji',
    description: 'Bières blondes populaires et cidres pétillants servis glacés.',
    price: 1000,
    category: 'bieres',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'bieres-prestige',
    name: 'Mutzig, Beaufort Light, Petite Guinness, Chill',
    description: 'Sélection maltée et bières brunes traditionnelles de caractère.',
    price: 1000,
    category: 'bieres',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'bieres-premium',
    name: 'Isenbeck, 1664, Heineken, Grande Guinness',
    description: 'Bières premium internationales et stouts généreux.',
    price: 1500,
    category: 'bieres',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },

  // VINS FINS [18+]
  {
    id: 'vin-blanc-eschnauer',
    name: 'L. Eschnauer Blanc / Chardonnay Blanc',
    description: 'Vins blancs fruités et équilibrés, idéals avec nos volailles.',
    price: 8000,
    category: 'vins',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'vin-rouge-eschnauer',
    name: 'L. Eschnauer Rouge (Millésime sélectionné)',
    description: 'Robe grenat intense, arômes de fruits mûrs et épices.',
    price: 10000,
    category: 'vins',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'vin-chateau-rousseaux',
    name: 'Cabernet Sauvignon, Château Rousseaux, Merlot, Moscato',
    description: 'Bouteilles d’exception pour vos grands moments à table.',
    price: 12000,
    category: 'vins',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },

  // WHISKIES [18+]
  {
    id: 'whisky-black-white',
    name: 'Black & White (Bouteille)',
    description: 'Scotch whisky équilibré aux notes d’orge maltée.',
    price: 10000,
    category: 'whiskies',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'whisky-red-label',
    name: 'J&B Rare, Red Label, Baileys Irish Cream',
    description: 'Whiskies de renommée ou liqueur crémeuse irlandaise.',
    price: 15000,
    category: 'whiskies',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'whisky-ballantines',
    name: 'Ballantine’s Finest (Bouteille)',
    description: 'Mélange subtil de plus de 40 malts et grains sélectionnés.',
    price: 20000,
    category: 'whiskies',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  },
  {
    id: 'whisky-jack-daniels',
    name: 'Jack Daniel’s Old No.7 (Bouteille)',
    description: 'Tennessee Whiskey filtré au charbon d’érable pour une douceur incomparable.',
    price: 25000,
    category: 'whiskies',
    isAlcohol: true,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBnCmqUJWLcb5j8qqBrauC61ugzWNsZME7pMrQhIoobQFGQU_Gy5e32ZQE8OXWdZyDEmqzGSLLkCrxl7e1eWYQoDShZjTmNiOnRYFZ6C9zi9UgToy9NQukrE9sYYSsQ3GRRf2lnjtyG25Sd54c3y8XqCNOWdSdcDDSbul1Jqg0wjpZUKZJDmBgN62AolbJtDfrPNSQUSiaHqGNZ775tLo7mzXUaYOOncnvyp4yNWVqc'
  }
];

export const INITIAL_CART_ITEMS = [
  {
    id: 'poulet-pane-demi',
    item: MENU_ITEMS.find(m => m.id === 'poulet-pane-demi')!,
    quantity: 1,
    unitPrice: 5500
  },
  {
    id: 'alloco',
    item: MENU_ITEMS.find(m => m.id === 'alloco')!,
    quantity: 2,
    unitPrice: 500
  },
  {
    id: 'jus-baobab-grand',
    item: MENU_ITEMS.find(m => m.id === 'jus-baobab')!,
    quantity: 2,
    selectedOption: { label: 'Grand 1L', price: 1000 },
    unitPrice: 1000
  }
];
