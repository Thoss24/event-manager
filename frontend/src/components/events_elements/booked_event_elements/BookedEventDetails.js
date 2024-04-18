import { useSubmit } from "react-router-dom";
import { useDispatch } from "react-redux";
import { bookedEventsActions } from "../../../store/booked_events_slice";

const BookedEventDetails = (props) => {

    const submit = useSubmit();

    const dispatch = useDispatch();

    const deleteBookedEvent = () => {
        const event = {
            name: props.name,
            date: props.date
        };
        dispatch(bookedEventsActions.removeEvent(event));
        submit(null, {method: 'delete'});
    };

    return (
        <div>
            <h1>{props.name}</h1>
            <h1>{props.date}</h1>
            <button onClick={deleteBookedEvent}>Delete</button>
        </div>
    )
};

export default BookedEventDetails