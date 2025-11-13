"use client";

import { useState } from "react";
import { authService } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      const res = await authService.login({ email, password });

      localStorage.setItem("accessToken", res.accessToken);

      router.push("/");
    } catch (e) {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Login</h1>

      <input
        type="email"
        placeholder="Email"
        className="border px-4 py-2 mb-2"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        className="border px-4 py-2 mb-2"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Login
      </button>
    </div>
  );
}