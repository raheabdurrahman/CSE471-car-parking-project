
import ProfileDetailsForm from "@/components/ProfileDetailsForm";
import DashboardNavbar from "@/components/DashboardNavbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <DashboardNavbar />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Your Profile Details</h1>
          <ProfileDetailsForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
