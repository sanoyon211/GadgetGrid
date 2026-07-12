import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata = {
  title: "Manage Items | GadgetGrid",
  description: "Manage your GadgetGrid items.",
};

export default function ItemsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <div className="flex flex-col lg:flex-row min-h-screen">
        
        {/* Sidebar */}
        <DashboardSidebar />

        {/* Main Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-8 lg:p-12">
          {children}
        </main>

      </div>
    </div>
  );
}
