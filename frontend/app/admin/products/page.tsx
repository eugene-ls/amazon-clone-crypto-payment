import Link from "next/link";
import { productsService } from "@/lib/services/products";

export default async function AdminProductsPage() {
  const products = await productsService.getAll();

  return (
    <div className="p-10">
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <Link href="/admin/products/new" className="bg-green-600 text-white px-4 py-2 rounded">
          + Create Product
        </Link>
      </div>

      <table className="w-full border-collapse text-sm">
        <thead>
        <tr className="border-b">
          <th className="p-2 text-left">ID</th>
          <th className="p-2 text-left">Name</th>
          <th className="p-2 text-left">Price</th>
          <th className="p-2 text-left">Actions</th>
        </tr>
        </thead>

        <tbody>
        {products.map((p: any) => (
          <tr key={p.id} className="border-b">
            <td className="p-2">{p.id}</td>
            <td className="p-2">{p.name}</td>
            <td className="p-2">${p.price}</td>
            <td className="p-2 flex gap-4">
              <Link href={`/admin/products/${p.id}`} className="text-blue-600 underline">
                Edit
              </Link>
              <button
                className="text-red-600"
                onClick={async () => {
                  await productsService.delete(p.id);
                  location.reload();
                }}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}