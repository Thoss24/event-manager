import axios from "axios"

export const addEvent = (eventData) => {

    const response = axios.post("http://localhost:3001/", eventData)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })

};

export default addEvent;