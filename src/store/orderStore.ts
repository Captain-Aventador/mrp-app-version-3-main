import { create } from 'zustand';
import type { SalesOrder } from '@/types/sales';

interface OrderStore {
  orders: SalesOrder[];
  addOrder: (order: SalesOrder) => void;
  updateOrder: (updatedOrder: SalesOrder) => void;
  getOrderById: (id: string) => SalesOrder | undefined;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  addOrder: (order) => set((state) => ({ 
    orders: [...state.orders, order] 
  })),
  updateOrder: (updatedOrder) => set((state) => ({
    orders: state.orders.map(order => 
      order.id === updatedOrder.id ? updatedOrder : order
    )
  })),
  getOrderById: (id) => {
    const state = get();
    return state.orders.find(order => order.id === id);
  }
}));