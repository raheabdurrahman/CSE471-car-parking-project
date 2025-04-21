
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import HowItWorks from "@/components/HowItWorks";
import { AdminLoginDialog } from "@/components/AdminLoginDialog";

const HomePage = () => {
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="bg-parkblue py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-8 md:mb-0">
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Welcome to ParkEase!</h1>
                <h2 className="text-2xl md:text-3xl text-white mb-6">
                  Find. Book. Park.<br />Stress-Free!
                </h2>
                {/* FindParkingCard removed as requested */}
              </div>
              {/* Replacing previous image grid with a single large image */}
              <div className="md:w-1/2 flex justify-center">
                <img
                  src="https://images.prismic.io/spothero/ec89cca4-1d92-494d-9702-a300a3e5f9da_airport_parking_homepage.jpg?auto=compress,format"
                  alt="Airport parking"
                  className="rounded-lg max-h-72 w-full object-cover shadow-lg border-4 border-white"
                  style={{ maxWidth: "430px" }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-parkgray-light">
          <div className="container mx-auto px-4">
            <HowItWorks />
          </div>
        </section>

        <div className="container mx-auto px-4 mt-6 mb-10 flex justify-center">
          <Button
            onClick={() => setAdminLoginOpen(true)}
            className="bg-parkblue text-white px-4 py-2 rounded hover:bg-parkblue-dark"
          >
            Admin LOGIN
          </Button>
        </div>
        <AdminLoginDialog open={adminLoginOpen} setOpen={setAdminLoginOpen} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
