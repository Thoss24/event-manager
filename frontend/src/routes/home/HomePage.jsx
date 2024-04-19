import { useState } from "react";
import axios from "axios";

const HomePage = () => {

  const [events, setEvents] = useState([]);

  const testHandler = () => {
    axios
      .get("http://localhost:3001/")
      .then(function (response) {
        const eventsFromDb = []
        for (const i in response.data) {
          eventsFromDb[i] = response.data[i]
        }
        setEvents(eventsFromDb)
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <h1>Home</h1>
      <section>
        <button onClick={testHandler}>TEST</button>
      </section>
      {events.length > 0 && events.map((event) => (
        <div key={event.event_id}>
          <h1>{event.event_name}</h1>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
