"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user") || "{}");

    if (user.role?.id !== 2) {
      router.push("/");
    }
  }, [router]);

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <div className="grid grid-cols-3 gap-6">
        <Link href="/admin/products" className="p-6 border rounded-xl shadow hover:bg-gray-50 transition">
          <h2 className="text-2xl font-bold">📦 Manage Products</h2>
          <p>View / edit / delete products</p>
        </Link>

        <Link href="/admin/products/new" className="p-6 border rounded-xl shadow hover:bg-gray-50 transition">
          <h2 className="text-2xl font-bold">➕ Add Product</h2>
          <p>Create new product with images</p>
        </Link>

        <Link href="/admin/categories" className="p-6 border rounded-xl shadow hover:bg-gray-50 transition">
          <h2 className="text-2xl font-bold">📁 Manage Categories</h2>
          <p>Add / edit categories</p>
        </Link>
      </div>
    </div>
  );
}