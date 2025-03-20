import axios from "axios"

export const deleteEvent = (id) => {

    console.log("Delete event id", id)

    return axios.post("http://localhost:3001/events/delete-event", {id: id})
    .then((response) => {
        console.log(response)
        return response
    })
    .catch((error) => {
        console.log(error)
    })

};

export default deleteEvent;