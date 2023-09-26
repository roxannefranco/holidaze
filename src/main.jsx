import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Overview from "./pages/Admin/Overview";
import NewVenue from "./pages/Admin/NewVenue";
import ProtectedRoute from "./utils/ProtectedRoute";

// configure the routes
const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin/overview",
    element: (
      <ProtectedRoute>
        <Overview />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/new-venue",
    element: (
      <ProtectedRoute>
        <NewVenue />
      </ProtectedRoute>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={routerConfig} />
  </React.StrictMode>
);
