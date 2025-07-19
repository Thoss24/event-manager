import axios from "axios";
import { getUserInfoData } from "../../types/misc";

const getUserInfo = async (req:getUserInfoData) => {

    console.log("REQ", req.userId)

    return axios.post("http://localhost:3001/users/get-user-info", {userId: req.userId})
    .then((response) => {

        return response
    })
    .catch((error) => {
        return error
    })
}

export default getUserInfo;