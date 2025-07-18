import React from "react";
import { fetchEvents } from "../../../utility/events_actions/fetch-events-data";
import { useEffect, useState } from "react";
import ScrollableGallery from "../../utility_components/ScrollableGallery";
import classes from "./UpcommingEvents.module.css";
import Message from "../../ui/Message";
import useFilterEvents from "../../../hooks/use-filter-events";

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
      } catch (err: any) {
        setError(err.message); // Set error message in state
      } finally {
        setLoading(false); // End loading regardless of success or failure
      }
    };

    fetchAndSetEvents();
  }, []);

  const {
    nextSevenDaysOfEvents,
    allUpcommingEvents,
    allPastEvents,
  } = useFilterEvents(events)

  return (
    <div className={classes["upcomming-events-area"]}>
      {loading && <p>Loading events...</p>}
      {error && <p>Error: {error}</p>}
      <div>
        <h2 className={classes["events-header"]}>
          Events coming up in the next 7 days
        </h2>
        {nextSevenDaysOfEvents.length === 0 ? (
          <Message message="You don't have any events in the next 7 days." />
        ) : (
          <div className={classes["events-section"]}>
            <ScrollableGallery
              items={nextSevenDaysOfEvents}
              scrollAmount={100}
            />
          </div>
        )}
      </div>
      <div>
        <h2 className={classes["events-header"]}>All upcomming events</h2>
        {allUpcommingEvents.length == 0 ? (
          <Message message="You don't have any upcomming events." />
        ) : (
          <div className={classes["events-section"]}>
            <ScrollableGallery items={allUpcommingEvents} scrollAmount={100} />
          </div>
        )}
      </div>
      <div>
        <h2 className={classes["events-header"]}>Past events</h2>
        {allPastEvents.length === 0 ? (
          <Message message="You don't have any previous events." />
        ) : (
          <div className={classes["events-section"]}>
            <ScrollableGallery items={allPastEvents} scrollAmount={100} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UpcommingEvents;
