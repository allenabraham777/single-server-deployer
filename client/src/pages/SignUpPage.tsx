import { Label } from "@radix-ui/react-label";
import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Link } from "react-router-dom";

type Props = {};

const SignUpPage = (props: Props) => {
  return (
    <Card className="rounded-xl py-4 px-2 drop-shadow-lg">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Signup to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                className="rounded"
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                placeholder="Enter your username"
                className="rounded"
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="rounded"
              />
            </div>
          </div>
          <div className="grid w-full items-center">
            <Button className="rounded">Create Account</Button>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        Already have an account?{" "}
        <Link to="/signin">
          <Button className="px-2" variant="link">
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
