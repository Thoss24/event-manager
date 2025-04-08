import { IoIosClose } from "react-icons/io";
import classes from './Notifications.module.css';

const Notification = (props) => {
  return (
    <div className={classes.notification}>
      <p>{props.message}</p>
      <IoIosClose className={classes["close-notification-icon"]} />
    </div>
  )
}

export default Notification;