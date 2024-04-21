import axios from "axios";

const fetchBookedEvents = () => {
    return axios
    .get("http://localhost:3001/booked-events")
    .then(response => response.data)
    .catch((error => {
        console.error(error)
    }));
}

export default fetchBookedEvents;