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
import { Loader2 } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import useStore from "store/store";

type Props = {};

const SignUpPage = (props: Props) => {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signUp = useStore((state) => state.signUp);
  const user = useStore((state) => state.user);

  const handleSignup = (e: any) => {
    e.preventDefault();
    const name = nameRef?.current?.value;
    const email = emailRef?.current?.value;
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    if (name && email && username && password) {
      signUp(name, email, username, password);
    }
  };

  return (
    <Card className="rounded-xl py-4 px-2 drop-shadow-lg">
      <CardHeader>
        <CardTitle>Create your account</CardTitle>
        <CardDescription>Signup to get started.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8" onSubmit={handleSignup}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your full name"
                className="rounded"
                ref={nameRef}
              />
            </div>
          </div>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email address"
                className="rounded"
                ref={emailRef}
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
                ref={usernameRef}
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
                ref={passwordRef}
              />
            </div>
          </div>
          <div className="grid w-full items-center">
            <Button className="rounded" disabled={user.loading}>
              {user.loading ? (
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
              ) : (
                <>Create Account</>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className="text-xs">
        Already have an account?{" "}
        <Link to="/signin">
          <Button className="px-1 text-xs" variant="link">
            Sign In
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SignUpPage;
