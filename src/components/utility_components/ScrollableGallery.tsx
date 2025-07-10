import React from "react";
import { useRef } from "react";
import EventListItem from "../events_elements/event_elements/EventsListItem";
import classes from "./ScrollableGallery.module.css";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Event as EventType } from "../../types/Events";

interface ScrollableGalleryTypes {
  items: EventType[],
  scrollAmount: number
}

const ScrollableGallery = ({items, scrollAmount}: ScrollableGalleryTypes) => {

const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scrollLeft = () => {
    const scrollLeft = scrollContainerRef.current?.scrollLeft ?? 0;

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
    const scrollLeft = scrollContainerRef.current?.scrollLeft ?? 0;
    const clientWidth = scrollContainerRef.current?.clientWidth ?? 0;
    const scrollWidth = scrollContainerRef.current?.scrollWidth ?? 0;

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
            event_name={event.event_name}
            event_date={event.event_date}
            event_img={event.event_img}
            event_description={event.event_description}
            event_time={event.event_time}
            event_type={event.event_type}
            created_at={event.created_at}
            event_id={event.event_id}
            creator_user_id={event.creator_user_id}
          />
        ))}
      </div>
      <button className={classes['scroll-buttons']} onClick={scrollRight}><FaArrowRight /></button>
    </div>
  );
};

export default ScrollableGallery;
