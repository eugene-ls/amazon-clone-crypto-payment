"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { isAuthenticated } from "@/lib/services/auth";

export default function Navbar() {
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    setAuth(isAuthenticated());
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  return (
    <nav className="w-full border-b bg-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-6">

        {/* ---- LEFT SECTION ---- */}
        <div className="flex items-center gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 bg-blue-600 rounded-md"></div>
            <span className="text-xl font-semibold">Mazon</span>
          </Link>

          {/* Navigation menu */}
          <div className="flex items-center gap-6 text-gray-700">
            <Link href="/products" className="hover:text-black">
              Products
            </Link>

            <Link href="/categories" className="hover:text-black">
              Categories
            </Link>

            <Link href="/pricing" className="hover:text-black">
              Pricing
            </Link>
          </div>
        </div>

        {/* ---- RIGHT SECTION ---- */}
        <div className="flex items-center gap-4">

          <Link href="/contact" className="text-gray-700 hover:text-black">
            Contact
          </Link>

          {!auth ? (
            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-black"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="text-gray-700 hover:text-black"
              >
                Sign up
              </Link>

              <Link
                href="/register"
                className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                Get started
              </Link>
            </>
          ) : (
            <>
              <span className="text-gray-700">Logged in</span>

              <button
                onClick={logout}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}