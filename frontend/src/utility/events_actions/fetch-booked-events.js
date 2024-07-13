import axios from "axios";

const fetchBookedEvents = () => {
    return axios
    .get("http://localhost:3001/events/booked-events")
    .then((response) => {
        return response.data
    })
    .catch((error => {
        window.location.href = "http://localhost:3000/login"
    }));
}

export default fetchBookedEvents;