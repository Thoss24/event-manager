import axios from "axios";

const getNotifications = (userId) => {

    return axios.post("http://localhost:3001/users/", userId)
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })
}

export default getNotifications;