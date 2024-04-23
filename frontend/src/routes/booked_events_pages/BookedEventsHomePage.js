import { useEffect } from "react";
import fetchBookedEvents from "../../utility/fetch-booked-events";
import { useState, Suspense } from "react";
import { Await } from "react-router-dom";
import BookedEventsList from "../../components/events_elements/booked_event_elements/BookedEventsList";
import Loading from "../../components/ui/Loading";

const BookedEventsHomePage = () => {
  const [bookedEvents, setBookedEvents] = useState(null);

  useEffect(() => {
    fetchBookedEvents().then((response) => {
      setBookedEvents(response);
    });
  }, []);

  return (
    !bookedEvents ? <Loading message={"Loading booked events.."}/> :
    <Await
      resolve={bookedEvents}
      errorElement={<div>Could not load booked events.</div>}
    >
      <BookedEventsList events={bookedEvents} />
    </Await>
    
  );
};

export default BookedEventsHomePage;
