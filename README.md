# Learning Management System

This project is a full-stack Learning Management System (LMS) developed using the MERN stack (MongoDB, Express.js, React.js, Node.js). It provides a robust platform for instructors to create and manage online courses, and for students to enroll in and track their progress through those courses. The application features a clean, modern user interface built with React and Tailwind CSS, and a powerful backend that handles user authentication, course data, and AI-driven recommendations.

## Key Features

*   **Role-Based Access Control:** The system supports distinct roles for students and instructors. Instructors have access to a dashboard for creating, updating, and managing their courses and lectures, while students have a personalized dashboard to view their enrolled courses and track their learning progress.

*   **Comprehensive Course Management:** Instructors can easily create new courses, upload video lectures and other materials, and use a rich text editor to format course descriptions and content. They have full CRUD (Create, Read, Update, Delete) capabilities for both courses and individual lectures.

*   **Interactive Student Dashboard:** Students can browse the course catalog, enroll in courses, and track their completion progress. The dashboard provides a centralized view of all their learning activities.

*   **AI-Powered Course Recommendations:** The application integrates an AI-powered recommendation engine that suggests relevant courses to students based on their enrollment history and stated interests, enhancing the user experience and promoting engagement.

*   **Secure Authentication:** User authentication is handled using JSON Web Tokens (JWT), ensuring that user data and course content are secure. Protected routes are implemented on both the client and server to restrict access based on user roles and enrollment status.

## Technologies Used

*   **Frontend:**
    *   **React.js:** For building the user interface.
    *   **Redux Toolkit:** For efficient global state management and data fetching.
    *   **React Router:** For client-side routing and navigation.
    *   **Vite:** As the build tool for a fast development experience.
    *   **Tailwind CSS:** For styling the application with a utility-first approach.

*   **Backend:**
    *   **Node.js & Express.js:** For building the RESTful API.
    *   **MongoDB:** As the NoSQL database for storing all application data.
    *   **Mongoose:** For object data modeling (ODM) with MongoDB.
    *   **JSON Web Tokens (JWT):** For secure user authentication.
    *   **Multer:** For handling file uploads.

## Getting Started

To get a local copy up and running, please follow these simple steps.

### Prerequisites

*   Node.js (v14 or later)
*   npm
*   MongoDB

### Installation

1.  Clone the repo: `git clone https://github.com/your-username/your-repo-name.git`
2.  Install server dependencies: `cd server && npm install`
3.  Install client dependencies: `cd ../client && npm install`
4.  Create a `.env` file in the `server` directory with your `MONGO_URI` and `JWT_SECRET`.

### Running the Application

1.  Start the server: `cd server && npm start`
2.  Start the client: `cd ../client && npm run dev`
