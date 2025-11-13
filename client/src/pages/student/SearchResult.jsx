import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Clock, Star } from "lucide-react";
import React from "react";
import { Link } from "react-router";

const SearchResult = ({ course }) => {
  return (
    <Link to={`/course-detail/${course._id}`}>
      <Card className="glass-card glass-card-hover overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="relative w-full md:w-64 h-48 md:h-auto flex-shrink-0">
            <img
              src={course.courseThumbnail}
              alt={course.courseTitle}
              className="w-full h-full object-cover"
            />
          </div>
          <CardContent className="flex-1 p-6 flex flex-col justify-between">
            <div className="space-y-3">
              <div>
                <h2 className="font-bold text-xl mb-2 line-clamp-2 hover:text-indigo-600 dark:hover:text-indigo-400 transition">
                  {course.courseTitle}
                </h2>
                {course.subTitle && (
                  <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                    {course.subTitle}
                  </p>
                )}
              </div>
              
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage
                      src={course.creator?.photoUrl || "https://github.com/shadcn.png"}
                      alt={course.creator?.name}
                    />
                    <AvatarFallback className="text-xs">
                      {course.creator?.name?.charAt(0) || "I"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {course.creator?.name || "Instructor"}
                  </span>
                </div>
                <Badge variant="outline" className="rounded-full">
                  {course.courseLevel}
                </Badge>
                {course.category && (
                  <Badge variant="secondary" className="rounded-full">
                    {course.category}
                  </Badge>
                )}
              </div>

              <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                {course.enrolledStudents && (
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>{course.enrolledStudents.length || 0} students</span>
                  </div>
                )}
                {course.lectures && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{course.lectures.length} lectures</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between">
              <div className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                ₹{course.coursePrice}
              </div>
              <div className="flex items-center gap-1 text-yellow-500">
                <Star className="h-4 w-4 fill-current" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">4.8</span>
              </div>
            </div>
          </CardContent>
        </div>
      </Card>
    </Link>
  );
};

export default SearchResult;
