import api from "../api";

export const authService = {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const res = await api.post("/v1/auth/email/register", data);
    return res.data;
  },

  async login(data: { email: string; password: string }) {
    const res = await api.post("/v1/auth/email/login", data);
    localStorage.setItem("token", res.data.token);
    return res.data;
  },

  async me(token: string) {
    const res = await api.get("/v1/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
  },
};