export type MenuCategory = 
  | 'poulet' 
  | 'accompagnements' 
  | 'naturelles' 
  | 'gazeuses' 
  | 'bieres' 
  | 'vins' 
  | 'whiskies';

export interface MenuItemOption {
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  tag?: string;
  isPopular?: boolean;
  isNew?: boolean;
  isSpecial?: boolean;
  isAlcohol?: boolean;
  options?: MenuItemOption[];
}

export interface CartItem {
  id: string; // unique for item + option
  item: MenuItem;
  quantity: number;
  selectedOption?: MenuItemOption;
  unitPrice: number;
}

export type OrderMode = 'delivery' | 'takeaway' | 'dine_in';
export type PaymentMethod = 'cod' | 'momo' | 'om';
export type DeliveryTiming = 'asap' | 'scheduled';

export interface DistrictDelivery {
  id: string;
  name: string;
  fee: number;
  description?: string;
}

export interface ReservationData {
  date: string;
  time: string;
  guests: number;
  space: 'rdc' | 'mezzanine' | 'terrasse';
  fullName: string;
  phone: string;
  email?: string;
  specialRequest?: string;
}

export interface OrderConfirmationData {
  orderId: string;
  createdAt: string;
  mode: OrderMode;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  customerName: string;
  customerPhone: string;
  districtName: string;
  address: string;
  timing: DeliveryTiming;
  scheduledTime?: string;
  kitchenNote?: string;
  paymentMethod: PaymentMethod;
}

export type NavigationTab = 'accueil' | 'menu' | 'commander' | 'reserver' | 'galerie' | 'contact';
