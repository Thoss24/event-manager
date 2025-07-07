import axios from "axios";

const checkAccountType = async (userId) => {
  return axios
    .post("http://localhost:3001/users/get-account-type", {userId: userId})
    .then((response) => {
        return response;
    })
    .catch((error) => {
        window.location.href = "http://localhost:3000/login";
        //return error;
    });
};

export default checkAccountType;
