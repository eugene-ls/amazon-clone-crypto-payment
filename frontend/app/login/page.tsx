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

      // если админ — отправляем в /admin
      if (res.user.role?.id === 1) {
        window.location.href = "/admin";
      } else {
        window.location.href = "/";
      }

    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <form onSubmit={handleLogin} style={{ padding: 20 }}>
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
}