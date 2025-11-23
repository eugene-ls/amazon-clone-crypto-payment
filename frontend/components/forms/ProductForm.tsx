"use client";

import { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import { filesService } from "@/lib/services/files";
import { categoriesService } from "@/lib/services/categories";
import api from "@/lib/api";

interface ProductFormProps {
  initialValues?: any;
  onSubmit: (data: any) => Promise<void>;
}

export default function ProductForm({ initialValues, onSubmit }: ProductFormProps) {
  const [name, setName] = useState(initialValues?.name || "");
  const [price, setPrice] = useState(initialValues?.price?.toString() || "");
  const [description, setDescription] = useState(initialValues?.description || "");
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId?.toString() || "");
  const [categories, setCategories] = useState<any[]>([]);
  const [images, setImages] = useState<string[]>(initialValues?.images || []);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await categoriesService.getAll();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    };
    loadCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        const url = await filesService.upload(file);
        return url;
      });
      const newUrls = await Promise.all(uploadPromises);
      setImages([...images, ...newUrls]);
    } catch (err) {
      console.error(err);
      alert("Failed to upload images");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !price || !description || !categoryId) {
      alert("Please fill all required fields");
      return;
    }

    setSubmitting(true);
    try {
      const productData = {
        name,
        price: parseFloat(price),
        description,
        categoryId: parseInt(categoryId),
        images,
      };

      await onSubmit(productData);
    } catch (err) {
      console.error(err);
      alert("Failed to save product");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl space-y-6">
      <Input
        label="Product Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        placeholder="Enter product name"
      />

      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Price (Kč)"
          type="number"
          step="0.01"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
          placeholder="0.00"
        />

        <Select
          label="Category"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          options={[
            { value: "", label: "Select category" },
            ...categories.map((cat) => ({
              value: cat.id.toString(),
              label: cat.name,
            })),
          ]}
        />
      </div>

      <Textarea
        label="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        rows={5}
        placeholder="Enter product description"
      />

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Product Images
        </label>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {images.map((image, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/images/placeholder.jpg";
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          <label className="aspect-square border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gray-400 transition-colors">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <span className="text-sm text-gray-600">Upload</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
        {uploading && <p className="text-sm text-gray-500">Uploading images...</p>}
      </div>

      <div className="flex gap-4">
        <Button type="submit" disabled={submitting || uploading} size="lg">
          {submitting ? "Saving..." : initialValues?.id ? "Update Product" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}
