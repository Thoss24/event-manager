import React from "react";
import { Link } from "react-router-dom";
import classes from './BookedEventsNavigation.module.css';

const BookedEventsNavigation = () => {
    return (
        <nav className={classes['booked-events-nav']}>
            <ul>
                <li><Link to={'/booked-events'}>Booked Events</Link></li>
            </ul>
        </nav>
    )
};

export default BookedEventsNavigation;