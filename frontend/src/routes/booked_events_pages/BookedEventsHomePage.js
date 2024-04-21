import { useEffect } from "react";
import fetchBookedEvents from "../../utility/fetch-booked-events";
import { useState } from "react";
import BookedEventsList from "../../components/events_elements/booked_event_elements/BookedEventsList";

const BookedEventsHomePage = () => {

    const [bookedEvents, setBookedEvents] = useState([])

    useEffect(() => {
        fetchBookedEvents().then(response => {
            setBookedEvents(response)
        })
    }, [])

    return (
        <BookedEventsList events={bookedEvents}/>
    )
};

export default BookedEventsHomePage


