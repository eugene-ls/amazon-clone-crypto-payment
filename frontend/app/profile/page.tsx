"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import Button from "@/components/ui/Button";
import { User, Mail, LogOut } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await api.get("/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUser(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("token");
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-64 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button variant="danger" onClick={handleLogout}>
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </div>

        <div className="space-y-6">
          <div className="flex items-center gap-4 pb-6 border-b">
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="w-10 h-10 text-gray-400" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg border">
                {user.firstName || "—"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg border">
                {user.lastName || "—"}
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="px-4 py-2 bg-gray-50 rounded-lg border flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                {user.email}
              </div>
            </div>

            {user.role && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role
                </label>
                <div className="px-4 py-2 bg-gray-50 rounded-lg border">
                  {user.role.name || `Role ID: ${user.role.id}`}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
