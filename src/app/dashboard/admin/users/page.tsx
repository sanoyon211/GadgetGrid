"use client";

import { useState, useEffect } from "react";
import { Users, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users"); 
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setIsLoading(false);
    }
  };

  const updateRole = async (id: string, role: string) => {
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role })
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update role");
      }
      
      toast.success("User role updated!");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to update user role");
    }
  };

  const deleteUser = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this user? You won't be able to revert this!",
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
    
    try {
      const res = await fetch(`/api/admin/users/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete user");
      }
      
      toast.success("User deleted!");
      fetchUsers();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete user");
    }
  };

  if (isLoading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading users...</div>;
  }

  return (
    <div className="bg-transparent">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Manage Users</h2>
        <p className="text-sm text-gray-500 mt-2">View customers and manage admin roles.</p>
      </div>

      <div className="overflow-x-auto">
        {/* Desktop Table View */}
        <table className="hidden md:table w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-foreground text-xs uppercase tracking-widest font-bold text-foreground">
              <th className="py-4 px-4 font-normal">Name</th>
              <th className="py-4 px-4 font-normal">Email</th>
              <th className="py-4 px-4 font-normal">Joined</th>
              <th className="py-4 px-4 font-normal">Role</th>
              <th className="py-4 px-4 font-normal text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
            {users.map((user: any) => {
              const isCurrentUser = session?.user?.email === user.email;
              return (
                <tr key={user._id} className="hover:bg-gray-50 dark:hover:bg-zinc-900/50 transition-colors">
                  <td className="py-4 px-4 font-medium text-foreground">{user.name} {isCurrentUser && "(You)"}</td>
                  <td className="py-4 px-4 text-sm text-gray-500">{user.email}</td>
                  <td className="py-4 px-4 text-xs text-gray-500">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-4 px-4">
                    <select 
                      className={`text-sm border ${user.role === 'admin' ? 'border-primary text-primary' : 'border-gray-200 text-foreground dark:border-zinc-800'} bg-transparent px-3 py-2 rounded-none outline-none font-medium h-12`}
                      value={user.role}
                      disabled={isCurrentUser}
                      onChange={(e) => updateRole(user._id, e.target.value)}
                    >
                      <option value="user">USER</option>
                      <option value="admin">ADMIN</option>
                    </select>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button 
                      onClick={() => deleteUser(user._id)}
                      disabled={isCurrentUser}
                      className="p-3 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:hover:text-gray-400 min-w-[44px] min-h-[44px] inline-flex items-center justify-center border border-transparent hover:border-red-500/20"
                      title="Delete User"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile Card View */}
        <div className="grid grid-cols-1 gap-4 md:hidden">
          {users.map((user: any) => {
            const isCurrentUser = session?.user?.email === user.email;
            return (
              <div key={`mobile-${user._id}`} className="bg-white dark:bg-zinc-950 p-4 border border-gray-200 dark:border-zinc-800 shadow-sm space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="text-xs text-gray-500 uppercase tracking-widest block mb-1">Name</span>
                    <div className="font-medium text-sm text-foreground">{user.name} {isCurrentUser && <span className="text-primary text-xs ml-1">(You)</span>}</div>
                  </div>
                  <button 
                    onClick={() => deleteUser(user._id)}
                    disabled={isCurrentUser}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:hover:text-gray-400 min-w-[44px] min-h-[44px] flex items-center justify-center border border-transparent hover:border-red-500/20"
                    title="Delete User"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
                
                <div>
                  <span className="text-xs text-gray-500 block mb-1">Email</span>
                  <div className="text-sm text-gray-700 dark:text-gray-300">{user.email}</div>
                </div>

                <div className="flex justify-between items-center pt-3 border-t border-gray-100 dark:border-zinc-800 mt-2">
                  <div>
                    <span className="text-xs text-gray-500 block mb-1">Joined</span>
                    <div className="text-xs">{new Date(user.createdAt).toLocaleDateString()}</div>
                  </div>
                  <select 
                    className={`text-sm border ${user.role === 'admin' ? 'border-primary text-primary' : 'border-gray-200 text-foreground dark:border-zinc-800'} bg-transparent px-2 py-1 rounded-none outline-none font-medium h-12`}
                    value={user.role}
                    disabled={isCurrentUser}
                    onChange={(e) => updateRole(user._id, e.target.value)}
                  >
                    <option value="user">USER</option>
                    <option value="admin">ADMIN</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
        {users.length === 0 && (
          <div className="py-12 text-center text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
}
