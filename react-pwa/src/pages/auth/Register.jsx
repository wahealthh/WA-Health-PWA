import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import logo from "@/assets/logo-side.png";
import { Link } from "react-router-dom";
const Register = () => {
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="name"
                type="text"
                placeholder="Name"
                className="w-[325px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="Email"
                className="w-[325px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="GP"
                type="text"
                placeholder="Name of General Practice"
                className="w-[325px]"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center"></div>
              <Input
                id="password1"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center"></div>
              <Input
                id="password2"
                type="password"
                placeholder="Confirm Password"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
            <Button type="submit" className="w-full">
              Sign Up
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
