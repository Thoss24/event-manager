import React from "react";
import EventListItem from "./EventsListItem";
import classes from "./EventsList.module.css";
import { useEffect, useState } from "react";
import { fetchEvents, fetchMyEvents, fetchUserEvents } from "../../../utility/events_actions/fetch-events-data";
import Filter from "../../utility_components/Filter";
import useFilterEvents from "../../../hooks/use-filter-events";
import { Event as EventType } from "../../../types/Events";
import { Filter as FilterType } from "../../../types/filters";
import { EventsListProps } from "../../../types/Events";
import Message from "../../ui/Message";
import Search from "../../utility_components/Search";

const EventsList = ({pageType, userId}: EventsListProps) => {
  const [events, setEvents] = useState<EventType[]>([]);
  const [filters, setFilters] = useState<FilterType[]>([]);

  const {filteredEvents} = useFilterEvents(events, filters)

  useEffect(() => {
    const fetchEventsHandler = async () => {
      try {
        let response;
        
        switch (pageType) {
          case "userProfile":
            response = await fetchUserEvents(userId);
            break;
          case "eventsPage":
            response = await fetchEvents();
          break;
          case "homePage":
            response = await fetchMyEvents();
          break
        }
        
        if (response) {
          const onlyUpcommingEvents = response.filter((event: EventType) => {
            const todaysDate = new Date();
            const eventDate = new Date(event.event_date);
            return eventDate >= todaysDate
          });

          console.log("upcomming",onlyUpcommingEvents)

          setEvents(onlyUpcommingEvents);
        } 
      } catch (error) {
        console.log("Could not load events", error)
      }
    }
    fetchEventsHandler();
  }, [pageType]);

  useEffect(() => {
    console.log("filtered",filteredEvents)
  }, [filteredEvents])

  useEffect(() => {
    console.log("EVENTS: ", events)
  }, [events])

  const updateFilterHandler = (filter: FilterType) => {
    // need to support setting multiple filters
    
    setFilters((prevFilters) => {
      if (prevFilters.some((val) => val.value === filter.value)) {
        return prevFilters.filter((prevFilter) =>  prevFilter.value !== filter.value)
      } else {
        return [...prevFilters, filter];
      }
    })
    
  };

  const ResetFilters = () => {
    setFilters([]);
  }

  const searchEventsHandler = (query: string) => {
    console.log("Search ref: ", query)
  }

  const filterOptions = [
    { label: 'Type', type: 'Type', values: ['meeting', 'workshop', 'conference', 'party', 'training'] },
    // { label: 'Booked', type: 'Booked', values: ['booked', 'notBooked'] },
    { label: 'Date Time', type: 'Date', values: ['next7days', 'nextMonth']}];

  return (
    <div className={classes.list}>
      <Filter applyFilter={updateFilterHandler} filters={filterOptions} resetFilters={ResetFilters}/>
      <Search searchEvents={searchEventsHandler}/>
      <div className={classes['events-list']}>
      {filteredEvents && filteredEvents.length > 0 ?
        filteredEvents.map((event) => (
          <EventListItem
            key={event.event_id}
            event_name={event.event_name}
            event_date={event.event_date}
            event_img={event.event_img}
            event_description={event.event_description}
            event_time={event.event_time}
            event_type={event.event_type}
            created_at={event.created_at}
            event_id={event.event_id}
            creator_user_id={event.creator_user_id}
          />
        )) : <Message message="No events to show."/>}
        </div>
    </div>
  );
};

export default EventsList;
