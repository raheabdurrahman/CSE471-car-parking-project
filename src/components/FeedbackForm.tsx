
import React, { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Star, StarOff } from "lucide-react";

interface FeedbackFormProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const MAX_RATING = 5;

const FeedbackForm: React.FC<FeedbackFormProps> = ({ open: controlledOpen, onOpenChange }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating < 1 || rating > MAX_RATING) {
      toast.error("Please provide a rating between 1 and 5 stars.");
      return;
    }
    if (!message.trim()) {
      toast.error("Please enter your feedback message.");
      return;
    }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setSubmitting(true);
    try {
      // Get current user if logged in
      const { data } = await supabase.auth.getUser();
      const user = data?.user;
      
      console.log("Submitting feedback with email:", email);
      
      const { error } = await supabase.from("feedback").insert({
        user_id: user?.id || null,
        email: email,
        message: message.trim(),
        rating,
      });
      
      if (error) throw error;
      
      toast.success("Feedback submitted successfully!");
      setRating(0);
      setMessage("");
      setEmail("");
      onOpenChange?.(false);
    } catch (error: any) {
      console.error("Error submitting feedback:", error);
      toast.error(error.message || "Failed to submit feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  const renderStar = (index: number) => {
    if (index < rating) {
      return (
        <Star
          key={index}
          className="cursor-pointer text-yellow-400"
          onClick={() => setRating(index + 1)}
          data-testid={`star-${index}`}
        />
      );
    }
    return (
      <StarOff
        key={index}
        className="cursor-pointer text-gray-400"
        onClick={() => setRating(index + 1)}
        data-testid={`star-${index}`}
      />
    );
  };

  return (
    <Dialog open={controlledOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogTitle>Feedback</DialogTitle>
        <DialogDescription>
          Please rate the app and share your feedback.
        </DialogDescription>
        <div className="flex space-x-2 my-3">
          {[...Array(MAX_RATING)].map((_, idx) => renderStar(idx))}
        </div>
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={submitting}
          className="mb-3"
        />
        <Textarea
          placeholder="Write your feedback here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={5}
          disabled={submitting}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <DialogClose asChild>
            <Button variant="outline" disabled={submitting}>
              Cancel
            </Button>
          </DialogClose>
          <Button onClick={handleSubmit} disabled={submitting}>
            {submitting ? "Sending..." : "Send Feedback"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackForm;
