import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import getUserInfo from "../../utility/users/get_user_info";
import { User as UserType } from "../../types/users";
import { RouteParams } from "../../types/misc";
import ErrorElement from "../../components/ui/ErrorElement";
import axios from "axios";
import classes from './UserProfileInfo.module.css';
import EventsList from "../../components/events_elements/event_elements/EventsList";

const UserProfileInfo = () => {
  // const { userId } = useParams<RouteParams>(); // Use the defined RouteParams
  const { userId } = useParams() as { userId: string };

  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState(false)

  useEffect(() => {
    const getUserProfileInfo = async () => {
      try {    
        const response = await getUserInfo(userId);
        
        console.log("RESPONSE", response)

        if (response.status === 200) {
          setUser(response['data'])
        } 
      } catch (error) {
         if (axios.isAxiosError(error)) {
          const backendMessage = error.response?.data?.error;
          setError(backendMessage || error.message);
        }
      }
    }
    getUserProfileInfo()
  }, [userId])

  useEffect(() => {
    console.log("User", user)
  }, [user])

  return (
  <div className={classes["user-profile-card"]}>
  {user ? (
    <div>
      <div
        className={classes["user-profile-avatar"]}
        style={{ backgroundColor: `#${user.profile_color.replace(/^#/, '')}` }}
        aria-label={`Profile image for ${user.first_name} ${user.last_name}`}
      >
        {user.profile_image}
      </div>
      <div className={classes["user-profile-info"]}>
        <h2 className={classes["user-profile-name"]}>
          {user.first_name} {user.last_name}
        </h2>
        <p className={classes["user-profile-email"]}>{user.email}</p>
      </div>
      <EventsList />
    </div>
  ) : (
    <ErrorElement error="Could not load user details" />
  )}
</div>
  );
}

export default UserProfileInfo;