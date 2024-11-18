import axios from "axios"

const loginUser = async (user) => {
    return axios.post("http://localhost:3001/users/login", user)
    .then((response) => {
        // redirect to home page
        console.log(response)
        window.location.href = 'http://localhost:3000/events';
    })
    .catch((error) => {
        console.log(error)
    })
}

export default loginUser