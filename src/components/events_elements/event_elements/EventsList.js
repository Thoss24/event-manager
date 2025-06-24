import EventListItem from "./EventsListItem";
import classes from "./EventsList.module.css";
import { useEffect, useState } from "react";
import fetchEvents from "../../../utility/events_actions/fetch-events-data";
import Filter from "../../utility_components/Filter";
import useFilterEvents from "../../../hooks/use-filter-events";

const EventsList = () => {
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState([]);

  const {filteredEvents} = useFilterEvents(events, filters)

  useEffect(() => {
    const fetchEventsHandler = async () => {
      try {
        const response = await fetchEvents();
        
        if (response) {
          const onlyUpcommingEvents = response.filter((event) => {
            const todaysDate = new Date();
            const eventDate = new Date(event.event_date);
            return eventDate >= todaysDate
          });

          setEvents(onlyUpcommingEvents);
        } 
      } catch (error) {
        console.log("Could not load events", error)
      }
    }
    fetchEventsHandler();
  }, []);

  const updateFilterHandler = (filter) => {
    // need to support setting multiple filters
    
    setFilters((prevFilters) => {
      if (prevFilters.some((val) => val.value === filter.value)) {
        return prevFilters.filter((prevFilter) =>  prevFilter.value !== filter.value)
      } else {
        return [...prevFilters, filter];
      }
    })
    
  };

  const filterOptions = [
    { label: 'Type', type: 'Type', values: ['meeting', 'workshop', 'conference', 'party', 'training'] },
    // { label: 'Booked', type: 'Booked', values: ['booked', 'notBooked'] },
    { label: 'Date Time', type: 'Date', values: ['next7days', 'nextMonth']}];

  return (
    <div className={classes.list}>
      <Filter applyFilter={updateFilterHandler} filters={filterOptions}/>
      <div>
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
    </div>
  );
};

export default EventsList;
