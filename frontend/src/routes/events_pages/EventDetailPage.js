// third party imports
import { Suspense, useEffect, useState } from "react";
import { useParams, Await } from "react-router-dom";
// local files - components
import PageHeading from "../../components/ui/PageHeading";
import EventDetails from "../../components/events_elements/event_elements/EventDetails";
import MainContentWrapper from "../../components/wrapper/MainContentWrapper";
import fetchEvent from "../../utility/events_actions/fetch-event-data";
import Loading from "../../components/ui/Loading";

const EventDetailPage = () => {
  let { eventId } = useParams();

  const [eventItem, setEventItem] = useState([]);

  useEffect(() => {
    fetchEvent(eventId).then((response) => {
      setEventItem(response);
      console.log(response);
    });
  }, []);

  console.log(eventId)

  return (
    <MainContentWrapper>
      <Suspense fallback={<Loading message={"Loading event details..."}/>}>
        <PageHeading header={"Event Details"} />
        <Await resolve={eventItem}>
          {(eventDetails) => (
            <EventDetails
              name={eventDetails.name}
              date={eventDetails.date}
              
            />
          )}
        </Await>
      </Suspense>
    </MainContentWrapper>
  );
};

export default EventDetailPage;

