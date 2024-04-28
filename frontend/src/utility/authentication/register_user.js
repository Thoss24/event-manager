import axios from "axios"

const registerUser = async (userData) => {
    return axios.post("http://localhost:3001/users/register", userData)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

export default registerUser;