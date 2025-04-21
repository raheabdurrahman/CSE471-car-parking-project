
import { useState } from "react";
import { Bell, LogOut } from "lucide-react";
import { useAuth } from "./AuthProvider";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const DashboardNavbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);

  const { user } = useAuth();
  const navigate = useNavigate();

  // Sign out handler
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setMenuOpen(false);
    navigate("/");
  };

  return (
    <nav className="bg-parkblue py-2 px-4 relative">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-white font-medium">Dashboard</span>
        </div>
        <div className="flex items-center space-x-4 relative">
          {/* Notification Bell */}
          <button
            aria-label="Open notifications"
            onClick={() => setNotifOpen((prev) => !prev)}
            className="relative p-1 rounded-full hover:bg-parkblue-light/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-parkblue"
          >
            <Bell className="text-white h-5 w-5" />
          </button>
          {/* Notification dropdown */}
          {notifOpen && (
            <div
              className="absolute right-0 mt-10 w-72 bg-white shadow-xl rounded-md z-40 border"
              onMouseLeave={() => setNotifOpen(false)}
            >
              <div className="p-4 border-b font-semibold">Notifications</div>
              <div className="p-4 text-sm text-gray-500">
                (No notifications yet)
              </div>
            </div>
          )}
          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setMenuOpen((x) => !x)}
              aria-label="Open user menu"
              className="p-1 rounded-full bg-white/10 hover:bg-white/20 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-parkblue"
            >
              {/* Use first letter of username/email or user icon */}
              {user?.email ? (
                <span className="font-bold bg-parkblue-light rounded-full px-2 py-1 text-parkblue-dark">
                  {(user.user_metadata?.name?.[0] ||
                    user.email[0]?.toUpperCase())}
                </span>
              ) : (
                <span className="font-bold bg-parkblue-light rounded-full px-2 py-1 text-parkblue-dark">
                  U
                </span>
              )}
            </button>
            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded z-40 py-2 border"
                onMouseLeave={() => setMenuOpen(false)}
              >
                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default DashboardNavbar;
