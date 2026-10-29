import test from 'node:test';
import assert from 'node:assert/strict';
import {
  formatFCFA,
  calculateItemCount,
  calculateSubtotal,
  calculateDeliveryFee,
  calculateDiscount,
  calculateTotal,
  generateOrderReference,
  buildWhatsAppOrderUrl
} from './orderCalculator';
import { CartItem } from '../types';

const mockItems: CartItem[] = [
  {
    id: 'poulet-demi-pane',
    item: {
      id: 'poulet-demi-pane',
      name: '½ Poulet pané',
      description: 'Deux beaux morceaux dorés',
      price: 5500,
      category: 'poulet',
      image: '/test.jpg'
    },
    quantity: 1,
    unitPrice: 5500
  },
  {
    id: 'alloco',
    item: {
      id: 'alloco',
      name: 'Alloco plantains mûrs',
      description: 'Plantains dorés',
      price: 500,
      category: 'accompagnements',
      image: '/alloco.jpg'
    },
    quantity: 2,
    unitPrice: 500
  },
  {
    id: 'baobab-1l',
    item: {
      id: 'baobab',
      name: 'Jus de baobab (1 L)',
      description: 'Velouté authentique',
      price: 1000,
      category: 'naturelles',
      image: '/baobab.jpg'
    },
    quantity: 2,
    unitPrice: 1000
  }
];

test('formatFCFA formats numbers with spaces and currency suffix', () => {
  assert.equal(formatFCFA(9500), '9 500 FCFA');
  assert.equal(formatFCFA(500), '500 FCFA');
  assert.equal(formatFCFA(10000), '10 000 FCFA');
});

test('calculateItemCount calculates sum of quantities', () => {
  assert.equal(calculateItemCount(mockItems), 5); // 1 + 2 + 2
});

test('calculateSubtotal matches design total for default items', () => {
  // 5500*1 + 500*2 + 1000*2 = 5500 + 1000 + 2000 = 8500 FCFA
  const subtotal = calculateSubtotal(mockItems);
  assert.equal(subtotal, 8500);
});

test('calculateDeliveryFee applies fee only for delivery mode', () => {
  assert.equal(calculateDeliveryFee('delivery', 1000), 1000);
  assert.equal(calculateDeliveryFee('delivery', 2500), 2500);
  assert.equal(calculateDeliveryFee('takeaway', 1000), 0);
  assert.equal(calculateDeliveryFee('dine_in', 1000), 0);
});

test('calculateDiscount applies correct promos', () => {
  assert.equal(calculateDiscount(8500, 'PLAZZA10'), 850);
  assert.equal(calculateDiscount(8500, 'plazza10'), 850);
  assert.equal(calculateDiscount(8500, 'PLAZZA500'), 500);
  assert.equal(calculateDiscount(8500, 'BIENVENUE'), 1000);
  assert.equal(calculateDiscount(8500, 'INVALID'), 0);
});

test('calculateTotal computes subtotal + delivery - discount', () => {
  // 8500 subtotal + 1000 delivery - 0 discount = 9500 FCFA
  const total = calculateTotal(8500, 1000, 0);
  assert.equal(total, 9500);

  // with discount
  const discountedTotal = calculateTotal(8500, 1000, 500);
  assert.equal(discountedTotal, 9000);
});

test('generateOrderReference produces valid PLZ-XXXX format', () => {
  const ref = generateOrderReference();
  assert.match(ref, /^PLZ-\d{4}$/);
});

test('buildWhatsAppOrderUrl includes phone, total, and item details', () => {
  const url = buildWhatsAppOrderUrl({
    phone: '+237 678 18 49 30',
    orderId: 'PLZ-1234',
    customerName: 'Jean Eboa',
    customerPhone: '678184930',
    mode: 'delivery',
    items: mockItems,
    districtName: 'Ndogbong',
    address: 'Fin goudron',
    total: 9500,
    paymentMethod: 'Paiement à la livraison'
  });

  assert.ok(url.startsWith('https://wa.me/237678184930'));
  assert.ok(url.includes('PLZ-1234'));
  assert.ok(url.includes('Jean%20Eboa'));
  assert.ok(url.includes('9%20500%20FCFA'));
});
