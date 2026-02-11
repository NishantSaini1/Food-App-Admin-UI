"use client";

import { usePathname, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/auth/auth.actions";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch<any>();

  // Hide header on auth pages like /login
  if (pathname === "/login") {
    return null;
  }

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <header className="bg-white shadow px-6 py-4 flex justify-between">
      <h1 className="font-semibold text-lg">Admin Panel</h1>
      <button
        onClick={handleLogout}
        className="text-sm text-red-500 hover:text-red-600"
      >
        Logout
      </button>
    </header>
  );
}
