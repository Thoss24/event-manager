import { json } from "react-router-dom";
import axios from "axios";

const fetchEvent = async (id) => {
    return axios
    .post("http://localhost:3001/events/event-details", {id: id})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error => {
        //window.location.href = "http://localhost:3000/login"
        //return redirect("/login")
    }));
};

export default fetchEvent