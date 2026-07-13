"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";

export default function DeleteButton({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this product? You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      customClass: {
        popup: "rounded-none"
      }
    });
    if (!result.isConfirmed) return;
    
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/gadgets/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      toast.success("Product deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="text-red-500 hover:text-red-600 font-medium text-sm disabled:opacity-50"
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </button>
  );
}
