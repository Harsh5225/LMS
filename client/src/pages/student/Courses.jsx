import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import Course from "./Course";
import { useGetPublishedCourseQuery } from "@/features/api/courseApi";

const CourseSkeleton = () => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-sm hover:shadow-md transition-all rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700">
      <Skeleton className="w-full h-48 rounded-b-none" />
      <div className="p-5 space-y-3">
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
        <div className="text-center p-6 max-w-md mx-auto bg-red-50 dark:bg-red-900/20 rounded-lg">
          <h1 className="text-red-600 dark:text-red-400 text-xl font-semibold mb-2">
            Error Loading Courses
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Some error occurred while fetching courses. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Explore Our Courses
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-gray-500 dark:text-gray-400 sm:mt-4">
            Learn new skills with our expertly crafted courses
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {isLoading
            ? [...Array(8)].map((_, index) => <CourseSkeleton key={index} />)
            : data?.courses?.map((course) => (
                <Course key={course._id} course={course} />
              ))}
        </div>

        {!isLoading && data?.courses?.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-500 dark:text-gray-400">
              No courses available at the moment
            </h3>
          </div>
        )}
      </div>
    </section>
  );
};

export default Courses;