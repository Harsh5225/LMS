import React from "react";
import { Button } from "./components/ui/button";
import Login from "./pages/Login";
import Mainlayout from "./layout/Mainlayout";
import HomePage from "./layout/HomePage";
import MyLearning from "./pages/student/MyLearning";
import Profile from "./pages/student/Profile";
import Sidebar from "./pages/admin/Sidebar";
import Dashboard from "./pages/admin/Dashboard";
import CourseTable from "./pages/admin/course/CourseTable";
import AddCourse from "./pages/admin/course/AddCourse";
import EditCourse from "./pages/admin/course/EditCourse";
import CreateLecture from "./pages/admin/Lecture/CreateLecture";
import EditLecture from "./pages/admin/Lecture/EditLecture";
import CourseDetails from "./pages/student/CourseDetails";
import CourseProgress from "./pages/student/CourseProgress";
import { BrowserRouter, Route, Routes } from "react-router";
import PaypalVerification from "./pages/PaypalVerification";
import SearchPage from "./pages/student/SearchPage"; // Fixed case sensitivity
import {
  AdminRoute,
  AuthenticatedUser,
  ProtectedRoute,
} from "./components/ProtectedRoutes";
import PurchaseCourseProtectedRoute from "./components/PurchaseRouteCourse";
import { ThemeProvider } from "./components/ThemeProvider";

const App = () => {
  return (
    <main>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Mainlayout />}>
              {/* Public Routes */}
              <Route index element={<HomePage />} />
              <Route
                path="login"
                element={
                  <AuthenticatedUser>
                    <Login />
                  </AuthenticatedUser>
                }
              />

              {/* Student Routes */}
              <Route
                path="my-learning"
                element={
                  <ProtectedRoute>
                    <MyLearning />
                  </ProtectedRoute>
                }
              />
              <Route
                path="profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="course-detail/:courseId"
                element={
                  <ProtectedRoute>
                    <CourseDetails />
                  </ProtectedRoute>
                }
              />
              <Route
                path="course-progress/:courseId"
                element={
                  <ProtectedRoute>
                    <PurchaseCourseProtectedRoute>
                      <CourseProgress />
                    </PurchaseCourseProtectedRoute>
                  </ProtectedRoute>
                }
              />
              <Route
                path="verify-payment/:courseId"
                element={<PaypalVerification />}
              />
              <Route
                path="course/search"
                element={
                  <ProtectedRoute>
                    <SearchPage />
                  </ProtectedRoute>
                }
              />

              {/* Admin Routes */}
              <Route
                path="admin"
                element={
                  <AdminRoute>
                    <Sidebar />
                  </AdminRoute>
                }
              >
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="course" element={<CourseTable />} />
                <Route path="course/create" element={<AddCourse />} />
                <Route path="course/:courseId" element={<EditCourse />} />
                <Route
                  path="course/:courseId/lecture"
                  element={<CreateLecture />}
                />
                <Route
                  path="course/:courseId/lecture/:lectureId"
                  element={<EditLecture />}
                />
              </Route>

              {/* Fallback Route */}
              <Route path="*" element={<div>404 Not Found</div>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </main>
  );
};

export default App;
