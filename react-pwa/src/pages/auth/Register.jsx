import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-side.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Loading from "@/components/loading";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1); // Step 1: Practice details, Step 2: Admin details
  const [formData, setFormData] = useState({
    // Practice details
    practice_name: "",
    practice_address: "",
    practice_email: "",
    practice_phone_number: "",
    // Admin details
    admin_first_name: "",
    admin_last_name: "",
    admin_email: "",
    password1: "",
    password2: "",
    terms: false,
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    // Validate practice details before proceeding
    if (
      !formData.practice_name ||
      !formData.practice_address ||
      !formData.practice_email ||
      !formData.practice_phone_number
    ) {
      toast.error("Please fill in all practice details");
      return;
    }
    setCurrentStep(2);
  };

  const handlePrevStep = () => {
    setCurrentStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate admin details
    if (
      !formData.admin_first_name ||
      !formData.admin_last_name ||
      !formData.admin_email
    ) {
      toast.error("Please fill in all admin details");
      return;
    }

    if (formData.password1 !== formData.password2) {
      toast.error("Passwords do not match");
      return;
    }

    if (!formData.terms) {
      toast.error("Please agree to the Terms and Conditions");
      return;
    }

    setIsLoading(true);

    try {
      // First, register the admin
      const adminResponse = await fetch(
        "http://localhost:8000/admin/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            first_name: formData.admin_first_name,
            last_name: formData.admin_last_name,
            email: formData.admin_email,
            password1: formData.password1,
            password2: formData.password2,
          }),
        }
      );

      const adminData = await adminResponse.json();

      if (!adminResponse.ok) {
        throw new Error(adminData.message || "Admin registration failed");
      }

      // Then, register the practice
      const practiceResponse = await fetch(
        "http://localhost:8000/practice/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // If the admin registration returns a token, you might need to include it here
            ...(adminData.access_token && {
              Authorization: `Bearer ${adminData.access_token}`,
            }),
          },
          credentials: "include",
          body: JSON.stringify({
            practice_name: formData.practice_name,
            practice_address: formData.practice_address,
            practice_email: formData.practice_email,
            practice_phone_number: formData.practice_phone_number,
            admin_id: adminData.id,
          }),
        }
      );

      const practiceData = await practiceResponse.json();

      if (!practiceResponse.ok) {
        throw new Error(practiceData.message || "Practice registration failed");
      }

      // If both registrations are successful, navigate to success page
      navigate("/register-success");
    } catch (error) {
      toast.error(error.message || "Registration failed");
      console.error("Registration error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Link to="/">
        <div>
          <img src={logo} alt="WA-Health" className="h-16 m-6 drop-shadow-lg" />
        </div>
      </Link>
      <Card className="mx-auto min-w-sm shadow-lg">
        <CardHeader>
          <CardTitle>
            <Badge
              className="text-primary shadow rounded-full text-lg font-[400px]"
              variant="outline"
            >
              {currentStep === 1 ? "Practice Details" : "Admin Details"}
            </Badge>
            <div className="mt-2 text-sm text-muted-foreground">
              Step {currentStep} of 2
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={currentStep === 1 ? handleNextStep : handleSubmit}>
            <div className="grid gap-4">
              {currentStep === 1 ? (
                // Step 1: Practice Details
                <>
                  <div className="grid gap-2">
                    <Input
                      id="practice_name"
                      type="text"
                      placeholder="Name of General Practice"
                      className="w-[325px]"
                      required
                      value={formData.practice_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="practice_address"
                      type="text"
                      placeholder="Practice Address"
                      className="w-[325px]"
                      required
                      value={formData.practice_address}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="practice_email"
                      type="email"
                      placeholder="Practice Email"
                      className="w-[325px]"
                      required
                      value={formData.practice_email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="practice_phone_number"
                      type="tel"
                      placeholder="Practice Phone Number"
                      className="w-[325px]"
                      required
                      value={formData.practice_phone_number}
                      onChange={handleChange}
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Next
                  </Button>
                </>
              ) : (
                // Step 2: Admin Details
                <>
                  <div className="grid gap-2">
                    <Input
                      id="admin_first_name"
                      type="text"
                      placeholder="First Name"
                      className="w-[325px]"
                      required
                      value={formData.admin_first_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="admin_last_name"
                      type="text"
                      placeholder="Last Name"
                      className="w-[325px]"
                      required
                      value={formData.admin_last_name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="admin_email"
                      type="email"
                      placeholder="Admin Email"
                      className="w-[325px]"
                      required
                      value={formData.admin_email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password1"
                      type="password"
                      placeholder="Password"
                      required
                      value={formData.password1}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Input
                      id="password2"
                      type="password"
                      placeholder="Confirm Password"
                      required
                      value={formData.password2}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, terms: checked }))
                      }
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the Terms and Conditions
                    </label>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full"
                      onClick={handlePrevStep}
                    >
                      Back
                    </Button>
                    <Button type="submit" className="w-full">
                      Sign Up
                    </Button>
                  </div>
                </>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
