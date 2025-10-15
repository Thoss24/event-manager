import axios, { AxiosResponse } from "axios";
import { LoginCredentials, RegisterUserData } from "../../types/misc";

const API_URL = process.env.REACT_APP_API_URL;

axios.defaults.withCredentials = true;

export const checkAccountType = async (userId?: number): Promise<AxiosResponse<any>> => {
  return axios
    .post(
      `${API_URL}/users/get-account-type`,
      { userId: userId },
      { withCredentials: true }
    )
    .then((response) => response)
    .catch((error) => {
      throw error;
    });
};

export const loginUser = async (user: LoginCredentials): Promise<number | void> => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, user, {
      withCredentials: true, 
    });
    return response.status;
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const logoutUser = async (): Promise<number | void> => {
  try {
    const response = await axios.post(`${API_URL}/users/logout`, {
      credentials: 'include', 
    });
    if (response.status === 200) {
      console.log('Logged out successfully');
      return response.status;
    } else {
      console.error('Logout failed');
      return response.status;
    }
  } catch (error) {
    console.error("Login failed:", error);
  }
};

export const registerUser = async (userData: RegisterUserData): Promise<number> => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData, {
      withCredentials: true, 
    });
    
    console.log("Registration successful:", response.status);
    
    const loginResponse = await loginUser({
      username: userData.email,
      password: userData.password,
    });
    
    if (loginResponse !== 200) {
      throw new Error("Auto-login failed after registration");
    }
    
    console.log("Auto-login successful");
    
    await axios.get(`${API_URL}/events/auth-status`, {
      withCredentials: true
    });
    
    return 200;
    
  } catch (error) {
    console.error("Registration failed:", error);
    if (axios.isAxiosError(error)) {
      return error.response?.status || 500;
    }
    return 500;
  }
};
