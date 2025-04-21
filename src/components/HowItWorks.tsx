
import { ParkCard } from "./ui/park-card";
import { MapPin, Clock, Car } from "lucide-react";

const HowItWorks = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">How ParkEase Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <ParkCard className="flex flex-col items-center text-center p-6">
          <div className="bg-parkblue-light p-3 rounded-full mb-4">
            <MapPin className="h-6 w-6 text-parkblue-dark" />
          </div>
          <h3 className="text-lg font-bold mb-2">Search and compare prices</h3>
          <p className="text-gray-600">Find parking spots at your desired location</p>
        </ParkCard>
        
        <ParkCard className="flex flex-col items-center text-center p-6">
          <div className="bg-parkblue-light p-3 rounded-full mb-4">
            <Clock className="h-6 w-6 text-parkblue-dark" />
          </div>
          <h3 className="text-lg font-bold mb-2">Book to secure a prepaid parking place</h3>
          <p className="text-gray-600">Reserve your spot, receiving email or in-app confirmation</p>
        </ParkCard>
        
        <ParkCard className="flex flex-col items-center text-center p-6">
          <div className="bg-parkblue-light p-3 rounded-full mb-4">
            <Car className="h-6 w-6 text-parkblue-dark" />
          </div>
          <h3 className="text-lg font-bold mb-2">Park with ease</h3>
          <p className="text-gray-600">When you arrive, follow the instructions provided in your booking confirmation</p>
        </ParkCard>
      </div>
    </div>
  );
};

export default HowItWorks;
