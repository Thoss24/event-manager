import axios from "axios";
import { AxiosResponse } from "axios";
import { RemoveBookedEventResponse } from "../../types/Events";
import { NewEventType } from "../../types/Events";

export const fetchEvents = () => {
    return axios
    .get("http://localhost:3001/events/", {withCredentials: true})
    .then((response) => {
        return response.data
    })
    .catch((error => {
        console.log(error)
    }));
};

export const fetchMyEvents = async () => {
    return axios
    .get("http://localhost:3001/events/my-events")
    .then((response) => {
        console.log("UTIL", response)
        return response.data
    })
    .catch((error => {
        console.log(error)
    }));
};

export const fetchUserEvents = async (userId?: string) => {
    return axios
    .post("http://localhost:3001/events/get-user-events", {userId: userId})
    .then((response) => {
        return response.data
    })
    .catch((error => {
        console.log(error)
    }));
};

export const fetchBookedEvents = () => {
    return axios
    .get("http://localhost:3001/events/booked-events")
    .then((response) => {
        return response.data
    })
    .catch((error => {
        //window.location.href = "http://localhost:3000/login"
        //return redirect("/login")
    }));
}

export const removeBookedEvent = async (
  eventId: number,
  userId?: number
): Promise<AxiosResponse<RemoveBookedEventResponse>> => {
  try {
    const response = await axios.post<RemoveBookedEventResponse>(
      "http://localhost:3001/events/remove-booked-event",
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
    .post("http://localhost:3001/events/event-details", {id: eventId})
    .then((response) => {
        return response
    })
    .catch((error => {
        console.log(error)
        throw error;
    }));
};

export const fetchBookedEvent = (id: string) => {
    return axios
    .post("http://localhost:3001/events/booked-event-details", {id: id})
    .then((response) => {
        return response.data
    })
    .catch((error => {
        console.log(error)
    }));
};

export const bookEvent = async (eventId: number, userId: number) => {
    return axios.post("http://localhost:3001/events/book-event", {eventId: eventId, userId: userId})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error) => {
        console.log(error)
    })

};

export const deleteEvent = async (id: number) => {
    return axios.post("http://localhost:3001/events/delete-event", {id: id})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error) => {
        console.log(error)
    })

};

export const addEvent = async (eventData: NewEventType) => {
    return axios.post("http://localhost:3001/events/", eventData)
    .then((response) => {
        if (response.status === 200) {
            return {'message': 'Event successfully created', "status": 200}
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 500) {
            return {'message': 'Event could not be added', "status": 500}
        }
    })

};