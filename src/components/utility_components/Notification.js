import { IoIosClose } from "react-icons/io";
import classes from './Notifications.module.css';
import clearNotification from "../../utility/users/clear_notification";
import React from "react";

const Notification = (props) => {

  const clearNotificationHandler = async () => {
    try {
      const response = await clearNotification();

      if (response.status === 200) {
        // request successful
      } else {
        // request unsuccessful
      }

    } catch (error) {
      console.log(error)
      // display error
    }
  }

  return (
    <div className={classes.notification}>
      <p>{props.message}</p>
      <button aria-label="Clear notification" onClick={clearNotificationHandler}><IoIosClose className={classes["close-notification-icon"]} /></button>
    </div>
  )
}

export default Notification;