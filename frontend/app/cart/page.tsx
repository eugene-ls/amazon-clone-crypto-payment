"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";

export default function CartPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const res = await api.get("/cart");
      setItems(res.data);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadCart();
  }, []);

  const remove = async (productId: number) => {
    await api.delete(`/cart/${productId}`);
    loadCart();
  };

  if (loading) return <div className="p-10">Loading...</div>;

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

      {items.length === 0 ? (
        <div>Your cart is empty.</div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between border p-4 rounded"
            >
              <div>
                <p className="font-bold">{item.product.name}</p>
                <p>${item.product.price}</p>
              </div>

              <button
                onClick={() => remove(item.productId)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Remove
              </button>
            </div>
          ))}

          <button className="mt-6 bg-green-600 text-white px-6 py-3 rounded">
            Checkout
          </button>
        </div>
      )}
    </div>
  );
}