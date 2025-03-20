import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DuePatientsCard from "@/components/cards/cqm/DuePatientsCard";

const API_URL = "https://recall-backend.wahealth.co.uk/patients/due_patients";

const DuePatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(`${API_URL}`);

        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setPatients(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <Navbar />
      <main className="flex-1 p-8 w-full">
        <div className="flex gap-8">
          {/* Main content area (70%) */}
          <section className="flex-[5] space-y-4">
            <h2 className="text-xl font-semibold text-[#004085]">
              Due Patients
            </h2>
            <DuePatientsCard
              patients={patients}
              isLoading={isLoading}
              error={error}
            />
          </section>

          {/* Sidebar area (30%) */}
          <aside className="flex-[3] space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Total Patients: {patients.length}</p>
                {/* Add more statistics as needed */}
              </CardContent>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default DuePatientsPage;
