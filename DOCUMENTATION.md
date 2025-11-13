# Documentation

This document provides a detailed overview of the project's structure, features, and implementation.

## Table of Contents

*   [Project Overview](#project-overview)
*   [Folder Structure](#folder-structure)
*   [Client-side Documentation](#client-side-documentation)
    *   [Technologies](#technologies)
    *   [State Management](#state-management)
    *   [Routing](#routing)
    *   [Components](#components)
*   [Server-side Documentation](#server-side-documentation)
    *   [Technologies](#technologies-1)
    *   [API Endpoints](#api-endpoints)
    *   [Authentication](#authentication)
    *   [Database](#database)
*   [Getting Started](#getting-started)
*   [Deployment](#deployment)

## Project Overview

The Learning Management System (LMS) is a full-stack web application built using the MERN stack. It enables instructors to create and sell courses, and students to purchase and consume them. The platform includes features such as user authentication, course and lecture management, student progress tracking, and AI-powered course recommendations. The application is architected with a clear separation of concerns between the client and server, allowing for scalability and maintainability.

## Folder Structure

The project is organized into two main directories: `client` and `server`.

```
/
├── client/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── app/          # Redux store configuration
│   │   ├── components/   # Reusable React components
│   │   ├── features/     # Redux slices and API logic
│   │   ├── layout/       # Main application layout
│   │   ├── pages/        # Application pages
│   │   └── ...
│   ├── package.json
│   └── ...
├── server/         # Node.js/Express backend
│   ├── controllers/  # Route handlers
│   ├── database/     # Database connection
│   ├── middlewares/  # Custom middlewares
│   ├── models/       # Mongoose models
│   ├── routes/       # API routes
│   ├── uploads/      # Uploaded files
│   ├── utils/        # Utility functions
│   ├── index.js      # Server entry point
│   └── package.json
└── ...
```

## Client-side Documentation

The client-side is a single-page application (SPA) built with React.

### Technologies

*   **React:** A JavaScript library for building user interfaces.
*   **Redux Toolkit:** For efficient and predictable state management.
*   **React Router:** For declarative routing in the application.
*   **Vite:** A fast build tool for modern web projects.
*   **Tailwind CSS:** A utility-first CSS framework for rapid UI development.
*   **Axios:** For making HTTP requests to the backend API.

### State Management

The application uses Redux Toolkit for state management. The Redux store is configured in `client/src/app/store.js`. Redux slices, which define the state and reducers for different features, are located in `client/src/features`. The application also uses Redux Toolkit Query for data fetching and caching, with API slices defined in `client/src/features/api/` for authentication, courses, AI, PayPal, and course progress.

### Routing

Routing is handled by React Router. The main routes are defined in `client/src/App.jsx`. The application uses a combination of public and protected routes. Protected routes, such as the student and admin dashboards, require user authentication. `ProtectedRoutes.jsx` and `PurchaseRouteCourse.jsx` are used to manage access to course materials, ensuring only enrolled students can view them.

### Components

The `client/src/components` directory contains reusable UI components, such as:

*   `Navbar.jsx`: The main navigation bar.
*   `AIChatbot.jsx`: The AI-powered chatbot component.
*   `RichTextEditor.jsx`: A rich text editor for creating and editing course content.
*   `Course.jsx`: A component for displaying a single course.

## Server-side Documentation

The server-side is a RESTful API built with Node.js and Express.

### Technologies

*   **Node.js:** A JavaScript runtime for building server-side applications.
*   **Express.js:** A web application framework for Node.js.
*   **MongoDB:** A NoSQL database for storing application data.
*   **Mongoose:** An object data modeling (ODM) library for MongoDB and Node.js.
*   **JSON Web Tokens (JWT):** For implementing secure user authentication.
*   **Multer:** A middleware for handling `multipart/form-data`, used for file uploads.

### API Endpoints

The API provides a comprehensive set of endpoints for managing users, courses, lectures, and other resources. Key endpoints include:

*   **User:** `POST /api/users/register`, `POST /api/users/login`
*   **Courses:** `GET /api/courses`, `POST /api/courses`, `PUT /api/courses/:id`, `DELETE /api/courses/:id`
*   **AI:** `POST /api/ai/recommendations`
*   **Orders:** `POST /api/orders/create`

For a full list of API endpoints, please refer to the files in the `server/routes` directory.

### Authentication

Authentication is implemented using JWT. When a user logs in, the server generates a JWT and sends it to the client. The client then includes this token in the `Authorization` header of subsequent requests to protected endpoints. The `isAuthenticated` middleware in `server/middlewares/isAuthenticated.js` is used to verify the token and protect routes.

### Database

The application uses MongoDB as its database. The database schemas are defined using Mongoose in the `server/models` directory. The main models are:

*   `User`: Represents a user of the application, including their role (student or instructor).
*   `Course`: Represents a course created by an instructor, including its title, description, price, and lectures.
*   `Lecture`: Represents a lecture within a course.
*   `CourseProgress`: Tracks a student's progress in a course.

## Getting Started

Please refer to the [README.md](README.md) file for instructions on how to set up and run the project locally.

## Deployment

To deploy the application, you will need to build the client-side and then deploy both the client and server to a hosting provider. For example, you can deploy the client to a static hosting service like Netlify or Vercel, and the server to a service like Heroku or AWS.
