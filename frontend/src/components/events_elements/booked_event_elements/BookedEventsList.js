import BookedEventListItem from "./BookedEventListItem";
import classes from "./BookedEventsList.module.css";

const BookedEventsList = (props) => {

  const extractAndStoreBookedEvents = () => {
    let result = [];
    const events = props.events;
    for (const event in events) {
      console.log(events[event])
      result.push({
        name: events[event].name,
        date: events[event].date,
        id: event
      });
    }
    return result
  };
  extractAndStoreBookedEvents();

  return (
    <main>
      <div className={classes['booked-events-list']}>
        {extractAndStoreBookedEvents().map((event) => (
          <BookedEventListItem
            name={event.name}
            date={event.date}
            key={event.id}
            id={event.id}
          />
        ))}
      </div>
    </main>
  );
};

export default BookedEventsList;
