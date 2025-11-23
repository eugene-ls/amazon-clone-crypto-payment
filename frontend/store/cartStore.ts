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
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      set({ count: 0, items: [], loading: false });
      return;
    }
    
    set({ loading: true });
    try {
      const res = await api.get("/v1/cart");
      const items = res.data || [];
      set({ items, count: items.length, loading: false });
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 404 || status === 401 || status === 403) {
        set({ count: 0, items: [], loading: false });
      } else {
        console.error("Cart fetch error:", err);
        set({ count: 0, items: [], loading: false });
      }
    }
  },
  addToCart: async (productId: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      await api.post(`/v1/cart/${productId}`);
      const res = await api.get("/v1/cart");
      const items = res.data || [];
      set({ items, count: items.length });
    } catch (err: any) {
      console.error("Add to cart error:", err);
      throw err;
    }
  },
  removeFromCart: async (productId: number) => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      console.error("Not authenticated");
      return;
    }
    
    try {
      await api.delete(`/v1/cart/${productId}`);
      const res = await api.get("/v1/cart");
      const items = res.data || [];
      set({ items, count: items.length });
    } catch (err: any) {
      console.error("Remove from cart error:", err);
      throw err;
    }
  },
  setCount: (count: number) => set({ count }),
}));


