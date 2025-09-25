import axios from "axios";
import { AxiosResponse } from "axios";
import { LoginCredentials, RegisterUserData } from "../../types/misc";

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

export const loginUser = async (user: LoginCredentials) => {
    return axios.post("http://localhost:3001/users/login", user)
    .then((response) => {
        // redirect to home page
        console.log(response)
        // window.location.href = 'http://localhost:3000/events';
    })
    .catch((error) => {
        console.log(error)
    })
}

export const registerUser = async (userData: RegisterUserData) => {
    return axios.post("http://localhost:3001/users/register", userData)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}