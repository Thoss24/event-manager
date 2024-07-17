import axios from "axios";

const getUsers = () => {
    return axios.get("http://localhost:3001/users/get-all-users")
    .then((response) => {
        return response
    })
    .catch((error) => {
        console.log(error)
    })
}

export default getUsers;