// File: /components/ui/ProfileDropdown.tsx

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserCircle2, Settings, LogOut } from "lucide-react";

export default function ProfileDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2 text-sm text-white hover:text-blue-400 focus:outline-none">
        <UserCircle2 className="w-6 h-6" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 bg-gray-800 border border-gray-700 text-sm">
        <DropdownMenuItem asChild>
          <a href="/profile" className="flex items-center gap-2 px-2 py-1.5 text-white hover:bg-gray-700">
            <UserCircle2 className="w-4 h-4" /> Profile
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/settings" className="flex items-center gap-2 px-2 py-1.5 text-white hover:bg-gray-700">
            <Settings className="w-4 h-4" /> Settings
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a href="/logout" className="flex items-center gap-2 px-2 py-1.5 text-red-400 hover:bg-gray-700">
            <LogOut className="w-4 h-4" /> Logout
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
