/* eslint-disable react-hooks/exhaustive-deps */
import {
  School,
  User,
  CreditCard,
  Settings,
  LogOut,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import React, { useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { Separator } from "@radix-ui/react-dropdown-menu";
import { Navigate, Outlet, useNavigate } from "react-router";
import { Link } from "react-router";
import {
  useLoadUserQuery,
  useLogoutUserMutation,
} from "@/features/api/authapi";
import { toast } from "sonner";
import { useSelector } from "react-redux";
import DarkMode from "../DarkMode";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.auth.user);
  const isAuthenticated = useSelector((store) => store.auth.isAuthenticated);
  const { refetch } = useLoadUserQuery({
    skip: !isAuthenticated,
  });

  useEffect(() => {
    if (isAuthenticated) {
      refetch();
    }
  }, [refetch, isAuthenticated]);

  const [logoutUser, { data, isSuccess }] = useLogoutUserMutation();
  const logoutHandler = async () => {
    await logoutUser();
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message) || "User log out ";
      navigate("/login");
    }
  }, [isSuccess]);

  return (
    <div className="h-16 dark:bg-[#020817] bg-white border-b dark:border-b-gray-800 border-b-gray-200 fixed top-0 left-0 right-0 duration-300 z-50 shadow-sm dark:shadow-gray-900/20">
      {/* Desktop */}
      <div className="max-w-7xl mx-auto hidden md:flex justify-between items-center gap-10 h-full px-4">
        <div className="flex items-center gap-3">
          <School size={28} className="text-indigo-600 dark:text-indigo-400" />
          <Link to="/">
            <h1 className="hidden md:block font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
              E-Learning
            </h1>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <DarkMode />
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.photoUrl || "https://github.com/shadcn.png"}
                      alt="@shadcn"
                    />
                    <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                      {user.name
                        ? user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                        : "CN"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-56 mt-2 shadow-lg dark:border-gray-700"
                align="end"
                forceMount
              >
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.name || "User"}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email || "user@example.com"}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => navigate("/profile")}
                  >
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                    onClick={() => navigate("/my-learning")}
                  >
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    <span>My learning</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                {user?.role === "instructor" && (
                  <>
                    <DropdownMenuSeparator className="dark:bg-gray-700" />
                    <DropdownMenuItem
                      className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                      onClick={() => navigate("/admin/dashboard")}
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </DropdownMenuItem>
                  </>
                )}
                <DropdownMenuSeparator className="dark:bg-gray-700" />
                <DropdownMenuItem
                  className="cursor-pointer text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:text-red-400 focus:text-red-600"
                  onClick={logoutHandler}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="border-indigo-600 text-indigo-600 hover:text-indigo-700 dark:border-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
              >
                Signup
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile device */}
      <div className="flex md:hidden items-center justify-between px-4 h-full">
        <Link to={"/"}>
          <h1 className="font-bold text-2xl bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            E-learning
          </h1>
        </Link>
        <MobileNavbar user={user} logoutHandler={logoutHandler} />
      </div>
    </div>
  );
};

export default Navbar;

const MobileNavbar = ({ user, logoutHandler }) => {
  const navigate = useNavigate();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="rounded-full hover:bg-gray-200 dark:hover:bg-gray-800"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="w-[280px] sm:w-[300px]">
        <SheetHeader className="text-left">
          <SheetTitle className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent dark:from-indigo-400 dark:to-purple-400">
            E-learning
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full py-6">
          {user ? (
            <div className="flex items-center gap-3 mb-6 px-2 py-3 rounded-lg bg-gray-100 dark:bg-gray-800">
              <Avatar className="h-10 w-10">
                <AvatarImage
                  src={user.photoUrl || "https://github.com/shadcn.png"}
                  alt="@shadcn"
                />
                <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200">
                  {user.name
                    ? user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")
                    : "CN"}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{user.name || "User"}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {user.email || "user@example.com"}
                </p>
              </div>
            </div>
          ) : (
            <div className="flex gap-2 mb-6">
              <Button
                variant="outline"
                onClick={() => navigate("/login")}
                className="w-full border-indigo-600 text-indigo-600 hover:text-indigo-700 dark:border-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Login
              </Button>
              <Button
                onClick={() => navigate("/signup")}
                className="w-full bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-400 dark:hover:bg-indigo-500"
              >
                Signup
              </Button>
            </div>
          )}

          <nav className="flex-1 space-y-1">
            {user && (
              <>
                <SheetClose asChild>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
                  >
                    <User className="mr-3 h-5 w-5" />
                    Profile
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to="/my-learning"
                    className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
                  >
                    <LayoutDashboard className="mr-3 h-5 w-5" />
                    My Learning
                  </Link>
                </SheetClose>
                {user?.role === "instructor" && (
                  <SheetClose asChild>
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-medium"
                    >
                      <Settings className="mr-3 h-5 w-5" />
                      Dashboard
                    </Link>
                  </SheetClose>
                )}
              </>
            )}
          </nav>

          <div className="mt-auto space-y-2">
            <div className="flex items-center justify-between px-3 py-2">
              <span className="text-sm">Theme</span>
              <DarkMode />
            </div>
            {user && (
              <SheetClose asChild>
                <button
                  onClick={logoutHandler}
                  className="w-full flex items-center px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 dark:text-red-400 text-sm font-medium"
                >
                  <LogOut className="mr-3 h-5 w-5" />
                  Logout
                </button>
              </SheetClose>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
