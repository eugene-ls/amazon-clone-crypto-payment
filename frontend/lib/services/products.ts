import api from "@/lib/api";

export const productsService = {
  async getAll() {
    const res = await api.get("/products");

    // ПОДСТРАХОВКА под разные форматы ответа бэка
    if (Array.isArray(res.data)) return res.data;
    if (Array.isArray(res.data.items)) return res.data.items;
    if (Array.isArray(res.data.data)) return res.data.data;

    console.warn("Unexpected products response:", res.data);
    return [];
  },

  async getOne(id: number) {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },

  async create(data: any) {
    const res = await api.post("/products", data);
    return res.data;
  },

  async delete(id: number) {
    const res = await api.delete(`/products/${id}`);
    return res.data;
  },

  async uploadImages(productId: number, files: File[]) {
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    const res = await api.post(`/products/${productId}/images`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
  },
  async update(id: number, data: any) {
    const res = await api.patch(`/products/${id}`, data);
    return res.data;
  }
};