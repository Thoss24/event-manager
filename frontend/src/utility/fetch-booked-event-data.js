import { json } from "react-router-dom";

const fetchBookedEvent = async (id) => {
    const response = await fetch(`https://react-http-6cb96-default-rtdb.europe-west1.firebasedatabase.app/booked-events/${id}.json`);

    if (!response.ok) {
        throw json({message: 'Could not load event'}, {status: 500})
    } else {
        const eventData = await response.json()
        console.log(eventData)
        return eventData
    }
};

export default fetchBookedEvent