import React from "react";
import classes from "./BookedEvents.module.css";
import { Link } from "react-router-dom";
import { BookedEventsListItemProps } from "../../../types/Events";

const BookedEventListItem = ({key, id, name, description, eventDate, eventImg, eventTime}: BookedEventsListItemProps) => {
  const eventDateFormatted = eventDate.slice(0, 10);

  return (
    <div className={classes["list-item"]}>
      <Link to={`${id}`}>
        <div className={classes["event-details-section"]}>
          <h2>{name}</h2>
          <h4>{description}</h4>
          <div className={classes["time-details"]}>
            <p>Date: {eventDateFormatted}</p>
            <p>Time: {eventTime}</p>
          </div>
        </div>
        <img
          className={classes["booked_event_img"]}
          src={`/images/${eventImg}`}
        />
      </Link>
    </div>
  );
};

export default BookedEventListItem;
