import axios from "axios"

const loginUser = async (userData) => {
    return axios.post("http://localhost:3001/users/login", userData)
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    })
}

export default loginUser