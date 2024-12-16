import { useRef } from "react";
import EventListItem from "../events_elements/event_elements/EventsListItem";
import classes from "./ScrollableGallery.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ScrollableGallery = ({items, scrollAmount}) => {

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft -= scrollAmount;
      console.log(scrollContainerRef.current.scrollLeft)
    }
  }

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft += scrollAmount;
      console.log(scrollContainerRef.current.scrollLeft)
    }
  }

  return (
    <div className={classes['scrollable-gallery']}>
      <button className={classes['scroll-buttons']} onClick={scrollLeft}><FaArrowLeft /></button>
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
      <button className={classes['scroll-buttons']} onClick={scrollRight}><FaArrowRight /></button>
    </div>
  );
};

export default ScrollableGallery;
