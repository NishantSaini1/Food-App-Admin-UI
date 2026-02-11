"use client";

import { useSelector } from "react-redux";

export default function DashboardPage() {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div className="min-h-screen bg-gray-100 flex">
      
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 bg-white shadow-lg flex-col">
        <div className="px-6 py-5 border-b">
          <h2 className="text-xl font-bold text-orange-600">Food Admin</h2>
        </div>

        
      </aside>

      {/* Main Content */}
    
    </div>
  );
}
