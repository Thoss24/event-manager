import fetchBookedEvent from "../../utility/fetch-booked-event-data";
import { defer, Await, redirect, useRouteLoaderData } from "react-router-dom";
import PageHeading from "../../components/ui/PageHeading";
import { Suspense } from "react";
import BookedEventDetails from "../../components/events_elements/booked_event_elements/BookedEventDetails";

const BookedEventDetailPage = () => {

    const { bookedEvent } = useRouteLoaderData('booked-event-details');

    return (
        <Suspense>
        <PageHeading header={"Booked Event Details"} />
        <Await resolve={bookedEvent}>
          {(event) => (
            <BookedEventDetails
              name={event.name}
              date={event.date}
            />
          )}
        </Await>
      </Suspense>
    )
};

export default BookedEventDetailPage;

export const loader = async ({request, params}) => {
  const id = params.bookedEventId;

  console.log(id);

  return defer({
    bookedEvent: await fetchBookedEvent(id),      
  });
};

export const action = async ({request, params}) => {
  const id = params.bookedEventId;

  const response = await fetch(`https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/booked-events/${id}.json`, {
    method: request.method
  });

  if (!response.ok) {
    throw new Error("Could not find booked event")
  }

  return redirect("/booked-events")
};