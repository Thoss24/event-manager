import axios from "axios";
import { redirect } from "react-router-dom";

const fetchEvents = () => {
    return axios
    .get("http://localhost:3001/events/", {withCredentials: true})
    .then((response) => {
        return response.data
    })
    .catch((error => {
        window.location.href = "http://localhost:3000/login"
    }));
};

export default fetchEvents