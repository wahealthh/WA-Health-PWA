import { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import CallHistoryCard from "@/components/cards/cqm/CallHistoryCard";
import AppointmentTimeCard from "@/components/cards/cqm/AppointmentTimeCard";
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

const CallHistoryPage = () => {
  const [calls, setCalls] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for user and practice info
  const [userInfo, setUserInfo] = useState(null);
  const [practiceInfo, setPracticeInfo] = useState(null);
  const [userInfoLoading, setUserInfoLoading] = useState(true);

  // Get auth context
  const { isAuthenticated } = useContext(AuthContext);

  // Fetch user and practice info
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await fetch(
          "https://recall-backend.wahealth.co.uk/admin/me",
          {
            credentials: "include",
          }
        );

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
        setUserInfoLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    } else {
      setUserInfoLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        const response = await fetch(
          "https://recall-backend.wahealth.co.uk/patients/calls?limit=50"
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
                  <BreadcrumbPage>Call History</BreadcrumbPage>
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

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main content area */}
            <section className="flex-[6] space-y-4">
              <h2 className="text-xl font-semibold text-[#004085]">
                Patient Calls
              </h2>
              <CallHistoryCard
                calls={calls}
                isLoading={isLoading}
                error={error}
              />
            </section>

            {/* Aside area */}
            <aside className="flex-[4] space-y-4">
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
      </SidebarInset>
    </SidebarProvider>
  );
};

export default CallHistoryPage;
