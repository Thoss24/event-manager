import fetchEvents from "../../../utility/events_actions/fetch-events-data";
import { useEffect, useState } from "react";
import EventListItem from "../event_elements/EventsListItem";

const UpcommingEvents = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then((response) => {
      if (response != "undefined") {
        setEvents(response);
        console.log(response);
      }
    });
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    const dateStr = `${year}/${month}/${day}`;

    return dateStr;
  }

  const filterNextSevenDays = (event) => {
    // get the event date
    const targetDate = new Date(event.event_date);
    const formattedTargetDate = formatDate(targetDate);

    // Get the current date
    const currentDate = new Date();
    const formattedcurrentDate = formatDate(currentDate);

    console.log("Target date ", formattedTargetDate)
    console.log("Curr date ", formattedcurrentDate)

    // Get the date 7 days from now
    const futureDate = new Date();
    futureDate.setDate(currentDate.getDate() + 7);

    return targetDate >= currentDate && targetDate <= futureDate;
  };

  return (
    <div>
      <div>
        <h2>Events coming up this week</h2>
        <div>
          {events &&
            events
              .filter(filterNextSevenDays)
              .map((event) => <h1>{event.event_name}</h1>)}
        </div>
      </div>
      <div>
        <h2>All upcomming events</h2>
      </div>
      <div>
        <h2>Past events</h2>
      </div>
    </div>
  );
};

export default UpcommingEvents;
