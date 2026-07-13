"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import BackButton from "@/components/globals/BackButton";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  useEffect(() => {
    if (session?.user) {
      setFormData(prev => ({ 
        ...prev, 
        name: session.user.name || "",
        image: session.user.image || ""
      }));
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword && formData.newPassword !== formData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          image: formData.image,
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update settings");

      toast.success("Profile updated successfully!");
      if (formData.name !== session?.user?.name || formData.image !== session?.user?.image) {
        await update({ name: formData.name, image: formData.image });
      }
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <BackButton />
      <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2 mt-6">
        Profile Settings
      </h1>
      <p className="text-gray-500 dark:text-gray-400 mb-8">
        Update your personal information and password.
      </p>

      <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-none p-6 space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-none-full overflow-hidden bg-gray-200 dark:bg-zinc-800 flex items-center justify-center shrink-0">
            {formData.image ? (
              <img src={formData.image} alt="Profile" className="w-full h-full object-cover" />
            ) : (
              <span className="text-xl text-gray-500 font-bold">{formData.name?.charAt(0) || "U"}</span>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Profile Image URL</label>
            <input 
              type="text" 
              name="image" 
              placeholder="https://example.com/avatar.png"
              value={formData.image} 
              onChange={handleChange} 
              className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" 
            />
          </div>
        </div>

        <div>
          <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Name</label>
          <input 
            type="text" 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" 
          />
        </div>

        <div className="pt-4 border-t border-gray-100 dark:border-zinc-800">
          <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300 mb-4">Change Password (Optional)</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Current Password</label>
              <input 
                type="password" 
                name="currentPassword" 
                value={formData.currentPassword} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">New Password</label>
              <input 
                type="password" 
                name="newPassword" 
                value={formData.newPassword} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" 
              />
            </div>
            
            <div>
              <label className="block text-xs uppercase tracking-widest font-bold text-gray-500 mb-2">Confirm New Password</label>
              <input 
                type="password" 
                name="confirmPassword" 
                value={formData.confirmPassword} 
                onChange={handleChange} 
                className="w-full px-4 py-3 bg-transparent border-b border-gray-200 dark:border-zinc-800 text-foreground focus:outline-none focus:border-foreground transition-colors" 
              />
            </div>
          </div>
        </div>

        <button disabled={isLoading} type="submit" className="flex items-center justify-center w-full sm:w-auto gap-2 px-8 py-3 bg-foreground text-background font-medium rounded-none hover:bg-foreground/90 transition-colors disabled:opacity-50 mt-8">
          <Save className="w-4 h-4" />
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
