"use client";

import { useEffect, useState } from "react";
import { authService } from "@/lib/services/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    authService
      .me(token)
      .then((user) => {
        if (user.role?.id === 1) {
          setIsAdmin(true);
        } else {
          router.push("/");
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;

  if (!isAdmin) return null;

  return (
    <div className="p-10 space-y-10">
      <h1 className="text-4xl font-bold">Admin Panel</h1>

      <div className="grid grid-cols-3 gap-6">
        <Link
          href="/admin/products"
          className="p-6 border rounded-xl shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-2xl">📦 Manage Products</h2>
          <p>View / edit / delete products</p>
        </Link>

        <Link
          href="/admin/products/new"
          className="p-6 border rounded-xl shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-2xl">➕ Add Product</h2>
          <p>Create new product with images</p>
        </Link>

        <Link
          href="/admin/categories"
          className="p-6 border rounded-xl shadow hover:bg-gray-50 transition"
        >
          <h2 className="text-2xl">🗂 Manage Categories</h2>
          <p>Add / edit categories</p>
        </Link>
      </div>
    </div>
  );
}