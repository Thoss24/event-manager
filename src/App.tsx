import "./App.css";
import React from "react";
import { createBrowserRouter, RouterProvider, useNavigate } from "react-router-dom";
import AppRoot from "./routes/app_root/AppRoot";
import AppError from "./routes/error/AppError";
import HomePage from "./routes/home/HomePage";
import EventsHomePage from "./routes/events_pages/EventsHomePage";
import BookedEventsHomePage from "./routes/booked_events_pages/BookedEventsHomePage";
import EventDetailPage from "./routes/events_pages/EventDetailPage";
import EventsRoot from "./routes/events_root/EventsRoot";
import NewEventPage from "./routes/events_pages/NewEventPage";
import EditEventPage from "./routes/events_pages/EditEventPage";
import BookedEventsRoot from "./routes/booked_events_pages/BookedEventsRoot";
import BookedEventDetailPage from "./routes/booked_events_pages/BookedEventDetailPage";
import LoginPage from "./routes/login/LoginPage";
import Register from "./routes/login/Register";
import UserProfilePage from "./routes/users/UserProfilePage";

// Simple wrapper for login navigation
const LoginWrapper: React.FC = () => {
  const navigate = useNavigate();
  const handleLogin = () => navigate("/app/home");
  return <LoginPage onLogin={handleLogin} />;
};

// Simple wrapper for register navigation
const RegisterWrapper: React.FC = () => {
  const navigate = useNavigate();
  const handleRegister = () => navigate("/app/home");
  return <Register onRegister={handleRegister} />;
};

function App(): JSX.Element {
  const router = createBrowserRouter([
    { path: "/", element: <LoginWrapper /> },        // first page is login
    { path: "/login", element: <LoginWrapper /> },  // login page
    { path: "/register", element: <RegisterWrapper /> }, // register page
    {
      path: "/app",
      element: <AppRoot />,
      errorElement: <AppError />,
      children: [
        { path: "home", element: <HomePage /> },
        { path: ":userId", element: <UserProfilePage /> },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            { index: true, element: <EventsHomePage /> },
            {
              path: ":eventId",
              children: [
                { index: true, element: <EventDetailPage /> },
                { path: "edit", element: <EditEventPage /> },
              ],
            },
            { path: "new-event", element: <NewEventPage /> },
          ],
        },
        {
          path: "booked-events",
          element: <BookedEventsRoot />,
          children: [
            { index: true, element: <BookedEventsHomePage /> },
            { path: ":bookedEventId", element: <BookedEventDetailPage /> },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
