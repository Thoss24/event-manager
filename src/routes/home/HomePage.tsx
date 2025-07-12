import React from 'react';
import classes from './HomePage.module.css';
import UpcommingEvents from '../../components/events_elements/upcomming_events_elements/UpcommingEvents';
import UserProfileInfo from '../../components/users_elements/UserProfileInfo';
import EventsList from '../../components/events_elements/event_elements/EventsList';

const HomePage = () => {

  return (
    <div className={classes['profile-events-container']}>
      <UserProfileInfo />
      <EventsList pageType={'homePage'} />
      <UpcommingEvents />
    </div>
  );
};

export default HomePage;
