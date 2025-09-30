import axios from "axios";
import { AxiosResponse } from "axios";
import { LoginCredentials, RegisterUserData } from "../../types/misc";

const API_URL = process.env.REACT_APP_API_URL;

export const checkAccountType = async (userId?: number): Promise<AxiosResponse<any>> => {
  return axios
    .post(`${API_URL}/users/get-account-type`, {userId: userId})
    .then((response) => {
        return response;
    })
    .catch((error) => {
        window.location.href = `${API_URL}/login`;
        throw error;
    });
};

export const loginUser = async (user: LoginCredentials) => {
    return axios.post(`${API_URL}/users/login`, user)
    .then((response) => {
        // redirect to home page
        console.log(response)
        // window.location.href = `${API_URL}/events`;
    })
    .catch((error) => {
        console.log(error)
    })
}

export const registerUser = async (userData: RegisterUserData) => {
    return axios.post(`${API_URL}/users/register`, userData)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}