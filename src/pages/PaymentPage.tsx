
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Calendar, KeyRound } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ParkCard } from "@/components/ui/park-card";
import { ParkEaseButton } from "@/components/ui/parkease-button";

const PaymentPage = () => {
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [saveForLater, setSaveForLater] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process payment - in reality this would connect to a payment processor
    alert("Payment processed successfully!");
    navigate("/dashboard");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-parkgray-light">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold">Checkout</h1>
              <Link to="/checkout" className="text-parkblue hover:underline flex items-center">
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Link>
            </div>
            
            <ParkCard>
              <div className="mb-6">
                <h2 className="font-bold text-lg mb-4">Choose payment method</h2>
                <div className="flex space-x-4">
                  <div className="border border-parkblue bg-white p-2 rounded">
                    <img src="https://placehold.co/80x50/fff/67ADF2/png?text=VISA" alt="Visa" className="h-8" />
                  </div>
                  <div className="border border-parkgray-DEFAULT bg-white p-2 rounded">
                    <img src="https://placehold.co/80x50/fff/67ADF2/png?text=MASTERCARD" alt="Mastercard" className="h-8" />
                  </div>
                  <div className="border border-parkgray-DEFAULT bg-white p-2 rounded">
                    <img src="https://placehold.co/80x50/fff/67ADF2/png?text=PAYPAL" alt="PayPal" className="h-8" />
                  </div>
                </div>
              </div>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name on card</label>
                    <div className="relative">
                      <input 
                        type="text"
                        className="park-input pl-8"
                        placeholder="John Smith"
                        value={nameOnCard}
                        onChange={(e) => setNameOnCard(e.target.value)}
                        required
                      />
                      <CreditCard className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-sm font-medium mb-1">Card Number</label>
                      <input 
                        type="text"
                        className="park-input"
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Valid till</label>
                      <div className="relative">
                        <input 
                          type="text"
                          className="park-input pl-8"
                          placeholder="MM/YY"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          required
                        />
                        <Calendar className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">CVV</label>
                      <div className="relative">
                        <input 
                          type="password"
                          className="park-input pl-8"
                          placeholder="***"
                          maxLength={4}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          required
                        />
                        <KeyRound className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center mt-4">
                    <input 
                      type="checkbox"
                      id="saveForLater"
                      checked={saveForLater}
                      onChange={() => setSaveForLater(!saveForLater)}
                      className="h-4 w-4 text-parkblue rounded"
                    />
                    <label htmlFor="saveForLater" className="ml-2 text-sm">
                      Save my payment information for later
                    </label>
                  </div>
                  
                  <div className="border-t border-parkgray-DEFAULT mt-6 pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Payment amount</span>
                      <span className="font-bold">$18.00</span>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <ParkEaseButton type="submit">
                      Confirm
                    </ParkEaseButton>
                  </div>
                </div>
              </form>
            </ParkCard>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PaymentPage;
