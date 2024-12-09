import { useRef } from "react";
import EventListItem from "../events_elements/event_elements/EventsListItem";
import classes from "./ScrollableGallery.module.css";

const ScrollableGallery = ({items, scrollAmount}) => {

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scrollAmount;
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
    }
  }

  return (
    <div>
      <div
        className={classes['scroll-container']}
        ref={scrollContainerRef}
      >
        {items.map((event, index) => (
           <EventListItem
           key={event.event_id}
           id={event.event_id}
           eventName={event.event_name}
           eventDate={event.event_date}
           eventImg={event.event_img}
           description={event.event_description}
           eventTime={event.event_time}
           eventType={event.event_type}
         />
        ))}
      </div>
      <button onClick={scrollLeft}>Scroll Left</button>
      <button onClick={scrollRight}>Scroll Right</button>
    </div>
  );
};

export default ScrollableGallery;
