import fetchBookedEvent from "../../utility/fetch-booked-event-data";
import { useEffect } from "react";
import PageHeading from "../../components/ui/PageHeading";
import { Suspense } from "react";
import BookedEventDetails from "../../components/events_elements/booked_event_elements/BookedEventDetails";
import { useParams, Await } from "react-router-dom";
import { useState } from "react";

const BookedEventDetailPage = () => {

  let {bookedEventId} = useParams();
  const [bookedEvent, setBookedEvent] = useState([])

  useEffect(() => {
    fetchBookedEvent(bookedEventId).then(response => {
      setBookedEvent(response)
      console.log(bookedEvent)
    })
  }, [])
  

  return (
    <Suspense>
    <PageHeading header={"Booked Event Details"} />
    <Await resolve={bookedEvent}>
      {(event) => (
        <BookedEventDetails
          name={event.event_name}
          
        />
      )}
    </Await>
  </Suspense>
   )
};

export default BookedEventDetailPage;
