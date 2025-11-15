"use client";

import { useEffect, useState } from "react";
import { authService } from "@/lib/services/auth";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      window.location.href = "/login";
      return;
    }

    authService.me().then((data) => setUser(data));
  }, []);

  if (!user) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="border p-4 rounded shadow">
        <p className="mb-2">
          <span className="font-semibold">Email:</span> {user.email}
        </p>

        <button
          className="mt-4 bg-red-600 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}