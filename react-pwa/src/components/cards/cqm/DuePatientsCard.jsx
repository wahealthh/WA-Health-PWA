/* eslint-disable react/prop-types */
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaPhone, FaEnvelope, FaCalendar } from "react-icons/fa6";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const DuePatientsCard = ({ patients, isLoading, error }) => {
  const [callingPatient, setCallingPatient] = useState(null);
  const navigate = useNavigate();

  const handleCall = async (patient) => {
    setCallingPatient(patient.number);
    try {
      const response = await fetch(
        "https://recall-product-backend.onrender.com/patients/call_patient",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: patient.first_name,
            last_name: patient.last_name,
            number: patient.number,
            email: patient.email,
            dob: patient.dob,
          }),
        }
      );

      if (!response.ok) {
        toast.warning("Failed to initiate call", {
          description: `Could not connect to ${patient.first_name} ${patient.last_name}`,
          action: {
            label: "Try Again",
            onClick: () => handleCall(patient),
          },
        });
        throw new Error("Failed to initiate call");
      }

      // Handle successful call initiation
      toast.success("Call placed successfully", {
        description: `Connected with ${patient.first_name} ${patient.last_name}`,
        action: {
          label: "View Call Details",
          onClick: () => navigate("/call-history"),
        },
      });
      console.log("Call initiated successfully");
    } catch (err) {
      console.error("Error initiating call:", err);
      toast.error("Failed to initiate call", {
        description: "Please contact support",
      });
    } finally {
      setCallingPatient(null);
    }
  };

  if (isLoading) return <div>Loading patients...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="space-y-4">
      {patients.map((patient, index) => (
        <Card key={index} className="w-full flex justify-between">
          <CardHeader>
            <CardTitle className="text-[#004085]">
              {`${patient.first_name} ${patient.last_name}`}
            </CardTitle>
            <div className="space-y-3 text-[#004085]">
              <div className="flex items-center gap-2">
                <FaPhone className="text-primary" />
                <span>{patient.number}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaEnvelope className="text-primary" />
                <span>{patient.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCalendar className="text-primary" />
                <span>DOB: {new Date(patient.dob).toLocaleDateString()}</span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex items-center justify-center !pt-6">
            <Button
              className="rounded-full"
              onClick={() => handleCall(patient)}
              disabled={callingPatient === patient.number}
            >
              <FaPhone className="mr-2" />
              {callingPatient === patient.number ? "Calling..." : "Place Call"}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DuePatientsCard;
