import React, { useEffect, useState } from 'react';
import getNotifications from '../../utility/users/get_notifications';
import checkAccountType from '../../utility/authentication/check_account_type';
import ErrorElement from '../ui/ErrorElement';
import Notification from './Notification';

function NotificationSystem() {

  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);

  const fetchAccountDetails = async () => {
    try {
      const response = await checkAccountType()
      
      console.log(response)

      if (response.status === 200) {
        setUserId(response.data[0].user_id)
        // fetchNotifications()
      } else {
        setError("Could not load account details.")
      }

    } catch (error) {
      throw error
    }
  }

  useEffect(() => {

    // const fetchNotifications = async () => {

    //   const userObj = {
    //     userId: userId
    //   };
      
    //   console.log("UserObj: ", userObj)

    //   try {
    //     const response = await getNotifications(userObj);

    //     console.log("response: ", response)

    //     if (response.status === 200) {
    //       setNotifications(response.data[0])
    //     } else {
    //       setError("Could not load notifications.")
    //     }

    //   } catch (error) {
    //     console.log(error, "Could not load notifications.")
    //     throw error
    //   }
    // }

    fetchAccountDetails()
  }, [])

  useEffect(() => {
    if (userId !== null) {
      console.log("User id 1", userId); 
      
    }
  }, [userId])

  return (
    <div className="p-4">
      {error && <ErrorElement error={error} />}
      <h1>Notifications</h1>
      {notifications && notifications.map(notification => (
        <Notification message={notification.notification}/>
      ))}
    </div>
  );
}

export default NotificationSystem;