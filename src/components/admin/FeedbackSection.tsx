
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { RefreshCw, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Feedback {
  id: string;
  message: string;
  rating: number;
  email: string;
  user_id: string | null;
  created_at: string;
}

const FeedbackSection = () => {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFeedbacks = async () => {
    setLoading(true);
    console.log("Loading feedbacks...");
    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) {
      toast.error("Failed to load feedbacks: " + error.message);
      setLoading(false);
      return;
    }
    setFeedbacks(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadFeedbacks();
  }, []);

  const handleDeleteFeedback = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this feedback?");
    if (!confirmed) return;
    
    try {
      setLoading(true);
      const { error } = await supabase.from("feedback").delete().eq("id", id);
      if (error) {
        throw error;
      }
      // Update the local state by removing the deleted feedback
      setFeedbacks(feedbacks.filter(feedback => feedback.id !== id));
      toast.success("Feedback deleted successfully.");
    } catch (error: any) {
      toast.error("Failed to delete feedback: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">User Feedback</h2>
        <Button onClick={loadFeedbacks} variant="outline" size="sm" disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh Feedback
        </Button>
      </div>
      {loading ? (
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-parkblue"></div>
          <span className="ml-3">Loading feedbacks...</span>
        </div>
      ) : feedbacks.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No feedback entries found.</p>
          <p className="text-sm text-gray-400 mt-2">
            This could be due to no submissions or a permissions issue.
          </p>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User Email</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {feedbacks.map((fb) => (
              <TableRow key={fb.id}>
                <TableCell>{fb.email}</TableCell>
                <TableCell>{fb.rating}</TableCell>
                <TableCell>{fb.message}</TableCell>
                <TableCell>{new Date(fb.created_at).toLocaleString()}</TableCell>
                <TableCell>
                  <Button 
                    variant="destructive" 
                    size="sm" 
                    onClick={() => handleDeleteFeedback(fb.id)}
                    disabled={loading}
                  >
                    <Trash2 className="inline mr-1 h-4 w-4" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
};

export default FeedbackSection;
