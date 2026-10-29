import React from 'react';
import { CartItem, OrderMode, NavigationTab } from '../types';
import { formatFCFA, calculateSubtotal, calculateDeliveryFee, calculateTotal } from '../utils/orderCalculator';

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
  if (!isOpen) return null;

  const subtotal = calculateSubtotal(cartItems);
  const deliveryFee = calculateDeliveryFee(orderMode, 1000);
  const total = calculateTotal(subtotal, deliveryFee, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-5 bg-[#fff1ec] border-b border-[#ffe9e2]">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#895200] text-[24px]">shopping_bag</span>
            <h2 className="font-headline-md text-lg text-[#241915] font-bold">Mon Panier</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#534435] hover:text-[#241915]"
            aria-label="Fermer le panier"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-5 divide-y divide-[#ffe9e2]">
          {cartItems.length === 0 ? (
            <div className="py-16 text-center text-[#534435]">
              <span className="material-symbols-outlined text-[48px] text-[#867463] mb-2 block">
                remove_shopping_cart
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
            </div>
          ) : (
            cartItems.map(cItem => (
              <div key={cItem.id} className="py-3 flex items-center justify-between gap-3">
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
                    <span className="font-label-sm text-xs text-[#b52529] font-bold">
                      {formatFCFA(cItem.unitPrice * cItem.quantity)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 bg-[#fff1ec] px-2 py-1 rounded-full shrink-0 border border-[#ffe9e2]">
                  <button
                    onClick={() => onUpdateCartItemQuantity(cItem.id, -1)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white font-bold text-xs"
                    type="button"
                  >
                    -
                  </button>
                  <span className="font-label-sm text-xs font-bold px-1">{cItem.quantity}</span>
                  <button
                    onClick={() => onUpdateCartItemQuantity(cItem.id, 1)}
                    className="w-6 h-6 flex items-center justify-center rounded-full bg-white font-bold text-xs"
                    type="button"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary */}
        {cartItems.length > 0 && (
          <div className="p-5 bg-[#fff8f6] border-t border-[#ffe9e2] space-y-4">
            <div className="space-y-1.5 text-xs text-[#534435]">
              <div className="flex justify-between">
                <span>Sous-total :</span>
                <span className="font-bold text-[#241915]">{formatFCFA(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Livraison estimée :</span>
                <span className="font-bold text-[#241915]">{formatFCFA(deliveryFee)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#241915] pt-2 border-t border-[#ffe9e2]">
                <span>Total :</span>
                <span className="text-[#b52529]">{formatFCFA(total)}</span>
              </div>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigate('commander');
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#e8911a] text-[#573200] font-label-md text-sm font-bold shadow-md hover:bg-[#895200] hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Passer à la commande</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
