"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { Menu, UserCircle2, LogOut } from "lucide-react";
import NotificationDropdown from "@/components/ui/NotificationDropdown";
import { useSystemToast } from "@/components/ui/toaster";
import { Toaster } from "sonner";

const navLinks = [
  { href: "/dashboard", label: "Overview" },
  { href: "/dashboard/orders", label: "Orders" },
  { href: "/dashboard/portfolio", label: "Portfolio" },
  { href: "/dashboard/strategies", label: "Strategies" },
];

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const currentYear = new Date().getFullYear();

  useSystemToast();

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 z-40 w-64 md:w-[250px] h-full bg-gray-900 border-r border-gray-800 p-6 transform transition-transform duration-300 ease-in-out md:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white tracking-wide">Botsensai</h1>
          </div>

          <nav className="flex flex-col gap-4 text-sm">
            {navLinks.map((link) => {
              const isActive = pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`transition px-2 py-1 rounded-md ${
                    isActive
                      ? "bg-blue-600/20 text-blue-400 font-medium"
                      : "text-gray-300 hover:text-blue-400"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-gray-800 text-sm space-y-3">
            <Link
              href="/profile"
              className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition"
            >
              <UserCircle2 className="w-4 h-4" /> Profile
            </Link>
            <Link
              href="/logout"
              className="flex items-center gap-2 text-red-400 hover:text-red-500 transition"
            >
              <LogOut className="w-4 h-4" /> Logout
            </Link>
            <div className="text-xs text-gray-600 mt-6">
              © {currentYear} Botsensai. All rights reserved.
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Topbar */}
      <header className="md:hidden sticky top-0 z-30 flex items-center justify-between bg-gray-900 border-b border-gray-800 px-4 py-3 shadow-sm">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <NotificationDropdown />
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            aria-label="Toggle Sidebar"
            className="text-gray-300 hover:text-blue-400 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 md:ml-[250px]">
        {children}
      </main>

      {/* Toast Notifications */}
      <Toaster position="top-right" richColors theme="dark" />
    </div>
  );
}
