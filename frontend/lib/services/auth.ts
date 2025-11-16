import api from "../api";

export const authService = {
  async login(data: { email: string; password: string }) {
    const res = await api.post("/api/v1/auth/email/login", data);
    return res.data;
  },

  async register(data: { email: string; password: string }) {
    const res = await api.post("/api/v1/auth/email/register", data);
    return res.data;
  },

  async me() {
    const res = await api.get("/api/v1/auth/me");
    return res.data;
  },

  isAuthenticated() {
    return typeof window !== "undefined" &&
    localStorage.getItem("accessToken")
      ? true
      : false;
  },
};