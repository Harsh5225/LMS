import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams } from "react-router";
import { AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("query");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");

  const { data, isLoading, isError } = useGetSearchCourseQuery({
    searchQuery: query,
    categories: selectedCategories,
    sortByPrice,
  });

  const isEmpty = !isLoading && data?.courses?.length === 0;

  const handleFilterChange = (categories, price) => {
    setSelectedCategories(categories);
    setSortByPrice(price);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 mt-10">
      {/* Header Section */}
      <div className="mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white">
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Found {data?.courses?.length || 0} courses matching your search
        </p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filter Sidebar */}
        <div className="w-full md:w-[25%] bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-md border overflow-y-auto max-h-[600px]">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        {/* Results Section */}
        <div className="flex-1">
          {isLoading ? (
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, idx) => (
                <CourseSkeleton key={idx} />
              ))}
            </div>
          ) : isError ? (
            <div className="bg-red-50 dark:bg-red-900/20 p-6 rounded-lg">
              <p className="text-red-600 dark:text-red-400">
                Error loading courses. Please try again.
              </p>
            </div>
          ) : isEmpty ? (
            <CourseNotFound />
          ) : (
            <div className="space-y-6">
              {data?.courses?.map((course) => (
                <SearchResult key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;

const CourseNotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-50 dark:bg-gray-900 rounded-lg p-8 text-center">
      <div className="bg-red-100 dark:bg-red-900/30 p-4 rounded-full mb-6">
        <AlertCircle className="text-red-500 dark:text-red-400 h-12 w-12" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-3">
        No Courses Found
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-md">
        We couldn't find any courses matching your search. Try adjusting your
        filters or search for something else.
      </p>
      <Link to="/">
        <Button className="gap-2">Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-4 border border-gray-200 dark:border-gray-800 rounded-lg">
      <div className="w-full md:w-56 h-40">
        <Skeleton className="h-full w-full rounded-lg" />
      </div>

      <div className="flex-1 space-y-3">
        <Skeleton className="h-6 w-3/4 rounded" />
        <Skeleton className="h-4 w-1/2 rounded" />
        <div className="flex gap-3">
          <Skeleton className="h-4 w-24 rounded-full" />
          <Skeleton className="h-4 w-32 rounded-full" />
        </div>
        <Skeleton className="h-4 w-40 rounded" />
      </div>

      <div className="md:self-end">
        <Skeleton className="h-8 w-24 rounded" />
      </div>
    </div>
  );
};
