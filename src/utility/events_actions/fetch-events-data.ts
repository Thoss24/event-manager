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
