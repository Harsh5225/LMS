/* eslint-disable no-unused-vars */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BadgeInfo, Lock, PlayCircle, Clock, Users, Star } from "lucide-react";
import ReactPlayer from "react-player";
import BuyCourseButton from "@/components/BuyCourseButton";

import { useNavigate, useParams } from "react-router";
import {
  useGetCourseDetailWithPurchaseStatusQuery,
  useVerifyPaymentMutation,
} from "@/features/api/paypalApi";
import { use } from "react";
import { toast } from "sonner";

const CourseDetail = () => {
  const navigate = useNavigate();
  const descriptionStyles = {
    fontSize: "1.125rem", // Slightly bigger font size
    fontWeight: "300", // Light font weight
    lineHeight: "1.8", // Increased line height
    letterSpacing: "0.5px", // Small space between letters
    color: "#333", // Dark text color
    padding: "1rem", // Padding around the text
    maxWidth: "800px", // Limit the max width
    margin: "0 auto", // Center the content
  };

  const params = useParams();
  const courseId = params.courseId;
  console.log("params", params);
  console.log("courseId", courseId);
  const { data, isLoading, isSuccess, error } =
    useGetCourseDetailWithPurchaseStatusQuery(courseId);

  if (isLoading) return <h1>Loading....</h1>;
  if (error) return <h1>failed to load course....</h1>;

  const { course, purchased } = data;
  console.log("purchase", purchased);
  console.log(course);

  const handleContinueCourse = async () => {
    navigate(`/course-progress/${courseId}`);
  };

  return (
    <div className="mt-16 space-y-4">
      {/* Hero Section with gradient background */}
      <div className="bg-gradient-to-r from-[#1E293B] to-[#2D2F31] text-white">
        <div className="max-w-7xl mx-auto py-10 px-4 md:px-8 flex flex-col gap-3">
          <Badge
            variant="outline"
            className="text-white border-white self-start mb-2"
          >
            Featured Course
          </Badge>

          <h1 className="font-bold text-2xl md:text-3xl lg:text-4xl">
            {course?.courseTitle || "Hello"}
          </h1>
          <p className="text-base md:text-lg text-gray-300">
            Master modern web development with the MERN stack
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <div className="flex items-center gap-1">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < 4
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>
              <span className="text-sm ml-1">4.8</span>
            </div>

            <div className="flex items-center gap-1">
              <Users size={16} />
              <span className="text-sm">
                {course?.enrolledStudents.length} students enrolled
              </span>
            </div>

            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-sm">
                Last updated {new Date(course.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div className="flex items-center gap-1">
              <BadgeInfo size={16} />
              <p className="text-sm">
                Created by{" "}
                <span className="text-[#C0C4FC] underline italic">
                  {course?.creator?.name || "Let me know"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto my-8 px-4 md:px-8 flex flex-col lg:flex-row justify-between gap-10">
        {/* Left Column */}
        <div className="w-full lg:w-2/3 space-y-8">
          {/* Tabs Navigation */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full grid grid-cols-2 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              {/* <TabsTrigger value="reviews">Reviews</TabsTrigger> */}
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <h2 className="font-bold text-xl mb-4">About This Course</h2>
                <div className="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-4 py-6 antialiased">
                  <div
                    className="prose prose-lg dark:prose-invert max-w-4xl mx-auto px-4 py-6 antialiased"
                    dangerouslySetInnerHTML={{ __html: course.description }}
                  />
                </div>
              </div>

              <div className="space-y-4">
                <h2 className="font-bold text-xl">What You'll Learn</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Build full-stack web applications using the MERN stack
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Create responsive and dynamic user interfaces with React
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Design and implement RESTful APIs with Node.js and Express
                    </p>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="rounded-full bg-green-100 p-1 mt-0.5">
                      <svg
                        className="h-3 w-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Work with MongoDB databases and Mongoose ODM
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Content Tab */}
            <TabsContent value="content">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                    {course.lectures.length} lectures
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {course.lectures.map((lecture, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-2 border-b border-gray-100"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-primary">
                          {idx === 0 ? (
                            <PlayCircle size={18} />
                          ) : (
                            <Lock size={18} />
                          )}
                        </span>
                        <div>
                          <p className="text-sm font-medium">
                            {lecture.lectureTitle}
                          </p>
                          <p className="text-xs text-gray-500">15:30 min</p>
                        </div>
                        {idx === 0 && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Preview
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Reviews Tab */}
            {/* <TabsContent value="reviews">
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <div className="text-4xl font-bold">4.8</div>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className={i < 4 ? "fill-yellow-400 text-yellow-400" : "text-gray-400"}
                        />
                      ))}
                    </div>
                    <div className="text-sm text-gray-500 mt-1">Course Rating</div>
                  </div>
                  <Separator orientation="vertical" className="h-16" />
                  <div>
                    <h3 className="font-medium mb-2">Student Feedback</h3>
                    <p className="text-sm text-gray-600">
                      This course has received positive feedback from students who appreciate the practical approach and
                      clear explanations.
                    </p>
                  </div>
                </div>

                <div className="text-center p-8 border border-dashed rounded-lg">
                  <h3 className="font-medium mb-2">Be the first to leave a review</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Share your experience with this course to help other students
                  </p>
                  <Button variant="outline">Write a Review</Button>
                </div>
              </div>
            </TabsContent> */}
          </Tabs>
        </div>

        {/* Right Column - Course Card */}
        <div className="w-full lg:w-1/3 lg:sticky lg:top-8 self-start">
          <Card className="shadow-lg border-gray-200 overflow-hidden">
            <div className="w-full aspect-video">
              <ReactPlayer
                width="100%"
                height="100%"
                light={`${course.courseThumbnail}`}
                url={course.lectures[0].videoUrl}
                controls={true}
                fallback={
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    Loading preview...
                  </div>
                }
                className="rounded-t-lg overflow-hidden"
                playing={true}
                muted={true}
              />
            </div>

            <CardContent className="p-6 space-y-4">
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold">$29.99</span>
                <span className="text-lg text-gray-500 line-through">
                  $49.99
                </span>
                <Badge className="ml-auto bg-green-600">40% off</Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock size={16} className="text-gray-500" />
                  <span>Full lifetime access</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-gray-500" />
                  <span>Access on mobile and desktop</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeInfo size={16} className="text-gray-500" />
                  <span>Certificate of completion</span>
                </div>
              </div>

              {/* <Separator /> */}
            </CardContent>

            <CardFooter className="flex justify-center p-4 ">
              {purchased ? (
                <Button onClick={handleContinueCourse} className="w-full">
                  Continue Course
                </Button>
              ) : (
                <BuyCourseButton courseId={courseId} />
              )}
            </CardFooter>
          </Card>

          <div className="mt-4 text-center text-sm text-gray-500">
            30-Day Money-Back Guarantee
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
