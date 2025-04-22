import { useState, useEffect } from "react";
import { useParams, useLocation, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, PhoneCall, CalendarClock, ArrowLeft } from "lucide-react";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import API_ENDPOINTS from "@/config/api";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";

const RecallGroupConfirmationPage = () => {
  const { groupId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // State from BatchCallsPage (passed via navigate state)
  const initialRecallGroup = location.state?.recallGroup;

  const [recallGroup, setRecallGroup] = useState(initialRecallGroup || null);
  const [callContext, setCallContext] = useState("");
  const [isLoading, setIsLoading] = useState(!initialRecallGroup);
  const [userInfo, setUserInfo] = useState(null); // Add state for user info if needed
  const [practiceInfo, setPracticeInfo] = useState(null); // Add state for practice info if needed
  const [userInfoLoading, setUserInfoLoading] = useState(true); // Add loading state if needed

  // Fetch user/practice info (similar to BatchCallsPage if needed)
  useEffect(() => {
    const fetchUserInfo = async () => {
      // Your user info fetching logic here...
      // Example:
      try {
        const response = await fetch(API_ENDPOINTS.admin.me, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Failed to fetch user info");
        const data = await response.json();
        setUserInfo(data);
        if (data.practice) setPracticeInfo(data.practice);
      } catch (err) {
        console.error("User info fetch error:", err);
        toast.error("Could not load user details.");
      } finally {
        setUserInfoLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchUserInfo();
    } else {
      setUserInfoLoading(false); // If not authenticated, stop loading
    }
  }, [isAuthenticated]);

  // Fetch recall group details if not passed via state
  useEffect(() => {
    if (!initialRecallGroup && groupId) {
      const fetchGroupDetails = async () => {
        setIsLoading(true);
        try {
          // --- TODO: Implement actual API call ---
          // const response = await fetch(API_ENDPOINTS.recalls.groupDetails(groupId), { credentials: 'include' });
          // if (!response.ok) throw new Error("Failed to fetch group details");
          // const data = await response.json();
          // setRecallGroup(data);

          // Placeholder data for now:
          console.warn(
            "API call for group details not implemented. Using placeholder."
          );
          await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
          setRecallGroup({
            id: groupId,
            name: "Placeholder Group",
            description: "Fetched description",
            patients: [
              {
                id: 101,
                first_name: "Jane",
                last_name: "Doe",
                number: "+44...",
                email: "jane@...",
                dob: "...",
                notes: "...",
              },
              {
                id: 102,
                first_name: "Peter",
                last_name: "Jones",
                number: "+44...",
                email: "peter@...",
                dob: "...",
                notes: "...",
              },
            ],
          });
          // --- End Placeholder ---
        } catch (error) {
          console.error("Error fetching recall group details:", error);
          toast.error(`Failed to load recall group details: ${error.message}`);
          // Optionally navigate back or show an error state
          navigate("/batch-calls"); // Navigate back if loading fails
        } finally {
          setIsLoading(false);
        }
      };
      fetchGroupDetails();
    }
  }, [groupId, initialRecallGroup, navigate]);

  const handleCallNow = async () => {
    if (!callContext.trim()) {
      toast.error("Please provide a context for the call.");
      return;
    }

    try {
      // Format patients for the API call
      const patientsToCall = recallGroup.patients.map((patient) => ({
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        number: patient.number,
        dob: patient.dob,
        notes: patient.notes || "",
      }));

      // Make API call to initiate calls
      toast.info(`Initiating calls to ${patientsToCall.length} patients...`);

      const response = await fetch(API_ENDPOINTS.patients.callDuePatients, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          patients: patientsToCall,
          call_context: callContext,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to initiate calls");
      }

      // Handle successful response
      toast.success(
        `Calls initiated successfully for ${patientsToCall.length} patients!`
      );

      // Navigate to call history to see results
      navigate("/call-history");
    } catch (error) {
      console.error("Error initiating calls:", error);
      toast.error(`Failed to initiate calls: ${error.message}`);
    }
  };

  const handleScheduleCall = () => {
    if (!callContext.trim()) {
      toast.error("Please provide a context for scheduling the call.");
      return;
    }
    // --- TODO: Implement API call or navigate to a scheduling interface ---
    console.log(
      "Scheduling call with context:",
      callContext,
      "for group:",
      recallGroup
    );
    toast.info("Navigating to scheduling... (Functionality not implemented)");
    // navigate(`/schedule-call/${groupId}`, { state: { recallGroup, callContext } });
  };

  // TODO: Implement Add/Remove Patient functionality
  const handleManagePatients = () => {
    console.log("Manage patients clicked (functionality not implemented)");
    toast.info("Patient management interface not implemented yet.");
    // Potentially navigate back to BatchCallsPage with editing state, or open a modal
    // navigate('/batch-calls', { state: { editingGroup: recallGroup } });
  };

  if (isLoading || userInfoLoading) {
    // You might want a more sophisticated loading indicator
    return (
      <div className="flex justify-center items-center h-screen">
        Loading recall group details...
      </div>
    );
  }

  if (!recallGroup) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Failed to load recall group details.{" "}
        <Link to="/batch-calls" className="ml-2 underline">
          Go back
        </Link>
      </div>
    );
  }

  const patientCount = recallGroup.patients?.length || 0;

  return (
    <SidebarProvider>
      <AppSidebar userInfo={userInfo} /> {/* Pass userInfo if fetched */}
      <SidebarInset>
        {/* Header */}
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 md:px-6">
          <SidebarTrigger className="lg:hidden -ml-1" />
          <Separator
            orientation="vertical"
            className="hidden lg:block mr-2 h-6"
          />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/batch-calls">Clinical Recalls</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Confirm Recall Group</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/batch-calls")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Setup
            </Button>
            <Badge variant="outline" className="px-3 py-1 text-sm">
              {practiceInfo?.practice_name || "Your Practice"}
            </Badge>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 md:p-8 overflow-auto bg-muted/40">
          <div className="max-w-3xl mx-auto">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Recall Group: {recallGroup.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleManagePatients}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    <Users className="mr-2 h-5 w-5" />
                    {patientCount} Patient{patientCount !== 1 ? "s" : ""}{" "}
                    (Manage)
                  </Button>
                </CardTitle>
                <CardDescription>
                  {recallGroup.description || "No description provided."}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Patient list could be shown here in a dialog/collapsible section triggered by the button above */}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Set Call Context</CardTitle>
                <CardDescription>
                  Provide the primary reason or context for this recall
                  campaign. Add any additional details that will help the AI
                  understand the call&apos;s purpose and what to say.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  id="call-context"
                  placeholder="Enter call context here..."
                  value={callContext}
                  onChange={(e) => setCallContext(e.target.value)}
                  rows={4}
                />
                <div className="flex flex-col sm:flex-row gap-4 justify-end pt-4">
                  <Button variant="outline" onClick={handleScheduleCall}>
                    <CalendarClock className="mr-2 h-4 w-4" />
                    Schedule Call for Later
                  </Button>
                  <Button onClick={handleCallNow}>
                    <PhoneCall className="mr-2 h-4 w-4" />
                    Call {patientCount} Patient{patientCount !== 1 ? "s" : ""}{" "}
                    Now
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default RecallGroupConfirmationPage;
