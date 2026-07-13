"use client";

import { useState, useEffect } from "react";
import { Mail, MailOpen, Trash2 } from "lucide-react";
import { toast } from "sonner";

export default function ManageMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/admin/messages"); 
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages);
      }
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleReadStatus = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "PUT"
      });
      if (!res.ok) throw new Error("Failed to update status");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to update message status");
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    
    try {
      const res = await fetch(`/api/admin/messages/${id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete message");
      
      toast.success("Message deleted!");
      fetchMessages();
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };

  if (isLoading) {
    return <div className="p-8 animate-pulse text-gray-500">Loading messages...</div>;
  }

  return (
    <div className="bg-transparent">
      <div className="mb-8 pb-4 border-b border-gray-200 dark:border-zinc-800">
        <h2 className="text-2xl font-heading font-bold text-foreground">Support Messages</h2>
        <p className="text-sm text-gray-500 mt-2">View and manage messages from your customers.</p>
      </div>

      <div className="grid gap-4">
        {messages.length === 0 ? (
          <div className="py-12 text-center text-gray-500 border border-dashed border-gray-200 dark:border-zinc-800 rounded-none">
            No messages found.
          </div>
        ) : (
          messages.map((msg: any) => (
            <div 
              key={msg._id} 
              className={`p-6 border rounded-none shadow-sm relative group transition-colors ${msg.isRead ? 'bg-gray-50 dark:bg-zinc-900/50 border-gray-100 dark:border-zinc-900' : 'bg-white dark:bg-zinc-950 border-primary/20 dark:border-primary/20'}`}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className={`text-lg font-bold ${msg.isRead ? 'text-gray-700 dark:text-gray-300' : 'text-foreground'}`}>
                    {msg.subject}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-medium text-sm text-gray-900 dark:text-gray-100">{msg.name}</span>
                    <span className="text-xs text-gray-500 border px-2 py-0.5 rounded-none">{msg.email}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => toggleReadStatus(msg._id)}
                    className="p-2 text-gray-400 hover:text-primary transition-colors"
                    title={msg.isRead ? "Mark as unread" : "Mark as read"}
                  >
                    {msg.isRead ? <MailOpen className="w-4 h-4" /> : <Mail className="w-4 h-4 text-primary" />}
                  </button>
                  <button 
                    onClick={() => deleteMessage(msg._id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    title="Delete Message"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              <div className={`text-sm mt-4 whitespace-pre-wrap ${msg.isRead ? 'text-gray-600 dark:text-gray-400' : 'text-gray-800 dark:text-gray-200'}`}>
                {msg.message}
              </div>
              
              <div className="mt-4 text-xs text-gray-400">
                Received: {new Date(msg.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
