import { Link } from "react-router-dom";
import classes from './EventsNavigation.module.css';

const EventsNavigation = () => {
    return (
        <nav className={classes['events-nav']}>
            <ul>
                <li><Link className={classes['nav-link']} to={'/events'}>Events</Link></li>
                <li><Link className={classes['nav-link']} to={'new-event'}>New Event</Link></li>
            </ul>
        </nav>
    )
};

export default EventsNavigation