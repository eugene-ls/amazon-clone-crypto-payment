import api from "../api";

export type Category = { id: number; name: string };

export const categoriesService = {
  async getAll(): Promise<Category[]> {
    const res = await api.get("/v1/categories");
    return res.data;
  },
};