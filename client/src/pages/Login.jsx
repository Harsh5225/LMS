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
import { Loader2, School, Sparkles, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determine default tab based on route
  const defaultTab = location.pathname === "/signup" ? "signup" : "login";

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
      // Switch to login tab after successful signup
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    }
    if (loginIsSuccess && loginData) {
      console.log(user, loginData);
      toast.success(loginData.message || "Login successful");
      // Navigate after a short delay to ensure state is updated
      setTimeout(() => {
        navigate("/");
      }, 500);
    }
    if (registerError) {
      const errorMessage = registerError?.data?.message || registerError?.message || "SignUp failed";
      toast.error(errorMessage);
    }
    if (loginError) {
      const errorMessage = loginError?.data?.message || loginError?.message || "Login failed";
      toast.error(errorMessage);
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
    user,
    navigate,
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-800 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800 flex items-center justify-center px-4 py-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.25),transparent_45%),radial-gradient(circle_at_bottom,rgba(59,130,246,0.35),transparent_55%)] pointer-events-none" />
      
      <div className="relative w-full max-w-md">
        {/* Logo/Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <School size={32} className="text-white" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
              E-Learning
            </h1>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1 text-white/90 backdrop-blur mb-4">
            <Sparkles className="h-4 w-4" />
            <span className="text-sm font-medium">Start your learning journey</span>
          </div>
        </div>

        {/* Auth Card */}
        <Card className="border-white/20 bg-white/95 dark:bg-slate-900/95 backdrop-blur shadow-2xl">
          <CardHeader className="space-y-1 pb-4">
            <Tabs value={defaultTab} className="w-full" onValueChange={(value) => {
              if (value === "signup") {
                navigate("/signup");
              } else {
                navigate("/login");
              }
            }}>
              <TabsList className="grid w-full grid-cols-2 bg-slate-100 dark:bg-slate-800">
                <TabsTrigger 
                  value="signup"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-indigo-400"
                >
                  Signup
                </TabsTrigger>
                <TabsTrigger 
                  value="login"
                  className="data-[state=active]:bg-white data-[state=active]:text-indigo-600 dark:data-[state=active]:bg-slate-900 dark:data-[state=active]:text-indigo-400"
                >
                  Login
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="signup" className="mt-6">
                <CardTitle className="text-2xl mb-2">Create your account</CardTitle>
                <CardDescription className="text-base">
                  Join thousands of learners and start your journey today.
                </CardDescription>
                <CardContent className="space-y-4 pt-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-700 dark:text-slate-300">Name</Label>
                    <Input
                      type="text"
                      placeholder="Enter your full name"
                      required="true"
                      name="name"
                      value={signupinput.name}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      className="h-11 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="text-slate-700 dark:text-slate-300">Email</Label>
                    <Input
                      type="email"
                      id="signup-email"
                      placeholder="your.email@example.com"
                      name="email"
                      value={signupinput.email}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      className="h-11 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="text-slate-700 dark:text-slate-300">Password</Label>
                    <Input
                      type="password"
                      id="signup-password"
                      placeholder="Create a strong password"
                      name="password"
                      value={signupinput.password}
                      onChange={(e) => changeInputHandler(e, "signup")}
                      className="h-11 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400"
                    />
                  </div>
                </CardContent>
                <CardFooter className="pt-4">
                  <Button
                    disabled={registerIsLoading}
                    onClick={() => handleRegistration("signup")}
                    className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                  >
                    {registerIsLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Sign up
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </CardFooter>
              </TabsContent>
              
              <TabsContent value="login" className="mt-6">
                <CardTitle className="text-2xl mb-2">Welcome back</CardTitle>
                <CardDescription className="text-base">
                  Sign in to continue your learning journey.
                </CardDescription>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleRegistration("login");
                  }}
                >
                  <CardContent className="space-y-4 pt-6">
                    <div className="space-y-2">
                      <Label htmlFor="login-email" className="text-slate-700 dark:text-slate-300">Email</Label>
                      <Input
                        type="email"
                        id="login-email"
                        placeholder="your.email@example.com"
                        name="email"
                        value={logininput.email}
                        onChange={(e) => changeInputHandler(e, "")}
                        className="h-11 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password" className="text-slate-700 dark:text-slate-300">Password</Label>
                      <Input
                        type="password"
                        id="login-password"
                        placeholder="Enter your password"
                        name="password"
                        value={logininput.password}
                        onChange={(e) => changeInputHandler(e, "")}
                        className="h-11 border-slate-300 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-400"
                      />
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      type="submit"
                      disabled={loginIsLoading}
                      className="w-full h-11 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-semibold transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      {loginIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign in
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </CardHeader>
        </Card>

        {/* Footer text */}
        <p className="text-center mt-6 text-white/80 text-sm">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
};

export default Login;
