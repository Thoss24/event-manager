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
  const [responseMsg, setResponseMsg] = useState(null);

  const dispatch = useDispatch();

  const notificationsModalShowing = useSelector(
    (state) => state.eventsModal.notificationsModalDisplaying
  );

  const showNotificationsHandler = () => {
    dispatch(modalActions.notificationsModalHandler());
  };

  const fetchAccountDetails = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await checkAccountType();

        if (response.status === 200) {
          setUserId(response.data[0].user_id);
          resolve(response.data[0].user_id);
        } else {
          setError("Could not load account details.");
          reject(new Error());
        }
      } catch (error) {
        throw error;
      }
    });
  };

  const fetchNotifications = async () => {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await getNotifications(userId);

        if (response.status === 500) {
          // server error
          setError(response.data.error);
        }

        if (response.status === 200 && response.data.length > 0) {
          // request successful, not empty
          setNotifications(response.data);
          resolve(response.data);
        } else {
          // request successful, empty
          setError(response.data.message);
        }
      } catch (error) {
        throw error;
      }
    });
  };

  const clearNotificationHandler = (id) => {
    setNotifications((prev) => {
      return prev.filter((notification) => notification.id !== id)
    });
    console.log("Notifications after clearing: ", notifications)
  };

  const setResponseMsgHandler = (message) => {
    setResponseMsg(message);
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
    <div className={classes["notifications-container"]}>
      <IoIosNotifications
        className={classes["notification-icon"]}
        onClick={showNotificationsHandler}
      />
      <div className={classes["notification-area"]}>
        {notificationsModalShowing && (
          <div className={classes.notifications}>
            <h2>Notifications</h2>
            <p className={classes['response-msg']}>{responseMsg}</p>
            {error && <ErrorElement error={error} />}
            {notifications &&
              notifications.map((notification) => (
                <Notification
                  message={notification.notification}
                  key={notification.id}
                  id={notification.id}
                  onDelete={clearNotificationHandler}
                  setResponseMsgHandler={setResponseMsgHandler}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default NotificationSystem;
