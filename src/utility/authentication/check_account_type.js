import axios from "axios";

const checkAccountType = async () => {
  return axios
    .get("http://localhost:3001/users/get-account-type")
    .then((response) => {
        return response;
    })
    .catch((error) => {
        window.location.href = "http://localhost:3000/login";
        //return error;
    });
};

export default checkAccountType;
