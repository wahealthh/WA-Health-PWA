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
            Dishcharge documents, referrals, register patients, and track
            licenses.
          </p>
          <div className="flex gap-4 mt-12">
            <Link to="/login">
              <Button className="rounded-full w-32">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="outline" className="rounded-full w-32">
                Sign Up
              </Button>
            </Link>
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
