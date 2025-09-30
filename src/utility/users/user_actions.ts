import { AxiosResponse } from "axios";
import axios from "axios";
import { getUserInfoData, ResponseParams } from "../../types/misc";

const API_URL = process.env.REACT_APP_API_URL;

export const getUserInfo = async (req: getUserInfoData) => {
  return axios
    .post(`${API_URL}/users/get-user-info`, { userId: req.userId })
    .then((response) => response)
    .catch((error) => error);
};

export const createResponse = async (
  params: ResponseParams
): Promise<AxiosResponse<any>> => {
  return axios
    .post(`${API_URL}/users/create-response`, params)
    .then((response) => response)
    .catch((error) => {
      console.error(error);
      throw error;
    });
};

export const getResponses = async (response: number) => {
  return axios
    .post(`${API_URL}/users/get-responses`, response)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const getUsers = async () => {
  return axios
    .get(`${API_URL}/users/get-all-users`)
    .then((response) => response)
    .catch((error) => {
      console.log(error);
    });
};

export const clearNotification = async (notificationId: number) => {
  return axios
    .post(`${API_URL}/users/clear-notification`, { notificationId })
    .then((response) => {
      if (response.status === 200) {
        return { message: "Notification successfully cleared", status: response.status };
      }
    })
    .catch((error) => {
      if (error.response && error.response.status === 500) {
        return { message: "Unable to clear notification", status: error.response.status };
      }
    });
};

export const getNotifications = async (userId: number | null) => {
  try {
    const response = await axios.post(`${API_URL}/users/get-notifications`, { userId });
    return response;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};
