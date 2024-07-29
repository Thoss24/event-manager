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
    fetchEvent(eventId).then((response) => {
      setEventItem(response.data[0]);
    });
  }, []);

  return (
    <MainContentWrapper>
      <Suspense fallback={<Loading message={"Loading event details..."} />}>
        <PageHeading header={"Event Details"} />
        {eventItem && (
          <EventDetails
            name={eventItem.event_name}
            description={eventItem.event_description}
            date={eventItem.event_date}
          />
        )}
      </Suspense>
    </MainContentWrapper>
  );
};

export default EventDetailPage;
