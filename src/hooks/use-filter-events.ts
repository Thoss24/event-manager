// import { Event as EventType } from "../types/Events";
// import { Filter as FilterType } from "../types/Filters";
import { Event as EventType } from "../types/Events";
import { Filter as FilterType } from "../types/filters";
import { useMemo, useCallback } from "react";

const useFilterEvents = (
  events: EventType[],
  searchQuery?: string,
  filtersTypes?: FilterType[]
): {
  filteredEvents: EventType[];
  nextSevenDaysOfEvents: EventType[];
  allUpcommingEvents: EventType[];
  allPastEvents: EventType[];
} => {

  // Type, Booked, Next 7 days, Within the next month
  const filtersByType = useMemo(() => {
    return Array.isArray(filtersTypes)
      ? filtersTypes.reduce((acc, filter) => {
          acc[filter.type] = acc[filter.type] || [];
          acc[filter.type].push(filter.value);
          return acc;
        }, {} as Record<string, string[]>)
      : {};
  }, [filtersTypes]);

  const filterByType = useCallback(
    (events: EventType[]) => {
      return events.filter(event => 
        filtersByType.Type.includes(event.event_type)
      );
    },
    [filtersByType]
  );

  // const filterByBooked = (events: EventType[]) => {

  //   if (filtersByType.Booked.includes('notBooked')) {
  //     return events.filter((event) => {
  //       event.booked ===
  //     })
  //   }

  //   return events.filter((event) => [
  //     filtersByType.Booked.includes()
  //   ])
  // };

  const searchForEvent = (events: EventType[]) => {
    if (typeof searchQuery === 'string') {
      return events.filter(event =>
        event.event_name &&
        searchQuery &&
        event.event_name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else {
      throw new Error("Invalid search query input")
    }
  }

  const filterNextSevenDays = (events: EventType[]) => {
    const currentDate = new Date();

    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 7);

    return events.filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= currentDate && eventDate <= futureDate;
    })
  }

  const filterNextMonth = (events: EventType[]) => {
    const currentDate = new Date();

    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 30);

    return events.filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= currentDate && eventDate <= futureDate;
    })
  }

  const filterAllUpcommingEvents = (events: EventType[]) => {
    const currentDate = new Date();
    return events.filter((event) => new Date(event.event_date) >= currentDate);
  }

  const filterAllPastEvents = (events: EventType[]) => {
    const currentDate = new Date();
    return events.filter((event) => new Date(event.event_date) < currentDate);
  }

  const filteredEvents = useMemo(() => {
    let filtered = events;

    if (filtersByType.Type && filtersByType.Type.length > 0) {
      filtered = filterByType(filtered);
    }

    if (filtersByType.Date && filtersByType.Date.length > 0) {
      if (filtersByType.Date.includes('next7days')) {
        filtered = filterNextSevenDays(filtered);
      };

      if (filtersByType.Date.includes('nextMonth')) {
        filtered = filterNextMonth(filtered);
      };
    }

    if (searchQuery && searchQuery.length > 0) {
      filtered = searchForEvent(filtered);
    }

    // if (filtersByType.Booked && filtersByType.Booked.length > 0) {
    //   filtered = filterByBooked(filtered);
    // }



    return filtered;
  }, [events, filtersByType, filterByType, searchQuery]);

  return {
    filteredEvents,
    nextSevenDaysOfEvents: filterNextSevenDays(events),
    allUpcommingEvents: filterAllUpcommingEvents(events),
    allPastEvents: filterAllPastEvents(events),
  };
};

export default useFilterEvents;
