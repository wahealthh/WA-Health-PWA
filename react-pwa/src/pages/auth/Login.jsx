import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import logo from "@/assets/logo-side.png";

const Login = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-center">
      <div>
        <img src={logo} alt="WA-Health" className="h-16 m-6 drop-shadow-lg" />
      </div>
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
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@nhs.net"
                className="w-[325px]"
                required
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
              Login
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/register" className="underline">
              Sign up
            </Link>
          </div>
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
