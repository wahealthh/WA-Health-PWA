import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CallHistoryCard from "@/components/cards/cqm/CallHistoryCard";
import DuePatientsCard from "@/components/cards/cqm/DuePatientsCard";

const DashboardPage = () => {
  // State for user and practice info
  const [userInfo, setUserInfo] = useState(null);
  const [practiceInfo, setPracticeInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for metrics
  const [callsData, setCallsData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [callsLoading, setCallsLoading] = useState(true);
  const [patientsLoading, setPatientsLoading] = useState(true);

  // Get auth context
  const { isAuthenticated } = useContext(AuthContext);

  // Helper function to capitalize first letter
  const capitalizeFirstLetter = (string) => {
    return string ? string.charAt(0).toUpperCase() + string.slice(1) : "";
  };

  // Fetch user and practice info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch("http://localhost:8000/admin/me", {
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch user info");

        const data = await response.json();
        setUserInfo(data);

        // If practice info is available in the same endpoint
        if (data.practice) {
          setPracticeInfo(data.practice);
        }
      } catch (err) {
        setError(err.message);
        console.error("User info fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch calls data
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch(
          "https://recall-product-backend.onrender.com/patients/calls?limit=10"
        );
        if (!response.ok) throw new Error("Failed to fetch calls");
        const data = await response.json();
        setCallsData(data);
      } catch (err) {
        console.error("Calls fetch error:", err);
      } finally {
        setCallsLoading(false);
      }
    };

    fetchCalls();
  }, []);

  // Fetch patients data
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const response = await fetch(
          "https://recall-product-backend.onrender.com/patients/due_patients"
        );
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setPatientsData(data);
      } catch (err) {
        console.error("Patients fetch error:", err);
      } finally {
        setPatientsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full">
      <Navbar />

      <main className="flex-1 p-6 md:p-8 max-w-7xl mx-auto w-full">
        {/* Welcome Section with Practice Info */}
        <section className="mb-8">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back,{" "}
                  {isLoading ? "..." : userInfo?.admin?.first_name || "User"}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isLoading
                    ? "..."
                    : capitalizeFirstLetter(userInfo?.user?.role) ||
                      "Healthcare Professional"}
                </p>
                <p className="text-gray-500 text-sm mt-1">
                  {isLoading
                    ? "..."
                    : practiceInfo?.practice_address || "London, UK"}
                </p>
              </div>

              <div className="mt-4 md:mt-0">
                <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 py-1 text-sm">
                  {isLoading
                    ? "..."
                    : practiceInfo?.practice_name || "Your Practice"}
                </Badge>
              </div>
            </div>
          </div>
        </section>

        {/* Key Metrics Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Calls Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-blue-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                Total Calls
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">
                {callsLoading ? (
                  <span className="inline-block w-8 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  callsData.length
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Patient calls tracked
              </p>
            </CardContent>
          </Card>

          {/* Due Patients Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-amber-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                Due Patients
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">
                {patientsLoading ? (
                  <span className="inline-block w-8 h-6 bg-gray-200 animate-pulse rounded"></span>
                ) : (
                  patientsData.length
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Patients due for follow-up
              </p>
            </CardContent>
          </Card>

          {/* Appointments Card */}
          <Card className="shadow-md hover:shadow-lg transition-shadow border-t-4 border-t-green-500">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-medium text-gray-700">
                Today&apos;s Appointments
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">
                {/* This would be fetched from an appointments endpoint */}0
              </div>
              <p className="text-sm text-gray-500 mt-1">Scheduled for today</p>
            </CardContent>
          </Card>
        </section>

        {/* Detailed Data Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Calls */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Recent Calls
              </h2>
              <a
                href="/call-history"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All →
              </a>
            </div>
            <div className="h-[350px] overflow-auto">
              {callsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-3 text-gray-500 text-sm">
                      Loading calls...
                    </p>
                  </div>
                </div>
              ) : callsData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No call history available</p>
                </div>
              ) : (
                <CallHistoryCard
                  calls={callsData.slice(0, 5)}
                  isLoading={false}
                  error={null}
                  compact={true}
                />
              )}
            </div>
          </div>

          {/* Due Patients */}
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Patients Due for Follow-up
              </h2>
              <a
                href="/due-patients"
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View All →
              </a>
            </div>
            <div className="h-[350px] overflow-auto">
              {patientsLoading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"></div>
                    <p className="mt-3 text-gray-500 text-sm">
                      Loading patients...
                    </p>
                  </div>
                </div>
              ) : patientsData.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <p>No patients due for follow-up</p>
                </div>
              ) : (
                <DuePatientsCard
                  patients={patientsData.slice(0, 5)}
                  isLoading={false}
                  error={null}
                  compact={true}
                />
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DashboardPage;
