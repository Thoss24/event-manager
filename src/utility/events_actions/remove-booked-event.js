import axios from "axios"

export const removeBookedEvent = (eventId, userId) => {

    return axios.post("http://localhost:3001/events/remove-booked-event", {eventId: eventId, userId: userId})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error) => {
        console.log(error)
    })

};

export default removeBookedEvent;