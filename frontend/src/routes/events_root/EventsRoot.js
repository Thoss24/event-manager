import { Outlet } from "react-router-dom";
import EventsNavigation from "../../components/navigation/EventsNavigation";
import classes from './EventsRoot.module.css';

const EventsRoot = () => {
    return (
        <div className={classes['events-root-container']}>
        <EventsNavigation />
        <main>
          <Outlet />
        </main>
      </div>
    )
};

export default EventsRoot