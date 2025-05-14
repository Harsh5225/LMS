import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
// eslint-disable-next-line no-unused-vars
import React, { use } from "react";
import { Link } from "react-router";
import { Navigate } from "react-router";
import { Outlet } from "react-router";
const Sidebar = () => {
  return (
    <div className="flex">
    {/* Sidebar */}
    <div className="hidden lg:block w-[250px] sm:w-[300px] border-r border-gray-300 dark:border-gray-700 sticky top-0 h-screen overflow-y-auto p-6 bg-white dark:bg-gray-900">
      <div className="mt-15 flex flex-col gap-6">
        <Link
          to="dashboard"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <ChartNoAxesColumn size={22} />
          <span className="text-base font-medium">Dashboard</span>
        </Link>
  
        <Link
          to="course"
          className="flex items-center gap-3 p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        >
          <SquareLibrary size={22} />
          <span className="text-base font-medium">Courses</span>
        </Link>
      </div>
    </div>
  
    {/* Main content */}
    <div className="flex-1 p-6 mt-15">
      <Outlet />
    </div>
  </div>
  
  );
};

export default Sidebar;
