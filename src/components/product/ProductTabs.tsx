"use client";

import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export default function ProductTabs({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("description");
  const [reviews, setReviews] = useState<any[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (activeTab === "reviews") {
      fetch(`/api/gadgets/${product._id}/reviews`)
        .then(res => res.json())
        .then(data => setReviews(data.reviews || []))
        .catch(err => console.error("Error fetching reviews:", err));
    }
  }, [activeTab, product._id]);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast.error("You must be logged in to review");
      return;
    }
    
    try {
      const res = await fetch(`/api/gadgets/${product._id}/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating, comment }),
      });
      
      const data = await res.json();
      
      if (res.ok) {
        toast.success("Review added!");
        setReviews([data.review, ...reviews]);
        setShowForm(false);
        setComment("");
        setRating(5);
      } else {
        toast.error(data.message || "Failed to add review");
      }
    } catch (err) {
      toast.error("Failed to add review");
    }
  };

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${Math.max(product.reviews || 0, reviews.length)})` }
  ];

  return (
    <div className="mt-16">
      <div className="border-b border-gray-200 dark:border-zinc-800">
        <nav className="-mb-px flex space-x-8 overflow-x-auto scrollbar-hide whitespace-nowrap pb-1" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-base transition-colors
                ${activeTab === tab.id
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="pt-8 pb-16">
        {/* Description Tab */}
        {activeTab === "description" && (
          <div className="prose prose-blue dark:prose-invert max-w-none">
            <h3 className="text-xl font-heading font-semibold mb-4 text-gray-900 dark:text-white">Product Overview</h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6 whitespace-pre-wrap">
              {product.description}
            </p>
          </div>
        )}

        {/* Specifications Tab */}
        {activeTab === "specifications" && (
          <div className="max-w-3xl">
            <h3 className="text-xl font-heading font-semibold mb-6 text-gray-900 dark:text-white">Technical Specifications</h3>
            <div className="border border-gray-200 dark:border-zinc-800 rounded-none overflow-hidden">
              <dl className="divide-y divide-gray-200 dark:divide-zinc-800">
                {product.specifications && Object.keys(product.specifications).length > 0 ? (
                  Object.entries(product.specifications).map(([key, value], idx) => (
                    <div key={idx} className="bg-white dark:bg-black px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                      <dt className="text-sm font-medium text-gray-500 dark:text-gray-400">{key}</dt>
                      <dd className="mt-1 text-sm text-gray-900 dark:text-white sm:mt-0 sm:col-span-2 font-medium">{value as React.ReactNode}</dd>
                    </div>
                  ))
                ) : (
                  <div className="bg-white dark:bg-black px-4 py-5 sm:px-6 text-sm text-gray-500 dark:text-gray-400">
                    No specifications available for this product.
                  </div>
                )}
              </dl>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === "reviews" && (
          <div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
              <div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">Customer Reviews</h3>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                    ))}
                  </div>
                  <span className="font-medium text-gray-900 dark:text-white">{product.rating} out of 5</span>
                </div>
              </div>
              <button 
                onClick={() => setShowForm(!showForm)}
                className="mt-4 sm:mt-0 px-6 py-2.5 border-2 border-primary text-primary dark:text-white font-medium rounded-none hover:bg-primary hover:text-white dark:hover:text-black transition-colors"
              >
                {showForm ? "Cancel" : "Write a Review"}
              </button>
            </div>

            {showForm && (
              <form onSubmit={handleSubmitReview} className="mb-10 bg-gray-50 dark:bg-zinc-900/50 p-6 rounded-none border border-gray-100 dark:border-zinc-800">
                <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Write a Review</h4>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={`w-8 h-8 rounded-none flex items-center justify-center border ${rating >= star ? 'border-yellow-400 bg-yellow-50 dark:bg-yellow-400/10' : 'border-gray-200 dark:border-zinc-700'}`}
                      >
                        <Star className={`w-4 h-4 ${rating >= star ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
                      </button>
                    ))}
                  </div>
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment</label>
                  <textarea
                    required
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 dark:border-zinc-700 rounded-none bg-white dark:bg-zinc-950 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-all text-sm"
                    placeholder="Share your thoughts about this product..."
                  />
                </div>
                <div className="flex justify-end gap-3">
                  <button type="submit" className="bg-primary text-white dark:text-black px-6 py-2.5 rounded-none font-medium hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30 min-h-[44px]">
                    Submit Review
                  </button>
                </div>
              </form>
            )}

            <div className="space-y-8">
              {reviews.length === 0 ? (
                <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
              ) : (
                reviews.map((review: any) => (
                  <div key={review._id} className="pb-8 border-b border-gray-100 dark:border-zinc-800 last:border-0 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                          {review.user?.name?.charAt(0) || "U"}
                        </div>
                        <span className="font-semibold text-gray-900 dark:text-white">{review.user?.name || "Unknown"}</span>
                      </div>
                      <span className="text-sm text-gray-500">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 dark:text-gray-600'}`} />
                      ))}
                    </div>
                    <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
