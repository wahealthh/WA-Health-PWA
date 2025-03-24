import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo-side.png";
import { Link } from "react-router-dom";
import { FaCheckCircle, FaArrowRight } from "react-icons/fa";

const EmailVerified = () => {
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
              Email Verified!
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-lg mb-6">
            Your email has been successfully verified.
            <br />
            <span className="text-muted-foreground text-sm">
              You can now log in to your account.
            </span>
          </p>
          <div className="flex justify-center">
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

export default EmailVerified;
