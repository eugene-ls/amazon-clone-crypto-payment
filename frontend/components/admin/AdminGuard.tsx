"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    try {
      const parsed = JSON.parse(atob(token.split(".")[1])); // payload

      if (parsed.roleId === 1) {
        setAllowed(true);
      } else {
        router.push("/");
      }
    } catch {
      router.push("/login");
    }
  }, []);

  if (!allowed) return null;

  return <>{children}</>;
}