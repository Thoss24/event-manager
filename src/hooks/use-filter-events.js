const useFilterEvents = (events, filtersTypes) => {

  console.log("filtersTypes",filtersTypes)

  const filterNextSevenDays = () => {
    // Get the current date
    const currentDate = new Date();

    // Get the date 7 days from now
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 7);

    return events.filter((event) => {
      const eventDate = new Date(event.event_date);
      return eventDate >= currentDate && eventDate <= futureDate;
    });
  };

  const filterAllUpcommingEvents = () => {
    const currentDate = new Date();
    return events.filter((event) => new Date(event.event_date) >= currentDate);
  };

  const filterAllPastEvents = () => {
    const currentDate = new Date();
    return events.filter((event) => new Date(event.event_date) < currentDate);
  };

  let filteredEvents = events;

  return {
    filteredEvents,
    nextSevenDaysOfEvents: filterNextSevenDays(),
    allUpcommingEvents: filterAllUpcommingEvents(),
    allPastEvents: filterAllPastEvents(),
  };
};

export default useFilterEvents;
