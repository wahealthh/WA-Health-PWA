import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CallHistoryCard from "@/components/cards/cqm/CallHistoryCard";
import DuePatientsCard from "@/components/cards/cqm/DuePatientsCard";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import API_ENDPOINTS from "@/config/api";

const DashboardPage = () => {
  // State for user and practice info
  const [userInfo, setUserInfo] = useState(null);
  const [practiceInfo, setPracticeInfo] = useState(null);
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  // We'll use this error state for displaying error messages if needed
  const [error, setError] = useState(null);

  // State for metrics
  const [callsData, setCallsData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [callsLoading, setCallsLoading] = useState(true);
  const [patientsLoading, setPatientsLoading] = useState(true);

  // Get auth context
  const { isAuthenticated } = useContext(AuthContext);

  // Fetch user and practice info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.admin.me, {
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
        console.error("User info fetch error:", err);
      } finally {
        setUserInfoLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    } else {
      setUserInfoLoading(false);
    }
  }, [isAuthenticated]);

  // Fetch calls data
  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.patients.calls(10), {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch calls");
        const data = await response.json();
        setCallsData(data);
      } catch (err) {
        console.error("Calls fetch error:", err);
        setError(err.message);
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
        const response = await fetch(API_ENDPOINTS.patients.duePatients, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch patients");
        const data = await response.json();
        setPatientsData(data);
      } catch (err) {
        console.error("Patients fetch error:", err);
        setError(err.message);
      } finally {
        setPatientsLoading(false);
      }
    };

    fetchPatients();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar userInfo={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Overview</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="ml-auto mr-4">
            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 px-3 py-1 text-sm">
              {userInfoLoading
                ? "..."
                : practiceInfo?.practice_name || "Your Practice"}
            </Badge>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-auto">
          {/* Display error message if there is one */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md text-red-700">
              <p>Error: {error}</p>
            </div>
          )}

          {/* Key Metrics Overview */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Calls Card */}
            <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-blue-500">
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
            <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-amber-500">
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
            <Card className="shadow-sm hover:shadow-md transition-shadow border-t-4 border-t-green-500">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium text-gray-700">
                  Today&apos;s Appointments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">
                  {/* This would be fetched from an appointments endpoint */}0
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Scheduled for today
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Detailed Data Section */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Calls */}
            <div className="bg-background rounded-lg shadow-sm p-6 border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Recent Calls
                </h2>
                <a
                  href="/call-history"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
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
            <div className="bg-background rounded-lg shadow-sm p-6 border border-border">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-foreground">
                  Patients Due for Follow-up
                </h2>
                <a
                  href="/due-patients"
                  className="text-primary hover:text-primary/80 text-sm font-medium"
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
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardPage;
