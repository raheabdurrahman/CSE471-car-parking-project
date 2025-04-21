
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import FeedbackSection from "@/components/admin/FeedbackSection";
import ParkingSpotsSection from "@/components/admin/ParkingSpotsSection";
import UserManagementSection from "@/components/admin/UserManagementSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const AdminDashboard = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated as admin
    const adminStatus = localStorage.getItem("isAdmin");
    if (adminStatus !== "true") {
      toast.error("Unauthorized access. Please login as admin.");
      navigate("/");
    } else {
      setIsAdmin(true);
    }
    setIsLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("adminEmail");
    toast.success("Admin logged out successfully");
    navigate("/");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-parkblue"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-gray-600">
              {localStorage.getItem("adminEmail") || "Admin"}
            </span>
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
        <FeedbackSection />
        <ParkingSpotsSection />
        <UserManagementSection />
      </main>
      <Footer />
    </div>
  );
};

export default AdminDashboard;
