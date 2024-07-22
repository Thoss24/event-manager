import fetchEvents from "../../utility/events_actions/fetch-events-data";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./EventsHomePage.module.css"
import EventsList from "../../components/events_elements/event_elements/EventsList";

const EventsHomePage = () => {
  
    return (
      <EventsList />
    );
};

export default EventsHomePage
