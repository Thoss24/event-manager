import axios from "axios";

const getNotifications = async (userId) => {
    console.log("User id get notifications", userId);

    try {
        const response = await axios.post("http://localhost:3001/users/get-notifications", { userId });
        return response; // Return the response if successful
    } catch (error) {
        console.error("Error fetching notifications:", error);
        throw error; // Rethrow the error for upstream handling
    }
};

export default getNotifications;