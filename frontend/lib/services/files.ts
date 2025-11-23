import api from "../api";

export const filesService = {
  async upload(file: File): Promise<string> {
    const form = new FormData();
    form.append("file", file);

    const res = await api.post("/v1/files/upload", form, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data.url;
  },
};