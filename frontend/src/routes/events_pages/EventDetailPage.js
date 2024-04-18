// third party imports
import { defer, Await, redirect, useRouteLoaderData } from "react-router-dom";
import { Suspense, useEffect } from "react";
import { useSelector } from "react-redux";
// local files - components
import PageHeading from "../../components/ui/PageHeading";
import EventDetails from "../../components/events_elements/event_elements/EventDetails";
import MainContentWrapper from "../../components/wrapper/MainContentWrapper";
import { addEventData } from "./../../store/booked_events_actions";
// fetched data
import fetchEvent from "../../utility/fetch-event-data";

const EventDetailPage = () => {
  const { events } = useRouteLoaderData("events-details");

  const bookedEvents = useSelector(state => state.bookedEvents.bookedEvents);
  console.log(bookedEvents)
  
  useEffect(() => {
    addEventData(bookedEvents)
  }, [bookedEvents])

  return (
    <MainContentWrapper>
      <Suspense>
        <PageHeading header={"Event Details"} />
        <Await resolve={events}>
          {(event) => (
            <EventDetails
              name={event.name}
              date={event.date}
              
            />
          )}
        </Await>
      </Suspense>
    </MainContentWrapper>
  );
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const id = params.eventId;

  console.log(id);

  return defer({
    events: await fetchEvent(id),
  });
};

export const action = async ({ request, params }) => {
  const id = params.eventId;

  console.log(request);

  const response = await fetch(
    `https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/events/${id}.json`,
    {
      method: request.method,
    }
  );

  if (!response.ok) {
    throw new Error("Something went wrong!");
  };

  return redirect("/events");
};
