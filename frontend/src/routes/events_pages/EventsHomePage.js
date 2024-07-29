import fetchEvents from "../../utility/events_actions/fetch-events-data";
import { useEffect } from "react";
import { useState } from "react";
import classes from "./EventsHomePage.module.css"
import EventsList from "../../components/events_elements/event_elements/EventsList";
import { useSelector } from "react-redux/es/hooks/useSelector";

const EventsHomePage = () => {

  const modalDisplaying = useSelector(state => state.eventsModal.eventDetailsModalDisplaying);

  console.log(modalDisplaying)
  
    return (
      <div>
      {modalDisplaying && "MODAL DISPLAYING"}
      <EventsList />
      </div>
    );
};

export default EventsHomePage
