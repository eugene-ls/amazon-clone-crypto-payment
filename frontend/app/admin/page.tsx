"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) {
      setUser(JSON.parse(saved));
    }
    setLoaded(true);
  }, []);

  if (!loaded) return <div>Loading...</div>;

  // Если нет юзера
  if (!user) {
    return <h2>Not authenticated</h2>;
  }

  // Если роль != admin
  if (user.role?.id !== 1) {
    return <h2>Access denied</h2>;
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Admin Dashboard</h1>

      <p>Welcome, {user.firstName}</p>

      {/* Тут твоя админка */}
    </div>
  );
}