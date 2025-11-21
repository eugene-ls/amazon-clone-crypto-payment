import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api/v1",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;


export const authService = {
  async register(data: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) {
    const res = await api.post("/auth/email/register", data);
    return res.data;
  },

  async login(data: { email: string; password: string }) {
    const res = await api.post("/auth/email/login", data);

    localStorage.setItem("token", res.data.token);
    document.cookie = `token=${res.data.token}; path=/; SameSite=Lax`;

    return res.data;
  },

  async me(token: string) {
    const res = await api.get("/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return res.data;
  },
};