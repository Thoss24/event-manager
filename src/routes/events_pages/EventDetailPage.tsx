// third party imports
import { Suspense, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import React from "react";

// local files - components
import PageHeading from "../../components/ui/PageHeading";
import EventDetails from "../../components/events_elements/event_elements/EventDetails";
import MainContentWrapper from "../../components/wrapper/MainContentWrapper";
import { fetchEvent } from "../../utility/events_actions/event_actions";
import Message from "../../components/ui/Message";
import { EventType } from "../../types/Events";

const EventDetailPage = () => {
  const { eventId } = useParams<{ eventId: string }>();

  const [eventItem, setEventItem] = useState<EventType | null>(null);

  useEffect(() => {
    const fetchEventHandler = async () => {
      if (!eventId) return;

      try {
        const response = await fetchEvent(Number(eventId));

        if (response) {
          setEventItem(response.data);
        }
      } catch (error) {
        console.log("Could not fetch event information", error);
      }
    };

    fetchEventHandler();
  }, [eventId]);

  return (
    <MainContentWrapper>
      <Suspense fallback={<Message message={"Loading event details..."} />}>
        <PageHeading header={"Event Details"} />
        {eventItem && eventId && (
          <EventDetails
            id={eventItem.eventId}
            name={eventItem.eventName}
            description={eventItem.eventDescription}
            date={eventItem.eventDate}
            users={eventItem.users}
            eventCreatorId={eventItem.eventCreatorId}
          />
        )}
      </Suspense>
    </MainContentWrapper>
  );
};

export default EventDetailPage;
