"use client";

import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start pt-20 bg-white">
      <h1 className="text-4xl font-bold mb-8">Products</h1>

      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Login
        </Link>

        <Link
          href="/register"
          className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition"
        >
          Register
        </Link>
      </div>
    </div>
  );
}