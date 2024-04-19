import fetchEvents from "../../utility/fetch-events-data";
import { useEffect } from "react";
import { useState } from "react";

const HomePage = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents().then(response => {
      setEvents(response)
    })
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <section>
        <button>TEST</button>
      </section>
      {events &&
        events.map((event) => (
          <div key={event.event_id}>
            <h1>{event.event_name}</h1>
          </div>
        ))}
    </div>
  );
};

export default HomePage;
