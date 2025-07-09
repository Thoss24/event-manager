import axios from "axios";

const fetchEvents = () => {
    return axios
    .get("http://localhost:3001/events/", {withCredentials: true})
    .then((response) => {
        return response.data
    })
    .catch((error => {
        console.log(error)
    }));
};

export default fetchEvents