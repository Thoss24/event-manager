import classes from "./BookedEventListItem.module.css";
import { Link } from "react-router-dom";

const BookedEventListItem = (props) => {

  return (
    <div className={classes["list-item"]}>
      <Link to={`${props.id}`}>
        <div className={classes['event-details-section']}>
          <h2>{props.name}</h2>
          <h4>{props.description}</h4>
          <p>{props.eventDate}</p>
        </div>
        <img className={classes['booked_event_img']} src={`http://localhost:3001/images/${props.eventImg}`} />
      </Link>
    </div>
  );
};

export default BookedEventListItem;
