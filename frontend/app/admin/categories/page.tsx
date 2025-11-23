"use client";

import { useEffect, useState } from "react";
import { categoriesService } from "@/lib/services/categories";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Plus, Edit, Trash2, X } from "lucide-react";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [formName, setFormName] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await categoriesService.getAll();
      setCategories(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return;

    setSubmitting(true);
    try {
      await categoriesService.create({ name: formName });
      setFormName("");
      setShowForm(false);
      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to create category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !editingId) return;

    setSubmitting(true);
    try {
      await categoriesService.update(editingId, { name: formName });
      setFormName("");
      setEditingId(null);
      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to update category");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await categoriesService.delete(id);
      loadCategories();
    } catch (err) {
      console.error(err);
      alert("Failed to delete category");
    }
  };

  const startEdit = (category: any) => {
    setEditingId(category.id);
    setFormName(category.name);
    setShowForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormName("");
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="p-8">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Categories</h1>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Add Category
          </Button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 p-6 border rounded-lg bg-white">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold">
              {editingId ? "Edit Category" : "New Category"}
            </h2>
            <button onClick={cancelEdit}>
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          <form onSubmit={editingId ? handleUpdate : handleCreate} className="space-y-4">
            <Input
              label="Category Name"
              value={formName}
              onChange={(e) => setFormName(e.target.value)}
              required
              placeholder="Enter category name"
            />
            <div className="flex gap-4">
              <Button type="submit" disabled={submitting}>
                {submitting ? "Saving..." : editingId ? "Update" : "Create"}
              </Button>
              <Button type="button" variant="outline" onClick={cancelEdit}>
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      <div className="space-y-2">
        {categories.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No categories yet</p>
        ) : (
          categories.map((category) => (
            <div
              key={category.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <span className="font-medium">{category.name}</span>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEdit(category)}
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(category.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
