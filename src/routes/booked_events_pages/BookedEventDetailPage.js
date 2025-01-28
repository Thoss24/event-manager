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
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetchBookedEvent(bookedEventId);
        setBookedEvent(response[0])
      } catch (error) {
        setError("Could not load booked event.");
      }
    };

    fetchEvent()
  }, []);

  return (
    <>
      <Suspense fallback={<Loading message={"Loading event details..."} />}>
        <PageHeading header={"Booked Event Details"} />

        {!bookedEvent ? (
          <Loading message={"Loading event details..."} />
        ) : (
          <BookedEventDetails name={bookedEvent.event_name} date={bookedEvent.created_at} id={bookedEvent.event_id}/>
        )}
      </Suspense>
    </>
  );
};

export default BookedEventDetailPage;
