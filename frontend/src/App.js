// css
import "./App.css";
// third party
import { createBrowserRouter, RouterProvider } from "react-router-dom";
// local components from top level to deeply rooted
import AppRoot from "./routes/app_root/AppRoot";
import AppError from "./routes/error/AppError";
import HomePage from "./routes/home/HomePage";
import EventsHomePage from "./routes/events_pages/EventsHomePage";
import BookedEventsHomePage, {loader as bookedEventsLoader} from "./routes/booked_events_pages/BookedEventsHomePage";
import EventDetailPage, {
  loader as eventDetailsLoader,
  action as deleteEventAction,
} from "./routes/events_pages/EventDetailPage";
import EventsRoot from "./routes/events_root/EventsRoot";
import NewEventPage from "./routes/events_pages/NewEventPage";
import EditEventPage from "./routes/events_pages/EditEventPage";
import { action as editEvent } from "./utility/edit_event";
import BookedEventsRoot from "./routes/booked_events_pages/BookedEventsRoot";
import BookedEventDetailPage, { loader as bookedEventDetailsLoader, action as deleteBookedEventAction } from "./routes/booked_events_pages/BookedEventDetailPage";

function App() {
  const route = createBrowserRouter([
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
          path: "events",
          element: <EventsRoot />,
          children: [
            {
              index: true,
              element: <EventsHomePage />,
            },
            {
              id: "events-details",
              path: ":eventId",
              loader: eventDetailsLoader,
              children: [
                {
                  index: true,
                  element: <EventDetailPage />,
                  action: deleteEventAction,
                },
                {
                  path: "edit",
                  element: <EditEventPage />,
                  action: editEvent,
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
              id: 'booked-event-details',
              element: <BookedEventDetailPage />,
              loader: bookedEventDetailsLoader,
              action: deleteBookedEventAction
            }
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={route}></RouterProvider>;
}

export default App;
