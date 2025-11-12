import api from "../api";

export const authService = {
  async register(data: { email: string; password: string }) {
    const res = await api.post("/auth/email/register", data);
    return res.data;
  },

  async login(data: { email: string; password: string }) {
    const res = await api.post("/auth/email/login", data);
    return res.data;
  },

  async me() {
    const res = await api.get("/auth/me");
    return res.data;
  },
};