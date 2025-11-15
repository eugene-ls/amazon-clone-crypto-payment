"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      setAuth(!!token);
    }
  }, []);

  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-white shadow">
      {/* LEFT */}
      <div className="flex items-center gap-8">
        <Link href="/" className="text-2xl font-bold text-blue-700">
          Mazon
        </Link>

        <div className="flex gap-6 text-gray-700">
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          {auth && <Link href="/profile">Profile</Link>}
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-4 text-gray-700">
        {!auth ? (
          <div className="flex gap-4">
            <Link href="/login" className="text-gray-800">
              Login
            </Link>
            <Link href="/register" className="text-gray-800">
              Sign Up
            </Link>
          </div>
        ) : (
          <button
            onClick={() => {
              localStorage.removeItem("accessToken");
              window.location.reload();
            }}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}