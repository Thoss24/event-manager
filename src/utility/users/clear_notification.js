import axios from "axios";

const clearNotification = async () => {
  return axios.patch("http://localhost:3001/users/clear-notification", {
    seen: true
  }).then((response) => {
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