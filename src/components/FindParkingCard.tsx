
import { useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays, Clock } from "lucide-react";
import { ParkEaseButton } from "@/components/ui/parkease-button";
import { ParkCard } from "@/components/ui/park-card";

export default function FindParkingCard() {
  const [parkingLocation, setParkingLocation] = useState("");
  const [entryDate, setEntryDate] = useState("");
  const [entryTime, setEntryTime] = useState("");
  const [exitDate, setExitDate] = useState("");
  const [exitTime, setExitTime] = useState("");

  return (
    <ParkCard className="max-w-3xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-6">Find Available Parking</h2>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Where are you going?</label>
          <input
            type="text"
            placeholder="Enter address, city or landmark"
            className="park-input"
            value={parkingLocation}
            onChange={(e) => setParkingLocation(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              <CalendarDays className="inline-block mr-1 h-4 w-4" />
              Entry Date/Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="date" 
                className="park-input" 
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
              <input 
                type="time" 
                className="park-input"
                value={entryTime}
                onChange={(e) => setEntryTime(e.target.value)} 
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <Clock className="inline-block mr-1 h-4 w-4" />
              Exit Date/Time
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input 
                type="date" 
                className="park-input"
                value={exitDate}
                onChange={(e) => setExitDate(e.target.value)}
              />
              <input 
                type="time" 
                className="park-input"
                value={exitTime}
                onChange={(e) => setExitTime(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div>
          <Link to="/find-parking">
            <ParkEaseButton className="w-full">Find Parking Spot</ParkEaseButton>
          </Link>
        </div>
      </div>
    </ParkCard>
  );
}
