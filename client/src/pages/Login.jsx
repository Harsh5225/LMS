/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authapi";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();

  const [signupinput, setSignupinput] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [logininput, setLogininput] = useState({
    email: "",
    password: "",
  });

  // we get data from mutation here
  const [
    registerUser,
    {
      data: registerData,
      error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    loginUser,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupinput({ ...signupinput, [name]: value });
    } else {
      setLogininput({ ...logininput, [name]: value });
    }
  };

  //

  // fucntion te get data
  const user = useSelector((state) => state.auth.user);

  const handleRegistration = async (type) => {
    const data = type === "login" ? logininput : signupinput;
    console.log(data);

    const action = type === "signup" ? registerUser : loginUser; // checks signup / login and use action

    await action(data);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "signUp successfull");
    }
    if (loginIsSuccess && loginData && user) {
      console.log(user, loginData);
      toast.success(loginData.message || "Login successful");

      navigate("/");
    }
    if (registerError) {
      toast.error(registerData?.error?.message || "signUp failed");
    }
    if (loginError) {
      toast.error(loginData?.error?.message || "Login failed");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    loginData,
    registerData,
    loginError,
    registerIsSuccess,
    loginIsSuccess,
    registerError,
  ]);

  return (
    <div className="flex items-center w-full justify-center mt-18">
      <Tabs defaultValue="login" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Register yourself on our platform.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  placeholder="eg. Harsh"
                  required="true"
                  name="name"
                  value={signupinput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="username">Email</Label>
                <Input
                  type="email"
                  id="username"
                  placeholder="eg. harsh123@gmail.com"
                  name="email"
                  value={signupinput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  type="password"
                  placeholder="eg. xyz@#"
                  name="password"
                  value={signupinput.password} // controlled components
                  onChange={(e) => changeInputHandler(e, "signup")}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin">
                      Please Wait
                    </Loader2>
                  </>
                ) : (
                  "Signup"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login with your account credentials.
              </CardDescription>
            </CardHeader>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleRegistration("login");
              }}
            >
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Email</Label>
                  <Input
                    type="email"
                    id="username"
                    placeholder="eg. harsh123@gmail.com"
                    name="email"
                    value={logininput.email}
                    onChange={(e) => changeInputHandler(e, "")}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="new">password</Label>
                  <Input
                    type="password"
                    placeholder="eg. xyz@#"
                    name="password"
                    value={logininput.password}
                    onChange={(e) => changeInputHandler(e, "")}
                  />
                </div>
              </CardContent>
              <CardFooter className="mt-2">
                <Button
                  type="submit" // Changed to submit type
                  disabled={loginIsLoading}
                >
                  {loginIsLoading ? (
                    <>
                      <Loader2 className="mr-2  h-4 w-4 animate-spin" />
                      Please Wait
                    </>
                  ) : (
                    "Login"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
