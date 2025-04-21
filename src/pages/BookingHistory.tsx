
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParkCard } from "@/components/ui/park-card";
import { ParkEaseButton } from "@/components/ui/parkease-button";
import { Search } from "lucide-react";

// Mock data for booking history
const MOCK_BOOKINGS = [
  {
    id: "B12345",
    parkingSpot: "Downtown Garage",
    address: "123 Main St, Downtown",
    vehicleModel: "Toyota Camry",
    vehicleNumber: "ABC 123",
    entryDateTime: "Apr 15, 2025 10:00 AM",
    exitDateTime: "Apr 15, 2025 6:00 PM",
    status: "Completed",
  },
  {
    id: "B12346",
    parkingSpot: "Central Plaza Parking",
    address: "456 Oak Ave, Central",
    vehicleModel: "Honda Civic",
    vehicleNumber: "XYZ 789",
    entryDateTime: "Apr 18, 2025 9:00 AM",
    exitDateTime: "Apr 18, 2025 5:00 PM",
    status: "Upcoming",
  },
  {
    id: "B12347",
    parkingSpot: "City Center Lot",
    address: "789 Pine St, City Center",
    vehicleModel: "Ford Focus",
    vehicleNumber: "DEF 456",
    entryDateTime: "Apr 10, 2025 8:30 AM",
    exitDateTime: "Apr 10, 2025 4:30 PM",
    status: "Completed",
  },
];

const BookingHistory = () => {
  const [sortBy, setSortBy] = useState("date");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBookings = MOCK_BOOKINGS.filter(booking => 
    booking.parkingSpot.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-parkgray-light">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6">View Booking History</h1>
          
          <ParkCard className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Booking History</h2>
              
              <div className="flex flex-col md:flex-row md:items-center gap-3">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search bookings..."
                    className="park-input pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                
                <div className="flex items-center">
                  <label className="text-sm mr-2">Sort by:</label>
                  <select 
                    className="park-input py-1 px-2"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="date">Date</option>
                    <option value="parkingSpot">Parking Spot</option>
                    <option value="status">Status</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-parkgray-DEFAULT">
                <thead>
                  <tr>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Parking spot address
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle Model
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vehicle Number
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Entry Date/Time
                    </th>
                    <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Exit Date/Time
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-parkgray-DEFAULT">
                  {filteredBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td className="py-4 px-4 whitespace-nowrap">
                        <div className="text-sm font-medium">{booking.parkingSpot}</div>
                        <div className="text-xs text-gray-500">{booking.address}</div>
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm">
                        {booking.vehicleModel}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm">
                        {booking.vehicleNumber}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm">
                        {booking.entryDateTime}
                      </td>
                      <td className="py-4 px-4 whitespace-nowrap text-sm">
                        {booking.exitDateTime}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredBookings.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No bookings found</p>
              </div>
            )}
          </ParkCard>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BookingHistory;
