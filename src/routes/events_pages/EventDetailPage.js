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

  useEffect(() => {
    const fetchEventHandler = async () => {
      try {
        const response = await fetchEvent(eventId);

        if (response) {
          setEventItem(response.data);
        }
      } catch (error) {
        console.log("Could not fetch event information", error);
      }
    };

    fetchEventHandler();
  }, [eventId]);

  eventItem && console.log("Event Item:", eventItem)

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
          eventCreatorId={eventItem.eventCreatorId}
        />
      )}
    </Suspense>
  );
};

export default EventDetailPage;
