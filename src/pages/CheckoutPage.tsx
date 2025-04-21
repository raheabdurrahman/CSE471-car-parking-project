
import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin, Clock, User } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParkCard } from "@/components/ui/park-card";
import { ParkEaseButton } from "@/components/ui/parkease-button";

const CheckoutPage = () => {
  const [driverName, setDriverName] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-parkgray-light">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">Parking Details</h1>
          
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <ParkCard className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Driver's Information</h2>
                </div>
                
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">Driver's Name</label>
                  <div className="relative">
                    <input 
                      type="text"
                      className="park-input pl-8"
                      placeholder="Enter full name"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                    />
                    <User className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </ParkCard>
              
              <ParkCard className="mb-6">
                <div className="mb-4">
                  <h2 className="text-xl font-bold mb-2">Selected parking spot address</h2>
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 mr-2 text-gray-500 mt-0.5" />
                    <p>Downtown Garage<br />123 Main Street, Downtown</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-bold mb-2">Booking time slot</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium mb-1">Start</p>
                      <p className="text-sm text-gray-600">Apr 19, 2025 10:00 AM</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-1">End</p>
                      <p className="text-sm text-gray-600">Apr 19, 2025 6:00 PM</p>
                    </div>
                  </div>
                </div>
              </ParkCard>
              
              <div className="text-center">
                <Link to="/payment">
                  <ParkEaseButton className="w-full flex items-center justify-center">
                    <span className="mr-2">💳</span> Proceed to checkout
                  </ParkEaseButton>
                </Link>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <ParkCard>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">Parking Details</h2>
                </div>
                
                <div className="flex justify-center mb-8">
                  <div className="w-48">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" className="w-full">
                      <rect x="5" y="5" width="90" height="70" fill="#67ADF2" rx="5" />
                      <text x="50" y="30" fontFamily="Arial" fontSize="18" fill="white" textAnchor="middle">P</text>
                      <rect x="20" y="40" width="60" height="20" fill="white" rx="5" />
                      <circle cx="35" cy="50" r="5" fill="#333" />
                      <circle cx="65" cy="50" r="5" fill="#333" />
                      <rect x="30" y="45" width="40" height="10" fill="#555" rx="2" />
                    </svg>
                  </div>
                </div>
                
                <div className="border-t border-parkgray-DEFAULT pt-4 mb-4">
                  <h3 className="font-bold mb-4">Price Summary</h3>
                  <div className="flex justify-between mb-2">
                    <span>Parking fee (8 hours)</span>
                    <span>$16.00</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span>Service fee</span>
                    <span>$2.00</span>
                  </div>
                  <div className="border-t border-parkgray-DEFAULT mt-4 pt-4 flex justify-between font-bold">
                    <span>Total fare</span>
                    <span>$18.00</span>
                  </div>
                </div>
              </ParkCard>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CheckoutPage;
