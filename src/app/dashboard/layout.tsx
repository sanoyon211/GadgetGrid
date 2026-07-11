import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export const metadata = {
  title: "Dashboard | GadgetGrid",
  description: "Manage your GadgetGrid account and orders.",
};

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar */}
          <DashboardSidebar />

          {/* Main Content Area */}
          <main className="flex-1 min-w-0">
            {children}
          </main>

        </div>
      </div>
    </div>
  );
}
