import { useGetCourseDetailWithPurchaseStatusQuery } from "@/features/api/paypalApi";

import { useParams, Navigate } from "react-router";

const PurchaseCourseProtectedRoute = ({ children }) => {
  const { courseId } = useParams();
  const { data, isLoading } =
    useGetCourseDetailWithPurchaseStatusQuery(courseId);

  if (isLoading) return <p>Loading...</p>;

  return data?.purchased ? (
    children
  ) : (
    <Navigate to={`/course-detail/${courseId}`} />
  );
};
export default PurchaseCourseProtectedRoute;
