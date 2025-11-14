"use client";

import { useState } from "react";
import { authService } from "@/lib/services/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    await authService.register({ email, password });
    window.location.href = "/login";
  };

  return (
    <div className="p-10 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>

      <input
        className="border p-2 w-full mb-3"
        placeholder="Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        onClick={submit}
        className="w-full bg-gray-900 text-white p-2 rounded"
      >
        Register
      </button>
    </div>
  );
}