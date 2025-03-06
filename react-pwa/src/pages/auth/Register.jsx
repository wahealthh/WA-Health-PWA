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
  const [formData, setFormData] = useState({
    GP_email: "",
    GP_phone: "",
    GP_name: "",
    GP_address: "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();

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
      const response = await fetch("http://localhost:8000/admin/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          GP_email: formData.GP_email,
          GP_phone: formData.GP_phone,
          GP_name: formData.GP_name,
          GP_address: formData.GP_address,
          password1: formData.password1,
          password2: formData.password2,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

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
              Sign Up
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Input
                  id="GP_email"
                  type="email"
                  placeholder="Email"
                  className="w-[325px]"
                  required
                  value={formData.GP_email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="GP_phone"
                  type="tel"
                  placeholder="Phone Number"
                  className="w-[325px]"
                  required
                  value={formData.GP_phone}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <Input
                  id="GP_name"
                  type="text"
                  placeholder="Name of General Practice"
                  className="w-[325px]"
                  required
                  value={formData.GP_name}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <Input
                  id="GP_address"
                  type="text"
                  placeholder="Address"
                  className="w-[325px]"
                  required
                  value={formData.GP_address}
                  onChange={handleChange}
                />
              </div>

              <div className="grid gap-2">
                <div className="flex items-center"></div>
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
                <div className="flex items-center"></div>
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
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
