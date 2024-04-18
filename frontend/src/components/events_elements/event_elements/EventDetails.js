import Button from "../../ui/Button";
import classes from "./EventDetails.module.css";
import { useDispatch } from "react-redux";
import { redirect, useParams } from "react-router-dom";
import { bookedEventsActions } from "../../../store/booked_events_slice";
import { useSubmit, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux/es/hooks/useSelector";

const EventDetails = (props) => {

    const param = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const bookedEvents = useSelector(state => state.bookedEvents.bookedEvents);

    const existingBookedEvent = bookedEvents.filter(event => event.name === props.name);

    const proceedToEdit = () => {
    
      if (existingBookedEvent.length === 0) {
        navigate('edit');
      } else {
        alert("Cannot edit an event that has already been booked.");
      };
    };

    const bookEvent = () => {
        const event = {
            name: props.name,
            date: props.date,
            id: param.eventId
        };
        dispatch(bookedEventsActions.addEvent(event))
    };

    const submit = useSubmit();

    const deleteEventHandler = () => {
      const proceed = window.confirm(
        "Are you sure you want to delete this event?"
      );
      if (proceed) {
        const event = {
            name: props.name,
            date: props.date,
            id: param.eventId
        };
        dispatch(bookedEventsActions.removeEvent(event))
        submit(null, { method: "delete" });
      };
    };

    return (
        <div className={classes.container}>
            <div className={classes.details}>
            <h1>{props.name}</h1>
            <h1>{props.date}</h1>
            </div>
            <div className={classes.buttons}>
            <Button text={'Edit'} onclick={proceedToEdit}/>
            <Button onclick={deleteEventHandler} text={'Delete'}/>
            <Button onclick={bookEvent} text={'Book Event'}/>
            <Button link={'..'} text={'Back'}/>
            </div>
        </div>
    )
};

export default EventDetails;