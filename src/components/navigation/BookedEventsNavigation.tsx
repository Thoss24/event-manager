import React from "react";
import { Link } from "react-router-dom";
import classes from './BookedEventsNavigation.module.css';

const API_URL = process.env.REACT_APP_API_URL;

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