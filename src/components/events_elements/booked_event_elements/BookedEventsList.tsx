import React from "react";
import BookedEventListItem from "./BookedEventListItem";
import classes from "./BookedEvents.module.css";
import Message from "../../ui/Message";
import { BookedEventsListProps } from "../../../types/Events";
import Search from "../../utility_components/Search";
import Filter from "../../utility_components/Filter";
import { Filter as FilterType } from "../../../types/filters";
import { useState } from "react";
import useFilterEvents from "../../../hooks/use-filter-events";

const BookedEventsList = ({events}: BookedEventsListProps) => {

  const [filters, setFilters] = useState<FilterType[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const {filteredEvents} = useFilterEvents(events, searchQuery, filters)

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
    setSearchQuery(query);
  }

  return (
    <main className={classes.list}>
      <Filter applyFilter={updateFilterHandler} resetFilters={ResetFilters} page={'bookedEvents'}/>
      <Search searchEvents={searchEventsHandler}/>
      <div className={classes['booked-events-list']}>
        {filteredEvents && filteredEvents.length > 0 ? filteredEvents.map((event) => (
          <BookedEventListItem
            key={event.event_id}
            id={event.event_id}
            name={event.event_name}
            description={event.event_description}
            eventDate={event.event_date}
            eventImg={event.event_img}
            eventTime={event.event_time}
          />
        )) : <Message message={"You have no booked events"} />}
      </div>
    </main>
  );
};

export default BookedEventsList;
