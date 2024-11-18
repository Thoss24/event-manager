import fetchBookedEvent from "../../utility/events_actions/fetch-booked-event-data";
import { useEffect } from "react";
import PageHeading from "../../components/ui/PageHeading";
import BookedEventDetails from "../../components/events_elements/booked_event_elements/BookedEventDetails";
import { useParams } from "react-router-dom";
import { useState, Suspense } from "react";
import Loading from "../../components/ui/Loading";

const BookedEventDetailPage = () => {
  const { bookedEventId } = useParams();
  const [bookedEvent, setBookedEvent] = useState(null);

  useEffect(() => {
    fetchBookedEvent(bookedEventId).then((response) => {
      setBookedEvent(response);
      console.log(bookedEvent);
    });
  }, []);

  return (
    <>
      <Suspense fallback={<Loading message={"Loading event details..."}/>}>
        <PageHeading header={"Booked Event Details"} />

        {!bookedEvent ? (
          <Loading message={"Loading event details..."} />
        ) : (
          <BookedEventDetails name={bookedEvent[0].event_name} />
        )}
      </Suspense>
    </>
  );
};

export default BookedEventDetailPage;
