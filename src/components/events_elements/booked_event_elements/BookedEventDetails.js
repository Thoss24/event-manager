import removeBookedEvent from "../../../utility/events_actions/remove-booked-event";

const BookedEventDetails = (props) => {

    const removeBookedEventHandler = () => {

    }

    const confirmRemoveBookedEventHandler = (confirm) => {
        
    }

    return (
        <div>
            <h1>{props.name}</h1>
            <h1>{props.date}</h1>
            <button onClick={removeBookedEventHandler}>Delete</button>
        </div>
    )
};

export default BookedEventDetails