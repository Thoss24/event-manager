import EventListItem from "./EventsListItem";
import classes from "./EventsList.module.css";
import { useEffect, useState } from "react";
import fetchEvents from "../../../utility/events_actions/fetch-events-data";
import Filter from "../../utility_components/Filter";
import useFilterEvents from "../../../hooks/use-filter-events";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [filterType, setFilterType] = useState(null);

  const {filteredEvents} = useFilterEvents(events, filterType)

  useEffect(() => {
    const fetchEventsHandler = async () => {
      try {
        const response = await fetchEvents();
        
        if (response) {
          console.log("Response", response)
          setEvents(response);
        } 
      } catch (error) {
        console.log("Could not load events", error)
      }
    }
    fetchEventsHandler();
  }, []);

  const updateFilterHandler = (filter) => {
    setFilterType(filter)
  };

  return (
    <div className={classes.list}>

      <Filter applyFilter={updateFilterHandler} filters={['Type', 'Booked', 'Next 7 days', 'Within the next month']}/>

      {filteredEvents &&
        filteredEvents.map((event) => (
          <EventListItem
            key={event.event_id}
            id={event.event_id}
            eventName={event.event_name}
            eventDate={event.event_date}
            eventImg={event.event_img}
            description={event.event_description}
            eventTime={event.event_time}
            eventType={event.event_type}
          />
        ))}
    </div>
  );
};

export default EventsList;
