// css
import "./App.css";
// third party
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// local components from top level to deeply rooted
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
import UserProfilePage from './routes/users/UserProfilePage';

function App() {
  const route = createBrowserRouter([
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/register",
      element: <Register />
    },
    {
      path: "/",
      element: <AppRoot />,
      errorElement: <AppError />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: ":userId", // User Profile Route
          element: <UserProfilePage />,
        },
        {
          path: "events",
          element: <EventsRoot />,
          children: [
            {
              index: true,
              element: <EventsHomePage />,
            },
            {
              path: ":eventId",
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                },
              ],
            },
            {
              path: "new-event",
              element: <NewEventPage />,
            },
          ],
        },
        {
          path: "booked-events",
          element: <BookedEventsRoot />,
          children: [
            {
              index: true,
              element: <BookedEventsHomePage />,
            },
            {
              path: ":bookedEventId",
              element: <BookedEventDetailPage />,
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
