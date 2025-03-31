import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  FaPhone,
  FaArrowLeft,
  FaUser,
  FaEnvelope,
  FaCalendar,
} from "react-icons/fa6";
import { PiRobotFill } from "react-icons/pi";

const DemoRecallPage = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    number: "",
    email: "",
    dob: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [callId, setCallId] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.number || formData.number.length < 10) {
      toast.error("Please enter a valid phone number");
      return;
    }

    if (!formData.first_name || !formData.last_name) {
      toast.error("Please enter your name");
      return;
    }

    if (!formData.email) {
      toast.error("Please enter your email");
      return;
    }

    if (!formData.dob) {
      toast.error("Please enter your date of birth");
      return;
    }

    setIsSubmitting(true);

    try {
      // Call the demo endpoint
      const response = await fetch(
        "https://recall-backend.wahealth.co.uk/patients/demo/call",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name: formData.first_name,
            last_name: formData.last_name,
            number: formData.number,
            email: formData.email,
            dob: formData.dob,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.detail?.message || "Failed to initiate demo call"
        );
      }

      const data = await response.json();

      // Set the call ID for reference
      setCallId(data.call_id);

      // Show success state
      setShowSuccess(true);
      toast.success("AI Recall initiated!", {
        description: `We'll call you at ${formData.number} shortly`,
      });
    } catch (error) {
      toast.error("Something went wrong", {
        description: error.message || "Please try again later",
      });
      console.error("Demo call error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 px-4">
      <Link
        to="/"
        className="absolute top-6 left-6 text-slate-700 hover:text-primary flex items-center gap-2 font-medium"
      >
        <FaArrowLeft className="h-3.5 w-3.5" /> Back to Home
      </Link>

      <Card className="w-full max-w-md shadow-lg border-0 bg-transparent backdrop-blur-sm">
        <CardHeader className="text-center pb-4">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center text-white p-3">
            <PiRobotFill className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">
            AI-Powered Recall
          </CardTitle>
          <CardDescription className="text-slate-600 mt-2">
            Experience our intelligent patient recall system
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!showSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    First Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaUser className="h-3.5 w-3.5 text-slate-400" />
                    </div>
                    <Input
                      id="first_name"
                      name="first_name"
                      type="text"
                      placeholder="John"
                      value={formData.first_name}
                      onChange={handleChange}
                      className="pl-10 border-slate-300 focus:border-purple-400 focus:ring-purple-400 bg-white/50"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-slate-700"
                  >
                    Last Name
                  </label>
                  <Input
                    id="last_name"
                    name="last_name"
                    type="text"
                    placeholder="Smith"
                    value={formData.last_name}
                    onChange={handleChange}
                    className="border-slate-300 focus:border-purple-400 focus:ring-purple-400 bg-white/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium text-slate-700"
                >
                  Phone Number
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaPhone className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    id="number"
                    name="number"
                    type="tel"
                    placeholder="e.g. +447123456789"
                    value={formData.number}
                    onChange={handleChange}
                    className="pl-10 border-slate-300 focus:border-purple-400 focus:ring-purple-400 bg-white/50"
                    required
                  />
                </div>
                <p className="text-xs text-slate-500">
                  Include country code (e.g +44 for UK)
                </p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700"
                >
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaEnvelope className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-10 border-slate-300 focus:border-purple-400 focus:ring-purple-400 bg-white/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="dob"
                  className="block text-sm font-medium text-slate-700"
                >
                  Date of Birth
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaCalendar className="h-4 w-4 text-slate-400" />
                  </div>
                  <Input
                    id="dob"
                    name="dob"
                    type="date"
                    value={formData.dob}
                    onChange={handleChange}
                    className="pl-10 border-slate-300 focus:border-purple-400 focus:ring-purple-400 bg-white/50"
                    required
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500 pt-1">
                For demo purposes only.
              </p>

              <Button
                type="submit"
                className="w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "✨ Start AI Recall Demo"}
              </Button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="bg-white/30 backdrop-blur-sm text-slate-800 p-5 rounded-xl border border-purple-100">
                <h3 className="font-semibold mb-1">Demo Initiated!</h3>
                <p>
                  Our AI system will call {formData.first_name} at{" "}
                  {formData.number} shortly to demonstrate the smart recall
                  process.
                </p>
                {callId && (
                  <div className="mt-3 pt-3 border-t border-purple-100">
                    <p className="text-xs text-slate-600">
                      Call Reference: {callId.substring(0, 8)}...
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    setShowSuccess(false);
                    setFormData({
                      first_name: "",
                      last_name: "",
                      number: "",
                      email: "",
                      dob: "",
                    });
                    setCallId(null);
                  }}
                  variant="outline"
                  className="w-full rounded-full border-slate-300 text-slate-700 hover:bg-white/20"
                >
                  Try Another Number
                </Button>

                <Link to="/register" className="block">
                  <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all">
                    Sign Up for Full Access
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DemoRecallPage;
