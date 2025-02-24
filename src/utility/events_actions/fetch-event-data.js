import { json } from "react-router-dom";
import axios from "axios";

const fetchEvent = async (eventId) => {
    return axios
    .post("http://localhost:3001/events/event-details", {id: eventId})
    .then((response) => {
        return response
    })
    .catch((error => {
        console.log(error)
    }));
};

export default fetchEvent