import { AxiosResponse } from "axios";
import axios from "axios";
import { getUserInfoData, ResponseParams } from "../../types/misc";

export const getUserInfo = async (req:getUserInfoData) => {
    return axios.post("http://localhost:3001/users/get-user-info", {userId: req.userId})
    .then((response) => {

        return response
    })
    .catch((error) => {
        return error
    })
}

export const createResponse = async (
  params: ResponseParams
): Promise<AxiosResponse<any>> => {
  return axios
    .post("http://localhost:3001/users/create-response", params)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getResponses = async (response:number) => {
    return axios.post("http://localhost:3001/users/get-responses", response)
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getUsers = async () => {
    return axios.get("http://localhost:3001/users/get-all-users")
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })
}

export const clearNotification = async (notificationId: number) => {
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

export const getNotifications = async (userId: number) => {
    console.log("User id get notifications", userId);

    try {
        const response = await axios.post("http://localhost:3001/users/get-notifications", { userId });
        return response; // Return the response if successful
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error; // Rethrow the error for upstream handling
    }
};