import axios from "axios";

const fetchBookedEvent = (id) => {
    return axios
    .post("http://localhost:3001/events/booked-event-details", {id: id})
    .then((response) => {
        if (response.status === 401) {
            window.location.href = "http://localhost:3000/login"
        } else {
            return response
        }
    })
    .catch((error => {
        console.error(error)
    }));
};

export default fetchBookedEvent