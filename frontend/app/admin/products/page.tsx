// frontend/app/admin/products/page.tsx
import Link from "next/link";
import { productsService } from "@/lib/services/products";

export default async function AdminProductsPage() {
  const products = await productsService.getAll();

  return (
    <div className="p-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Admin – Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Create product
        </Link>
      </div>

      {!products || products.length === 0 ? (
        <p>No products yet.</p>
      ) : (
        <table className="w-full border-collapse text-sm">
          <thead>
          <tr className="border-b">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Price</th>
            <th className="text-left p-2">Actions</th>
          </tr>
          </thead>
          <tbody>
          {products.map((p: any) => (
            <tr key={p.id} className="border-b">
              <td className="p-2">{p.id}</td>
              <td className="p-2">{p.name}</td>
              <td className="p-2">{p.price ?? "—"}</td>
              <td className="p-2">
                <Link
                  href={`/products/${p.id}`}
                  className="text-blue-600 hover:underline mr-3"
                >
                  View
                </Link>
                {/* потом сделаем edit */}
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      )}
    </div>
  );
}