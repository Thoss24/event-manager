import axios from "axios";

const fetchBookedEvent = (id) => {
    return axios
    .post("http://localhost:3001/events/booked-event-details", {id: id})
    .then((response) => {
        return response.data
    })
    .catch((error => {
        window.location.href = "http://localhost:3000/login"
    }));
};

export default fetchBookedEvent