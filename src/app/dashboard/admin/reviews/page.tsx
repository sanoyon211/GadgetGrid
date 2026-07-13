"use client";

import { useState, useEffect } from "react";
import { MessageSquare, Trash2, Star } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function ManageReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/admin/reviews"); 
      if (res.ok) {
        const data = await res.json();
        setReviews(data.reviews);
      }
    } catch (error) {
      toast.error("Failed to fetch reviews");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteReview = async (id: string) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      const res = await fetch(`/api/admin/reviews/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete review");
      }
      
      toast.success("Review deleted!");
      fetchReviews();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  if (isLoading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading reviews...</div>;
  }

  return (
    <div className="bg-transparent">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Manage Reviews</h2>
        <p className="text-sm text-gray-500 mt-2">Monitor and moderate customer reviews across all products.</p>
      </div>

      <div className="grid gap-6">
        {reviews.length === 0 ? (
          <div className="py-12 text-center text-gray-500 border border-dashed border-gray-200 dark:border-zinc-800 rounded-none">
            No reviews found.
          </div>
        ) : (
          reviews.map((review: any) => (
            <div key={review._id} className="p-6 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 shadow-sm relative group">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <div className="font-medium text-foreground">{review.user?.name || "Unknown User"}</div>
                    <span className="text-gray-400 text-xs px-2 py-0.5 border border-gray-200 dark:border-zinc-800 rounded-none">
                      {review.user?.email}
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 flex items-center gap-2">
                    <span>Reviewed:</span>
                    <Link href={`/product/${review.gadget?._id}`} className="text-primary hover:underline font-medium">
                      {review.gadget?.name || "Deleted Product"}
                    </Link>
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-4 h-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200 dark:text-zinc-800"}`} 
                    />
                  ))}
                </div>
              </div>
              
              <div className="text-gray-700 dark:text-gray-300 text-sm mt-4 bg-gray-50 dark:bg-zinc-900/50 p-4 rounded-none border-l-2 border-primary italic">
                "{review.comment}"
              </div>
              
              <div className="mt-4 flex justify-between items-center text-xs text-gray-400">
                <span>{new Date(review.createdAt).toLocaleString()}</span>
                <button 
                  onClick={() => deleteReview(review._id)}
                  className="flex items-center gap-1 text-red-500 hover:text-red-700 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
