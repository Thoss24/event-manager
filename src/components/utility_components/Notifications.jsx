import React, { useEffect, useState } from 'react';
import getNotifications from '../../utility/users/get_notifications';
import checkAccountType from '../../utility/authentication/check_account_type';

function NotificationSystem() {

  const [userId, setUserId] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [errors, setErorrs] = useState();

  useEffect(() => {

    const fetchAccountDetails = async () => {
      try {
        const response = await checkAccountType()

        if (response.status === 200) {
          throw new Error("Failed to load account details.")
          setUserId(response.data[0].user_id)
        } else {
          throw new Error("Failed to load account details.")
        }

      } catch (error) {
        console.log(error, "Could not load account details.")
        throw error
      }
    }

    const fetchNotifications = async () => {
      try {
        const response = await getNotifications(userId);

        if (response.status === 200) {
          setNotifications(response.data[0])
        } else {
          throw new Error("Failed to load notifications.")
        }

      } catch (error) {
        console.log(error, "Could not load notifications.")
        throw error
      }
    }

    fetchAccountDetails()

  }, [])

  return (
    <div className="p-4">
      <h1>Notifications</h1>
    </div>
  );
}

export default NotificationSystem;