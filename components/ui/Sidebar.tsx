"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Orders", path: "/orders" },
  { name: "Menu", path: "/menu" },
  { name: "Food", path: "/food" },
  { name: "Categories", path: "/categories" },
  { name: "Customers", path: "/customers" },
  { name: "Payments", path: "/payments" },
  { name: "Reports", path: "/reports" },
  { name: "Settings", path: "/settings" },
];

export default function Sidebar() {
  const pathname = usePathname();

  // Hide sidebar on auth pages like /login
  if (pathname === "/login") {
    return null;
  }

  return (
    <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
      <div className="px-6 py-5 border-b text-xl font-bold text-orange-600">
        Food Admin
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 text-sm">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.path}
            className="block px-4 py-2 rounded-lg text-gray-600 hover:bg-orange-50 hover:text-orange-600"
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
