import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { FeatherIcon, Heart, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { JournalEntry } from "@shared/schema";

export default function JournalSection() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingEntry, setEditingEntry] = useState<JournalEntry | null>(null);
  const { toast } = useToast();

  const { data: entries, isLoading } = useQuery<JournalEntry[]>({
    queryKey: ["/api/journal-entries"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: { title: string; content: string }) => {
      const response = await apiRequest("POST", "/api/journal-entries", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal-entries"] });
      setTitle("");
      setContent("");
      toast({
        title: "Entry saved",
        description: "Your journal entry has been saved successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to save journal entry.",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { title: string; content: string } }) => {
      const response = await apiRequest("PUT", `/api/journal-entries/${id}`, data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal-entries"] });
      setEditingEntry(null);
      setTitle("");
      setContent("");
      toast({
        title: "Entry updated",
        description: "Your journal entry has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update journal entry.",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/journal-entries/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/journal-entries"] });
      toast({
        title: "Entry deleted",
        description: "Your journal entry has been deleted.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to delete journal entry.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Missing information",
        description: "Please fill in both title and content.",
        variant: "destructive",
      });
      return;
    }

    if (editingEntry) {
      updateMutation.mutate({ id: editingEntry.id, data: { title: title.trim(), content: content.trim() } });
    } else {
      createMutation.mutate({ title: title.trim(), content: content.trim() });
    }
  };

  const handleEdit = (entry: JournalEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setContent(entry.content);
  };

  const handleCancelEdit = () => {
    setEditingEntry(null);
    setTitle("");
    setContent("");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteMutation.mutate(id);
    }
  };

  const formatDate = (date: Date | string) => {
    const d = new Date(date);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (d.toDateString() === today.toDateString()) {
      return "Today";
    } else if (d.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return d.toLocaleDateString();
    }
  };

  return (
    <section className="py-6">
      <div className="space-y-6">
        {/* New Entry Card */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-lavender/10 dark:border-gray-700 animate-slide-up">
          <div className="text-center mb-6">
            <div className="w-12 h-12 bg-peach rounded-full flex items-center justify-center mx-auto mb-3">
              <FeatherIcon className="text-sage text-lg" size={20} />
            </div>
            <h2 className="text-2xl font-semibold text-text-soft dark:text-white mb-2">Journal</h2>
            <p className="text-gray-500 dark:text-gray-300">Reflect on your thoughts and feelings</p>
          </div>

          {/* New Entry Form */}
          <div className="space-y-4">
            <Input
              type="text"
              placeholder="Give your entry a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-4 rounded-xl border border-lavender/30 focus:border-sage focus:ring-1 focus:ring-sage/20"
            />
            <Textarea
              placeholder="What's on your mind today?"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-4 rounded-xl border border-lavender/30 focus:border-sage focus:ring-1 focus:ring-sage/20 resize-none"
            />
            <div className="flex space-x-3">
              {editingEntry && (
                <Button
                  onClick={handleCancelEdit}
                  variant="outline"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-text-soft py-3 px-4 rounded-xl font-medium transition-all duration-200 border-0"
                >
                  Cancel
                </Button>
              )}
              <Button
                onClick={handleSubmit}
                disabled={createMutation.isPending || updateMutation.isPending}
                className="flex-1 bg-gradient-to-r from-sage to-soft-blue hover:shadow-lg text-white py-3 px-4 rounded-xl font-medium transition-all duration-200"
              >
                <Heart className="w-4 h-4 mr-2" />
                {editingEntry ? "Update Entry" : "Save Entry"}
              </Button>
            </div>
          </div>
        </div>

        {/* Journal Entries */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-300">Loading your entries...</p>
            </div>
          ) : entries && entries.length > 0 ? (
            entries.map((entry) => (
              <div
                key={entry.id}
                className="journal-entry rounded-2xl p-5 shadow-md border border-peach/20 dark:border-gray-700 dark:bg-gray-800 animate-slide-up"
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className="font-semibold text-text-soft dark:text-white">{entry.title}</h3>
                  <span className="text-sm text-gray-400 dark:text-gray-400">{formatDate(entry.createdAt)}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">{entry.content}</p>
                <div className="flex space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(entry)}
                    className="text-sage hover:text-sage/80 transition-colors p-2"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(entry.id)}
                    className="text-red-400 hover:text-red-500 transition-colors p-2"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-500 dark:text-gray-300">No journal entries yet. Start writing your first entry above!</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
