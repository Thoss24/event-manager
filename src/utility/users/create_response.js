import axios from "axios";

const createResponse = (response) => {
    return axios.post("http://localhost:3001/users/create-response", response)
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })
}

export default createResponse;