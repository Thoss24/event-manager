import axios, { AxiosResponse } from "axios";
import { RemoveBookedEventResponse, NewEventType, editedEvent } from "../../types/Events";

const API_URL = process.env.REACT_APP_API_URL;

export const fetchEvents = () => {
  return axios
    .get(`${API_URL}/events/`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const fetchMyEvents = async () => {
  return axios
    .get(`${API_URL}/events/my-events`)
    .then((response) => {
      console.log("UTIL", response);
      return response.data;
    })
    .catch((error) => console.log(error));
};

export const fetchUserEvents = async (userId?: string) => {
  return axios
    .post(`${API_URL}/events/get-user-events`, { userId })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const fetchBookedEvents = () => {
  return axios
    .get(`${API_URL}/events/booked-events`)
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const removeBookedEvent = async (
  eventId: number,
  userId?: number
): Promise<AxiosResponse<RemoveBookedEventResponse>> => {
  try {
    const response = await axios.post<RemoveBookedEventResponse>(
      `${API_URL}/events/remove-booked-event`,
      { eventId, userId }
    );
    console.log(response);
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const fetchEvent = async (eventId: number): Promise<AxiosResponse<any>> => {
  return axios
    .post(`${API_URL}/events/event-details`, { id: eventId })
    .then((response) => response)
    .catch((error) => {
      console.log(error);
      throw error;
    });
};

export const fetchBookedEvent = (id: string) => {
  return axios
    .post(`${API_URL}/events/booked-event-details`, { id })
    .then((response) => response.data)
    .catch((error) => console.log(error));
};

export const bookEvent = async (eventId: number, userId: number) => {
  return axios
    .post(`${API_URL}/events/book-event`, { eventId, userId })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => console.log(error));
};

export const deleteEvent = async (id: number) => {
  return axios
    .post(`${API_URL}/events/delete-event`, { id })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((error) => console.log(error));
};

export const addEvent = async (eventData: NewEventType) => {
  return axios
    .post(`${API_URL}/events/`, eventData)
    .then((response) => {
      if (response.status === 200) {
        return { message: "Event successfully created", status: 200 };
      }
    })
    .catch((error) => {
      console.log(error);
      if (error.response && error.response.status === 500) {
        return { message: "Event could not be added", status: 500 };
      }
    });
};

export const editEvent = async (eventData: editedEvent) => {
  return axios
    .post(`${API_URL}/events/edit-event`, eventData)
    .then((response) => {
      return response
    })
    .catch((error) => console.log(error));
};
