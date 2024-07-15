import fetchEvents from "../../utility/events_actions/fetch-events-data";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./EventsHomePage.module.css"
import checkAccountType from "../../utility/authentication/check_account_type";

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

          <button onClick={checkAccountType}>CHECK ACCOUNT TYPE</button>
      </div>
    );
};

export default EventsHomePage
