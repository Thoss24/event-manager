import fetchEvents from "../../utility/fetch-events-data";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./EventsHomePage.module.css"

const EventsHomePage = () => {

    const [events, setEvents] = useState([]);

    useEffect(() => {
      fetchEvents().then(response => {
        setEvents(response)
      })
    }, []);
  
    return (
      <div>
        <h1>Home</h1>
        {events &&
          events.map((event) => (
            <div key={event.event_id}>
              <h1>{event.event_name}</h1>
              <img className={classes['event-image']} src={`http://localhost:3001/images/${event.event_img}`} alt="" />
            </div>
          ))}
      </div>
    );
};

export default EventsHomePage
