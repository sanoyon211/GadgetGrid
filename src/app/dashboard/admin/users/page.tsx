"use client";

import { useState, useEffect } from "react";
import { Users, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

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
    if (!confirm("Are you sure you want to delete this user?")) return;
    
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
        <table className="w-full text-left border-collapse">
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
                      className={`text-xs border ${user.role === 'admin' ? 'border-primary text-primary' : 'border-gray-200 text-foreground dark:border-zinc-800'} bg-transparent px-2 py-1 rounded outline-none font-medium`}
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
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50 disabled:hover:text-gray-400"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {users.length === 0 && (
          <div className="py-12 text-center text-gray-500">No users found.</div>
        )}
      </div>
    </div>
  );
}
