import axios from "axios";
import { redirect } from "react-router-dom";

const fetchBookedEvents = () => {
    return axios
    .get("http://localhost:3001/events/booked-events")
    .then((response) => {
        return response.data
    })
    .catch((error => {
        //window.location.href = "http://localhost:3000/login"
        //return redirect("/login")
    }));
}

export default fetchBookedEvents;