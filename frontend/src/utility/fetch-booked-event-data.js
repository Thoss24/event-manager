import axios from "axios";

const fetchBookedEvent = (id) => {
    return axios
    .post("http://localhost:3001/events/booked-event-details", {id: id})
    .then(response => response.data)
    .catch((error => {
        console.error(error)
    }));
};

export default fetchBookedEvent