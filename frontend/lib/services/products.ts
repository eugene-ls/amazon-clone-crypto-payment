import api from "../api";

export const productsService = {
  async getAll() {
    const res = await api.get("/v1/products");
    return res.data;
  },

  async getOne(id: number) {
    const res = await api.get(`/v1/products/${id}`);
    return res.data;
  },

  async create(data: any) {
    const res = await api.post("/v1/products", data);
    return res.data;
  },

  async update(id: number, data: any) {
    const res = await api.patch(`/v1/products/${id}`, data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`/v1/products/${id}`);
    return res.data;
  },
};