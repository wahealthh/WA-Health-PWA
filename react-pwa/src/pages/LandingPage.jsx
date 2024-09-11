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
          <Link to="/login">
            <Button className="rounded-full w-32 mt-12">Login</Button>
          </Link>
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
