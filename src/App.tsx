import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import { NavigationTab, MenuItem, CartItem, OrderMode } from './types';
import { INITIAL_CART_ITEMS, RESTAURANT_INFO } from './data/menuData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeScreen } from './components/HomeScreen';
import { MenuScreen } from './components/MenuScreen';
import { CheckoutScreen } from './components/CheckoutScreen';
import { ReservationScreen } from './components/ReservationScreen';
import { GalleryScreen } from './components/GalleryScreen';
import { ContactScreen } from './components/ContactScreen';
import { CartDrawer } from './components/CartDrawer';
import { calculateItemCount } from './utils/orderCalculator';
import { ScrollProgress, Splash } from './components/motion/effects';
import { useScrollReveal } from './hooks/useScrollReveal';
import { flyToCart, trackClickOrigin } from './utils/flyToCart';

export default function App() {
  // Query param checking (?tab=... or ?autostart=1)
  const [currentTab, setCurrentTab] = useState<NavigationTab>(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab') as NavigationTab;
    if (tabParam && ['accueil', 'menu', 'commander', 'reserver', 'galerie', 'contact'].includes(tabParam)) {
      return tabParam;
    }
    if (params.get('autostart') === '1') {
      return 'menu';
    }
    return 'accueil';
  });

  // State: Cart items (preloaded with authentic default items from Screen 2 & 3)
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART_ITEMS);
  const [orderMode, setOrderMode] = useState<OrderMode>('delivery');
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Animations globales : apparition au scroll + origine du clic « Ajouter »
  useScrollReveal();
  useEffect(() => trackClickOrigin(), []);

  // Sync tab with URL hash or state
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as NavigationTab;
      if (['accueil', 'menu', 'commander', 'reserver', 'galerie', 'contact'].includes(hash)) {
        setCurrentTab(hash);
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (tab: NavigationTab) => {
    setCurrentTab(tab);
    window.location.hash = tab;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toastTimer = useRef<number | undefined>(undefined);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleAddToCart = (item: MenuItem, quantity: number = 1, option?: any) => {
    const cartItemId = option ? `${item.id}-${option.label}` : item.id;
    const unitPrice = option ? option.price : item.price;

    setCartItems(prev => {
      const existingIndex = prev.findIndex(ci => ci.id === cartItemId);
      if (existingIndex > -1) {
        const copy = [...prev];
        copy[existingIndex] = {
          ...copy[existingIndex],
          quantity: copy[existingIndex].quantity + quantity
        };
        return copy;
      }
      return [
        ...prev,
        {
          id: cartItemId,
          item,
          quantity,
          selectedOption: option,
          unitPrice
        }
      ];
    });

    flyToCart(item.image);
    showToast(`✓ "${item.name}" ajouté au panier !`);
  };

  const handleUpdateCartItemQuantity = (cartItemId: string, delta: number) => {
    setCartItems(prev => {
      return prev
        .map(ci => {
          if (ci.id === cartItemId) {
            const newQty = ci.quantity + delta;
            return newQty > 0 ? { ...ci, quantity: newQty } : null;
          }
          return ci;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = calculateItemCount(cartItems);

  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen bg-[#fff8f6] font-['Inter',sans-serif] text-[#241915] flex flex-col selection:bg-[#e8911a] selection:text-[#573200]">
      <Splash />
      <ScrollProgress />

      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            key={toastMessage}
            role="status"
            className="fixed top-24 right-4 sm:right-8 z-50 bg-[#895200] text-white pl-5 pr-6 py-3 rounded-xl shadow-xl flex items-center gap-2.5 overflow-hidden"
            initial={{ opacity: 0, x: 60, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 40, scale: 0.95, transition: { duration: 0.22 } }}
            transition={{ type: 'spring', stiffness: 420, damping: 28 }}
          >
            <motion.span
              className="material-symbols-outlined text-[20px] text-[#ffb86a]"
              initial={{ scale: 0, rotate: -90 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.1, type: 'spring', stiffness: 400, damping: 14 }}
            >
              check_circle
            </motion.span>
            <span className="font-label-md text-xs sm:text-sm font-semibold">{toastMessage}</span>
            <motion.span
              aria-hidden="true"
              className="absolute left-0 bottom-0 h-[3px] w-full origin-left bg-[#ffb86a]"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: 2.5, ease: 'linear' }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navigation Header */}
      <Navbar
        currentTab={currentTab}
        onNavigate={handleNavigate}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartDrawerOpen(true)}
      />

      {/* Main Content Area */}
      <main className="w-full pt-20 bg-[#fff8f6] min-h-[calc(100vh-80px)] flex-grow">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentTab}
            className="plazza-page-transition w-full"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
          >
            {currentTab === 'accueil' && (
              <HomeScreen onNavigate={handleNavigate} onAddToCart={handleAddToCart} />
            )}
            {currentTab === 'menu' && (
              <MenuScreen
                cartItems={cartItems}
                onAddToCart={handleAddToCart}
                onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
                onNavigate={handleNavigate}
                orderMode={orderMode}
                onSetOrderMode={setOrderMode}
              />
            )}
            {currentTab === 'commander' && (
              <CheckoutScreen
                cartItems={cartItems}
                onNavigate={handleNavigate}
                orderMode={orderMode}
                onSetOrderMode={setOrderMode}
                onClearCart={handleClearCart}
              />
            )}
            {currentTab === 'reserver' && <ReservationScreen onNavigate={handleNavigate} />}
            {currentTab === 'galerie' && <GalleryScreen onNavigate={handleNavigate} />}
            {currentTab === 'contact' && <ContactScreen onNavigate={handleNavigate} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartDrawerOpen}
        onClose={() => setIsCartDrawerOpen(false)}
        cartItems={cartItems}
        onUpdateCartItemQuantity={handleUpdateCartItemQuantity}
        onNavigate={handleNavigate}
        orderMode={orderMode}
      />

      {/* Floating Fast Help Widget: WhatsApp direct (from original designs) */}
      <motion.aside
        aria-label="Assistance rapide"
        className="fixed bottom-6 right-6 z-40"
        initial={{ opacity: 0, scale: 0.4, y: 40 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 2.6, type: 'spring', stiffness: 260, damping: 16 }}
        whileHover={{ y: -3 }}
      >
        <a
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-white text-[#241915] shadow-[0_10px_28px_rgba(31,20,16,0.16)] hover:bg-[#fff1ec] transition-all active:scale-[0.98] border border-[#ffe9e2]"
          href={RESTAURANT_INFO.whatsappDirect}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="wa-pulse w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </span>
          <span className="font-label-md text-xs sm:text-sm font-bold tracking-tight text-[#241915]">
            WhatsApp
          </span>
        </a>
      </motion.aside>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
    </MotionConfig>
  );
}
