import axios from "axios"

export const removeBookedEvent = (eventId) => {

    return axios.post("http://localhost:3001/events/remove-booked-event", {id: eventId})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error) => {
        console.log(error)
    })

};

export default removeBookedEvent;