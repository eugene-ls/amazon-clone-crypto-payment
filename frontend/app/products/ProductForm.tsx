"use client";

import { useState } from "react";

export default function ProductForm({
                                      defaultValues = {},
                                      onSubmit,
                                    }: {
  defaultValues?: any;
  onSubmit: (data: any) => void;
}) {
  const [name, setName] = useState(defaultValues.name || "");
  const [price, setPrice] = useState(defaultValues.price || "");
  const [description, setDescription] = useState(defaultValues.description || "");

  return (
    <div className="max-w-xl">
      <input
        className="border p-2 w-full mb-3"
        placeholder="Product name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        className="border p-2 w-full mb-3"
        placeholder="Price"
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />

      <textarea
        className="border p-2 w-full mb-3"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => onSubmit({ name, price, description })}
      >
        Save
      </button>
    </div>
  );
}