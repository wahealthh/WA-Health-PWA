import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Upload, Users, Plus, Trash2, Save } from "lucide-react";
import { FaUser, FaEnvelope, FaCalendar } from "react-icons/fa6";
import { useAuth } from "@/hooks/useAuth";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import API_ENDPOINTS from "@/config/api";

const BatchCallsPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [practiceInfo, setPracticeInfo] = useState(null);
  const [userInfoLoading, setUserInfoLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);

  // State for manual patient form
  const [recallGroup, setRecallGroup] = useState({
    name: "",
    description: "",
    patients: [
      {
        id: 1,
        first_name: "",
        last_name: "",
        number: "",
        email: "",
        dob: "",
        notes: "",
      },
    ],
  });

  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  // Fetch user info (similar to other pages)
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

  // Handle option selection
  const handleOptionSelect = (option) => {
    setIsModalOpen(false);
    setSelectedOption(option);
  };

  // Add a new patient to the form
  const addPatient = () => {
    const newId =
      recallGroup.patients.length > 0
        ? Math.max(...recallGroup.patients.map((p) => p.id)) + 1
        : 1;

    setRecallGroup({
      ...recallGroup,
      patients: [
        ...recallGroup.patients,
        {
          id: newId,
          first_name: "",
          last_name: "",
          number: "",
          email: "",
          dob: "",
          notes: "",
        },
      ],
    });
  };

  // Remove a patient from the form
  const removePatient = (id) => {
    if (recallGroup.patients.length <= 1) {
      toast.error("You need at least one patient in the recall group");
      return;
    }

    setRecallGroup({
      ...recallGroup,
      patients: recallGroup.patients.filter((patient) => patient.id !== id),
    });
  };

  // Handle form input changes
  const handleInputChange = (e, field, patientId = null) => {
    if (patientId) {
      // Update patient field
      setRecallGroup({
        ...recallGroup,
        patients: recallGroup.patients.map((patient) =>
          patient.id === patientId
            ? { ...patient, [field]: e.target.value }
            : patient
        ),
      });
    } else {
      // Update group field
      setRecallGroup({
        ...recallGroup,
        [field]: e.target.value,
      });
    }
  };

  // Handle phone number input change
  const handlePhoneChange = (value, patientId) => {
    setRecallGroup({
      ...recallGroup,
      patients: recallGroup.patients.map((patient) =>
        patient.id === patientId ? { ...patient, number: value || "" } : patient
      ),
    });
  };

  // Submit the recall group
  const submitRecallGroup = async () => {
    // Validation
    if (!recallGroup.name.trim()) {
      toast.error("Please enter a name for the clinical recall group");
      return;
    }

    if (
      recallGroup.patients.some(
        (p) =>
          !p.first_name.trim() ||
          !p.last_name.trim() ||
          !p.number ||
          !p.email.trim() ||
          !p.dob
      )
    ) {
      toast.error("Please fill in all required patient details");
      return;
    }

    try {
      // First, create the recall group
      const groupResponse = await fetch(API_ENDPOINTS.recalls.groups, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: recallGroup.name,
          description: recallGroup.description,
        }),
      });

      if (!groupResponse.ok) {
        const errorData = await groupResponse.json();
        throw new Error(errorData.message || "Failed to create recall group");
      }

      // Get the group ID from the response
      const groupData = await groupResponse.json();
      const groupId = groupData.id;

      // Then, add patients to the group
      const patientsFormatted = recallGroup.patients.map((patient) => ({
        first_name: patient.first_name,
        last_name: patient.last_name,
        email: patient.email,
        number: patient.number,
        dob: patient.dob,
        notes: patient.notes,
      }));

      const patientsResponse = await fetch(
        API_ENDPOINTS.recalls.groupPatients(groupId),
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(patientsFormatted),
        }
      );

      if (!patientsResponse.ok) {
        const errorData = await patientsResponse.json();
        throw new Error(
          errorData.message || "Failed to add patients to recall group"
        );
      }

      toast.success("Clinical recall group created successfully");
      navigate(`/recall-group/${groupId}/confirm`, { state: { recallGroup } });
    } catch (error) {
      toast.error("Failed to create recall group: " + error.message);
      console.error("Recall group creation error:", error);
    }
  };

  // Reset selection and go back to options
  const handleBack = () => {
    setSelectedOption(null);
    setIsModalOpen(true);
  };

  return (
    <SidebarProvider>
      <AppSidebar userInfo={userInfo} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4 md:px-6">
          <SidebarTrigger className="lg:hidden -ml-1" />
          <Separator
            orientation="vertical"
            className="hidden lg:block mr-2 h-6"
          />
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/call-history">Calls</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Clinical Recalls</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto flex items-center gap-4">
            <Badge variant="outline" className="px-3 py-1 text-sm">
              {userInfoLoading
                ? "Loading Practice..."
                : practiceInfo?.practice_name || "Your Practice"}
            </Badge>
          </div>
        </header>

        <main className="flex-1 p-6 md:p-8 overflow-auto bg-muted/40">
          {!selectedOption ? (
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl font-bold mb-4">Clinical Recalls</h1>
              <p className="mb-8 text-muted-foreground">
                Create and manage patient recall campaigns for clinical
                follow-ups.
              </p>
              {/* Optionally, add an illustration or icon here */}
            </div>
          ) : selectedOption === "manual" ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Create Recall Group</h1>
                <Button variant="outline" onClick={handleBack}>
                  Back to Options
                </Button>
              </div>

              <Card className="mb-6 border-primary/20">
                <CardHeader>
                  <CardTitle>Recall Group Details</CardTitle>
                  <CardDescription>
                    Name this recall group for easy identification and add an
                    optional description for more details.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="group-name">
                        Group Name <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id="group-name"
                        placeholder="(e.g., Asthma Annual Review Q3)"
                        value={recallGroup.name}
                        onChange={(e) => handleInputChange(e, "name")}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="group-description">Description</Label>
                      <Input
                        id="group-description"
                        placeholder="Enter recall group description"
                        value={recallGroup.description}
                        onChange={(e) => handleInputChange(e, "description")}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Patient Details</CardTitle>
                  <CardDescription>
                    Add patients to be included in this recall group.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {recallGroup.patients.map((patient, index) => (
                    <Card key={patient.id} className="bg-background shadow-sm">
                      <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <CardTitle className="text-base font-medium">
                          Patient {index + 1}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removePatient(patient.id)}
                          className="h-7 w-7 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                          disabled={recallGroup.patients.length <= 1}
                        >
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove Patient</span>
                        </Button>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor={`first_name-${patient.id}`}>
                              First Name{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                              <FaUser className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id={`first_name-${patient.id}`}
                                placeholder="John"
                                value={patient.first_name}
                                onChange={(e) =>
                                  handleInputChange(e, "first_name", patient.id)
                                }
                                className="pl-8"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`last_name-${patient.id}`}>
                              Last Name{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <Input
                              id={`last_name-${patient.id}`}
                              placeholder="Smith"
                              value={patient.last_name}
                              onChange={(e) =>
                                handleInputChange(e, "last_name", patient.id)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor={`phone-${patient.id}`}>
                            Phone Number{" "}
                            <span className="text-destructive">*</span>
                          </Label>
                          <PhoneInput
                            international
                            defaultCountry="GB"
                            value={patient.number}
                            onChange={(value) =>
                              handlePhoneChange(value, patient.id)
                            }
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            id={`phone-${patient.id}`}
                            placeholder="Enter phone number"
                          />
                          <p className="text-xs text-muted-foreground">
                            Include country code (e.g +44 for UK)
                          </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor={`email-${patient.id}`}>
                              Email <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                              <FaEnvelope className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id={`email-${patient.id}`}
                                type="email"
                                placeholder="patient@example.com"
                                value={patient.email}
                                onChange={(e) =>
                                  handleInputChange(e, "email", patient.id)
                                }
                                className="pl-8"
                              />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor={`dob-${patient.id}`}>
                              Date of Birth{" "}
                              <span className="text-destructive">*</span>
                            </Label>
                            <div className="relative">
                              <FaCalendar className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                id={`dob-${patient.id}`}
                                type="date"
                                value={patient.dob}
                                onChange={(e) =>
                                  handleInputChange(e, "dob", patient.id)
                                }
                                className="pl-8"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <Label htmlFor={`notes-${patient.id}`}>Notes</Label>
                          <Input
                            id={`notes-${patient.id}`}
                            placeholder="e.g., Asthma, Diabetes, Medication Check"
                            value={patient.notes}
                            onChange={(e) =>
                              handleInputChange(e, "notes", patient.id)
                            }
                          />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row justify-between gap-4 items-stretch sm:items-center pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={addPatient}
                    className="flex items-center gap-2 order-2 sm:order-1"
                  >
                    <Plus className="h-4 w-4" /> Add Another Patient
                  </Button>
                  <Button
                    onClick={submitRecallGroup}
                    className="flex items-center gap-2 order-1 sm:order-2"
                    size="lg"
                  >
                    <Save className="h-4 w-4" /> Create Recall Group
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-semibold">Upload Patient Data</h1>
                <Button variant="outline" onClick={handleBack}>
                  Back to Options
                </Button>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>CSV Upload</CardTitle>
                  <CardDescription>
                    Upload a spreadsheet with patient details for recall
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center gap-4 py-12 border-2 border-dashed border-muted rounded-lg hover:border-primary/50 transition-colors">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <p className="text-center text-muted-foreground">
                    Drag and drop your CSV file here, or{" "}
                    <Button variant="link" className="p-0 h-auto">
                      click to browse
                    </Button>
                  </p>
                  {/* <Button>Select File</Button> */}
                  <p className="text-xs text-muted-foreground mt-2 max-w-xs text-center">
                    Required columns: First Name, Last Name, Phone Number,
                    Email, Date of Birth. Optional: Notes
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </SidebarInset>

      {/* Modal with options */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Create Patient Recall Group</DialogTitle>
            <DialogDescription>
              Choose how you&apos;d like to add patients for clinical recall
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col sm:flex-row gap-4 py-4">
            <Button
              onClick={() => handleOptionSelect("manual")}
              variant="outline"
              className="h-32 flex-1 flex flex-col justify-center items-center gap-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Users className="h-8 w-8" />
              <span className="text-center">Add Patients Manually</span>
            </Button>
            <Button
              onClick={() => handleOptionSelect("csv")}
              variant="outline"
              className="h-32 flex-1 flex flex-col justify-center items-center gap-2 hover:bg-accent hover:text-accent-foreground"
            >
              <Upload className="h-8 w-8" />
              <span className="text-center">Upload CSV from Spreadsheet</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default BatchCallsPage;
