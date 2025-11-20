import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1", // твой backend
  withCredentials: false,
});

export const authService = {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const res = await api.post("/auth/email/register", data);
    return res.data; // ВАЖНО!
  },

  async login(data: { email: string; password: string }) {
    const res = await api.post("/auth/email/login", data);

    return res.data;
  },

  async me(token: string) {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
};