import React from "react";
import LearningRoadmap from "@/components/LearningRoadmap";
import { useLoadUserQuery } from "@/features/api/authapi";

const AIRecommendationsPage = () => {
  // Get enrolled courses if user is logged in, but it's optional
  const { data } = useLoadUserQuery();
  const enrolledCourses = data?.user?.enrolledCourses || [];

  // AI roadmap works with or without enrolled courses
  return <LearningRoadmap enrolledCourses={enrolledCourses} />;
};

export default AIRecommendationsPage;

