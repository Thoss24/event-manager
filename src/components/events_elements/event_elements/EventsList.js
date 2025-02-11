import EventListItem from "./EventsListItem";
import classes from "./EventsList.module.css";
import { useEffect, useState } from "react";
import fetchEvents from "../../../utility/events_actions/fetch-events-data";

const EventsList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {

    const fetchEventsHandler = async () => {

      try {
        const response = await fetchEvents();
        
        if (response) {
          console.log("Response", response)
          setUsers(response);
        } 

      } catch (error) {
        console.log("Could not load events", error)
      }
    }

    fetchEventsHandler();
  }, []);

  return (
    <div className={classes.list}>
      {users &&
        users.map((event) => (
          <EventListItem
            key={event.event_id}
            id={event.event_id}
            eventName={event.event_name}
            eventDate={event.event_date}
            eventImg={event.event_img}
            description={event.event_description}
            eventTime={event.event_time}
            eventType={event.event_type}
          />
        ))}
    </div>
  );
};

export default EventsList;
