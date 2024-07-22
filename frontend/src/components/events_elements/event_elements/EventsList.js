import EventListItem from "./EventsListItem";
import classes from './EventsList.module.css'
import { useEffect, useState } from "react";
import fetchEvents from "../../../utility/events_actions/fetch-events-data";

const EventsList = () => {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchEvents().then((response) => {
          if (response != "undefined") {
            setUsers(response);
            console.log(response)
          }
        });
    }, []);

//     booked
// : 
// 1
// created_at
// : 
// "2024-04-24T17:47:04.000Z"
// event_date
// : 
// "2024-04-24T23:00:00.000Z"
// event_description
// : 
// "Test"
// event_id
// : 
// 7
// event_img
// : 
// "event_img_two.jpg"
// event_name
// : 
// "event 1 2"
// event_time
// : 
// "02:02"
    
    return (
        <div className={classes.list}>
            {users && users.map(event => (
                <EventListItem 
                key={event.event_id}
                id={event.event_id}
                name={event.event_name}
                date={event.event_date}
                />
            ))}
        </div>
    )
};

export default EventsList