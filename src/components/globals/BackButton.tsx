"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function BackButton() {
  const router = useRouter();
  
  return (
    <button 
      onClick={() => router.back()} 
      className="flex items-center gap-2 text-gray-500 hover:text-foreground transition-colors mb-6 text-sm font-medium"
    >
      <ArrowLeft className="w-4 h-4" />
      Back
    </button>
  );
}
