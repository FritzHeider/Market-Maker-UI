// /components/ui/Sidebar.tsx or Header.tsx

import PortfolioCard from "@/components/ui/PortfolioCard";

export const Sidebar = () => {
  return (
    <aside className="bg-gray-900 text-white p-4 space-y-4">
      <h2 className="text-lg font-semibold">Account</h2>
      <PortfolioCard />
    </aside>
  );
};
