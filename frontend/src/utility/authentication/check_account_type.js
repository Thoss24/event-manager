import axios from "axios";

const checkAccountType = async () => {
  return axios
    .get("http://localhost:3001/users/get-account-type")
    .then((response) => {
        return response;
    })
    .catch((error) => {
        console.log(error)
    });
};

export default checkAccountType;
