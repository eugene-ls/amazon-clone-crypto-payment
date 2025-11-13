"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function HomePage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    api.get("/products").then((res) => {
      setProducts(res.data.items || res.data);
    });
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-6">Товары</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((p: any) => (
          <div
            key={p.id}
            className="bg-white p-4 shadow rounded-lg hover:shadow-lg transition"
          >
            <img
              src={p.images?.[0] || "/placeholder.png"}
              alt={p.name}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="mt-2 text-lg font-semibold">{p.name}</h2>
            <p className="text-gray-600">{p.price} Kč</p>
          </div>
        ))}
      </div>
    </main>
  );
}