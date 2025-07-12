import React from "react";
import UserProfileInfo from "../../components/users_elements/UserProfileInfo";
import EventsList from "../../components/events_elements/event_elements/EventsList";
import classes from './UserProfilePage.module.css';

const userProfilePage = () => {
  return (
         <div className={classes.container}>
            <div className={classes.userProfileInfo}>
                <UserProfileInfo />
            </div>
            <div className={classes.eventsList}>
                <EventsList pageType={'userProfile'} />
            </div>
        </div>
  )
}

export default userProfilePage;