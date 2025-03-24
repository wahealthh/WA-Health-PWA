import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo-side.png";
import Loading from "@/components/loading";
import { toast } from "sonner";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://auth.wahealth.co.uk/auth/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
          }),
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.detail || "Failed to request password reset");
      }

      setSubmitted(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error(error.message || "Failed to request password reset");
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
              Reset Password
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {submitted ? (
            <div className="text-center">
              <h2 className="text-lg font-medium mb-2">Check Your Email</h2>
              <p className="text-sm text-gray-600 mb-4">
                We&apos;ve sent a password reset link to{" "}
                <strong>{email}</strong>. Please check your inbox and follow the
                instructions.
              </p>
              <p className="text-xs text-gray-500 mb-4">
                If you don&apos;t see the email, check your spam folder.
              </p>
              <Button
                variant="outline"
                className="mt-2"
                onClick={() => navigate("/login")}
              >
                Return to Login
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <p className="text-sm text-gray-600">
                  Enter your email address and we&apos;ll send you a link to
                  reset your password.
                </p>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="admin@nhs.net"
                    className="w-[325px]"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Send Reset Link
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Remember your password?{" "}
                <Link to="/login" className="underline">
                  Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ForgotPassword;
