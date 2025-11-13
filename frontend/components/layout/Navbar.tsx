"use client";

import Link from "next/link";
import { authService } from "@/lib/services/auth";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  return (
    <nav className="w-full h-16 flex items-center justify-between px-6 bg-white shadow">
      <Link href="/" className="text-xl font-bold">
        E-Commerce
      </Link>

      <div className="flex items-center gap-4">
        {!auth ? (
          <>
            <Link
              href="/login"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Login
            </Link>

            <Link
              href="/register"
              className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <span className="text-gray-700">Logged in</span>
            <button
              onClick={logout}
              className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700 transition"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}