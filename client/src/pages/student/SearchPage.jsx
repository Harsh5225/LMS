import React, { useState } from "react";
import Filter from "./Filter";
import SearchResult from "./SearchResult";
import Course from "./Course";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetSearchCourseQuery } from "@/features/api/courseApi";
import { Link, useSearchParams, useNavigate } from "react-router";
import { AlertCircle, Grid3x3, List, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query") || "";
  const [localSearch, setLocalSearch] = useState(query);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortByPrice, setSortByPrice] = useState("");
  const [viewMode, setViewMode] = useState("list"); // "list" or "grid"

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

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setSearchParams({ query: localSearch.trim() });
    }
  };

  return (
    <div className="page-shell px-6 py-10 md:px-12">
      {/* Header Section with Search */}
      <div className="mb-8 space-y-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold">
            {query ? `Search Results for "${query}"` : "Browse All Courses"}
          </h1>
          <p className="page-subtitle mt-2">
            {isLoading ? "Searching..." : `Found ${data?.courses?.length || 0} course${data?.courses?.length !== 1 ? 's' : ''} matching your search`}
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2 max-w-2xl">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search for courses, topics, or instructors..."
              className="pl-10 h-11"
            />
          </div>
          <Button type="submit" className="h-11 px-6">
            Search
          </Button>
        </form>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-8 lg:flex-row">
        {/* Filter Sidebar */}
        <div className="glass-card w-full lg:w-[280px] flex-shrink-0 p-6">
          <Filter handleFilterChange={handleFilterChange} />
        </div>

        {/* Results Section */}
        <div className="flex-1 space-y-6">
          {/* View Toggle */}
          {!isEmpty && !isLoading && (
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Showing {data?.courses?.length || 0} results
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="h-9"
                >
                  <Grid3x3 className="h-4 w-4 mr-2" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="h-9"
                >
                  <List className="h-4 w-4 mr-2" />
                  List
                </Button>
              </div>
            </div>
          )}

          {isLoading ? (
            <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-6"}>
              {Array.from({ length: 6 }).map((_, idx) => (
                <CourseSkeleton key={idx} viewMode={viewMode} />
              ))}
            </div>
          ) : isError ? (
            <div className="page-section">
              <p className="text-red-600 dark:text-red-400">
                Error loading courses. Please try again.
              </p>
            </div>
          ) : isEmpty ? (
            <CourseNotFound />
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {data?.courses?.map((course) => (
                <Course key={course._id} course={course} />
              ))}
            </div>
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
    <div className="page-section text-center">
      <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
        <AlertCircle className="h-8 w-8 text-red-500 dark:text-red-400" />
      </div>
      <h1 className="text-2xl md:text-3xl font-bold">No Courses Found</h1>
      <p className="page-subtitle mb-6 mt-3 max-w-md mx-auto">
        We couldn't find any courses matching your search. Try adjusting your
        filters or search for something else.
      </p>
      <Link to="/">
        <Button className="gap-2">Browse All Courses</Button>
      </Link>
    </div>
  );
};

const CourseSkeleton = ({ viewMode = "list" }) => {
  if (viewMode === "grid") {
    return (
      <div className="glass-card p-5">
        <Skeleton className="w-full h-48 rounded-2xl mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-6 w-3/4 rounded" />
          <Skeleton className="h-4 w-1/2 rounded" />
          <div className="flex gap-2">
            <Skeleton className="h-4 w-20 rounded-full" />
            <Skeleton className="h-4 w-24 rounded-full" />
          </div>
          <Skeleton className="h-5 w-16 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card flex flex-col gap-6 p-6 md:flex-row">
      <div className="w-full md:w-56 h-40">
        <Skeleton className="h-full w-full rounded-2xl" />
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
