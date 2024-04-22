import BookedEventListItem from "./BookedEventListItem";
import classes from "./BookedEventsList.module.css";

const BookedEventsList = (props) => {

  return (
    <main>
      <div className={classes['booked-events-list']}>
        {props.events.length > 0 ? props.events.map((event) => (
          <BookedEventListItem
            key={event.event_id}
            id={event.event_id}
            name={event.event_name}
            description={event.event_description}
            eventDate={event.event_date}
          />
        )) : <h3>No booked events to show.</h3>}
      </div>
    </main>
  );
};

export default BookedEventsList;
