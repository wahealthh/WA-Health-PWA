import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const API_URL = "https://recall-backend.wahealth.co.uk/patients/due_patients";

const DuePatientsPage = () => {
  const [patients, setPatients] = useState([]);
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
                  <BreadcrumbPage>Due Patients</BreadcrumbPage>
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

            {/* Sidebar area */}
            <aside className="flex-[2] space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="flex justify-between items-center border-b border-gray-100 py-2">
                    <span>Total Patients Due:</span>
                    <span className="font-semibold">{patients.length}</span>
                  </p>
                  {/* Add more statistics as needed */}
                </CardContent>
              </Card>
            </aside>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DuePatientsPage;
