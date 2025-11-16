"use client";

import axios from "axios";
import { useState } from "react";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:3001/api/v1/auth/email/register",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      alert("Registration successful!");
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 20 }}>
      <input
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="First Name"
      />

      <input
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        placeholder="Last Name"
      />

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

      <button type="submit">Register</button>
    </form>
  );
}