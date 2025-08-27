import axios from "axios";
import { AxiosResponse } from "axios";

export const checkAccountType = async (userId?: number): Promise<AxiosResponse<any>> => {
  return axios
    .post("http://localhost:3001/users/get-account-type", {userId: userId})
    .then((response) => {
        return response;
    })
    .catch((error) => {
        window.location.href = "http://localhost:3000/login";
        throw error;
    });
};
