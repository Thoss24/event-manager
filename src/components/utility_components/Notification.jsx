import { IoIosClose } from "react-icons/io";
import classes from "./Notifications.module.css";
import clearNotification from "../../utility/users/clear_notification";

const Notification = (props) => {
  const clearNotificationHandler = async () => {
    try {
      const response = await clearNotification(props.id);

      if (response.status === 200) {
        if (props.onDelete) {
          props.onDelete(props.id);
          props.setResponseMsgHandler("Notification successfully deleted");
        }
      } else {
        props.setResponseMsgHandler("Unable to delete notification");
      }
    } catch (error) {
      console.log(error);
      // display error
    } finally {
      setTimeout(() => {
        props.setResponseMsgHandler(null);
      }, [2000]);
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
