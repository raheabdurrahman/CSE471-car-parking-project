import { useState } from "react";
import { Link } from "react-router-dom";
import { MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParkCard } from "@/components/ui/park-card";
import { ParkEaseButton } from "@/components/ui/parkease-button";
import DateSelector from "@/components/DateSelector";
import TimeSelector from "@/components/TimeSelector";
import MapPlaceholder from "@/components/MapPlaceholder";
import Map from "@/components/Map";

const ReserveSpot = () => {
  const [entryDate, setEntryDate] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [exitTime, setExitTime] = useState("");
  const [address, setAddress] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-parkgray-light">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Reserve your spot</h1>
            <Link to="/find-parking">
              <ParkEaseButton variant="secondary">Back</ParkEaseButton>
            </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="w-full lg:w-1/2">
              <ParkCard className="mb-6">
                <h2 className="text-xl font-bold mb-4">Book Parking Near</h2>
                <div className="mb-4">
                  <input
                    type="text"
                    placeholder="Address, Place or City"
                    className="park-input"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <DateSelector 
                    label="Enter After" 
                    value={entryDate} 
                    onChange={setEntryDate}
                  />
                  
                  <TimeSelector 
                    label="Time" 
                    value={entryTime} 
                    onChange={setEntryTime}
                  />
                  
                  <DateSelector 
                    label="Exit Before" 
                    value={exitDate} 
                    onChange={setExitDate}
                  />
                  
                  <TimeSelector 
                    label="Time" 
                    value={exitTime} 
                    onChange={setExitTime}
                  />
                </div>

                <div className="mt-6">
                  <ParkEaseButton className="w-full">Update Search</ParkEaseButton>
                  <button className="w-full text-center text-parkblue mt-2">
                    Cancel
                  </button>
                </div>
              </ParkCard>

              <ParkCard>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold">Downtown Garage</h2>
                  <span className="bg-parkblue-light text-parkblue-dark px-3 py-1 rounded-full text-sm font-medium">
                    $18 / day
                  </span>
                </div>
                
                <p className="text-gray-600 flex items-center mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  123 Main Street, Downtown
                </p>
                
                <div className="bg-parkgray-light p-4 rounded-md mb-4">
                  <h3 className="font-medium mb-2">Selected Times</h3>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Enter After</p>
                      <p className="font-medium">Apr 19, 2025 10:00 AM</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Exit Before</p>
                      <p className="font-medium">Apr 19, 2025 6:00 PM</p>
                    </div>
                  </div>
                </div>
                
                <Link to="/checkout">
                  <ParkEaseButton className="w-full">Proceed to checkout</ParkEaseButton>
                </Link>
              </ParkCard>
            </div>
            
            <div className="w-full lg:w-1/2">
              <Map height="500px" center={[37.7749, -122.4194]} zoom={14} markerPosition={[37.7749, -122.4194]} markerPopup="Downtown Garage" />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ReserveSpot;
