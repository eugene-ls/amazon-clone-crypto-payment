import api from "../api";

export const wishlistService = {
  async getAll() {
    const res = await api.get("/v1/wishlist");
    return res.data;
  },

  async add(productId: number) {
    const res = await api.post(`/v1/wishlist/${productId}`);
    return res.data;
  },

  async remove(productId: number) {
    await api.delete(`/v1/wishlist/${productId}`);
  },
};


