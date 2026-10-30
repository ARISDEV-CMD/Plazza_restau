import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
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

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
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
    <div className="min-h-screen bg-[#fff8f6] font-['Inter',sans-serif] text-[#241915] flex flex-col selection:bg-[#e8911a] selection:text-[#573200]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-24 right-4 sm:right-8 z-50 bg-[#895200] text-white px-5 py-3 rounded-xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top-2 duration-200">
          <span className="material-symbols-outlined text-[20px] text-[#ffb86a]">check_circle</span>
          <span className="font-label-md text-xs sm:text-sm font-semibold">{toastMessage}</span>
        </div>
      )}

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
            initial={{ opacity: 0, y: 18, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(2px)' }}
            transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
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
      <aside aria-label="Assistance rapide" className="fixed bottom-6 right-6 z-40">
        <a
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-white text-[#241915] shadow-[0_10px_28px_rgba(31,20,16,0.16)] hover:bg-[#fff1ec] transition-all active:scale-[0.98] border border-[#ffe9e2]"
          href={RESTAURANT_INFO.whatsappDirect}
          rel="noopener noreferrer"
          target="_blank"
        >
          <span className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-xs">
            <span className="material-symbols-outlined text-[18px]">chat</span>
          </span>
          <span className="font-label-md text-xs sm:text-sm font-bold tracking-tight text-[#241915]">
            WhatsApp
          </span>
        </a>
      </aside>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
