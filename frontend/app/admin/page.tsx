export default function AdminHome() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Admin Panel</h1>

      <div className="mt-6">
        <a href="/admin/products" className="text-blue-600 underline text-xl">
          Manage Products →
        </a>
      </div>
    </div>
  );
}