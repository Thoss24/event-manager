import { json } from "react-router-dom";
import axios from "axios";

const fetchEvent = async (eventId) => {
    return axios
    .post("http://localhost:3001/events/event-details", {id: eventId})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error => {
        window.location.href = "http://localhost:3000/login"
    }));
};

export default fetchEvent