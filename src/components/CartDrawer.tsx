import React from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { CartItem, OrderMode, NavigationTab } from '../types';
import { formatFCFA, calculateSubtotal, calculateDeliveryFee, calculateTotal } from '../utils/orderCalculator';
import { AnimatedNumber } from './motion/effects';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateCartItemQuantity: (id: string, delta: number) => void;
  onNavigate: (tab: NavigationTab) => void;
  orderMode: OrderMode;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateCartItemQuantity,
  onNavigate,
  orderMode
}) => {
  const subtotal = calculateSubtotal(cartItems);
  const deliveryFee = calculateDeliveryFee(orderMode, 1000);
  const total = calculateTotal(subtotal, deliveryFee, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="cart-drawer"
          className="fixed inset-0 z-50 flex justify-end"
          initial="closed"
          animate="open"
          exit="closed"
        >
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs"
            variants={{ closed: { opacity: 0 }, open: { opacity: 1 } }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <motion.div
            role="dialog"
            aria-label="Mon panier"
            className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10"
            variants={{ closed: { x: '100%' }, open: { x: 0 } }}
            transition={{ type: 'spring', stiffness: 300, damping: 34 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 bg-[#fff1ec] border-b border-[#ffe9e2]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#895200] text-[24px]">shopping_bag</span>
                <h2 className="font-headline-md text-lg text-[#241915] font-bold">Mon Panier</h2>
              </div>
              <motion.button
                onClick={onClose}
                whileHover={{ rotate: 90, scale: 1.08 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#534435] hover:text-[#241915]"
                aria-label="Fermer le panier"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </motion.button>
            </div>

            {/* Items List */}
            <div className="flex-1 overflow-y-auto p-5">
              {cartItems.length === 0 ? (
                <motion.div
                  className="py-16 text-center text-[#534435]"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <span className="bag-sway">
                    <span className="material-symbols-outlined text-[48px] text-[#867463] mb-2 block">
                      remove_shopping_cart
                    </span>
                  </span>
                  <p className="font-body-md text-sm font-semibold">Votre panier est vide.</p>
                  <p className="font-body-sm text-xs text-[#867463] mt-1">
                    Découvrez notre menu et ajoutez des plats croustillants !
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('menu');
                    }}
                    className="mt-4 px-5 py-2.5 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-xs font-bold"
                  >
                    Voir le menu
                  </button>
                </motion.div>
              ) : (
                <ul className="divide-y divide-[#ffe9e2]">
                  <AnimatePresence initial={false} mode="popLayout">
                    {cartItems.map((cItem, i) => (
                      <motion.li
                        key={cItem.id}
                        layout
                        className="py-3 flex items-center justify-between gap-3 bg-white"
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0, transition: { delay: 0.12 + i * 0.05, type: 'spring', stiffness: 320, damping: 28 } }}
                        exit={{ opacity: 0, x: -60, scale: 0.95, transition: { duration: 0.22 } }}
                      >
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-[#ffe9e2]">
                          <img className="w-full h-full object-cover" alt={cItem.item.name} src={cItem.item.image} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-body-md text-sm font-bold text-[#241915] truncate">
                            {cItem.item.name}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-label-sm text-xs text-[#534435]">
                              {cItem.unitPrice} x {cItem.quantity} =
                            </span>
                            <AnimatedNumber
                              value={cItem.unitPrice * cItem.quantity}
                              format={formatFCFA}
                              className="font-label-sm text-xs text-[#b52529] font-bold"
                            />
                          </div>
                        </div>
                        <div className="flex items-center gap-1 bg-[#fff1ec] px-2 py-1 rounded-full shrink-0 border border-[#ffe9e2]">
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => onUpdateCartItemQuantity(cItem.id, -1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white font-bold text-xs"
                            type="button"
                            aria-label={`Retirer un ${cItem.item.name}`}
                          >
                            -
                          </motion.button>
                          <span className="relative inline-flex w-5 justify-center overflow-hidden font-label-sm text-xs font-bold">
                            <AnimatePresence mode="popLayout" initial={false}>
                              <motion.span
                                key={cItem.quantity}
                                initial={{ y: 12, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: -12, opacity: 0 }}
                                transition={{ duration: 0.18 }}
                              >
                                {cItem.quantity}
                              </motion.span>
                            </AnimatePresence>
                          </span>
                          <motion.button
                            whileTap={{ scale: 0.8 }}
                            onClick={() => onUpdateCartItemQuantity(cItem.id, 1)}
                            className="w-6 h-6 flex items-center justify-center rounded-full bg-white font-bold text-xs"
                            type="button"
                            aria-label={`Ajouter un ${cItem.item.name}`}
                          >
                            +
                          </motion.button>
                        </div>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>

            {/* Footer Summary */}
            <AnimatePresence initial={false}>
              {cartItems.length > 0 && (
                <motion.div
                  key="summary"
                  className="p-5 bg-[#fff8f6] border-t border-[#ffe9e2] space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4 } }}
                  exit={{ opacity: 0, y: 30 }}
                >
                  <div className="space-y-1.5 text-xs text-[#534435]">
                    <div className="flex justify-between">
                      <span>Sous-total :</span>
                      <AnimatedNumber value={subtotal} format={formatFCFA} className="font-bold text-[#241915]" />
                    </div>
                    <div className="flex justify-between">
                      <span>Livraison estimée :</span>
                      <span className="font-bold text-[#241915]">{formatFCFA(deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-bold text-[#241915] pt-2 border-t border-[#ffe9e2]">
                      <span>Total :</span>
                      <AnimatedNumber value={total} format={formatFCFA} className="text-[#b52529]" />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigate('commander');
                    }}
                    className="group/cta w-full py-3.5 px-6 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-sm font-bold shadow-md hover:bg-[#895200] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Passer à la commande</span>
                    <span className="material-symbols-outlined text-[18px] transition-transform duration-300 group-hover/cta:translate-x-1.5">arrow_forward</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
