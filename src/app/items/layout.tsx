import { ReactNode } from "react";

export const metadata = {
  title: "Manage Items | GadgetGrid",
  description: "Manage your GadgetGrid items.",
};

export default function ItemsLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-50 dark:bg-black min-h-screen">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
    </div>
  );
}
