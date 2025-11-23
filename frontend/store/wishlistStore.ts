import { create } from "zustand";
import { wishlistService } from "@/lib/services/wishlist";

interface WishlistState {
  count: number;
  items: any[];
  productIds: Set<number>;
  loading: boolean;
  fetchWishlist: () => Promise<void>;
  addToWishlist: (productId: number) => Promise<void>;
  removeFromWishlist: (productId: number) => Promise<void>;
  isInWishlist: (productId: number) => boolean;
  setCount: (count: number) => void;
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  count: 0,
  items: [],
  productIds: new Set(),
  loading: false,
  fetchWishlist: async () => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (!token) {
      set({ count: 0, items: [], productIds: new Set(), loading: false });
      return;
    }
    
    set({ loading: true });
    try {
      const items = await wishlistService.getAll();
      const productIds = new Set(items.map((item: any) => item.product?.id || item.productId));
      set({ items, count: items.length, productIds, loading: false });
    } catch (err: any) {
      const status = err.response?.status;
      if (status === 404 || status === 401 || status === 403) {
        set({ count: 0, items: [], productIds: new Set(), loading: false });
      } else {
        console.error("Wishlist fetch error:", err);
        set({ count: 0, items: [], productIds: new Set(), loading: false });
      }
    }
  },
  addToWishlist: async (productId: number) => {
    try {
      await wishlistService.add(productId);
      const items = await wishlistService.getAll();
      const productIds = new Set(items.map((item: any) => item.product?.id || item.productId));
      set({ items, count: items.length, productIds });
    } catch (err) {
      console.error(err);
    }
  },
  removeFromWishlist: async (productId: number) => {
    try {
      await wishlistService.remove(productId);
      const items = await wishlistService.getAll();
      const productIds = new Set(items.map((item: any) => item.product?.id || item.productId));
      set({ items, count: items.length, productIds });
    } catch (err) {
      console.error(err);
    }
  },
  isInWishlist: (productId: number) => {
    return get().productIds.has(productId);
  },
  setCount: (count: number) => set({ count }),
}));


