import { CartItem, OrderMode } from '../types';

/**
 * Format currency amount into clean FCFA display (e.g. 9 500 FCFA)
 */
export function formatFCFA(amount: number): string {
  const rounded = Math.round(amount);
  return `${rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
}

/**
 * Calculate the total item count in a cart
 */
export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

/**
 * Calculate the subtotal from the cart items
 */
export function calculateSubtotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0);
}

/**
 * Calculate delivery fee based on order mode and chosen district
 */
export function calculateDeliveryFee(mode: OrderMode, districtFee: number): number {
  if (mode === 'takeaway' || mode === 'dine_in') {
    return 0;
  }
  return districtFee > 0 ? districtFee : 1000;
}

/**
 * Calculate discount based on active promo code
 */
export function calculateDiscount(subtotal: number, promoCode: string): number {
  const code = promoCode.trim().toUpperCase();
  if (!code) return 0;
  if (code === 'PLAZZA10') {
    return Math.round(subtotal * 0.1);
  }
  if (code === 'PLAZZA500' && subtotal >= 3000) {
    return 500;
  }
  if (code === 'BIENVENUE' && subtotal >= 5000) {
    return 1000;
  }
  return 0;
}

/**
 * Calculate grand total
 */
export function calculateTotal(subtotal: number, deliveryFee: number, discount: number): number {
  return Math.max(0, subtotal + deliveryFee - discount);
}

/**
 * Generate a friendly order reference code (e.g., PLZ-7241)
 */
export function generateOrderReference(): string {
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `PLZ-${randomNum}`;
}

/**
 * Generate WhatsApp message URL for immediate order sending
 */
export function buildWhatsAppOrderUrl(params: {
  phone: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  mode: OrderMode;
  items: CartItem[];
  districtName?: string;
  address?: string;
  total: number;
  paymentMethod: string;
  note?: string;
}): string {
  const modeLabel = 
    params.mode === 'delivery' ? 'Livraison à domicile' :
    params.mode === 'takeaway' ? 'À emporter (Ndogbong)' : 'Sur place (À table)';

  const itemLines = params.items.map(
    i => `• ${i.quantity}x ${i.item.name}${i.selectedOption ? ` (${i.selectedOption.label})` : ''} - ${formatFCFA(i.unitPrice * i.quantity)}`
  ).join('\n');

  const text = `*COMMANDE LA PLAZZA - #${params.orderId}*
------------------------------
👤 *Client :* ${params.customerName} (${params.customerPhone})
🛵 *Mode :* ${modeLabel}
${params.mode === 'delivery' ? `📍 *Quartier :* ${params.districtName || 'Ndogbong'}\n🏠 *Repère :* ${params.address || 'Non spécifié'}` : ''}
💳 *Paiement :* ${params.paymentMethod}
${params.note ? `📝 *Note cuisine :* ${params.note}\n` : ''}
*Articles :*
${itemLines}

*TOTAL À PAYER : ${formatFCFA(params.total)}*
------------------------------
Merci de confirmer la commande et le délai de préparation !`;

  const cleanPhone = params.phone.replace(/[^0-9]/g, '');
  return `https://wa.me/${cleanPhone}?text=${encodeURIComponent(text)}`;
}
