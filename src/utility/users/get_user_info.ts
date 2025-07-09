import axios from "axios";

const getUserInfo = async (userId:string) => {

    console.log("UserId: ",userId)

    return axios.post("http://localhost:3001/users/get-user-info", {userId: userId})
    .then((response) => {

        return response
    })
    .catch((error) => {
        return error
    })
}

export default getUserInfo;