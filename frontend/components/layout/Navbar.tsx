"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { authService } from "@/lib/services/auth";

export default function Navbar() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(authService.isAuthenticated());
  }, []);

  return (
    <nav className="w-full h-16 px-6 flex items-center justify-between shadow bg-white">
      <div className="flex items-center gap-2">
        <div className="w-4 h-4 bg-blue-600 rounded-sm"></div>
        <Link href="/" className="text-xl font-bold">Mazon</Link>

        <div className="ml-10 flex gap-6 text-gray-700">
          <Link href="/">Products</Link>
          <Link href="/">Categories</Link>
          <Link href="/">Pricing</Link>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <Link href="/" className="text-gray-600">Contact</Link>

        {!auth ? (
          <>
            <Link href="/login" className="text-gray-800">Login</Link>
            <Link href="/register" className="text-gray-800">Sign up</Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Get started
            </Link>
          </>
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