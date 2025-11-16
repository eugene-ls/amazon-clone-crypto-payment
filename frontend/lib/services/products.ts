import api from "../api";

export const productsService = {
  async getAll() {
    const res = await api.get("/api/v1/products");
    return res.data;
  },

  async getOne(id: number) {
    const res = await api.get(`/api/v1/products/${id}`);
    return res.data;
  },

  async create(data: any) {
    const res = await api.post("/api/v1/products", data);
    return res.data;
  },

  async update(id: number, data: any) {
    const res = await api.patch(`/api/v1/products/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`/api/v1/products/${id}`);
    return res.data;
  },
};