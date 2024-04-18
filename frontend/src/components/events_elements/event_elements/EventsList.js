import EventListItem from "./EventsListItem";
import classes from './EventsList.module.css'
import { useDispatch } from "react-redux";
import { eventsActions } from "../../../store/events_slice";
import { useSelector } from "react-redux";

const EventsList = (props) => {

    const dispatch = useDispatch();
    
    dispatch(eventsActions.replaceEvents(props.events));

    const events = useSelector(state => state.events.events);
    const bookedEvents = useSelector(state => state.bookedEvents.bookedEvents);
    console.log(bookedEvents)

    const getEvents = () => {
       const extractedEvents = events.map(event => event).reduce ((a, b) => {return a.name})
       
       const finalArr = []

        for (const i in extractedEvents) {
            finalArr.push({
                name: extractedEvents[i].name,
                date: extractedEvents[i].date,
                id: i
            });
        };
    console.log(finalArr)
    return finalArr
    }
    
    return (
        <div className={classes.list}>
            {getEvents().map(event => (
                <EventListItem 
                key={event.id}
                id={event.id}
                name={event.name}
                date={event.date}
                />
            ))}
        </div>
    )
};

export default EventsList