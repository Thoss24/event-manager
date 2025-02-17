import axios from "axios";

const getResponses = (response) => {

    return axios.post("http://localhost:3001/users/get-responses", response)
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })
}

export default getResponses;