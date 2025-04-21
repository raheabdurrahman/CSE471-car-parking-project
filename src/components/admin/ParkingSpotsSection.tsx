
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Edit, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ParkingSpot {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  price_hourly: number | null;
  price_daily: number | null;
  price_monthly: number | null;
  available_spots: number;
}

const ParkingSpotsSection = () => {
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[]>([]);
  const [loading, setLoading] = useState(false);
  const [editingSpot, setEditingSpot] = useState<ParkingSpot | null>(null);
  const [spotForm, setSpotForm] = useState({
    id: "",
    name: "",
    address: "",
    lat: 0,
    lng: 0,
    price_hourly: 0,
    price_daily: 0,
    price_monthly: 0,
    available_spots: 0,
  });

  const loadParkingSpots = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("parking_spots").select("*");
    if (error) {
      toast.error("Failed to load parking spots: " + error.message);
      setLoading(false);
      return;
    }
    setParkingSpots(data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    loadParkingSpots();
  }, []);

  const openEditSpot = (spot: ParkingSpot | null) => {
    if (spot) {
      setSpotForm({
        id: spot.id,
        name: spot.name,
        address: spot.address,
        lat: spot.lat,
        lng: spot.lng,
        price_hourly: spot.price_hourly ?? 0,
        price_daily: spot.price_daily ?? 0,
        price_monthly: spot.price_monthly ?? 0,
        available_spots: spot.available_spots,
      });
      setEditingSpot(spot);
    } else {
      setSpotForm({
        id: "",
        name: "",
        address: "",
        lat: 0,
        lng: 0,
        price_hourly: 0,
        price_daily: 0,
        price_monthly: 0,
        available_spots: 0,
      });
      setEditingSpot(null);
    }
  };

  const handleSpotFormChange = (field: keyof typeof spotForm, value: string | number) => {
    setSpotForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveSpot = async () => {
    if (!spotForm.name.trim()) {
      toast.error("Name is required");
      return;
    }
    if (!spotForm.address.trim()) {
      toast.error("Address is required");
      return;
    }
    if (spotForm.available_spots < 0) {
      toast.error("Available spots can't be negative");
      return;
    }

    if (editingSpot) {
      const { error } = await supabase
        .from("parking_spots")
        .update({
          name: spotForm.name,
          address: spotForm.address,
          lat: spotForm.lat,
          lng: spotForm.lng,
          price_hourly: spotForm.price_hourly,
          price_daily: spotForm.price_daily,
          price_monthly: spotForm.price_monthly,
          available_spots: spotForm.available_spots,
        })
        .eq("id", editingSpot.id);
      if (error) {
        toast.error("Failed to update parking spot: " + error.message);
        return;
      }
      toast.success("Parking spot updated.");
    } else {
      const { error } = await supabase.from("parking_spots").insert({
        name: spotForm.name,
        address: spotForm.address,
        lat: spotForm.lat,
        lng: spotForm.lng,
        price_hourly: spotForm.price_hourly,
        price_daily: spotForm.price_daily,
        price_monthly: spotForm.price_monthly,
        available_spots: spotForm.available_spots,
      });
      if (error) {
        toast.error("Failed to add parking spot: " + error.message);
        return;
      }
      toast.success("Parking spot added.");
    }
    openEditSpot(null);
    loadParkingSpots();
  };

  const handleDeleteSpot = async (id: string) => {
    const confirmed = window.confirm("Are you sure you want to delete this parking spot?");
    if (!confirmed) return;
    const { error } = await supabase.from("parking_spots").delete().eq("id", id);
    if (error) {
      toast.error("Failed to delete parking spot: " + error.message);
      return;
    }
    toast.success("Parking spot deleted.");
    loadParkingSpots();
  };

  return (
    <section className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Manage Parking Spots</h2>
      <Button onClick={() => openEditSpot(null)} className="mb-4">
        Add Parking Spot
      </Button>
      {loading ? (
        <p>Loading parking spots...</p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Latitude</TableHead>
              <TableHead>Longitude</TableHead>
              <TableHead>Price Hourly</TableHead>
              <TableHead>Price Daily</TableHead>
              <TableHead>Price Monthly</TableHead>
              <TableHead>Available Spots</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parkingSpots.map((spot) => (
              <TableRow key={spot.id}>
                <TableCell>{spot.name}</TableCell>
                <TableCell>{spot.address}</TableCell>
                <TableCell>{spot.lat}</TableCell>
                <TableCell>{spot.lng}</TableCell>
                <TableCell>{spot.price_hourly ?? "N/A"}</TableCell>
                <TableCell>{spot.price_daily ?? "N/A"}</TableCell>
                <TableCell>{spot.price_monthly ?? "N/A"}</TableCell>
                <TableCell>{spot.available_spots}</TableCell>
                <TableCell>
                  <Button size="sm" onClick={() => openEditSpot(spot)} className="mr-2">
                    <Edit className="inline" /> Edit
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteSpot(spot.id)}>
                    <Trash2 className="inline" /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
      <Dialog open={!!editingSpot} onOpenChange={(open) => !open && openEditSpot(null)}>
        <DialogContent className="max-w-lg">
          <DialogTitle>{editingSpot ? "Edit Parking Spot" : "Add Parking Spot"}</DialogTitle>
          <DialogDescription>
            {editingSpot ? "Update the details of the parking spot." : "Fill the details to add a new parking spot."}
          </DialogDescription>
          <div className="space-y-4 mt-4">
            <Input type="text" placeholder="Name" value={spotForm.name} onChange={(e) => handleSpotFormChange("name", e.target.value)} />
            <Input type="text" placeholder="Address" value={spotForm.address} onChange={(e) => handleSpotFormChange("address", e.target.value)} />
            <Input type="number" placeholder="Latitude" value={spotForm.lat} onChange={(e) => handleSpotFormChange("lat", Number(e.target.value))} />
            <Input type="number" placeholder="Longitude" value={spotForm.lng} onChange={(e) => handleSpotFormChange("lng", Number(e.target.value))} />
            <Input type="number" placeholder="Price Hourly" value={spotForm.price_hourly} onChange={(e) => handleSpotFormChange("price_hourly", Number(e.target.value))} />
            <Input type="number" placeholder="Price Daily" value={spotForm.price_daily} onChange={(e) => handleSpotFormChange("price_daily", Number(e.target.value))} />
            <Input type="number" placeholder="Price Monthly" value={spotForm.price_monthly} onChange={(e) => handleSpotFormChange("price_monthly", Number(e.target.value))} />
            <Input type="number" placeholder="Available Spots" value={spotForm.available_spots} onChange={(e) => handleSpotFormChange("available_spots", Number(e.target.value))} min={0} />
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button onClick={handleSaveSpot}>Save</Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default ParkingSpotsSection;

