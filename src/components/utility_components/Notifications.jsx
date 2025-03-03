import React, { useEffect, useState } from "react";
import getNotifications from "../../utility/users/get_notifications";
import checkAccountType from "../../utility/authentication/check_account_type";
import ErrorElement from "../ui/ErrorElement";
import Notification from "./Notification";
import { IoIosNotifications } from "react-icons/io";
import classes from "./Notifications.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/event_details_modal_slice";

function NotificationSystem() {
  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const dispatch = useDispatch();

  const notificationsModalShowing = useSelector(
    (state) => state.eventsModal.notificationsModal
  );

  const showNotificationsHandler = () => {
    dispatch(modalActions.showNotificationsModal())
  }

  const fetchAccountDetails = async () => {
    try {
      const response = await checkAccountType();

      if (response.status === 200) {
        setUserId(response.data[0].user_id);
      } else {
        setError("Could not load account details.");
      }
    } catch (error) {
      throw error;
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await getNotifications(userId);

      if (response.status === 200 && response.data.length > 0) {
        setNotifications(response.data);
      } else {
        setError("Could not load notifications.");
      }
    } catch (error) {
      throw error;
    }
  };

  useEffect(() => {
    fetchAccountDetails();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  useEffect(() => {}, [notifications]);

  return (
    <div className={classes["notification-area"]}>
      <IoIosNotifications className={classes["notification-icon"]} onClick={showNotificationsHandler}/>
      {notificationsModalShowing && (
        <div className="p-4">
          <h1>Notifications</h1>
          <div>
            {error && <ErrorElement error={error} />}
            {notifications &&
              notifications.map((notification) => (
                <Notification message={notification.notification} />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default NotificationSystem;
