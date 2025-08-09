import React from "react";
import { useEffect } from "react";
import { fetchBookedEvents } from "../../utility/events_actions/fetch-events-data";
import { useState } from "react";
import ErrorElement from "../../components/ui/ErrorElement";
import BookedEventsList from "../../components/events_elements/booked_event_elements/BookedEventsList";
import Loading from "../../components/ui/Message";
import { Event as EventType } from "../../types/Events";

const BookedEventsHomePage = () => {
  const [bookedEvents, setBookedEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string|null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetchBookedEvents();
        if (response) {
          setLoading(false)
          setBookedEvents(response)
        }
      } catch (error) {
        setError("Could not load booked events.")
        console.log("BOOKED EVENTS ERROR")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents();
  }, []);

  return loading ? (<Loading message={"Loading booked events.."} />) : (error ? <ErrorElement error={error} /> : <BookedEventsList events={bookedEvents} />);
};

export default BookedEventsHomePage;
