import fetchEvents from "../../../utility/events_actions/fetch-events-data";
import { useEffect, useState } from "react";
import ScrollableGallery from "../../utility_components/ScrollableGallery";
import classes from "./UpcommingEvents.module.css";

const UpcommingEvents = () => {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState(null); // State to hold error messages
  const [loading, setLoading] = useState(true); // State to indicate loading status

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      try {
        setLoading(true); // Start loading
        const response = await fetchEvents();

        if (response) {
          setEvents(response);
        } else {
          throw new Error("No events found"); // Handle case where response is empty
        }
      } catch (err) {
        setError(err.message); // Set error message in state
      } finally {
        setLoading(false); // End loading regardless of success or failure
      }
    };

    fetchAndSetEvents();
  }, []);

  const filterNextSevenDays = () => {
    // Get the current date
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    // Get the date 7 days from now
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 7);
    const formattedFutureDate = formatDate(futureDate);

    let filteredEvents = [];

    events.forEach((event) => {
      //  get the event date
      const targetDate = new Date(event.event_date);
      const formattedTargetDate = formatDate(targetDate);

      formattedTargetDate >= formattedCurrentDate &&
        formattedTargetDate <= formattedFutureDate &&
        filteredEvents.push(event);
    });

    return filteredEvents;
  };

  const filterAllUpcommingEvents = () => {
    // Get the current date
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    let filteredEvents = [];

    events.forEach((event) => {
      //  get the event date
      const targetDate = new Date(event.event_date);
      const formattedTargetDate = formatDate(targetDate);

      formattedTargetDate >= formattedCurrentDate && filteredEvents.push(event);
    });

    return filteredEvents;
  };

  const filterAllPastEvents = () => {
    // Get the current date
    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    let filteredEvents = [];

    events.forEach((event) => {
      //  get the event date
      const targetDate = new Date(event.event_date);
      const formattedTargetDate = formatDate(targetDate);

      formattedTargetDate < formattedCurrentDate && filteredEvents.push(event);
    });

    return filteredEvents;
  };

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    const dateStr = `${year}/${month}/${day}`;

    return dateStr;
  };

  // next seven days of events
  const nextSevenDaysOfEvents = filterNextSevenDays();
  // all upcomming events
  const allUpcommingEvents = filterAllUpcommingEvents();
  // all past events
  const allPastEvents = filterAllPastEvents();

  return (
    <div className={classes["upcomming-events-area"]}>
      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <h2>Events coming up in the next 7 days</h2>
        <div className={classes.events}>
          {nextSevenDaysOfEvents && (
            <ScrollableGallery
              items={nextSevenDaysOfEvents}
              scrollAmount={100}
            />
          )}
        </div>
      </div>
      <div>
        <h2>All upcomming events</h2>
        <div className={classes.events}>
          {allUpcommingEvents && (
            <ScrollableGallery
              items={allUpcommingEvents}
              scrollAmount={100}
            />
          )}
        </div>
      </div>
      <div>
        <h2>Past events</h2>
        <div className={classes.events}>
        {allPastEvents && (
            <ScrollableGallery
              items={allPastEvents}
              scrollAmount={100}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcommingEvents;
