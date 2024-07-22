import classes from "../EventListItem.module.css";
import { Link } from "react-router-dom";

const BookedEventListItem = (props) => {

  const eventDate = props.eventDate.slice(0, 10)

  return (
    <div className={classes["list-item"]}>
      <Link to={`${props.id}`}>
        <div className={classes['event-details-section']}>
          <h2>{props.name}</h2>
          <h4>{props.description}</h4>
          <div className={classes['time-details']}>
          <p>Date: {eventDate}</p>
          <p>Time: {props.eventTime}</p>
          </div>
          
        </div>
        <img className={classes['booked_event_img']} src={`http://localhost:3001/images/${props.eventImg}`} />
      </Link>
    </div>
  );
};

export default BookedEventListItem;
