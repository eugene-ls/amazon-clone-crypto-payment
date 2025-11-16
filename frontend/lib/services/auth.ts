import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1", // ← ПРАВИЛЬНЫЙ ПРЕФИКС
  withCredentials: false,
});

export const authService = {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    return api.post("/auth/email/register", data);
  },

  async login(data: { email: string; password: string }) {
    return api.post("/auth/email/login", data);
  },

  async me(token: string) {
    return api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
};