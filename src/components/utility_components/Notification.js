import { IoIosClose } from "react-icons/io";
import classes from "./Notifications.module.css";
import clearNotification from "../../utility/users/clear_notification";
import React from "react";

const Notification = (props) => {
  const clearNotificationHandler = async () => {
    try {
      const response = await clearNotification(props.id);

      if (response.status === 200) {
        // request successful
      } else {
        // request unsuccessful
      }
    } catch (error) {
      console.log(error);
      // display error
    }
  };

  return (
    <div className={classes.notification}>
      <p className={classes["notification-text"]}>{props.message}</p>
        <IoIosClose
          onClick={clearNotificationHandler}
          className={classes["close-notification-icon"]}
        />
    </div>
  );
};

export default Notification;
