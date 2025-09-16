import React from "react";
import { IoIosClose } from "react-icons/io";
import classes from "./Notifications.module.css";
import { clearNotification } from "../../utility/users/user_actions";

interface NotificationProps {
  message: string, 
  key: number,
  id: number,
  onDelete:(prop: number) => void,
  setResponseMsgHandler: (prop: string|null) => void
}

const Notification = ({message, key, id, onDelete, setResponseMsgHandler}: NotificationProps) => {
  const clearNotificationHandler = async () => {
    try {
      const response = await clearNotification(id);

      if (response && response.status === 200) {
        if (onDelete) {
          onDelete(id);
          setResponseMsgHandler("Notification successfully deleted");
        }
      } else {
        setResponseMsgHandler("Unable to delete notification");
      }
    } catch (error) {
      console.log(error);
      // display error
    } finally {
      setTimeout(() => {
        setResponseMsgHandler('');
      }, 2000);
    }
  };

  return (
    <div className={classes.notification}>
      <p className={classes["notification-text"]}>{message}</p>
      <IoIosClose
        onClick={clearNotificationHandler}
        className={classes["close-notification-icon"]}
      />
    </div>
  );
};

export default Notification;
