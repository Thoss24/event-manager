import axios from "axios"

export const editEvent = async (eventData) => {

    return axios.post("http://localhost:3001/events/edit-event", eventData)
    .then((response) => {
        console.log(response)
        window.location.href = "http://localhost:3000/events"
    })
    .catch((error) => {
        console.log(error)
    })

};