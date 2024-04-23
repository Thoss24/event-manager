import BookedEventListItem from "./BookedEventListItem";
import classes from "./BookedEventsList.module.css";

const BookedEventsList = (props) => {

  console.log(props.events)

  return (
    <main>
      <div className={classes['booked-events-list']}>
        {props.events.map((event) => (
          <BookedEventListItem
            key={event.event_id}
            id={event.event_id}
            name={event.event_name}
            description={event.event_description}
            eventDate={event.event_date}
            eventImg={event.event_img}
          />
        ))}
      </div>
    </main>
  );
};

export default BookedEventsList;
