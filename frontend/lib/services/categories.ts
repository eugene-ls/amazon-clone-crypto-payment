import api from "../api";

export type Category = { id: number; name: string };

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const res = await api.get("/v1/categories");
    return res.data;
  },

  async getOne(id: number): Promise<Category> {
    const res = await api.get(`/v1/categories/${id}`);
    return res.data;
  },

  async create(data: { name: string }): Promise<Category> {
    const res = await api.post("/v1/categories", data);
    return res.data;
  },

  async update(id: number, data: { name: string }): Promise<Category> {
    const res = await api.patch(`/v1/categories/${id}`, data);
    return res.data;
  },

  async delete(id: number): Promise<void> {
    await api.delete(`/v1/categories/${id}`);
  },
};