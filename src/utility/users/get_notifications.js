import axios from "axios";

const getNotifications = async (userId) => {

    console.log("User id get notifications", userId)

    return axios.post("http://localhost:3001/users/get-notifications", {userId: userId})
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })
}

export default getNotifications;