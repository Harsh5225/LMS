import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const CourseSkeleton = () => {
  return (
    <div className="glass-card p-5">
      <Skeleton className="w-full h-48 rounded-2xl" />
      <div className="mt-5 space-y-3">
        <Skeleton className="h-6 w-3/4 rounded-full" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-full" />
          </div>
          <Skeleton className="h-4 w-16 rounded-full" />
        </div>
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/3 rounded-full" />
          <Skeleton className="h-4 w-1/4 rounded-full" />
        </div>
      </div>
    </div>
  );
};

const Courses = () => {
  const { data, isLoading, isError } = useGetPublishedCourseQuery();

  if (isError) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <div className="page-section max-w-md text-center">
          <h1 className="text-red-600 dark:text-red-400 text-xl font-semibold mb-2">
            Error Loading Courses
          </h1>
          <p className="page-subtitle">
            Some error occurred while fetching courses. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="text-center space-y-3">
        <h2 className="text-3xl font-bold sm:text-4xl">Explore Our Courses</h2>
        <p className="mx-auto max-w-2xl text-slate-600 dark:text-slate-300">
          Learn new skills with our expertly crafted courses
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {isLoading
          ? [...Array(8)].map((_, index) => <CourseSkeleton key={index} />)
          : data?.courses?.map((course) => <Course key={course._id} course={course} />)}
      </div>

      {!isLoading && data?.courses?.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-slate-600 dark:text-slate-300">
            No courses available at the moment
          </h3>
        </div>
      )}
    </div>
  );
};

export default Courses;