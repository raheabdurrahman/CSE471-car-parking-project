
import { Link } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import { Button } from "./ui/button";
import { supabase } from "@/integrations/supabase/client";

const Navbar = () => {
  const { user } = useAuth();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <nav className="bg-parkblue py-2 px-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex space-x-4">
          <Link to="/" className="text-white font-medium">Home</Link>
          {user && <Link to="/find-parking" className="text-white">Find Parking</Link>}
        </div>
        <div className="flex space-x-4">
          {user ? (
            <>
              <Link to="/dashboard" className="text-white">Dashboard</Link>
              <Button 
                variant="outline" 
                className="text-white hover:text-parkblue hover:bg-white"
                onClick={handleSignOut}
              >
                Sign Out
              </Button>
            </>
          ) : (
            <Link to="/auth" className="text-white">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
