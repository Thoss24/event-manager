import axios from "axios"

export const addEvent = (eventData) => {

    return axios.post("http://localhost:3001/events/", eventData)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })

};

export default addEvent;