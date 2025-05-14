import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import React from "react";
import CourseTab from "./CourseTab";
const EditCourse = () => {
  // const courseId=window.location.pathname.split("/").pop()
  return (
    <div className="flex-1 ">
      <div className="flex items-center justify-between mb-5">
        <h1 className="font-bold text-xl">Add detail regarding the course</h1>
        <Link to="lecture">
          <Button variant="link" className="hover:text-blue-600">
            Go to Lectures Page
          </Button>
        </Link>
      </div>
      <CourseTab />
    </div>
  );
};

export default EditCourse;
