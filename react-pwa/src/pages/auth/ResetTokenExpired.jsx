import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/logo-side.png";
import { FaExclamationCircle, FaEnvelope, FaArrowRight } from "react-icons/fa";

const ResetTokenExpired = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-4">
      <Link to="/">
        <div>
          <img src={logo} alt="WA-Health" className="h-16 m-6 drop-shadow-lg" />
        </div>
      </Link>
      <Card className="mx-auto max-w-md w-full shadow-lg rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-yellow-400 to-red-400 h-2 w-full"></div>
        <CardHeader className="pb-2">
          <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-2 border-2 border-yellow-100">
            <FaExclamationCircle className="text-yellow-500 text-4xl" />
          </div>
          <CardTitle className="text-center">
            <Badge
              className="text-primary shadow rounded-full text-lg font-medium px-4 py-1"
              variant="outline"
            >
              Link Expired
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            The password reset link has expired or is invalid.
            <br />
            Please request a new password reset link.
          </p>
          <div className="flex flex-col items-center gap-3">
            <Link to="/forgot-password">
              <Button className="w-48 gap-2">
                <FaEnvelope className="h-4 w-4" />
                Request New Link
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" className="w-48 gap-2">
                <FaArrowRight className="h-4 w-4" />
                Back to Login
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetTokenExpired;
