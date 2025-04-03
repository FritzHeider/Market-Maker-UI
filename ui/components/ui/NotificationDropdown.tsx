"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { useToastStore } from "@/lib/stores/toastStore";

export default function NotificationDropdown() {
  const toasts = useToastStore((s) => s.toasts);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="relative p-2 hover:text-blue-400 transition">
        <Bell className="w-5 h-5 text-gray-400" />
        {toasts.length > 0 && (
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
        )}
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-gray-900 text-white w-72 p-2">
        <DropdownMenuLabel className="text-xs text-gray-400">
          Notifications
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {toasts.length === 0 ? (
          <DropdownMenuItem className="text-sm text-gray-500">
            No recent notifications
          </DropdownMenuItem>
        ) : (
          toasts.map((n, i) => (
            <DropdownMenuItem
              key={i}
              className="flex flex-col items-start space-y-1 text-sm"
            >
              <span className="font-medium">{n.title}</span>
              {n.description && (
                <span className="text-xs text-gray-400">{n.description}</span>
              )}
              <span className="text-xs text-gray-500 mt-1">
                {new Date(n.timestamp).toLocaleTimeString()}
              </span>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
