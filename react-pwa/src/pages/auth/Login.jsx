import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo-side.png";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loading from "@/components/loading";
import { useAuth } from "@/hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(formData.email, formData.password);

      if (success) {
        // Navigate to the protected route or the page user was trying to access
        const from = location.state?.from?.pathname || "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error("Login error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <Link to={"/"}>
        <div>
          <img src={logo} alt="WA-Health" className="h-16 m-6 drop-shadow-lg" />
        </div>
      </Link>
      <Card className="mx-auto min-w-sm shadow-lg">
        <CardHeader>
          <CardTitle>
            <Badge
              className="shadow text-primary rounded-full text-lg font-[400px]"
              variant="outline"
            >
              Login
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="admin@nhs.net"
                  className="w-[325px]"
                  required
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  placeholder="•••••••••••"
                  required
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="remember"
                  checked={formData.remember}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, remember: checked }))
                  }
                />
                <label
                  htmlFor="remember"
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/register" className="underline">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <Link
        to="/"
        className="text-sm text-primary mt-7 underline hover:text-primary/85"
      >
        Forgot your password?
      </Link>
    </div>
  );
};

export default Login;
