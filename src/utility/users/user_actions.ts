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