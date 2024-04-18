import { useDispatch } from "react-redux";
import BookedEventsList from "../../components/events_elements/booked_event_elements/BookedEventsList";
import { useLoaderData } from "react-router-dom";
import { bookedEventsActions } from "../../store/booked_events_slice";

const BookedEventsHomePage = () => {

    const bookedEvents = useLoaderData();

    const dispatch = useDispatch();

    dispatch(bookedEventsActions.replaceBookedEvents(bookedEvents));

    console.log(bookedEvents)

    return (
        <BookedEventsList events={bookedEvents}/>
    )
};

export default BookedEventsHomePage

export const loader = async ({request, params}) => {
    const response = await fetch('https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/booked-events.json');

    if (!response.ok) {
        throw new Error("Could not load cart!")
    };

    const bookedEvents = await response.json();

    return bookedEvents
};
