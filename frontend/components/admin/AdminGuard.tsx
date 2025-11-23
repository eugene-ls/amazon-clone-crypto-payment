"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";

const ADMIN_ROLE_ID = 2;

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdmin = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await api.get("/v1/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        const user = res.data;
        if (user.role?.id === ADMIN_ROLE_ID) {
          setAllowed(true);
        } else {
          router.push("/");
        }
      } catch (err) {
        console.error(err);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAdmin();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!allowed) {
    return null;
  }

  return <>{children}</>;
}
