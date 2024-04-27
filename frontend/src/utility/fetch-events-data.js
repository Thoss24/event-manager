import axios from "axios";

const fetchEvents = () => {
    return axios
    .get("http://localhost:3001/events/")
    .then(response => response.data)
    .catch((error => {
        console.error(error)
    }));
};

export default fetchEvents