import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo-side.png";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaEnvelope, FaArrowRight } from "react-icons/fa";

const RegisterSuccess = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <Link to="/">
        <div>
          <img src={logo} alt="WA-Health" className="h-16 m-6 drop-shadow-lg" />
        </div>
      </Link>
      <Card className="mx-auto max-w-md w-full shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 w-full"></div>
        <CardHeader className="pb-2">
          <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-green-100">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <CardTitle className="text-center">
            <Badge
              className="text-primary shadow rounded-full text-lg font-medium px-4 py-1"
              variant="outline"
            >
              Registration Successful!
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center pt-2">
          <div className="text-center mb-8">
            <p className="mb-6 text-lg">
              Thank you for registering with WA-Health. Your account has been
              created successfully.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-100">
              <div className="flex items-center justify-center gap-2 text-primary mb-2">
                <FaEnvelope className="text-xl" />
                <p className="font-medium">Please check your email</p>
              </div>
              <p className="text-sm text-muted-foreground">
                We&apos;ve sent a verification link to your email address.
                Please check your inbox and click the link to verify your
                account.
              </p>
            </div>
          </div>
          <div className="flex justify-center w-full">
            <Link to="/login">
              <Button size="sm" className="px-6 gap-2 group">
                Go to Login
                <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegisterSuccess;
