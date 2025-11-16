"use client";

import axios from "axios";
import { useState } from "react";
import { authService } from "@/lib/services/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    const res = await axios.post(
      "http://localhost:3001/api/v1/auth/email/register",
      data
    );

    alert("Registered!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="First name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Last name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Register</button>
    </form>
  );
}