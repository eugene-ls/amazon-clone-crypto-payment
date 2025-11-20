"use client";

import React, { useState, ChangeEvent } from "react";

type ProductFormProps = {
  onSubmit: (data: FormData) => Promise<void>;
};

export default function ProductForm({ onSubmit }: ProductFormProps) {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setImages(Array.from(e.target.files)); // ← исправлено
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", String(name));
    formData.append("price", String(price));
    formData.append("description", description);
    formData.append("categoryId", String(categoryId));

    images.forEach((file: File) => {
      formData.append("images", file);
    });

    await onSubmit(formData);
    setLoading(false);
  };

  return (
    <form className="space-y-4 max-w-lg" onSubmit={handleSubmit}>
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input
          className="w-full border rounded px-3 py-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Price</label>
        <input
          type="number"
          className="w-full border rounded px-3 py-2"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          className="w-full border rounded px-3 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Category</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">Select category</option>
          <option value="1">Электроника</option>
          <option value="2">Одежда</option>
          <option value="3">Обувь</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 font-medium">Images</label>
        <input type="file" multiple onChange={handleImagesChange} />
      </div>

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Saving..." : "Save"}
      </button>
    </form>
  );
}