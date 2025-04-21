
import { useState, useEffect } from "react";
import { useAuth } from "./AuthProvider";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialProfile = {
  name: "",
  email: "",
  phone: "",
  carModel: "",
  licenseNo: "",
  address: "",
  notes: "",
};

export default function ProfileDetailsForm() {
  const { user } = useAuth();

  const [profile, setProfile] = useState(initialProfile);

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.user_metadata?.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Save to Supabase
    alert("Profile updated! (Saving coming soon)");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded shadow mt-8"
    >
      <h2 className="text-xl font-bold mb-6">Your Profile</h2>
      <div className="mb-4">
        <label className="font-medium block mb-1" htmlFor="name">
          Name
        </label>
        <Input
          id="name"
          name="name"
          type="text"
          value={profile.name}
          onChange={handleChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-4">
        <label className="font-medium block mb-1" htmlFor="email">
          Email
        </label>
        <Input
          id="email"
          type="email"
          name="email"
          value={profile.email}
          readOnly
        />
      </div>
      <div className="mb-4">
        <label className="font-medium block mb-1" htmlFor="phone">
          Phone Number
        </label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={profile.phone}
          onChange={handleChange}
          placeholder="Enter your phone number"
        />
      </div>
      <div className="mb-4">
        <label className="font-medium block mb-1" htmlFor="address">
          Address
        </label>
        <Input
          id="address"
          name="address"
          type="text"
          value={profile.address}
          onChange={handleChange}
          placeholder="Enter your address"
        />
      </div>
      <div className="mb-4">
        <label className="font-medium block mb-1" htmlFor="carModel">
          Car Model
        </label>
        <Input
          id="carModel"
          name="carModel"
          type="text"
          value={profile.carModel}
          onChange={handleChange}
          placeholder="E.g. Toyota Corolla"
        />
      </div>
      <div className="mb-4">
        <label className="font-medium block mb-1" htmlFor="licenseNo">
          License No.
        </label>
        <Input
          id="licenseNo"
          name="licenseNo"
          type="text"
          value={profile.licenseNo}
          onChange={handleChange}
          placeholder="E.g. CA-1234"
        />
      </div>
      <div className="mb-4">
        <label className="font-medium block mb-1" htmlFor="notes">
          Other Information (e.g. Preferred parking, notes)
        </label>
        <Textarea
          id="notes"
          name="notes"
          value={profile.notes}
          onChange={handleChange}
          placeholder="Any additional info you want to provide"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-6 bg-parkblue text-white py-2 px-4 rounded hover:bg-parkblue-dark"
      >
        Save Changes
      </button>
    </form>
  );
}
