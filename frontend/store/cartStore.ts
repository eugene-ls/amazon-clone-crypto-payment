import { create } from "zustand";
import api from "@/lib/api";

interface CartState {
  count: number;
  items: any[];
  loading: boolean;
  fetchCart: () => Promise<void>;
  addToCart: (productId: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  setCount: (count: number) => void;
}

export const useCartStore = create<CartState>((set) => ({
  count: 0,
  items: [],
  loading: false,
  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await api.get("/v1/cart");
      const items = res.data || [];
      set({ items, count: items.length, loading: false });
    } catch (err) {
      set({ count: 0, items: [], loading: false });
    }
  },
  addToCart: async (productId: number) => {
    try {
      await api.post(`/v1/cart/${productId}`);
      const res = await api.get("/v1/cart");
      const items = res.data || [];
      set({ items, count: items.length });
    } catch (err) {
      console.error(err);
    }
  },
  removeFromCart: async (productId: number) => {
    try {
      await api.delete(`/v1/cart/${productId}`);
      const res = await api.get("/v1/cart");
      const items = res.data || [];
      set({ items, count: items.length });
    } catch (err) {
      console.error(err);
    }
  },
  setCount: (count: number) => set({ count }),
}));


