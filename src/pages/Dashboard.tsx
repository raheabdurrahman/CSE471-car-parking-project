
import { useState } from "react";
import { Link } from "react-router-dom";
import { ParkCard } from "@/components/ui/park-card";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/components/AuthProvider";
import FeedbackForm from "@/components/FeedbackForm";

const Dashboard = () => {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { user } = useAuth();

  // Show username if exists, else email before @
  let welcomeName = "Guest";
  if (user) {
    if (user.user_metadata?.name && user.user_metadata.name !== "") {
      welcomeName = user.user_metadata.name;
    } else if (user.email) {
      welcomeName = user.email.split("@")[0];
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />

      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col gap-4 mb-8">
            <h1 className="text-2xl font-bold">Welcome, {welcomeName}!</h1>
            <span className="text-gray-600">Driver's Dashboard</span>
          </div>

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link to="/find-parking" className="block">
              <ParkCard className="h-full hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2">Book a parking spot</h3>
                <p className="text-sm text-gray-600">Find and reserve your next parking space</p>
              </ParkCard>
            </Link>

            <Link to="/booking-history" className="block">
              <ParkCard className="h-full hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2">View Booking History</h3>
                <p className="text-sm text-gray-600">Review your past and upcoming reservations</p>
              </ParkCard>
            </Link>

            {/* Link to profile details for update */}
            <Link to="/profile" className="block">
              <ParkCard className="h-full hover:shadow-md transition-shadow">
                <h3 className="font-bold mb-2">View/Update Personal Details</h3>
                <p className="text-sm text-gray-600">Manage your account information</p>
              </ParkCard>
            </Link>

            <button
              onClick={() => setFeedbackOpen(true)}
              className="block text-left"
              aria-label="Open Feedback Form"
            >
              <ParkCard className="h-full hover:shadow-md transition-shadow cursor-pointer">
                <h3 className="font-bold mb-2">Feedback</h3>
                <p className="text-sm text-gray-600">Share your experience with us</p>
              </ParkCard>
            </button>
          </div>

          {/* How It Works Section */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">How ParkEase Works</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-parkblue-light rounded-full p-3 flex-shrink-0">
                    <span className="text-parkblue-dark font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Search and compare prices</h3>
                    <p className="text-gray-600">Find parking spots at your desired location</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-parkblue-light rounded-full p-3 flex-shrink-0">
                    <span className="text-parkblue-dark font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Book to secure a prepaid parking place</h3>
                    <p className="text-gray-600">Reserve your spot, receiving email or in-app confirmation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-parkblue-light rounded-full p-3 flex-shrink-0">
                    <span className="text-parkblue-dark font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-bold mb-1">Park with ease</h3>
                    <p className="text-gray-600">When you arrive, follow the instructions provided in your booking confirmation</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* FeedbackForm component */}
      <FeedbackForm open={feedbackOpen} onOpenChange={setFeedbackOpen} />
    </div>
  );
};

export default Dashboard;
