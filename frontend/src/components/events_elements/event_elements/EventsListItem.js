import classes from './EventsListItem.module.css';
import { Link } from 'react-router-dom';

const EventListItem = (props) => {
    return (
        <div className={classes.item}>
            <Link to={props.id}>
            <h1>{props.name}</h1>
            <h2>{props.date}</h2>
            </Link>
        </div>
    )
};

export default EventListItem