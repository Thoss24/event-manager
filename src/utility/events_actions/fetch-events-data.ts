import axios from "axios";

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