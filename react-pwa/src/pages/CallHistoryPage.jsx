import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallHistoryCard from "@/components/cards/cqm/CallHistoryCard";
import AppointmentTimeCard from "@/components/cards/cqm/AppointmentTimeCard";
import { useState, useEffect } from "react";

const CallHistoryPage = () => {
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch(
          "https://recall-product-backend.onrender.com/patients/calls?limit=10"
        );
        if (!response.ok) throw new Error("Failed to fetch calls");
        const data = await response.json();
        setCalls(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCalls();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1 p-8 w-full">
        <div className="flex gap-8">
          {/* Main content area (60%) */}
          <section className="flex-[6] space-y-4 px-4">
            <h2 className="text-xl font-semibold text-[#004085]">
              Patient Calls
            </h2>
            <CallHistoryCard
              calls={calls}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Aside area (40%) */}
          <aside className="flex-[4] space-y-4 px-4">
            <h2 className="text-xl font-semibold text-[#004085]">
              Appointment Schedules
            </h2>
            <AppointmentTimeCard />
            <AppointmentTimeCard />
            <AppointmentTimeCard />
            <AppointmentTimeCard />
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CallHistoryPage;
