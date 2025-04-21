
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogClose } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface AdminLoginDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Admin credentials
const ADMIN_EMAIL = "tazower000sowad@gmail.com";
const ADMIN_PASSWORD = "sWd@2001#";

export function AdminLoginDialog({ open, setOpen }: AdminLoginDialogProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    
    if (
      email.trim() === ADMIN_EMAIL &&
      password === ADMIN_PASSWORD
    ) {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminEmail", email);
      toast.success("Admin logged in successfully!");
      setOpen(false);
      setEmail("");
      setPassword("");
      navigate("/admin");
    } else {
      toast.error("Invalid admin credentials");
    }
    setIsLoggingIn(false);
  };

  const handleGoogleSignIn = async () => {
    toast.info("Checking credentials via Google...");
    // In a real app, we would integrate with Google Auth here.
    // For this demo, we'll simulate by directly checking the email
    if (ADMIN_EMAIL === "tazower000sowad@gmail.com") {
      localStorage.setItem("isAdmin", "true");
      localStorage.setItem("adminEmail", ADMIN_EMAIL);
      toast.success("Admin logged in successfully via Google!");
      setOpen(false);
      navigate("/admin");
    } else {
      toast.error("This Google account is not authorized for admin access");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogTitle>Admin Login</DialogTitle>
        <DialogDescription>Enter your admin email and password or use Google authentication.</DialogDescription>
        <form onSubmit={handleAdminLogin} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Input
              type="email"
              placeholder="Email (e.g., tazower000sowad@gmail.com)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoggingIn}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isLoggingIn}
              required
            />
          </div>
          <div className="flex justify-end space-x-2 mt-2">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                disabled={isLoggingIn}
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-parkblue text-white hover:bg-parkblue-dark"
              disabled={isLoggingIn}
            >
              {isLoggingIn ? "Logging in..." : "Login"}
            </Button>
          </div>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or</span>
          </div>
        </div>
        
        <Button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            <path d="M1 1h22v22H1z" fill="none" />
          </svg>
          Continue with Google
        </Button>
      </DialogContent>
    </Dialog>
  );
}
