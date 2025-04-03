"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import { Menu, UserCircle2, LogOut, Bell } from "lucide-react";
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
    <div className="min-h-screen bg-gray-950 text-white flex flex-col md:grid md:grid-cols-[250px_1fr]">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 bg-gray-900 border-r border-gray-800 p-6 h-full md:h-auto transform transition-transform duration-300 ease-in-out overflow-y-auto md:overflow-visible ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <h2 className="text-xl font-bold mb-6">Botsensai</h2>

        <nav className="flex flex-col gap-4 text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`transition hover:text-blue-400 ${
                pathname.startsWith(link.href)
                  ? "text-blue-400 font-medium"
                  : "text-gray-300"
              }`}
              onClick={() => setSidebarOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="mt-auto flex flex-col gap-4 text-sm text-gray-400 border-t border-gray-800 pt-4">
          <Link
            href="/profile"
            className="flex items-center gap-2 hover:text-blue-400"
          >
            <UserCircle2 className="w-4 h-4" /> Profile
          </Link>
          <Link
            href="/logout"
            className="flex items-center gap-2 hover:text-red-400"
          >
            <LogOut className="w-4 h-4" /> Logout
          </Link>
          <div className="text-xs text-gray-500 mt-4">
            © {currentYear} Botsensai
          </div>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-800 sticky top-0 z-30">
        <h2 className="text-lg font-bold">Dashboard</h2>
        <div className="flex items-center gap-4">
          <button aria-label="Notifications" className="hover:text-blue-400 transition">
            <Bell className="w-5 h-5 text-gray-400" />
          </button>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle Menu"
            className="hover:text-blue-400 transition"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6 overflow-y-auto md:ml-0">{children}</main>

      {/* Toasts */}
      <Toaster position="top-right" richColors theme="dark" />
    </div>
  );
}
