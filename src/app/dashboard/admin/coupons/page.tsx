"use client";

import { useState, useEffect } from "react";
import { Ticket, Plus, Trash2, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

export default function ManageCouponsPage() {
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    discountPercentage: "",
    expiresAt: ""
  });

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const res = await fetch("/api/admin/coupons"); 
      if (res.ok) {
        const data = await res.json();
        setCoupons(data.coupons);
      }
    } catch (error) {
      toast.error("Failed to fetch coupons");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    try {
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      toast.success("Coupon added successfully!");
      setFormData({ code: "", discountPercentage: "", expiresAt: "" });
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.message || "Failed to add coupon");
    } finally {
      setIsAdding(false);
    }
  };

  const toggleStatus = async (id: string, currentStatus: boolean) => {
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !currentStatus })
      });
      if (!res.ok) throw new Error("Failed to update status");
      
      toast.success("Status updated!");
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.message || "Failed to update status");
    }
  };

  const deleteCoupon = async (id: string) => {
    if (!confirm("Are you sure you want to delete this coupon?")) return;
    
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete coupon");
      
      toast.success("Coupon deleted!");
      fetchCoupons();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete coupon");
    }
  };

  return (
    <div className="bg-transparent">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Manage Coupons</h2>
        <p className="text-sm text-gray-500 mt-2">Create discount codes for your customers.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Create Form */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-zinc-950 p-6 border border-gray-100 dark:border-zinc-900 rounded-lg shadow-sm">
            <h3 className="font-bold mb-4 flex items-center gap-2"><Plus className="w-4 h-4"/> Add New Coupon</h3>
            <form onSubmit={handleAddCoupon} className="space-y-4">
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Code</label>
                <input required type="text" value={formData.code} onChange={(e)=>setFormData({...formData, code: e.target.value.toUpperCase()})} placeholder="e.g. EID20" className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-800 bg-transparent rounded focus:outline-none focus:border-primary uppercase" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Discount (%)</label>
                <input required type="number" min="1" max="100" value={formData.discountPercentage} onChange={(e)=>setFormData({...formData, discountPercentage: e.target.value})} placeholder="20" className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-800 bg-transparent rounded focus:outline-none focus:border-primary" />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-1">Expiry Date</label>
                <input required type="date" value={formData.expiresAt} onChange={(e)=>setFormData({...formData, expiresAt: e.target.value})} className="w-full px-3 py-2 border border-gray-200 dark:border-zinc-800 bg-transparent rounded focus:outline-none focus:border-primary" />
              </div>
              <button disabled={isAdding} type="submit" className="w-full bg-foreground text-background py-2 font-medium hover:bg-foreground/90 disabled:opacity-50 transition-colors rounded">
                {isAdding ? "Adding..." : "Create Coupon"}
              </button>
            </form>
          </div>
        </div>

        {/* List */}
        <div className="lg:col-span-2">
          {isLoading ? (
            <div className="p-8 animate-pulse text-gray-500 text-center">Loading coupons...</div>
          ) : coupons.length === 0 ? (
            <div className="p-12 text-center text-gray-500 border border-dashed border-gray-200 dark:border-zinc-800 rounded-lg">
              No coupons created yet.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {coupons.map((coupon: any) => {
                const isExpired = new Date(coupon.expiresAt) < new Date();
                return (
                  <div key={coupon._id} className="p-4 bg-white dark:bg-zinc-950 border border-gray-100 dark:border-zinc-900 rounded-lg shadow-sm relative group flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <div className="font-mono text-xl font-bold tracking-widest text-primary">{coupon.code}</div>
                        <button 
                          onClick={() => toggleStatus(coupon._id, coupon.isActive)}
                          className={`text-xs px-2 py-1 rounded font-bold uppercase tracking-widest ${coupon.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-gray-400'}`}
                        >
                          {coupon.isActive ? "Active" : "Inactive"}
                        </button>
                      </div>
                      <div className="text-2xl font-black mt-2">{coupon.discountPercentage}% OFF</div>
                      <div className={`text-xs mt-4 flex items-center gap-1 ${isExpired ? 'text-red-500 font-bold' : 'text-gray-500'}`}>
                        {isExpired ? <XCircle className="w-3 h-3" /> : <CheckCircle2 className="w-3 h-3" />}
                        {isExpired ? "Expired" : "Expires"}: {new Date(coupon.expiresAt).toLocaleDateString()}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => deleteCoupon(coupon._id)}
                      className="absolute bottom-4 right-4 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
