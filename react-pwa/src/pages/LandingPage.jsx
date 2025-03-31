import { Button } from "@/components/ui/button";
import logoMain from "@/assets/logo-main.png";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <>
      <div className="flex my-16 items-center gap-64 mx-16">
        <div>
          <h1 className="text-5xl text-primary">We Advance Health</h1>
          <h3 className="text-4xl mt-16 font-semibold">Automate tasks</h3>
          <p className="max-w-96">
            Patient recall, Dishcharge documents, referrals, register patients,
            and track licenses.
          </p>
          <div className="flex flex-col items-center gap-6 mt-12">
            <div className="flex gap-4 w-full">
              <Link to="/login" className="w-1/4">
                <Button className="rounded-full w-full">Login</Button>
              </Link>
              <Link to="/register" className="w-1/4">
                <Button variant="outline" className="rounded-full w-full">
                  Sign Up
                </Button>
              </Link>
            </div>
            <div className="w-full flex justify-left">
              <Link to="/demo-recall" className="w-1/2">
                <Button className="rounded-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-0 shadow-md hover:shadow-lg transition-all w-full">
                  ✨ Try AI-Powered Recall
                </Button>
              </Link>
            </div>
          </div>
        </div>
        <div>
          <img
            src={logoMain}
            alt="WA Health Logo"
            className="h-72 w-auto object-contain"
          />
        </div>
      </div>
    </>
  );
};

export default LandingPage;
