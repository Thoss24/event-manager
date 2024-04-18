import EditEventForm from "../../components/events_elements/edit_event_elements/EditEventForm";
import { useRouteLoaderData } from "react-router-dom";

const EditEventPage = () => {

    const { events } = useRouteLoaderData('events-details');

    console.log(events)

    const name = events.name;

    const date = events.date;

  return <div>
    <EditEventForm name={name} date={date}/>
  </div>;
};

export default EditEventPage;
