import { Button } from "components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "components/ui/card";
import { Input } from "components/ui/input";
import { Label } from "components/ui/label";
import { useRef } from "react";
import useStore from "store/store";

type Props = {};

const SignInPage = (props: Props) => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const signIn = useStore((state) => state.signIn);
  const signInUser = () => {
    const username = usernameRef?.current?.value;
    const password = passwordRef?.current?.value;
    if (username && password) {
      signIn(username, password);
    }
  };
  return (
    <Card className="rounded-xl py-4 px-2 drop-shadow-lg">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
        <CardDescription>Please login to continue.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="space-y-8">
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
                placeholder="Enter your password"
                className="rounded"
                ref={passwordRef}
                type="password"
              />
            </div>
          </div>
          <div className="grid w-full items-center">
            <Button onClick={signInUser} className="rounded">
              Login
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default SignInPage;
