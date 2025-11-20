"use client";

import { useState } from "react";
import { authService } from "@/lib/services/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await authService.login({ email, password });

      // вывод того, что реально пришло от сервера
      console.log("LOGIN RESPONSE:", res);

      // если сервер не вернул пользователя
      if (!res || !res.user) {
        alert("Ошибка: сервер не вернул пользователя.");
        return;
      }

      // если сервер не вернул роль
      if (!res.user.role) {
        alert("Ошибка: у пользователя нет роли.");
        return;
      }

      // проверка на админа
      if (res.user.role.id === 1) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      console.error("LOGIN ERROR:", err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: 20 }}>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />

      <button type="submit">Login</button>
    </form>
  );
}