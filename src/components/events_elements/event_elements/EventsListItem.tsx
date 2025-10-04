import React from "react";
import classes from "../EventListItem.module.css";
import { Link } from "react-router-dom";
import { Event as EventType } from "../../../types/Events";

const EventListItem = ({event_id, event_name, event_date, event_description, event_img, event_time, event_type, page_type }: EventType) => {

  // const eventDate = event_date.slice(0, 10);

  return (
    <div className={classes["list-item"]} onClick={() => {console.log("page type", page_type)}}>
      <Link
        to={
          page_type === "userProfile"
            ? `/app/events/${event_id}`           // navigate to user profile
            : page_type === "eventsPage"
            ? `/app/events/${event_id}`    // navigate to event detail
            : `/app/events/${event_id}`                  // home page
        }>
        <div className={classes["event-details-section"]}>
          <h2>{event_name}</h2>
          <h4>{event_description}</h4>
          <div className={classes["time-details"]}>
            {/* <p>Date: {eventDate}</p>  */}
            <p>Time: {event_time}</p>  
          </div>
        </div>
        { <img
          className={classes["booked_event_img"]}
          src={`/images/${event_img}`}
        /> }
      </Link>
    </div>
  );
};

export default EventListItem;