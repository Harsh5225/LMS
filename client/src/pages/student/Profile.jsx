import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Pencil, User } from "lucide-react";
import React, { useState, useEffect } from "react";
import Course from "./Course";
import {
  useLoadUserQuery,
  useUpdateUserMutation,
} from "@/features/api/authapi.js";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

const Profile = () => {
  const [name, setName] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const { data, isLoading, refetch } = useLoadUserQuery();
  console.log("data of profile", data);
  const { user } = data || {};
  console.log("user in profile", user);

  const [
    updateUser,
    { isLoading: updateUserIsLoading, isError, isSuccess, error },
  ] = useUpdateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Profile updated successfully");
      refetch();
    }
    if (isError) {
      toast.error(error?.data?.message || "Failed to update profile");
    }
  }, [isSuccess, isError, error, refetch]);

  const updateUserHandler = async () => {
    const formData = new FormData();
    if (name) formData.append("name", name);
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);
    await updateUser(formData);
  };

  const changeHandler = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfilePhoto(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
        <div className="flex flex-col items-center">
          <Skeleton className="h-8 w-48 mb-8" />
          <div className="w-full flex flex-col md:flex-row items-center md:items-start gap-8 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-sm">
            <Skeleton className="h-32 w-32 rounded-full" />
            <div className="flex-1 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="h-10 w-32 mt-4" />
            </div>
          </div>
          <Skeleton className="h-6 w-64 mt-12 mb-6" />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-64 w-full rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 sm:py-16 lg:py-20">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          My Profile
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">
          Manage your account settings and enrolled courses
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="relative group">
            <Avatar className="h-32 w-32 border-4 border-white dark:border-gray-800 shadow-md">
              <AvatarImage
                src={
                  previewImage ||
                  user?.photoUrl ||
                  "https://github.com/shadcn.png"
                }
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-indigo-100 dark:bg-indigo-900 text-4xl font-medium text-indigo-800 dark:text-indigo-200">
                {user?.name?.charAt(0).toUpperCase() || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <Pencil className="text-white h-6 w-6" />
            </div>
          </div>

          <div className="flex-1 space-y-3">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {user?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">{user?.email}</p>
            </div>

            <Badge variant="outline" className="text-sm">
              {user?.role?.toUpperCase()}
            </Badge>

            <div className="pt-2">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Pencil className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                    <DialogDescription>
                      Make changes to your profile here. Click save when you're
                      done.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={user?.name}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo">Profile Photo</Label>
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={previewImage || user?.photoUrl}
                            alt="Preview"
                          />
                          <AvatarFallback>
                            <User className="h-5 w-5" />
                          </AvatarFallback>
                        </Avatar>
                        <Input
                          id="photo"
                          type="file"
                          accept="image/*"
                          onChange={changeHandler}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button
                      onClick={updateUserHandler}
                      disabled={updateUserIsLoading || (!name && !profilePhoto)}
                    >
                      {updateUserIsLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save changes"
                      )}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Enrolled Courses
        </h2>
        {user?.enrolledCourses?.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-8 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700 mb-4">
              <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
              No courses enrolled
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              You haven't enrolled in any courses yet.
            </p>
            <Button className="mt-4">Browse Courses</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {user?.enrolledCourses?.map((course) => (
              <Course key={course._id} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
