import AdminGuard from "@/components/admin/AdminGuard";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminGuard>
      <div className="min-h-screen flex bg-gray-50">
    <aside className="w-64 bg-white border-r p-6">
    <h2 className="text-2xl font-bold mb-8">Mazon Admin</h2>

  <nav className="space-y-2">
  <a className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin">
    Dashboard
    </a>
    <a className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/products">
    Products
    </a>
    <a className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/products/new">
    Add Product
  </a>
  <a className="block px-3 py-2 rounded hover:bg-gray-100" href="/admin/categories">
    Categories
    </a>
    </nav>
    </aside>

    <main className="flex-1 p-8">{children}</main>
    </div>
    </AdminGuard>
);
}