import React from "react";
import UserProfileInfo from "../../components/users_elements/UserProfileInfo";
import EventsList from "../../components/events_elements/event_elements/EventsList";
import classes from "./UserProfilePage.module.css";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { User as UserType } from "../../types/users";
import axios from "axios";
import getUserInfo from "../../utility/users/get_user_info";

const UserProfilePage = () => {
  const { userId } = useParams() as { userId: string };

  const [user, setUser] = useState<UserType | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserProfileInfo = async () => {
      try {
        const idToSend = userId === undefined ? "current" : userId;

        const response = await getUserInfo({ userId: idToSend });

        if (response.status === 200) {
          setUser(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const backendMessage = error.response?.data?.error;
          setError(backendMessage || error.message);
        }
      }
    };
    getUserProfileInfo();
  }, [userId]);

  return (
    <div className={classes.container}>
      <div className={classes.userProfileInfo}>
        <UserProfileInfo
          user_id={user?.user_id}
          email={user?.email}
          first_name={user?.first_name}
          last_name={user?.last_name}
          account_type={user?.account_type}
          profile_image={user?.profile_image}
          profile_color={user?.profile_color}
        />
      </div>
      <div className={classes.eventsList}>
        <EventsList pageType={"userProfile"} />
      </div>
    </div>
  );
};

export default UserProfilePage;
