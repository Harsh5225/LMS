import { ChartNoAxesColumn, SquareLibrary } from "lucide-react";
import React from "react";
import { Link } from "react-router";
import { Outlet } from "react-router";

const Sidebar = () => {
  return (
    <div className="flex flex-col gap-6 lg:flex-row">
      {/* Sidebar */}
      <div className="hidden lg:block w-[260px] flex-shrink-0">
        <div className="glass-card sticky top-28 space-y-4 p-6">
          <h2 className="text-lg font-semibold">Admin Console</h2>
          <nav className="flex flex-col gap-2">
            <Link
              to="dashboard"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-blue-500/10"
            >
              <ChartNoAxesColumn size={20} />
              Dashboard
            </Link>

            <Link
              to="course"
              className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium transition hover:bg-blue-500/10"
            >
              <SquareLibrary size={20} />
              Courses
            </Link>
          </nav>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1">
        <div className="glass-card p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
