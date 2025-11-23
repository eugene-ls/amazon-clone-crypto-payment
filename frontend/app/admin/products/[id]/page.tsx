"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { productsService } from "@/lib/services/products";
import ProductForm from "@/components/forms/ProductForm";
import Button from "@/components/ui/Button";
import { Trash2 } from "lucide-react";
import api from "@/lib/api";

export default function ProductEditPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const data = await productsService.getOne(Number(params.id));
        setProduct(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadProduct();
  }, [params.id]);

  const handleSubmit = async (data: any) => {
    await productsService.update(Number(params.id), data);
    const updated = await productsService.getOne(Number(params.id));
    setProduct(updated);
    alert("Product updated successfully");
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    setDeleting(true);
    try {
      await productsService.delete(Number(params.id));
      router.push("/admin/products");
    } catch (err) {
      console.error(err);
      alert("Failed to delete product");
    } finally {
      setDeleting(false);
    }
  };

  const handleAddImages = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append("files", file);
      });
      await api.post(`/v1/products/${params.id}/images`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const updated = await productsService.getOne(Number(params.id));
      setProduct(updated);
      alert("Images added successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to add images");
    }
    e.target.value = "";
  };

  const handleRemoveImage = async (imageName: string) => {
    if (!confirm("Remove this image?")) return;
    try {
      await api.delete(`/v1/products/${params.id}/images/${imageName}`);
      const updated = await productsService.getOne(Number(params.id));
      setProduct(updated);
    } catch (err) {
      console.error(err);
      alert("Failed to remove image");
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8">
        <p>Product not found</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Edit Product</h1>
        <Button variant="danger" onClick={handleDelete} disabled={deleting}>
          <Trash2 className="w-4 h-4 mr-2" />
          {deleting ? "Deleting..." : "Delete Product"}
        </Button>
      </div>

      <ProductForm initialValues={product} onSubmit={handleSubmit} />

      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Manage Images</h2>
        <div className="grid grid-cols-4 gap-4 mb-4">
          {product.images?.map((image: string, index: number) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={image}
                  alt={`Product ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              <button
                onClick={() => handleRemoveImage(image.split("/").pop() || "")}
                className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
        <label className="inline-block">
          <Button variant="outline" as="span">
            Add More Images
          </Button>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleAddImages}
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
