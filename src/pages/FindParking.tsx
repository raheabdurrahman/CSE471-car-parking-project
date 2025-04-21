
import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParkCard } from "@/components/ui/park-card";
import { ParkEaseButton } from "@/components/ui/parkease-button";
import SearchBox from "@/components/SearchBox";
import MapPlaceholder from "@/components/MapPlaceholder";
import Map from "@/components/Map";
import { MapPin, Clock } from "lucide-react";

// Mock data for parking spots
const MOCK_PARKING_SPOTS = [
  { 
    id: 1, 
    name: "Downtown Parking Garage", 
    address: "123 Main St", 
    price: 15, 
    distance: 0.3,
    available: 5 
  },
  { 
    id: 2, 
    name: "Central Plaza Parking", 
    address: "456 Oak Ave", 
    price: 12, 
    distance: 0.7,
    available: 12 
  },
  { 
    id: 3, 
    name: "City Center Lot", 
    address: "789 Pine St", 
    price: 18, 
    distance: 0.5,
    available: 3 
  },
];

const FindParking = () => {
  const [parkingType, setParkingType] = useState<"hourly" | "monthly">("hourly");
  const [location, setLocation] = useState("");

  const handleSearch = (query: string) => {
    setLocation(query);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <main className="flex-grow bg-parkgray-light">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row mb-8">
            <div className="w-full md:w-1/3 mb-6 md:mb-0">
              <ParkCard className="p-6 sticky top-4">
                <h2 className="text-xl font-bold mb-4">Parking made easy, wherever you go</h2>

                {/* Toggle button group */}
                <div className="mb-6">
                  <div className="flex rounded-md overflow-hidden border border-parkblue w-full">
                    <button
                      className={`flex-1 py-2 text-center ${
                        parkingType === "hourly" ? "bg-parkblue text-white" : "bg-white text-parkblue"
                      }`}
                      onClick={() => setParkingType("hourly")}
                    >
                      hourly/daily
                    </button>
                    <button
                      className={`flex-1 py-2 text-center ${
                        parkingType === "monthly" ? "bg-parkblue text-white" : "bg-white text-parkblue"
                      }`}
                      onClick={() => setParkingType("monthly")}
                    >
                      monthly
                    </button>
                  </div>
                </div>

                {/* Search form */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-1">Where are you going?</label>
                    <SearchBox 
                      placeholder="Address, Place or City" 
                      onSearch={handleSearch} 
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">When do you need to park?</label>
                    <input 
                      type="text" 
                      className="park-input" 
                      placeholder="Where do you need to park?"
                    />
                  </div>
                </div>

                {/* Find Parking Button */}
                <ParkEaseButton className="w-full">Find Parking Spot</ParkEaseButton>

                {/* Illustrated map graphic */}
                <div className="mt-8">
                  <MapPlaceholder height="200px" />
                </div>
              </ParkCard>
            </div>

            {/* Results section */}
            <div className="w-full md:w-2/3 md:pl-8">
              <h2 className="text-xl font-bold mb-4">Available Parking Spots</h2>

              <div className="space-y-4">
                {MOCK_PARKING_SPOTS.map((spot) => (
                  <ParkCard key={spot.id} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-bold text-lg">{spot.name}</h3>
                        <p className="text-sm text-gray-600 flex items-center">
                          <MapPin className="h-4 w-4 mr-1" /> 
                          {spot.address} ({spot.distance} miles away)
                        </p>
                        <p className="text-sm text-gray-600 mt-2">
                          <span className="font-medium">{spot.available} spots</span> available
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-parkblue">${spot.price}</p>
                        <p className="text-sm text-gray-600">per day</p>
                        <Link to="/reserve-spot">
                          <ParkEaseButton className="mt-2">Select</ParkEaseButton>
                        </Link>
                      </div>
                    </div>
                  </ParkCard>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FindParking;

