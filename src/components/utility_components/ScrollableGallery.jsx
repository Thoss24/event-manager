import { useRef } from "react";
import EventListItem from "../events_elements/event_elements/EventsListItem";
import classes from "./ScrollableGallery.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const ScrollableGallery = ({items, scrollAmount}) => {

  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    const {scrollLeft} = scrollContainerRef.current;

    if (!scrollContainerRef.current) {
      return;
    };

    let currentScrollWidth = scrollLeft - scrollAmount;
    
    scrollContainerRef.current.scrollTo({
      left: currentScrollWidth - scrollAmount,
      behavior: "smooth",
    });
  }

  const scrollRight = () => {
    const {scrollLeft, clientWidth, scrollWidth} = scrollContainerRef.current;

    if (!scrollContainerRef.current) {
      return;
    }

    let maxScrollWidth = scrollWidth - clientWidth ;
    let currentScrollWidth = scrollLeft + scrollAmount;
    
    if (currentScrollWidth >= maxScrollWidth - 1) {
      scrollContainerRef.current.scrollTo({
        left: 0,
        behavior: "smooth",
      });
    } else {
       scrollContainerRef.current.scrollTo({
        left: currentScrollWidth + scrollAmount,
        behavior: "smooth",
      });
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
