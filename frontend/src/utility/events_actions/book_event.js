import axios from "axios"

export const bookEvent = (id) => {

    return axios.post("http://localhost:3001/events/book-event", {id: id})
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })

};

export default bookEvent;