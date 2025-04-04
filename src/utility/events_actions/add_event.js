import axios from "axios"

export const addEvent = (eventData) => {

    return axios.post("http://localhost:3001/events/", eventData)
    .then((response) => {
        if (response.status === 200) {
            return {'message': 'Event successfully created', "status": 200}
        }
    })
    .catch((error) => {
        console.log(error)
        if (error.response && error.response.status === 500) {
            return {'message': 'Event could not be added', "status": 500}
        }
    })

};

export default addEvent;