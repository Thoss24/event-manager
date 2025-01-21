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

  const [eventItem, setEventItem] = useState();
  const [eventMembers, setEventMembers] = useState();

  useEffect(() => {
    fetchEvent(eventId).then((response) => {
      console.log(response.data);
      setEventItem(response.data);
    });
  }, []);

  eventItem && console.log(eventItem.users);

  return (
    <Suspense fallback={<Loading message={"Loading event details..."} />}>
      <PageHeading header={"Event Details"} />
      {eventItem && (
        <EventDetails
          id={eventId}
          name={eventItem.eventName}
          description={eventItem.eventDescription}
          date={eventItem.eventDate}
          users={eventItem.users}
        />
      )}
    </Suspense>
  );
};

export default EventDetailPage;
