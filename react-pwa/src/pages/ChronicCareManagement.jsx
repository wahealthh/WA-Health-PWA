import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CallHistoryCard from "@/components/cards/cqm/CallHistoryCard";
import AppointmentTimeCard from "@/components/cards/cqm/AppointmentTimeCard";

const ChronicCareManagement = () => {
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
            <CallHistoryCard />
            <CallHistoryCard />
            <CallHistoryCard />
            <CallHistoryCard />
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

export default ChronicCareManagement;
