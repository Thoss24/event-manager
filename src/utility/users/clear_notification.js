import axios from "axios";

const clearNotification = async (notificationId) => {
  console.log(notificationId)
  return axios.post("http://localhost:3001/users/clear-notification", {notificationId: notificationId}).then((response) => {
    if (response.status === 200) {
      return {'message': 'Notification successfully cleared', 'status': response.status}
    }
  }).catch((error) => {
    if (error.response && error.response.status === 500) {
      return {'message': 'Unable to clear notification', 'status': error.response.status}
    }
  })
};

export default clearNotification;