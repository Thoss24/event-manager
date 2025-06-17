import EditEventForm from "../../components/events_elements/edit_event_elements/EditEventForm";
import { useParams } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import fetchEvent from "../../utility/events_actions/fetch-event-data";
import MainContentWrapper from "../../components/wrapper/MainContentWrapper";
import PageHeading from "../../components/ui/PageHeading";
import Message from "../../components/ui/Message";

const EditEventPage = () => {
  const { eventId } = useParams();
  const [editableEvent, setEvent] = useState();

  useEffect(() => {
    fetchEvent(eventId).then((response) => {
      setEvent(response.data[0]);
    });
  }, []);

  return (
    <MainContentWrapper>
      <Suspense fallback={<Message message={"Loading event details..."} />}>
        <PageHeading header={"Edit Event Details"} />
        {editableEvent && (
          <EditEventForm
            name={editableEvent.event_name}
            date={editableEvent.event_date}
            description={editableEvent.event_description}
            eventId={eventId}
          />
        )}
      </Suspense>
    </MainContentWrapper>
  );
};

export default EditEventPage;
