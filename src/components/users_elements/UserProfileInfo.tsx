import React from "react";
import { User as UserType } from "../../types/users";
import ErrorElement from "../ui/ErrorElement";
import classes from "./UserProfileInfo.module.css";
import EventsList from "../events_elements/event_elements/EventsList";

const UserProfileInfo = ({user_id, email, first_name, last_name, account_type, profile_color, profile_image,}: UserType) => {

  console.log("User ID", user_id)

  return (
    <div className={classes["user-profile-card"]}>
      {user_id ? (
        <div>
          <div
            className={classes["user-profile-avatar"]}
            style={{
              backgroundColor: `#${profile_color}`,
            }}
            aria-label={`Profile image for ${first_name} ${last_name}`}
          >
            {profile_image}
          </div>
          <div className={classes["user-profile-info"]}>
            <h2 className={classes["user-profile-name"]}>
              {first_name} {last_name}
            </h2>
            <p className={classes["user-profile-email"]}>{email}</p>
          </div>
        </div>
      ) : (
        <ErrorElement error="Could not load user details" />
      )}
      <h2>My events</h2>
      <EventsList pageType={"userProfile"} userId={String(user_id)}/>
    </div>
  );
};

export default UserProfileInfo;
