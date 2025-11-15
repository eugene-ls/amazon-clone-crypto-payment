"use client";

import { useState } from "react";

type ProductFormProps = {
  initialValues?: {
    name?: string;
    description?: string;
    price?: number;
  };
  onSubmit: (data: { name: string; description: string; price: number }) => Promise<void>;
};

export default function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name ?? "");
  const [description, setDescription] = useState(initialValues?.description ?? "");
  const [price, setPrice] = useState(
    initialValues?.price !== undefined ? String(initialValues.price) : ""
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({
        name,
        description,
        price: Number(price),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="space-y-4 max-w-md" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Price</label>
        <input
          type="number"
          step="0.01"
          className="w-full border rounded px-3 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-60"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}