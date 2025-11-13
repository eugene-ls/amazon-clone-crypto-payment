"use client";

import { useState } from "react";
import { authService } from "@/lib/services/auth";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    try {
      await authService.register({ email, password });
      router.push("/login");
    } catch (e) {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl mb-4">Register</h1>

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
        Create account
      </button>
    </div>
  );
}