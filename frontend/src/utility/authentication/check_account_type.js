import axios from "axios"

const checkAccountType = () => {
  return axios
    .get("http://localhost:3001/users/get-account-type")
    .then((response) => {
        console.log(response)
    })
    .catch((error) => {
        console.log(error)
    });
};

export default checkAccountType;
