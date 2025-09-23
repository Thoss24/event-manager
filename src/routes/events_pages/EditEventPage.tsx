import React from "react";
import EditEventForm from "../../components/events_elements/edit_event_elements/EditEventForm";
import { useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import { fetchEvent } from "../../utility/events_actions/event_actions";
import MainContentWrapper from "../../components/wrapper/MainContentWrapper";
import PageHeading from "../../components/ui/PageHeading";
import Message from "../../components/ui/Message";
import { EventType } from "../../types/Events";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [editableEvent, setEvent] = useState<EventType>();

  useEffect(() => {
    let eventIdToInt = Number(eventId);
    fetchEvent(eventIdToInt).then((response) => {
      console.log("Response: ", response.data)
      setEvent(response.data);
    });
  }, []);

  useEffect(() => {
    console.log("EDITABLE EVENT: ", editableEvent)
  }, [editableEvent])

  return (
    <MainContentWrapper>
      <Suspense fallback={<Message message={"Loading event details..."} />}>
        <PageHeading header={"Edit Event Details"} />
        {editableEvent && (
          <EditEventForm
            name={editableEvent.eventName}
            date={editableEvent.eventDate}
            description={editableEvent.eventDescription}
            eventId={Number(eventId)}
          />
        )}
      </Suspense>
    </MainContentWrapper>
  );
};

export default EditEventPage;
