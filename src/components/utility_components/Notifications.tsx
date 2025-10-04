import React from "react";
import { useEffect, useState } from "react";
import { getNotifications } from "../../utility/users/user_actions";
import { checkAccountType } from "../../utility/authentication/auth_actions";
import ErrorElement from "../ui/ErrorElement";
import Notification from "./Notification";
import { IoIosNotifications } from "react-icons/io";
import classes from "./Notifications.module.css";
import { useSelector, useDispatch } from "react-redux";
import { modalActions } from "../../store/event_details_modal_slice";
import useWindowResize from "../../hooks/use-window-resize";
import { RootState } from "../../store/store_index";
import { useNavigate } from "react-router-dom";

interface NotificationType {
  id: number,
  user_id: number,
  event_id: number,
  notification: string,
  seen: boolean
}

function NotificationSystem() {
  const [userId, setUserId] = useState<number>(0);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [error, setError] = useState<string|null>(null);
  const [responseMsg, setResponseMsg] = useState<string|null>('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const width = useWindowResize();

  const notificationsModalShowing = useSelector(
    (state: RootState) => state.eventsModal.notificationsModalDisplaying
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
          navigate('app/home')
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

  const clearNotificationHandler = (id: number) => {
    setNotifications((prev) => {
      return prev.filter((notification) => notification.id !== id);
    });
    console.log("Notifications after clearing: ", notifications);
  };

  const setResponseMsgHandler = (message: string|null) => {
    setResponseMsg(message)
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

  useEffect(() => {
    if (width && width <= 520 && notificationsModalShowing === true) {
      dispatch(modalActions.notificationsModalHandler());
    }
  }, [width]);

  return (
    <div className={classes["notifications-container"]}>
      <div className={classes["notification-icon-area"]}>
      <IoIosNotifications
        className={classes["notification-icon"]}
        onClick={showNotificationsHandler}
      />
      {notifications && notifications.length > 0 && (
        <div className={classes["notification-icon-count"]}>
          {notifications.length > 9 ? '9+' : notifications.length}
        </div>
      )}
      </div>
      <div className={classes["notification-area"]}>
        {notificationsModalShowing && (
          <div className={classes.notifications}>
            <h2>Notifications</h2>
            <p className={classes["response-msg"]}>{responseMsg && responseMsg.length > 0 && responseMsg}</p>
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
