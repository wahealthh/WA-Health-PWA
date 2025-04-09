import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { FaArrowLeft, FaLock } from "react-icons/fa6";

const RateLimitExceededPage = () => {
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
            <FaLock className="h-10 w-10" />
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 inline-block text-transparent bg-clip-text">
            Demo Limit Reached
          </CardTitle>
          <CardDescription className="text-slate-600 mt-2">
            You&apos;ve reached the maximum number of demo calls for this hour
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-white/30 backdrop-blur-sm text-slate-800 p-5 rounded-xl border border-purple-100">
            <h3 className="font-semibold mb-2">Ready for More?</h3>
            <p className="text-slate-600">
              You&apos;ve reached the limit for demo calls. You can try again in
              an hour, or sign up for a full account to get unlimited access to
              our AI-powered recall system.
            </p>
          </div>

          <div className="space-y-3">
            <Link to="/register" className="block">
              <Button className="w-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all">
                Sign Up for Full Access
              </Button>
            </Link>

            <Link to="/" className="block">
              <Button
                variant="outline"
                className="w-full rounded-full border-slate-300 text-slate-700 hover:bg-white/20"
              >
                Return to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RateLimitExceededPage;
