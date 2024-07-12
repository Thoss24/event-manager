import axios from "axios"

const loginUser = async (userData) => {
    return axios.post("http://localhost:3001/users/login", userData)
    .then((response) => {
        // redirect to home page
        console.log(response)
        window.location.href = 'http://localhost:3000/';
    })
    .catch((error) => {
        console.log(error)
    })
}

export default loginUser