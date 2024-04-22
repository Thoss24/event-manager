import classes from "./BookedEventListItem.module.css";
import { Link } from "react-router-dom";

const BookedEventListItem = (props) => {

    console.log(props.id)

    return (
        <div className={classes['list-item']}>
            <Link to={`${props.id}`}>
            <h1>{props.name}</h1>
            <h3>{props.description}</h3>
            <h4>{props.eventDate}</h4>
            </Link>
        </div>
    )
};

export default BookedEventListItem;