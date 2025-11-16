"use client";

import { useState } from "react";
import { authService } from "@/lib/services/auth";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await authService.register({ firstName, lastName, email, password });
      alert("Registered! Now login.");
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleRegister} style={{ padding: 20 }}>
      <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First name" />
      <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last name" />
      <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
}