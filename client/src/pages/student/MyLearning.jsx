import React from "react";
import Course from "./Course";
import { useLoadUserQuery } from "@/features/api/authapi";

const MyLearning = () => {
  const { data, isLoading } = useLoadUserQuery();

  const myLearning = data?.user?.enrolledCourses || [];
  return (
    <div className="page-shell px-6 py-10 md:px-10">
      <div className="text-center md:text-left">
        <h1 className="text-3xl font-bold">My learning</h1>
        <p className="page-subtitle mt-2 max-w-2xl">
          Track your enrolled programs and jump back into active lessons.
        </p>
      </div>

      <div className="mt-10">
        {isLoading ? (
          <MyLearningSkeleton />
        ) : myLearning.length === 0 ? (
          <div className="page-section text-center">
            <h2 className="text-xl font-semibold">You are not enrolled in any course.</h2>
            <p className="page-subtitle mt-2">
              Explore the catalog to find a course that matches your goals.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {myLearning.map((course, index) => (
              <Course key={index} course={course} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyLearning;

// Skeleton component for loading state
const MyLearningSkeleton = () => (
  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
    {[...Array(3)].map((_, index) => (
      <div
        key={index}
        className="glass-card h-48 animate-pulse"
      ></div>
    ))}
  </div>
);
