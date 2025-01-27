import axios from "axios"

export const bookEvent = (eventId, userId) => {

    return axios.post("http://localhost:3001/events/book-event", {eventId: eventId, userId: userId})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error) => {
        console.log(error)
    })

};

export default bookEvent;